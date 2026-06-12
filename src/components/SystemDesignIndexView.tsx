"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { trackNavClick } from "@/lib/analytics";
import { getSystemDesignTheme } from "@/lib/system-design-theme";
import { productionSystemDesigns, type SystemDesign } from "@/lib/system-design";
import { cn } from "@/lib/utils";

function SystemDesignCard({ design }: { design: SystemDesign }) {
  const theme = getSystemDesignTheme(design);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={`/system-design/${design.slug}`}
        onClick={() => trackNavClick("system_design_detail", "system_design_index")}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition hover:shadow-lg",
          theme.accentBorder,
          theme.accentHoverBorder,
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-white dark:bg-slate-950">
          {design.imageSrc ? (
            <Image
              src={design.imageSrc}
              alt={design.imageAlt ?? design.title}
              fill
              className="object-contain p-2 transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span
            className={cn(
              "mb-2 w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase",
              theme.accentBorder,
              theme.accentBg,
              theme.accentText,
            )}
          >
            Production systems
          </span>
          <h2 className="text-lg font-bold text-foreground">{design.title}</h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {design.subtitle}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {design.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[10px]",
                  theme.accentMutedBorder,
                  theme.accentMutedBg,
                  theme.accentText,
                )}
              >
                {tech}
              </span>
            ))}
          </div>
          <span className={cn("mt-4 inline-flex items-center gap-1 text-sm font-medium", theme.accentText)}>
            View deep dive
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function SystemDesignIndexView() {
  return (
    <div className="relative">
      <div className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(6,182,212,0.18), transparent 45%), radial-gradient(circle at 80% 0%, rgba(99,102,241,0.14), transparent 40%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-cyan-500/25 via-indigo-500/10 to-transparent opacity-80"
        />

        <section className="relative mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
          <Link
            href="/#system-design"
            onClick={() => trackNavClick("system_design", "system_design_index_back")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mt-6 max-w-3xl">
            <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-600 uppercase dark:text-cyan-400">
              Production systems
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl lg:text-5xl">
              System Design
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
              Anonymized production architectures from enterprise IoT and multi-product SaaS work —
              telemetry ingestion, microservices, data flows, and the engineering trade-offs behind them.
            </p>
          </div>
        </section>
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-5 md:grid-cols-2">
          {productionSystemDesigns.map((design) => (
            <SystemDesignCard key={design.slug} design={design} />
          ))}
        </div>
      </section>
    </div>
  );
}
