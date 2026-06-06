import type Lenis from "lenis";

/** Clears sticky navbar when scrolling to in-page sections. */
export const HASH_SCROLL_OFFSET = -120;

type ScrollOptions = {
  lenis?: Lenis | null;
  offset?: number;
  duration?: number;
};

export function scrollToTop({ lenis, duration = 1.1 }: ScrollOptions = {}) {
  if (lenis) {
    lenis.scrollTo(0, { duration });
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function scrollToHash(
  hash: string,
  { lenis, offset = HASH_SCROLL_OFFSET, duration = 1.15 }: ScrollOptions = {},
) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { offset, duration });
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}
