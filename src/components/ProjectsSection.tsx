"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { trackNavClick } from "@/lib/analytics";
import { featuredProjects, projects } from "@/lib/projects";

export function ProjectsSection() {
  const remainingCount = projects.length - featuredProjects.length;

  return (
    <section id="projects" className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
      <div className="mb-6 flex flex-col gap-6 md:mb-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          badge="Selected work"
          titleBefore="Featured"
          titleHighlight="projects"
          description="A quick look at recent live builds. Explore the full catalog for more work, including projects in progress."
          align="left"
          className="mb-0 md:mb-0"
        />
        <p className="text-xs text-muted-foreground md:text-sm">
          Showing {featuredProjects.length} of {projects.length} projects
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {featuredProjects.map((project, idx) => (
          <ProjectCard key={project.title} project={project} index={idx} />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {remainingCount > 0
            ? `${remainingCount} more project${remainingCount === 1 ? "" : "s"} on the full projects page.`
            : "Add more projects anytime without cluttering the homepage."}
        </p>
        <Link
          href="/projects"
          onClick={() => trackNavClick("all_projects", "projects_section")}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:translate-y-[-1px]"
        >
          Explore all projects
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
    </section>
  );
}
