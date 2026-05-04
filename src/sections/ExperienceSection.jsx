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
    company: "Chegg India",
    role: "Computer Science Subject Expert (Freelance)",
    period: "Sep 2023 - Mar 2026",
    details: [
      "Solved complex problems in DSA, Java, Python, SQL, and DBMS with high-accuracy delivery under strict deadlines.",
      "Provided clear, step-by-step explanations to global learners and strengthened analytical communication.",
      "Built consistency in problem solving and technical mentoring while balancing concurrent engineering work."
    ]
  },
  {
    company: "R K Microns",
    role: "Backend Developer",
    period: "May 2024 - Oct 2024",
    details: [
      "Built defect-detection backend services and data contracts that replaced manual inspection workflows.",
      "Improved defect detection accuracy by 35% and reduced manual QA effort by nearly 2 hours per operator per day.",
      "Containerized services with Docker to improve deployment reliability and reproducibility."
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
