export type ExperienceLink = {
  label: string;
  url: string;
};

export type ExperienceItem = {
  id: string;
  period: string;
  /** YYYY-MM */
  start: string;
  /** YYYY-MM, or "present" */
  end: string | "present";
  role: string;
  company: string;
  logo?: string;
  logoClassName?: string;
  logoAlt?: string;
  links?: ExperienceLink[];
  points: string[];
};

/** Newest first. Source of truth for the Experience section and the resume builder. */
export const experience: ExperienceItem[] = [
  {
    id: "hala-mobility",
    period: "July 2026 - Present",
    start: "2026-07",
    end: "present",
    role: "Software Developer",
    company: "Hala Mobility (Hyderabad, India) · Full time",
    logo: "/experience/hala-logo.webp",
    logoClassName: "h-8 w-24 object-contain",
    logoAlt: "Hala Mobility logo",
    links: [
      {
        label: "Website",
        url: "https://halamobility.in/",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/hala-mobility/",
      },
    ],
    points: [
      "Received the Product & Technology Excellence Award at Hala Mobility's Q2 FY 2026–27 town hall.",
      "Shipped 40+ tasks, enhancements, fixes, and production deployments across the EV rental platform.",
      "Built real-time booking and rental processing, including automated booking expiry.",
      "Shipped deployment, return, and fast-track queues with turnaround-time tracking — live in Delhi and Mumbai.",
      "Contributed to service workflows, vehicle-age and geofence booking controls, and the executive app.",
    ],
  },
  {
    id: "stratosfy",
    period: "April 2025 - March 2026",
    start: "2025-04",
    end: "2026-03",
    role: "Full Stack Developer",
    company: "Stratosfy (Remote - Ottawa, Canada) · Full time",
    logo: "/experience/stratosfy-logo full.png",
    logoClassName: "h-8 w-24 object-contain",
    logoAlt: "Stratosfy icon",
    links: [
      {
        label: "Play Store",
        url: "https://play.google.com/store/apps/details?id=io.stratosfy.tempgenie&hl=en_IN",
      },
      {
        label: "App Store",
        url: "https://apps.apple.com/ca/app/stratosfy/id1573760988",
      },
      {
        label: "Genius Platform",
        url: "https://login.genius.stratosfy.io/",
      },
    ],
    points: [
      "Developed 19+ microservices using Node.js and TypeScript for production IoT monitoring.",
      "Built 20+ REST APIs for telemetry ingestion and operational dashboards.",
      "Deployed features to live Stratosfy mobile apps and the Genius production platform.",
      "Reduced system downtime by 70% through data modeling and aggregation optimizations.",
      "Maintained 80%+ Jest coverage and improved release quality via GitHub Actions CI/CD.",
    ],
  },
  {
    id: "chegg",
    period: "Sep 2023 - Mar 2026",
    start: "2023-09",
    end: "2026-03",
    role: "Computer Science Subject Expert",
    company: "Chegg (Remote) · Freelance",
    logo: "/experience/chegg-logo.png",
    logoAlt: "Chegg logo",
    logoClassName: "h-8 w-20 object-contain",
    points: [
      "Solved 500+ CS queries across DSA, DBMS, OS, SQL, Java, and Python.",
      "Delivered clear, structured step-by-step technical explanations.",
      "Maintained high response quality and consistency under strict timelines.",
    ],
  },
  {
    id: "rk-microns",
    period: "May 2024 - Oct 2024",
    start: "2024-05",
    end: "2024-10",
    role: "Backend Developer Intern",
    company: "R K Microns (Rajasthan, India) · Internship",
    logo: "/experience/rk-microns-logo.png",
    logoAlt: "R K Microns logo",
    logoClassName: "h-8 w-24 object-contain",
    points: [
      "Built Python backend pipelines for AI-based defect detection workflows.",
      "Improved defect detection accuracy by 35%.",
      "Reduced manual inspection effort by 2 hours/day across 10+ operators.",
      "Collaborated with Flutter frontend teams for realtime visualization.",
    ],
  },
];
