"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Brain,
  Cpu,
  Database,
  Globe,
  Monitor,
  Radio,
  Server,
  Sparkles,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import type { ArchitectureLayer, SystemDesign } from "@/lib/system-design";
import type { CaseStudyTheme } from "@/lib/case-study-theme";
import { cn } from "@/lib/utils";

type CaseStudyArchitectureFlowProps = {
  design: SystemDesign;
  theme: CaseStudyTheme;
};

const layerIcons: Record<string, LucideIcon> = {
  client: Monitor,
  cli: Terminal,
  api: Server,
  ai: Sparkles,
  data: Database,
  realtime: Radio,
  browser: Globe,
  logic: Cpu,
  stats: BarChart3,
};

function getLayerIcon(id: string): LucideIcon {
  return layerIcons[id] ?? Brain;
}

function FlowArrow({
  connectorClass,
}: {
  connectorClass: string;
  accentText: string;
}) {
  return (
    <div className="flex shrink-0 items-center px-1">
      <svg width="40" height="24" viewBox="0 0 40 24" aria-hidden className="overflow-visible">
        <path
          d="M0 12 C12 12, 20 4, 28 12 C32 16, 34 12, 40 12"
          fill="none"
          className={connectorClass}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M36 8 L40 12 L36 16"
          fill="none"
          className={connectorClass}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function LayerNode({
  layer,
  index,
  isActive,
  onSelect,
  theme,
}: {
  layer: ArchitectureLayer;
  index: number;
  isActive: boolean;
  onSelect: () => void;
  theme: CaseStudyTheme;
}) {
  const Icon = getLayerIcon(layer.id);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onSelect}
      className={cn(
        "group relative w-full min-w-0 rounded-2xl border bg-card p-4 text-left transition-all duration-200",
        "hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        isActive
          ? cn(theme.accentBorder, theme.accentBg, "shadow-md", theme.accentShadow)
          : cn("border-border", theme.accentHoverBorder),
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
            isActive ? cn(theme.accentBorder, theme.accentBg, theme.accentText) : "border-border bg-muted/50 text-muted-foreground",
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className={cn("text-[10px] font-bold tracking-widest uppercase", theme.accentText)}>
            Layer {index + 1}
          </p>
          <p className="mt-0.5 text-sm font-bold leading-tight text-foreground">{layer.title}</p>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {layer.subtitle}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {layer.technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className={cn(
              "rounded-md border px-2 py-0.5 text-[10px] font-medium",
              isActive
                ? cn(theme.accentBorder, theme.accentBg, theme.accentText)
                : "border-border bg-muted/40 text-muted-foreground",
            )}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.button>
  );
}

export function CaseStudyArchitectureFlow({
  design,
  theme,
}: CaseStudyArchitectureFlowProps) {
  const layers = design.layers ?? [];
  const [activeId, setActiveId] = useState(layers[0]?.id ?? "");
  const activeLayer = layers.find((l) => l.id === activeId) ?? layers[0];

  if (design.diagramType === "image" && design.imageSrc) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-2xl border bg-card p-4 shadow-sm md:p-6",
          theme.accentBorder,
        )}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted/20">
          <Image
            src={design.imageSrc}
            alt={design.imageAlt ?? design.title}
            fill
            className="object-contain object-center p-2"
            sizes="(max-width: 1024px) 100vw, 960px"
          />
        </div>
        {design.flowSummary.length > 0 ? (
          <FlowSummary steps={design.flowSummary} theme={theme} />
        ) : null}
      </div>
    );
  }

  if (!layers.length) return null;

  return (
    <div className="space-y-6">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border bg-card p-5 md:p-8",
          theme.accentBorder,
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: theme.mesh }}
        />

        <p className={cn("relative text-[10px] font-bold tracking-[0.2em] uppercase", theme.accentText)}>
          System layers
        </p>

        <div className="relative mt-6 flex flex-col gap-2 lg:flex-row lg:items-center">
          {layers.map((layer, index) => (
            <Fragment key={layer.id}>
              <div className="min-w-0 flex-1">
                <LayerNode
                  layer={layer}
                  index={index}
                  isActive={layer.id === activeId}
                  onSelect={() => setActiveId(layer.id)}
                  theme={theme}
                />
              </div>
              {index < layers.length - 1 ? (
                <>
                  <div className="flex justify-center py-1 lg:hidden">
                    <ArrowDown className={cn("h-5 w-5", theme.accentText)} />
                  </div>
                  <div className="hidden shrink-0 lg:flex">
                    <FlowArrow connectorClass={theme.accentConnector} accentText={theme.accentText} />
                  </div>
                </>
              ) : null}
            </Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeLayer ? (
            <motion.div
              key={activeLayer.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "relative mt-6 rounded-xl border bg-background/80 p-5 backdrop-blur-sm",
                theme.accentBorder,
              )}
            >
              <p className={cn("text-xs font-bold tracking-widest uppercase", theme.accentText)}>
                {activeLayer.title} — detail
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {activeLayer.subtitle}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeLayer.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-xs font-medium",
                      theme.accentBorder,
                      theme.accentBg,
                      theme.accentText,
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {design.flowSummary.length > 0 ? (
        <FlowSummary steps={design.flowSummary} theme={theme} />
      ) : null}
    </div>
  );
}

function FlowSummary({ steps, theme }: { steps: string[]; theme: CaseStudyTheme }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-gradient-to-br from-card to-muted/20 p-5 md:p-6",
        theme.accentBorder,
      )}
    >
      <p className={cn("text-[10px] font-bold tracking-[0.2em] uppercase", theme.accentText)}>
        Data flow
      </p>
      <div className="mt-5 space-y-0">
        {steps.map((step, index) => (
          <div key={step} className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                  theme.accentBorder,
                  theme.accentBg,
                  theme.accentText,
                )}
              >
                {index + 1}
              </span>
              {index < steps.length - 1 ? (
                <div
                  aria-hidden
                  className={cn(
                    "my-1 w-px flex-1 min-h-[2rem] bg-gradient-to-b from-current to-transparent opacity-30",
                    theme.accentText,
                  )}
                />
              ) : null}
            </div>
            <div className="min-w-0 flex-1 pb-6">
              <p className="text-sm leading-relaxed text-foreground md:text-base">{step}</p>
              {index < steps.length - 1 ? (
                <div className="mt-2 hidden items-center gap-1 sm:flex">
                  <ArrowRight className={cn("h-3.5 w-3.5", theme.accentText)} />
                  <span className={cn("text-[10px] font-semibold uppercase tracking-wide", theme.accentText)}>
                    Next step
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
