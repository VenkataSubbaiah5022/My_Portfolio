export type Project = {
  title: string;
  thumbnail: string;
  problem: string;
  highlights: string[];
  metrics: string[];
  stack: string[];
  live: string | null;
  code: string;
  featured: boolean;
};

export const projects: Project[] = [
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
    featured: true,
  },
  {
    title: "Flowboard",
    thumbnail: "from-emerald-500/35 to-cyan-500/20",
    problem:
      "Teams needed a shared Kanban workspace with role-based access, live board updates, and a fluid drag-and-drop workflow.",
    highlights: [
      "JWT sessions with Owner, Admin, Member, and Viewer permissions",
      "dnd-kit Kanban with optimistic updates and activity feeds",
      "Pusher channels for instant sync across teammates",
    ],
    metrics: ["Turborepo monorepo", "Public demo board", "Deployed on Vercel"],
    stack: ["Next.js", "TypeScript", "Prisma", "Pusher"],
    live: "https://flowboard-system.vercel.app/",
    code: "https://github.com/VenkataSubbaiah5022/Task-Management-System",
    featured: true,
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
    live: "https://ai-voice-genie.vercel.app/",
    code: "https://github.com/VenkataSubbaiah5022/AI-Powered-Voice-Genie",
    featured: true,
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
    featured: false,
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
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const liveProjectCount = projects.filter((project) => project.live).length;
