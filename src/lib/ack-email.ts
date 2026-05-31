import { CONTACT_EMAIL, type ContactPayload } from "@/lib/contact";

const SENDER_NAME = "Aitha Venkata Subbaiah";

function buildAckHtml(payload: ContactPayload) {
  return `
    <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:560px">
      <p style="margin:0 0 16px">Hi ${payload.name},</p>
      <p style="margin:0 0 16px">
        Thank you for reaching out through my portfolio. Your message was received successfully.
      </p>
      <p style="margin:0 0 16px">
        I typically respond within <strong>24 hours</strong>. If your note is urgent, feel free to reply
        directly to this email.
      </p>
      <div style="margin:24px 0;padding:16px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc">
        <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#64748b">
          Your message
        </p>
        <p style="margin:0;white-space:pre-wrap">${payload.message}</p>
      </div>
      <p style="margin:0">
        Best regards,<br />
        <strong>${SENDER_NAME}</strong><br />
        Full Stack Developer
      </p>
    </div>
  `;
}

function buildAckText(payload: ContactPayload) {
  return `Hi ${payload.name},

Thank you for reaching out through my portfolio. Your message was received successfully.

I typically respond within 24 hours. If your note is urgent, feel free to reply directly to this email.

Your message:
${payload.message}

Best regards,
${SENDER_NAME}
Full Stack Developer`;
}

async function sendViaResend(payload: ContactPayload, apiKey: string) {
  const from =
    process.env.RESEND_FROM?.trim() ||
    `"${SENDER_NAME}" <onboarding@resend.dev>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [payload.email],
        reply_to: CONTACT_EMAIL,
        subject: "Thanks for reaching out — I received your message",
        html: buildAckHtml(payload),
        text: buildAckText(payload),
      }),
    });

    if (response.ok) {
      return { ok: true as const };
    }

    const errorBody = await response.json().catch(() => null);
    const message =
      errorBody &&
      typeof errorBody === "object" &&
      "message" in errorBody &&
      typeof (errorBody as { message?: unknown }).message === "string"
        ? (errorBody as { message: string }).message
        : `Resend request failed (${response.status})`;

    return { ok: false as const, reason: message };
  } catch (error) {
    return {
      ok: false as const,
      reason:
        error instanceof Error ? error.message : "Resend request failed.",
    };
  }
}

function allowDevTlsBypass() {
  return process.env.NODE_ENV === "development";
}

async function sendViaGmail(payload: ContactPayload) {
  const gmailUser = process.env.GMAIL_USER?.trim() || CONTACT_EMAIL;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.trim();

  if (!gmailAppPassword) {
    return false;
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.default.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
    ...(allowDevTlsBypass()
      ? { tls: { rejectUnauthorized: false } }
      : {}),
  });

  await transporter.sendMail({
    from: `"${SENDER_NAME}" <${gmailUser}>`,
    to: payload.email,
    replyTo: gmailUser,
    subject: "Thanks for reaching out — I received your message",
    text: buildAckText(payload),
    html: buildAckHtml(payload),
  });

  return true;
}

export async function sendAcknowledgmentEmail(payload: ContactPayload) {
  let lastReason = "No email provider configured.";

  const resendKey = process.env.RESEND_API_KEY?.trim();
  const resendFrom =
    process.env.RESEND_FROM?.trim() ||
    `"${SENDER_NAME}" <onboarding@resend.dev>`;
  const resendSandbox = resendFrom.includes("onboarding@resend.dev");
  const canUseResendSandbox =
    payload.email.toLowerCase() === CONTACT_EMAIL.toLowerCase();

  if (resendKey && (!resendSandbox || canUseResendSandbox)) {
    const result = await sendViaResend(payload, resendKey);
    if (result.ok) {
      return { ok: true as const, skipped: false as const };
    }
    lastReason = result.reason;
  } else if (resendKey && resendSandbox) {
    lastReason =
      "Resend test mode only delivers to your own email; using Gmail instead.";
  }

  try {
    const sent = await sendViaGmail(payload);
    if (sent) {
      return { ok: true as const, skipped: false as const };
    }
    lastReason = "Gmail is not configured or the app password is invalid.";
  } catch (error) {
    lastReason =
      error instanceof Error ? error.message : "Gmail failed to send the email.";
  }

  return { ok: false as const, skipped: true as const, reason: lastReason };
}
