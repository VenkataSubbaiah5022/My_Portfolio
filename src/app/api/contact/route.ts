import { NextResponse } from "next/server";
import {
  getWeb3FormsAccessKey,
  sendViaWeb3Forms,
  type ContactPayload,
} from "@/lib/contact";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const honey = String((body as { _honey?: string })._honey ?? "").trim();

    if (honey) {
      return NextResponse.json({ success: true });
    }

    const payload = parsePayload(body);
    if (!payload) {
      return NextResponse.json(
        { error: "Please fill in all fields with a valid email." },
        { status: 400 },
      );
    }

    const accessKey = getWeb3FormsAccessKey();
    if (!accessKey) {
      return NextResponse.json(
        { error: "Contact form is not configured yet." },
        { status: 503 },
      );
    }

    const result = await sendViaWeb3Forms(payload, accessKey);
    if (!result.ok) {
      const detail =
        result.data &&
        typeof result.data === "object" &&
        "message" in result.data
          ? String((result.data as { message?: string }).message ?? "")
          : "";

      return NextResponse.json(
        { error: detail || "Unable to send your message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully. I will get back to you soon.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong while sending. Please try again." },
      { status: 500 },
    );
  }
}
