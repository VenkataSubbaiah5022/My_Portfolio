"use client";

import { useState } from "react";
import { BriefcaseBusiness, ChevronUp, Download, ExternalLink, Mail } from "lucide-react";

export function QuickActionsFab() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="fixed right-4 bottom-4 z-50 hidden flex-col gap-2 md:flex">
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs shadow-lg backdrop-blur transition hover:border-primary/50"
        >
          <Download className="h-3.5 w-3.5" />
          Resume
        </a>
        <a
          href="mailto:venkatasubbaiah5022@gmail.com"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs shadow-lg backdrop-blur transition hover:border-primary/50"
        >
          <Mail className="h-3.5 w-3.5" />
          Quick Email
        </a>
        <a
          href="https://www.upwork.com/freelancers/~017b9a8b315e94f07a?mp_source=share"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs shadow-lg backdrop-blur transition hover:border-primary/50"
        >
          <BriefcaseBusiness className="h-3.5 w-3.5" />
          Hire on Upwork
        </a>
        <a
          href="https://github.com/VenkataSubbaiah5022"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs shadow-lg backdrop-blur transition hover:border-primary/50"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          More Projects
        </a>
      </div>

      <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2 md:hidden">
        {expanded && (
          <>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs shadow-lg backdrop-blur"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
            <a
              href="mailto:venkatasubbaiah5022@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs shadow-lg backdrop-blur"
            >
              <Mail className="h-3.5 w-3.5" />
              Email
            </a>
            <a
              href="https://www.upwork.com/freelancers/~017b9a8b315e94f07a?mp_source=share"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs shadow-lg backdrop-blur"
            >
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              Upwork
            </a>
          </>
        )}
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-xs font-medium text-primary-foreground shadow-xl"
          aria-label="Toggle quick actions"
        >
          <ChevronUp
            className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-0" : "rotate-180"}`}
          />
          Quick Actions
        </button>
      </div>
    </>
  );
}
