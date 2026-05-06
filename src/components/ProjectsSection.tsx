"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";

const projects = [
  {
    title: "Timesheet Management System",
    thumbnail: "from-amber-500/35 to-orange-500/20",
    problem:
      "Teams needed a clear role-based workflow for daily time tracking, approvals, and utilization visibility.",
    highlights: [
      "Employee -> Manager submission and approval flow",
      "Interactive productivity dashboards and reporting",
      "Reusable React components with typed contracts",
    ],
    metrics: ["Role-based workflows", "Real-time API synchronization", "CSV/PDF reporting"],
    stack: ["React", "TypeScript", "Tailwind", "REST APIs"],
    live: "https://timesheet-management-system-sage.vercel.app/",
    code: "https://github.com/VenkataSubbaiah5022/Timesheet-Management-System",
  },
  {
    title: "InterviewOS",
    thumbnail: "from-rose-500/35 to-indigo-500/20",
    problem:
      "Job seekers struggle to track applications, interview outcomes, and resume quality in one place.",
    highlights: [
      "Application tracking across portals",
      "Interview analytics and weak-area detection",
      "ATS-focused resume optimization workflow",
    ],
    metrics: ["Product-style dashboard", "AI-powered planning", "Career analytics focus"],
    stack: ["Full Stack", "Dashboard UX", "AI Workflows"],
    live: null,
    code: "https://github.com/VenkataSubbaiah5022/InterviewOS",
  },
  {
    title: "Jarvis AI Assistant",
    thumbnail: "from-indigo-500/35 to-fuchsia-500/20",
    problem:
      "Users needed a hands-free assistant to automate routine digital tasks with voice commands.",
    highlights: [
      "Speech recognition and command routing pipeline",
      "NLP processing + voice response generation",
      "Automation integrations (Gmail, WhatsApp, YouTube, Weather)",
    ],
    metrics: ["Published on Zenodo", "Voice-first automation", "Multi-service integrations"],
    stack: ["Python", "NLP", "Speech Recognition", "Text-to-Speech"],
    live: null,
    code: "https://github.com/VenkataSubbaiah5022/AI-Powered-Voice-Genie",
  },
  {
    title: "Real-Time Chat Application",
    thumbnail: "from-blue-500/35 to-violet-500/20",
    problem:
      "Need for low-latency messaging with reliable persistence and realtime collaboration behavior.",
    highlights: [
      "Socket.io rooms for group/private messaging",
      "Typing indicators and reconnect-aware flows",
      "Cursor-based pagination for message history",
    ],
    metrics: ["10K+ messages handled", "Sub-50ms delivery path", "Responsive UI deployment"],
    stack: ["MERN", "Socket.io", "MongoDB", "AWS EC2"],
    live: null,
    code: "https://github.com/VenkataSubbaiah5022/Real-Time-Chat-Application",
  },
  {
    title: "Task Management System",
    thumbnail: "from-emerald-500/35 to-cyan-500/20",
    problem:
      "Project teams required a collaborative Kanban tool with secure authentication and realtime updates.",
    highlights: [
      "JWT auth + role-aware task operations",
      "Drag-and-drop Kanban with activity feeds",
      "WebSocket synchronization across clients",
    ],
    metrics: ["99.9% uptime on GCP", "10+ production APIs", "Dockerized deployment"],
    stack: ["MERN", "WebSockets", "Docker", "GCP Cloud Run"],
    live: null,
    code: "https://github.com/VenkataSubbaiah5022/Task-Management-System",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
      <h2 className="mb-6 text-2xl font-semibold md:mb-8 md:text-3xl">Projects</h2>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, idx) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-lg md:p-5"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.24),transparent_55%)]" />
            <div
              className={`mb-4 flex aspect-video items-end rounded-xl border border-white/10 bg-gradient-to-br ${project.thumbnail} p-3`}
            >
              <p className="text-xs font-medium text-white/90">{project.title}</p>
            </div>
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.problem}</p>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              {project.highlights.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border px-2 py-1 text-[10px] text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.metrics.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-primary/10 px-2 py-1 text-[10px] text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2">
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs transition hover:border-primary/50"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Live
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground">
                  <ExternalLink className="h-3.5 w-3.5" /> Live coming soon
                </span>
              )}
              <a
                href={project.code}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs transition hover:border-primary/50"
              >
                <GitBranch className="h-3.5 w-3.5" /> Code
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
