"use client";

import { motion } from "framer-motion";
import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { useState, type FormEvent } from "react";

export function ContactSection() {
  const [sentMessage, setSentMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSentMessage("");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const payload = new FormData();
    payload.append("name", name);
    payload.append("email", email);
    payload.append("message", message);
    payload.append("_subject", `Portfolio Contact from ${name || "Visitor"}`);
    payload.append("_captcha", "false");
    payload.append("_template", "table");

    fetch("https://formsubmit.co/ajax/venkatasubbaiah5022@gmail.com", {
      method: "POST",
      body: payload,
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || data.success !== "true") {
          throw new Error("Unable to send");
        }
        setSentMessage("Message sent successfully. I will get back to you soon.");
        event.currentTarget.reset();
      })
      .catch(() => {
        setSentMessage(
          "Unable to send right now. Please email directly at venkatasubbaiah5022@gmail.com.",
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

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
          Looking for a full stack developer or technical collaborator?
          Let&apos;s discuss your idea.
        </p>
        <div className="mt-4 space-y-1 text-sm text-muted-foreground">
          <p>Email: venkatasubbaiah5022@gmail.com</p>
          <p>Phone: +91 9963132119</p>
          <p>Location: Hyderabad, Telangana, India</p>
          <p>Typically responds within 24 hours.</p>
        </div>
        <div className="mt-3">
          <a
            href="https://www.upwork.com/freelancers/~017b9a8b315e94f07a?mp_source=share"
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full border border-border px-3 py-1.5 text-xs transition hover:border-primary/50"
          >
            Book a Call / Hire on Upwork
          </a>
        </div>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Your name"
            required
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
          />
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
          />
          <textarea
            name="message"
            placeholder="Tell me about your project..."
            rows={4}
            required
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-fit rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:translate-y-[-1px]"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {sentMessage ? (
            <p className="text-xs text-muted-foreground">{sentMessage}</p>
          ) : null}
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
