"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { trackNavClick } from "@/lib/analytics";
import { projects } from "@/lib/projects";

const filters = [
  { id: "all", label: "All" },
  { id: "live", label: "Live demos" },
  { id: "progress", label: "In progress" },
] as const;

type FilterId = (typeof filters)[number]["id"];

export function AllProjectsView() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "live") {
      return projects.filter((project) => project.live);
    }
    if (activeFilter === "progress") {
      return projects.filter((project) => !project.live);
    }
    return projects;
  }, [activeFilter]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
      <Link
        href="/#projects"
        onClick={() => trackNavClick("projects", "all_projects_back")}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium tracking-widest text-primary uppercase">
            Portfolio
          </p>
          <h1 className="mt-2 text-3xl font-semibold md:text-4xl">All Projects</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            {projects.length} builds across web apps, AI products, and realtime systems.
            Filter by live demos or work in progress.
          </p>
        </div>
        <a
          href="https://github.com/VenkataSubbaiah5022"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-card px-4 py-2 text-sm transition hover:border-primary/50 md:self-auto"
        >
          GitHub profile <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              activeFilter === filter.id
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project, idx) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={idx}
            analyticsSource="all_projects"
          />
        ))}
      </div>
    </section>
  );
}
