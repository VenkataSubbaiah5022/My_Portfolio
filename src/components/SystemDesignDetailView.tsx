"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Cpu,
  Layers,
  Lightbulb,
  Server,
  Sparkles,
  Target,
  TriangleAlert,
  Zap,
} from "lucide-react";
import { CaseStudyArchitectureFlow } from "@/components/case-study/CaseStudyArchitectureFlow";
import { CaseStudyContentBand } from "@/components/case-study/CaseStudyContentBand";
import { CaseStudyHighlights } from "@/components/case-study/CaseStudyHighlights";
import { CaseStudyInsightQuote } from "@/components/case-study/CaseStudyInsightQuote";
import { CaseStudyMobileNav } from "@/components/case-study/CaseStudyMobileNav";
import {
  CaseStudyNav,
  type CaseStudyNavSection,
} from "@/components/case-study/CaseStudyNav";
import { CaseStudyProgress } from "@/components/case-study/CaseStudyProgress";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { SystemDesignFooter } from "@/components/system-design/SystemDesignFooter";
import { SystemDesignHeroVisual } from "@/components/system-design/SystemDesignHeroVisual";
import { trackNavClick } from "@/lib/analytics";
import { hasCaseStudy } from "@/lib/case-studies";
import { getProjectBySlug } from "@/lib/projects";
import { getSystemDesignTheme } from "@/lib/system-design-theme";
import {
  estimateSystemDesignReadingMinutes,
  getAdjacentSystemDesigns,
  getSystemDesignMetricCards,
  type SystemDesign,
} from "@/lib/system-design";
import { cn } from "@/lib/utils";

type SystemDesignDetailViewProps = {
  design: SystemDesign;
};

const metricIcons = [Zap, Server, Cpu, Brain] as const;

