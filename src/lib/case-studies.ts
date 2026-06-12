import { getProjectBySlug } from "@/lib/projects";

export type CaseStudyMetric = {
  label: string;
  value: string;
};

export type CaseStudyChallenge = {
  title: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  role: string;
  timeline: string;
  deliveryFlow: string[];
  businessNeed: string;
  solution: string;
  architectureSlug: string;
  databaseDesign?: {
    title: string;
    points: string[];
  };
  technicalDecisions: string[];
  challenges: CaseStudyChallenge[];
  metrics: CaseStudyMetric[];
  lessonsLearned: string[];
  demoVideoUrl?: string | null;
};

export const caseStudySlugs = [
  "talentvault-ai",
  "jobsprint",
  "flowboard",
  "duel-dots",
] as const;

export type CaseStudySlug = (typeof caseStudySlugs)[number];

export const caseStudies: Record<CaseStudySlug, CaseStudy> = {
  "talentvault-ai": {
    slug: "talentvault-ai",
    role: "Sole builder — full stack & AI pipeline",
    timeline: "May 2025 – Present",
    deliveryFlow: ["Bulk upload", "PII scrub", "AI extract", "Search vault", "Shortlist"],
    businessNeed:
      "Recruiting teams waste hours manually copying resume data into spreadsheets and ATS tools. They need a fast vault where bulk uploads become searchable candidate profiles without exposing PII to AI providers.",
    solution:
      "TalentVault AI is a production web app where recruiters upload PDF/DOCX resumes in batches, the backend scrubs contact details, Gemini extracts structured fields, and a dashboard provides filters, analytics, and natural language search across the talent pool.",
    architectureSlug: "talentvault-ai-architecture",
    databaseDesign: {
      title: "Supabase / PostgreSQL schema",
      points: [
        "candidates — structured fields (skills, experience, education) with full-text search indexes",
        "documents — original file references in Supabase Storage with processing status",
        "upload_batches — batch job tracking with per-file progress and error states",
        "Row Level Security policies isolate recruiter data per authenticated user",
      ],
    },
    technicalDecisions: [
      "PII scrubbing runs server-side before any Gemini API call",
      "Schema-validated JSON output from LLM with retry on malformed responses",
      "Batch upload queue with per-file status instead of single synchronous endpoint",
      "Card and table views share the same filter state for consistent UX",
    ],
    challenges: [
      {
        title: "Resume format variance",
        body: "PDF layouts differ wildly across candidates. Gemini with a strict output schema outperformed regex parsers on multi-column and infographic resumes.",
      },
      {
        title: "PII leakage risk",
        body: "Built an explicit redaction layer for emails, phone numbers, and addresses. No raw contact data is sent to external AI APIs.",
      },
      {
        title: "Search at scale",
        body: "Combined structured filters with natural language queries so recruiters can narrow 500+ candidates without learning query syntax.",
      },
    ],
    metrics: [
      { label: "Deployment", value: "Live on Vercel" },
      { label: "AI provider", value: "Google Gemini" },
      { label: "Upload formats", value: "PDF + DOCX batch" },
      { label: "Search", value: "Natural language" },
    ],
    lessonsLearned: [
      "Design AI features around privacy constraints first — not as an afterthought.",
      "Recruiters trust the product when they see per-file progress during batch jobs.",
      "A live demo beats a README for hiring conversations.",
    ],
    demoVideoUrl: null,
  },
  jobsprint: {
    slug: "jobsprint",
    role: "Sole builder — agent architecture & automation",
    timeline: "Jan 2026 – Present",
    deliveryFlow: ["Profile setup", "Scan jobs", "Score match", "Auto-apply", "Audit log"],
    businessNeed:
      "Job seekers spend hours repeating the same application forms on Naukri. They need an agent that finds fresh matching roles and applies automatically — with guardrails, logging, and human-readable audit trails.",
    solution:
      "JobSprint is an open-source Python CLI that runs scheduled Naukri searches, scores listings against a weighted profile, automates apply flows with Playwright, and uses Groq/Gemini for unstructured form questions — logging every action to CSV.",
    architectureSlug: "jobsprint-agent-architecture",
    databaseDesign: {
      title: "Profile & audit data",
      points: [
        "profile.json — skills, experience, locations, salary range, exclusions",
        "applications.csv — timestamped log of every search, match score, and apply attempt",
        "applied_ids set — deduplication store preventing repeat submissions",
        "match_weights config — tunable scoring for role, skills, location, and salary fit",
      ],
    },
    technicalDecisions: [
      "Playwright over Selenium for reliable headless form interaction",
      "Hybrid rules for known fields + LLM for free-text employer questions",
      "Weighted scoring with exclusion filters before any browser session starts",
      "CSV audit log as the debugging source of truth for headless runs",
    ],
    challenges: [
      {
        title: "Dynamic employer forms",
        body: "Each company's apply flow uses different field layouts. A rules engine handles common fields; LLM fallback covers open-ended questions.",
      },
      {
        title: "False-positive matches",
        body: "Exclusion keywords and minimum score thresholds prevent applying to irrelevant seniority or location mismatches.",
      },
      {
        title: "Headless debugging",
        body: "Structured CSV logs with job ID, score, field values, and error reason make overnight agent runs inspectable.",
      },
    ],
    metrics: [
      { label: "Role coverage", value: "60+ searches / cycle" },
      { label: "Refresh rate", value: "15-min cycles" },
      { label: "Automation", value: "Playwright + AI Q&A" },
      { label: "Open source", value: "GitHub" },
    ],
    lessonsLearned: [
      "Autonomous agents need scoring and exclusion layers — not just automation.",
      "Audit logs are non-negotiable for any headless workflow you can't watch live.",
      "Open-sourcing the agent generated more engineering conversations than private repos.",
    ],
    demoVideoUrl: null,
  },
  flowboard: {
    slug: "flowboard",
    role: "Sole builder — full stack & realtime sync",
    timeline: "Jun 2025 – Present",
    deliveryFlow: ["Sign up", "Create board", "Drag tasks", "Collaborate", "Track activity"],
    businessNeed:
      "Small teams need a shared Kanban workspace that feels instant — with clear permissions, live updates when teammates move cards, and no refresh-required collaboration.",
    solution:
      "Flowboard is a Turborepo monorepo Kanban app with JWT auth, four-tier RBAC, dnd-kit drag-and-drop, optimistic UI, and Pusher-powered board channels for realtime sync across clients.",
    architectureSlug: "flowboard-realtime-architecture",
    databaseDesign: {
      title: "Prisma / PostgreSQL schema",
      points: [
        "users — auth identity with role assignments per board",
        "boards — workspace containers with member role mappings",
        "columns + cards — ordered positions with activity audit trail",
        "activities — feed entries for card moves, assignments, and comments",
      ],
    },
    technicalDecisions: [
      "Pusher over self-hosted WebSockets to ship realtime faster",
      "Optimistic drag-and-drop with server reconciliation on conflict",
      "JWT sessions with per-board role checks on every mutation",
      "Turborepo for shared types between web app and API packages",
    ],
    challenges: [
      {
        title: "Concurrent card moves",
        body: "Optimistic UI with position versioning prevents silent overwrites when two users drag on the same board.",
      },
      {
        title: "Role-aware mutations",
        body: "Viewers receive realtime updates but API middleware blocks write operations at the role level.",
      },
    ],
    metrics: [
      { label: "Architecture", value: "Turborepo monorepo" },
      { label: "Realtime", value: "Pusher channels" },
      { label: "Permissions", value: "4-tier RBAC" },
      { label: "Deployment", value: "Vercel" },
    ],
    lessonsLearned: [
      "Kanban UX lives or dies on optimistic updates — plan rollback from day one.",
      "Board-scoped channels beat global websocket rooms for collaboration apps.",
    ],
    demoVideoUrl: null,
  },
  "duel-dots": {
    slug: "duel-dots",
    role: "Sole builder — mobile & realtime game",
    timeline: "Mar 2025 – Dec 2025",
    deliveryFlow: ["Join room", "Place dots", "Capture grid", "Win match", "Climb ranks"],
    businessNeed:
      "Casual mobile gamers want a quick competitive 2-player experience they can start with a friend via a shareable code — without account friction or long matchmaking queues.",
    solution:
      "DuelDots is a Flutter game on Google Play with realtime multiplayer rooms, a 5×5 grid capture mechanic, bot mode for practice, and Firebase-backed leaderboards and player stats.",
    architectureSlug: "dueldots-multiplayer-architecture",
    databaseDesign: {
      title: "Firestore collections",
      points: [
        "rooms — board state, turn owner, player UIDs, room codes",
        "moves — validated move history for replay and dispute resolution",
        "players — stats, win/loss record, leaderboard ranking",
        "presence — connection state for rejoin after network drops",
      ],
    },
    technicalDecisions: [
      "Firestore snapshots for turn-based sync instead of custom WebSocket server",
      "Shareable short room codes for frictionless friend invites",
      "Riverpod for predictable game state across screens",
      "Client-side rules engine with Firestore security rules as backstop",
    ],
    challenges: [
      {
        title: "Move validation under latency",
        body: "Atomic Firestore updates plus turn checks prevent double-moves when both players act near-simultaneously.",
      },
      {
        title: "Mid-game disconnects",
        body: "Room presence tracking lets players rejoin without resetting the board state.",
      },
    ],
    metrics: [
      { label: "Platform", value: "Google Play" },
      { label: "Grid", value: "5×5 strategy" },
      { label: "Modes", value: "Online + Bot" },
      { label: "Backend", value: "Firebase" },
    ],
    lessonsLearned: [
      "Turn-based games don't need custom socket servers early — Firestore is enough.",
      "Room codes are the best onboarding for casual 2-player mobile games.",
    ],
    demoVideoUrl: null,
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  if (slug in caseStudies) {
    return caseStudies[slug as CaseStudySlug];
  }
  return undefined;
}

export function hasCaseStudy(slug: string): slug is CaseStudySlug {
  return slug in caseStudies;
}

export function getAdjacentCaseStudies(slug: CaseStudySlug) {
  const index = caseStudySlugs.indexOf(slug);
  const prevSlug = index > 0 ? caseStudySlugs[index - 1] : null;
  const nextSlug = index < caseStudySlugs.length - 1 ? caseStudySlugs[index + 1] : null;

  return {
    prev: prevSlug ? (getProjectBySlug(prevSlug) ?? null) : null,
    next: nextSlug ? (getProjectBySlug(nextSlug) ?? null) : null,
  };
}

export function estimateReadingMinutes(caseStudy: CaseStudy, highlightCount: number) {
  const text = [
    caseStudy.businessNeed,
    caseStudy.solution,
    ...caseStudy.technicalDecisions,
    ...caseStudy.challenges.map((c) => c.body),
    ...caseStudy.lessonsLearned,
  ].join(" ");
  const words = text.split(/\s+/).length + highlightCount * 12;
  return Math.max(4, Math.ceil(words / 200));
}
