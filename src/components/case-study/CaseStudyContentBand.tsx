import { cn } from "@/lib/utils";

type CaseStudyContentBandProps = {
  tinted?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function CaseStudyContentBand({
  tinted = false,
  children,
  className,
}: CaseStudyContentBandProps) {
  return (
    <div
      className={cn(
        "relative -mx-4 px-4 py-10 md:-mx-6 md:px-6 md:py-12",
        tinted && "bg-[var(--section-tint)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
