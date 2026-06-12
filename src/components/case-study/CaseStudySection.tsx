"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CaseStudySectionProps = {
  id: string;
  badge: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  accentClass?: string;
  children: React.ReactNode;
};

export function CaseStudySection({
  id,
  badge,
  title,
  description,
  icon: Icon,
  accentClass = "text-primary",
  children,
}: CaseStudySectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
      className="scroll-mt-28"
    >
      <div className="mb-6 flex items-start gap-4">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card shadow-sm",
            accentClass,
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
            {badge}
          </span>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-foreground md:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {children}
    </motion.section>
  );
}
