import type { IconType } from "react-icons";
import {
  SiDocker,
  SiExpress,
  SiFramer,
  SiGit,
  SiGithubactions,
  SiGooglecloud,
  SiJavascript,
  SiJest,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export type TechStackItem = {
  name: string;
  subtitle?: string;
  icon?: IconType;
  iconColor?: string;
  /** Theme-aware icon color; takes precedence over iconColor when set. */
  iconClassName?: string;
  glyph?: string;
};

export type TechStackCategory = {
  title: string;
  labelColor: string;
  lineFrom: string;
  hoverBg: string;
  hoverBorder: string;
  items: TechStackItem[];
};

export const techStackCategories: TechStackCategory[] = [
  {
    title: "Frontend",
    labelColor: "text-sky-500 dark:text-sky-400",
    lineFrom: "from-sky-400/25",
    hoverBg: "bg-sky-400/15",
    hoverBorder: "border-sky-400/30",
    items: [
      { name: "React", icon: SiReact, iconColor: "#38bdf8" },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        iconClassName: "text-slate-900 dark:text-white",
      },
      { name: "TypeScript", icon: SiTypescript, iconColor: "#3b82f6" },
      { name: "JavaScript", icon: SiJavascript, iconColor: "#facc15" },
      { name: "Tailwind CSS", icon: SiTailwindcss, iconColor: "#22d3ee" },
      { name: "Framer Motion", icon: SiFramer, iconColor: "#a855f7" },
    ],
  },
  {
    title: "Backend",
    labelColor: "text-emerald-500 dark:text-emerald-400",
    lineFrom: "from-emerald-400/25",
    hoverBg: "bg-emerald-400/15",
    hoverBorder: "border-emerald-400/30",
    items: [
      { name: "Node.js", icon: SiNodedotjs, iconColor: "#4ade80" },
      {
        name: "Express.js",
        icon: SiExpress,
        iconClassName: "text-slate-800 dark:text-white",
      },
      { name: "Python", icon: SiPython, iconColor: "#3776ab" },
      { name: "REST APIs", glyph: "API", iconColor: "#34d399" },
      { name: "WebSockets", glyph: "WS", iconColor: "#10b981" },
      {
        name: "Socket.io",
        icon: SiSocketdotio,
        iconClassName: "text-slate-900 dark:text-white",
      },
      { name: "Microservices", glyph: "μ", iconColor: "#059669" },
    ],
  },
  {
    title: "Databases",
    labelColor: "text-teal-500 dark:text-teal-400",
    lineFrom: "from-teal-400/25",
    hoverBg: "bg-teal-400/15",
    hoverBorder: "border-teal-400/30",
    items: [
      { name: "MongoDB", icon: SiMongodb, iconColor: "#22c55e" },
      { name: "PostgreSQL", icon: SiPostgresql, iconColor: "#60a5fa" },
      { name: "MySQL", icon: SiMysql, iconColor: "#f97316" },
      { name: "Redis", icon: SiRedis, iconColor: "#dc382d" },
    ],
  },
  {
    title: "Cloud & DevOps",
    labelColor: "text-amber-500 dark:text-amber-400",
    lineFrom: "from-amber-400/25",
    hoverBg: "bg-amber-400/15",
    hoverBorder: "border-amber-400/30",
    items: [
      { name: "Docker", icon: SiDocker, iconColor: "#38bdf8" },
      { name: "GCP", icon: SiGooglecloud, iconColor: "#4285f4" },
      { name: "AWS", glyph: "AWS", iconColor: "#f97316" },
      {
        name: "GitHub Actions",
        icon: SiGithubactions,
        iconClassName: "text-slate-900 dark:text-white",
      },
      { name: "NGINX", icon: SiNginx, iconColor: "#22c55e" },
    ],
  },
  {
    title: "Testing & Tools",
    labelColor: "text-pink-500 dark:text-pink-400",
    lineFrom: "from-pink-400/25",
    hoverBg: "bg-pink-400/15",
    hoverBorder: "border-pink-400/30",
    items: [
      { name: "Jest", icon: SiJest, iconColor: "#fb7185" },
      { name: "Pytest", glyph: "Py", iconColor: "#3776ab" },
      { name: "Postman", icon: SiPostman, iconColor: "#f97316" },
      { name: "Git", icon: SiGit, iconColor: "#f97316" },
    ],
  },
  {
    title: "AI & Integrations",
    labelColor: "text-violet-500 dark:text-violet-400",
    lineFrom: "from-violet-400/25",
    hoverBg: "bg-violet-400/15",
    hoverBorder: "border-violet-400/30",
    items: [
      {
        name: "Cursor",
        glyph: "⌘",
        iconColor: "#7c3aed",
        subtitle: "AI-native code editor",
      },
      {
        name: "OpenAI API",
        icon: SiOpenai,
        iconColor: "#10a37f",
        subtitle: "GPT integrations",
      },
      {
        name: "Vercel AI SDK",
        glyph: "▲",
        iconColor: "#6366f1",
        subtitle: "Streaming AI in Next.js",
      },
    ],
  },
];
