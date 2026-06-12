export type CaseStudyTheme = {
  gradient: string;
  heroGlow: string;
  mesh: string;
  accentText: string;
  accentBorder: string;
  accentHoverBorder: string;
  accentBg: string;
  accentMutedBorder: string;
  accentMutedBg: string;
  accentSolid: string;
  accentSolidHover: string;
  accentSolidText: string;
  accentShadow: string;
  accentGradientBar: string;
  accentConnector: string;
  activeNavBorder: string;
  progressBar: string;
};

const themes: Record<string, CaseStudyTheme> = {
  "talentvault-ai": {
    gradient: "from-violet-500/40 via-purple-500/25 to-fuchsia-500/15",
    heroGlow: "rgba(139, 92, 246, 0.45)",
    mesh: "radial-gradient(circle at 20% 20%, rgba(139,92,246,0.22), transparent 45%), radial-gradient(circle at 80% 0%, rgba(168,85,247,0.15), transparent 40%)",
    accentText: "text-violet-600 dark:text-violet-400",
    accentBorder: "border-violet-500/35",
    accentHoverBorder: "hover:border-violet-500/35",
    accentBg: "bg-violet-500/10",
    accentMutedBorder: "border-violet-500/20",
    accentMutedBg: "bg-violet-500/5",
    accentSolid: "bg-violet-600",
    accentSolidHover: "hover:bg-violet-700",
    accentSolidText: "text-white",
    accentShadow: "shadow-violet-500/25",
    accentGradientBar: "from-violet-600 to-violet-400",
    accentConnector: "stroke-violet-500/50",
    activeNavBorder: "border-l-violet-500",
    progressBar: "bg-violet-500",
  },
  jobsprint: {
    gradient: "from-orange-500/40 via-amber-500/20 to-cyan-500/20",
    heroGlow: "rgba(249, 115, 22, 0.4)",
    mesh: "radial-gradient(circle at 15% 30%, rgba(249,115,22,0.2), transparent 42%), radial-gradient(circle at 85% 10%, rgba(34,211,238,0.16), transparent 38%)",
    accentText: "text-orange-600 dark:text-orange-400",
    accentBorder: "border-orange-500/35",
    accentHoverBorder: "hover:border-orange-500/35",
    accentBg: "bg-orange-500/10",
    accentMutedBorder: "border-orange-500/20",
    accentMutedBg: "bg-orange-500/5",
    accentSolid: "bg-orange-600",
    accentSolidHover: "hover:bg-orange-700",
    accentSolidText: "text-white",
    accentShadow: "shadow-orange-500/25",
    accentGradientBar: "from-orange-600 to-amber-400",
    accentConnector: "stroke-orange-500/50",
    activeNavBorder: "border-l-orange-500",
    progressBar: "bg-orange-500",
  },
  flowboard: {
    gradient: "from-emerald-500/40 via-teal-500/20 to-cyan-500/20",
    heroGlow: "rgba(16, 185, 129, 0.4)",
    mesh: "radial-gradient(circle at 25% 15%, rgba(16,185,129,0.2), transparent 44%), radial-gradient(circle at 75% 5%, rgba(6,182,212,0.14), transparent 40%)",
    accentText: "text-emerald-600 dark:text-emerald-400",
    accentBorder: "border-emerald-500/35",
    accentHoverBorder: "hover:border-emerald-500/35",
    accentBg: "bg-emerald-500/10",
    accentMutedBorder: "border-emerald-500/20",
    accentMutedBg: "bg-emerald-500/5",
    accentSolid: "bg-emerald-600",
    accentSolidHover: "hover:bg-emerald-700",
    accentSolidText: "text-white",
    accentShadow: "shadow-emerald-500/25",
    accentGradientBar: "from-emerald-600 to-teal-400",
    accentConnector: "stroke-emerald-500/50",
    activeNavBorder: "border-l-emerald-500",
    progressBar: "bg-emerald-500",
  },
  "duel-dots": {
    gradient: "from-red-500/35 via-rose-500/20 to-blue-500/25",
    heroGlow: "rgba(239, 68, 68, 0.38)",
    mesh: "radial-gradient(circle at 20% 25%, rgba(239,68,68,0.18), transparent 42%), radial-gradient(circle at 80% 10%, rgba(59,130,246,0.16), transparent 40%)",
    accentText: "text-red-600 dark:text-red-400",
    accentBorder: "border-red-500/35",
    accentHoverBorder: "hover:border-red-500/35",
    accentBg: "bg-red-500/10",
    accentMutedBorder: "border-red-500/20",
    accentMutedBg: "bg-red-500/5",
    accentSolid: "bg-red-600",
    accentSolidHover: "hover:bg-red-700",
    accentSolidText: "text-white",
    accentShadow: "shadow-red-500/25",
    accentGradientBar: "from-red-600 to-rose-400",
    accentConnector: "stroke-red-500/50",
    activeNavBorder: "border-l-red-500",
    progressBar: "bg-red-500",
  },
};

const defaultTheme: CaseStudyTheme = {
  gradient: "from-indigo-500/35 via-violet-500/20 to-blue-500/15",
  heroGlow: "rgba(99, 102, 241, 0.4)",
  mesh: "radial-gradient(circle at 30% 20%, rgba(99,102,241,0.18), transparent 45%)",
  accentText: "text-indigo-600 dark:text-indigo-400",
  accentBorder: "border-indigo-500/35",
  accentHoverBorder: "hover:border-indigo-500/35",
  accentBg: "bg-indigo-500/10",
  accentMutedBorder: "border-indigo-500/20",
  accentMutedBg: "bg-indigo-500/5",
  accentSolid: "bg-indigo-600",
  accentSolidHover: "hover:bg-indigo-700",
  accentSolidText: "text-white",
  accentShadow: "shadow-indigo-500/25",
  accentGradientBar: "from-indigo-600 to-violet-400",
  accentConnector: "stroke-indigo-500/50",
  activeNavBorder: "border-l-indigo-500",
  progressBar: "bg-indigo-500",
};

export function getCaseStudyTheme(slug: string): CaseStudyTheme {
  return themes[slug] ?? defaultTheme;
}
