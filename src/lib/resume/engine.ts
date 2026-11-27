import { certifications } from "@/lib/certifications";
import { education } from "@/lib/education";
import { experience } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { factsById, factsRegistry, skillVocabulary, type Fact } from "@/lib/resume/facts";
import { REQUIREMENT_WEIGHT, type JdAnalysis, type JdSkill } from "@/lib/resume/jd";
import { RESUME_CONTACT, SUMMARIES, type ResumeContact } from "@/lib/resume/profile";
import { SKILL_GROUPS, SOFT_SKILLS, matchSkills } from "@/lib/resume/skills";
import { BULLET_VARIANTS } from "@/lib/resume/variants";

export type ResumeBullet = {
  key: string;
  text: string;
  /** The fact text as stored; `text` differs only after a manual edit. */
  originalText: string;
  factIds: string[];
  score: number;
  hidden: boolean;
};

export type ResumeEntry = {
  id: string;
  heading: string;
  subheading: string;
  dates: string;
  link: string | null;
  score: number;
  hidden: boolean;
  bullets: ResumeBullet[];
};

export type ResumeModel = {
  targetRole: string;
  company: string;
  contact: ResumeContact;
  summary: { text: string; originalText: string; factIds: string[] };
  skills: { title: string; items: string[] }[];
  experience: ResumeEntry[];
  projects: ResumeEntry[];
  education: { id: string; heading: string; subheading: string; dates: string; detail: string }[];
  certifications: { id: string; text: string; hidden: boolean }[];
};

export type CoverageStatus = "covered" | "partial" | "gap";

export type MatchItem = { skill: JdSkill; status: CoverageStatus; factIds: string[] };

export type MatchReport = {
  items: MatchItem[];
  /** Weighted share of JD skills backed by experience or project facts. */
  coveragePct: number;
  otherKeywords: { word: string; inFacts: boolean }[];
};

const EVIDENCE_TYPES = new Set<Fact["type"]>([
  "role",
  "achievement",
  "project",
  "project-highlight",
  "project-metric",
  "publication",
]);

/** Canonical skills each fact names, resolving aliases ("Tailwind" → Tailwind CSS). */
const factSkills: ReadonlyMap<string, Set<string>> = new Map(
  factsRegistry.map((fact) => [
    fact.id,
    new Set(matchSkills(`${fact.text}\n${fact.skills.join(", ")}`).map((hit) => hit.name)),
  ]),
);

