import { FileText } from "lucide-react";

export function PublicationsSection() {
  return (
    <section id="publications" className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
      <h2 className="mb-6 text-2xl font-semibold md:mb-8 md:text-3xl">Publications</h2>
      <article className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-lg font-semibold">Jarvis: AI-Powered Voice Genie (Zenodo, 2025)</h3>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          Research publication documenting an NLP-based voice assistant with speech
          recognition, command routing, API automation, and text-to-speech response
          pipeline for hands-free productivity workflows.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Python", "NLP", "Speech Recognition", "Automation APIs"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2 py-1 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href="https://zenodo.org/records/15123556"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs transition hover:border-primary/50"
        >
          <FileText className="h-3.5 w-3.5" />
          Read Publication
        </a>
      </article>
    </section>
  );
}
