"use client";

import { motion } from "framer-motion";
import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto w-full max-w-4xl px-4 py-14 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-border bg-card p-6 shadow-xl md:p-8"
      >
        <h2 className="text-2xl font-semibold md:text-3xl">Let&apos;s Connect</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
          Have an idea, role, or collaboration in mind? Reach out and let&apos;s
          build something impactful.
        </p>
        <div className="mt-4 space-y-1 text-sm text-muted-foreground">
          <p>Email: venkatasubbaiah5022@gmail.com</p>
          <p>Phone: +91 9963132119</p>
          <p>Location: Hyderabad, Telangana, India</p>
        </div>
        <form className="mt-6 grid gap-4">
          <input
            type="text"
            placeholder="Your name"
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
          />
          <input
            type="email"
            placeholder="you@example.com"
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
          />
          <textarea
            placeholder="Tell me about your project..."
            rows={4}
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
          />
          <button
            type="submit"
            className="w-fit rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:translate-y-[-1px]"
          >
            Send Message
          </button>
        </form>
        <div className="mt-6 flex items-center gap-4 text-muted-foreground">
          <a
            href="https://github.com/VenkataSubbaiah5022"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition hover:text-primary"
          >
            <GitHubLogoIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/aitha-venkata-subbaiah-setty/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition hover:text-primary"
          >
            <LinkedInLogoIcon className="h-5 w-5" />
          </a>
          <a
            href="mailto:venkatasubbaiah5022@gmail.com"
            aria-label="Email"
            className="transition hover:text-primary"
          >
            <EnvelopeClosedIcon className="h-5 w-5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
