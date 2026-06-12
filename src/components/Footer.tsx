"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, MapPin, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { trackNavClick, trackOutboundClick } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/contact";
import { cn } from "@/lib/utils";

const GITHUB_URL = "https://github.com/VenkataSubbaiah5022";
const LINKEDIN_URL = "https://www.linkedin.com/in/aitha-venkata-subbaiah-setty/";

const footerLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Tech" },
  { href: "#projects", label: "Projects" },
  { href: "#system-design", label: "System Design" },
  { href: "#experience", label: "Career" },
  { href: "#recommendations", label: "Why me" },
  { href: "#build-process", label: "Process" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
] as const;

const socialLinks = [
  {
    label: "GitHub",
    href: GITHUB_URL,
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: LINKEDIN_URL,
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${CONTACT_EMAIL}`,
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
] as const;

function resolveHref(pathname: string, href: string) {
  return pathname === "/" ? href : `/${href}`;
}

function FooterNavLink({
  index,
  href,
  label,
  onClick,
}: {
  index: number;
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <a href={href} onClick={onClick} className="group block no-underline">
      <div className="mb-1.5 text-xs font-bold text-primary">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="mb-2 text-sm font-semibold text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
        {label}
      </div>
      <div className="h-px w-6 bg-primary/45 transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-border/80 bg-card/45 dark:bg-card/20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(79,70,229,0.07),transparent_60%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(96,165,250,0.06),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-foreground/[0.02] via-transparent to-foreground/[0.03] dark:from-white/[0.03] dark:to-white/[0.02]"
      />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-10 pt-12 pb-10 lg:flex-row lg:gap-0">
          <div className="shrink-0 space-y-7 lg:w-[30%] lg:pr-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-500 text-white">
                <Zap className="h-4 w-4" aria-hidden />
              </div>
              <span className="text-xl font-black tracking-tight text-foreground">
                Venkata<span className="text-primary">.</span>
              </span>
            </Link>

            <div>
              <p className="text-[1.1rem] font-bold leading-snug text-foreground">
                Full stack developer building fast,
              </p>
              <p className="text-[1.1rem] font-bold leading-snug text-muted-foreground">
                scalable and impactful products.
              </p>
            </div>

            <div className="flex gap-2.5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={link.label}
                  onClick={() =>
                    trackOutboundClick(link.label, link.href, "footer")
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-foreground/[0.04] text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:text-foreground"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div
            aria-hidden
            className="hidden w-px shrink-0 self-stretch bg-border/80 lg:block"
          />

          <div className="lg:flex-1 lg:px-16">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {footerLinks.map((link, index) => (
                <FooterNavLink
                  key={link.href}
                  index={index}
                  href={resolveHref(pathname, link.href)}
                  label={link.label}
                  onClick={() => trackNavClick(link.label, "footer")}
                />
              ))}
            </div>
          </div>

          <div
            aria-hidden
            className="hidden w-px shrink-0 self-stretch bg-border/80 lg:block"
          />

          <div className="shrink-0 space-y-5 lg:w-[26%] lg:pl-16">
            <p className="text-base font-bold leading-snug text-primary md:text-lg">
              Let&apos;s build something amazing
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Open to full-time, remote, and contract opportunities across India.
            </p>
            <a
              href={resolveHref(pathname, "#contact")}
              aria-label="Go to contact"
              onClick={() => trackNavClick("Contact", "footer-cta")}
              className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-foreground/[0.04] transition-all duration-200 hover:border-primary/35 hover:shadow-md hover:shadow-primary/10"
            >
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/80 py-5 text-xs sm:flex-row">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0" aria-hidden />
              Hyderabad, Telangana, India
            </span>
            <span className="hidden text-border sm:inline">•</span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              onClick={() =>
                trackOutboundClick("Email", `mailto:${CONTACT_EMAIL}`, "footer")
              }
              className="text-muted-foreground no-underline transition-colors duration-150 hover:text-foreground"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <p className="text-center italic text-muted-foreground">
            Designing systems. Building products. Always learning.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-muted-foreground">
              Built with <span className="text-primary">Next.js & Motion</span>
            </span>
            <span className="hidden text-border sm:inline">|</span>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutboundClick("GitHub", GITHUB_URL, "footer")}
              className={cn(
                "flex items-center gap-1.5 text-muted-foreground no-underline transition-colors duration-150",
                "hover:text-foreground",
              )}
            >
              View on GitHub
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
            <span className="hidden text-border sm:inline">|</span>
            <span className="inline-flex select-none items-center gap-1 rounded-md bg-gradient-to-br from-indigo-700 to-indigo-500 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] text-white">
              2026
            </span>
          </div>
        </div>

        <p className="pb-6 text-center text-[11px] leading-5 text-muted-foreground/80">
          This site uses Google Analytics and Microsoft Clarity to understand traffic
          and improve the experience. No personal data is sold.
        </p>
      </div>
    </footer>
  );
}
