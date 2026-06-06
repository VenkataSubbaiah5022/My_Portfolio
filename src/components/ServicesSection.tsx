"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Cloud,
  Code2,
  Globe,
  Lightbulb,
  Palette,
  Radio,
  type LucideIcon,
} from "lucide-react";
import { type PointerEvent } from "react";
import { ServicesStackIllustration } from "@/components/ServicesStackIllustration";
import { trackNavClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type ServiceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  accentBorder: string;
  accentBg: string;
  accentLine: string;
  accentGlow: string;
  accentRing: string;
};

const services: ServiceCard[] = [
  {
    title: "Full Stack Systems",
    description:
      "End-to-end web applications with React, Next.js, Node.js, and MongoDB — from API design to cloud deployment.",
    icon: Globe,
    accent: "text-indigo-600 dark:text-indigo-400",
    accentBorder: "border-indigo-500/20",
    accentBg: "bg-indigo-500/[0.08]",
    accentLine: "from-transparent via-indigo-500 to-transparent",
    accentGlow: "rgba(79, 70, 229, 0.16)",
    accentRing: "group-hover:shadow-[0_0_0_1px_rgba(79,70,229,0.22),0_20px_40px_-24px_rgba(79,70,229,0.55)]",
  },
  {
    title: "Backend & APIs",
    description:
      "REST and WebSocket APIs, microservices, auth, validation, and database design built for production scale.",
    icon: Code2,
    accent: "text-violet-600 dark:text-violet-400",
    accentBorder: "border-violet-500/20",
    accentBg: "bg-violet-500/[0.08]",
    accentLine: "from-transparent via-violet-500 to-transparent",
    accentGlow: "rgba(124, 58, 237, 0.16)",
    accentRing: "group-hover:shadow-[0_0_0_1px_rgba(124,58,237,0.22),0_20px_40px_-24px_rgba(124,58,237,0.5)]",
  },
  {
    title: "UI Engineering",
    description:
      "From wireframes to polished interfaces — responsive layouts, motion, and premium user experiences.",
    icon: Palette,
    accent: "text-purple-600 dark:text-purple-400",
    accentBorder: "border-purple-500/20",
    accentBg: "bg-purple-500/[0.08]",
    accentLine: "from-transparent via-purple-500 to-transparent",
    accentGlow: "rgba(147, 51, 234, 0.16)",
    accentRing: "group-hover:shadow-[0_0_0_1px_rgba(147,51,234,0.22),0_20px_40px_-24px_rgba(147,51,234,0.5)]",
  },
  {
    title: "Cloud & DevOps",
    description:
      "Scalable infrastructure with Docker, GCP, AWS, and CI/CD pipelines tuned for reliability.",
    icon: Cloud,
    accent: "text-emerald-600 dark:text-emerald-400",
    accentBorder: "border-emerald-500/20",
    accentBg: "bg-emerald-500/[0.08]",
    accentLine: "from-transparent via-emerald-400 to-transparent",
    accentGlow: "rgba(16, 185, 129, 0.16)",
    accentRing: "group-hover:shadow-[0_0_0_1px_rgba(16,185,129,0.22),0_20px_40px_-24px_rgba(16,185,129,0.45)]",
  },
  {
    title: "Real-time & IoT",
    description:
      "Event-driven systems, socket flows, telemetry ingestion, and monitoring for connected products.",
    icon: Radio,
    accent: "text-sky-600 dark:text-sky-400",
    accentBorder: "border-sky-500/20",
    accentBg: "bg-sky-500/[0.08]",
    accentLine: "from-transparent via-sky-400 to-transparent",
    accentGlow: "rgba(14, 165, 233, 0.16)",
    accentRing: "group-hover:shadow-[0_0_0_1px_rgba(14,165,233,0.22),0_20px_40px_-24px_rgba(14,165,233,0.45)]",
  },
  {
    title: "Architecture & Scaling",
    description:
      "System design, performance tuning, code quality, and hands-on support for growing product teams.",
    icon: Lightbulb,
    accent: "text-indigo-700 dark:text-indigo-300",
    accentBorder: "border-indigo-600/20",
    accentBg: "bg-indigo-600/[0.08]",
    accentLine: "from-transparent via-indigo-600 to-transparent",
    accentGlow: "rgba(67, 56, 202, 0.16)",
    accentRing: "group-hover:shadow-[0_0_0_1px_rgba(67,56,202,0.22),0_20px_40px_-24px_rgba(67,56,202,0.5)]",
  },
];

