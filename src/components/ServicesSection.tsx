"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Code2,
  Layers,
  Radio,
  Sparkles,
  Workflow,
} from "lucide-react";
import { trackOutboundClick } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/contact";

const UPWORK_URL =
  "https://www.upwork.com/freelancers/~017b9a8b315e94f07a?mp_source=share";

const services = [
  {
    title: "Full Stack Web Development",
    description:
      "End-to-end product builds with React, Next.js, Node.js, and TypeScript — from UI polish to production-ready APIs.",
    icon: Layers,
  },
  {
    title: "Backend & API Engineering",
    description:
      "REST and WebSocket APIs, microservices, authentication, validation, and database design tuned for scale and reliability.",
    icon: Code2,
  },
  {
    title: "Frontend & UI Engineering",
    description:
      "Responsive interfaces, design systems, animations, and performance-focused React experiences that feel premium.",
    icon: Sparkles,
  },
  {
    title: "Cloud & DevOps",
    description:
      "Dockerized deployments, CI/CD pipelines, and cloud-native setups on GCP and AWS with monitoring in mind.",
    icon: Cloud,
  },
  {
    title: "Real-time & IoT Systems",
    description:
      "Event-driven architectures, socket flows, telemetry ingestion, and monitoring platforms for connected products.",
    icon: Radio,
  },
  {
    title: "Technical Collaboration",
    description:
      "Architecture reviews, feature delivery, code quality improvements, and hands-on support for growing product teams.",
    icon: Workflow,
  },
];

const engagementOptions = [
  "Full-time roles",
  "Contract & freelance",
  "Remote collaboration",
  "Hyderabad · open to Bangalore",
];

export function ServicesSection() {
  return (
    <section id="services" className="mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-14 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45 }}
      >
        <h2 className="text-2xl font-semibold md:text-3xl">My Services</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          I help teams ship reliable full stack products — from greenfield MVPs to
          production systems that need better performance, cleaner architecture, or
          stronger developer experience.
        </p>
      </motion.div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, idx) => {
          const Icon = service.icon;

          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-base font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {service.description}
              </p>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="mt-8 rounded-2xl border border-border bg-card p-5 md:p-6"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h3 className="text-base font-semibold md:text-lg">How we can work together</h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
              Looking for a full stack developer or technical collaborator? I&apos;m
              open to discussing your product roadmap, timeline, and the kind of
              engineering support you need.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {engagementOptions.map((option) => (
                <span
                  key={option}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {option}
                </span>
              ))}
            </div>
            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              <p>
                Email:{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-foreground underline-offset-2 hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p>Typically responds within 24 hours.</p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-3">
            <a
              href={UPWORK_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackOutboundClick("Upwork", UPWORK_URL, "services")}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:translate-y-[-1px]"
            >
              Book a Call / Hire on Upwork
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:border-primary/50"
            >
              Send a Message
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
