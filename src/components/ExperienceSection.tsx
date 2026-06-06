"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { trackOutboundClick } from "@/lib/analytics";

type ExperienceLink = {
  label: string;
  url: string;
};

type ExperienceItem = {
  id: string;
  period: string;
  role: string;
  company: string;
  logo?: string;
  logoClassName?: string;
  logoAlt?: string;
  links?: ExperienceLink[];
  points: string[];
};

const timeline: ExperienceItem[] = [
  {
    id: "stratosfy",
    period: "April 2025 - March 2026",
    role: "Full Stack Developer",
    company: "Stratosfy (Remote - Ottawa, Canada) · Full time",
    logo: "/experience/stratosfy-logo full.png",
    logoClassName: "h-8 w-24 object-contain",
    logoAlt: "Stratosfy icon",
    links: [
      {
        label: "Play Store",
        url: "https://play.google.com/store/apps/details?id=io.stratosfy.tempgenie&hl=en_IN",
      },
      {
        label: "App Store",
        url: "https://apps.apple.com/ca/app/stratosfy/id1573760988",
      },
      {
        label: "Genius Platform",
        url: "https://login.genius.stratosfy.io/",
      },
    ],
    points: [
      "Developed 19+ microservices using Node.js and TypeScript for production IoT monitoring.",
      "Built 20+ REST APIs for telemetry ingestion and operational dashboards.",
      "Deployed features to live Stratosfy mobile apps and the Genius production platform.",
      "Reduced system downtime by 70% through data modeling and aggregation optimizations.",
      "Maintained 80%+ Jest coverage and improved release quality via GitHub Actions CI/CD.",
    ],
  },
  {
    id: "rk-microns",
    period: "May 2024 - Oct 2024",
    role: "Backend Developer Intern",
    company: "R K Microns (Rajasthan, India) · Internship",
    logo: "/experience/rk-microns-logo.png",
    logoAlt: "R K Microns logo",
    logoClassName: "h-8 w-24 object-contain",
    points: [
      "Built Python backend pipelines for AI-based defect detection workflows.",
      "Improved defect detection accuracy by 35%.",
      "Reduced manual inspection effort by 2 hours/day across 10+ operators.",
      "Collaborated with Flutter frontend teams for realtime visualization.",
    ],
  },
  {
    id: "chegg",
    period: "Sep 2023 - Mar 2026",
    role: "Computer Science Subject Expert",
    company: "Chegg (Remote) · Freelance",
    logo: "/experience/chegg-logo.png",
    logoAlt: "Chegg logo",
    logoClassName: "h-8 w-20 object-contain",
    points: [
      "Solved 500+ CS queries across DSA, DBMS, OS, SQL, Java, and Python.",
      "Delivered clear, structured step-by-step technical explanations.",
      "Maintained high response quality and consistency under strict timelines.",
    ],
  },
];

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
        {timeline.map((item, idx) => (
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
                <p className="text-xs tracking-widest text-primary uppercase">
                  {item.period}
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
                            `Stratosfy ${link.label}`,
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
