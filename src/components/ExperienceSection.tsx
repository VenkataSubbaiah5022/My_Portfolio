"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    period: "Nov 2024 - Mar 2026",
    role: "Full Stack Developer",
    company: "Stratosfy (Remote - Ottawa, Canada)",
    detail:
      "Built a production IoT monitoring platform for 500+ devices, shipped 20+ APIs and 19+ microservices, and reduced downtime by 70%.",
  },
  {
    period: "May 2024 - Oct 2024",
    role: "Backend Developer",
    company: "R K Microns (Rajasthan, India)",
    detail:
      "Developed Python backend pipelines for defect detection, improving accuracy by 35% and reducing manual work by 2 hours/day.",
  },
  {
    period: "Sep 2023 - Mar 2026",
    role: "Computer Science Subject Expert",
    company: "Chegg (Remote)",
    detail:
      "Solved global CS queries in DSA, SQL, Java, Python, DBMS, and OS with clear step-by-step technical explanations.",
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
            <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
