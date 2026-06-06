import { CodeXml, Map, Rocket, Search } from "lucide-react";

const steps = [
  {
    label: "Research",
    icon: Search,
    color: "text-indigo-600 dark:text-indigo-400",
    left: "8%",
    top: "12%",
    float: "services-float-3",
  },
  {
    label: "Strategy",
    icon: Map,
    color: "text-violet-600 dark:text-violet-400",
    left: "38%",
    top: "4%",
    float: "services-float-1",
  },
  {
    label: "Build",
    icon: CodeXml,
    color: "text-purple-600 dark:text-purple-400",
    left: "68%",
    top: "12%",
    float: "services-float-2",
  },
  {
    label: "Launch",
    icon: Rocket,
    color: "text-indigo-700 dark:text-indigo-300",
    left: "48%",
    top: "28%",
    float: "services-float-3",
  },
] as const;

export function ProcessMethodIllustration() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[320px] lg:mx-0">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[8%] left-1/2 h-[28%] w-[85%] -translate-x-1/2 rounded-full blur-[24px]"
        style={{
          background: `radial-gradient(var(--illus-plat-glow) 0%, transparent 70%)`,
        }}
      />
      <svg viewBox="0 0 320 240" className="h-full w-full" fill="none" aria-hidden>
        <polygon
          points="160,200 60,150 160,100 260,150"
          fill="var(--illus-plat-top)"
          opacity="0.9"
        />
        <polygon
          points="60,150 60,175 160,225 160,200"
          fill="var(--illus-plat-left)"
          opacity="0.95"
        />
        <polygon
          points="160,200 160,225 260,175 260,150"
          fill="var(--illus-plat-right)"
          opacity="0.95"
        />
      </svg>
      <div className="absolute inset-0">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.label}
              className={`absolute flex flex-col items-center gap-1.5 ${step.float}`}
              style={{ left: step.left, top: step.top }}
            >
              <div className="flex h-20 w-14 flex-col items-center justify-center gap-2 rounded-lg border border-primary/20 bg-card shadow-sm sm:h-24 sm:w-16">
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${step.color}`} aria-hidden />
                <span className="text-[9px] font-bold tracking-wider text-primary/80 uppercase sm:text-[10px]">
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
