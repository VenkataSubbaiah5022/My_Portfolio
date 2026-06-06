"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Cloud,
  CodeXml,
  Globe,
  Rocket,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Tablet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { type PointerEvent, useEffect, useRef } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

type FeatureAccent = {
  iconClass: string;
  tagClass: string;
  lineClass: string;
  hoverBg: string;
  iconBox: string;
  glow: string;
  spotlight: string;
  ring: string;
};

type FeatureCard = {
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  accent: FeatureAccent;
  gridClass: string;
  illustration: "tech" | "code" | "performance" | "responsive" | "async";
  wide?: boolean;
};

const accents = {
  indigo: {
    iconClass: "text-indigo-600 dark:text-indigo-400",
    tagClass:
      "bg-indigo-500/[0.08] border-indigo-500/20 text-indigo-600 dark:text-indigo-400",
    lineClass: "from-transparent via-indigo-500 to-transparent",
    hoverBg: "bg-indigo-500/[0.07]",
    iconBox:
      "bg-gradient-to-br from-indigo-500/10 to-indigo-500/[0.04] border-indigo-500/20 shadow-[0_0_24px_rgba(79,70,229,0.08)]",
    glow: "rgba(79, 70, 229, 0.25)",
    spotlight: "rgba(79, 70, 229, 0.14)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(79,70,229,0.22),0_24px_48px_-28px_rgba(79,70,229,0.5)]",
  },
  violet: {
    iconClass: "text-violet-600 dark:text-violet-400",
    tagClass:
      "bg-violet-500/[0.08] border-violet-500/20 text-violet-600 dark:text-violet-400",
    lineClass: "from-transparent via-violet-500 to-transparent",
    hoverBg: "bg-violet-500/[0.07]",
    iconBox:
      "bg-gradient-to-br from-violet-500/10 to-violet-500/[0.04] border-violet-500/20 shadow-[0_0_24px_rgba(124,58,237,0.08)]",
    glow: "rgba(124, 58, 237, 0.25)",
    spotlight: "rgba(124, 58, 237, 0.14)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(124,58,237,0.22),0_24px_48px_-28px_rgba(124,58,237,0.45)]",
  },
  purple: {
    iconClass: "text-purple-600 dark:text-purple-400",
    tagClass:
      "bg-purple-500/[0.08] border-purple-500/20 text-purple-600 dark:text-purple-400",
    lineClass: "from-transparent via-purple-500 to-transparent",
    hoverBg: "bg-purple-500/[0.07]",
    iconBox:
      "bg-gradient-to-br from-purple-500/10 to-purple-500/[0.04] border-purple-500/20 shadow-[0_0_24px_rgba(147,51,234,0.08)]",
    glow: "rgba(147, 51, 234, 0.25)",
    spotlight: "rgba(147, 51, 234, 0.14)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(147,51,234,0.22),0_24px_48px_-28px_rgba(147,51,234,0.45)]",
  },
  sky: {
    iconClass: "text-sky-600 dark:text-sky-400",
    tagClass:
      "bg-sky-500/[0.08] border-sky-500/20 text-sky-600 dark:text-sky-400",
    lineClass: "from-transparent via-sky-500 to-transparent",
    hoverBg: "bg-sky-500/[0.07]",
    iconBox:
      "bg-gradient-to-br from-sky-500/10 to-sky-500/[0.04] border-sky-500/20 shadow-[0_0_24px_rgba(14,165,233,0.08)]",
    glow: "rgba(14, 165, 233, 0.25)",
    spotlight: "rgba(14, 165, 233, 0.14)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(14,165,233,0.22),0_24px_48px_-28px_rgba(14,165,233,0.4)]",
  },
  blue: {
    iconClass: "text-blue-600 dark:text-blue-400",
    tagClass:
      "bg-blue-500/[0.08] border-blue-500/20 text-blue-600 dark:text-blue-400",
    lineClass: "from-transparent via-blue-500 to-transparent",
    hoverBg: "bg-blue-500/[0.07]",
    iconBox:
      "bg-gradient-to-br from-blue-500/10 to-blue-500/[0.04] border-blue-500/20 shadow-[0_0_24px_rgba(37,99,235,0.08)]",
    glow: "rgba(37, 99, 235, 0.25)",
    spotlight: "rgba(96, 165, 250, 0.14)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(37,99,235,0.22),0_24px_48px_-28px_rgba(37,99,235,0.4)]",
  },
} satisfies Record<string, FeatureAccent>;

