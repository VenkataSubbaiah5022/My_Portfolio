"use client";

import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Home,
  Layers,
  Mail,
  MessageSquare,
  Search,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  filterCommands,
  groupFilteredCommands,
  type CommandGroup,
  type CommandItem,
} from "@/lib/command-palette";
import {
  trackFileDownload,
  trackNavClick,
  trackOutboundClick,
} from "@/lib/analytics";
import { cn } from "@/lib/utils";

const GROUP_ORDER: CommandGroup[] = ["navigate", "actions", "links", "projects"];

function CommandIcon({ item }: { item: CommandItem }) {
  const className = "h-4 w-4 shrink-0 text-muted-foreground";

  if (item.id === "home") return <Home className={className} />;
  if (item.id === "about") return <User className={className} />;
  if (item.id === "skills") return <Wrench className={className} />;
  if (item.id === "projects" || item.id === "all-projects" || item.group === "projects")
    return <Layers className={className} />;
  if (item.id === "process") return <Sparkles className={className} />;
  if (item.id === "education") return <GraduationCap className={className} />;
  if (item.id === "contact") return <MessageSquare className={className} />;
  if (item.id === "email") return <Mail className={className} />;
  if (item.id === "resume") return <Download className={className} />;
  if (item.id === "hire-upwork") return <BriefcaseBusiness className={className} />;
  if (item.id === "github") return <GitHubLogoIcon className={className} />;
  if (item.id === "linkedin") return <LinkedInLogoIcon className={className} />;
  if (item.id === "publications") return <FileText className={className} />;
  if (item.external) return <ExternalLink className={className} />;

  return <ArrowUpRight className={className} />;
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex min-w-[1.25rem] items-center justify-center rounded border border-border/80 bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground shadow-sm">
      {children}
    </kbd>
  );
}

type CommandPaletteProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function CommandPalette({ open: controlledOpen, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const open = controlledOpen ?? internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (onOpenChange) onOpenChange(next);
      else setInternalOpen(next);
      if (!next) {
        setQuery("");
        setActiveIndex(0);
      }
    },
    [onOpenChange],
  );

  const filtered = useMemo(() => filterCommands(query), [query]);
  const sections = useMemo(() => groupFilteredCommands(filtered), [filtered]);
  const flatItems = useMemo(
    () => sections.flatMap((section) => section.items),
    [sections],
  );

  const runCommand = useCallback(
    (item: CommandItem) => {
      setOpen(false);

      if (item.download) {
        trackFileDownload("resume.pdf", "command_palette");
        window.location.assign(item.href);
        return;
      }

      if (item.href.startsWith("mailto:")) {
        trackOutboundClick("Email", item.href, "command_palette");
        window.location.href = item.href;
        return;
      }

      if (item.external || item.href.startsWith("http")) {
        trackOutboundClick(item.label, item.href, "command_palette");
        window.open(item.href, "_blank", "noopener,noreferrer");
        return;
      }

      if (item.href === "/") {
        trackNavClick("home", "command_palette");
        if (pathname !== "/") {
          router.push("/");
          return;
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (item.href.startsWith("#")) {
        trackNavClick(item.label, "command_palette");
        if (pathname !== "/") {
          router.push(`/${item.href}`);
          return;
        }
        const target = document.querySelector<HTMLElement>(item.href);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      trackNavClick(item.label, "command_palette");
      router.push(item.href);
    },
    [pathname, router, setOpen],
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    const onToggle = () => setOpen(!open);
    window.addEventListener("command-palette:toggle", onToggle);
    return () => window.removeEventListener("command-palette:toggle", onToggle);
  }, [open, setOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const metaK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (metaK) {
        event.preventDefault();
        setOpen(!open);
        return;
      }

      if (!open) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (flatItems.length === 0) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % flatItems.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + flatItems.length) % flatItems.length);
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const item = flatItems[activeIndex];
        if (item) runCommand(item);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, flatItems, open, runCommand, setOpen]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const activeEl = listRef.current?.querySelector<HTMLElement>(
      `[data-command-index="${activeIndex}"]`,
    );
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  let runningIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close command palette"
            className="fixed inset-0 z-[100] bg-background/55 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="pointer-events-auto w-full max-w-xl"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-card/95 shadow-2xl shadow-black/15 ring-1 ring-white/10 backdrop-blur-xl dark:shadow-black/40">
              <div
                aria-hidden
                className="h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-70"
              />
              <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3.5">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search commands…"
                  className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-border/80 px-2 py-1 text-[10px] font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                >
                  Esc
                </button>
              </div>

              <div ref={listRef} className="max-h-[min(52vh,420px)] overflow-y-auto px-2 py-2">
                {flatItems.length === 0 ? (
                  <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                    No commands found.
                  </p>
                ) : (
                  sections.map((section) => (
                    <div key={section.group} className="pb-1">
                      <p className="px-3 pb-1.5 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
                        {section.label}
                      </p>
                      <ul>
                        {section.items.map((item) => {
                          runningIndex += 1;
                          const index = runningIndex;
                          const isActive = index === activeIndex;

                          return (
                            <li key={item.id}>
                              <button
                                type="button"
                                data-command-index={index}
                                onMouseEnter={() => setActiveIndex(index)}
                                onClick={() => runCommand(item)}
                                className={cn(
                                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition",
                                  isActive
                                    ? "bg-primary/10 text-foreground ring-1 ring-primary/20"
                                    : "text-foreground/90 hover:bg-background/70",
                                )}
                              >
                                <span
                                  className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 bg-background/70",
                                    isActive && "border-primary/30 bg-primary/5",
                                  )}
                                >
                                  <CommandIcon item={item} />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-sm font-medium">
                                    {item.label}
                                  </span>
                                  {item.description && (
                                    <span className="block truncate text-xs text-muted-foreground">
                                      {item.description}
                                    </span>
                                  )}
                                </span>
                                {item.id === "site" && (
                                  <span className="shrink-0 text-[10px] font-medium text-primary">
                                    You are here
                                  </span>
                                )}
                                {(item.external || item.href.startsWith("http")) &&
                                  item.id !== "site" && (
                                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                  )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/70 px-4 py-2.5 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd>
                  navigate
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Kbd>↵</Kbd>
                  select
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Kbd>Esc</Kbd>
                  close
                </span>
              </div>
            </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}
