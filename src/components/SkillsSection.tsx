"use client";

import { BadgeCheck, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { trackOutboundClick } from "@/lib/analytics";
import {
  techStackCategories,
  type TechStackCategory,
  type TechStackItem,
} from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

const featuredCertification = {
  title: "Frontend Developer (React)",
  issuer: "HackerRank",
  year: "2026",
  href: "https://www.hackerrank.com/certificates/019f73606e1a",
  description:
    "Passed HackerRank's verified skills certification covering React, CSS, and JavaScript. Listed on my HackerRank profile as a verified asset.",
  topics: ["React", "CSS", "JavaScript"],
};

const certifications = [
  "NPTEL - Cloud Computing (2024)",
  "NPTEL - Internet of Things (2024)",
  "Postman API Expert (2025)",
  "IBM Python Certification (2026)",
  "AWS Educate Badges (2026)",
  "MongoDB Skill Badges (2026)",
];

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center md:mb-12"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary uppercase">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Tools of the trade
          </span>
          <h2 className="text-4xl leading-tight font-black tracking-tight text-foreground sm:text-5xl">
            My{" "}
            <span className="bg-gradient-to-br from-indigo-600 via-violet-500 to-indigo-800 bg-clip-text text-transparent dark:from-indigo-400 dark:via-blue-400 dark:to-indigo-600">
              tech stack
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            From polished frontends to cloud-native backends — the tools I use to
            ship fast, scalable products.
          </p>
        </motion.div>

        <div className="space-y-6">
          {techStackCategories.map((category, index) => (
            <TechCategoryBlock key={category.title} category={category} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mt-10 rounded-2xl border border-border/80 bg-card/95 p-5 shadow-sm backdrop-blur-sm md:p-6"
        >
          <h3 className="text-sm font-bold tracking-widest text-primary uppercase">
            Certifications
          </h3>

          <article className="mt-4 rounded-2xl border border-primary/30 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.12),transparent_55%)] p-5 dark:bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.1),transparent_55%)]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-medium tracking-wide text-primary uppercase">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified · HackerRank
            </span>
            <h4 className="mt-3 text-base font-semibold md:text-lg">
              {featuredCertification.title}
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              {featuredCertification.issuer} Skills Certification ({featuredCertification.year})
            </p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {featuredCertification.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {featuredCertification.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-border px-2 py-1 text-[10px] text-muted-foreground"
                >
                  {topic}
                </span>
              ))}
            </div>
            <a
              href={featuredCertification.href}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackOutboundClick(
                  "HackerRank Certificate",
                  featuredCertification.href,
                  "skills",
                )
              }
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-medium text-primary transition hover:border-primary/60"
            >
              View Certificate
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </article>

          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
            {certifications.map((cert) => (
              <li key={cert}>- {cert}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