function ServiceCardItem({
  service,
  index,
}: {
  service: ServiceCard;
  index: number;
}) {
  const Icon = service.icon;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    event.currentTarget.style.setProperty("--spotlight-x", `${x}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${y}px`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--spotlight-x", "50%");
    event.currentTarget.style.setProperty("--spotlight-y", "0%");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        opacity: { duration: 0.4, delay: index * 0.06 },
        y: { type: "spring", stiffness: 340, damping: 24 },
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ ["--spotlight-color" as string]: service.accentGlow }}
      className={cn(
        "group relative isolate flex cursor-default flex-col gap-4 overflow-hidden rounded-2xl border border-border/80 bg-card/95 p-6 shadow-sm backdrop-blur-sm transition-[box-shadow,border-color] duration-500",
        service.accentRing,
        "hover:border-transparent",
      )}
    >
      <div
        aria-hidden
        className="service-card-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div
        aria-hidden
        className="service-card-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 dark:via-white/10"
      />

      <div
        aria-hidden
        className={cn(
          "absolute left-6 top-0 h-px rounded-full bg-gradient-to-r transition-all duration-500 ease-out",
          "w-6 group-hover:w-[calc(100%-3rem)] group-hover:opacity-100",
          service.accentLine,
        )}
      />

      <div className="flex items-start justify-between">
        <motion.div
          whileHover={{ rotate: -4, scale: 1.06 }}
          transition={{ type: "spring", stiffness: 420, damping: 18 }}
          className={cn(
            "relative flex h-12 w-12 items-center justify-center rounded-2xl border transition-shadow duration-300 group-hover:shadow-lg",
            service.accentBg,
            service.accentBorder,
          )}
        >
          <div
            aria-hidden
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-white/10"
          />
          <Icon className={cn("relative h-5 w-5", service.accent)} aria-hidden />
        </motion.div>

        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-transparent text-muted-foreground transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/10 group-hover:text-primary">
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden
          />
        </div>
      </div>

      <div className="relative">
        <h3 className="mb-1.5 text-base font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
          {service.title}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-muted-foreground/90">
          {service.description}
        </p>
      </div>

      <a
        href="#projects"
        onClick={() => trackNavClick("Projects", "services-card")}
        className="relative mt-auto flex w-fit items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-all duration-300 group-hover:gap-2 group-hover:text-primary"
      >
        Explore projects
        <ArrowRight className="h-3 w-3" aria-hidden />
      </a>
    </motion.article>
  );
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative scroll-mt-28 overflow-hidden py-16 md:py-20"
    >
      <div className="absolute inset-0 bg-[var(--services-surface)]" />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-[-10%] left-[-5%] h-[600px] w-[600px] rounded-full blur-[130px]"
          style={{
            background: `radial-gradient(circle, var(--services-glow-primary) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute right-[-5%] bottom-[-5%] h-[500px] w-[500px] rounded-full blur-[110px]"
          style={{
            background: `radial-gradient(circle, var(--services-glow-secondary) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute top-[40%] left-[35%] h-[300px] w-[300px] rounded-full blur-[90px]"
          style={{
            background: `radial-gradient(circle, var(--services-glow-tertiary) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-40 dark:opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(var(--services-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--services-grid-line) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-[-20px] left-0 select-none overflow-hidden text-center text-[clamp(80px,16vw,220px)] leading-none font-black tracking-[-0.04em] text-transparent"
        style={{ WebkitTextStroke: "1px var(--services-watermark-stroke)" }}
      >
        SYSTEMS
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[420px_1fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8 lg:sticky lg:top-28"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary uppercase">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              What I offer
            </span>

            <div>
              <h2 className="text-[clamp(38px,4.5vw,62px)] leading-[1.02] font-black tracking-tight text-foreground">
                My{" "}
                <span className="bg-gradient-to-br from-indigo-600 via-violet-500 to-indigo-800 bg-clip-text text-transparent dark:from-indigo-400 dark:via-blue-400 dark:to-indigo-600">
                  services
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
              From architecture to deployment — I build scalable systems designed for
              production.
            </p>

            <ServicesStackIllustration />

            <a
              href="#contact"
              onClick={() => trackNavClick("Contact", "services-cta")}
              className="inline-flex w-fit items-center gap-3 rounded-2xl bg-primary px-7 py-4 text-sm font-bold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-foreground/80" />
              Let&apos;s work together
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCardItem key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
