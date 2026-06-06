"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { trackOutboundClick } from "@/lib/analytics";

const collegeLogo = "/education/rgmcet-logo.png";

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

export function AboutSection() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
      <h2 className="mb-6 text-2xl font-semibold md:mb-8 md:text-3xl">About Me</h2>
      <div className="mb-6 space-y-4 rounded-2xl border border-border bg-card p-5 text-sm leading-7 text-muted-foreground md:text-base">
        <p>
          I&apos;m a full stack developer passionate about building scalable
          systems, polished user experiences, and AI-powered products. I enjoy
          designing APIs, crafting intuitive interfaces, and developing clean
          architectures that solve business problems.
        </p>
        <p>
          Over the last 1.5+ years, I&apos;ve worked on IoT monitoring systems,
          workflow platforms, real-time communication apps, and automation tools
          using Node.js, React.js, TypeScript, Python, Docker, and GCP.
        </p>
        <p>
          I&apos;m currently focused on full stack engineering, distributed
          systems, cloud-native architecture, and frontend excellence while
          collaborating with product teams on high-impact user experiences.
        </p>
      </div>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
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
            <p className="mt-2 text-sm leading-7 text-muted-foreground md:text-base">
              {card.value}
            </p>
          </motion.article>
        ))}
      </div>

      <div id="education" className="scroll-mt-28">
        <h3 className="mb-4 text-lg font-semibold md:text-xl">Education</h3>
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
                  <h4 className="mt-2 text-lg font-semibold md:text-xl">{item.degree}</h4>
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
      </div>
    </section>
  );
}