export function SystemDesignDetailView({ design }: SystemDesignDetailViewProps) {
  const theme = getSystemDesignTheme(design);
  const relatedProject =
    design.relatedProjectSlug ? getProjectBySlug(design.relatedProjectSlug) : undefined;
  const { prev, next } = getAdjacentSystemDesigns(design.slug);
  const readingMinutes = estimateSystemDesignReadingMinutes(design);
  const metricCards = getSystemDesignMetricCards(design);
  const featuredInsight = design.lessonsLearned[0];

  const navSections: CaseStudyNavSection[] = [
    { id: "overview", label: "Overview" },
    { id: "architecture", label: "Architecture" },
    { id: "highlights", label: "Highlights" },
    { id: "challenges", label: "Challenges" },
    { id: "lessons", label: "Lessons" },
    { id: "stack", label: "Stack" },
  ];

  return (
    <div className="relative">
      <CaseStudyProgress accentClass={theme.progressBar} />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{ background: theme.mesh }}
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b opacity-80",
            theme.gradient,
          )}
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 md:pb-16 md:pt-14">
          <Link
            href="/system-design"
            onClick={() => trackNavClick("system_design_index", "system_design_back")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All system designs
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-bold tracking-wide uppercase",
                    theme.accentBorder,
                    theme.accentBg,
                    theme.accentText,
                  )}
                >
                  System design
                </span>
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-semibold",
                    theme.accentMutedBorder,
                    theme.accentMutedBg,
                    theme.accentText,
                  )}
                >
                  Production systems
                </span>
                <span className="rounded-full border border-border bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                  {readingMinutes} min read
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
                {design.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {design.subtitle}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {design.stack.map((tech) => (
                  <span
                    key={tech}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm",
                      theme.accentBorder,
                      theme.accentBg,
                      theme.accentText,
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {relatedProject && hasCaseStudy(relatedProject.slug) ? (
                  <Link
                    href={`/projects/${relatedProject.slug}`}
                    onClick={() => trackNavClick("case_study", "system_design_hero")}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium shadow-lg transition hover:translate-y-[-1px]",
                      theme.accentSolid,
                      theme.accentSolidHover,
                      theme.accentSolidText,
                      theme.accentShadow,
                    )}
                  >
                    <Sparkles className="h-4 w-4" />
                    {relatedProject.title} case study
                  </Link>
                ) : null}
                <Link
                  href="/system-design"
                  onClick={() => trackNavClick("system_design_index", "system_design_hero")}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border bg-card/80 px-4 py-2.5 text-sm backdrop-blur-sm transition",
                    theme.accentBorder,
                    theme.accentHoverBorder,
                  )}
                >
                  <Layers className="h-4 w-4" />
                  All architectures
                </Link>
              </div>
            </motion.div>

            <SystemDesignHeroVisual
              slug={design.slug}
              title={design.title}
              category={design.category}
              relatedProjectSlug={design.relatedProjectSlug}
              diagramImage={
                design.diagramType === "image" ? design.imageSrc : null
              }
              heroGlow={theme.heroGlow}
            />
          </div>
        </div>
      </div>

      {/* Metrics strip */}
      <div className="border-b border-border/60 bg-card/50">
        <div className="mx-auto grid max-w-6xl gap-px bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
          {metricCards.map((metric, index) => {
            const Icon = metricIcons[index % metricIcons.length];
            return (
              <motion.div
                key={metric.value}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex items-center gap-3 bg-background px-5 py-5"
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
                    theme.accentBorder,
                    theme.accentBg,
                    theme.accentText,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black leading-tight tracking-tight text-foreground md:text-base">
                    {metric.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {featuredInsight ? (
        <CaseStudyInsightQuote
          quote={featuredInsight}
          accentBorder={theme.accentBorder}
          accentText={theme.accentText}
        />
      ) : null}

      {/* Main content + sticky nav */}
      <div className="mx-auto max-w-6xl px-4 pb-8 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14">
        <CaseStudyNav
          sections={navSections}
          activeNavBorder={theme.activeNavBorder}
          accentText={theme.accentText}
        />

        <div className="min-w-0">
          <CaseStudyMobileNav
            sections={navSections}
            accentBorder={theme.accentBorder}
            accentBg={theme.accentBg}
            accentText={theme.accentText}
          />

          <div className="space-y-0 pt-6 lg:pt-0">
            <CaseStudyContentBand tinted>
              <CaseStudySection
                id="overview"
                badge="01 — Context"
                title="System overview"
                icon={Target}
                accentClass={theme.accentText}
              >
                <p className="text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
                  {design.overview}
                </p>
              </CaseStudySection>
            </CaseStudyContentBand>

            <CaseStudyContentBand>
              <CaseStudySection
                id="architecture"
                badge="02 — Systems"
                title="Architecture diagram"
                description="Interactive layer map and end-to-end data flow through the system."
                icon={Layers}
                accentClass={theme.accentText}
              >
                <CaseStudyArchitectureFlow design={design} theme={theme} />
              </CaseStudySection>
            </CaseStudyContentBand>

            <CaseStudyContentBand tinted>
              <div id="highlights">
                <CaseStudyHighlights
                  highlights={design.highlights}
                  eyebrow="Architecture highlights"
                  title="Key design decisions"
                  embedded
                  accentBorder={theme.accentBorder}
                  accentBg={theme.accentBg}
                  accentText={theme.accentText}
                />
              </div>
            </CaseStudyContentBand>

            <CaseStudyContentBand>
              <CaseStudySection
                id="challenges"
                badge="03 — Hard parts"
                title="Engineering challenges"
                icon={TriangleAlert}
                accentClass={theme.accentText}
              >
                <div className="space-y-4">
                  {design.challenges.map((challenge, index) => (
                    <motion.article
                      key={challenge.title}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 md:p-6"
                    >
                      <div
                        aria-hidden
                        className={cn(
                          "absolute -right-4 -top-4 text-7xl font-black opacity-[0.04] transition group-hover:opacity-[0.07]",
                          theme.accentText,
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="relative flex gap-4">
                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold",
                            theme.accentBorder,
                            theme.accentBg,
                            theme.accentText,
                          )}
                        >
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-bold text-foreground">{challenge.title}</h3>
                            <span
                              className={cn(
                                "rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase",
                                theme.accentBorder,
                                theme.accentBg,
                                theme.accentText,
                              )}
                            >
                              Resolved
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {challenge.body}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </CaseStudySection>
            </CaseStudyContentBand>

            <CaseStudyContentBand tinted>
              <CaseStudySection
                id="lessons"
                badge="04 — Takeaways"
                title="Lessons learned"
                icon={Lightbulb}
                accentClass={theme.accentText}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {design.lessonsLearned.map((lesson, index) => (
                    <motion.blockquote
                      key={lesson}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className={cn(
                        "relative rounded-2xl border bg-gradient-to-br from-card to-muted/30 p-5",
                        theme.accentBorder,
                        index === 0 && "md:col-span-2",
                      )}
                    >
                      <Lightbulb className={cn("mb-3 h-5 w-5", theme.accentText)} />
                      <p
                        className={cn(
                          "leading-relaxed text-muted-foreground",
                          index === 0 ? "text-base md:text-lg" : "text-sm md:text-base",
                        )}
                      >
                        {lesson}
                      </p>
                    </motion.blockquote>
                  ))}
                </div>
              </CaseStudySection>
            </CaseStudyContentBand>

            <CaseStudyContentBand>
              <CaseStudySection
                id="stack"
                badge="05 — Stack"
                title="Technologies"
                description="Core tools and infrastructure powering this architecture."
                icon={CheckCircle2}
                accentClass={theme.accentText}
              >
                <div className="flex flex-wrap gap-2">
                  {design.stack.map((item) => (
                    <span
                      key={item}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm font-medium",
                        theme.accentBorder,
                        theme.accentBg,
                        theme.accentText,
                      )}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {relatedProject && hasCaseStudy(relatedProject.slug) ? (
                  <div
                    className={cn(
                      "mt-8 rounded-2xl border bg-gradient-to-br from-card to-muted/20 p-5 md:p-6",
                      theme.accentBorder,
                    )}
                  >
                    <p className="text-sm font-semibold text-foreground">Related case study</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      See screenshots, product metrics, and implementation details for{" "}
                      {relatedProject.title}.
                    </p>
                    <Link
                      href={`/projects/${relatedProject.slug}`}
                      onClick={() => trackNavClick("case_study", "system_design_stack")}
                      className={cn(
                        "mt-4 inline-flex items-center gap-2 text-sm font-medium hover:underline",
                        theme.accentText,
                      )}
                    >
                      Open {relatedProject.title} case study
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ) : null}
              </CaseStudySection>
            </CaseStudyContentBand>
          </div>
        </div>
      </div>

      <SystemDesignFooter
        prev={prev}
        next={next}
        accentBorder={theme.accentBorder}
        accentText={theme.accentText}
        accentSolid={theme.accentSolid}
        accentSolidHover={theme.accentSolidHover}
        accentSolidText={theme.accentSolidText}
        accentHoverBorder={theme.accentHoverBorder}
      />
    </div>
  );
}
