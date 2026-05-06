"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    period: "Nov 2024 - Mar 2026",
    role: "Full Stack Developer",
    company: "Stratosfy (Remote - Ottawa, Canada)",
    points: [
      "Developed 19+ microservices using Node.js and TypeScript for production IoT monitoring.",
      "Built 20+ REST APIs for telemetry ingestion and operational dashboards.",
      "Reduced system downtime by 70% through data modeling and aggregation optimizations.",
      "Maintained 80%+ Jest coverage and improved release quality via GitHub Actions CI/CD.",
      "Secured APIs with JWT, rate limiting, and validation aligned with OWASP practices.",
    ],
  },
  {
    period: "May 2024 - Oct 2024",
    role: "Backend Developer",
    company: "R K Microns (Rajasthan, India)",
    points: [
      "Built Python backend pipelines for AI-based defect detection workflows.",
      "Improved defect detection accuracy by 35%.",
      "Reduced manual inspection effort by 2 hours/day across 10+ operators.",
      "Collaborated with Flutter frontend teams for realtime visualization.",
    ],
  },
  {
    period: "Sep 2023 - Mar 2026",
    role: "Computer Science Subject Expert",
    company: "Chegg (Remote)",
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
      <h2 className="mb-6 text-2xl font-semibold md:mb-8 md:text-3xl">Experience</h2>
      <div className="space-y-4">
        {timeline.map((item, idx) => (
          <motion.article
            key={item.role}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <p className="text-xs tracking-widest text-primary uppercase">
              {item.period}
            </p>
            <h3 className="mt-2 text-lg font-semibold md:text-xl">{item.role}</h3>
            <p className="text-sm text-muted-foreground">{item.company}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {item.points.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
