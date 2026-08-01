"use client";

import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import {
  trackFileDownload,
  trackNavClick,
  trackOutboundClick,
} from "@/lib/analytics";

const profilePhoto = "/profile/venkata-profile.png?v=3";
const profileName = "Aitha Venkata Subbaiah";
const profileRole = "Full Stack Developer";

function ProfilePhotoGlow({
  imageClassName,
}: {
  imageClassName: string;
}) {
  return (
    <div className="relative isolate shrink-0">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 overflow-visible"
      >
        <div className="absolute left-1/2 top-[38%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(99,102,241,0.7)_0%,rgba(79,70,229,0.35)_42%,transparent_72%)] blur-3xl" />
        <div className="absolute left-[58%] top-[52%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(139,92,246,0.55)_0%,rgba(168,85,247,0.2)_50%,transparent_75%)] blur-[42px]" />
        <div className="absolute left-[36%] top-[62%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(56,189,248,0.45)_0%,rgba(14,165,233,0.15)_48%,transparent_74%)] blur-[38px]" />
        <div className="absolute left-1/2 top-[72%] h-40 w-52 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(99,102,241,0.35)_0%,transparent_70%)] blur-[48px]" />
      </div>
      <img
        src={profilePhoto}
        alt={`${profileName} Setty — ${profileRole} and software engineer portfolio photo`}
        width={531}
        height={769}
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className={`relative z-10 block h-auto object-contain object-bottom ${imageClassName}`}
      />
    </div>
  );
}

function ProfilePortrait({
  variant = "mobile",
}: {
  variant?: "mobile" | "desktop";
}) {
  if (variant === "mobile") {
    return (
      <div className="mx-auto w-full max-w-lg lg:hidden">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-end sm:justify-center sm:gap-6">
          <ProfilePhotoGlow imageClassName="w-[230px] sm:w-[190px] md:w-[210px]" />
          <div className="w-full max-w-[230px] border-t border-primary/25 pt-3 text-center sm:max-w-none sm:w-auto sm:border-t-0 sm:border-l sm:pl-6 sm:pb-2 sm:text-left">
            <p className="text-pretty text-base font-semibold leading-snug tracking-tight text-foreground">
              {profileName}
            </p>
            <p className="mt-1.5 text-xs font-medium text-primary">{profileRole}</p>
          </div>
        </div>
      </div>
    );
  }

  const widthClass = "w-[280px] xl:w-[320px]";

  return (
    <div className={`mx-auto shrink-0 ${widthClass}`}>
      <ProfilePhotoGlow imageClassName={widthClass} />
      <div className={`${widthClass} border-t border-primary/25 pt-3 text-center`}>
        <p className="text-pretty text-[15px] leading-snug font-semibold tracking-tight text-foreground xl:text-base">
          {profileName}
        </p>
        <p className="mt-1.5 text-xs font-medium text-primary">{profileRole}</p>
      </div>
    </div>
  );
}

const availabilityTags = [
  "Full-time",
  "Remote",
  "Hyderabad",
  "Contract considered",
];

const proofItems = [
  "19+ Microservices",
  "20+ Production APIs",
  "70% Downtime Reduction",
  "2+ Years Experience",
];

const heroActionClass =
  "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-card px-3.5 py-2.5 text-xs font-medium transition hover:border-primary/50 sm:gap-2 sm:px-4 lg:px-3 lg:py-2 xl:px-4 xl:py-2.5 xl:text-sm";

const heroPrimaryActionClass =
  "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-3.5 py-2.5 text-xs font-medium text-primary-foreground transition hover:translate-y-[-1px] sm:gap-2 sm:px-4 lg:px-3 lg:py-2 xl:px-4 xl:py-2.5 xl:text-sm";

export function HeroSection() {
  return (
    <section id="home" className="relative mx-auto min-h-[82vh] w-full max-w-6xl px-4 pb-8 pt-10 md:pb-10 md:pt-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_48%)]" />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10 xl:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-6"
        >
          <ProfilePortrait variant="mobile" />
          <div className="space-y-2.5">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs tracking-widest text-primary/90 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to Full Stack Engineering Roles
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Available now
              </span>
              <span aria-hidden className="text-border">
                ·
              </span>
              {availabilityTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-muted-foreground"
                >
                  {tag === "Hyderabad" ? (
                    <>
                      <MapPin className="h-3 w-3 shrink-0 text-primary/70" />
                      {tag}
                    </>
                  ) : (
                    tag
                  )}
                </span>
              ))}
            </div>
          </div>
          <h1 className="max-w-3xl text-2xl leading-snug font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-tight">
            <span className="sr-only">
              {profileName} Setty — {profileRole}, MERN stack developer, React
              developer, Node.js developer, Java developer, AI full stack
              developer, and software engineer in Hyderabad, India.{" "}
            </span>
            Building scalable web apps, AI-powered products, and modern user
            experiences.
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base md:text-lg">
            Full stack engineer and software engineer experienced in MERN stack,
            React, Next.js, Node.js, TypeScript, Java, MongoDB, SQL, cloud
            platforms, and AI-powered applications. I design efficient systems,
            develop clean APIs, and deliver production-ready user experiences.
          </p>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            I enjoy combining software engineering and AI to create products that
            are efficient, scalable, and genuinely useful.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3 lg:flex-nowrap lg:gap-2 xl:gap-3">
            <a
              href="#projects"
              onClick={() => trackNavClick("projects", "hero")}
              className={heroPrimaryActionClass}
            >
              View Projects <ArrowRight className="h-4 w-4 shrink-0" />
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
              className={heroActionClass}
            >
              GitHub <GitHubLogoIcon className="h-4 w-4 shrink-0" />
            </a>
            <a
              href="/resume.pdf"
              download
              onClick={() => trackFileDownload("resume.pdf", "hero")}
              className={heroActionClass}
            >
              Download Resume <Download className="h-4 w-4 shrink-0" />
            </a>
            <a
              href="#contact"
              onClick={() => trackNavClick("contact", "hero")}
              className={heroActionClass}
            >
              Contact <Mail className="h-4 w-4 shrink-0" />
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
              className={heroActionClass}
            >
              LinkedIn <LinkedInLogoIcon className="h-4 w-4 shrink-0" />
            </a>
          </div>
          <div className="flex flex-wrap gap-2 md:flex-nowrap md:gap-3 xl:gap-4">
            {proofItems.map((item) => (
              <div
                key={item}
                className="min-w-[calc(50%-0.25rem)] flex-1 rounded-xl border border-border bg-card px-3 py-2 text-center text-xs leading-snug text-muted-foreground md:min-w-0"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="relative z-0 hidden -translate-y-16 translate-x-6 lg:block lg:justify-self-end xl:-translate-y-20 xl:translate-x-8"
        >
          <ProfilePortrait variant="desktop" />
        </motion.div>
      </div>
    </section>
  );
}
