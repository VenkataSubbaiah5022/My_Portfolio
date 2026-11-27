import { skillVocabulary } from "@/lib/resume/facts";

/**
 * Words that appear as certification "skills" but are too generic to match a
 * job description against ("data", "cloud", "testing", ...).
 */
const GENERIC = new Set([
  "Analytics",
  "Architecture",
  "Backend basics",
  "Cloud",
  "Cloud fundamentals",
  "Collections",
  "Dashboard UX",
  "Data",
  "Databases",
  "Document model",
  "Full Stack",
  "Industry readiness",
  "Innovation",
  "Mobile",
  "Presentation",
  "Queries",
  "Quiz",
  "Storage",
  "Tech awareness",
  "Technical training",
  "Testing",
  "Virtualization",
]);

/** Matched against the JD for coverage, never listed in the Skills section. */
export const SOFT_SKILLS = new Set(["Communication", "Teamwork", "Problem solving"]);

/** Alternate spellings → canonical name. Canonical names match themselves. */
const ALIASES: Record<string, string[]> = {
  React: ["ReactJS", "React.js"],
  "Next.js": ["NextJS", "Next JS"],
  "Node.js": ["NodeJS", "Node JS", "Node"],
  "Express.js": ["Express", "ExpressJS"],
  JavaScript: ["JS", "ES6"],
  TypeScript: ["TS"],
  PostgreSQL: ["Postgres"],
  MongoDB: ["Mongo"],
  AWS: ["Amazon Web Services"],
  GCP: ["Google Cloud", "Google Cloud Platform"],
  "REST APIs": ["REST", "RESTful", "REST API", "RESTful APIs", "RESTful API"],
  "Tailwind CSS": ["Tailwind", "TailwindCSS"],
  Microservices: ["microservice", "micro-services"],
  WebSockets: ["WebSocket", "web sockets"],
  "Machine Learning": ["ML"],
  NLP: ["natural language processing"],
  "OpenAI API": ["OpenAI", "ChatGPT API"],
  "Claude API": ["Anthropic"],
  Gemini: ["Google Gemini"],
  "CI/CD": ["CI CD", "continuous integration", "continuous delivery"],
  LLM: ["LLMs", "large language models"],
  Go: ["Golang"],
  Kubernetes: ["K8s"],
  "C#": [".NET", "dotnet"],
  "Problem solving": ["problem-solving"],
  Communication: ["communication skills"],
  Teamwork: ["team player", "collaboration"],
};

/**
 * Common skills the portfolio may not have. They let the match report name a
 * JD requirement as a gap instead of silently ignoring it.
 */
const COMMON_SKILLS = [
  "Kubernetes", "Go", "Rust", "C++", "C#", "Spring", "Spring Boot", "Kotlin", "Swift",
  "Ruby", "Ruby on Rails", "PHP", "Laravel", "Django", "Flask", "FastAPI", "NestJS",
  "GraphQL", "gRPC", "Kafka", "RabbitMQ", "Elasticsearch", "Terraform", "Azure", "Jenkins",
  "CI/CD", "Vue", "Svelte", "Redux", "Webpack", "Vite", "Sass", "Bootstrap", "Material UI",
  "Storybook", "Cypress", "Selenium", "JUnit", "Mocha", "Linux", "Bash", "DynamoDB",
  "Cassandra", "Oracle", "SQL Server", "Snowflake", "Spark", "Airflow", "TensorFlow",
  "PyTorch", "LangChain", "LLM", "RAG", "Figma", "Jira", "Agile", "Scrum", "TDD", "OAuth",
  "JWT", "Stripe", "Helm", "Prometheus", "Grafana", "Datadog", "Sentry", "DevOps", "SEO",
  "Accessibility", "jQuery", "Mongoose", "Sequelize", "TypeORM", "Vercel", "Netlify",
];

