"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Download, Menu, Search, X, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  trackFileDownload,
  trackNavClick,
  trackOutboundClick,
} from "@/lib/analytics";
import { cn } from "@/lib/utils";

const UPWORK_URL =
  "https://www.upwork.com/freelancers/~017b9a8b315e94f07a?mp_source=share";

type NavLinkItem = {
  href: string;
  id: string;
  label: string;
};

type NavEntry =
  | ({ type: "link" } & NavLinkItem)
  | { type: "group"; label: string; items: NavLinkItem[] };

const projectsGroupItems: NavLinkItem[] = [
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#publications", id: "publications", label: "Publications" },
];

const navEntries: NavEntry[] = [
  { type: "link", href: "#home", id: "home", label: "Home" },
  { type: "link", href: "#about", id: "about", label: "About" },
  { type: "link", href: "#skills", id: "tech", label: "Tech" },
  { type: "group", label: "Projects", items: projectsGroupItems },
  { type: "link", href: "#experience", id: "career", label: "Career" },
  { type: "link", href: "#recommendations", id: "why-me", label: "Why me" },
  { type: "link", href: "#build-process", id: "process", label: "Process" },
  { type: "link", href: "#services", id: "services", label: "Services" },
  { type: "link", href: "#contact", id: "contact", label: "Contact" },
];

const allNavIds = navEntries.flatMap((entry) =>
  entry.type === "link" ? [entry.id] : entry.items.map((item) => item.id),
);

type NavId = (typeof allNavIds)[number];

/** Maps every on-page section to the nav item that should highlight while scrolling. */
const scrollSpySections: { sectionId: string; navId: NavId }[] = [
  { sectionId: "home", navId: "home" },
  { sectionId: "about", navId: "about" },
  { sectionId: "skills", navId: "tech" },
  { sectionId: "projects", navId: "projects" },
  { sectionId: "publications", navId: "publications" },
  { sectionId: "challenges", navId: "projects" },
  { sectionId: "experience", navId: "career" },
  { sectionId: "recommendations", navId: "why-me" },
  { sectionId: "writing", navId: "why-me" },
  { sectionId: "education", navId: "why-me" },
  { sectionId: "build-process", navId: "process" },
  { sectionId: "github-proof", navId: "process" },
  { sectionId: "services", navId: "services" },
  { sectionId: "contact", navId: "contact" },
];

const SCROLL_PROBE_OFFSET = 128;
const NAV_SCROLL_DURATION_MS = 520;

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - (-2 * progress + 2) ** 3 / 2;
}

function getNavLinkScrollTarget(container: HTMLElement, target: HTMLElement) {
  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const targetOffset =
    targetRect.left - containerRect.left + container.scrollLeft;
  const centered = targetOffset - (container.clientWidth - target.offsetWidth) / 2;
  const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);

  return Math.max(0, Math.min(centered, maxScroll));
}

function animateNavScrollToActive(
  container: HTMLElement,
  target: HTMLElement,
  duration = NAV_SCROLL_DURATION_MS,
) {
  const start = container.scrollLeft;
  const end = getNavLinkScrollTarget(container, target);
  const distance = end - start;

  if (Math.abs(distance) < 1) {
    return () => undefined;
  }

  let frame = 0;
  let startTime: number | undefined;

  const step = (timestamp: number) => {
    if (startTime === undefined) {
      startTime = timestamp;
    }

    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    container.scrollLeft = start + distance * easeInOutCubic(progress);

    if (progress < 1) {
      frame = requestAnimationFrame(step);
    }
  };

  frame = requestAnimationFrame(step);

  return () => {
    cancelAnimationFrame(frame);
  };
}

const moreLinks = [
  { href: "#challenges", label: "Challenges" },
  { href: "#github-proof", label: "GitHub" },
  { href: "#writing", label: "Writing" },
  { href: "#education", label: "Education" },
] as const;

function getActiveNavId(): NavId {
  if (window.scrollY < 72) {
    return "home";
  }

  const probe = window.scrollY + SCROLL_PROBE_OFFSET;
  let activeNav: NavId = "home";

  for (const { sectionId, navId } of scrollSpySections) {
    const element = document.getElementById(sectionId);
    if (!element) continue;

    const sectionTop = element.getBoundingClientRect().top + window.scrollY;
    if (sectionTop <= probe) {
      activeNav = navId;
    }
  }

  return activeNav;
}

function resolveHref(pathname: string, href: string) {
  return pathname === "/" ? href : `/${href}`;
}

