import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
import {
  SiAngular,
  SiAnthropic,
  SiClaude,
  SiDocker,
  SiExpo,
  SiExpress,
  SiFlutter,
  SiFramer,
  SiGit,
  SiGithubactions,
  SiGithubcopilot,
  SiGooglecloud,
  SiJavascript,
  SiJest,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenai,
  SiPerplexity,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiV0,
  SiVercel,
  SiWindsurf,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

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
      { name: "Angular", icon: SiAngular, iconColor: "#dd0031" },
      { name: "TypeScript", icon: SiTypescript, iconColor: "#3b82f6" },
      { name: "JavaScript", icon: SiJavascript, iconColor: "#facc15" },
      { name: "Tailwind CSS", icon: SiTailwindcss, iconColor: "#22d3ee" },
      { name: "Framer Motion", icon: SiFramer, iconColor: "#a855f7" },
    ],
  },
  {
    title: "Mobile",
    labelColor: "text-indigo-500 dark:text-indigo-400",
    lineFrom: "from-indigo-400/25",
    hoverBg: "bg-indigo-400/15",
    hoverBorder: "border-indigo-400/30",
    items: [
      { name: "React Native", icon: TbBrandReactNative, iconColor: "#61dafb" },
      {
        name: "Expo",
        icon: SiExpo,
        iconClassName: "text-slate-900 dark:text-white",
      },
      { name: "Flutter", icon: SiFlutter, iconColor: "#54c5f8" },
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
      { name: "AWS", icon: FaAws, iconColor: "#ff9900" },
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
        name: "Claude Code",
        icon: SiClaude,
        iconColor: "#d97757",
        subtitle: "Agentic terminal coding",
      },
      {
        name: "GitHub Copilot",
        icon: SiGithubcopilot,
        iconClassName: "text-slate-900 dark:text-white",
        subtitle: "In-editor AI suggestions",
      },
      {
        name: "Windsurf",
        icon: SiWindsurf,
        iconColor: "#0ea5e9",
        subtitle: "AI IDE (Codeium)",
      },
      {
        name: "v0",
        icon: SiV0,
        iconClassName: "text-slate-900 dark:text-white",
        subtitle: "UI component generation",
      },
      {
        name: "Claude API",
        icon: SiAnthropic,
        iconColor: "#d97757",
        subtitle: "Anthropic — shipped projects",
      },
      {
        name: "OpenAI API",
        icon: SiOpenai,
        iconColor: "#10a37f",
        subtitle: "GPT-4o integrations",
      },
      {
        name: "Vercel AI SDK",
        icon: SiVercel,
        iconClassName: "text-slate-900 dark:text-white",
        subtitle: "Streaming AI in Next.js",
      },
      {
        name: "Perplexity",
        icon: SiPerplexity,
        iconColor: "#20b8cd",
        subtitle: "AI-powered research",
      },
    ],
  },
];
