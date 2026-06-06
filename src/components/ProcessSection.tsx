"use client";

import { motion } from "framer-motion";
import {
  CodeXml,
  Map,
  Rocket,
  Search,
  type LucideIcon,
} from "lucide-react";
import { ProcessMethodIllustration } from "@/components/ProcessMethodIllustration";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

type StepAccent = {
  dot: string;
  dotBorder: string;
  dotShadow: string;
  label: string;
  iconBox: string;
  iconClass: string;
  tagClass: string;
  watermark: string;
  hoverBg: string;
  borderGradient: string;
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  accent: StepAccent;
};

const stepAccents: StepAccent[] = [
  {
    dot: "bg-indigo-600 dark:bg-indigo-400",
    dotBorder: "border-indigo-500/50",
    dotShadow: "shadow-[0_0_12px_rgba(79,70,229,0.38)]",
    label: "text-indigo-600 dark:text-indigo-400",
    iconBox: "bg-indigo-500/[0.07] border-indigo-500/20",
    iconClass: "text-indigo-600 dark:text-indigo-400",
    tagClass:
      "bg-indigo-500/[0.06] border-indigo-500/15 text-indigo-600 dark:text-indigo-400",
    watermark: "text-indigo-600/[0.07] dark:text-indigo-400/[0.07]",
    hoverBg: "bg-indigo-500/[0.08]",
    borderGradient:
      "linear-gradient(135deg, rgba(79, 70, 229, 0.35), rgba(129, 140, 248, 0.08))",
  },
  {
    dot: "bg-violet-500 dark:bg-violet-400",
    dotBorder: "border-violet-500/50",
    dotShadow: "shadow-[0_0_12px_rgba(124,58,237,0.38)]",
    label: "text-violet-600 dark:text-violet-400",
    iconBox: "bg-violet-500/[0.07] border-violet-500/20",
    iconClass: "text-violet-600 dark:text-violet-400",
    tagClass:
      "bg-violet-500/[0.06] border-violet-500/15 text-violet-600 dark:text-violet-400",
    watermark: "text-violet-600/[0.07] dark:text-violet-400/[0.07]",
    hoverBg: "bg-violet-500/[0.08]",
    borderGradient:
      "linear-gradient(135deg, rgba(124, 58, 237, 0.35), rgba(79, 70, 229, 0.08))",
  },
  {
    dot: "bg-purple-600 dark:bg-purple-400",
    dotBorder: "border-purple-500/50",
    dotShadow: "shadow-[0_0_12px_rgba(147,51,234,0.38)]",
    label: "text-purple-600 dark:text-purple-400",
    iconBox: "bg-purple-500/[0.07] border-purple-500/20",
    iconClass: "text-purple-600 dark:text-purple-400",
    tagClass:
      "bg-purple-500/[0.06] border-purple-500/15 text-purple-600 dark:text-purple-400",
    watermark: "text-purple-600/[0.07] dark:text-purple-400/[0.07]",
    hoverBg: "bg-purple-500/[0.08]",
    borderGradient:
      "linear-gradient(135deg, rgba(147, 51, 234, 0.35), rgba(79, 70, 229, 0.08))",
  },
  {
    dot: "bg-indigo-700 dark:bg-indigo-300",
    dotBorder: "border-indigo-600/50",
    dotShadow: "shadow-[0_0_12px_rgba(67,56,202,0.38)]",
    label: "text-indigo-700 dark:text-indigo-300",
    iconBox: "bg-indigo-600/[0.07] border-indigo-600/20",
    iconClass: "text-indigo-700 dark:text-indigo-300",
    tagClass:
      "bg-indigo-600/[0.06] border-indigo-600/15 text-indigo-700 dark:text-indigo-300",
    watermark: "text-indigo-700/[0.07] dark:text-indigo-300/[0.07]",
    hoverBg: "bg-indigo-600/[0.08]",
    borderGradient:
      "linear-gradient(135deg, rgba(67, 56, 202, 0.35), rgba(124, 58, 237, 0.08))",
  },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Research",
    description:
      "Understand goals, users, constraints and technical requirements before implementation.",
    tags: ["User Interviews", "Scope Definition", "Tech Audit"],
    icon: Search,
    accent: stepAccents[0],
  },
  {
    number: "02",
    title: "Strategic Planning",
    description: "Define architecture, roadmap, timelines and scalable technical direction.",
    tags: ["Architecture", "Milestones", "Tech Stack"],
    icon: Map,
    accent: stepAccents[1],
  },
  {
    number: "03",
    title: "Design & Build",
    description: "Build clean, performant and production-ready systems with modern technologies.",
    tags: ["System Design", "Development", "Integration"],
    icon: CodeXml,
    accent: stepAccents[2],
  },
  {
    number: "04",
    title: "Test, Launch & Iterate",
    description: "Deploy, monitor, optimize and continuously improve after launch.",
    tags: ["Testing", "Deployment", "Optimization"],
    icon: Rocket,
    accent: stepAccents[3],
  },
];