function NavLink({
  href,
  label,
  active,
  onClick,
  className,
  navId,
  animated = false,
}: {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  navId?: string;
  animated?: boolean;
}) {
  return (
    <a
      href={href}
      data-nav-id={navId}
      onClick={onClick}
      className={cn(
        "relative shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-300 ease-out lg:px-3",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground/90",
        className,
      )}
    >
      {active && animated ? (
        <motion.span
          layoutId="navbar-active-indicator"
          className="absolute inset-0 rounded-lg border border-primary/25 bg-primary/10 shadow-sm shadow-primary/5"
          transition={{ type: "spring", stiffness: 360, damping: 30, mass: 0.85 }}
        />
      ) : null}
      {active && !animated ? (
        <span className="absolute inset-0 rounded-lg border border-primary/25 bg-primary/10 shadow-sm shadow-primary/5" />
      ) : null}
      <span className="relative z-[1]">{label}</span>
    </a>
  );
}

function NavDropdown({
  label,
  items,
  activeId,
  pathname,
  onNavigate,
  animated = false,
}: {
  label: string;
  items: NavLinkItem[];
  activeId: NavId;
  pathname: string;
  onNavigate: (label: string) => void;
  animated?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const groupActive = items.some((item) => item.id === activeId);
  const scrollSpyId = groupActive ? activeId : items[0]?.id;

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateMenuPosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setMenuPos({ top: rect.bottom + 6, left: rect.left });
  };

  const showMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    updateMenuPosition();
    setOpen(true);
  };

  const hideMenu = () => {
    closeTimerRef.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;

    const onViewportChange = () => updateMenuPosition();
    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onViewportChange);

    return () => {
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const menu = (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="projects-nav-menu"
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          style={{ top: menuPos.top, left: menuPos.left }}
          className="fixed z-[200] min-w-[9.5rem] overflow-hidden rounded-xl border border-border/80 bg-card/95 p-1 shadow-xl backdrop-blur-xl"
          onMouseEnter={showMenu}
          onMouseLeave={hideMenu}
        >
          <ul role="listbox" aria-label={`${label} sections`}>
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={resolveHref(pathname, item.href)}
                  data-nav-id={item.id}
                  onClick={() => {
                    onNavigate(item.label);
                    setOpen(false);
                  }}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                    activeId === item.id
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className="relative shrink-0"
        onMouseEnter={showMenu}
        onMouseLeave={hideMenu}
      >
        <button
          type="button"
          data-nav-id={scrollSpyId}
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => {
            updateMenuPosition();
            setOpen((value) => !value);
          }}
          className={cn(
            "relative flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-300 ease-out lg:px-3",
            groupActive
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground/90",
          )}
        >
          {groupActive && animated ? (
            <motion.span
              layoutId="navbar-active-indicator"
              className="absolute inset-0 rounded-lg border border-primary/25 bg-primary/10 shadow-sm shadow-primary/5"
              transition={{ type: "spring", stiffness: 360, damping: 30, mass: 0.85 }}
            />
          ) : null}
          {groupActive && !animated ? (
            <span className="absolute inset-0 rounded-lg border border-primary/25 bg-primary/10 shadow-sm shadow-primary/5" />
          ) : null}
          <span className="relative z-[1]">{label}</span>
          <ChevronDown
            className={cn(
              "relative z-[1] h-3 w-3 transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>
      </div>

      {mounted ? createPortal(menu, document.body) : null}
    </>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<NavId>("home");
  const navScrollRef = useRef<HTMLDivElement>(null);
  const cancelNavScrollRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveId(pathname.startsWith("/projects") ? "projects" : "home");
      return;
    }

    let frame = 0;

    const updateActive = () => {
      setActiveId(getActiveNavId());
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActive);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const container = navScrollRef.current;
    const activeLink = container?.querySelector<HTMLElement>(
      `[data-nav-id="${activeId}"]`,
    );

    if (!container || !activeLink) return;

    cancelNavScrollRef.current?.();
    cancelNavScrollRef.current = animateNavScrollToActive(container, activeLink);

    return () => {
      cancelNavScrollRef.current?.();
      cancelNavScrollRef.current = null;
    };
  }, [activeId, pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (label: string) => {
    trackNavClick(label, "navbar");
    setMobileOpen(false);
  };

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("command-palette:toggle"));
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-4 z-50 mx-auto w-full max-w-7xl overflow-visible px-4">
        <nav className="relative flex h-14 items-center justify-between overflow-visible rounded-2xl border border-border/80 bg-card/75 px-4 backdrop-blur-md transition-colors duration-300 sm:px-6 dark:bg-card/65">
          <div
            aria-hidden
            className="absolute top-0 left-8 right-8 h-px rounded-full bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-60"
          />

          <Link
            href="/"
            onClick={() => handleNavClick("home")}
            className="group flex shrink-0 items-center gap-2"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-indigo-400 text-primary-foreground">
              <Zap className="h-3.5 w-3.5" aria-hidden />
            </div>
            <span className="text-base font-black tracking-tight text-foreground transition-colors duration-200">
              Venkata<span className="text-primary">.</span>
            </span>
          </Link>

          <div
            ref={navScrollRef}
            className="hidden max-w-[min(100%,42rem)] flex-1 items-center justify-center gap-0.5 overflow-x-auto overscroll-x-contain px-1 lg:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {navEntries.map((entry) =>
              entry.type === "link" ? (
                <NavLink
                  key={entry.id}
                  navId={entry.id}
                  animated
                  href={resolveHref(pathname, entry.href)}
                  label={entry.label}
                  active={activeId === entry.id}
                  onClick={() => handleNavClick(entry.label)}
                />
              ) : (
                <NavDropdown
                  key={entry.label}
                  label={entry.label}
                  items={entry.items}
                  activeId={activeId}
                  pathname={pathname}
                  onNavigate={handleNavClick}
                  animated
                />
              ),
            )}
          </div>

          <div className="hidden items-center gap-2.5 md:flex">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open command palette (⌘K)"
              className="hidden items-center gap-2 rounded-lg border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-150 hover:border-primary/30 hover:text-foreground md:flex"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
              <kbd className="ml-0.5 flex items-center rounded border border-border/80 bg-card px-1 py-0.5 text-[10px] text-muted-foreground">
                ⌘K
              </kbd>
            </button>

            <a
              href="/resume.pdf"
              download
              onClick={() => trackFileDownload("resume.pdf", "navbar")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-all duration-200 hover:bg-foreground/[0.03] hover:text-foreground"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>

            <a
              href={UPWORK_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackOutboundClick("Upwork", UPWORK_URL, "navbar_hire_cta")
              }
              className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-xl bg-foreground px-4 py-2 text-xs font-bold text-background transition-opacity hover:opacity-90"
            >
              <span className="relative flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Hire Me
              </span>
            </a>

            <ThemeToggle compact />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open search"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/80 text-muted-foreground transition-colors hover:bg-foreground/[0.04]"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/80 text-muted-foreground transition-colors hover:bg-foreground/[0.04]"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[60] bg-background/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed inset-x-4 top-[4.75rem] z-[61] mx-auto max-w-7xl md:hidden"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="overflow-hidden rounded-2xl border border-border/80 bg-card/95 p-3 backdrop-blur-xl">
                <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Navigate
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {navEntries.map((entry) =>
                    entry.type === "link" ? (
                      <NavLink
                        key={entry.id}
                        href={resolveHref(pathname, entry.href)}
                        label={entry.label}
                        active={activeId === entry.id}
                        onClick={() => handleNavClick(entry.label)}
                        className="text-center"
                      />
                    ) : (
                      <div key={entry.label} className="col-span-2 rounded-xl border border-border/70 p-1">
                        <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          {entry.label}
                        </p>
                        <ul className="space-y-1">
                          {entry.items.map((item) => (
                            <li key={item.id}>
                              <NavLink
                                href={resolveHref(pathname, item.href)}
                                label={item.label}
                                active={activeId === item.id}
                                onClick={() => handleNavClick(item.label)}
                                className="w-full text-left"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ),
                  )}
                </div>

                <p className="px-2 pb-2 pt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  More
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {moreLinks.map((link) => (
                    <NavLink
                      key={link.href}
                      href={resolveHref(pathname, link.href)}
                      label={link.label}
                      onClick={() => handleNavClick(link.label)}
                      className="text-center"
                    />
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border/70 pt-4">
                  <a
                    href="/resume.pdf"
                    download
                    onClick={() => {
                      trackFileDownload("resume.pdf", "navbar_mobile");
                      setMobileOpen(false);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border/80 px-3 py-2.5 text-xs font-semibold text-muted-foreground"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Resume
                  </a>
                  <a
                    href={UPWORK_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      trackOutboundClick("Upwork", UPWORK_URL, "navbar_mobile");
                      setMobileOpen(false);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-foreground px-3 py-2.5 text-xs font-bold text-background"
                  >
                    Hire Me
                  </a>
                </div>

                <div className="mt-3 flex justify-center">
                  <ThemeToggle compact />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
