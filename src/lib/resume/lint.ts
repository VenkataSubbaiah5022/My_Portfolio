import { factsById, factsRegistry } from "@/lib/resume/facts";
import { matchSkills } from "@/lib/resume/skills";
import { BULLET_VARIANTS } from "@/lib/resume/variants";

export type LintIssue =
  | "weak-opening"
  | "first-person"
  | "no-tech"
  | "no-result"
  | "too-long"
  | "number-not-in-fact";

export const LINT_LABEL: Record<LintIssue, string> = {
  "weak-opening": "start with an action verb",
  "first-person": "drop I / my / we",
  "no-tech": "name the tech used",
  "no-result": "add the result or impact",
  "too-long": "over 2 lines",
  "number-not-in-fact": "number not in the fact",
};

export type LintResult = { id: string; text: string; source: string; issues: LintIssue[] };

const WEAK_OPENING = /^(responsible for|worked on|helped|assisted|involved in|participated in|tasked with)\b/i;
const RESULT = /\d|%|\b(reduc|improv|increas|cut|sav|fast|grew|grow|boost|award|live|launch|ship)\w*/i;
const MAX_CHARS = 200;

function lint(text: string, checkResult: boolean): LintIssue[] {
  const issues: LintIssue[] = [];
  if (WEAK_OPENING.test(text) || /^[a-z]/.test(text)) issues.push("weak-opening");
  if (/\b(I|my|me|we|our)\b/.test(text)) issues.push("first-person");
  if (!matchSkills(text).length) issues.push("no-tech");
  if (checkResult && !RESULT.test(text)) issues.push("no-result");
  if (text.length > MAX_CHARS) issues.push("too-long");
  return issues;
}

/**
 * Quality check over the bullets in your data files (and any phrasing variants),
 * worst first. It edits nothing: fix the wording in the source file it names.
 */
export function lintBullets(): LintResult[] {
  const results: LintResult[] = factsRegistry
    .filter((fact) => fact.type === "achievement" || fact.type === "project-highlight")
    .map((fact) => ({
      id: fact.id,
      text: fact.text,
      source: fact.source,
      issues: lint(fact.text, fact.type === "achievement"),
    }));

  for (const [factId, variants] of Object.entries(BULLET_VARIANTS)) {
    const fact = factsById.get(factId);
    for (const [family, text] of Object.entries(variants)) {
      if (!text) continue;
      const issues = lint(text, fact?.type === "achievement");
      const factNumbers = new Set(fact?.text.match(/\d+(?:\.\d+)?/g) ?? []);
      if (!fact || (text.match(/\d+(?:\.\d+)?/g) ?? []).some((n) => !factNumbers.has(n))) {
        issues.push("number-not-in-fact");
      }
      results.push({ id: `${factId} (${family})`, text, source: "src/lib/resume/variants.ts", issues });
    }
  }

  return results.filter((result) => result.issues.length).sort((a, b) => b.issues.length - a.issues.length);
}
