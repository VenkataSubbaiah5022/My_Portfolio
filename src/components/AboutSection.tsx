"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Tech Stack",
    value: "Node.js, TypeScript, Python, React.js, Next.js, MongoDB, Docker",
  },
  { title: "Location", value: "Hyderabad, Telangana, India" },
  { title: "Experience", value: "1.5+ years in Full Stack and Backend Development" },
  {
    title: "Impact",
    value: "70% downtime reduction, 80%+ test coverage, 200+ LeetCode problems",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
      <h2 className="mb-6 text-2xl font-semibold md:mb-8 md:text-3xl">About Me</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card, idx) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-lg"
          >
            <h3 className="text-sm tracking-wide text-primary uppercase">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground md:text-base">{card.value}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
