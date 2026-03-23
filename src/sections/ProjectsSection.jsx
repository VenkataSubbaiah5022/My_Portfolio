import SectionShell from "../components/SectionShell";
import SpotlightCard from "../components/SpotlightCard";

const projects = [
  {
    title: "Real-Time Alerting Module (IoT)",
    stack: "Node.js · MongoDB · Trigger Workflows",
    description:
      "Designed and implemented threshold-based alerting for temperature breaches with notification triggers that supported a 70% reduction in system downtime."
  },
  {
    title: "AI-Based Voice Assistant",
    stack: "Python · NLP · Speech Pipeline",
    description:
      "Built an NLP voice assistant with speech recognition and text-to-speech, integrated with Gmail, WhatsApp, YouTube, and weather APIs for voice-driven automation."
  },
  {
    title: "Task Management System",
    stack: "Node.js · Express.js · React.js · MongoDB · JWT",
    description:
      "Developed a full stack task workflow platform with authentication, deadlines, and REST APIs to manage user activity and execution visibility."
  }
];

export default function ProjectsSection() {
  return (
    <SectionShell id="projects" eyebrow="Projects" title="Selected work">
      <div className="card-grid">
        {projects.map((project) => (
          <SpotlightCard key={project.title}>
            <article className="content-card">
              <h3>{project.title}</h3>
              <p className="content-card__meta">{project.stack}</p>
              <p>{project.description}</p>
            </article>
          </SpotlightCard>
        ))}
      </div>
    </SectionShell>
  );
}
