"use client";

import { ArrowRight, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import {
  trackFileDownload,
  trackNavClick,
  trackOutboundClick,
} from "@/lib/analytics";

const proofItems = [
  "200+ LeetCode Problems",
  "20+ APIs Built",
  "500+ IoT Devices Managed",
  "1.5+ Years Experience",
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
        <h1 className="max-w-3xl text-2xl leading-snug font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-tight">
          Building scalable web apps, AI-powered products, and modern user
          experiences.
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base md:text-lg">
          Experienced in building production-ready applications with React,
          Next.js, Node.js, TypeScript, MongoDB, SQL, cloud platforms and
          AI-powered applications. I enjoy designing efficient systems, developing
          clean APIs, and delivering exceptional user experiences.
        </p>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          I enjoy combining software engineering and AI to create products that
          are efficient, scalable, and genuinely useful.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#projects"
            onClick={() => trackNavClick("projects", "hero")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground transition hover:translate-y-[-1px] sm:px-5 sm:py-3 sm:text-sm"
          >
            View Projects <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/VenkataSubbaiah5022"
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackOutboundClick(
                "GitHub",
                "https://github.com/VenkataSubbaiah5022",
                "hero",
              )
            }
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium transition hover:border-primary/50 sm:px-5 sm:py-3 sm:text-sm"
          >
            GitHub <GitHubLogoIcon className="h-4 w-4" />
          </a>
          <a
            href="/resume.pdf"
            download
            onClick={() => trackFileDownload("resume.pdf", "hero")}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium transition hover:border-primary/50 sm:px-5 sm:py-3 sm:text-sm"
          >
            Download Resume <Download className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            onClick={() => trackNavClick("contact", "hero")}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium transition hover:border-primary/50 sm:px-5 sm:py-3 sm:text-sm"
          >
            Contact <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/aitha-venkata-subbaiah-setty/"
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackOutboundClick(
                "LinkedIn",
                "https://www.linkedin.com/in/aitha-venkata-subbaiah-setty/",
                "hero",
              )
            }
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium transition hover:border-primary/50 sm:px-5 sm:py-3 sm:text-sm"
          >
            LinkedIn <LinkedInLogoIcon className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
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
