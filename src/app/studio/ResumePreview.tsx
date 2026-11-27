"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { checkLine, type ResumeEntry, type ResumeModel } from "@/lib/resume/engine";
import { visibleResume } from "@/lib/resume/export/layout";
import { cn } from "@/lib/utils";

type Props = {
  model: ResumeModel;
  onChange: (model: ResumeModel) => void;
};

/**
 * One line of the resume that you can click and retype. It commits on blur
 * (or Enter), so typing never fights React re-renders; pasting keeps plain text.
 */
function EditableLine({
  text,
  onCommit,
  className,
  flagged,
}: {
  text: string;
  onCommit: (text: string) => void;
  className?: string;
  flagged?: boolean;
}) {
  return (
    <span
      key={text}
      contentEditable
      suppressContentEditableWarning
      spellCheck
      onBlur={(event) => {
        const next = event.currentTarget.textContent?.replace(/\s+/g, " ").trim() ?? "";
        if (next !== text) onCommit(next);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.blur();
        }
        if (event.key === "Escape") {
          event.currentTarget.textContent = text;
          event.currentTarget.blur();
        }
      }}
      onPaste={(event) => {
        event.preventDefault();
        document.execCommand("insertText", false, event.clipboardData.getData("text/plain"));
      }}
      className={cn(
        "rounded-sm outline-none hover:bg-indigo-50 focus:bg-indigo-50 focus:ring-1 focus:ring-indigo-300",
        flagged && "bg-amber-50 underline decoration-amber-500 decoration-wavy",
        className,
      )}
    >
      {text}
    </span>
  );
}

function PdfFrame({ model }: { model: ResumeModel }) {
  const [url, setUrl] = useState<string | null>(null);
  const [pages, setPages] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;
    const timer = window.setTimeout(async () => {
      const { pdfPageCount, renderResumePdf } = await import("@/lib/resume/export/pdf");
      const blob = await renderResumePdf(model);
      if (cancelled) return;
      objectUrl = URL.createObjectURL(blob);
      setUrl(objectUrl);
      setPages(await pdfPageCount(blob));
    }, 400);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [model]);

  return (
    <div>
      <p className="mb-2 text-[11px] text-muted-foreground">
        The exact file you download{pages !== null ? ` · ${pages} page${pages === 1 ? "" : "s"}` : ""}. Edit in
        the paper view.
        {url ? (
          <>
            {" "}
            <a href={url} target="_blank" rel="noreferrer" className="text-primary underline">
              Open in a new tab
            </a>
          </>
        ) : null}
      </p>
      {url ? (
        <iframe title="Resume PDF preview" src={`${url}#toolbar=0&view=FitH`} className="h-[1000px] w-full rounded-lg border border-border bg-white" />
      ) : (
        <div className="flex h-[400px] items-center justify-center rounded-lg border border-border text-xs text-muted-foreground">
          Rendering PDF…
        </div>
      )}
    </div>
  );
}

