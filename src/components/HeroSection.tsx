"use client";

import { ArrowRight, Download, FileText } from "lucide-react";
import { motion } from "framer-motion";

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
          Available for freelance
        </p>
        <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
          Hi, I&apos;m <span className="text-primary">Aitha Venkata Subbaiah Setty</span>.
          I build scalable backend-first digital products.
        </h1>
        <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base md:text-lg">
          Full Stack Developer and Backend Specialist with 1.5+ years of
          experience delivering 19+ microservices and 20+ REST APIs with
          sub-100ms latency on GCP.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground transition hover:translate-y-[-1px] sm:px-5 sm:py-3 sm:text-sm"
          >
            View Projects <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium transition hover:border-primary/50 sm:px-5 sm:py-3 sm:text-sm"
          >
            Download Resume <Download className="h-4 w-4" />
          </a>
          <a
            href="https://zenodo.org/records/15123556"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium transition hover:border-primary/50 sm:px-5 sm:py-3 sm:text-sm"
          >
            View Publication <FileText className="h-4 w-4" />
          </a>
        </div>
      </motion.div>

    </section>
  );
}
