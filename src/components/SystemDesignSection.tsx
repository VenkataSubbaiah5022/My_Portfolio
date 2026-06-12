"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { trackNavClick } from "@/lib/analytics";
import { getSystemDesignTheme } from "@/lib/system-design-theme";
import { productionSystemDesigns } from "@/lib/system-design";
import { cn } from "@/lib/utils";

export function SystemDesignSection() {
  return (
    <section id="system-design" className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <SectionHeading
          badge="System design"
          titleBefore="Production"
          titleHighlight="platform architecture"
          description="Anonymized IoT telemetry pipelines and multi-product microservices from enterprise production work — diagrams, data flows, and engineering trade-offs."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {productionSystemDesigns.map((design, index) => {
            const theme = getSystemDesignTheme(design);

            return (
              <motion.div
                key={design.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link
                  href={`/system-design/${design.slug}`}
                  onClick={() => trackNavClick("system_design", "home_preview")}
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
                  <div className="flex flex-1 flex-col p-4">
                    <span
                      className={cn(
                        "mb-2 w-fit rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase",
                        theme.accentBorder,
                        theme.accentBg,
                        theme.accentText,
                      )}
                    >
                      Production
                    </span>
                    <h3 className="font-bold text-foreground">{design.title}</h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                      {design.subtitle}
                    </p>
                    <span className={cn("mt-3 inline-flex items-center gap-1 text-xs font-medium", theme.accentText)}>
                      View architecture
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/system-design"
            onClick={() => trackNavClick("system_design_index", "home")}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition hover:border-cyan-500/40"
          >
            View all system designs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
