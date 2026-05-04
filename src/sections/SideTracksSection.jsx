import SectionShell from "../components/SectionShell";
import GlassCard from "../components/GlassCard";

const sideTracks = [
  {
    title: "Open Source",
    subtitle: "Cal.com",
    description:
      "Actively exploring contributions to Cal.com and learning production-grade scheduling infrastructure in public.",
    ctaLabel: "View Cal.com",
    ctaHref: "https://github.com/calcom/cal.com",
    tags: ["TypeScript", "Next.js", "Prisma", "tRPC"]
  },
  {
    title: "Freelance · Upwork",
    subtitle: "Actively building freelance presence",
    description:
      "Worked with an enterprise client on prompt-engineering delivery and production-focused implementation work.",
    ctaLabel: "Hire me on Upwork",
    ctaHref: "https://www.upwork.com/freelancers/~017b9a8b315e94f07a?mp_source=share",
    tags: ["$300+ earned", "1 completed job", "$15/hr", "<30 hrs/week"]
  }
];

export default function SideTracksSection() {
  return (
    <SectionShell id="sidetracks" eyebrow="Side Tracks" title="Open source and freelance momentum">
      <div className="card-grid card-grid--two">
        {sideTracks.map((item) => (
          <GlassCard key={item.title}>
            <article className="content-card">
              <h3>{item.title}</h3>
              <p className="content-card__meta">{item.subtitle}</p>
              <p>{item.description}</p>
              <div className="project-links">
                <a href={item.ctaHref} target="_blank" rel="noreferrer">
                  {item.ctaLabel}
                </a>
              </div>
              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </GlassCard>
        ))}
      </div>
    </SectionShell>
  );
}
