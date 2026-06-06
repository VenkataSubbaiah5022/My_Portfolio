"use client";

import { motion } from "framer-motion";
import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { useState, type FormEvent } from "react";
import { trackContactSubmit, trackOutboundClick } from "@/lib/analytics";
import {
  CONTACT_EMAIL,
  getWeb3FormsAccessKey,
  sendViaWeb3Forms,
} from "@/lib/contact";

type SubmitState = "idle" | "success" | "error";

type AckDetails = {
  name: string;
  email: string;
  ackSent: boolean;
};

export function ContactSection() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [sentMessage, setSentMessage] = useState("");
  const [ackDetails, setAckDetails] = useState<AckDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState("idle");
    setSentMessage("");
    setAckDetails(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const honey = String(formData.get("_honey") ?? "").trim();

    if (honey) {
      setSubmitState("success");
      setSentMessage("Message sent successfully. I will get back to you soon.");
      form.reset();
      setIsSubmitting(false);
      return;
    }

    try {
      const accessKey = getWeb3FormsAccessKey();
      if (!accessKey) {
        throw new Error("Contact form is not configured yet.");
      }

      const delivery = await sendViaWeb3Forms({ name, email, message }, accessKey);
      if (!delivery.ok) {
        const detail =
          delivery.data &&
          typeof delivery.data === "object" &&
          "message" in delivery.data
            ? String((delivery.data as { message?: string }).message ?? "")
            : "";

        throw new Error(detail || "Unable to send your message right now.");
      }

      let ackSent = false;
      try {
        const ackResponse = await fetch("/api/contact/ack", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });
        const ackData = await ackResponse.json().catch(() => ({}));
        ackSent = Boolean(ackData.ackSent);
      } catch {
        ackSent = false;
      }

      trackContactSubmit();
      setSubmitState("success");
      setAckDetails({ name, email, ackSent });
      setSentMessage(
        ackSent
          ? "Message sent successfully. A confirmation email was sent to your inbox."
          : "Message sent successfully. I will get back to you soon.",
      );
      form.reset();
    } catch (error) {
      setSubmitState("error");
      setSentMessage(
        error instanceof Error
          ? `${error.message} You can also email me directly at ${CONTACT_EMAIL}.`
          : `Unable to send right now. Please email directly at ${CONTACT_EMAIL}.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-4xl scroll-mt-28 px-4 py-14 md:py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-border bg-card p-6 shadow-xl md:p-8"
      >
        <h2 className="text-2xl font-semibold md:text-3xl">Contact</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
          Have a project in mind? Send a message and I&apos;ll get back to you
          within 24 hours.
        </p>
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
          <p>Phone: +91 9963132119</p>
          <p>Location: Hyderabad, Telangana, India</p>
        </div>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden
          />
          <input
            name="name"
            type="text"
            placeholder="Your name"
            required
            autoComplete="name"
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
          />
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
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
            className="w-fit rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {submitState === "success" && ackDetails ? (
            <div
              role="status"
              className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4"
            >
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Thanks, {ackDetails.name} — your message was received.
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                I&apos;ll review it and reply to{" "}
                <span className="font-medium text-foreground">{ackDetails.email}</span> within
                24 hours.
              </p>
              {ackDetails.ackSent ? (
                <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">
                  A confirmation email was sent to your inbox.
                </p>
              ) : (
                <p className="mt-2 text-xs text-muted-foreground">
                  For urgent opportunities, you can also reach me directly at{" "}
                  {CONTACT_EMAIL}.
                </p>
              )}
            </div>
          ) : sentMessage ? (
            <p
              role="status"
              className={`text-sm leading-6 ${
                submitState === "error"
                  ? "text-amber-700 dark:text-amber-400"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {sentMessage}
            </p>
          ) : null}
        </form>
        <div className="mt-6 flex items-center gap-4 text-muted-foreground">
          <a
            href="https://github.com/VenkataSubbaiah5022"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            onClick={() =>
              trackOutboundClick(
                "GitHub",
                "https://github.com/VenkataSubbaiah5022",
                "contact",
              )
            }
            className="transition hover:text-primary"
          >
            <GitHubLogoIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/aitha-venkata-subbaiah-setty/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            onClick={() =>
              trackOutboundClick(
                "LinkedIn",
                "https://www.linkedin.com/in/aitha-venkata-subbaiah-setty/",
                "contact",
              )
            }
            className="transition hover:text-primary"
          >
            <LinkedInLogoIcon className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label="Email"
            onClick={() =>
              trackOutboundClick("Email", `mailto:${CONTACT_EMAIL}`, "contact")
            }
            className="transition hover:text-primary"
          >
            <EnvelopeClosedIcon className="h-5 w-5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
