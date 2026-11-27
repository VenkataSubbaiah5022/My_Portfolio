import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { STUDIO_SESSION_COOKIE, verifySessionToken } from "@/lib/studio/session";

const NO_INDEX = { "X-Robots-Tag": "noindex, nofollow" };

/**
 * Owner-only studio gate. `/studio` itself renders the unlock screen when
 * logged out (and its Server Functions re-check the session); every deeper
 * studio path and studio API answers 404 without a valid session.
 */
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/studio") {
    return NextResponse.next({ headers: NO_INDEX });
  }

  const unlocked = await verifySessionToken(request.cookies.get(STUDIO_SESSION_COOKIE)?.value);
  if (!unlocked) {
    return new NextResponse("Not found", { status: 404, headers: NO_INDEX });
  }
  return NextResponse.next({ headers: NO_INDEX });
}

export const config = {
  matcher: ["/studio/:path*", "/api/studio/:path*"],
};
