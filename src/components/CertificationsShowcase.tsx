"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { CertificateFlowMarquee } from "@/components/CertificateFlowMarquee";
import {
  CertSpotlightCard,
  FeaturedCertCard,
} from "@/components/CertificationCard";
import { trackNavClick } from "@/lib/analytics";
import { featuredCertification, getCertificationStats } from "@/lib/certifications";

function StatsStrip() {
  const stats = getCertificationStats();
  const items = [
    { value: `${stats.uploaded}`, label: "Credentials" },
    { value: `${stats.issuers}`, label: "Issuers" },
    { value: `${stats.verified}`, label: "Verified" },
  ];

  return (
    <CertSpotlightCard className="p-5 sm:p-6 lg:col-span-5" delay={0.05}>
      <div className="relative z-[1] flex h-full flex-col">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
          </div>
          <div>
            <p className="text-xs font-bold tracking-wider text-primary uppercase">
              Continuous learning
            </p>
            <p className="text-[11px] text-muted-foreground">
              Upskilling across cloud, APIs, and frontend
            </p>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-3 gap-2">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center rounded-xl border border-border/70 bg-background/40 px-2 py-4 text-center"
            >
              <p className="text-xl font-black tracking-tight text-primary sm:text-2xl">
                {item.value}
              </p>
              <p className="mt-1 text-[10px] leading-snug text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>

        <Link
          href="/certifications"
          onClick={() => trackNavClick("certifications", "credentials_view_all")}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-xs font-bold text-background transition hover:opacity-90"
        >
          View all {stats.uploaded} certifications
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </CertSpotlightCard>
  );
}

export function CertificationsShowcase() {
  return (
    <motion.div
      id="credentials"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45 }}
      className="mt-12 scroll-mt-28"
    >
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
            Verified learning
          </p>
          <h3 className="mt-1 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Credentials &{" "}
            <span className="bg-gradient-to-br from-indigo-600 via-violet-500 to-indigo-800 bg-clip-text text-transparent dark:from-indigo-400 dark:via-blue-400 dark:to-indigo-600">
              certifications
            </span>
          </h3>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">
          A preview of official credentials — open the full gallery for every certificate.
        </p>
      </div>

      <CertificateFlowMarquee />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
        <FeaturedCertCard cert={featuredCertification} />
        <StatsStrip />
      </div>
    </motion.div>
  );
}
