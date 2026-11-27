/**
 * Owner-only studio session: a short-lived HMAC-signed cookie.
 * Uses Web Crypto so it runs the same in `proxy.ts` and in Server Functions.
 * Fails closed: without both env vars set, nothing unlocks.
 */

export const STUDIO_SESSION_COOKIE = "studio_session";
export const STUDIO_SESSION_MAX_AGE = 60 * 60 * 12;
export const STUDIO_COOKIE_PATH = "/studio";
export const FAILED_UNLOCK_DELAY_MS = 2000;

const MIN_SECRET_LENGTH = 32;
const TOKEN_VERSION = "v1";

const encoder = new TextEncoder();

function readEnv(name: "RESUME_STUDIO_KEY" | "STUDIO_SESSION_SECRET"): string | null {
  const value = process.env[name];
  return value && value.length >= MIN_SECRET_LENGTH ? value : null;
}

export function isStudioConfigured(): boolean {
  return Boolean(readEnv("RESUME_STUDIO_KEY") && readEnv("STUDIO_SESSION_SECRET"));
}

function toBase64Url(bytes: ArrayBuffer): string {
  let binary = "";
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toBase64Url(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
}

/** Compares SHA-256 digests so timing does not depend on where the strings differ. */
export async function isValidStudioKey(candidate: string): Promise<boolean> {
  const expected = readEnv("RESUME_STUDIO_KEY");
  if (!expected) return false;
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(candidate)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);
  return constantTimeEqual(new Uint8Array(a), new Uint8Array(b));
}

export async function createSessionToken(now = Date.now()): Promise<string | null> {
  const secret = readEnv("STUDIO_SESSION_SECRET");
  if (!secret) return null;
  const payload = `${TOKEN_VERSION}.${now + STUDIO_SESSION_MAX_AGE * 1000}`;
  return `${payload}.${await sign(payload, secret)}`;
}

export async function verifySessionToken(
  token: string | undefined,
  now = Date.now(),
): Promise<boolean> {
  const secret = readEnv("STUDIO_SESSION_SECRET");
  if (!secret || !token) return false;

  const [version, expiresAt, signature] = token.split(".");
  if (version !== TOKEN_VERSION || !expiresAt || !signature) return false;
  if (!/^\d+$/.test(expiresAt) || Number(expiresAt) <= now) return false;

  const expected = await sign(`${version}.${expiresAt}`, secret);
  return constantTimeEqual(encoder.encode(signature), encoder.encode(expected));
}
