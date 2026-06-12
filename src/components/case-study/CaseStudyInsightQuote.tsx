"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

type CaseStudyInsightQuoteProps = {
  quote: string;
  accentBorder?: string;
  accentText?: string;
};

export function CaseStudyInsightQuote({
  quote,
  accentBorder = "border-primary/30",
  accentText = "text-primary",
}: CaseStudyInsightQuoteProps) {
  return (
    <section className="border-y border-border/60 bg-[var(--section-tint)]">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "relative rounded-2xl border bg-card/80 p-6 backdrop-blur-sm md:p-8",
            accentBorder,
          )}
        >
          <Quote className={cn("h-8 w-8 opacity-40", accentText)} />
          <p className="mt-3 text-lg leading-relaxed font-medium text-foreground md:text-xl md:leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
          <footer className="mt-4 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Key takeaway
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
