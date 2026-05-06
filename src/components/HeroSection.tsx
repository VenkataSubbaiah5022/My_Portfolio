"use client";

import { ArrowRight, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

const proofItems = [
  "200+ LeetCode Problems",
  "20+ APIs Built",
  "500+ IoT Devices Managed",
  "1.5+ Years Experience",
  "10K+ Messages Optimized",
];

export function HeroSection() {
  return (
    <section className="relative mx-auto min-h-[82vh] w-full max-w-6xl px-4 pb-8 pt-10 md:pb-10 md:pt-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_48%)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <p className="inline-flex rounded-full border border-primary/25 px-3 py-1 text-xs tracking-widest text-primary/90 uppercase">
          Open to Full Stack Engineering Roles
        </p>
        <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
          Full Stack Developer focused on scalable backend systems, microservices,
          and real-time applications.
        </h1>
        <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base md:text-lg">
          Full Stack Developer specializing in scalable web applications,
          microservices, and cloud-native systems. Built 19+ microservices and
          20+ production APIs on GCP with sub-100ms response latency.
        </p>
        <p className="text-sm text-muted-foreground">
          I enjoy building systems that are scalable, maintainable, and
          genuinely useful to people.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground transition hover:translate-y-[-1px] sm:px-5 sm:py-3 sm:text-sm"
          >
            View Projects <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/VenkataSubbaiah5022"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium transition hover:border-primary/50 sm:px-5 sm:py-3 sm:text-sm"
          >
            GitHub <GitHubLogoIcon className="h-4 w-4" />
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium transition hover:border-primary/50 sm:px-5 sm:py-3 sm:text-sm"
          >
            Download Resume <Download className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium transition hover:border-primary/50 sm:px-5 sm:py-3 sm:text-sm"
          >
            Contact <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/aitha-venkata-subbaiah-setty/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium transition hover:border-primary/50 sm:px-5 sm:py-3 sm:text-sm"
          >
            LinkedIn <LinkedInLogoIcon className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {proofItems.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-border bg-card px-3 py-2 text-xs text-muted-foreground"
            >
              {item}
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
