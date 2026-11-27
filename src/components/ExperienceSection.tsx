"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { trackOutboundClick } from "@/lib/analytics";
import { experience } from "@/lib/experience";
import { formatExperienceDuration } from "@/lib/experience-duration";

export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
      <SectionHeading
        badge="Experience"
        titleBefore="Work"
        titleHighlight="experience"
        description="From intern to full-stack engineer — each role shaped how I think about building software that scales."
      />
      <div className="space-y-4">
        {experience.map((item, idx) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-start gap-3">
              {item.logo ? (
                <div className="mt-0.5 shrink-0 rounded-lg border border-border bg-card p-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.logo}
                    alt={item.logoAlt ?? "Company logo"}
                    width={32}
                    height={32}
                    className={item.logoClassName ?? "h-8 w-8 object-contain"}
                  />
                </div>
              ) : null}
              <div className="min-w-0 flex-1">
                <p className="text-xs">
                  <span className="tracking-widest text-primary uppercase">
                    {item.period}
                  </span>
                  <span className="text-muted-foreground">
                    {" "}
                    · {formatExperienceDuration(item.start, item.end)}
                  </span>
                </p>
                <h3 className="mt-2 text-lg font-semibold md:text-xl">{item.role}</h3>
                <p className="text-sm text-muted-foreground">{item.company}</p>
                {item.links?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() =>
                          trackOutboundClick(
                            `${item.company.split(" (")[0]} ${link.label}`,
                            link.url,
                            "experience",
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs transition hover:border-primary/50"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {item.points.map((point) => (
                    <li key={point}>- {point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
