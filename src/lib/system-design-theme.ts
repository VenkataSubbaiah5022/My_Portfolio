import type { CaseStudyTheme } from "@/lib/case-study-theme";
import { getCaseStudyTheme } from "@/lib/case-study-theme";
import type { SystemDesign } from "@/lib/system-design";

const productionThemes: Record<string, CaseStudyTheme> = {
  "ev-fleet-operations": {
    gradient: "from-emerald-500/40 via-teal-500/25 to-lime-500/15",
    heroGlow: "rgba(16, 185, 129, 0.42)",
    mesh: "radial-gradient(circle at 18% 22%, rgba(16,185,129,0.22), transparent 45%), radial-gradient(circle at 82% 8%, rgba(20,184,166,0.14), transparent 40%)",
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
  "iot-telemetry-pipeline": {
    gradient: "from-cyan-500/40 via-teal-500/25 to-blue-500/15",
    heroGlow: "rgba(6, 182, 212, 0.42)",
    mesh: "radial-gradient(circle at 18% 22%, rgba(6,182,212,0.22), transparent 45%), radial-gradient(circle at 82% 8%, rgba(59,130,246,0.14), transparent 40%)",
    accentText: "text-cyan-600 dark:text-cyan-400",
    accentBorder: "border-cyan-500/35",
    accentHoverBorder: "hover:border-cyan-500/35",
    accentBg: "bg-cyan-500/10",
    accentMutedBorder: "border-cyan-500/20",
    accentMutedBg: "bg-cyan-500/5",
    accentSolid: "bg-cyan-600",
    accentSolidHover: "hover:bg-cyan-700",
    accentSolidText: "text-white",
    accentShadow: "shadow-cyan-500/25",
    accentGradientBar: "from-cyan-600 to-teal-400",
    accentConnector: "stroke-cyan-500/50",
    activeNavBorder: "border-l-cyan-500",
    progressBar: "bg-cyan-500",
  },
  "platform-microservices": {
    gradient: "from-indigo-500/40 via-blue-500/25 to-slate-500/15",
    heroGlow: "rgba(99, 102, 241, 0.42)",
    mesh: "radial-gradient(circle at 22% 18%, rgba(99,102,241,0.2), transparent 44%), radial-gradient(circle at 78% 12%, rgba(100,116,139,0.14), transparent 40%)",
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
    accentGradientBar: "from-indigo-600 to-blue-400",
    accentConnector: "stroke-indigo-500/50",
    activeNavBorder: "border-l-indigo-500",
    progressBar: "bg-indigo-500",
  },
};

export function getSystemDesignTheme(design: SystemDesign): CaseStudyTheme {
  if (design.relatedProjectSlug) {
    return getCaseStudyTheme(design.relatedProjectSlug);
  }
  return productionThemes[design.slug] ?? getCaseStudyTheme("");
}
