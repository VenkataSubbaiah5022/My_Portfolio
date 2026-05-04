import SectionShell from "../components/SectionShell";
import SpotlightCard from "../components/SpotlightCard";

const projects = [
  {
    title: "Timesheet Management System",
    status: "Live",
    stack: "React · TypeScript · Zustand · TanStack Query · TanStack Table · Recharts",
    description:
      "Role-based timesheet and payroll platform with admin and employee workflows, KPI charts, attendance handling, and CSV/PDF report exports.",
    links: [
      { label: "GitHub", href: "https://github.com/VenkataSubbaiah5022/Timesheet-Management-System" },
      { label: "Live Demo", href: "https://timesheet-management-system-sage.vercel.app/" }
    ]
  },
  {
    title: "Real-Time Chat Application",
    status: "Code Available",
    stack: "MongoDB · Express.js · React.js · Node.js · Socket.io",
    description:
      "Socket.io based chat app with group and private rooms, typing indicators, and low-latency message handling tuned for real-time delivery.",
    links: [
      { label: "GitHub", href: "https://github.com/VenkataSubbaiah5022/Real-Time-Chat-Application" }
    ]
  },
  {
    title: "Task Management System",
    status: "Code Available",
    stack: "MongoDB · Express.js · React.js · Node.js · JWT",
    description:
      "Kanban style task system with authentication, real-time updates through WebSockets, and structured REST APIs for team workflows.",
    links: [{ label: "GitHub", href: "https://github.com/VenkataSubbaiah5022/Task-Management-System" }]
  },
  {
    title: "AI-Based Voice Assistant",
    status: "Demo on Request",
    stack: "Python · NLP · Speech Recognition",
    description:
      "NLP-powered assistant integrated with Gmail, WhatsApp, and YouTube APIs, backed by published research work on practical voice automation.",
    links: [{ label: "GitHub", href: "https://github.com/VenkataSubbaiah5022/ai-voice-assistant" }]
  },
];

export default function ProjectsSection() {
  return (
    <SectionShell id="projects" eyebrow="Projects" title="Selected work">
      <div className="card-grid">
        {projects.map((project) => (
          <SpotlightCard key={project.title}>
            <article className="content-card">
              {project.status ? <span className="project-status">{project.status}</span> : null}
              <h3>{project.title}</h3>
              <p className="content-card__meta">{project.stack}</p>
              <p>{project.description}</p>
              <div className="project-links">
                {project.links.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
              {project.status === "Code Available" ? <p className="project-note">Live demo coming soon</p> : null}
              {project.status === "Demo on Request" ? <p className="project-note">Demo available on request</p> : null}
            </article>
          </SpotlightCard>
        ))}
      </div>
    </SectionShell>
  );
}
