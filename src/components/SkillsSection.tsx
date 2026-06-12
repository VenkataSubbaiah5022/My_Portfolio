"use client";

import { motion } from "framer-motion";
import { CertificationsShowcase } from "@/components/CertificationsShowcase";
import { SectionHeading } from "@/components/SectionHeading";
import {
  techStackCategories,
  type TechStackCategory,
  type TechStackItem,
} from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

function SkillPill({
  item,
  category,
}: {
  item: TechStackItem;
  category: TechStackCategory;
}) {
  const Icon = item.icon;

  return (
    <div
      className={cn(
        "group relative flex cursor-default items-center gap-2.5 rounded-xl border border-border/80 bg-card px-4 shadow-sm",
        item.subtitle ? "py-2" : "py-2.5",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          category.hoverBg,
        )}
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-xl border opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          category.hoverBorder,
        )}
      />

      {Icon ? (
        <Icon
          className={cn(
            "relative z-10 h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
            item.iconClassName,
          )}
          style={item.iconClassName ? undefined : { color: item.iconColor }}
          aria-hidden
        />
      ) : (
        <span
          className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center text-sm font-black transition-transform duration-200 group-hover:scale-110"
          style={{ color: item.iconColor }}
          aria-hidden
        >
          {item.glyph}
        </span>
      )}

      <div className="relative z-10 flex min-w-0 flex-col">
        <span className="text-sm font-semibold whitespace-nowrap text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
          {item.name}
        </span>
        {item.subtitle ? (
          <span className="text-[10px] leading-tight whitespace-nowrap text-muted-foreground/60">
            {item.subtitle}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function TechCategoryBlock({
  category,
  index,
}: {
  category: TechStackCategory;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className={cn(
            "text-xs font-bold tracking-widest uppercase",
            category.labelColor,
          )}
        >
          {category.title}
        </span>
        <div
          className={cn(
            "h-px flex-1 bg-gradient-to-r to-transparent",
            category.lineFrom,
          )}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {category.items.map((item) => (
          <SkillPill key={item.name} item={item} category={category} />
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-28 overflow-hidden py-16 md:py-20"
    >
      <div className="absolute inset-0 bg-[var(--skills-surface)]" />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(circle, var(--skills-glow-primary) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full blur-[100px]"
          style={{
            background: `radial-gradient(circle, var(--skills-glow-secondary) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-40 dark:opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(var(--skills-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--skills-grid-line) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          badge="Tools of the trade"
          titleBefore="My"
          titleHighlight="tech stack"
          description="React, Node.js, MongoDB, Java, TypeScript, and cloud tools — the MERN stack and full stack technologies I use to ship fast, scalable products."
        />

        <div className="space-y-6">
          {techStackCategories.map((category, index) => (
            <TechCategoryBlock key={category.title} category={category} index={index} />
          ))}
        </div>

        <CertificationsShowcase />
      </div>
    </section>
  );
}
