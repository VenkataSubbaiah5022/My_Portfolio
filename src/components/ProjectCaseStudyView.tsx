"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  CircleAlert,
  ExternalLink,
  GitBranch,
  Layers,
  Lightbulb,
  Play,
  Sparkles,
  Target,
  Terminal,
  TriangleAlert,
  Wrench,
  Zap,
} from "lucide-react";
import { CaseStudyArchitectureFlow } from "@/components/case-study/CaseStudyArchitectureFlow";
import { CaseStudyBrowserFrame } from "@/components/case-study/CaseStudyBrowserFrame";
import { CaseStudyContentBand } from "@/components/case-study/CaseStudyContentBand";
import { CaseStudyFlowPipeline } from "@/components/case-study/CaseStudyFlowPipeline";
import { CaseStudyFooter } from "@/components/case-study/CaseStudyFooter";
import { CaseStudyHeroVisual } from "@/components/case-study/CaseStudyHeroVisual";
import { CaseStudyHighlights } from "@/components/case-study/CaseStudyHighlights";
import { CaseStudyInsightQuote } from "@/components/case-study/CaseStudyInsightQuote";
import { CaseStudyMobileNav } from "@/components/case-study/CaseStudyMobileNav";
import { CaseStudyStickyCta } from "@/components/case-study/CaseStudyStickyCta";
import {
  CaseStudyNav,
  type CaseStudyNavSection,
} from "@/components/case-study/CaseStudyNav";
import { CaseStudyProgress } from "@/components/case-study/CaseStudyProgress";
import { CaseStudySchemaGraphic } from "@/components/case-study/CaseStudySchemaGraphic";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { ProjectImageGallery } from "@/components/ProjectImageGallery";
import { trackNavClick, trackOutboundClick } from "@/lib/analytics";
import {
  estimateReadingMinutes,
  getAdjacentCaseStudies,
  type CaseStudy,
  type CaseStudySlug,
} from "@/lib/case-studies";
import { getCaseStudyTheme } from "@/lib/case-study-theme";
import {
  getProjectImages,
  getProjectKind,
  getProjectPrimaryAction,
  type Project,
} from "@/lib/projects";
import { getCaseStudyArchitecture } from "@/lib/case-study-architectures";
import { cn } from "@/lib/utils";

type ProjectCaseStudyViewProps = {
  project: Project;
  caseStudy: CaseStudy;
};

const metricIcons = [Zap, Target, Sparkles, Brain] as const;

