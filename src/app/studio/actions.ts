"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  FAILED_UNLOCK_DELAY_MS,
  STUDIO_COOKIE_PATH,
  STUDIO_SESSION_COOKIE,
  STUDIO_SESSION_MAX_AGE,
  createSessionToken,
  isValidStudioKey,
} from "@/lib/studio/session";

export type UnlockState = { error: string | null };

export async function unlockStudio(
  _previous: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const key = formData.get("key");
  const token =
    typeof key === "string" && (await isValidStudioKey(key))
      ? await createSessionToken()
      : null;

  if (!token) {
    await new Promise((resolve) => setTimeout(resolve, FAILED_UNLOCK_DELAY_MS));
    return { error: "That key didn't work." };
  }

  (await cookies()).set(STUDIO_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: STUDIO_COOKIE_PATH,
    maxAge: STUDIO_SESSION_MAX_AGE,
  });
  redirect("/studio");
}

export async function lockStudio() {
  (await cookies()).set(STUDIO_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: STUDIO_COOKIE_PATH,
    maxAge: 0,
  });
  redirect("/studio");
}
