"use client";

import { BadgeCheck, Check, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { trackOutboundClick } from "@/lib/analytics";
import { publications } from "@/lib/publications";

const [publication] = publications;

export function PublicationsSection() {
  return (
    <section id="publications" className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
      <SectionHeading
        badge="Published research"
        titleHighlight="Publications"
        description="Academic research documenting voice-driven AI systems, NLP pipelines, and hands-free automation workflows."
      />

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-lg md:p-6"
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.08),transparent_55%)]" />

        <div className="relative flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-medium text-primary">
            <BadgeCheck className="h-3.5 w-3.5" />
            Published on {publication.venue}
          </span>
          <span className="rounded-full border border-border px-2.5 py-1 text-[10px] text-muted-foreground">
            {publication.year}
          </span>
        </div>

        <h3 className="relative mt-4 text-lg font-semibold md:text-xl">
          {publication.title}
        </h3>
        <p className="relative mt-1 text-sm text-muted-foreground">
          {publication.subtitle}
        </p>

        <p className="relative mt-3 text-sm leading-7 text-muted-foreground">
          {publication.summary}
        </p>

        <div className="relative mt-5 rounded-xl border border-border/80 bg-background/50 p-4">
          <p className="text-xs font-semibold tracking-wide text-foreground uppercase">
            Research Areas
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {publication.researchAreas.map((area) => (
              <li
                key={area}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mt-4 flex flex-wrap gap-2">
          {publication.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2 py-1 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={publication.url}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            trackOutboundClick(
              `${publication.venue} Publication`,
              publication.url,
              "publications",
            )
          }
          className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:translate-y-[-1px]"
        >
          <FileText className="h-3.5 w-3.5" />
          Read Publication on {publication.venue}
        </a>
      </motion.article>
    </section>
  );
}
