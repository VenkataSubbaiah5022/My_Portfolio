"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const lastYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastYRef.current;

      if (Math.abs(delta) < 8) return;
      if (delta > 0) setVisible(false);
      else setVisible(true);

      lastYRef.current = currentY;
    };

    lastYRef.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-4 z-50 mx-auto w-full max-w-6xl px-4 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-24"
      }`}
    >
      <nav className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/70 px-4 py-3 shadow-lg backdrop-blur-xl">
        <Link href="/" className="text-xs font-semibold tracking-wide sm:text-sm">
          My Portfolio
        </Link>
        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://www.upwork.com/freelancers/~017b9a8b315e94f07a?mp_source=share"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/50 hover:text-foreground md:inline-flex"
          >
            Hire Me
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
