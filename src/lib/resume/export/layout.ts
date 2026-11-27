import type { ResumeModel } from "@/lib/resume/engine";

/** What both exporters render: only the visible lines, in display order. */
export function visibleResume(model: ResumeModel) {
  const entries = (list: ResumeModel["experience"]) =>
    list
      .filter((entry) => !entry.hidden)
      .map((entry) => ({ ...entry, bullets: entry.bullets.filter((b) => !b.hidden).map((b) => b.text) }));

  return {
    name: model.contact.name,
    headline: model.targetRole.trim() || "Full Stack Developer",
    contactLine: [
      model.contact.location,
      model.contact.email,
      ...model.contact.links.map((link) => link.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")),
    ].join(" | "),
    summary: model.summary.text,
    skills: model.skills,
    experience: entries(model.experience),
    projects: entries(model.projects).map((project) => ({
      ...project,
      link: project.link?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") ?? null,
    })),
    education: model.education,
    certifications: model.certifications.filter((cert) => !cert.hidden).map((cert) => cert.text),
  };
}

export type VisibleResume = ReturnType<typeof visibleResume>;
