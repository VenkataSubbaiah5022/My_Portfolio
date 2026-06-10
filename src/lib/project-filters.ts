import { isProjectInProgress, projects, type Project } from "@/lib/projects";

export type ProjectFilterId = "all" | "live" | "in-progress";

export type ProjectSortId = "newest" | "oldest" | "a-z" | "featured";

type ProjectFilter = {
  id: ProjectFilterId;
  label: string;
};

type ProjectSortOption = {
  id: ProjectSortId;
  label: string;
};

export const projectFilters: ProjectFilter[] = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "in-progress", label: "In progress" },
];

export const projectSortOptions: ProjectSortOption[] = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "a-z", label: "A → Z" },
  { id: "featured", label: "Featured" },
];

function matchesFilter(project: Project, filter: ProjectFilterId): boolean {
  if (filter === "live") {
    return Boolean(project.live);
  }
  if (filter === "in-progress") {
    return isProjectInProgress(project);
  }
  return true;
}

function sortProjects(items: Project[], sort: ProjectSortId): Project[] {
  const sorted = [...items];

  switch (sort) {
    case "oldest":
      return sorted.reverse();
    case "a-z":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "featured":
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    case "newest":
    default:
      return sorted;
  }
}

export function getProjectFilterCount(filter: ProjectFilterId): number {
  if (filter === "all") {
    return projects.length;
  }
  return projects.filter((project) => matchesFilter(project, filter)).length;
}

export function getFilteredAndSortedProjects(
  filter: ProjectFilterId,
  sort: ProjectSortId,
): Project[] {
  const filtered = projects.filter((project) => matchesFilter(project, filter));
  return sortProjects(filtered, sort);
}
