"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { CertificationCard } from "@/components/CertificationCard";
import { trackNavClick } from "@/lib/analytics";
import {
  certificationCategories,
  certifications,
  getCertificationStats,
  type CertCategory,
} from "@/lib/certifications";
import { cn } from "@/lib/utils";

const filters = [
  { id: "all", label: "All" },
  ...Object.entries(certificationCategories).map(([id, { label }]) => ({
    id: id as CertCategory,
    label,
  })),
] as const;

type FilterId = (typeof filters)[number]["id"];

export function AllCertificationsView() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const stats = getCertificationStats();

  const filtered = useMemo(() => {
    if (activeFilter === "all") return certifications;
    return certifications.filter((cert) => cert.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
      <Link
        href="/#credentials"
        onClick={() => trackNavClick("credentials", "all_certifications_back")}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <div className="mt-6">
        <p className="text-xs font-medium tracking-widest text-primary uppercase">
          Credentials
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          All certifications
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
          {stats.uploaded} verified credentials from {stats.issuers} issuers — HackerRank,
          NPTEL, IBM, AWS Educate, MongoDB University, and more.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs transition",
              activeFilter === filter.id
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Showing {filtered.length} of {certifications.length}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((cert, index) => (
          <CertificationCard key={cert.id} cert={cert} delay={Math.min(index * 0.03, 0.3)} />
        ))}
      </div>
    </section>
  );
}
