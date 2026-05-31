import { NextResponse } from "next/server";

/**
 * Web3Forms must be called from the browser (Cloudflare blocks server-side requests).
 * Delivery: client → Web3Forms. Ack email: POST /api/contact/ack
 */
export async function POST() {
  return NextResponse.json(
    {
      error:
        "Use the contact form in the browser. Server-side Web3Forms delivery is not supported.",
    },
    { status: 410 },
  );
}
