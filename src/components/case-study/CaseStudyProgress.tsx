"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type CaseStudyProgressProps = {
  accentClass?: string;
};

export function CaseStudyProgress({ accentClass = "bg-primary" }: CaseStudyProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-0.5 bg-border/40"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className={cn("h-full transition-[width] duration-150 ease-out", accentClass)}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