const proofMetrics = [
  { value: "19+", label: "Microservices shipped" },
  { value: "80%+", label: "Test coverage maintained" },
  { value: "70%", label: "Downtime reduced" },
  { value: "1.5+", label: "Years production experience" },
];

const features: FeatureCard[] = [
  {
    title: "Latest Tech",
    description:
      "Production stacks that stay sharp — React, Next.js, Node.js, and TypeScript on cloud-ready infrastructure.",
    tags: ["React", "Next.js", "Node.js", "GCP"],
    icon: Zap,
    accent: accents.indigo,
    gridClass: "lg:col-span-7 lg:row-start-1 lg:min-h-[340px]",
    illustration: "tech",
  },
  {
    title: "Clean Code",
    description:
      "Linted, tested, typed, and documented — hand-off ready from day one, not an archaeology dig later.",
    tags: ["TypeScript", "ESLint", "Jest", "CI/CD"],
    icon: CodeXml,
    accent: accents.violet,
    gridClass: "lg:col-span-5 lg:row-start-1 lg:min-h-[340px]",
    illustration: "code",
  },
  {
    title: "Performance",
    description:
      "Architecture that respects Core Web Vitals — pruning bundle weight, caches, queries, and images before polish.",
    tags: ["Speed", "SEO", "Core Web Vitals"],
    icon: Rocket,
    accent: accents.purple,
    gridClass: "lg:col-span-5 lg:row-start-2 lg:min-h-[300px]",
    illustration: "performance",
  },
  {
    title: "Responsiveness",
    description:
      "Mobile-first flows that scale cleanly to tablet and desktop — no fragile breakpoints or phantom scrollbars.",
    tags: ["Mobile", "Tablet", "Desktop"],
    icon: Smartphone,
    accent: accents.sky,
    gridClass: "lg:col-span-7 lg:row-start-2 lg:min-h-[300px]",
    illustration: "responsive",
  },
  {
    title: "Async & Timezone-Ready",
    description:
      "Work fully async with global teams — already doing it daily at Stratosfy (Remote · Ottawa). No handholding, no timezone friction.",
    tags: ["Async", "Remote", "Global"],
    icon: Globe,
    accent: accents.blue,
    gridClass: "lg:col-span-12 lg:row-start-3 lg:min-h-[260px]",
    illustration: "async",
    wide: true,
  },
];

function AnimatedScore({ accent }: { accent: FeatureAccent }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 70, damping: 18 });

  useEffect(() => {
    if (isInView) motionValue.set(95);
  }, [isInView, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = String(Math.round(latest));
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={ref} className={cn("text-2xl font-black tabular-nums leading-none", accent.iconClass)}>
      0
    </span>
  );
}

