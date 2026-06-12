import Image from "next/image";
import { ArchitectureLayers } from "@/components/architecture/ArchitectureLayers";
import type { SystemDesign } from "@/lib/system-design";

type ArchitectureDiagramProps = {
  design: SystemDesign;
};

export function ArchitectureDiagram({ design }: ArchitectureDiagramProps) {
  if (design.diagramType === "image" && design.imageSrc) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-white to-slate-50 p-3 shadow-inner dark:from-slate-950 dark:to-slate-900">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-white dark:bg-slate-950">
          <Image
            src={design.imageSrc}
            alt={design.imageAlt ?? design.title}
            fill
            className="object-contain object-center p-2"
            sizes="(max-width: 1024px) 100vw, 960px"
            priority
          />
        </div>
        <p className="mt-3 px-1 text-center text-xs text-muted-foreground">
          Production architecture diagram — anonymized platform overview
        </p>
      </div>
    );
  }

  if (design.layers?.length) {
    return <ArchitectureLayers layers={design.layers} />;
  }

  return null;
}
