import SectionShell from "../components/SectionShell";
import GlassCard from "../components/GlassCard";

const experiences = [
  {
    company: "Stratosfy",
    role: "Full Stack Developer",
    period: "Nov 2024 - Mar 2026",
    details: [
      "Owned end-to-end development of an enterprise IoT monitoring platform with React.js, Node.js (TypeScript), Python, and MongoDB.",
      "Designed and deployed 19+ microservices on GCP using Docker and developed 20+ REST APIs for real-time processing.",
      "Optimized MongoDB aggregation pipelines for sub-100ms responses and helped reduce downtime by 70%."
    ]
  },
  {
    company: "R K Microns",
    role: "Mobile Application Development Intern",
    period: "May 2024 - Oct 2024",
    details: [
      "Built a Flutter-based defect detection app for 3D printing workflows using image processing.",
      "Improved defect detection accuracy by 35% through analytics dashboards and iterative testing."
    ]
  }
];

export default function ExperienceSection() {
  return (
    <SectionShell id="experience" eyebrow="Experience" title="Professional journey">
      <div className="timeline">
        {experiences.map((exp) => (
          <GlassCard key={exp.company}>
            <article className="timeline-card">
              <p className="timeline-card__period">{exp.period}</p>
              <h3>{exp.company}</h3>
              <p className="timeline-card__role">{exp.role}</p>
              <ul>
                {exp.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          </GlassCard>
        ))}
      </div>
    </SectionShell>
  );
}
