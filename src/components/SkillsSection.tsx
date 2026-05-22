"use client";

import { BadgeCheck, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { trackOutboundClick } from "@/lib/analytics";

const skillGroups = [
  {
    title: "Languages",
    items: "JavaScript, TypeScript, Python, Java, SQL, HTML5, CSS3",
  },
  {
    title: "Backend",
    items: "Node.js, Express.js, REST APIs, WebSockets, Microservices, JWT",
  },
  {
    title: "Frontend",
    items: "React.js, Next.js, Tailwind CSS, Framer Motion",
  },
  {
    title: "Cloud & DevOps",
    items: "GCP (Cloud Run, Pub/Sub), AWS (EC2, S3), Docker, GitHub Actions, NGINX",
  },
  {
    title: "Databases",
    items: "MongoDB, PostgreSQL, MySQL",
  },
  {
    title: "Testing & Tools",
    items: "Jest, Pytest, Postman, Git, Socket.io",
  },
];

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

export function SkillsSection() {
  return (
    <section id="skills" className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
      <h2 className="mb-6 text-2xl font-semibold md:mb-8 md:text-3xl">
        Skills & Certifications
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((group, idx) => (
          <motion.article
            key={group.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <h3 className="text-sm tracking-wide text-primary uppercase">
              {group.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{group.items}</p>
          </motion.article>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <h3 className="text-sm tracking-wide text-primary uppercase">Certifications</h3>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="mt-4 rounded-2xl border border-primary/30 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.12),transparent_55%)] p-5"
        >
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
        </motion.article>

        <ul className="mt-4 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
          {certifications.map((cert) => (
            <li key={cert}>- {cert}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
