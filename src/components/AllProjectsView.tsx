"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { trackNavClick } from "@/lib/analytics";
import {
  getFilteredAndSortedProjects,
  getProjectFilterCount,
  projectFilters,
  projectSortOptions,
  type ProjectFilterId,
  type ProjectSortId,
} from "@/lib/project-filters";
import { projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function AllProjectsView() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>("all");
  const [activeSort, setActiveSort] = useState<ProjectSortId>("newest");

  const visibleProjects = useMemo(
    () => getFilteredAndSortedProjects(activeFilter, activeSort),
    [activeFilter, activeSort],
  );

  const activeFilterMeta = projectFilters.find((filter) => filter.id === activeFilter);

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
            {projects.length} builds across web apps, AI products, mobile games, and realtime
            systems. Filter by status or browse everything, then sort how you like.
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

      <div className="mt-8 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-medium text-muted-foreground">Filter</span>
          {projectFilters.map((filter) => {
            const count = getProjectFilterCount(filter.id);
            const isActive = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition",
                  isActive
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
                )}
              >
                {filter.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                    isActive ? "bg-primary/15" : "bg-muted text-muted-foreground",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-medium text-muted-foreground">Sort</span>
          {projectSortOptions.map((option) => {
            const isActive = activeSort === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setActiveSort(option.id)}
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1.5 text-xs transition",
                  isActive
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Showing {visibleProjects.length} of {projects.length}{" "}
        {visibleProjects.length === 1 ? "project" : "projects"}
        {activeFilter !== "all" ? ` in ${activeFilterMeta?.label.toLowerCase()}` : ""}
      </p>

      {visibleProjects.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={idx}
              analyticsSource="all_projects"
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-card/40 px-6 py-12 text-center">
          <p className="text-sm font-medium">No projects match this filter</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try another filter or switch back to All to see the full catalog.
          </p>
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className="mt-4 inline-flex items-center rounded-full border border-border px-4 py-2 text-xs transition hover:border-primary/40"
          >
            Show all projects
          </button>
        </div>
      )}
    </section>
  );
}
