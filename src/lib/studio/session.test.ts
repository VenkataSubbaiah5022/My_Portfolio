import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  STUDIO_SESSION_MAX_AGE,
  createSessionToken,
  isStudioConfigured,
  isValidStudioKey,
  verifySessionToken,
} from "@/lib/studio/session";

const KEY = "k".repeat(40);
const SECRET = "s".repeat(40);

describe("studio session", () => {
  beforeEach(() => {
    process.env.RESUME_STUDIO_KEY = KEY;
    process.env.STUDIO_SESSION_SECRET = SECRET;
  });
  afterEach(() => {
    delete process.env.RESUME_STUDIO_KEY;
    delete process.env.STUDIO_SESSION_SECRET;
  });

  it("accepts only the exact key", async () => {
    expect(await isValidStudioKey(KEY)).toBe(true);
    expect(await isValidStudioKey(`${KEY} `)).toBe(false);
    expect(await isValidStudioKey("")).toBe(false);
  });

  it("verifies a fresh token and rejects expired or tampered ones", async () => {
    const now = Date.now();
    const token = (await createSessionToken(now))!;
    expect(await verifySessionToken(token, now)).toBe(true);
    expect(await verifySessionToken(token, now + STUDIO_SESSION_MAX_AGE * 1000 + 1)).toBe(false);
    expect(await verifySessionToken(token.replace(/^v1\.\d/, "v1.9"), now)).toBe(false);
    expect(await verifySessionToken(undefined, now)).toBe(false);
  });

  it("rejects a token signed with a different secret", async () => {
    const token = (await createSessionToken())!;
    process.env.STUDIO_SESSION_SECRET = "x".repeat(40);
    expect(await verifySessionToken(token)).toBe(false);
  });

  it("fails closed when a secret is missing or too short", async () => {
    process.env.STUDIO_SESSION_SECRET = "short";
    expect(isStudioConfigured()).toBe(false);
    expect(await createSessionToken()).toBeNull();
    delete process.env.RESUME_STUDIO_KEY;
    expect(await isValidStudioKey(KEY)).toBe(false);
  });
});
