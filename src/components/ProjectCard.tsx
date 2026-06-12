"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, FileText, GitBranch, Terminal } from "lucide-react";
import { ProjectImageGallery } from "@/components/ProjectImageGallery";
import { trackNavClick, trackOutboundClick } from "@/lib/analytics";
import { hasCaseStudy } from "@/lib/case-studies";
import {
  getProjectImages,
  getProjectKind,
  getProjectPrimaryAction,
  type Project,
} from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  index?: number;
  analyticsSource?: string;
};

export function ProjectCard({
  project,
  index = 0,
  analyticsSource = "projects",
}: ProjectCardProps) {
  const primaryAction = getProjectPrimaryAction(project);
  const PrimaryIcon = getProjectKind(project) === "cli" ? Terminal : ExternalLink;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-lg md:p-5"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.24),transparent_55%)]" />
      <ProjectImageGallery
        images={getProjectImages(project)}
        title={project.title}
        thumbnail={project.thumbnail}
      />
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.problem}</p>
      <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
        {project.highlights.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border px-2 py-1 text-[10px] text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.metrics.map((item) => (
          <span
            key={item}
            className="rounded-full bg-primary/10 px-2 py-1 text-[10px] text-primary"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {hasCaseStudy(project.slug) ? (
          <Link
            href={`/projects/${project.slug}`}
            onClick={() => trackNavClick("case_study", analyticsSource)}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition hover:border-primary/50"
          >
            <FileText className="h-3.5 w-3.5" /> Case study
          </Link>
        ) : null}
        {primaryAction.enabled ? (
          <a
            href={primaryAction.href}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackOutboundClick(
                `${project.title} ${primaryAction.label}`,
                primaryAction.href,
                analyticsSource,
              )
            }
            className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs transition hover:border-primary/50"
          >
            <PrimaryIcon className="h-3.5 w-3.5" /> {primaryAction.label}
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground">
            <ExternalLink className="h-3.5 w-3.5" /> {primaryAction.label}
          </span>
        )}
        {project.code ? (
          <a
            href={project.code}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackOutboundClick(`${project.title} Code`, project.code!, analyticsSource)
            }
            className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs transition hover:border-primary/50"
          >
            <GitBranch className="h-3.5 w-3.5" /> Code
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}
