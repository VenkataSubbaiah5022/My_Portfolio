"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CaseStudyIllustration } from "@/components/case-study/CaseStudyIllustration";
import { SystemDesignIllustration } from "@/components/system-design/SystemDesignIllustration";
type SystemDesignHeroVisualProps = {
  slug: string;
  title: string;
  category: "production" | "product";
  relatedProjectSlug?: string;
  diagramImage?: string | null;
  heroGlow: string;
};

export function SystemDesignHeroVisual({
  slug,
  title,
  category,
  relatedProjectSlug,
  diagramImage,
  heroGlow,
}: SystemDesignHeroVisualProps) {
  const useProjectIllustration = category === "product" && relatedProjectSlug;

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
      <div
        aria-hidden
        className="absolute -inset-8 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${heroGlow}, transparent 70%)` }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative"
      >
        {useProjectIllustration ? (
          <CaseStudyIllustration slug={relatedProjectSlug} className="w-full drop-shadow-xl" />
        ) : (
          <SystemDesignIllustration slug={slug} className="w-full drop-shadow-xl" />
        )}
      </motion.div>

      {diagramImage ? (
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 2 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="absolute -bottom-3 -right-1 w-[56%] sm:-right-3 sm:w-[54%]"
        >
          <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-2xl shadow-black/20">
            <div className="flex items-center gap-1.5 border-b border-border/80 bg-muted/50 px-2.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/20" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/15" />
              <span className="ml-1 truncate font-mono text-[9px] text-muted-foreground">
                architecture diagram
              </span>
            </div>
            <div className="relative aspect-[16/10] bg-white dark:bg-slate-950">
              <Image
                src={diagramImage}
                alt={`${title} architecture diagram`}
                fill
                className="object-contain p-1"
                sizes="(max-width: 768px) 45vw, 220px"
                priority
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
