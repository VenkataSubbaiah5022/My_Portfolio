const sectionLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

export default function SectionRail() {
  return (
    <nav className="section-rail" aria-label="Quick section navigation">
      {sectionLinks.map((item) => (
        <a key={item.label} href={item.href} title={item.label} aria-label={item.label}>
          <span />
        </a>
      ))}
    </nav>
  );
}
