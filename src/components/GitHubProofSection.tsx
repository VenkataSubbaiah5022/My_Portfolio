"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  FolderGit2,
  GitBranch,
  GitCommit,
  Star,
  Terminal,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { type PointerEvent, type ReactNode, useEffect, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { trackOutboundClick } from "@/lib/analytics";
import {
  formatGitHubRelativeTime,
  isRecentlyActive,
  type GitHubActivitySnapshot,
} from "@/lib/github-activity";
import { projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

const GITHUB_URL = "https://github.com/VenkataSubbaiah5022";

const statCards = [
  {
    label: "Live demos shipped",
    value: `${projects.filter((p) => p.live).length}+`,
    icon: Code2,
    accent: "text-violet-600 dark:text-violet-400",
    box: "border-violet-500/20 bg-violet-500/[0.08]",
  },
  {
    label: "Focus areas",
    value: "3",
    detail: "Backend · Realtime · AI",
    icon: GitBranch,
    accent: "text-emerald-600 dark:text-emerald-400",
    box: "border-emerald-500/20 bg-emerald-500/[0.08]",
  },
  {
    label: "Active iteration",
    value: "Weekly",
    detail: "Ship · refactor · document",
    icon: GitCommit,
    accent: "text-sky-600 dark:text-sky-400",
    box: "border-sky-500/20 bg-sky-500/[0.08]",
  },
  {
    label: "Portfolio projects",
    value: `${projects.filter((p) => p.code).length}+`,
    icon: FolderGit2,
    accent: "text-indigo-600 dark:text-indigo-400",
    box: "border-indigo-500/20 bg-indigo-500/[0.08]",
  },
];

const terminalFallback = ["Fetching recent repositories from GitHub…"];

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-amber-400",
  Python: "bg-yellow-400",
  HTML: "bg-orange-500",
  CSS: "bg-violet-400",
  Java: "bg-red-500",
  Go: "bg-cyan-400",
};

const featuredRepos = projects
  .filter((project) => project.code)
  .slice(0, 4)
  .map((project) => ({
    name: project.code!.split("/").pop() ?? project.title,
    title: project.title,
    stack: project.stack.slice(0, 3),
    url: project.code!,
  }));

function RecentGitHubActivity() {
  const [activity, setActivity] = useState<GitHubActivitySnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/github/activity")
      .then(async (response) => {
        if (!response.ok) throw new Error("GitHub activity unavailable");
        return response.json() as Promise<GitHubActivitySnapshot>;
      })
      .then((data) => {
        if (!cancelled) {
          setActivity(data);
          setError(false);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const terminalLines = activity?.repos.length
    ? activity.repos.map(
        (repo) =>
          `${repo.name.padEnd(28)} ${formatGitHubRelativeTime(repo.pushedAt)}`,
      )
    : terminalFallback;

  const latestPush = activity?.repos[0]?.pushedAt;
  const showActiveBadge = latestPush ? isRecentlyActive(latestPush) : false;

  return (
    <>
      <div className="relative z-[1] flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/80 bg-foreground/[0.04] dark:bg-foreground/[0.06]">
            <SiGithub className="h-6 w-6 text-foreground" aria-hidden />
          </div>
          <div>
            <p className="text-sm font-bold">{activity?.username ?? "VenkataSubbaiah5022"}</p>
            <p className="text-xs text-muted-foreground">
              {loading
                ? "Loading public repo count…"
                : `${activity?.publicRepos ?? "17+"} public repositories`}
            </p>
          </div>
        </div>
        {showActiveBadge ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Pushed {formatGitHubRelativeTime(latestPush!)}
          </span>
        ) : null}
      </div>

      <div className="relative z-[1] mt-5 overflow-hidden rounded-xl border border-border/80 bg-[#0d1117] shadow-inner">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#161b22] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          <span className="ml-2 inline-flex items-center gap-1 font-mono text-[10px] text-white/50">
            <Terminal className="h-3 w-3" />
            ~/repos
          </span>
        </div>
        <div className="space-y-1.5 p-4 font-mono text-[10px] leading-relaxed sm:text-[11px]">
          <p className="text-emerald-400">
            venkata@github <span className="text-white/45">$</span> ls -lt --limit 5
          </p>
          {loading ? (
            <p className="text-white/45">{terminalFallback[0]}</p>
          ) : (
            terminalLines.map((line) => (
              <p key={line} className="truncate text-white/70">
                {line}
              </p>
            ))
          )}
        </div>
      </div>

      <div className="relative z-[1] mt-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
            Recently updated repos
          </p>
          <span className="text-[10px] text-muted-foreground">Live from GitHub</span>
        </div>

        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-12 animate-pulse rounded-xl border border-border/60 bg-foreground/[0.03]"
              />
            ))}
          </div>
        ) : error || !activity?.repos.length ? (
          <p className="rounded-xl border border-border/70 bg-background/40 px-3 py-3 text-xs text-muted-foreground">
            Couldn&apos;t load live activity right now.{" "}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              View repos on GitHub
            </a>
          </p>
        ) : (
          <ul className="space-y-2">
            {activity.repos.map((repo, index) => (
              <motion.li
                key={repo.url}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackOutboundClick(repo.name, repo.url, "github_proof_recent")
                  }
                  className="group/repo flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/40 px-3 py-2.5 transition-colors hover:border-primary/30 hover:bg-background/70"
                >
                  <div className="flex min-w-0 items-start gap-2.5">
                    <span
                      className={cn(
                        "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full",
                        repo.language
                          ? (languageColors[repo.language] ?? "bg-muted-foreground")
                          : "bg-muted-foreground/40",
                      )}
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-foreground group-hover/repo:text-primary">
                        {repo.name}
                      </p>
                      {repo.description ? (
                        <p className="truncate text-[10px] text-muted-foreground">
                          {repo.description}
                        </p>
                      ) : repo.language ? (
                        <p className="truncate text-[10px] text-muted-foreground">
                          {repo.language}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[10px] font-medium text-muted-foreground">
                      {formatGitHubRelativeTime(repo.pushedAt)}
                    </p>
                    {repo.stars > 0 ? (
                      <p className="text-[10px] text-muted-foreground/80">{repo.stars} ★</p>
                    ) : null}
                  </div>
                </a>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function SpotlightCard({
  children,
  className,
  glow = "rgba(79, 70, 229, 0.12)",
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
}) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--spotlight-x", "50%");
        event.currentTarget.style.setProperty("--spotlight-y", "0%");
      }}
      style={{ ["--spotlight-color" as string]: glow }}
      className={cn(
        "group relative isolate overflow-hidden rounded-[1.25rem] border border-border/80 bg-card/95 shadow-sm backdrop-blur-sm transition-shadow duration-500 hover:shadow-md",
        className,
      )}
    >
      <div
        aria-hidden
        className="service-card-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="absolute top-0 left-6 h-px w-8 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-70 transition-all duration-500 group-hover:w-[calc(100%-3rem)]"
      />
      {children}
    </motion.div>
  );
}

export function GitHubProofSection() {
  return (
    <section
      id="github-proof"
      className="relative overflow-hidden py-16 md:py-20"
      style={{ background: "var(--section-tint)" }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute top-[10%] right-[-5%] h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(circle, var(--skills-glow-primary) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-[5%] left-[-8%] h-[360px] w-[360px] rounded-full blur-[100px]"
          style={{
            background: `radial-gradient(circle, var(--skills-glow-secondary) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-40 dark:opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(var(--skills-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--skills-grid-line) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 left-0 select-none overflow-hidden text-center text-[clamp(72px,14vw,180px)] leading-none font-black tracking-[-0.04em] text-transparent"
        style={{ WebkitTextStroke: "1px var(--services-watermark-stroke)" }}
      >
        COMMITS
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeading
          badge="Open source"
          titleBefore="GitHub"
          titleHighlight="proof"
          description="Explore my active codebase, project evolution, and implementation style. I consistently build and iterate on backend-first product systems."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          <SpotlightCard className="p-6 sm:p-7 lg:col-span-7" glow="rgba(16, 185, 129, 0.1)">
            <RecentGitHubActivity />
          </SpotlightCard>

          <div className="flex flex-col gap-5 lg:col-span-5">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {statCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <SpotlightCard
                    key={stat.label}
                    className="p-4"
                    glow="rgba(79, 70, 229, 0.1)"
                  >
                    <div className="relative z-[1]">
                      <div
                        className={cn(
                          "mb-3 flex h-9 w-9 items-center justify-center rounded-xl border",
                          stat.box,
                        )}
                      >
                        <Icon className={cn("h-4 w-4", stat.accent)} aria-hidden />
                      </div>
                      <p className={cn("text-xl font-black tracking-tight", stat.accent)}>
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug font-semibold text-foreground">
                        {stat.label}
                      </p>
                      {stat.detail ? (
                        <p className="mt-0.5 text-[10px] text-muted-foreground">{stat.detail}</p>
                      ) : null}
                      <span className="sr-only">{`, stat ${index + 1}`}</span>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>

            <SpotlightCard className="flex-1 p-5 sm:p-6">
              <div className="relative z-[1]">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold">Featured on portfolio</h3>
                  <Star className="h-4 w-4 text-amber-500" aria-hidden />
                </div>
                <ul className="space-y-2.5">
                  {featuredRepos.map((repo) => (
                    <li key={repo.url}>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() =>
                          trackOutboundClick(repo.title, repo.url, "github_proof_repo")
                        }
                        className="group/repo flex items-start justify-between gap-3 rounded-xl border border-border/70 bg-background/40 px-3 py-2.5 transition-all duration-200 hover:border-primary/30 hover:bg-background/70"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-primary group-hover/repo:underline">
                            {repo.name}
                          </p>
                          <p className="truncate text-[10px] text-muted-foreground">{repo.title}</p>
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {repo.stack.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md border border-border/80 px-1.5 py-0.5 text-[9px] text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover/repo:translate-x-0.5 group-hover/repo:-translate-y-0.5 group-hover/repo:text-primary" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <p className="max-w-xl text-sm text-muted-foreground">
            From MERN chat apps to IoT microservices — my GitHub is where architecture decisions,
            tests, and refactors stay visible.
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackOutboundClick("GitHub", GITHUB_URL, "github_proof")}
            className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-foreground px-5 py-3 text-sm font-bold text-background transition hover:opacity-90"
          >
            <SiGithub className="h-4 w-4" aria-hidden />
            View GitHub Profile
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
