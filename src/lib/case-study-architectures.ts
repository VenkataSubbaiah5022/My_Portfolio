import type { SystemDesign } from "@/lib/system-design";

/** Inline architecture diagrams for case study pages — not listed under /system-design */
const caseStudyArchitectures: Record<string, SystemDesign> = {
  "talentvault-ai-architecture": {
    slug: "talentvault-ai-architecture",
    title: "TalentVault AI Architecture",
    subtitle: "AI resume vault · Next.js · Supabase · Gemini",
    category: "product",
    relatedProjectSlug: "talentvault-ai",
    diagramType: "layers",
    layers: [
      {
        id: "client",
        title: "Recruiter Dashboard",
        subtitle: "Upload, search, filter, and profile views",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        id: "api",
        title: "API & Server Actions",
        subtitle: "Auth, upload orchestration, search endpoints",
        technologies: ["Next.js API Routes", "Supabase Auth"],
      },
      {
        id: "ai",
        title: "AI Extraction Layer",
        subtitle: "PII scrub → structured parse → validation",
        technologies: ["Google Gemini", "PDF/DOCX parsing"],
      },
      {
        id: "data",
        title: "Supabase Data Layer",
        subtitle: "Candidates, documents, embeddings metadata",
        technologies: ["PostgreSQL", "Supabase Storage", "Row Level Security"],
      },
    ],
    overview:
      "Recruiters upload resumes in bulk; the system scrubs PII before sending content to Gemini, extracts structured candidate fields, stores documents securely, and powers dashboard search with filters and natural language queries.",
    flowSummary: [
      "Recruiter uploads PDF/DOCX batches with live progress tracking",
      "Server strips contact PII before any AI processing",
      "Gemini extracts structured fields (skills, experience, education)",
      "Validated records persist in Supabase with document references",
      "Dashboard supports card/table views, filters, and NL search",
    ],
    highlights: [
      "PII-safe pipeline — contact details never reach the LLM",
      "Batch upload with per-file progress and error recovery",
      "Supabase RLS for multi-tenant data isolation",
      "Natural language search across structured candidate pools",
    ],
    challenges: [],
    metrics: ["Live on Vercel", "Multi-file batch upload", "NL search", "PII-safe AI"],
    lessonsLearned: [],
    stack: ["Next.js", "TypeScript", "Supabase", "Gemini", "Vercel"],
  },
  "flowboard-realtime-architecture": {
    slug: "flowboard-realtime-architecture",
    title: "Flowboard Real-Time Architecture",
    subtitle: "Kanban · JWT RBAC · Pusher sync",
    category: "product",
    relatedProjectSlug: "flowboard",
    diagramType: "layers",
    layers: [
      {
        id: "client",
        title: "Kanban Client",
        subtitle: "dnd-kit boards, optimistic drag-and-drop",
        technologies: ["Next.js", "React", "dnd-kit"],
      },
      {
        id: "api",
        title: "REST API Layer",
        subtitle: "Boards, cards, roles, activity feeds",
        technologies: ["Next.js API", "Prisma", "JWT"],
      },
      {
        id: "realtime",
        title: "Pusher Channels",
        subtitle: "Board-scoped events for instant sync",
        technologies: ["Pusher", "WebSockets"],
      },
      {
        id: "data",
        title: "PostgreSQL",
        subtitle: "Users, boards, columns, cards, audit trail",
        technologies: ["Prisma ORM", "PostgreSQL"],
      },
    ],
    overview:
      "Teams share Kanban boards with role-based permissions. Card moves apply optimistically in the UI, persist via API, and broadcast through Pusher so every teammate sees updates without refreshing.",
    flowSummary: [
      "User authenticates with JWT; role determines board permissions",
      "Drag-and-drop triggers optimistic UI update + API persist",
      "Server emits Pusher event on board channel",
      "Connected clients reconcile state with activity feed entry",
    ],
    highlights: [
      "Owner / Admin / Member / Viewer permission model",
      "Optimistic updates with rollback on API failure",
      "Board-scoped Pusher channels for targeted broadcasts",
      "Turborepo monorepo for shared types across apps",
    ],
    challenges: [],
    metrics: ["Public demo board", "Turborepo monorepo", "Live sync", "RBAC"],
    lessonsLearned: [],
    stack: ["Next.js", "TypeScript", "Prisma", "Pusher", "PostgreSQL"],
  },
  "jobsprint-agent-architecture": {
    slug: "jobsprint-agent-architecture",
    title: "JobSprint Agent Architecture",
    subtitle: "Playwright automation · AI form filling · CLI",
    category: "product",
    relatedProjectSlug: "jobsprint",
    diagramType: "layers",
    layers: [
      {
        id: "cli",
        title: "CLI Orchestrator",
        subtitle: "Search cycles, profile config, logging",
        technologies: ["Python", "CLI"],
      },
      {
        id: "browser",
        title: "Playwright Agent",
        subtitle: "Navigate Naukri, fill forms, submit applications",
        technologies: ["Playwright", "Headless Chrome"],
      },
      {
        id: "ai",
        title: "AI Q&A Engine",
        subtitle: "Rule-based + LLM answers for application forms",
        technologies: ["Groq", "Gemini"],
      },
      {
        id: "data",
        title: "Match & Log Store",
        subtitle: "Scoring, deduplication, CSV audit trail",
        technologies: ["CSV logs", "Profile JSON"],
      },
    ],
    overview:
      "Autonomous job application agent that searches Naukri listings matching a weighted profile, scores roles, automates form submission via Playwright, and uses AI for open-ended application questions — with duplicate prevention and CSV audit logs.",
    flowSummary: [
      "CLI loads candidate profile and search preferences",
      "Agent searches 60+ roles across configured cities on a refresh cycle",
      "Weighted scoring ranks matches (role, skills, location, salary)",
      "Playwright navigates apply flows; AI answers unstructured questions",
      "Every action logged to CSV with duplicate prevention",
    ],
    highlights: [
      "Weighted profile match scoring with smart exclusions",
      "Hybrid rule-based + LLM form filling",
      "15-minute search refresh cycles",
      "Full application audit trail in CSV",
    ],
    challenges: [],
    metrics: ["60+ role searches", "CSV audit log", "Open source", "AI + rules hybrid"],
    lessonsLearned: [],
    stack: ["Python", "Playwright", "Groq", "Gemini"],
  },
  "dueldots-multiplayer-architecture": {
    slug: "dueldots-multiplayer-architecture",
    title: "DuelDots Multiplayer Architecture",
    subtitle: "Flutter · Firebase realtime · game rooms",
    category: "product",
    relatedProjectSlug: "duel-dots",
    diagramType: "layers",
    layers: [
      {
        id: "client",
        title: "Flutter Clients",
        subtitle: "iOS, Android, bot mode, leaderboard UI",
        technologies: ["Flutter", "Riverpod"],
      },
      {
        id: "realtime",
        title: "Firebase Realtime",
        subtitle: "Room state, moves, presence",
        technologies: ["Cloud Firestore", "Firebase Auth"],
      },
      {
        id: "logic",
        title: "Game Engine",
        subtitle: "5×5 grid rules, capture logic, turn validation",
        technologies: ["Dart", "State machines"],
      },
      {
        id: "stats",
        title: "Player Stats",
        subtitle: "Leaderboard, match history, ELO-style tracking",
        technologies: ["Firestore collections"],
      },
    ],
    overview:
      "Real-time 2-player strategy game where users join rooms via shareable codes, sync moves through Firestore listeners, and compete on leaderboards — with an offline bot mode for practice.",
    flowSummary: [
      "Player creates or joins room via shareable code",
      "Firestore document holds board state and turn ownership",
      "Move writes validated server-side via security rules + client engine",
      "Opponent receives realtime snapshot update",
      "Match results update player stats and leaderboard",
    ],
    highlights: [
      "Shareable room codes for instant multiplayer",
      "Realtime sync without custom WebSocket infrastructure",
      "Bot mode for offline practice",
      "Published on Google Play",
    ],
    challenges: [],
    metrics: ["Google Play live", "Realtime rooms", "Bot mode", "Leaderboard"],
    lessonsLearned: [],
    stack: ["Flutter", "Firebase", "Riverpod", "Firestore"],
  },
};

export function getCaseStudyArchitecture(slug: string): SystemDesign | undefined {
  return caseStudyArchitectures[slug];
}
