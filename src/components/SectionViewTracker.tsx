"use client";

import { useEffect } from "react";
import { isAnalyticsEnabled, trackSectionView } from "@/lib/analytics";

const trackedSections = new Set<string>();

export function SectionViewTracker() {
  useEffect(() => {
    if (!isAnalyticsEnabled) {
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]"),
    );

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const sectionId = entry.target.id;
          if (!sectionId || trackedSections.has(sectionId)) {
            continue;
          }

          trackedSections.add(sectionId);
          trackSectionView(sectionId);
        }
      },
      { threshold: 0.35 },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
