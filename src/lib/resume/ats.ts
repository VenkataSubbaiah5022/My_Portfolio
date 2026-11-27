import type { MatchReport, ResumeModel } from "@/lib/resume/engine";
import { visibleResume } from "@/lib/resume/export/layout";
import { SOFT_SKILLS, matchSkills } from "@/lib/resume/skills";

/** The text an ATS parser reads from the export, in the same order as the PDF. */
export function resumePlainText(model: ResumeModel): string {
  const r = visibleResume(model);
  const out: string[] = [r.name, r.headline, r.contactLine, "", "SUMMARY", r.summary, "", "SKILLS"];
  for (const group of r.skills) out.push(`${group.title}: ${group.items.join(", ")}`);
  out.push("", "EXPERIENCE");
  for (const role of r.experience) {
    out.push(`${role.heading} — ${role.subheading}    ${role.dates}`, ...role.bullets.map((b) => `• ${b}`));
  }
  if (r.projects.length) {
    out.push("", "PROJECTS");
    for (const project of r.projects) {
      out.push(
        `${project.heading} — ${project.subheading}${project.link ? ` | ${project.link}` : ""}`,
        ...project.bullets.map((b) => `• ${b}`),
      );
    }
  }
  out.push("", "EDUCATION");
  for (const school of r.education) out.push(`${school.heading}    ${school.dates}`, `${school.subheading} · ${school.detail}`);
  if (r.certifications.length) out.push("", "CERTIFICATIONS", ...r.certifications.map((c) => `• ${c}`));
  return out.join("\n");
}

export type AtsWarning = { level: "error" | "warn"; message: string };

export type AtsCheck = {
  text: string;
  /** Weighted share of the JD skills you can back that appear in the resume text. */
  keywordPct: number;
  found: string[];
  /** Skills you have facts for, but that no visible line mentions. */
  missing: string[];
  warnings: AtsWarning[];
};

/** About two printed lines at 10 pt on A4 with the export margins. */
const MAX_BULLET_CHARS = 200;
const WEAK_OPENING = /^(responsible for|worked on|helped|assisted|involved in|participated in|i |my )/i;
/**
 * A JD keyword reads as stuffed when it shows up in more than half of the
 * sentences (summary and bullets) and at least this many times. The Skills
 * list and project stacks are expected to repeat, so they don't count.
 */
const MIN_STUFFED_REPEATS = 5;

export function atsCheck(model: ResumeModel, report: MatchReport): AtsCheck {
  const text = resumePlainText(model);
  const r = visibleResume(model);
  const inResume = new Map(matchSkills(text).map((hit) => [hit.name, hit.count]));

  const backed = report.items.filter((item) => item.status !== "gap" && !SOFT_SKILLS.has(item.skill.name));
  const weight = (requirement: string) => (requirement === "must" ? 3 : requirement === "mentioned" ? 2 : 1);
  const total = backed.reduce((sum, item) => sum + weight(item.skill.requirement), 0);
  const hit = backed.filter((item) => inResume.has(item.skill.name));
  const keywordPct = total
    ? Math.round((hit.reduce((sum, item) => sum + weight(item.skill.requirement), 0) / total) * 100)
    : 100;

  const warnings: AtsWarning[] = [];
  if (!r.summary.trim()) warnings.push({ level: "error", message: "Summary is empty." });
  if (!r.experience.length) warnings.push({ level: "error", message: "No experience entries are visible." });
  if (!model.contact.email) warnings.push({ level: "error", message: "Contact email is missing." });
  if (!r.education.length) warnings.push({ level: "warn", message: "Education section is empty." });

  for (const role of r.experience) {
    if (!role.dates.trim()) warnings.push({ level: "error", message: `${role.heading}: dates are missing.` });
    if (!role.bullets.length) warnings.push({ level: "warn", message: `${role.heading}: no bullets are visible.` });
  }
  for (const entry of [...r.experience, ...r.projects]) {
    for (const b of entry.bullets) {
      const short = `${b.slice(0, 48)}${b.length > 48 ? "…" : ""}`;
      if (b.length > MAX_BULLET_CHARS) {
        warnings.push({ level: "warn", message: `Over 2 lines (${b.length} characters): "${short}"` });
      }
      if (WEAK_OPENING.test(b) || /^[a-z]/.test(b)) {
        warnings.push({ level: "warn", message: `Start with an action verb: "${short}"` });
      }
    }
  }
  const sentences = [r.summary, ...r.experience.flatMap((e) => e.bullets), ...r.projects.flatMap((p) => p.bullets)];
  for (const { name, count } of matchSkills(sentences.join("\n"))) {
    const stuffed = count >= MIN_STUFFED_REPEATS && count > sentences.length / 2;
    if (stuffed && report.items.some((item) => item.skill.name === name)) {
      warnings.push({ level: "warn", message: `"${name}" appears ${count} times — may read as keyword stuffing.` });
    }
  }

  return {
    text,
    keywordPct,
    found: hit.map((item) => item.skill.name),
    missing: backed.filter((item) => !inResume.has(item.skill.name)).map((item) => item.skill.name),
    warnings,
  };
}
