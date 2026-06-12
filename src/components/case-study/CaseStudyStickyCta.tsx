"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ExternalLink, GitBranch, Layers } from "lucide-react";
import { trackNavClick, trackOutboundClick } from "@/lib/analytics";
import type { ProjectPrimaryAction } from "@/lib/projects";
import { cn } from "@/lib/utils";

type CaseStudyStickyCtaProps = {
  projectTitle: string;
  primaryAction: ProjectPrimaryAction;
  code?: string | null;
  architectureHref?: string | null;
  accentSolid?: string;
  accentSolidHover?: string;
  accentSolidText?: string;
  accentBorder?: string;
  accentBg?: string;
};

export function CaseStudyStickyCta({
  projectTitle,
  primaryAction,
  code,
  architectureHref,
  accentSolid = "bg-primary",
  accentSolidHover = "hover:bg-primary/90",
  accentSolidText = "text-primary-foreground",
  accentBorder = "border-primary/30",
  accentBg = "bg-primary/10",
}: CaseStudyStickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!primaryAction.enabled && !code && !architectureHref) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/95 p-3 backdrop-blur-md transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-lg gap-2">
        {primaryAction.enabled ? (
          <a
            href={primaryAction.href}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackOutboundClick(
                `${projectTitle} ${primaryAction.label}`,
                primaryAction.href,
                "case_study_sticky",
              )
            }
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition",
              accentSolid,
              accentSolidHover,
              accentSolidText,
            )}
          >
            <ExternalLink className="h-4 w-4" />
            {primaryAction.label}
          </a>
        ) : null}
        {code ? (
          <a
            href={code}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackOutboundClick(`${projectTitle} Code`, code, "case_study_sticky")
            }
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm",
              accentBorder,
              accentBg,
            )}
          >
            <GitBranch className="h-4 w-4" />
            Code
          </a>
        ) : null}
        {architectureHref ? (
          <Link
            href={architectureHref}
            onClick={() => trackNavClick("system_design", "case_study_sticky")}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm",
              accentBorder,
              accentBg,
            )}
          >
            <Layers className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
