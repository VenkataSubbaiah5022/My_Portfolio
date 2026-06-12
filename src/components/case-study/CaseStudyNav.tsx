"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type CaseStudyNavSection = {
  id: string;
  label: string;
};

type CaseStudyNavProps = {
  sections: CaseStudyNavSection[];
  activeNavBorder?: string;
  accentText?: string;
};

export function CaseStudyNav({
  sections,
  activeNavBorder = "border-l-primary",
  accentText = "text-primary",
}: CaseStudyNavProps) {
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
        { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-auto lg:block"
    >
      <p className="mb-3 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
        On this page
      </p>
      <ul className="space-y-1 border-l border-border pl-3">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                "block border-l-2 py-1.5 pl-3 text-sm transition -ml-px",
                active === id
                  ? cn(activeNavBorder, accentText, "font-semibold")
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
