import { useEffect, useMemo, useState } from "react";

const sectionLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Side Tracks", href: "#sidetracks", id: "sidetracks" },
  { label: "Impact", href: "#impact", id: "impact" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Contact", href: "#contact", id: "contact" }
];

export default function SectionRail() {
  const ids = useMemo(() => sectionLinks.map((s) => s.id), []);
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;

        const topMost = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        const id = topMost?.target?.id;
        if (!id) return;

        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => setActiveId(id));
      },
      {
        root: null,
        threshold: [0.25, 0.4, 0.55],
        rootMargin: "-20% 0px -55% 0px"
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [ids]);

  return (
    <nav className="section-rail" aria-label="Quick section navigation">
      {sectionLinks.map((item) => (
        <a
          key={item.label}
          href={item.href}
          title={item.label}
          aria-label={item.label}
          className={item.id === activeId ? "is-active" : undefined}
          aria-current={item.id === activeId ? "location" : undefined}
        >
          <span />
        </a>
      ))}
    </nav>
  );
}