export function ProjectCaseStudyView({ project, caseStudy }: ProjectCaseStudyViewProps) {
  const primaryAction = getProjectPrimaryAction(project);
  const architecture = getCaseStudyArchitecture(caseStudy.architectureSlug);
  const theme = getCaseStudyTheme(project.slug);
  const PrimaryIcon = getProjectKind(project) === "cli" ? Terminal : ExternalLink;

  const navSections: CaseStudyNavSection[] = [
    { id: "context", label: "Context" },
    ...(architecture ? [{ id: "architecture", label: "Architecture" }] : []),
    ...(caseStudy.databaseDesign ? [{ id: "database", label: "Data model" }] : []),
    { id: "decisions", label: "Decisions" },
    { id: "challenges", label: "Challenges" },
    { id: "lessons", label: "Lessons" },
  ];

  const { prev, next } = getAdjacentCaseStudies(project.slug as CaseStudySlug);
  const readingMinutes = estimateReadingMinutes(caseStudy, project.highlights.length);
  const heroImage = getProjectImages(project)[0];
  const featuredInsight = caseStudy.lessonsLearned[0];

  return (
    <div className="relative">
      <CaseStudyProgress accentClass={theme.progressBar} />
      <CaseStudyStickyCta
        projectTitle={project.title}
        primaryAction={primaryAction}
        code={project.code}
        accentSolid={theme.accentSolid}
        accentSolidHover={theme.accentSolidHover}
        accentSolidText={theme.accentSolidText}
        accentBorder={theme.accentBorder}
        accentBg={theme.accentBg}
      />
      {/* Hero band */}
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
            href="/projects"
            onClick={() => trackNavClick("all_projects", "case_study_back")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All projects
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
                  Case study
                </span>
                <span className="rounded-full border border-border bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                  {caseStudy.timeline}
                </span>
                <span className="rounded-full border border-border bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                  {readingMinutes} min read
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
                {project.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {project.problem}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{caseStudy.role}</span>
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
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
                {primaryAction.enabled ? (
                  <a
                    href={primaryAction.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackOutboundClick(
                        `${project.title} ${primaryAction.label}`,
                        primaryAction.href,
                        "case_study",
                      )
                    }
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium shadow-lg transition hover:translate-y-[-1px]",
                      theme.accentSolid,
                      theme.accentSolidHover,
                      theme.accentSolidText,
                      theme.accentShadow,
                    )}
                  >
                    <PrimaryIcon className="h-4 w-4" />
                    {primaryAction.label}
                  </a>
                ) : null}
                {project.code ? (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackOutboundClick(`${project.title} Code`, project.code!, "case_study")
                    }
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border bg-card/80 px-4 py-2.5 text-sm backdrop-blur-sm transition",
                      theme.accentBorder,
                      theme.accentHoverBorder,
                    )}
                  >
                    <GitBranch className="h-4 w-4" />
                    Source code
                  </a>
                ) : null}
                {caseStudy.demoVideoUrl ? (
                  <a
                    href={caseStudy.demoVideoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border bg-card/80 px-4 py-2.5 text-sm backdrop-blur-sm transition",
                      theme.accentBorder,
                      theme.accentHoverBorder,
                    )}
                  >
                    <Play className="h-4 w-4" />
                    Watch demo
                  </a>
                ) : null}
              </div>
            </motion.div>

            <CaseStudyHeroVisual
              slug={project.slug}
              title={project.title}
              heroImage={heroImage}
              thumbnailGradient={project.thumbnail}
              heroGlow={theme.heroGlow}
            />
          </div>
        </div>
      </div>

      {/* Metrics strip */}
      <div className="border-b border-border/60 bg-card/50">
        <div className="mx-auto grid max-w-6xl gap-px bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudy.metrics.map((metric, index) => {
            const Icon = metricIcons[index % metricIcons.length];
            return (
              <motion.div
                key={metric.label}
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
                  <p className="text-lg font-black tracking-tight text-foreground">
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

      <CaseStudyHighlights
        highlights={project.highlights}
        metrics={project.metrics}
        accentBorder={theme.accentBorder}
        accentBg={theme.accentBg}
        accentText={theme.accentText}
      />

      {/* Product screenshots */}
      <div className="mx-auto max-w-6xl px-4 pb-10 md:pb-12">
        <div className="mb-4">
          <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Product in action
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-foreground">
            Interface & flows
          </h2>
        </div>
        <CaseStudyBrowserFrame
          title={project.title}
          url={project.live}
          accentBorder={theme.accentBorder}
        >
          <ProjectImageGallery
            images={getProjectImages(project)}
            title={project.title}
            thumbnail={project.thumbnail}
          />
        </CaseStudyBrowserFrame>
      </div>

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
            id="context"
            badge="01 — Context"
            title="Problem & solution"
            icon={Target}
            accentClass={theme.accentText}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl border bg-card p-6",
                  theme.accentMutedBorder,
                )}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl"
                  style={{ background: theme.heroGlow, opacity: 0.35 }}
                />
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      theme.accentMutedBg,
                      theme.accentText,
                    )}
                  >
                    <CircleAlert className="h-4 w-4" />
                  </span>
                  <p className={cn("text-[10px] font-bold tracking-[0.2em] uppercase", theme.accentText)}>
                    The problem
                  </p>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                  {caseStudy.businessNeed}
                </p>
              </div>
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl border bg-card p-6",
                  theme.accentBorder,
                )}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl"
                  style={{ background: theme.heroGlow }}
                />
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      theme.accentBg,
                      theme.accentText,
                    )}
                  >
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <p className={cn("text-[10px] font-bold tracking-[0.2em] uppercase", theme.accentText)}>
                    The solution
                  </p>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                  {caseStudy.solution}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <CaseStudyFlowPipeline
                steps={caseStudy.deliveryFlow}
                accentBorder={theme.accentBorder}
                accentBg={theme.accentBg}
                accentText={theme.accentText}
              />
            </div>
          </CaseStudySection>
          </CaseStudyContentBand>

          {architecture ? (
            <CaseStudyContentBand>
            <CaseStudySection
              id="architecture"
              badge="02 — Systems"
              title="Architecture overview"
              description="How components connect — click layers in interactive diagrams to explore each tier."
              icon={Layers}
              accentClass={theme.accentText}
            >
              <CaseStudyArchitectureFlow design={architecture} theme={theme} />
            </CaseStudySection>
            </CaseStudyContentBand>
          ) : null}

          {caseStudy.databaseDesign ? (
            <CaseStudyContentBand tinted>
            <CaseStudySection
              id="database"
              badge="03 — Data"
              title={caseStudy.databaseDesign.title}
              icon={Brain}
              accentClass={theme.accentText}
            >
              <CaseStudySchemaGraphic
                title={caseStudy.databaseDesign.title}
                points={caseStudy.databaseDesign.points}
                accentBorder={theme.accentBorder}
                accentBg={theme.accentBg}
                accentText={theme.accentText}
                accentGradientBar={theme.accentGradientBar}
                heroGlow={theme.heroGlow}
              />
            </CaseStudySection>
            </CaseStudyContentBand>
          ) : null}

          <CaseStudyContentBand>
          <CaseStudySection
            id="decisions"
            badge="04 — Engineering"
            title="Technical decisions"
            description="Deliberate trade-offs that shaped the implementation."
            icon={Wrench}
            accentClass={theme.accentText}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {caseStudy.technicalDecisions.map((decision, index) => (
                <motion.div
                  key={decision}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase",
                        theme.accentBorder,
                        theme.accentBg,
                        theme.accentText,
                      )}
                    >
                      ADR {index + 1}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className={cn("mt-0.5 h-5 w-5 shrink-0", theme.accentText)} />
                    <p className="text-sm leading-relaxed text-muted-foreground">{decision}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>
          </CaseStudyContentBand>

          <CaseStudyContentBand tinted>
          <CaseStudySection
            id="challenges"
            badge="05 — Hard parts"
            title="Challenges solved"
            icon={TriangleAlert}
            accentClass={theme.accentText}
          >
            <div className="space-y-4">
              {caseStudy.challenges.map((challenge, index) => (
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

          <CaseStudyContentBand>
          <CaseStudySection
            id="lessons"
            badge="06 — Takeaways"
            title="Lessons learned"
            icon={Lightbulb}
            accentClass={theme.accentText}
          >
            <div className="grid gap-4 md:grid-cols-2">
              {caseStudy.lessonsLearned.map((lesson, index) => (
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

          </div>
        </div>
      </div>

      <CaseStudyFooter
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
