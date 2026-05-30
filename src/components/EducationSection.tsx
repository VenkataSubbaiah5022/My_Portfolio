"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { trackOutboundClick } from "@/lib/analytics";

const collegeLogo = "/education/rgmcet-logo.png";

const education = [
  {
    period: "2021 – 2025",
    degree:
      "Bachelor of Technology (B.Tech) in Computer Science & Engineering (Business Systems)",
    college: {
      name: "Rajeev Gandhi Memorial College of Engineering & Technology",
      url: "https://www.rgmcet.edu.in/",
    },
    score: "CGPA: 8.01 / 10",
    highlights: [
      "Class Representative (2021–2025) for 60+ students — liaison between peers, faculty, and department.",
      "Coordinated academic updates, events, and issue resolution with strong communication and ownership.",
    ],
  },
];

export function EducationSection() {
  return (
    <section id="education" className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
      <h2 className="mb-6 text-2xl font-semibold md:mb-8 md:text-3xl">Education</h2>
      <div className="space-y-4">
        {education.map((item, idx) => (
          <motion.article
            key={item.degree}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-start gap-3">
              <a
                href={item.college.url}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackOutboundClick("RGMCE", item.college.url, "education")
                }
                className="mt-0.5 shrink-0 rounded-lg border border-border bg-background p-1.5 transition hover:border-primary/30"
                aria-label="Rajeev Gandhi Memorial College of Engineering and Technology"
              >
                <Image
                  src={collegeLogo}
                  alt="RGMCE college logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </a>
              <div className="min-w-0 flex-1">
                <a
                  href={item.college.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackOutboundClick("RGMCE", item.college.url, "education")
                  }
                  className="text-sm font-medium text-foreground transition hover:text-primary"
                >
                  {item.college.name}
                </a>
                <h3 className="mt-2 text-lg font-semibold md:text-xl">{item.degree}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.period} | {item.score}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {item.highlights.map((point) => (
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
