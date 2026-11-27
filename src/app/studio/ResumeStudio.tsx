"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Download, Eye, EyeOff, Save, Wand2 } from "lucide-react";
import {
  buildMatchReport,
  buildResume,
  checkLine,
  estimatePages,
  resumeFileName,
  trimOnce,
  type BulletIssue,
  type MatchReport,
  type ResumeEntry,
  type ResumeModel,
} from "@/lib/resume/engine";
import { atsCheck, type AtsCheck } from "@/lib/resume/ats";
import {
  deleteResume,
  exportBackup,
  importBackup,
  listResumes,
  saveResume,
  type SavedResume,
} from "@/lib/resume/history";
import { analyzeJobDescription, type JdAnalysis } from "@/lib/resume/jd";
import { LINT_LABEL, lintBullets } from "@/lib/resume/lint";
import { cn } from "@/lib/utils";

const MAX_JD_LENGTH = 15000;

const STATUS_STYLE = {
  covered: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  partial: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  gap: "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300",
} as const;

const ISSUE_LABEL: Record<BulletIssue, string> = {
  edited: "edited — unverified",
  "unsupported-number": "number not in source fact",
  "missing-fact": "no source fact",
};

function download(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function IssueBadges({ issues }: { issues: BulletIssue[] }) {
  return issues.map((issue) => (
    <span
      key={issue}
      className={cn(
        "rounded-full border px-1.5 py-0.5 text-[10px]",
        issue === "edited" ? STATUS_STYLE.partial : STATUS_STYLE.gap,
      )}
    >
      {ISSUE_LABEL[issue]}
    </span>
  ));
}

function MatchPanel({ jd, report }: { jd: JdAnalysis; report: MatchReport }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold">Match report</h2>
        <p className="text-xs text-muted-foreground">
          {report.coveragePct}% backed by your facts · role family: {jd.family}
          {jd.minYears !== null ? ` · asks for ${jd.minYears}+ years` : ""}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {report.items.map((item) => (
          <span
            key={item.skill.name}
            title={item.factIds.join(", ") || "No fact mentions this"}
            className={cn("rounded-full border px-2 py-0.5 text-xs", STATUS_STYLE[item.status])}
          >
            {item.skill.spelling}
            <span className="ml-1 opacity-70">· {item.skill.requirement}</span>
          </span>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Green: proven in experience or projects. Amber: only in skills or certificates. Red: no fact,
        so it stays off the resume.
      </p>
      {report.otherKeywords.some((k) => !k.inFacts) ? (
        <p className="mt-2 text-xs text-muted-foreground">
          Other JD terms with no fact:{" "}
          {report.otherKeywords
            .filter((k) => !k.inFacts)
            .map((k) => k.word)
            .join(", ")}
        </p>
      ) : null}
    </section>
  );
}

function AtsPanel({ check }: { check: AtsCheck }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold">ATS check</h2>
        <span
          className={cn(
            "rounded-full border px-2.5 py-0.5 text-xs font-medium",
            check.keywordPct >= 80 ? STATUS_STYLE.covered : check.keywordPct >= 60 ? STATUS_STYLE.partial : STATUS_STYLE.gap,
          )}
        >
          {check.keywordPct}% of your backed JD keywords appear
        </span>
      </div>
      {check.missing.length ? (
        <p className="mt-2 text-xs text-muted-foreground">
          You have facts for these, but no visible line mentions them: {check.missing.join(", ")}
        </p>
      ) : null}
      {check.warnings.length ? (
        <ul className="mt-3 space-y-1">
          {check.warnings.map((warning) => (
            <li
              key={warning.message}
              className={cn(
                "text-xs",
                warning.level === "error" ? "text-red-600 dark:text-red-400" : "text-amber-700 dark:text-amber-300",
              )}
            >
              {warning.level === "error" ? "Error: " : "Check: "}
              {warning.message}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-xs text-emerald-700 dark:text-emerald-300">No structure warnings.</p>
      )}
      <details className="mt-3">
        <summary className="cursor-pointer text-xs font-medium text-primary">
          Plain text a parser reads
        </summary>
        <pre className="mt-2 max-h-96 overflow-auto rounded-lg border border-border bg-background p-3 text-[11px] leading-5 whitespace-pre-wrap">
          {check.text}
        </pre>
      </details>
    </section>
  );
}

function QualityPanel() {
  const results = useMemo(() => lintBullets(), []);
  return (
    <details className="rounded-2xl border border-border bg-card p-5">
      <summary className="cursor-pointer text-sm font-semibold">
        Bullet quality ({results.length} stored bullet{results.length === 1 ? "" : "s"} to improve)
      </summary>
      <p className="mt-2 text-xs text-muted-foreground">
        Fix the wording in the named file; the public site and every future resume pick it up. Add
        per-role phrasings in src/lib/resume/variants.ts.
      </p>
      <ul className="mt-3 space-y-2">
        {results.map((result) => (
          <li key={result.id} className="text-sm">
            <p>{result.text}</p>
            <div className="mt-0.5 flex flex-wrap items-center gap-1 text-[10px] text-muted-foreground">
              {result.id} · {result.source}
              {result.issues.map((issue) => (
                <span key={issue} className={cn("rounded-full border px-1.5 py-0.5", STATUS_STYLE.partial)}>
                  {LINT_LABEL[issue]}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </details>
  );
}

function HistoryPanel({
  history,
  currentId,
  onOpen,
  onDuplicate,
  onDelete,
  onBackup,
  onRestore,
}: {
  history: SavedResume[];
  currentId: string | null;
  onOpen: (resume: SavedResume) => void;
  onDuplicate: (resume: SavedResume) => void;
  onDelete: (resume: SavedResume) => void;
  onBackup: () => void;
  onRestore: (file: File) => void;
}) {
  return (
    <details className="rounded-2xl border border-border bg-card p-5" open={history.length > 0}>
      <summary className="cursor-pointer text-sm font-semibold">Saved resumes ({history.length})</summary>
      <p className="mt-2 text-xs text-muted-foreground">
        Stored only in this browser. Download a backup to keep them or move them to another browser.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onBackup}
          disabled={!history.length}
          className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium disabled:opacity-50"
        >
          Download backup
        </button>
        <label className="cursor-pointer rounded-lg border border-border px-3 py-1.5 text-xs font-medium">
          Import backup
          <input
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onRestore(file);
              event.target.value = "";
            }}
          />
        </label>
      </div>
      {history.length ? (
        <ul className="mt-3 divide-y divide-border">
          {history.map((resume) => (
            <li key={resume.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <div className="min-w-0">
                <p className="text-sm font-medium">
                  {resume.role || "Untitled role"}
                  {resume.company ? ` · ${resume.company}` : ""}
                  {resume.id === currentId ? <span className="ml-2 text-[10px] text-primary">open</span> : null}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Saved {new Date(resume.updatedAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-1.5">
                {(
                  [
                    ["Open", onOpen],
                    ["Duplicate", onDuplicate],
                    ["Delete", onDelete],
                  ] as const
                ).map(([label, action]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => action(resume)}
                    className="rounded-md border border-border px-2 py-1 text-[11px] hover:border-primary/50"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </details>
  );
}

type EntryList = "experience" | "projects";

function EntryEditor({
  entry,
  onChange,
  showEntryToggle,
}: {
  entry: ResumeEntry;
  onChange: (entry: ResumeEntry) => void;
  showEntryToggle: boolean;
}) {
  const move = (index: number, delta: number) => {
    const bullets = [...entry.bullets];
    const [item] = bullets.splice(index, 1);
    bullets.splice(index + delta, 0, item);
    onChange({ ...entry, bullets });
  };

  return (
    <div className={cn("rounded-xl border border-border/80 p-3", entry.hidden && "opacity-50")}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold">{entry.heading}</p>
          <p className="text-xs text-muted-foreground">
            {entry.subheading}
            {entry.dates ? ` · ${entry.dates}` : ""}
          </p>
        </div>
        {showEntryToggle ? (
          <button
            type="button"
            onClick={() => onChange({ ...entry, hidden: !entry.hidden })}
            className="shrink-0 rounded-md border border-border px-2 py-1 text-[11px]"
          >
            {entry.hidden ? "Include" : "Exclude"}
          </button>
        ) : null}
      </div>
      <ul className="mt-2 space-y-1.5">
        {entry.bullets.map((b, index) => {
          const issues = checkLine(b.text, b.originalText, b.factIds);
          return (
            <li key={b.key} className={cn("flex items-start gap-1.5", b.hidden && "opacity-45")}>
              <button
                type="button"
                aria-label={b.hidden ? "Show bullet" : "Hide bullet"}
                onClick={() => {
                  const bullets = entry.bullets.map((x) => (x.key === b.key ? { ...x, hidden: !x.hidden } : x));
                  onChange({ ...entry, bullets });
                }}
                className="mt-1 text-muted-foreground hover:text-primary"
              >
                {b.hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
              <div className="min-w-0 flex-1">
                <textarea
                  value={b.text}
                  rows={1}
                  onChange={(event) => {
                    const bullets = entry.bullets.map((x) =>
                      x.key === b.key ? { ...x, text: event.target.value } : x,
                    );
                    onChange({ ...entry, bullets });
                  }}
                  className="w-full resize-none rounded-md border border-transparent bg-transparent px-1 text-sm leading-6 outline-none [field-sizing:content] hover:border-border focus:border-primary"
                />
                <div className="flex flex-wrap items-center gap-1 px-1">
                  <span className="text-[10px] text-muted-foreground" title="Source fact">
                    {b.factIds.join(", ")} · score {b.score}
                  </span>
                  <IssueBadges issues={issues} />
                  {issues.includes("edited") ? (
                    <button
                      type="button"
                      onClick={() => {
                        const bullets = entry.bullets.map((x) =>
                          x.key === b.key ? { ...x, text: x.originalText } : x,
                        );
                        onChange({ ...entry, bullets });
                      }}
                      className="text-[10px] text-primary underline"
                    >
                      restore
                    </button>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col">
                <button
                  type="button"
                  aria-label="Move up"
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  className="text-muted-foreground disabled:opacity-30"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Move down"
                  disabled={index === entry.bullets.length - 1}
                  onClick={() => move(index, 1)}
                  className="text-muted-foreground disabled:opacity-30"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ResumeStudio() {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState<{ jd: JdAnalysis; report: MatchReport } | null>(null);
  const [model, setModel] = useState<ResumeModel | null>(null);
  const [exporting, setExporting] = useState<"pdf" | "docx" | null>(null);
  const [fitting, setFitting] = useState(false);
  const [rendered, setRendered] = useState<{ model: ResumeModel; pages: number } | null>(null);
  const [history, setHistory] = useState<SavedResume[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const refreshHistory = () => listResumes().then(setHistory, () => setHistory([]));
  useEffect(() => {
    listResumes().then(setHistory, () => setHistory([]));
  }, []);

  const estimate = useMemo(() => (model ? estimatePages(model) : 0), [model]);
  const renderedPages = rendered && rendered.model === model ? rendered.pages : null;
  const pages = renderedPages ?? estimate;
  const ats = useMemo(() => (model && result ? atsCheck(model, result.report) : null), [model, result]);
  const summaryIssues = model ? checkLine(model.summary.text, model.summary.originalText, model.summary.factIds) : [];
  const flagged = model
    ? [...model.experience, ...model.projects]
        .filter((entry) => !entry.hidden)
        .flatMap((entry) => entry.bullets.filter((b) => !b.hidden))
        .filter((b) => checkLine(b.text, b.originalText, b.factIds).some((issue) => issue !== "edited"))
        .length + (summaryIssues.some((issue) => issue !== "edited") ? 1 : 0)
    : 0;

  const analyze = () => {
    const jd = analyzeJobDescription(jdText);
    const report = buildMatchReport(jd);
    setResult({ jd, report });
    setModel(buildResume(jd, report, { role, company }));
    setCurrentId(null);
    setSavedAt(null);
  };

  const save = async () => {
    if (!model) return;
    const existing = history.find((entry) => entry.id === currentId);
    const record = await saveResume({
      id: existing?.id,
      createdAt: existing?.createdAt,
      role,
      company,
      jdText,
      model: { ...model, targetRole: role, company },
    });
    setCurrentId(record.id);
    setSavedAt(record.updatedAt);
    await refreshHistory();
  };

  const open = (saved: SavedResume) => {
    const jd = analyzeJobDescription(saved.jdText);
    setRole(saved.role);
    setCompany(saved.company);
    setJdText(saved.jdText);
    setResult({ jd, report: buildMatchReport(jd) });
    setModel(saved.model);
    setCurrentId(saved.id);
    setSavedAt(saved.updatedAt);
  };

  const duplicate = async (saved: SavedResume) => {
    await saveResume({ role: saved.role, company: `${saved.company} (copy)`.trim(), jdText: saved.jdText, model: saved.model });
    await refreshHistory();
  };

  const remove = async (saved: SavedResume) => {
    if (!window.confirm(`Delete the saved resume for ${saved.role || "this role"}? This can't be undone.`)) return;
    await deleteResume(saved.id);
    if (saved.id === currentId) setCurrentId(null);
    await refreshHistory();
  };

  const backup = async () => {
    download(await exportBackup(), `resume-studio-backup-${new Date().toISOString().slice(0, 10)}.json`);
  };

  const restore = async (file: File) => {
    try {
      const count = await importBackup(file);
      await refreshHistory();
      window.alert(`Imported ${count} saved resume${count === 1 ? "" : "s"}.`);
    } catch {
      window.alert("That file isn't a resume studio backup.");
    }
  };

  const updateEntry = (list: EntryList, updated: ResumeEntry) => {
    setModel((current) =>
      current
        ? { ...current, [list]: current[list].map((entry) => (entry.id === updated.id ? updated : entry)) }
        : current,
    );
  };

  const fitToOnePage = async () => {
    if (!model) return;
    setFitting(true);
    try {
      const { fitToOnePage: fit } = await import("@/lib/resume/export/pdf");
      const result = await fit(model, trimOnce);
      setModel(result.model);
      setRendered(result);
    } finally {
      setFitting(false);
    }
  };

  const exportAs = async (kind: "pdf" | "docx") => {
    if (!model) return;
    if (flagged && !window.confirm(`${flagged} line(s) have numbers that are not in their source fact. Export anyway?`)) {
      return;
    }
    setExporting(kind);
    try {
      const resume = { ...model, targetRole: role, company };
      const blob =
        kind === "pdf"
          ? await (await import("@/lib/resume/export/pdf")).renderResumePdf(resume)
          : await (await import("@/lib/resume/export/docx")).renderResumeDocx(resume);
      download(blob, resumeFileName(resume, kind));
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs text-muted-foreground">
            Role title
            <input
              value={role}
              onChange={(event) => setRole(event.target.value)}
              placeholder="e.g. Backend Engineer"
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            />
          </label>
          <label className="text-xs text-muted-foreground">
            Company
            <input
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder="e.g. Acme"
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            />
          </label>
        </div>
        <label className="mt-3 block text-xs text-muted-foreground">
          Job description ({jdText.length.toLocaleString()} / {MAX_JD_LENGTH.toLocaleString()})
          <textarea
            value={jdText}
            maxLength={MAX_JD_LENGTH}
            onChange={(event) => setJdText(event.target.value)}
            rows={10}
            placeholder="Paste the full job description"
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm leading-6 text-foreground outline-none focus:border-primary"
          />
        </label>
        <button
          type="button"
          onClick={analyze}
          disabled={jdText.trim().length < 40}
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          <Wand2 className="h-4 w-4" /> {model ? "Rebuild from JD" : "Build resume"}
        </button>
        {model ? (
          <span className="ml-3 text-[11px] text-muted-foreground">Rebuilding discards your edits.</span>
        ) : null}
      </section>

      <HistoryPanel
        history={history}
        currentId={currentId}
        onOpen={open}
        onDuplicate={duplicate}
        onDelete={remove}
        onBackup={backup}
        onRestore={restore}
      />
      <QualityPanel />

      {result && model ? (
        <>
          <MatchPanel jd={result.jd} report={result.report} />

          <section className="sticky top-2 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/95 p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "rounded-full border px-2.5 py-1 text-xs font-medium",
                  pages <= 1 ? STATUS_STYLE.covered : pages <= 1.15 ? STATUS_STYLE.partial : STATUS_STYLE.gap,
                )}
              >
                {renderedPages !== null
                  ? `${renderedPages} page${renderedPages === 1 ? "" : "s"} (rendered)`
                  : `≈ ${estimate.toFixed(2)} pages`}
              </span>
              <button
                type="button"
                disabled={fitting}
                onClick={fitToOnePage}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:border-primary/50 disabled:opacity-60"
              >
                {fitting ? "Fitting…" : "Fit to 1 page"}
              </button>
              {flagged ? <span className="text-xs text-red-600 dark:text-red-400">{flagged} line(s) need a look</span> : null}
            </div>
            <div className="flex items-center gap-2">
              {savedAt ? (
                <span className="text-[11px] text-muted-foreground">
                  Saved {new Date(savedAt).toLocaleTimeString()}
                </span>
              ) : null}
              <button
                type="button"
                onClick={save}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:border-primary/50"
              >
                <Save className="h-3.5 w-3.5" />
                {currentId ? "Save changes" : "Save"}
              </button>
              {(["pdf", "docx"] as const).map((kind) => (
                <button
                  key={kind}
                  type="button"
                  disabled={exporting !== null}
                  onClick={() => exportAs(kind)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground disabled:opacity-60"
                >
                  <Download className="h-3.5 w-3.5" />
                  {exporting === kind ? "Building…" : kind.toUpperCase()}
                </button>
              ))}
            </div>
          </section>

          {ats ? <AtsPanel check={ats} /> : null}

          <section className="space-y-3 rounded-2xl border border-border bg-card p-5">
            <h2 className="text-sm font-semibold">Summary</h2>
            <textarea
              value={model.summary.text}
              rows={4}
              onChange={(event) =>
                setModel({ ...model, summary: { ...model.summary, text: event.target.value } })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm leading-6 outline-none focus:border-primary"
            />
            <div className="flex flex-wrap items-center gap-1 text-[10px] text-muted-foreground">
              Sources: {model.summary.factIds.join(", ")} <IssueBadges issues={summaryIssues} />
            </div>

            <h2 className="pt-2 text-sm font-semibold">Skills</h2>
            <ul className="space-y-1 text-sm">
              {model.skills.map((group) => (
                <li key={group.title}>
                  <span className="font-medium">{group.title}:</span> {group.items.join(", ")}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3 rounded-2xl border border-border bg-card p-5">
            <h2 className="text-sm font-semibold">Experience</h2>
            {model.experience.map((entry) => (
              <EntryEditor
                key={entry.id}
                entry={entry}
                showEntryToggle={false}
                onChange={(updated) => updateEntry("experience", updated)}
              />
            ))}
          </section>

          <section className="space-y-3 rounded-2xl border border-border bg-card p-5">
            <h2 className="text-sm font-semibold">Projects</h2>
            {model.projects.map((entry) => (
              <EntryEditor
                key={entry.id}
                entry={entry}
                showEntryToggle
                onChange={(updated) => updateEntry("projects", updated)}
              />
            ))}
          </section>

          <section className="space-y-2 rounded-2xl border border-border bg-card p-5">
            <h2 className="text-sm font-semibold">Education and certifications</h2>
            {model.education.map((school) => (
              <p key={school.id} className="text-sm">
                <span className="font-medium">{school.heading}</span> — {school.subheading}, {school.dates} ·{" "}
                {school.detail}
              </p>
            ))}
            <ul className="space-y-1 pt-1">
              {model.certifications.map((cert) => (
                <li key={cert.id} className={cn("flex items-center gap-2 text-sm", cert.hidden && "opacity-45")}>
                  <button
                    type="button"
                    aria-label={cert.hidden ? "Show certification" : "Hide certification"}
                    onClick={() =>
                      setModel({
                        ...model,
                        certifications: model.certifications.map((c) =>
                          c.id === cert.id ? { ...c, hidden: !c.hidden } : c,
                        ),
                      })
                    }
                    className="text-muted-foreground hover:text-primary"
                  >
                    {cert.hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                  {cert.text}
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : null}
    </div>
  );
}
