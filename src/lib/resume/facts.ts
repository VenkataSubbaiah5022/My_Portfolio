import { certifications } from "@/lib/certifications";
import { education } from "@/lib/education";
import { experience } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { publications } from "@/lib/publications";
import { techStackCategories } from "@/lib/tech-stack";

export type FactType =
  | "role"
  | "achievement"
  | "education"
  | "skill"
  | "project"
  | "project-highlight"
  | "project-metric"
  | "certification"
  | "publication";

/**
 * One verified statement from the portfolio. The resume builder may only
 * select, order and format facts; it never writes new ones.
 */
export type Fact = {
  /** Stable id, e.g. `exp.stratosfy.p4` or `proj.talentvault-ai.h1`. */
  id: string;
  type: FactType;
  text: string;
  /** Repo path of the data file the fact comes from. */
  source: string;
  /** Role, project or publication the fact belongs to. */
  parentId?: string;
  /** Canonical skill names mentioned in the fact. */
  skills: string[];
};

const unique = (values: string[]) => [...new Set(values)];

/** Every skill name the portfolio claims anywhere, in its canonical spelling. */
export const skillVocabulary: string[] = unique([
  ...techStackCategories.flatMap((category) => category.items.map((item) => item.name)),
  ...projects.flatMap((project) => project.stack),
  ...certifications.flatMap((cert) => cert.skills),
  ...publications.flatMap((publication) => publication.tags),
]);

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const skillPatterns = skillVocabulary.map((skill) => ({
  skill,
  pattern: new RegExp(`(?<![A-Za-z0-9])${escapeRegExp(skill)}(?![A-Za-z0-9])`, "i"),
}));

/** Canonical skills named in `text`; "Java" does not match inside "JavaScript". */
export function findSkills(text: string): string[] {
  return skillPatterns.filter(({ pattern }) => pattern.test(text)).map(({ skill }) => skill);
}

function fact(
  id: string,
  type: FactType,
  text: string,
  source: string,
  parentId?: string,
  knownSkills: string[] = [],
): Fact {
  return {
    id,
    type,
    text,
    source,
    ...(parentId ? { parentId } : {}),
    skills: unique([...knownSkills, ...findSkills(text)]),
  };
}

export function buildFactsRegistry(): Fact[] {
  const facts: Fact[] = [];

  for (const role of experience) {
    const roleId = `exp.${role.id}`;
    facts.push(
      fact(roleId, "role", `${role.role} — ${role.company} (${role.period})`, "src/lib/experience.ts"),
    );
    role.points.forEach((point, i) => {
      facts.push(fact(`${roleId}.p${i + 1}`, "achievement", point, "src/lib/experience.ts", roleId));
    });
  }

  for (const school of education) {
    facts.push(
      fact(
        `edu.${school.id}`,
        "education",
        [
          `${school.degree}, ${school.institution}`,
          `Class of ${school.graduationYear}`,
          `CGPA ${school.cgpa}`,
          ...school.highlights,
        ].join(" · "),
        "src/lib/education.ts",
      ),
    );
  }

  for (const skill of skillVocabulary) {
    facts.push({
      id: `skill.${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      type: "skill",
      text: skill,
      source: "src/lib/tech-stack.ts",
      skills: [skill],
    });
  }

  for (const project of projects) {
    const projectId = `proj.${project.slug}`;
    facts.push(
      fact(
        projectId,
        "project",
        `${project.title}: ${project.problem}`,
        "src/lib/projects.ts",
        undefined,
        project.stack,
      ),
    );
    project.highlights.forEach((highlight, i) => {
      facts.push(
        fact(`${projectId}.h${i + 1}`, "project-highlight", highlight, "src/lib/projects.ts", projectId),
      );
    });
    project.metrics.forEach((metric, i) => {
      facts.push(
        fact(`${projectId}.m${i + 1}`, "project-metric", metric, "src/lib/projects.ts", projectId),
      );
    });
  }

  for (const cert of certifications) {
    facts.push(
      fact(
        `cert.${cert.id}`,
        "certification",
        `${cert.title} — ${cert.issuer} (${cert.year})`,
        "src/lib/certifications.ts",
        undefined,
        cert.skills,
      ),
    );
  }

  for (const publication of publications) {
    facts.push(
      fact(
        `pub.${publication.id}`,
        "publication",
        `${publication.title} — ${publication.venue} (${publication.year}): ${publication.summary}`,
        "src/lib/publications.ts",
        undefined,
        publication.tags,
      ),
    );
  }

  return facts;
}

export const factsRegistry: Fact[] = buildFactsRegistry();

export const factsById: ReadonlyMap<string, Fact> = new Map(
  factsRegistry.map((entry) => [entry.id, entry]),
);
