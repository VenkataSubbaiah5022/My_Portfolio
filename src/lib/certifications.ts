import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
import {
  SiHackerrank,
  SiMongodb,
  SiPostman,
  SiPython,
} from "react-icons/si";

export type CertCategory = "frontend" | "cloud" | "backend" | "platform" | "academic";

type CertAccent = {
  iconBox: string;
  tag: string;
  glow: string;
  ribbon: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: CertCategory;
  skills: string[];
  description?: string;
  verifyUrl?: string;
  featured?: boolean;
  icon?: IconType;
  iconColor?: string;
  glyph?: string;
  badgeItems?: string[];
  /** Filename inside `public/certifications/` */
  imageFile?: string;
  accent: CertAccent;
};

const CERT_DIR = "/certifications";

export function certificationImagePath(fileName: string) {
  return `${CERT_DIR}/${encodeURIComponent(fileName).replace(/%2F/g, "/")}`;
}

const accents = {
  emerald: {
    iconBox: "border-emerald-500/20 bg-emerald-500/10",
    tag: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    glow: "rgba(16, 185, 129, 0.12)",
    ribbon: "from-emerald-500/30 via-emerald-400/10 to-transparent",
  },
  sky: {
    iconBox: "border-sky-500/20 bg-sky-500/10",
    tag: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-400",
    glow: "rgba(14, 165, 233, 0.1)",
    ribbon: "from-sky-500/30 via-sky-400/10 to-transparent",
  },
  orange: {
    iconBox: "border-orange-500/20 bg-orange-500/10",
    tag: "border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-400",
    glow: "rgba(249, 115, 22, 0.1)",
    ribbon: "from-orange-500/30 via-orange-400/10 to-transparent",
  },
  blue: {
    iconBox: "border-blue-500/20 bg-blue-500/10",
    tag: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400",
    glow: "rgba(59, 130, 246, 0.1)",
    ribbon: "from-blue-500/30 via-blue-400/10 to-transparent",
  },
  amber: {
    iconBox: "border-amber-500/20 bg-amber-500/10",
    tag: "border-amber-500/20 bg-amber-500/10 text-amber-800 dark:text-amber-400",
    glow: "rgba(245, 158, 11, 0.1)",
    ribbon: "from-amber-500/30 via-amber-400/10 to-transparent",
  },
  green: {
    iconBox: "border-green-500/20 bg-green-500/10",
    tag: "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400",
    glow: "rgba(34, 197, 94, 0.1)",
    ribbon: "from-green-500/30 via-green-400/10 to-transparent",
  },
  violet: {
    iconBox: "border-violet-500/20 bg-violet-500/10",
    tag: "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-400",
    glow: "rgba(139, 92, 246, 0.1)",
    ribbon: "from-violet-500/30 via-violet-400/10 to-transparent",
  },
  indigo: {
    iconBox: "border-indigo-500/20 bg-indigo-500/10",
    tag: "border-indigo-500/20 bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
    glow: "rgba(79, 70, 229, 0.1)",
    ribbon: "from-indigo-500/30 via-indigo-400/10 to-transparent",
  },
} satisfies Record<string, CertAccent>;

export const certificationCategories: Record<
  CertCategory,
  { label: string; description: string }
> = {
  frontend: { label: "Frontend", description: "UI & client-side skills" },
  cloud: { label: "Cloud", description: "Infrastructure & distributed systems" },
  backend: { label: "Backend", description: "APIs, data & server-side" },
  platform: { label: "Platform badges", description: "Vendor skill tracks" },
  academic: { label: "Academic", description: "University & MOOC credentials" },
};

