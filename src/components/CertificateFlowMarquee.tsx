"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { trackOutboundClick, trackNavClick } from "@/lib/analytics";
import {
  getCertificationImage,
  getCertificationStats,
  getCertificationsWithImages,
  type Certification,
} from "@/lib/certifications";
import { cn } from "@/lib/utils";

function CertificateSlide({ cert }: { cert: Certification }) {
  const imageSrc = getCertificationImage(cert);
  if (!imageSrc) return null;

  const content = (
    <figure
      className={cn(
        "cert-flow-card group mx-1 block w-[min(280px,74vw)] shrink-0 sm:w-[320px] md:w-[360px]",
        cert.verifyUrl && "cursor-pointer",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-black/10 bg-[#f4f1ea] shadow-[0_12px_40px_rgba(15,23,42,0.12)] transition duration-500 dark:border-white/10 dark:bg-[#1e1b16] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
          "group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)]",
        )}
      >
        <div className="aspect-[842/595] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={`${cert.issuer} certificate — ${cert.title}`}
            className="h-full w-full object-contain object-center p-1.5 sm:p-2"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>

        {cert.verifyUrl ? (
          <div className="absolute top-3 right-3 rounded-full border border-emerald-500/30 bg-emerald-500/90 px-2 py-0.5 text-[9px] font-bold tracking-wide text-white uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Verify
          </div>
        ) : null}
      </div>

      <figcaption className="mt-3 flex items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-foreground">{cert.title}</p>
          <p className="text-[11px] text-muted-foreground">
            {cert.issuer} · {cert.year}
          </p>
        </div>
        {cert.verifyUrl ? (
          <ExternalLink
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden
          />
        ) : null}
      </figcaption>
    </figure>
  );

  if (cert.verifyUrl) {
    return (
      <a
        href={cert.verifyUrl}
        target="_blank"
        rel="noreferrer"
        onClick={() =>
          trackOutboundClick(`${cert.issuer} Certificate`, cert.verifyUrl!, "cert_flow")
        }
        className="block outline-none"
      >
        {content}
      </a>
    );
  }

  return content;
}

export function CertificateFlowMarquee() {
  const items = getCertificationsWithImages();
  const stats = getCertificationStats();
  const loop = [...items, ...items];
  const duration = Math.max(50, items.length * 7);

  return (
    <div className="cert-flow-shell relative mb-10">
      <div className="mb-3 flex items-center justify-between gap-3 px-1">
        <p className="text-[11px] text-muted-foreground">
          {stats.uploaded} certificates · hover to pause
        </p>
        <Link
          href="/certifications"
          onClick={() => trackNavClick("certifications", "cert_flow_link")}
          className="text-[10px] font-semibold text-primary transition hover:underline"
        >
          View full gallery
        </Link>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--skills-surface)] to-transparent sm:w-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--skills-surface)] to-transparent sm:w-20"
      />

      <div className="cert-flow-row overflow-hidden py-2" data-lenis-prevent>
        <div
          className="cert-flow-track flex w-max items-start gap-5 sm:gap-6"
          style={{ ["--cert-flow-duration" as string]: `${duration}s` }}
        >
          {loop.map((cert, index) => (
            <CertificateSlide key={`${cert.id}-${index}`} cert={cert} />
          ))}
        </div>
      </div>
    </div>
  );
}
