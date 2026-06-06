"use client";

import { ChevronUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { trackNavClick } from "@/lib/analytics";
import { getScrollProgress } from "@/lib/scroll-progress";
import { scrollToTop } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 320;
const RING_SIZE = 44;
const STROKE_WIDTH = 2;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScrollToTopButton() {
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const next = getScrollProgress();
      setProgress(next);
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollToTopHandler = () => {
    trackNavClick("scroll_to_top", "scroll_button");
    scrollToTop({ lenis });
  };

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <button
      type="button"
      onClick={scrollToTopHandler}
      aria-label="Back to top"
      className={cn(
        "group fixed bottom-4 left-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-card/90 backdrop-blur-md transition-all duration-300 hover:bg-card md:bottom-6 md:left-6",
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-2 scale-95 opacity-0",
      )}
    >
      <svg
        aria-hidden
        width={RING_SIZE}
        height={RING_SIZE}
        viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        className="absolute inset-0 m-auto -rotate-90"
      >
        <defs>
          <linearGradient id="scroll-top-ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4338ca" />
            <stop offset="50%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE_WIDTH}
          className="text-border/80"
        />
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="url(#scroll-top-ring-gradient)"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>

      <span className="absolute inset-0 flex items-center justify-center">
        <ChevronUp
          aria-hidden
          className="h-4 w-4 text-primary transition-transform duration-200 group-hover:-translate-y-0.5"
        />
      </span>
    </button>
  );
}
