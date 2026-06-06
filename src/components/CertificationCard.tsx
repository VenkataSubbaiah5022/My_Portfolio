"use client";

import { Award, BadgeCheck, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { type PointerEvent, type ReactNode } from "react";
import { trackOutboundClick } from "@/lib/analytics";
import {
  certificationCategories,
  getCertificationImage,
  type Certification,
} from "@/lib/certifications";
import { cn } from "@/lib/utils";

export function CertSpotlightCard({
  children,
  className,
  glow = "rgba(79, 70, 229, 0.1)",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
  delay?: number;
}) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 320, damping: 28, delay }}
      onPointerMove={handlePointerMove}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--spotlight-x", "50%");
        event.currentTarget.style.setProperty("--spotlight-y", "0%");
      }}
      style={{ ["--spotlight-color" as string]: glow }}
      className={cn(
        "group relative isolate overflow-hidden rounded-[1.2rem] border border-border/80 bg-card/95 shadow-sm backdrop-blur-sm transition-shadow duration-500 hover:shadow-md",
        className,
      )}
    >
      <div
        aria-hidden
        className="service-card-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="absolute top-0 left-6 h-px w-8 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-70 transition-all duration-500 group-hover:w-[calc(100%-3rem)]"
      />
      {children}
    </motion.div>
  );
}

function IssuerMark({ cert }: { cert: Certification }) {
  const Icon = cert.icon;

  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border p-1.5",
        cert.accent.iconBox,
      )}
    >
      {Icon ? (
        <Icon className="h-5 w-5" style={{ color: cert.iconColor }} aria-hidden />
      ) : cert.issuerLogo ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={cert.issuerLogo}
          alt=""
          className={cn(
            "object-contain",
            cert.issuerLogoFit === "wide"
              ? "max-h-5 w-auto max-w-[4.25rem]"
              : "h-full w-full",
          )}
          aria-hidden
        />
      ) : cert.glyph ? (
        <span className="text-[11px] font-black text-sky-700 dark:text-sky-300">
          {cert.glyph}
        </span>
      ) : null}
    </div>
  );
}

export function VerifyLink({ cert, className }: { cert: Certification; className?: string }) {
  if (!cert.verifyUrl) return null;

  return (
    <a
      href={cert.verifyUrl}
      target="_blank"
      rel="noreferrer"
      onClick={() =>
        trackOutboundClick(`${cert.issuer} Certificate`, cert.verifyUrl!, "certifications")
      }
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary transition hover:border-primary/50",
        className,
      )}
    >
      Verify
      <ExternalLink className="h-3 w-3" aria-hidden />
    </a>
  );
}

export function CertificationCard({ cert, delay = 0 }: { cert: Certification; delay?: number }) {
  const category = certificationCategories[cert.category];
  const isPlatform = Boolean(cert.badgeItems?.length);
  const imageSrc = getCertificationImage(cert);

  return (
    <CertSpotlightCard className="overflow-hidden p-0" glow={cert.accent.glow} delay={delay}>
      {imageSrc ? (
        <div className="border-b border-border/70 bg-[#f4f1ea] dark:bg-[#1e1b16]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={`${cert.issuer} — ${cert.title}`}
            className="aspect-[842/595] w-full object-contain object-center p-2"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
      <div className="relative z-[1] p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <IssuerMark cert={cert} />
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-[9px] font-semibold tracking-wide uppercase",
              cert.accent.tag,
            )}
          >
            {category.label}
          </span>
        </div>

        <h4 className="mt-3 text-sm font-bold leading-snug text-foreground">{cert.title}</h4>
        <p className="mt-1 text-[11px] text-muted-foreground">
          {cert.issuer} · {cert.year}
        </p>

        {cert.description ? (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {cert.description}
          </p>
        ) : null}

        {isPlatform ? (
          <ul className="mt-3 space-y-1">
            {cert.badgeItems!.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[10px] text-muted-foreground"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {cert.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded border border-border/70 px-1.5 py-0.5 text-[9px] text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between gap-2">
          {cert.verifyUrl ? (
            <VerifyLink cert={cert} />
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/80">
              <Award className="h-3 w-3" />
              Credential on file
            </span>
          )}
        </div>
      </div>
    </CertSpotlightCard>
  );
}

export function FeaturedCertCard({ cert }: { cert: Certification }) {
  return (
    <CertSpotlightCard className="p-6 sm:p-7 lg:col-span-7" glow={cert.accent.glow}>
      <div className="relative z-[1]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase",
              cert.accent.tag,
            )}
          >
            <BadgeCheck className="h-3.5 w-3.5" />
            Verified · {cert.issuer}
          </span>
          <VerifyLink cert={cert} />
        </div>

        <div className="mt-5 flex items-start gap-4">
          <IssuerMark cert={cert} />
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
              Featured credential
            </p>
            <h4 className="mt-1 text-xl font-black tracking-tight text-foreground sm:text-2xl">
              {cert.title}
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              {cert.issuer} · {cert.year}
            </p>
          </div>
        </div>

        {cert.description ? (
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {cert.description}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          {cert.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-border/80 bg-background/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </CertSpotlightCard>
  );
}
