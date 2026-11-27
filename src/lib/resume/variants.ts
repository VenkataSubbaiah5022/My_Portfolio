import type { RoleFamily } from "@/lib/resume/jd";

/**
 * Your own alternate phrasings of a stored fact, keyed by fact id (see
 * src/lib/resume/facts.ts). The engine uses the phrasing for the JD's role
 * family when one exists, and keeps citing the same fact. A variant must say
 * the same true thing: any number in it must already be in the fact, or the
 * studio flags it.
 *
 * Example:
 *   "exp.hala-mobility.p3": {
 *     backend: "Built real-time booking and rental processing services, including automated booking expiry.",
 *   },
 */
export const BULLET_VARIANTS: Record<string, Partial<Record<RoleFamily, string>>> = {};