const highlights = [
  "Clean architecture",
  "Scalable systems",
  "Fast iteration",
  "Production-ready delivery",
];

function ProcessStepCard({ step, index }: { step: ProcessStep; index: number }) {
  const Icon = step.icon;
  const { accent } = step;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative pl-10 sm:pl-12"
    >
      <div
        className={cn(
          "absolute top-8 left-0 z-10 flex items-center justify-center",
          accent.dotShadow,
        )}
      >
        <div
          className={cn(
            "h-3.5 w-3.5 rounded-full border-2",
            accent.dot,
            accent.dotBorder,
          )}
        />
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 sm:p-7">
        <div
          aria-hidden
          className="step-card-hover-border pointer-events-none absolute inset-0 rounded-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: accent.borderGradient }}
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            accent.hoverBg,
          )}
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -top-4 -right-2 text-7xl leading-none font-black select-none sm:text-8xl",
            accent.watermark,
          )}
        >
          {step.number}
        </div>

        <div className="relative z-10 flex gap-5">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border",
              accent.iconBox,
            )}
          >
            <Icon className={cn("h-7 w-7", accent.iconClass)} aria-hidden />
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className={cn("mb-1 text-[10px] font-bold tracking-[0.2em] uppercase", accent.label)}>
              {step.number}
            </p>
            <h3 className="mb-2 text-lg font-bold sm:text-xl">{step.title}</h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {step.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-[11px] font-semibold",
                    accent.tagClass,
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProcessSection() {
  return (
    <section
      id="build-process"
      className="relative overflow-hidden py-16 md:py-20"
      style={{ background: "var(--process-surface)" }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute top-[5%] left-[-8%] h-[520px] w-[520px] rounded-full blur-[130px]"
          style={{
            background: `radial-gradient(circle, var(--process-glow-primary) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute right-[-5%] bottom-[10%] h-[480px] w-[480px] rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(circle, var(--process-glow-secondary) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-40 dark:opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(var(--process-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--process-grid-line) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8 lg:sticky lg:top-28"
          >
            <SectionHeading
              badge="How I work"
              titleBefore="How I transform ideas into"
              titleHighlight="scalable digital products."
              description="Structured enough to stay on track. Flexible enough to adapt. Every step built around delivering something that actually works."
              align="left"
              className="mb-0 md:mb-0"
            />
            <p className="-mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              From understanding the problem to shipping a solution that scales — this is
              my end-to-end approach.
            </p>
            <div className="h-px w-full max-w-xs bg-gradient-to-r from-primary/40 via-primary/25 to-transparent" />
            <ul className="flex flex-col gap-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <ProcessMethodIllustration />
          </motion.div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute top-6 bottom-6 left-[7px] hidden w-px sm:block"
              style={{
                background:
                  "linear-gradient(transparent, rgba(79, 70, 229, 0.3) 8%, rgba(129, 140, 248, 0.25) 50%, rgba(67, 56, 202, 0.2) 92%, transparent)",
              }}
            />
            <div className="flex flex-col gap-10 sm:gap-12">
              {processSteps.map((step, index) => (
                <ProcessStepCard key={step.number} step={step} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
