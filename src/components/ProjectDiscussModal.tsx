"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { trackContactSubmit } from "@/lib/analytics";
import {
  CONTACT_EMAIL,
  getWeb3FormsAccessKey,
  sendViaWeb3Forms,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

export const PROJECT_SERVICE_CATEGORIES = [
  "Full Stack Systems",
  "Backend & APIs",
  "UI Engineering",
  "Cloud & DevOps",
  "Real-time & IoT",
  "Architecture & Scaling",
] as const;

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20";

type ProjectDiscussModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCategory?: string;
};

type SubmitState = "idle" | "success" | "error";

function buildProjectMessage(formData: FormData) {
  const lines = [
    `Project Title: ${String(formData.get("title") ?? "").trim()}`,
    `Service Category: ${String(formData.get("category") ?? "").trim()}`,
    "",
    "Project Requirements:",
    String(formData.get("requirements") ?? "").trim(),
  ];

  const budget = String(formData.get("budget") ?? "").trim();
  const timeline = String(formData.get("timeline") ?? "").trim();
  const techStack = String(formData.get("techStack") ?? "").trim();
  const phone = String(formData.get("contactPhone") ?? "").trim();
  const additionalInfo = String(formData.get("additionalInfo") ?? "").trim();

  if (budget) lines.push("", `Budget Range: ${budget}`);
  if (timeline) lines.push(`Timeline: ${timeline}`);
  if (techStack) lines.push("", "Tech Stack Preference:", techStack);
  if (phone) lines.push("", `Phone: ${phone}`);
  if (additionalInfo) lines.push("", "Additional Info:", additionalInfo);

  return lines.join("\n");
}

function SelectField({
  name,
  required,
  defaultValue,
  placeholder,
  options,
  onChange,
}: {
  name: string;
  required?: boolean;
  defaultValue?: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange?: () => void;
}) {
  return (
    <div className="relative">
      <select
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        onChange={onChange}
        className={cn(fieldClass, "appearance-none pr-10")}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value || option.label} value={option.value || option.label}>
            {option.label}
          </option>
        ))}
      </select>
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground"
      >
        ▾
      </div>
    </div>
  );
}

