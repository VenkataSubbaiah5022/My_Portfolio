"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  badge: string;
  titleBefore?: string;
  titleHighlight: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
  descriptionClassName?: string;
};

export function SectionHeading({
  badge,
  titleBefore = "",
  titleHighlight,
  description,
  className,
  align = "center",
  descriptionClassName,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
      className={cn(
        isCenter ? "mb-10 text-center md:mb-12" : "mb-6 md:mb-8",
        className,
      )}
    >
      <span
        className={cn(
          "mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary uppercase",
          !isCenter && "mb-4",
        )}
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        {badge}
      </span>
      <h2 className="text-4xl leading-tight font-black tracking-tight text-foreground sm:text-5xl">
        {titleBefore ? (
          <>
            {titleBefore}{" "}
          </>
        ) : null}
        <span className="bg-gradient-to-br from-indigo-600 via-violet-500 to-indigo-800 bg-clip-text text-transparent dark:from-indigo-400 dark:via-blue-400 dark:to-indigo-600">
          {titleHighlight}
        </span>
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-muted-foreground",
            isCenter ? "mx-auto max-w-xl" : "max-w-xl",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
