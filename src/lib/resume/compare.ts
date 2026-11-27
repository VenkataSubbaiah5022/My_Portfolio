import type { ResumeModel } from "@/lib/resume/engine";
import { visibleResume } from "@/lib/resume/export/layout";

export type ResumeComparison = {
  summaryChanged: boolean;
  /** Visible lines (bullets and certifications) only in A or only in B. */
  onlyA: string[];
  onlyB: string[];
  shared: number;
  projectsOnlyA: string[];
  projectsOnlyB: string[];
  skillsOnlyA: string[];
  skillsOnlyB: string[];
};

function lines(model: ResumeModel) {
  const r = visibleResume(model);
  return {
    summary: r.summary,
    bullets: [...r.experience, ...r.projects].flatMap((entry) => entry.bullets).concat(r.certifications),
    projects: r.projects.map((project) => project.heading),
    skills: r.skills.flatMap((group) => group.items),
  };
}

const minus = (a: string[], b: string[]) => {
  const other = new Set(b);
  return [...new Set(a)].filter((item) => !other.has(item));
};

/** What a reader would see differently between two saved resumes. */
export function compareResumes(a: ResumeModel, b: ResumeModel): ResumeComparison {
  const left = lines(a);
  const right = lines(b);
  return {
    summaryChanged: left.summary !== right.summary,
    onlyA: minus(left.bullets, right.bullets),
    onlyB: minus(right.bullets, left.bullets),
    shared: left.bullets.filter((line) => right.bullets.includes(line)).length,
    projectsOnlyA: minus(left.projects, right.projects),
    projectsOnlyB: minus(right.projects, left.projects),
    skillsOnlyA: minus(left.skills, right.skills),
    skillsOnlyB: minus(right.skills, left.skills),
  };
}