const claimedSkills = new Set([
  ...skillVocabulary,
  ...[...factSkills.values()].flatMap((skills) => [...skills]),
]);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatMonth(value: string): string {
  if (value === "present") return "Present";
  const [year, month] = value.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

/** "Hala Mobility (Hyderabad, India) · Full time" → name, location, type. */
function parseCompany(company: string) {
  const match = company.match(/^(.*?)\s*\((.*?)\)\s*(?:·\s*(.*))?$/);
  if (!match) return { name: company, location: "", type: "" };
  return { name: match[1], location: match[2], type: match[3] ?? "" };
}

function scoreText(text: string, skills: Set<string>, jd: JdAnalysis): number {
  let score = jd.skills
    .filter((skill) => skills.has(skill.name))
    .reduce((sum, skill) => sum + REQUIREMENT_WEIGHT[skill.requirement], 0);
  const lower = text.toLowerCase();
  score += jd.otherKeywords.filter((word) => lower.includes(word.toLowerCase())).length;
  if (/\d/.test(text)) score += 0.5;
  if (/\b(award|recogni[sz]ed|promoted)\b/i.test(text)) score += 2;
  return score;
}

function scoreFact(factId: string, jd: JdAnalysis): number {
  const fact = factsById.get(factId);
  return fact ? scoreText(fact.text, factSkills.get(factId) ?? new Set<string>(), jd) : 0;
}

function rankBullets(bullets: ResumeBullet[], visible: number): ResumeBullet[] {
  return bullets
    .map((bullet, index) => ({ bullet, index }))
    .sort((a, b) => b.bullet.score - a.bullet.score || a.index - b.index)
    .map(({ bullet }, rank) => ({ ...bullet, hidden: rank >= visible }));
}

/** A fact as a bullet, in your phrasing for this role family when you wrote one. */
function bullet(factId: string, jd: JdAnalysis): ResumeBullet {
  const variant = BULLET_VARIANTS[factId]?.[jd.family];
  const text = variant ?? factsById.get(factId)?.text ?? "";
  const score = variant
    ? Math.max(
        scoreFact(factId, jd),
        scoreText(variant, new Set(matchSkills(variant).map((hit) => hit.name)), jd),
      )
    : scoreFact(factId, jd);
  return { key: factId, text, originalText: text, factIds: [factId], score, hidden: false };
}

export function buildMatchReport(jd: JdAnalysis): MatchReport {
  const items: MatchItem[] = jd.skills.map((skill) => {
    const facts = factsRegistry.filter((fact) => factSkills.get(fact.id)?.has(skill.name));
    const evidence = facts.filter((fact) => EVIDENCE_TYPES.has(fact.type));
    const status: CoverageStatus = evidence.length ? "covered" : facts.length ? "partial" : "gap";
    return { skill, status, factIds: (evidence.length ? evidence : facts).map((fact) => fact.id) };
  });

  const total = items.reduce((sum, item) => sum + REQUIREMENT_WEIGHT[item.skill.requirement], 0);
  const backed = items.reduce(
    (sum, item) =>
      sum +
      REQUIREMENT_WEIGHT[item.skill.requirement] *
        (item.status === "covered" ? 1 : item.status === "partial" ? 0.5 : 0),
    0,
  );
  const factText = factsRegistry.map((fact) => fact.text.toLowerCase()).join("\n");

  return {
    items,
    coveragePct: total ? Math.round((backed / total) * 100) : 0,
    otherKeywords: jd.otherKeywords.map((word) => ({
      word,
      inFacts: factText.includes(word.toLowerCase()),
    })),
  };
}

export function buildResume(
  jd: JdAnalysis,
  report: MatchReport,
  target: { role: string; company: string },
): ResumeModel {
  const jdWeight = new Map(jd.skills.map((skill) => [skill.name, REQUIREMENT_WEIGHT[skill.requirement]]));

  const roles: ResumeEntry[] = experience.map((role, index) => {
    const company = parseCompany(role.company);
    const extra = /intern|freelance/i.test(company.type) ? ` (${company.type})` : "";
    const bullets = role.points.map((_, i) => bullet(`exp.${role.id}.p${i + 1}`, jd));
    const visible = index === 0 ? 5 : /freelance/i.test(company.type) ? 2 : 3;
    return {
      id: `exp.${role.id}`,
      heading: role.role,
      subheading: [company.name, company.location].filter(Boolean).join(", ") + extra,
      dates: `${formatMonth(role.start)} – ${formatMonth(role.end)}`,
      link: null,
      score: bullets.reduce((sum, b) => sum + b.score, 0),
      hidden: false,
      bullets: rankBullets(bullets, Math.max(2, visible)),
    };
  });

  const projectEntries: ResumeEntry[] = projects
    .map((project) => {
      const id = `proj.${project.slug}`;
      const bullets = project.highlights.map((_, i) => bullet(`${id}.h${i + 1}`, jd));
      const score = scoreFact(id, jd) + bullets.reduce((sum, b) => sum + b.score, 0);
      return {
        id,
        heading: project.title,
        subheading: project.stack.join(", "),
        dates: "",
        link: project.live ?? project.code,
        score,
        hidden: false,
        bullets: rankBullets(bullets, 2),
      };
    })
    .sort((a, b) => b.score - a.score)
    .map((entry, rank) => ({ ...entry, hidden: rank >= 3 }));

  const matchedClaimed = new Set(
    report.items.filter((item) => item.status !== "gap").map((item) => item.skill.name),
  );
  const grouped = new Set(SKILL_GROUPS.flatMap((group) => group.skills));
  const byJdWeight = (a: string, b: string) => (jdWeight.get(b) ?? 0) - (jdWeight.get(a) ?? 0);

  const skills = SKILL_GROUPS.map((group) => {
    const items = group.skills.filter((skill) => claimedSkills.has(skill));
    const matched = items.filter((skill) => jdWeight.has(skill)).sort(byJdWeight);
    const rest = items.filter((skill) => !jdWeight.has(skill));
    return { title: group.title, core: group.core, items: [...matched, ...rest].slice(0, 8), matched: matched.length };
  })
    .filter((group) => group.items.length && (group.core || group.matched > 0))
    .map(({ title, items }) => ({ title, items }));

  const otherMatched = [...matchedClaimed].filter((skill) => !grouped.has(skill) && !SOFT_SKILLS.has(skill));
  if (otherMatched.length) skills.push({ title: "Other", items: otherMatched.sort(byJdWeight) });

  const rankedCerts = certifications
    .map((cert) => {
      const certSkills = factSkills.get(`cert.${cert.id}`) ?? new Set<string>();
      const overlap = [...certSkills].reduce((sum, skill) => sum + (jdWeight.get(skill) ?? 0), 0);
      return { cert, rank: overlap * 10 + (cert.featured ? 5 : 0) + Number(cert.year) / 1000 };
    })
    .sort((a, b) => b.rank - a.rank);

  const summary = SUMMARIES[jd.family];

  return {
    targetRole: target.role,
    company: target.company,
    contact: RESUME_CONTACT,
    summary: { text: summary.text, originalText: summary.text, factIds: summary.factIds },
    skills,
    experience: roles,
    projects: projectEntries,
    education: education.map((school) => ({
      id: `edu.${school.id}`,
      heading: school.degree,
      subheading: school.institution,
      dates: school.graduationYear,
      detail: [`CGPA ${school.cgpa}`, ...school.highlights].join(" · "),
    })),
    certifications: rankedCerts.map(({ cert }, rank) => ({
      id: `cert.${cert.id}`,
      text: `${cert.title} — ${cert.issuer} (${cert.year})`,
      hidden: rank >= 3,
    })),
  };
}

/* ---------- Page budget ---------- */

const CHARS_PER_LINE = 100;
const LINES_PER_PAGE = 52;

const lines = (text: string, width = CHARS_PER_LINE) => Math.max(1, Math.ceil(text.length / width));

/** Rough page count for the export layout (A4, 10.5 pt, 0.6 in margins). */
export function estimatePages(model: ResumeModel): number {
  let total = 4; // name, title, contact line, spacing
  total += 1.6 + lines(model.summary.text);
  total += 1.6 + model.skills.reduce((sum, group) => sum + lines(`${group.title}: ${group.items.join(", ")}`), 0);
  for (const section of [model.experience, model.projects]) {
    const entries = section.filter((entry) => !entry.hidden);
    if (!entries.length) continue;
    total += 1.6;
    for (const entry of entries) {
      total += 1.4;
      for (const b of entry.bullets) if (!b.hidden) total += lines(b.text, CHARS_PER_LINE - 6);
    }
  }
  total += 1.6 + model.education.length * 2;
  const certs = model.certifications.filter((cert) => !cert.hidden);
  if (certs.length) total += 1.6 + certs.length;
  return total / LINES_PER_PAGE;
}

/**
 * Hides the single least useful visible item: the lowest-scoring bullet (keeping
 * 2 on the current role and 1 elsewhere), then the last certification, then the
 * last project. Returns null when nothing more can go.
 */
export function trimOnce(model: ResumeModel): ResumeModel | null {
  const next = structuredClone(model);
  const candidates = [...next.experience, ...next.projects]
    .filter((entry) => !entry.hidden)
    .flatMap((entry, entryIndex) => {
      const visible = entry.bullets.filter((b) => !b.hidden);
      const minimum = entry.id.startsWith("exp.") && entryIndex === 0 ? 2 : 1;
      return visible.length > minimum ? visible.map((b) => ({ entry, b })) : [];
    });
  if (candidates.length) {
    const worst = candidates.reduce((low, c) => (c.b.score <= low.b.score ? c : low));
    worst.b.hidden = true;
    return next;
  }
  const shownCerts = next.certifications.filter((cert) => !cert.hidden);
  if (shownCerts.length > 1) {
    shownCerts[shownCerts.length - 1].hidden = true;
    return next;
  }
  const shownProjects = next.projects.filter((entry) => !entry.hidden);
  if (shownProjects.length > 1) {
    shownProjects[shownProjects.length - 1].hidden = true;
    return next;
  }
  return null;
}

/* ---------- Truthfulness checks ---------- */

export type BulletIssue = "edited" | "unsupported-number" | "missing-fact";

const numbersIn = (text: string) => text.match(/\d+(?:\.\d+)?/g) ?? [];

/** Why a line can't be trusted as-is, or an empty list when it is a stored fact. */
export function checkLine(text: string, originalText: string, factIds: string[]): BulletIssue[] {
  const facts = factIds.map((id) => factsById.get(id)).filter((fact): fact is Fact => Boolean(fact));
  if (!facts.length) return ["missing-fact"];
  const issues: BulletIssue[] = [];
  if (text.trim() !== originalText.trim()) issues.push("edited");
  const sourceNumbers = new Set(facts.flatMap((fact) => numbersIn(fact.text)));
  if (numbersIn(text).some((n) => !sourceNumbers.has(n))) issues.push("unsupported-number");
  return issues;
}

export function resumeFileName(model: ResumeModel, extension: "pdf" | "docx"): string {
  const part = (value: string) => value.trim().replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  return [
    "Aitha_Venkata_Subbaiah",
    part(model.targetRole) || "Resume",
    part(model.company),
  ]
    .filter(Boolean)
    .join("_")
    .concat(`.${extension}`);
}
