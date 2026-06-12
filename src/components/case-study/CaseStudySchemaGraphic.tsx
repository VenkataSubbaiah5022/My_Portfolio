"use client";

import { motion } from "framer-motion";
import { Database } from "lucide-react";
import { cn } from "@/lib/utils";

type CaseStudySchemaGraphicProps = {
  title: string;
  points: string[];
  accentBorder?: string;
  accentBg?: string;
  accentText?: string;
  accentGradientBar?: string;
  heroGlow?: string;
};

export function CaseStudySchemaGraphic({
  title,
  points,
  accentBorder = "border-primary/30",
  accentBg = "bg-primary/10",
  accentText = "text-primary",
  accentGradientBar = "from-primary to-violet-400",
  heroGlow = "rgba(99, 102, 241, 0.12)",
}: CaseStudySchemaGraphicProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-3">
        {points.map((point, index) => (
          <motion.div
            key={point}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="flex gap-3 rounded-xl border border-border bg-card px-4 py-3"
          >
            <span
              className={cn(
                "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-[10px] font-bold",
                accentBorder,
                accentBg,
                accentText,
              )}
            >
              {index + 1}
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">{point}</p>
          </motion.div>
        ))}
      </div>

      <div
        className={cn("relative overflow-hidden rounded-2xl border bg-card p-5", accentBorder)}
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at top, ${heroGlow}, transparent 55%)`,
          }}
        />
        <div className="relative flex items-center gap-2">
          <Database className={cn("h-4 w-4", accentText)} />
          <p className={cn("text-xs font-bold tracking-widest uppercase", accentText)}>{title}</p>
        </div>
        <div className="relative mt-5 space-y-0">
          {points.map((point, index) => {
            const label = point.split("—")[0]?.trim() ?? `Entity ${index + 1}`;
            return (
              <div key={point} className="relative">
                {index > 0 ? (
                  <div
                    aria-hidden
                    className="mx-auto h-4 w-px bg-gradient-to-b from-border to-transparent"
                  />
                ) : null}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  className="rounded-xl border border-border/80 bg-background/80 px-4 py-3 shadow-sm backdrop-blur-sm"
                >
                  <p className="font-mono text-xs font-semibold text-foreground">{label}</p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn("h-full rounded-full bg-gradient-to-r", accentGradientBar)}
                      style={{ width: `${70 - index * 8}%` }}
                    />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
