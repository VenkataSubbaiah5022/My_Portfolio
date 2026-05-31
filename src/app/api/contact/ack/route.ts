import { NextResponse } from "next/server";
import { sendAcknowledgmentEmail } from "@/lib/ack-email";
import { type ContactPayload } from "@/lib/contact";

function parsePayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const name = String((body as { name?: string }).name ?? "").trim();
  const email = String((body as { email?: string }).email ?? "").trim();
  const message = String((body as { message?: string }).message ?? "").trim();

  if (!name || !email || !message) {
    return null;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null;
  }

  return { name, email, message };
}

/** Sends the visitor confirmation email (Gmail or Resend). Web3Forms handles delivery separately. */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = parsePayload(body);

    if (!payload) {
      return NextResponse.json(
        { error: "Invalid contact details." },
        { status: 400 },
      );
    }

    let ackSent = false;
    let ackError: string | undefined;
    try {
      const ackResult = await sendAcknowledgmentEmail(payload);
      ackSent = ackResult.ok;
      if (!ackSent && "reason" in ackResult) {
        ackError = ackResult.reason;
      }
    } catch {
      ackSent = false;
    }

    return NextResponse.json({
      success: true,
      ackSent,
      ...(process.env.NODE_ENV === "development" && ackError
        ? { ackError }
        : {}),
      message: ackSent
        ? "A confirmation email was sent to your inbox."
        : "Message received. I will get back to you soon.",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to send confirmation email." },
      { status: 500 },
    );
  }
}