export type SkillTerm = { name: string; patterns: RegExp[] };

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Short terms ("JS", "ML") match case-sensitively so ordinary words don't trigger them. */
function termPattern(term: string): RegExp {
  const flags = term.length <= 3 ? "g" : "gi";
  return new RegExp(`(?<![A-Za-z0-9+#])${escapeRegExp(term)}(?![A-Za-z0-9+#])`, flags);
}

const aliasNames = new Set(Object.values(ALIASES).flat().map((alias) => alias.toLowerCase()));

const canonicalNames = [
  ...new Set([
    ...skillVocabulary.filter((skill) => !GENERIC.has(skill)),
    ...COMMON_SKILLS,
    ...Object.keys(ALIASES),
  ]),
].filter((name) => !aliasNames.has(name.toLowerCase()));

export const skillTerms: SkillTerm[] = canonicalNames.map((name) => ({
  name,
  patterns: [name, ...(ALIASES[name] ?? [])].map(termPattern),
}));

export type SkillHit = { name: string; count: number; spelling: string };

/**
 * Canonical skills named in `text`, with how often and how the text spells them.
 * A match inside a longer one is dropped: "Vercel AI SDK" is not also "Vercel",
 * and "React Native" is not also "React".
 */
export function matchSkills(text: string): SkillHit[] {
  const spans: { name: string; start: number; end: number; spelling: string }[] = [];
  for (const term of skillTerms) {
    for (const pattern of term.patterns) {
      for (const match of text.matchAll(pattern)) {
        spans.push({ name: term.name, start: match.index, end: match.index + match[0].length, spelling: match[0] });
      }
    }
  }

  const hits = new Map<string, SkillHit>();
  const add = (name: string, spelling: string) => {
    const hit = hits.get(name);
    if (hit) hit.count += 1;
    else hits.set(name, { name, count: 1, spelling });
  };
  for (const span of spans) {
    const inside = spans.some(
      (other) =>
        other !== span &&
        other.name !== span.name &&
        other.start <= span.start &&
        other.end >= span.end &&
        other.end - other.start > span.end - span.start,
    );
    if (inside) continue;
    add(span.name, span.spelling);
    for (const implied of IMPLIES[span.name] ?? []) add(implied, span.spelling);
  }
  return [...hits.values()];
}

/** A longer skill that also proves a shorter one it contains. */
const IMPLIES: Record<string, string[]> = {
  "AWS EC2": ["AWS"],
  "Spring Boot": ["Spring"],
  "Ruby on Rails": ["Ruby"],
};

/** Resume Skills section groups, in display order. Only skills the portfolio claims appear. */
export const SKILL_GROUPS: { title: string; core: boolean; skills: string[] }[] = [
  { title: "Languages", core: true, skills: ["TypeScript", "JavaScript", "Python", "Java", "Dart", "SQL", "HTML", "CSS"] },
  { title: "Frontend", core: true, skills: ["React", "Next.js", "Angular", "Tailwind CSS", "Framer Motion"] },
  { title: "Backend", core: true, skills: ["Node.js", "Express.js", "REST APIs", "Microservices", "WebSockets", "Socket.io", "Serverless"] },
  { title: "Mobile", core: false, skills: ["Flutter", "React Native", "Expo", "Riverpod"] },
  { title: "Databases", core: true, skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Firestore", "Supabase", "Prisma"] },
  { title: "Cloud & DevOps", core: true, skills: ["AWS", "GCP", "Docker", "GitHub Actions", "NGINX", "AWS EC2", "Lambda", "S3"] },
  { title: "AI", core: false, skills: ["Claude API", "OpenAI API", "Gemini", "Groq", "Vercel AI SDK", "NLP", "Speech Recognition", "Machine Learning", "AI Workflows"] },
  { title: "Testing & Tools", core: true, skills: ["Jest", "Pytest", "Playwright", "Postman", "Git"] },
  { title: "Data", core: false, skills: ["Pandas", "Tableau", "Data Visualization", "Data analysis"] },
];