function PerformanceRing({ accent }: { accent: FeatureAccent }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * 0.95;

  return (
    <div className="relative h-40 w-40 shrink-0">
      <svg ref={ref} className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-border/80"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="url(#whyMePerfGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: isInView ? circumference - progress : circumference }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          strokeDasharray={circumference}
        />
        <defs>
          <linearGradient id="whyMePerfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <AnimatedScore accent={accent} />
        <span className="mt-1 max-w-[4.25rem] text-[8px] leading-[1.2] font-semibold text-muted-foreground">
          Lighthouse score
        </span>
      </div>
    </div>
  );
}

function FeatureIllustration({
  type,
  accent,
}: {
  type: FeatureCard["illustration"];
  accent: FeatureAccent;
}) {
  if (type === "tech") {
    return (
      <div className="relative mt-6 flex h-[140px] items-center justify-center overflow-visible sm:h-[160px]">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-full opacity-40 blur-2xl"
          style={{
            background: `radial-gradient(at 50% 80%, ${accent.glow}, transparent 65%)`,
          }}
        />
        <div className="services-float-3 absolute aspect-[4/3] w-[46%] max-w-[180px] rounded-xl border border-border/80 bg-card/95 shadow-sm backdrop-blur-sm">
          <div className="absolute inset-2 flex flex-col items-center justify-center gap-1 rounded-lg bg-foreground/[0.04] dark:bg-foreground/[0.06]">
            <Cloud className={cn("h-7 w-7", accent.iconClass)} />
            <span className="text-[9px] font-bold tracking-wider text-muted-foreground uppercase">
              GCP
            </span>
          </div>
        </div>
        <div className="services-float-1 absolute z-[1] aspect-[4/3] w-[50%] max-w-[200px] rounded-xl border border-border bg-card/95 shadow-md backdrop-blur-sm">
          <div className="absolute inset-2 flex items-center justify-center gap-2 rounded-lg bg-foreground/[0.04] dark:bg-foreground/[0.06]">
            <Sparkles className={cn("h-7 w-7 shrink-0", accent.iconClass)} />
            <span className="text-[11px] font-black tracking-tight">Next.js</span>
          </div>
        </div>
        <div className="services-float-2 absolute z-[2] aspect-[4/3] w-[44%] max-w-[170px] rounded-xl border border-primary/25 bg-card shadow-lg">
          <div className="absolute inset-2 flex flex-col items-center justify-center gap-1 rounded-lg bg-foreground/[0.04] dark:bg-foreground/[0.06]">
            <span className={cn("text-[10px] font-bold uppercase tracking-wider", accent.iconClass)}>
              Node.js
            </span>
            <span className="text-[9px] font-semibold text-muted-foreground">TypeScript</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "code") {
    return (
      <div className="relative mt-auto min-h-[148px] pt-5">
        <div className="relative overflow-hidden rounded-xl border border-border/80 bg-card/95 opacity-90 shadow-sm backdrop-blur-sm">
          <div className="flex gap-1.5 border-b border-border/80 bg-foreground/[0.03] px-3 py-2 dark:bg-foreground/[0.05]">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            <span className="ml-2 truncate font-mono text-[9px] text-muted-foreground">
              api.service.ts
            </span>
          </div>
          <pre className="overflow-hidden p-3 text-left font-mono text-[10px] leading-relaxed text-muted-foreground">
            <span className="text-violet-600 dark:text-violet-400">export</span>{" "}
            <span className="text-indigo-600 dark:text-indigo-400">async function</span>{" "}
            <span className="text-foreground">getUser</span>() {"{"}
            {"\n  "}
            <span className="text-muted-foreground">return</span> await db.users.find();
            {"\n}"}
          </pre>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 6 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="absolute -top-1 -right-1 flex items-center gap-1.5 rounded-lg border border-emerald-500/25 bg-card px-2.5 py-1.5 text-[10px] font-bold text-emerald-600 shadow-lg dark:text-emerald-400"
        >
          <BadgeCheck className="h-3.5 w-3.5" />
          All checks passed
        </motion.div>
      </div>
    );
  }

  if (type === "performance") {
    return (
      <div className="relative mt-6 flex min-h-[150px] flex-col items-center justify-center">
        <div
          className="pointer-events-none absolute h-40 w-40 rounded-full opacity-30 blur-2xl"
          style={{ background: accent.glow }}
        />
        <PerformanceRing accent={accent} />
      </div>
    );
  }

  if (type === "responsive") {
    return (
      <div className="relative mt-6 flex h-[150px] items-end justify-center gap-3 pb-2 sm:gap-5">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 rounded-full opacity-30 blur-xl"
          style={{
            background: `radial-gradient(at 50% 100%, ${accent.glow}, transparent 70%)`,
          }}
        />
        <motion.div
          whileHover={{ y: -4 }}
          className="relative flex h-[72px] w-11 flex-col items-center rounded-lg border-2 border-sky-500/60 pt-2 shadow-[0_0_24px_rgba(14,165,233,0.2)]"
        >
          <div className="mb-1 h-1 w-1 rounded-full bg-sky-500" />
          <div className="h-10 w-8 rounded border border-border/80 bg-foreground/[0.04] dark:bg-foreground/[0.06]" />
        </motion.div>
        <motion.div
          whileHover={{ y: -6 }}
          className="relative z-[1] flex h-[92px] w-[52px] flex-col items-center rounded-xl border-2 border-sky-500 pt-2 shadow-[0_0_36px_rgba(14,165,233,0.27)]"
        >
          <Tablet className="mb-2 h-6 w-6 text-sky-500 opacity-70" />
          <div className="h-12 w-11 rounded-md border border-border/80 bg-foreground/[0.04] dark:bg-foreground/[0.06]" />
        </motion.div>
        <motion.div
          whileHover={{ y: -3 }}
          className="relative flex h-[68px] w-[108px] flex-col items-center rounded-lg border-2 border-sky-500/70 px-2 pt-3 shadow-[0_0_28px_rgba(14,165,233,0.22)]"
        >
          <div className="h-8 w-full rounded border border-border/80 bg-foreground/[0.04] dark:bg-foreground/[0.06]" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[150px] flex-col items-center justify-center lg:min-h-[180px]">
      <div
        className="pointer-events-none absolute h-40 w-40 rounded-full opacity-30 blur-2xl"
        style={{ background: accent.glow }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        className="absolute h-32 w-32 rounded-full border border-dashed border-blue-500/20"
      />
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-blue-500/25 bg-blue-500/[0.06] shadow-[0_0_40px_rgba(37,99,235,0.15)]">
        <Globe className={cn("h-12 w-12", accent.iconClass)} />
      </div>
      <div className="relative mt-4 flex flex-wrap justify-center gap-2">
        {[
          { zone: "IST · Hyderabad", live: true },
          { zone: "EST · Ottawa", live: false },
          { zone: "UTC overlap", live: false },
        ].map((item) => (
          <span
            key={item.zone}
            className="inline-flex items-center gap-1.5 rounded-md border border-blue-500/20 bg-blue-500/[0.08] px-2.5 py-1 text-[10px] font-semibold text-blue-600 dark:text-blue-400"
          >
            {item.live ? (
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
            ) : null}
            {item.zone}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeatureCardItem({ feature, index }: { feature: FeatureCard; index: number }) {
  const Icon = feature.icon;
  const { accent } = feature;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--spotlight-x", "50%");
    event.currentTarget.style.setProperty("--spotlight-y", "0%");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        opacity: { duration: 0.45, delay: index * 0.06 },
        y: { type: "spring", stiffness: 340, damping: 26 },
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ ["--spotlight-color" as string]: accent.spotlight }}
      className={cn(
        "group relative isolate flex h-full min-h-0 cursor-default flex-col overflow-hidden rounded-[1.35rem] border border-border/80 bg-card/95 p-7 shadow-sm backdrop-blur-sm transition-[box-shadow,border-color] duration-500 hover:border-transparent sm:min-h-[260px] sm:p-8",
        accent.ring,
        feature.gridClass,
        feature.wide && "lg:flex-row lg:items-stretch lg:gap-8",
      )}
    >
      <div
        aria-hidden
        className="service-card-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="service-card-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 dark:via-white/10"
      />
      <div
        aria-hidden
        className={cn(
          "absolute top-0 left-6 h-px rounded-full bg-gradient-to-r transition-all duration-500 ease-out",
          "w-8 opacity-70 group-hover:w-[calc(100%-3rem)] group-hover:opacity-100",
          accent.lineClass,
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          accent.hoverBg,
        )}
      />

      <div
        className={cn(
          "relative z-[1] flex flex-1 flex-col",
          feature.wide && "lg:max-w-xl lg:justify-center",
        )}
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <motion.div
            whileHover={{ rotate: -4, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 420, damping: 18 }}
            className={cn(
              "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border",
              accent.iconBox,
            )}
          >
            <Icon className={cn("h-7 w-7", accent.iconClass)} aria-hidden />
          </motion.div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-muted-foreground transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/10 group-hover:text-primary">
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </div>
        </div>
        <h3 className="mb-3 text-xl leading-tight font-black tracking-tight transition-colors duration-300 group-hover:text-primary sm:text-2xl">
          {feature.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {feature.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-md border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm transition-transform duration-200 group-hover:scale-[1.02]",
                accent.tagClass,
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "relative z-[1] flex flex-1 flex-col justify-end",
          feature.wide && "lg:justify-center lg:pl-4",
        )}
      >
        <FeatureIllustration type={feature.illustration} accent={accent} />
      </div>
    </motion.article>
  );
}

const qualityPillars = [
  {
    title: "Best Practices",
    subtitle: "Followed religiously",
    icon: Star,
    accent: accents.indigo,
  },
  {
    title: "Scalable Architecture",
    subtitle: "Built for growth",
    icon: Box,
    accent: accents.violet,
  },
  {
    title: "Reliability First",
    subtitle: "Tested & monitored",
    icon: Shield,
    accent: accents.purple,
  },
];

export function WhyMeSection() {
  return (
    <section
      id="recommendations"
      className="relative overflow-hidden py-16 md:py-20"
      style={{ background: "var(--why-me-surface)" }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute top-[15%] right-[-10%] h-[560px] w-[min(90vw,560px)] rounded-full blur-[140px]"
          style={{
            background: `radial-gradient(circle, var(--why-me-glow-primary) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-[5%] left-[-8%] h-[480px] w-[480px] rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(circle, var(--why-me-glow-secondary) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute top-[48%] left-[30%] h-[340px] w-[340px] rounded-full blur-[100px]"
          style={{
            background: `radial-gradient(circle, var(--why-me-glow-tertiary) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-40 dark:opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(var(--why-me-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--why-me-grid-line) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-[-20px] left-0 select-none overflow-hidden text-center text-[clamp(80px,16vw,220px)] leading-none font-black tracking-[-0.04em] text-transparent"
        style={{ WebkitTextStroke: "1px var(--services-watermark-stroke)" }}
      >
        SHIPPED
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeading
          badge="Why work with me"
          titleBefore="Built different,"
          titleHighlight="shipped right"
          description="Not just another developer. Here's what you actually get when we work together."
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mx-auto mb-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 md:mb-12"
        >
          {proofMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className="rounded-xl border border-border/80 bg-card/60 px-3 py-3 text-center backdrop-blur-sm transition-colors duration-300 hover:border-primary/25 hover:bg-card/90"
            >
              <p className="text-lg font-black tracking-tight text-primary sm:text-xl">
                {metric.value}
              </p>
              <p className="mt-1 text-[10px] leading-snug text-muted-foreground sm:text-[11px]">
                {metric.label}
              </p>
              <span className="sr-only">{`, metric ${index + 1} of ${proofMetrics.length}`}</span>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:grid-rows-[minmax(280px,auto)_minmax(260px,auto)_minmax(240px,auto)] lg:gap-6">
          {features.map((feature, index) => (
            <FeatureCardItem key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="group relative mt-10 overflow-hidden rounded-[1.35rem] border border-border/80 bg-card/95 p-8 shadow-sm backdrop-blur-sm transition-shadow duration-500 hover:shadow-md md:mt-12 md:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
            style={{ background: "rgba(79, 70, 229, 0.15)" }}
          />
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-12">
            <div className="flex flex-1 gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 shadow-[0_0_24px_rgba(79,70,229,0.12)]">
                <ShieldCheck className="h-7 w-7 text-primary" aria-hidden />
              </div>
              <div>
                <h3 className="mb-3 text-xl leading-snug font-black tracking-tight md:text-2xl">
                  Quality isn&apos;t a feature. It&apos;s the baseline.
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  Every engagement ships with sane defaults: reviews that catch regressions
                  early, architectures that tolerate growth, and tooling that stays maintainable
                  past v1.
                </p>
              </div>
            </div>

            <div
              aria-hidden
              className="hidden w-px shrink-0 bg-gradient-to-b from-transparent via-border to-transparent lg:block"
            />

            <div className="grid flex-[1.1] grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
              {qualityPillars.map((pillar) => {
                const PillarIcon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="relative flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-0.5 sm:items-start sm:border-l sm:border-border/80 sm:pl-8 sm:text-left first:sm:border-l-0 first:sm:pl-0"
                  >
                    <div
                      className={cn(
                        "mb-3 flex h-11 w-11 items-center justify-center rounded-xl border transition-shadow duration-300 group-hover:shadow-md",
                        pillar.accent.iconBox,
                      )}
                    >
                      <PillarIcon className={cn("h-5 w-5", pillar.accent.iconClass)} />
                    </div>
                    <p className="mb-1 text-sm font-bold">{pillar.title}</p>
                    <p className="text-xs leading-snug text-muted-foreground">{pillar.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