export function ProjectDiscussModal({
  open,
  onOpenChange,
  defaultCategory = "",
}: ProjectDiscussModalProps) {
  const titleId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [mounted, setMounted] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    setSubmitState("idle");
    setFeedback("");
    setCanSubmit(false);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  const updateValidity = () => {
    setCanSubmit(Boolean(formRef.current?.checkValidity()));
  };

  const handleClose = () => {
    if (isSubmitting) return;
    onOpenChange(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState("idle");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const honey = String(formData.get("_honey") ?? "").trim();

    if (honey) {
      setSubmitState("success");
      setFeedback("Project details sent. I will get back to you soon.");
      form.reset();
      setCanSubmit(false);
      setIsSubmitting(false);
      return;
    }

    const title = String(formData.get("title") ?? "").trim();
    const email = String(formData.get("contactEmail") ?? "").trim();
    const message = buildProjectMessage(formData);

    try {
      const accessKey = getWeb3FormsAccessKey();
      if (!accessKey) {
        throw new Error("Contact form is not configured yet.");
      }

      const delivery = await sendViaWeb3Forms(
        { name: title, email, message },
        accessKey,
      );

      if (!delivery.ok) {
        const detail =
          delivery.data &&
          typeof delivery.data === "object" &&
          "message" in delivery.data
            ? String((delivery.data as { message?: string }).message ?? "")
            : "";

        throw new Error(detail || "Unable to send your project details right now.");
      }

      let ackSent = false;
      try {
        const ackResponse = await fetch("/api/contact/ack", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: title, email, message }),
        });
        const ackData = await ackResponse.json().catch(() => ({}));
        ackSent = Boolean(ackData.ackSent);
      } catch {
        ackSent = false;
      }

      trackContactSubmit();
      setSubmitState("success");
      setFeedback(
        ackSent
          ? "Project details sent. A confirmation email was sent to your inbox."
          : "Project details sent. I will get back to you within 24 hours.",
      );
      form.reset();
      setCanSubmit(false);
    } catch (error) {
      setSubmitState("error");
      setFeedback(
        error instanceof Error
          ? `${error.message} You can also email me directly at ${CONTACT_EMAIL}.`
          : `Unable to send right now. Please email directly at ${CONTACT_EMAIL}.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          style={{ background: "rgba(15, 23, 42, 0.45)", backdropFilter: "blur(6px)" }}
          onClick={handleClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_4px_20px_rgba(0,0,0,0.06),0_32px_80px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35),0_32px_80px_rgba(0,0,0,0.5)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              aria-hidden
              className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
            />

            <div className="flex shrink-0 items-start justify-between border-b border-border px-7 py-5">
              <div>
                <h2 id={titleId} className="text-xl font-black text-foreground">
                  Discuss your project
                </h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Let&apos;s turn your idea into something real
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all duration-150 hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <form
              key={defaultCategory || "project-discuss"}
              ref={formRef}
              onSubmit={handleSubmit}
              onInput={updateValidity}
              onChange={updateValidity}
              className="flex min-h-0 flex-1 flex-col"
            >
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />

              <div className="flex-1 space-y-5 overflow-y-auto px-7 py-6">
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    Project Title *
                  </label>
                  <input
                    name="title"
                    type="text"
                    required
                    placeholder="e.g. E-commerce store, SaaS dashboard, or business web app"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    Service Category *
                  </label>
                  <SelectField
                    name="category"
                    required
                    defaultValue={defaultCategory}
                    placeholder="Select a service"
                    onChange={updateValidity}
                    options={PROJECT_SERVICE_CATEGORIES.map((category) => ({
                      value: category,
                      label: category,
                    }))}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    Project Requirements *
                  </label>
                  <textarea
                    name="requirements"
                    required
                    rows={4}
                    placeholder="Describe your goals, key features, and what success looks like..."
                    className={cn(fieldClass, "resize-none")}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold tracking-widest text-muted-foreground uppercase">
                      Budget Range
                    </label>
                    <SelectField
                      name="budget"
                      placeholder="Select budget"
                      onChange={updateValidity}
                      options={[
                        { value: "under-5k", label: "Under $5,000" },
                        { value: "5k-10k", label: "$5,000 – $10,000" },
                        { value: "10k-25k", label: "$10,000 – $25,000" },
                        { value: "25k-50k", label: "$25,000 – $50,000" },
                        { value: "50k+", label: "$50,000+" },
                      ]}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold tracking-widest text-muted-foreground uppercase">
                      Timeline
                    </label>
                    <SelectField
                      name="timeline"
                      placeholder="Select timeline"
                      onChange={updateValidity}
                      options={[
                        { value: "1-2-weeks", label: "1–2 weeks" },
                        { value: "1-month", label: "1 month" },
                        { value: "2-3-months", label: "2–3 months" },
                        { value: "3-6-months", label: "3–6 months" },
                        { value: "6-months+", label: "6+ months" },
                      ]}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    Tech Stack Preference
                  </label>
                  <textarea
                    name="techStack"
                    rows={2}
                    placeholder="Any specific frameworks, languages, or platforms you prefer?"
                    className={cn(fieldClass, "resize-none")}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold tracking-widest text-muted-foreground uppercase">
                      Email *
                    </label>
                    <input
                      name="contactEmail"
                      type="email"
                      required
                      placeholder="you@email.com"
                      autoComplete="email"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold tracking-widest text-muted-foreground uppercase">
                      Phone
                    </label>
                    <input
                      name="contactPhone"
                      type="tel"
                      placeholder="+91 9963132119"
                      autoComplete="tel"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    Anything else?
                  </label>
                  <textarea
                    name="additionalInfo"
                    rows={3}
                    placeholder="Specific questions, references, or constraints we should know about..."
                    className={cn(fieldClass, "resize-none")}
                  />
                </div>

                {feedback ? (
                  <p
                    role="status"
                    className={cn(
                      "rounded-xl border px-4 py-3 text-sm leading-6",
                      submitState === "error"
                        ? "border-amber-500/25 bg-amber-500/5 text-amber-700 dark:text-amber-400"
                        : "border-emerald-500/25 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400",
                    )}
                  >
                    {feedback}
                  </p>
                ) : null}
              </div>

              <div className="flex shrink-0 items-center justify-end gap-3 border-t border-border px-7 py-5">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-all duration-150 hover:text-foreground disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold transition-all duration-150",
                    canSubmit && !isSubmitting
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "cursor-not-allowed bg-muted text-muted-foreground",
                  )}
                >
                  <Send className="h-3.5 w-3.5" aria-hidden />
                  {isSubmitting ? "Sending..." : "Send project details"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
