import type { MatchReport, ResumeModel } from "@/lib/resume/engine";
import { SOFT_SKILLS } from "@/lib/resume/skills";

export type CoverLetter = { text: string; factIds: string[] };

const company = (subheading: string) => subheading.split(",")[0].trim();

/** "Developed 19+ services." → "developed 19+ services" (keeps acronyms like "AI"). */
function asClause(bullet: string): string {
  const trimmed = bullet.trim().replace(/[.\s]+$/, "");
  return /^[A-Z][a-z]/.test(trimmed) ? trimmed[0].toLowerCase() + trimmed.slice(1) : trimmed;
}

function list(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

/**
 * A short cover letter. The framing sentences are fixed; every achievement is
 * a visible resume bullet (a stored fact) and every skill named is one the
 * match report proves from experience or projects. Gaps are never mentioned.
 */
export function buildCoverLetter(model: ResumeModel, report: MatchReport): CoverLetter {
  const role = model.targetRole.trim() || "this";
  const employer = model.company.trim();
  const current = model.experience[0];

  const picks = model.experience
    .filter((entry) => !entry.hidden)
    .flatMap((entry) => entry.bullets.filter((b) => !b.hidden).map((b) => ({ entry, b })))
    .filter(({ b }) => /^[A-Z][a-z]+ed\b/.test(b.text))
    .sort((x, y) => y.b.score - x.b.score)
    .slice(0, 3);

  const proven = report.items
    .filter((item) => item.status === "covered" && !SOFT_SKILLS.has(item.skill.name))
    .slice(0, 5)
    .map((item) => item.skill.name);

  const paragraphs = [
    employer ? `Dear ${employer} hiring team,` : "Dear hiring team,",
    `I'm applying for the ${role} role${employer ? ` at ${employer}` : ""}. I'm currently a ${current.heading} at ${company(current.subheading)}, and the work below is what I'd bring to it.`,
    ...picks.map(({ entry, b }) => `At ${company(entry.subheading)}, I ${asClause(b.text)}.`),
    proven.length
      ? `The role asks for ${list(proven)}, and I've used each of them in production or shipped projects.`
      : "",
    `I'd welcome the chance to talk about how I can help${employer ? ` ${employer}` : ""}. Thank you for your time.`,
    `${model.contact.name}\n${model.contact.email}`,
  ].filter(Boolean);

  return {
    text: paragraphs.join("\n\n"),
    factIds: [current.id, ...picks.flatMap(({ b }) => b.factIds)],
  };
}
