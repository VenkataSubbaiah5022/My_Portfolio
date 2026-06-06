import { projects } from "@/lib/projects";
import { CONTACT_EMAIL } from "@/lib/contact";

export type CommandGroup = "navigate" | "actions" | "links" | "projects";

export type CommandItem = {
  id: string;
  group: CommandGroup;
  label: string;
  description?: string;
  href: string;
  external?: boolean;
  download?: boolean;
  keywords?: string[];
};

export const COMMAND_GROUP_LABELS: Record<CommandGroup, string> = {
  navigate: "Navigate",
  actions: "Actions",
  links: "Links",
  projects: "Projects",
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://venkata-fullstack.vercel.app";

const UPWORK_URL =
  "https://www.upwork.com/freelancers/~017b9a8b315e94f07a?mp_source=share";

const GITHUB_URL = "https://github.com/VenkataSubbaiah5022";
const LINKEDIN_URL =
  "https://www.linkedin.com/in/aitha-venkata-subbaiah-setty/";

const navigationCommands: CommandItem[] = [
  {
    id: "home",
    group: "navigate",
    label: "Home",
    description: "Back to the top",
    href: "/",
    keywords: ["top", "hero", "start"],
  },
  {
    id: "about",
    group: "navigate",
    label: "About",
    description: "Background, education & current role",
    href: "#about",
    keywords: ["bio", "profile", "introduction", "about me"],
  },
  {
    id: "skills",
    group: "navigate",
    label: "Tech",
    description: "Technologies I work with daily",
    href: "#skills",
    keywords: ["skills", "stack", "tools", "technologies", "tech"],
  },
  {
    id: "projects",
    group: "navigate",
    label: "Projects",
    description: "Flowboard, Jarvis AI, Timesheet & more",
    href: "#projects",
    keywords: ["work", "portfolio", "builds"],
  },
  {
    id: "experience",
    group: "navigate",
    label: "Career",
    description: "Work history & professional experience",
    href: "#experience",
    keywords: ["jobs", "work", "employment", "stratosfy", "career"],
  },
  {
    id: "recommendations",
    group: "navigate",
    label: "Why me",
    description: "Testimonials & reasons to work together",
    href: "#recommendations",
    keywords: ["testimonials", "reviews", "why me", "why hire"],
  },
  {
    id: "process",
    group: "navigate",
    label: "Process",
    description: "How I work — discovery to delivery",
    href: "#build-process",
    keywords: ["how i build", "workflow", "delivery"],
  },
  {
    id: "services",
    group: "navigate",
    label: "Services",
    description: "Full stack, APIs, cloud, IoT & collaboration",
    href: "#services",
    keywords: ["hire", "freelance", "full stack", "offerings"],
  },
  {
    id: "contact",
    group: "navigate",
    label: "Contact",
    description: "Get in touch",
    href: "#contact",
    keywords: ["email", "message", "connect"],
  },
  {
    id: "all-projects",
    group: "navigate",
    label: "All Projects",
    description: "Full project gallery page",
    href: "/projects",
    keywords: ["gallery", "case studies"],
  },
  {
    id: "challenges",
    group: "navigate",
    label: "Engineering Challenges",
    description: "Problems solved in production",
    href: "#challenges",
    keywords: ["problems", "technical"],
  },
  {
    id: "publications",
    group: "navigate",
    label: "Publications",
    description: "Research & published work",
    href: "#publications",
    keywords: ["research", "zenodo", "paper"],
  },
  {
    id: "github-proof",
    group: "navigate",
    label: "GitHub Activity",
    description: "Open source & contribution proof",
    href: "#github-proof",
    keywords: ["commits", "open source"],
  },
  {
    id: "writing",
    group: "navigate",
    label: "Writing",
    description: "Featured LinkedIn posts & insights",
    href: "#writing",
    keywords: ["linkedin", "posts", "articles"],
  },
  {
    id: "education",
    group: "navigate",
    label: "Education",
    description: "Degrees, certifications & learning",
    href: "#education",
    keywords: ["degree", "university", "school"],
  },
];

const actionCommands: CommandItem[] = [
  {
    id: "hire-upwork",
    group: "actions",
    label: "Hire on Upwork",
    description: "View profile & start a contract",
    href: UPWORK_URL,
    external: true,
    keywords: ["freelance", "contract", "book"],
  },
  {
    id: "email",
    group: "actions",
    label: "Email me",
    description: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    keywords: ["mail", "inbox", "reach"],
  },
  {
    id: "resume",
    group: "actions",
    label: "Download Resume",
    description: "PDF · Updated 2026",
    href: "/resume.pdf",
    download: true,
    keywords: ["cv", "pdf", "download"],
  },
];

const linkCommands: CommandItem[] = [
  {
    id: "github",
    group: "links",
    label: "GitHub",
    description: "github.com/VenkataSubbaiah5022",
    href: GITHUB_URL,
    external: true,
    keywords: ["code", "repos"],
  },
  {
    id: "linkedin",
    group: "links",
    label: "LinkedIn",
    description: "linkedin.com/in/aitha-venkata-subbaiah-setty",
    href: LINKEDIN_URL,
    external: true,
    keywords: ["network", "professional"],
  },
  {
    id: "site",
    group: "links",
    label: "venkata-fullstack.vercel.app",
    description: "You are here",
    href: SITE_URL,
    external: true,
    keywords: ["portfolio", "website", "live"],
  },
];

const projectCommands: CommandItem[] = projects.map((project) => ({
  id: `project-${project.slug}`,
  group: "projects" as const,
  label: project.title,
  description: project.problem,
  href: project.live ?? project.code ?? "#projects",
  external: Boolean(project.live || project.code),
  keywords: [project.slug, ...project.stack],
}));

export const commandItems: CommandItem[] = [
  ...navigationCommands,
  ...actionCommands,
  ...linkCommands,
  ...projectCommands,
];

export function filterCommands(query: string): CommandItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return commandItems;

  return commandItems.filter((item) => {
    const haystack = [
      item.label,
      item.description ?? "",
      item.group,
      ...(item.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return normalized.split(/\s+/).every((term) => haystack.includes(term));
  });
}

export function groupFilteredCommands(items: CommandItem[]) {
  const order: CommandGroup[] = ["navigate", "actions", "links", "projects"];

  return order
    .map((group) => ({
      group,
      label: COMMAND_GROUP_LABELS[group],
      items: items.filter((item) => item.group === group),
    }))
    .filter((section) => section.items.length > 0);
}