export const certifications: Certification[] = [
  {
    id: "hackerrank-react",
    title: "Frontend Developer (React)",
    issuer: "HackerRank",
    year: "2026",
    category: "frontend",
    featured: true,
    verifyUrl: "https://www.hackerrank.com/certificates/019f73606e1a",
    description:
      "Verified skills assessment covering React, CSS, and JavaScript — listed on my HackerRank profile.",
    skills: ["React", "CSS", "JavaScript"],
    imageFile: "Frontend Developer React by HackerRank.webp",
    icon: SiHackerrank,
    iconColor: "#1ba94c",
    accent: accents.emerald,
  },
  {
    id: "hackerrank-sql",
    title: "SQL",
    issuer: "HackerRank",
    year: "2025",
    category: "backend",
    skills: ["SQL", "Queries", "Databases"],
    description: "Verified SQL skills assessment on HackerRank.",
    imageFile: "SQL by HackRank.webp",
    icon: SiHackerrank,
    iconColor: "#1ba94c",
    accent: accents.emerald,
  },
  {
    id: "google-flutter-dart",
    title: "Flutter & Dart Certification Program",
    issuer: "Google",
    year: "2025",
    category: "frontend",
    skills: ["Flutter", "Dart", "Mobile"],
    description: "Google certification program covering cross-platform mobile development.",
    imageFile: "Certification Program in google flutter & Dart.webp",
    accent: accents.indigo,
  },
  {
    id: "internshala-web",
    title: "Web Development",
    issuer: "Internshala",
    year: "2024",
    category: "frontend",
    skills: ["HTML", "CSS", "JavaScript"],
    description: "Structured web development training with project-based learning.",
    imageFile: "Internshala web development.webp",
    accent: accents.violet,
  },
  {
    id: "nptel-cloud",
    title: "Cloud Computing",
    issuer: "NPTEL",
    year: "2024",
    category: "academic",
    skills: ["Cloud", "Virtualization", "Distributed systems"],
    description: "IIT-backed coursework on cloud architecture and service models.",
    imageFile: "Cloud Computing.webp",
    glyph: "NP",
    accent: accents.sky,
  },
  {
    id: "nptel-iot",
    title: "Introduction to Internet of Things",
    issuer: "NPTEL",
    year: "2024",
    category: "academic",
    skills: ["IoT", "Embedded systems", "Sensor networks"],
    description: "Foundational IoT concepts aligned with my production telemetry work.",
    imageFile: "Introduction To Internet Of Things.jpg",
    glyph: "NP",
    accent: accents.sky,
  },
  {
    id: "codsoft-java",
    title: "Java Programming",
    issuer: "CodSoft",
    year: "2024",
    category: "backend",
    skills: ["Java", "OOP", "Backend basics"],
    description: "Java fundamentals and object-oriented programming certification.",
    imageFile: "codsoft_java.webp",
    accent: accents.orange,
  },
  {
    id: "codechef-java",
    title: "Java Proficiency",
    issuer: "CodeChef",
    year: "2024",
    category: "backend",
    skills: ["Java", "Problem solving", "DSA"],
    description: "Java skill certification through competitive programming practice.",
    imageFile: "java_codechef.webp",
    accent: accents.amber,
  },
  {
    id: "skilldizre-ml",
    title: "Machine Learning",
    issuer: "SkillDizre",
    year: "2024",
    category: "backend",
    skills: ["Machine Learning", "Python", "Data"],
    description: "Introductory machine learning concepts and applied workflows.",
    imageFile: "SkillDizre Machine learning.webp",
    accent: accents.violet,
  },
  {
    id: "wipro-talent",
    title: "Talent Next Program",
    issuer: "Wipro",
    year: "2024",
    category: "platform",
    skills: ["Industry readiness", "Technical training"],
    description: "Wipro industry-aligned technical and professional skills program.",
    imageFile: "wipro.webp",
    accent: accents.blue,
  },
  {
    id: "soft-skills",
    title: "Soft Skills & Communication",
    issuer: "Professional Development",
    year: "2024",
    category: "academic",
    skills: ["Communication", "Teamwork", "Presentation"],
    description: "Workplace communication, collaboration, and professional skills.",
    imageFile: "Soft skills.jpg",
    accent: accents.indigo,
  },
  {
    id: "innovation-day-quiz",
    title: "Innovation Day Quiz",
    issuer: "RGMCE",
    year: "2024",
    category: "academic",
    skills: ["Innovation", "Tech awareness", "Quiz"],
    description: "Campus innovation day technical quiz participation certificate.",
    imageFile: "innovation day quiz.webp",
    glyph: "RG",
    accent: accents.emerald,
  },
  {
    id: "postman-api",
    title: "API Fundamentals Student Expert",
    issuer: "Postman",
    year: "2025",
    category: "backend",
    skills: ["REST APIs", "Collections", "Testing"],
    description: "API design, documentation, and automated testing workflows.",
    imageFile: "Postman API Fundamentals Student Expert.webp",
    icon: SiPostman,
    iconColor: "#f97316",
    accent: accents.orange,
  },
  {
    id: "ibm-python",
    title: "Python 101 for Data Science",
    issuer: "IBM",
    year: "2025",
    category: "backend",
    skills: ["Python", "Data Science", "Analytics"],
    description: "IBM Cognitive Class Python foundations for data science workflows.",
    imageFile: "python 101 for Data Science by IBM.webp",
    icon: SiPython,
    iconColor: "#3776ab",
    accent: accents.blue,
  },
  {
    id: "ibm-python-data-science",
    title: "Python for Data Science",
    issuer: "IBM",
    year: "2025",
    category: "backend",
    skills: ["Python", "Pandas", "Data analysis"],
    description: "Applied Python skills for data science and analysis.",
    imageFile: "python-for-data-science.webp",
    icon: SiPython,
    iconColor: "#3776ab",
    accent: accents.blue,
  },
  {
    id: "aws-cloud-101",
    title: "Introduction to Cloud 101",
    issuer: "AWS Educate",
    year: "2026",
    category: "cloud",
    skills: ["AWS", "Cloud fundamentals"],
    description: "AWS Educate training badge for cloud computing basics.",
    imageFile: "aws-educate-introduction-to-cloud-101-training-badg.webp",
    icon: FaAws,
    iconColor: "#ff9900",
    accent: accents.amber,
  },
  {
    id: "aws-serverless",
    title: "Getting Started with Serverless",
    issuer: "AWS Educate",
    year: "2026",
    category: "cloud",
    skills: ["AWS", "Serverless", "Lambda"],
    description: "AWS Educate badge for serverless architecture fundamentals.",
    imageFile: "aws-educate-getting-started-with-serverless-trainin.webp",
    icon: FaAws,
    iconColor: "#ff9900",
    accent: accents.amber,
  },
  {
    id: "aws-storage",
    title: "Getting Started with Storage",
    issuer: "AWS Educate",
    year: "2026",
    category: "cloud",
    skills: ["AWS", "S3", "Storage"],
    description: "AWS Educate badge for cloud storage services.",
    imageFile: "aws-educate-getting-started-with-storage-training-b.webp",
    icon: FaAws,
    iconColor: "#ff9900",
    accent: accents.amber,
  },
  {
    id: "mongodb-core-concepts",
    title: "Core Concepts and Architecture",
    issuer: "MongoDB University",
    year: "2026",
    category: "platform",
    skills: ["MongoDB", "Document model", "Architecture"],
    description: "MongoDB University skill badge covering database fundamentals and architecture.",
    imageFile: "mongodb-core-concepts-and-architecture.png",
    icon: SiMongodb,
    iconColor: "#22c55e",
    accent: accents.green,
  },
];

export function getCertificationImage(cert: Certification) {
  return cert.imageFile ? certificationImagePath(cert.imageFile) : undefined;
}

export function getCertificationsWithImages() {
  return certifications.filter((cert) => cert.imageFile);
}

export const featuredCertification = certifications.find((cert) => cert.featured)!;

export const standardCertifications = certifications.filter((cert) => !cert.featured);

export function getCertificationStats() {
  const withImages = getCertificationsWithImages();
  return {
    total: certifications.length,
    uploaded: withImages.length,
    verified: certifications.filter((cert) => cert.verifyUrl).length,
    issuers: new Set(certifications.map((cert) => cert.issuer)).size,
  };
}

export const certificationStats = getCertificationStats();

export function getCertificateFlowItems() {
  return getCertificationsWithImages();
}
