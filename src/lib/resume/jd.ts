import { matchSkills } from "@/lib/resume/skills";

export type Requirement = "must" | "mentioned" | "nice";

export type JdSkill = {
  name: string;
  /** How the JD spells it, e.g. "ReactJS" for React. */
  spelling: string;
  requirement: Requirement;
  count: number;
};

export type RoleFamily = "fullstack" | "backend" | "frontend" | "ai" | "mobile";

export type JdAnalysis = {
  skills: JdSkill[];
  minYears: number | null;
  family: RoleFamily;
  /** Capitalised or tech-looking terms outside the skill dictionary. */
  otherKeywords: string[];
};

export const REQUIREMENT_WEIGHT: Record<Requirement, number> = { must: 3, mentioned: 2, nice: 1 };

const MUST_HEADING =
  /(requirements?|required|must[- ]haves?|(minimum |basic )?qualifications|what you('|’)ll (need|bring)|you (have|bring)|who you are|about you|key skills|(technical )?skills|responsibilities|what you('|’)ll do)\b/i;
const NICE_HEADING =
  /(nice[- ]to[- ]haves?|preferred|bonus|good to have|desirable|plus points?|added advantage)\b/i;
const NICE_INLINE = /\b(nice to have|preferred|is a plus|a plus|bonus|good to have|added advantage)\b/i;

const FAMILY_SKILLS: Record<Exclude<RoleFamily, "fullstack">, string[]> = {
  backend: ["Node.js", "Express.js", "REST APIs", "Microservices", "PostgreSQL", "MongoDB", "MySQL", "Redis", "Python", "Java", "Docker", "Kafka", "GraphQL"],
  frontend: ["React", "Next.js", "Angular", "Vue", "Tailwind CSS", "CSS", "HTML", "Redux", "Framer Motion", "Figma", "Accessibility"],
  ai: ["Machine Learning", "NLP", "LLM", "RAG", "LangChain", "OpenAI API", "Claude API", "Gemini", "TensorFlow", "PyTorch", "Vercel AI SDK"],
  mobile: ["Flutter", "React Native", "Expo", "Dart", "Kotlin", "Swift", "Riverpod"],
};

const STOPWORDS = new Set(
  "a an and the or of to in for with on at by from as is are be we you our your this that will can have has who what how about us team role job work experience years year strong good excellent ability skills knowledge understanding including etc e.g i.e plus must nice preferred required responsibilities requirements qualifications benefits salary location remote hybrid office india".split(
    " ",
  ),
);

const MUST_INLINE = /^\s*[-•*]?\s*(must[- ]haves?|required|requirements?|mandatory)\s*:/i;

function lineRequirement(line: string, section: Requirement): Requirement {
  if (NICE_INLINE.test(line)) return "nice";
  return MUST_INLINE.test(line) ? "must" : section;
}

/**
 * The section a heading line opens, or null for ordinary lines. A heading is a
 * non-bullet line that ends with ":" or is at most five words and starts with
 * the keyword, so "Experience with Kafka preferred" stays a requirement line.
 */
function headingSection(line: string): Requirement | null {
  const trimmed = line.trim().replace(/^#+\s*/, "");
  if (!trimmed || /^[-•*▪◦●–]|^\d+[.)]/.test(trimmed)) return null;

  const endsWithColon = trimmed.endsWith(":");
  const short = trimmed.split(/\s+/).length <= 5;
  if (!endsWithColon && !short) return null;

  const matches = (pattern: RegExp) =>
    endsWithColon ? pattern.test(trimmed) : new RegExp(`^${pattern.source}`, "i").test(trimmed);
  if (matches(NICE_HEADING)) return "nice";
  if (matches(MUST_HEADING)) return "must";
  return null;
}

function detectFamily(skills: JdSkill[]): RoleFamily {
  const totals = Object.fromEntries(
    Object.entries(FAMILY_SKILLS).map(([family, names]) => [
      family,
      skills.filter((s) => names.includes(s.name)).reduce((sum, s) => sum + REQUIREMENT_WEIGHT[s.requirement], 0),
    ]),
  ) as Record<Exclude<RoleFamily, "fullstack">, number>;

  if (totals.ai >= 6 && totals.ai >= totals.backend) return "ai";
  if (totals.mobile >= 6 && totals.mobile >= totals.frontend) return "mobile";
  if (totals.backend > 0 && totals.frontend > 0) {
    const ratio = totals.backend / totals.frontend;
    if (ratio >= 2.5) return "backend";
    if (ratio <= 0.4) return "frontend";
    return "fullstack";
  }
  if (totals.backend > 0) return "backend";
  if (totals.frontend > 0) return "frontend";
  return "fullstack";
}

function otherKeywords(text: string, known: Set<string>): string[] {
  const counts = new Map<string, number>();
  for (const match of text.matchAll(/(?<![A-Za-z0-9])[A-Za-z][A-Za-z0-9+#.-]*[A-Za-z0-9+#]/g)) {
    const word = match[0];
    const techLooking = /[A-Z].*[A-Z]|[0-9+#.]/.test(word.slice(1)) || /^[A-Z]{2,}$/.test(word);
    if (!techLooking || STOPWORDS.has(word.toLowerCase()) || known.has(word.toLowerCase())) continue;
    if (word.length <= 2 || matchSkills(word).length) continue;
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([word]) => word);
}

export function analyzeJobDescription(text: string): JdAnalysis {
  const lines = text.replace(/\r/g, "").split("\n");
  const skills = new Map<string, JdSkill>();
  let section: Requirement = "mentioned";

  for (const line of lines) {
    section = headingSection(line) ?? section;
    const requirement = lineRequirement(line, section);
    for (const hit of matchSkills(line)) {
      const existing = skills.get(hit.name);
      if (!existing) {
        skills.set(hit.name, { name: hit.name, spelling: hit.spelling, requirement, count: hit.count });
      } else {
        existing.count += hit.count;
        if (REQUIREMENT_WEIGHT[requirement] > REQUIREMENT_WEIGHT[existing.requirement]) {
          existing.requirement = requirement;
        }
      }
    }
  }

  const years = [...text.matchAll(/(\d{1,2})\s*\+?\s*(?:-|–|to)?\s*\d{0,2}\s*\+?\s*(?:years|yrs)/gi)].map((m) =>
    Number(m[1]),
  );
  const skillList = [...skills.values()].sort(
    (a, b) => REQUIREMENT_WEIGHT[b.requirement] - REQUIREMENT_WEIGHT[a.requirement] || b.count - a.count,
  );
  const known = new Set(skillList.flatMap((s) => [s.name.toLowerCase(), s.spelling.toLowerCase()]));

  return {
    skills: skillList,
    minYears: years.length ? Math.min(...years) : null,
    family: detectFamily(skillList),
    otherKeywords: otherKeywords(text, known),
  };
}
