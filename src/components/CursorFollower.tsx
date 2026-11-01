"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const ringSpring = { stiffness: 700, damping: 40, mass: 0.2 };
const glowSpring = { stiffness: 220, damping: 28, mass: 0.4 };

export function CursorFollower() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, ringSpring);
  const ringY = useSpring(cursorY, ringSpring);
  const glowX = useSpring(cursorX, glowSpring);
  const glowY = useSpring(cursorY, glowSpring);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isCoarsePointer) return;

    const handleMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setVisible(true);

      const target = event.target;
      const interactive =
        target instanceof Element &&
        Boolean(
          target.closest(
            "a, button, input, textarea, select, label, [role='button']",
          ),
        );
      setHovering(interactive);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
    >
      <motion.div
        className="absolute top-0 left-0 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl will-change-transform"
        style={{ x: glowX, y: glowY }}
        animate={{ opacity: hovering ? 0.85 : 0.45, scale: hovering ? 1.12 : 1 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-primary/5 transition-[border-color] duration-200 will-change-transform ${
          hovering ? "border-primary" : "border-primary/40"
        }`}
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 44 : 32,
          height: hovering ? 44 : 32,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />
      <motion.div
        className="absolute top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary will-change-transform"
        style={{ x: cursorX, y: cursorY }}
        animate={{ scale: hovering ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
