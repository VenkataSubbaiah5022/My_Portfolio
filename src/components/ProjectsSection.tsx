"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";

const projects = [
  {
    title: "Jarvis: AI-Powered Voice Genie",
    thumbnail: "from-indigo-500/35 to-fuchsia-500/20",
    description:
      "NLP-based voice assistant with speech recognition, text-to-speech, and Gmail/WhatsApp/YouTube/Weather automation.",
    live: null,
    code: "https://github.com/VenkataSubbaiah5022/AI-Powered-Voice-Genie",
  },
  {
    title: "Task Management System",
    thumbnail: "from-emerald-500/35 to-cyan-500/20",
    description:
      "MERN Kanban app with JWT auth, drag-and-drop workflows, WebSocket activity feeds, and 99.9% uptime on GCP Cloud Run.",
    live: null,
    code: "https://github.com/VenkataSubbaiah5022/Task-Management-System",
  },
  {
    title: "Real-Time Chat Application",
    thumbnail: "from-blue-500/35 to-violet-500/20",
    description:
      "Socket.io based chat supporting group/private messaging and typing indicators, optimized for 10,000+ messages.",
    live: null,
    code: "https://github.com/VenkataSubbaiah5022/Real-Time-Chat-Application",
  },
  {
    title: "Timesheet Management System",
    thumbnail: "from-amber-500/35 to-orange-500/20",
    description:
      "Role-based timesheet platform with employee-manager approval workflow, interactive productivity dashboards, REST API sync, validation/error handling, and scalable reusable React components.",
    live: "https://timesheet-management-system-sage.vercel.app/",
    code: "https://github.com/VenkataSubbaiah5022/Timesheet-Management-System",
  },
  {
    title: "InterviewOS",
    thumbnail: "from-rose-500/35 to-indigo-500/20",
    description:
      "AI-powered career management system to track applications, analyze interview performance, identify weak technical areas, optimize ATS resumes, and monitor job-search analytics.",
    live: null,
    code: "https://github.com/VenkataSubbaiah5022/InterviewOS",
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
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>
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
