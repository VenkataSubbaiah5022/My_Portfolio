"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Layers, Mail } from "lucide-react";
import type { SystemDesign } from "@/lib/system-design";
import { cn } from "@/lib/utils";
import { trackNavClick } from "@/lib/analytics";

type SystemDesignFooterProps = {
  prev: SystemDesign | null;
  next: SystemDesign | null;
  accentBorder?: string;
  accentText?: string;
  accentSolid?: string;
  accentSolidHover?: string;
  accentSolidText?: string;
  accentHoverBorder?: string;
};

function SystemDesignNavCard({
  design,
  direction,
  accentText,
  accentHoverBorder,
}: {
  design: SystemDesign;
  direction: "prev" | "next";
  accentText?: string;
  accentHoverBorder?: string;
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/system-design/${design.slug}`}
      onClick={() =>
        trackNavClick("system_design_detail", isNext ? "system_design_next" : "system_design_prev")
      }
      className={cn(
        "group flex items-center gap-3 overflow-hidden rounded-2xl border border-border bg-card p-3 transition md:p-4",
        accentHoverBorder,
      )}
    >
      {!isNext ? (
        <ArrowLeft className={cn("h-4 w-4 shrink-0 text-muted-foreground", accentText)} />
      ) : null}

      <div className="relative flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/80 bg-muted/30">
        {design.diagramType === "image" && design.imageSrc ? (
          <Image
            src={design.imageSrc}
            alt=""
            fill
            className="object-contain p-1"
            sizes="80px"
          />
        ) : (
          <Layers className={cn("h-6 w-6", accentText)} />
        )}
      </div>

      <div className={cn("min-w-0 flex-1", isNext && "text-right")}>
        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
          {isNext ? "Next architecture" : "Previous"}
        </p>
        <p className="truncate font-semibold text-foreground">{design.title}</p>
      </div>

      {isNext ? <ArrowRight className={cn("h-4 w-4 shrink-0", accentText)} /> : null}
    </Link>
  );
}

export function SystemDesignFooter({
  prev,
  next,
  accentBorder = "border-primary/30",
  accentText = "text-primary",
  accentSolid = "bg-primary",
  accentSolidHover = "hover:bg-primary/90",
  accentSolidText = "text-primary-foreground",
  accentHoverBorder = "hover:border-primary/40",
}: SystemDesignFooterProps) {
  return (
    <div className="border-t border-border/60 bg-[var(--section-tint)]">
      <div className="mx-auto max-w-6xl px-4 py-12 pb-14 md:py-14">
        <div
          className={cn(
            "mb-10 rounded-2xl border bg-gradient-to-br from-card to-background p-6 text-center md:p-8",
            accentBorder,
          )}
        >
          <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Architecture reviews
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground">
            Discuss system design?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Open to roles where distributed systems, IoT pipelines, and product architecture matter.
          </p>
          <Link
            href="/#contact"
            onClick={() => trackNavClick("contact", "system_design_footer")}
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
            <SystemDesignNavCard
              design={prev}
              direction="prev"
              accentText={accentText}
              accentHoverBorder={accentHoverBorder}
            />
          ) : (
            <div />
          )}
          {next ? (
            <SystemDesignNavCard
              design={next}
              direction="next"
              accentText={accentText}
              accentHoverBorder={accentHoverBorder}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
