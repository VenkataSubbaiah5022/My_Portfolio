"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type ProjectImageGalleryProps = {
  images: string[];
  title: string;
  thumbnail: string;
};

export function ProjectImageGallery({
  images,
  title,
  thumbnail,
}: ProjectImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const [failedPaths, setFailedPaths] = useState<string[]>([]);

  const availableImages = useMemo(
    () => images.filter((path) => !failedPaths.includes(path)),
    [failedPaths, images],
  );

  const safeIndex =
    availableImages.length > 0 ? Math.min(index, availableImages.length - 1) : 0;
  const currentImage = availableImages[safeIndex];

  if (availableImages.length === 0) {
    return (
      <div
        className={`mb-4 flex aspect-video items-end rounded-xl border border-white/10 bg-gradient-to-br ${thumbnail} p-3`}
      >
        <p className="text-xs font-medium text-white/90">{title}</p>
      </div>
    );
  }

  const hasMultiple = availableImages.length > 1;

  function showPrevious() {
    setIndex((prev) => (prev === 0 ? availableImages.length - 1 : prev - 1));
  }

  function showNext() {
    setIndex((prev) => (prev === availableImages.length - 1 ? 0 : prev + 1));
  }

  return (
    <div className="group/gallery relative mb-4 aspect-video overflow-hidden rounded-xl border border-white/10 bg-muted/20">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage}
            alt={`${title} screenshot ${safeIndex + 1}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            onError={() =>
              setFailedPaths((prev) =>
                prev.includes(currentImage) ? prev : [...prev, currentImage],
              )
            }
          />
        </motion.div>
      </AnimatePresence>

      {hasMultiple ? (
        <>
          <button
            type="button"
            onClick={showPrevious}
            className="absolute top-1/2 left-2 z-10 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white opacity-100 backdrop-blur transition hover:bg-black/60 sm:opacity-0 sm:group-hover/gallery:opacity-100"
            aria-label={`Previous ${title} screenshot`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={showNext}
            className="absolute top-1/2 right-2 z-10 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white opacity-100 backdrop-blur transition hover:bg-black/60 sm:opacity-0 sm:group-hover/gallery:opacity-100"
            aria-label={`Next ${title} screenshot`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {availableImages.map((image, dotIndex) => (
              <button
                key={image}
                type="button"
                onClick={() => setIndex(dotIndex)}
                className={`h-1.5 rounded-full transition ${
                  dotIndex === safeIndex
                    ? "w-4 bg-white"
                    : "w-1.5 bg-white/45 hover:bg-white/70"
                }`}
                aria-label={`Show ${title} screenshot ${dotIndex + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
