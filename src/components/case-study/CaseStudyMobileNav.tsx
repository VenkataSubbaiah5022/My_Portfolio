"use client";

import { useEffect, useState } from "react";
import type { CaseStudyNavSection } from "@/components/case-study/CaseStudyNav";
import { cn } from "@/lib/utils";

type CaseStudyMobileNavProps = {
  sections: CaseStudyNavSection[];
  accentBorder?: string;
  accentBg?: string;
  accentText?: string;
};

export function CaseStudyMobileNav({
  sections,
  accentBorder = "border-primary/40",
  accentBg = "bg-primary/10",
  accentText = "text-primary",
}: CaseStudyMobileNavProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    if (!sections.length) return;

    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-[3.25rem] z-40 -mx-4 border-b border-border/80 bg-background/90 px-4 py-2 backdrop-blur-md lg:hidden"
    >
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                isActive
                  ? cn(accentBorder, accentBg, accentText)
                  : "border-border bg-card text-muted-foreground",
              )}
            >
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
