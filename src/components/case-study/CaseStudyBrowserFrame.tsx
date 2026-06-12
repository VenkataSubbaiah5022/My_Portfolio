import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CaseStudyBrowserFrameProps = {
  title: string;
  url?: string | null;
  accentBorder?: string;
  children: ReactNode;
};

export function CaseStudyBrowserFrame({
  title,
  url,
  accentBorder = "border-border",
  children,
}: CaseStudyBrowserFrameProps) {
  const displayUrl =
    url?.replace(/^https?:\/\//, "") ?? `${title.toLowerCase().replace(/\s+/g, "-")}.app`;

  return (
    <div className={cn("overflow-hidden rounded-2xl border bg-card shadow-xl", accentBorder)}>
      <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/15" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border/80 bg-background/80 px-3 py-1.5">
          {url ? <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" /> : null}
          <span className="truncate font-mono text-[11px] text-muted-foreground">{displayUrl}</span>
        </div>
      </div>
      <div className="bg-background p-2 md:p-3">{children}</div>
    </div>
  );
}
