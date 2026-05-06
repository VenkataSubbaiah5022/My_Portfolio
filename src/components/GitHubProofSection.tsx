import { GitBranch } from "lucide-react";

const stats = [
  "17+ repositories",
  "Multiple production-focused projects",
  "Public work across backend, realtime, and AI",
];

export function GitHubProofSection() {
  return (
    <section id="github-proof" className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
      <h2 className="mb-6 text-2xl font-semibold md:mb-8 md:text-3xl">GitHub Proof</h2>
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-sm leading-7 text-muted-foreground">
          Explore my active codebase, project evolution, and implementation style.
          I consistently build and iterate on backend-first product systems.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {stats.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
        <a
          href="https://github.com/VenkataSubbaiah5022"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs transition hover:border-primary/50"
        >
          <GitBranch className="h-3.5 w-3.5" />
          View GitHub Profile
        </a>
      </div>
    </section>
  );
}
