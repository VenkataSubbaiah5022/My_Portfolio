"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type CaseStudyHighlightsProps = {
  highlights: string[];
  metrics?: string[];
  eyebrow?: string;
  title?: string;
  embedded?: boolean;
  accentBorder?: string;
  accentBg?: string;
  accentText?: string;
};

export function CaseStudyHighlights({
  highlights,
  metrics = [],
  eyebrow = "Product highlights",
  title = "What shipped",
  embedded = false,
  accentBorder = "border-primary/30",
  accentBg = "bg-primary/10",
  accentText = "text-primary",
}: CaseStudyHighlightsProps) {
  return (
    <section className={cn(!embedded && "mx-auto max-w-6xl px-4 py-10 md:py-12")}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-foreground">
            {title}
          </h2>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl border",
            accentBorder,
            accentBg,
          )}
        >
          <Sparkles className={cn("h-5 w-5", accentText)} />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {highlights.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className={cn(
              "rounded-xl border border-border border-l-4 bg-card p-4",
              accentBorder,
            )}
          >
            <div className="flex gap-3">
              <CheckCircle2 className={cn("mt-0.5 h-5 w-5 shrink-0", accentText)} />
              <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {metrics.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {metrics.map((metric) => (
            <span
              key={metric}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm",
                accentBorder,
                accentBg,
                accentText,
              )}
            >
              {metric}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
