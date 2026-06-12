"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Cloud,
  GraduationCap,
  Layers,
  Radio,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { trackOutboundClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const collegeLogo = "/education/rgmcet-logo.png";
const stratosfyLogo = "/experience/stratosfy-logo full.png";

const STRATOSFY_URL = "https://login.genius.stratosfy.io/";
const COLLEGE_URL = "https://www.rgmcet.edu.in/";

const currentRoleTags = [
  "Node.js",
  "TypeScript",
  "MongoDB",
  "GCP",
  "Docker",
  "Jest",
  "GitHub Actions",
];

type Pillar = {
  label: string;
  headline: string;
  icon: LucideIcon;
  accent: string;
  iconBox: string;
  labelColor: string;
};

const pillars: Pillar[] = [
  {
    label: "Full Stack",
    headline: "Building scalable\nSaaS & IoT systems.",
    icon: Layers,
    accent: "text-indigo-600 dark:text-indigo-400",
    iconBox: "border-indigo-500/15 bg-indigo-500/[0.07]",
    labelColor: "text-indigo-600/70 dark:text-indigo-400/70",
  },
  {
    label: "Backend & Realtime",
    headline: "Shipping telemetry pipelines\nand 19+ microservices.",
    icon: Radio,
    accent: "text-violet-600 dark:text-violet-400",
    iconBox: "border-violet-500/15 bg-violet-500/[0.07]",
    labelColor: "text-violet-600/70 dark:text-violet-400/70",
  },
  {
    label: "Cloud & DevOps",
    headline: "Deploying reliable\ncloud-native apps.",
    icon: Cloud,
    accent: "text-emerald-600 dark:text-emerald-400",
    iconBox: "border-emerald-500/15 bg-emerald-500/[0.07]",
    labelColor: "text-emerald-600/70 dark:text-emerald-400/70",
  },
  {
    label: "AI-Augmented Dev",
    headline: "Building with LLM APIs —\nClaude & OpenAI — in production.",
    icon: Sparkles,
    accent: "text-purple-600 dark:text-purple-400",
    iconBox: "border-purple-500/15 bg-purple-500/[0.07]",
    labelColor: "text-purple-600/70 dark:text-purple-400/70",
  },
];

const openToRows = [
  { label: "Availability", value: "Full-time · available now" },
  { label: "Location", value: "Hyderabad · remote-friendly" },
  { label: "Also open to", value: "Bangalore · contract considered" },
  { label: "Best fit", value: "Product teams & backend-heavy roles" },
];

function EditorialCard({
  children,
  className,
  topLineClass = "from-transparent via-primary/40 to-transparent",
  delay = 0,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  topLineClass?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-none",
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute top-0 right-10 left-10 z-20 h-px bg-gradient-to-r",
          topLineClass,
        )}
      />
      {children}
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 md:py-20"
      style={{ background: "var(--section-tint)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 left-0 h-40"
        style={{
          background: "linear-gradient(var(--section-tint), transparent)",
        }}
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute top-[-10%] right-[-8%] h-[600px] w-[600px] rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-5%] left-[-5%] h-[500px] w-[500px] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(129, 140, 248, 0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute top-[8%] right-0 left-0 select-none overflow-hidden"
      >
        <div
          className="whitespace-nowrap text-center font-black tracking-[-0.04em] text-transparent"
          style={{
            fontSize: "clamp(100px, 18vw, 240px)",
            WebkitTextStroke: "1px var(--services-watermark-stroke)",
          }}
        >
          ENGINEER
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1300px] px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mb-10 md:mb-12"
        >
          <span className="mb-6 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
            <span className="h-px w-6 bg-primary" />
            The person behind the code
          </span>
          <h2 className="font-black leading-[0.92] tracking-tighter text-foreground [font-size:clamp(2.25rem,6vw,5.5rem)]">
            The engineer
            <br />
            <span className="bg-gradient-to-br from-indigo-600 via-violet-500 to-indigo-800 bg-clip-text text-transparent dark:from-indigo-400 dark:via-blue-400 dark:to-indigo-600">
              behind the systems.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
          <div className="flex flex-col gap-6">
            <EditorialCard className="relative">
              <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
                <div
                  className="absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(79, 70, 229, 0.12) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="absolute -top-[30%] -right-[20%] h-[min(320px,70%)] w-[min(320px,70%)] rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.12)_0%,transparent_68%)] blur-[40px]" />
                <div className="absolute -bottom-[25%] -left-[15%] h-[min(280px,55%)] w-[min(280px,55%)] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.08)_0%,transparent_70%)] blur-[48px]" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(0,0,0,0.03)_50%,transparent_60%)] opacity-[0.04] dark:opacity-[0.08]" />
                <p
                  className="absolute top-1/2 right-4 -translate-y-1/2 select-none font-black leading-none tracking-[-0.04em] text-transparent sm:right-8"
                  style={{
                    fontSize: "clamp(4.5rem, 14vw, 7.5rem)",
                    WebkitTextStroke: "1px rgba(79, 70, 229, 0.12)",
                  }}
                >
                  CRAFT
                </p>
                <p className="absolute bottom-6 left-6 font-mono text-[10px] font-bold tracking-[0.35em] text-primary/35 uppercase sm:left-10">
                  Build · Ship · Iterate
                </p>
              </div>

              <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-12 lg:px-[52px] lg:py-12">
                <p className="mb-6 font-black leading-tight tracking-tight text-foreground [font-size:clamp(1.5rem,4vw,2.4rem)]">
                  I build fast, clean software
                  <br />
                  <span className="text-indigo-700 dark:text-indigo-300">
                    and care deeply about the craft.
                  </span>
                </p>
                <p className="max-w-[440px] text-base leading-[1.8] text-muted-foreground">
                  Based in{" "}
                  <span className="font-semibold text-primary">Hyderabad, India</span>.
                  Full stack developer and software engineer specialising in MERN stack
                  backends, React interfaces, Node.js APIs, and AI-powered products.
                  Shipping production software for{" "}
                  <span className="font-semibold text-foreground">1.5+ years</span> — IoT
                  monitoring, real-time systems, and workflow platforms — and just getting
                  started.
                </p>
              </div>
            </EditorialCard>

            <EditorialCard
              className="rounded-xl px-5 py-6 sm:px-7"
              topLineClass="from-transparent via-emerald-500/45 to-transparent"
              delay={0.05}
            >
              <div className="mb-7 flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                  <Briefcase className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-xs font-bold tracking-[0.15em] text-emerald-600/70 uppercase dark:text-emerald-400/70">
                  Current Role
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={stratosfyLogo}
                    alt="Stratosfy logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base leading-tight font-bold text-foreground">
                    Full Stack Developer —{" "}
                    <a
                      href={STRATOSFY_URL}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() =>
                        trackOutboundClick("Stratosfy", STRATOSFY_URL, "about_current_role")
                      }
                      className="text-primary transition-colors hover:opacity-80"
                    >
                      Stratosfy
                    </a>
                  </h4>
                  <p className="mt-1 mb-4 text-[11px] text-muted-foreground">
                    April 2025 – March 2026 · Remote (Ottawa)
                  </p>
                  <p className="max-w-[380px] text-sm leading-relaxed text-muted-foreground">
                    Building the intelligence layer for a{" "}
                    <span className="font-semibold text-indigo-800 dark:text-indigo-300">
                      smart refrigeration & IoT monitoring platform
                    </span>{" "}
                    — 19+ Node.js microservices, telemetry ingestion, Genius dashboards, and
                    CI/CD with 80%+ test coverage.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {currentRoleTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-primary/15 bg-primary/[0.08] px-2 py-0.5 text-[10px] font-semibold text-indigo-800 dark:text-indigo-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </EditorialCard>

            <EditorialCard
              id="education"
              className="scroll-mt-28 rounded-xl px-5 py-5 sm:px-7"
              delay={0.1}
            >
              <div className="flex items-center gap-4">
                <a
                  href={COLLEGE_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackOutboundClick("RGMCET", COLLEGE_URL, "education")}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/[0.08] p-1.5 transition hover:border-primary/30"
                  aria-label="Rajeev Gandhi Memorial College of Engineering and Technology"
                >
                  <Image
                    src={collegeLogo}
                    alt="RGMCET college logo"
                    width={28}
                    height={28}
                    className="h-full w-full object-contain"
                  />
                </a>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <div className="text-sm font-semibold text-foreground">
                      B.Tech — Computer Science & Engineering (Business Systems)
                    </div>
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    <a
                      href={COLLEGE_URL}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackOutboundClick("RGMCET", COLLEGE_URL, "education")}
                      className="transition hover:text-primary"
                    >
                      RGMCET
                    </a>
                    {" · "}
                    Class of 2025 · CGPA 8.01 · Class Representative (60+ students)
                  </div>
                </div>
              </div>
            </EditorialCard>
          </div>

          <div className="flex flex-col gap-6">
            <EditorialCard className="flex-1 px-6 py-7 sm:px-7" delay={0.08}>
              <span className="mb-8 block text-[10px] font-bold tracking-[0.2em] text-indigo-800 uppercase dark:text-indigo-300">
                What I do
              </span>
              <div className="flex flex-col gap-7">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.label} className="group flex items-start gap-4">
                      <div
                        className={cn(
                          "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
                          pillar.iconBox,
                        )}
                      >
                        <Icon className={cn("h-3.5 w-3.5", pillar.accent)} aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <div
                          className={cn(
                            "mb-1 text-[10px] font-bold tracking-[0.15em] uppercase",
                            pillar.labelColor,
                          )}
                        >
                          {pillar.label}
                        </div>
                        <div className="font-black leading-tight tracking-tight text-foreground [font-size:clamp(1.1rem,1.6vw,1.35rem)] whitespace-pre-line">
                          {pillar.headline}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </EditorialCard>

            <EditorialCard className="rounded-xl px-6 py-6" delay={0.12}>
              <span className="mb-5 block text-[10px] font-bold tracking-[0.2em] text-indigo-800 uppercase dark:text-indigo-300">
                Open to opportunities
              </span>
              <div className="flex flex-col gap-3">
                {openToRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4">
                    <span className="text-[11px] tracking-wide text-muted-foreground">
                      {row.label}
                    </span>
                    <span className="text-right text-[12px] font-semibold text-foreground">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </EditorialCard>
          </div>
        </div>
      </div>
    </section>
  );
}
