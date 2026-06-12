"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CaseStudyFlowPipelineProps = {
  steps: string[];
  accentBorder?: string;
  accentBg?: string;
  accentText?: string;
};

export function CaseStudyFlowPipeline({
  steps,
  accentBorder = "border-primary/30",
  accentBg = "bg-primary/10",
  accentText = "text-primary",
}: CaseStudyFlowPipelineProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/20 p-5 md:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <p className="relative text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
        Product flow
      </p>
      <div className="relative mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-2 sm:gap-3">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm",
                index === steps.length - 1
                  ? cn(accentBorder, accentBg, accentText)
                  : "border-border bg-background/90 text-foreground",
              )}
            >
              <span className="mr-1.5 text-[10px] text-muted-foreground">{index + 1}.</span>
              {step}
            </motion.span>
            {index < steps.length - 1 ? (
              <ArrowRight className="hidden h-3.5 w-3.5 text-muted-foreground/70 sm:block" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
