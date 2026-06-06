export function getScrollProgress() {
  const scrollTop = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;

  if (scrollable <= 0) {
    return 0;
  }

  return Math.min(1, Math.max(0, scrollTop / scrollable));
}
