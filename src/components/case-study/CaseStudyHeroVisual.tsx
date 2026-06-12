"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CaseStudyIllustration } from "@/components/case-study/CaseStudyIllustration";
import { cn } from "@/lib/utils";

type CaseStudyHeroVisualProps = {
  slug: string;
  title: string;
  heroImage?: string;
  thumbnailGradient: string;
  heroGlow: string;
};

export function CaseStudyHeroVisual({
  slug,
  title,
  heroImage,
  thumbnailGradient,
  heroGlow,
}: CaseStudyHeroVisualProps) {
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
        <CaseStudyIllustration slug={slug} className="w-full drop-shadow-xl" />
      </motion.div>

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
              live preview
            </span>
          </div>
          {heroImage ? (
            <div className="relative aspect-[16/10] bg-muted/30">
              <Image
                src={heroImage}
                alt={`${title} product screenshot`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 45vw, 220px"
                priority
              />
            </div>
          ) : (
            <div
              className={cn(
                "flex aspect-[16/10] items-end bg-gradient-to-br p-2",
                thumbnailGradient,
              )}
            >
              <span className="text-[10px] font-semibold text-white/90">{title}</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