export function ResumePreview({ model, onChange }: Props) {
  const [view, setView] = useState<"paper" | "pdf">("paper");
  const r = visibleResume(model);

  const updateBullet = (list: "experience" | "projects", entryId: string, key: string, patch: { text?: string; hidden?: boolean }) =>
    onChange({
      ...model,
      [list]: model[list].map((entry) =>
        entry.id === entryId
          ? { ...entry, bullets: entry.bullets.map((b) => (b.key === key ? { ...b, ...patch } : b)) }
          : entry,
      ),
    });

  const entries = (list: "experience" | "projects", title: string, items: ResumeEntry[], dated: boolean) => {
    const shown = items.filter((entry) => !entry.hidden);
    if (!shown.length) return null;
    return (
      <section className="mt-3">
        <h3 className="border-b border-neutral-500 pb-0.5 text-[14px] font-bold uppercase">{title}</h3>
        {shown.map((entry) => (
          <div key={entry.id} className="mt-1.5">
            <div className="flex justify-between gap-4">
              <p>
                <b>{entry.heading}</b> — {entry.subheading}
                {!dated && entry.link ? <span className="text-neutral-600"> | {entry.link.replace(/^https?:\/\/(www\.)?/, "")}</span> : null}
              </p>
              {dated ? <p className="shrink-0 text-neutral-600">{entry.dates}</p> : null}
            </div>
            <ul>
              {entry.bullets
                .filter((b) => !b.hidden)
                .map((b) => {
                  const flagged = checkLine(b.text, b.originalText, b.factIds).some((issue) => issue !== "edited");
                  return (
                    <li key={b.key} className="group relative mt-0.5 flex gap-1.5 pl-1">
                      <span aria-hidden>•</span>
                      <EditableLine
                        text={b.text}
                        flagged={flagged}
                        onCommit={(text) => updateBullet(list, entry.id, b.key, { text })}
                        className="flex-1"
                      />
                      <button
                        type="button"
                        title="Hide this line"
                        aria-label="Hide this line"
                        onClick={() => updateBullet(list, entry.id, b.key, { hidden: true })}
                        className="absolute top-0 -right-6 hidden rounded p-0.5 text-neutral-400 hover:text-red-600 group-hover:block"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </section>
    );
  };

  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold">Preview</h2>
          <p className="text-[11px] text-muted-foreground">
            Click any line to edit it. Enter saves, Esc cancels, × hides a line. Amber lines have a number that
            isn&apos;t in their source fact.
          </p>
        </div>
        <div className="flex rounded-lg border border-border p-0.5 text-xs">
          {(["paper", "pdf"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setView(option)}
              className={cn("rounded-md px-3 py-1", view === option && "bg-primary text-primary-foreground")}
            >
              {option === "paper" ? "Edit on paper" : "Exact PDF"}
            </button>
          ))}
        </div>
      </div>

      {view === "pdf" ? (
        <PdfFrame model={model} />
      ) : (
        <div className="overflow-x-auto">
          <article className="mx-auto w-full max-w-[794px] bg-white px-[7%] py-10 pr-[calc(7%+1.5rem)] font-[Helvetica,Arial,sans-serif] text-[13px] leading-[1.35] text-neutral-900 shadow-md ring-1 ring-black/5">
            <h1 className="text-[22px] font-bold">{r.name}</h1>
            <p className="text-[14px]">
              <EditableLine
                text={r.headline}
                onCommit={(text) => onChange({ ...model, targetRole: text })}
              />
            </p>
            <p className="mt-0.5 text-[12px] text-neutral-700">{r.contactLine}</p>

            <section className="mt-3">
              <h3 className="border-b border-neutral-500 pb-0.5 text-[14px] font-bold uppercase">Summary</h3>
              <p className="mt-1">
                <EditableLine
                  text={model.summary.text}
                  flagged={checkLine(model.summary.text, model.summary.originalText, model.summary.factIds).some(
                    (issue) => issue !== "edited",
                  )}
                  onCommit={(text) => onChange({ ...model, summary: { ...model.summary, text } })}
                />
              </p>
            </section>

            <section className="mt-3">
              <h3 className="border-b border-neutral-500 pb-0.5 text-[14px] font-bold uppercase">Skills</h3>
              {r.skills.map((group) => (
                <p key={group.title} className="mt-0.5">
                  <b>{group.title}:</b> {group.items.join(", ")}
                </p>
              ))}
            </section>

            {entries("experience", "Experience", model.experience, true)}
            {entries("projects", "Projects", model.projects, false)}

            <section className="mt-3">
              <h3 className="border-b border-neutral-500 pb-0.5 text-[14px] font-bold uppercase">Education</h3>
              {r.education.map((school) => (
                <div key={school.id} className="mt-1.5">
                  <div className="flex justify-between gap-4">
                    <b>{school.heading}</b>
                    <span className="text-neutral-600">{school.dates}</span>
                  </div>
                  <p>
                    {school.subheading} · {school.detail}
                  </p>
                </div>
              ))}
            </section>

            {r.certifications.length ? (
              <section className="mt-3">
                <h3 className="border-b border-neutral-500 pb-0.5 text-[14px] font-bold uppercase">Certifications</h3>
                <ul>
                  {r.certifications.map((cert) => (
                    <li key={cert} className="mt-0.5 flex gap-1.5 pl-1">
                      <span aria-hidden>•</span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </article>
        </div>
      )}
    </section>
  );
}
