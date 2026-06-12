"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import type { Project } from "@/lib/projects";
import { getProjectImages } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { trackNavClick } from "@/lib/analytics";

type CaseStudyFooterProps = {
  prev: Project | null;
  next: Project | null;
  accentBorder?: string;
  accentText?: string;
  accentSolid?: string;
  accentSolidHover?: string;
  accentSolidText?: string;
  accentHoverBorder?: string;
};

function CaseStudyNavCard({
  project,
  direction,
  accentBorder,
  accentText,
  accentHoverBorder,
}: {
  project: Project;
  direction: "prev" | "next";
  accentBorder?: string;
  accentText?: string;
  accentHoverBorder?: string;
}) {
  const image = getProjectImages(project)[0];
  const isNext = direction === "next";

  return (
    <Link
      href={`/projects/${project.slug}`}
      onClick={() =>
        trackNavClick("case_study", isNext ? "case_study_next" : "case_study_prev")
      }
      className={cn(
        "group flex items-center gap-3 overflow-hidden rounded-2xl border border-border bg-card p-3 transition md:p-4",
        accentHoverBorder,
      )}
    >
      {!isNext ? (
        <ArrowLeft
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition group-hover:opacity-100",
            accentText,
          )}
        />
      ) : null}

      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-border/80 bg-muted">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover object-top"
          sizes="80px"
        />
      </div>

      <div className={cn("min-w-0 flex-1", isNext && "text-right")}>
        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
          {isNext ? "Next case study" : "Previous"}
        </p>
        <p className="truncate font-semibold text-foreground">{project.title}</p>
      </div>

      {isNext ? <ArrowRight className={cn("h-4 w-4 shrink-0", accentText)} /> : null}
    </Link>
  );
}

export function CaseStudyFooter({
  prev,
  next,
  accentBorder = "border-primary/30",
  accentText = "text-primary",
  accentSolid = "bg-primary",
  accentSolidHover = "hover:bg-primary/90",
  accentSolidText = "text-primary-foreground",
  accentHoverBorder = "hover:border-primary/40",
}: CaseStudyFooterProps) {
  return (
    <div className="border-t border-border/60 bg-[var(--section-tint)]">
      <div className="mx-auto max-w-6xl px-4 py-12 pb-24 md:py-14 md:pb-14">
        <div
          className={cn(
            "mb-10 rounded-2xl border bg-gradient-to-br from-card to-background p-6 text-center md:p-8",
            accentBorder,
          )}
        >
          <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Work together
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground">
            Building something similar?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Open to full-time, contract, and product engineering roles. Let&apos;s talk about
            your stack, timeline, and what you&apos;re shipping.
          </p>
          <Link
            href="/#contact"
            onClick={() => trackNavClick("contact", "case_study_footer")}
            className={cn(
              "mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition hover:translate-y-[-1px]",
              accentSolid,
              accentSolidHover,
              accentSolidText,
            )}
          >
            <Mail className="h-4 w-4" />
            Get in touch
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {prev ? (
            <CaseStudyNavCard
              project={prev}
              direction="prev"
              accentBorder={accentBorder}
              accentText={accentText}
              accentHoverBorder={accentHoverBorder}
            />
          ) : (
            <div />
          )}

          {next ? (
            <CaseStudyNavCard
              project={next}
              direction="next"
              accentBorder={accentBorder}
              accentText={accentText}
              accentHoverBorder={accentHoverBorder}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
