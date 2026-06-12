"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ArchitectureLayer } from "@/lib/system-design";
import { cn } from "@/lib/utils";

type ArchitectureLayersProps = {
  layers: ArchitectureLayer[];
  className?: string;
};

export function ArchitectureLayers({ layers, className }: ArchitectureLayersProps) {
  const [activeId, setActiveId] = useState(layers[0]?.id ?? "");

  const activeLayer = layers.find((layer) => layer.id === activeId) ?? layers[0];

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[1fr_1.1fr]", className)}>
      <div className="space-y-2">
        {layers.map((layer, index) => {
          const isActive = layer.id === activeId;

          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => setActiveId(layer.id)}
              className={cn(
                "group relative w-full overflow-hidden rounded-xl border px-4 py-3.5 text-left transition",
                isActive
                  ? "border-primary/50 bg-primary/10 shadow-sm"
                  : "border-border bg-card hover:border-primary/30",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-primary uppercase">
                    Layer {index + 1}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">{layer.title}</p>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition",
                    isActive && "rotate-180 text-primary",
                  )}
                />
              </div>
              {index < layers.length - 1 ? (
                <div
                  aria-hidden
                  className="absolute -bottom-3 left-1/2 h-3 w-px -translate-x-1/2 bg-gradient-to-b from-primary/40 to-transparent"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 md:p-6 lg:min-h-[420px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_55%)]"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayer.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <p className="text-xs font-bold tracking-widest text-primary uppercase">
              Active layer
            </p>
            <h3 className="mt-2 text-xl font-bold text-foreground">{activeLayer.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {activeLayer.subtitle}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {activeLayer.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div aria-hidden className="relative mt-8 space-y-2">
          {layers.map((layer) => (
            <div
              key={layer.id}
              className={cn(
                "flex h-9 items-center justify-center rounded-lg border text-[10px] font-semibold tracking-wide uppercase transition",
                layer.id === activeId
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-border/80 bg-muted/40 text-muted-foreground",
              )}
            >
              {layer.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
