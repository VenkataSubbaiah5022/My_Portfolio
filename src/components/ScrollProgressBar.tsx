"use client";

import { useEffect, useState } from "react";
import { getScrollProgress } from "@/lib/scroll-progress";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const next = getScrollProgress();
      setProgress(next);
      setVisible(next > 0.001);
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

  if (!visible) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-indigo-700 via-indigo-500 to-violet-400 dark:from-indigo-400 dark:via-sky-400 dark:to-cyan-300"
      style={{
        transform: `scaleX(${progress})`,
        transition: "transform 80ms linear",
      }}
    />
  );
}
