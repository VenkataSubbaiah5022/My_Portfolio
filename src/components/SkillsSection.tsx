"use client";

import { motion } from "framer-motion";

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
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
          {certifications.map((cert) => (
            <li key={cert}>- {cert}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
