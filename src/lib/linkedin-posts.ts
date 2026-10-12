export type PostImage = {
  src: string;
  caption?: string;
  fit?: "contain" | "cover";
  /** CSS object-position, e.g. "center top" or "center 22%" */
  position?: string;
};

export type LinkedInPost = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  hook: string;
  category: string;
  highlights: string[];
  tags: string[];
  url: string;
  image?: string;
  images?: PostImage[];
  /** ISO timestamp. Relative labels are derived from this. */
  postedAt: string;
  stats: {
    reactions?: number;
    impressions?: number;
    comments?: number;
  };
  featured?: boolean;
};

export function formatLinkedInRelativeTime(iso: string, now = Date.now()) {
  const posted = new Date(iso).getTime();
  if (Number.isNaN(posted)) return "";

  const minutes = Math.floor(Math.max(0, now - posted) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return days === 1 ? "1 day ago" : `${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (days < 30) return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return months === 1 ? "1 month ago" : `${months} months ago`;

  const years = Math.floor(months / 12);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

export function getPostImages(post: LinkedInPost): PostImage[] {
  if (post.images?.length) {
    return post.images;
  }
  if (post.image) {
    return [{ src: post.image }];
  }
  return [];
}

export const linkedInProfileUrl =
  "https://www.linkedin.com/in/aitha-venkata-subbaiah-setty/";

export const linkedInPosts: LinkedInPost[] = [
  {
    slug: "hala-product-technology-excellence-award",
    title: "Product & Technology Excellence Award",
    subtitle: "Hala Mobility · Q2 FY 2026–27 Town Hall",
    hook: "Honoured with the Product & Technology Excellence Award at Hala Mobility's Q2 town hall.",
    category: "Recognition",
    excerpt:
      "Received the Product & Technology Excellence Award at Hala Mobility's Q2 FY 2026–27 Town Hall. Since joining on 1 July 2026, contributed to 40+ tasks, enhancements, fixes, and deployments — including real-time booking and rentals, queue and fleet operations live in Delhi and Mumbai, service workflows, and the executive app.",
    highlights: [
      "Product & Technology Excellence Award",
      "40+ tasks, fixes, and production deployments",
      "Queue module live in Delhi and Mumbai",
      "Booking, fleet, service, and executive app work",
    ],
    tags: ["HalaMobility", "EngineeringExcellence", "FullStackDeveloper", "SoftwareEngineering"],
    url: "https://www.linkedin.com/posts/aitha-venkata-subbaiah-setty_halamobility-engineeringexcellence-fullstackdeveloper-activity-7514891150177054720-AGgf",
    images: [
      {
        src: "/writing/hala-award-3.jpg",
        caption: "Product & Technology Excellence Award",
        fit: "contain",
      },
      {
        src: "/writing/hala-award-1.jpg",
        caption: "Town hall recognition at Hala Mobility",
        fit: "cover",
        position: "center 22%",
      },
      {
        src: "/writing/hala-award-2.jpg",
        caption: "With the team after the award",
        fit: "cover",
        position: "center 22%",
      },
    ],
    postedAt: "2026-10-11T03:34:30.127Z",
    stats: { reactions: 93, comments: 12 },
    featured: true,
  },
  {
    slug: "hala-mobility-software-developer",
    title: "Joined Hala Mobility as a Software Developer",
    subtitle: "New chapter · EV mobility · Hyderabad",
    hook: "Excited to start a new chapter — building scalable products and solving real-world engineering challenges at Hala Mobility.",
    category: "Career Update",
    excerpt:
      "I'm happy to share that I've joined Hala Mobility as a Software Developer. Looking forward to learning from an amazing team, building scalable products, solving real-world engineering challenges, and growing both technically and professionally. Grateful for the warm welcome and the thoughtful onboarding goodies.",
    highlights: [
      "Software Developer at Hala Mobility",
      "Building scalable products for EV mobility",
      "Full stack focus — React, Node.js, and more",
      "Based in Hyderabad · continuous learning",
    ],
    tags: [
      "NewJob",
      "HalaMobility",
      "SoftwareDeveloper",
      "FullStackDeveloper",
      "ReactJS",
      "NodeJS",
      "Hyderabad",
    ],
    url: "https://www.linkedin.com/posts/aitha-venkata-subbaiah-setty_newjob-softwaredeveloper-halamobility-activity-7486412435604729856-oEPN",
    images: [
      {
        src: "/writing/hala-joining-1.jpg",
        caption: "First days at Hala — laptop up, coffee in",
        fit: "cover",
      },
      {
        src: "/writing/hala-joining-2.jpg",
        caption: "At the Hala Hyderabad office",
        fit: "cover",
        position: "center 18%",
      },
      {
        src: "/writing/hala-joining-3.jpg",
        caption: "Ready for day one — bag, notebook, MacBook",
        fit: "cover",
      },
    ],
    postedAt: "2026-07-24T13:30:15.425Z",
    stats: { reactions: 57, comments: 9 },
  },
  {
    slug: "postman-workshop",
    title: "Hands-On API Testing for Future Engineers",
    subtitle: "Postman Essentials · IEEE Student Chapter, RGMCET",
    hook: "Alumni-led workshop on API testing with Postman, FastAPI, and real industry workflows.",
    category: "Knowledge Sharing",
    excerpt:
      "Delivered a demo-driven session for future engineers — from API fundamentals and client–server communication to hands-on CRUD with Postman, testing FastAPI backends, and the same workflows used in production.",
    highlights: [
      "HTTP methods & real CRUD operations in Postman",
      "FastAPI backend testing with a dummy database",
      "Industry API testing workflow for students",
      "Alumni speaker · Full Stack Developer at Stratosfy",
    ],
    tags: ["Postman", "APIs", "IEEE", "FastAPI", "Alumni Speaker", "RGMCET"],
    url: "https://www.linkedin.com/posts/aitha-venkata-subbaiah-setty_postman-apis-handsonworkshop-activity-7411721271316668416-djVn",
    image: "/writing/postman-workshop.png",
    postedAt: "2025-12-30T10:54:14.173Z",
    stats: { reactions: 68, impressions: 2865, comments: 5 },
  },
  {
    slug: "javascript-fundamentals",
    title: "Good developers write code. Better developers revisit fundamentals.",
    subtitle: "JavaScript core · Scaler certification",
    hook: "Revisiting async patterns, ES6+, and closures through the lens of production systems.",
    category: "Engineering Craft",
    excerpt:
      "Recently spent time strengthening my JavaScript core — the same foundation behind everything I build in full stack development. Working on real-world systems (microservices, IoT, real-time data) made revisiting async patterns, ES6+, and closures even more valuable.",
    highlights: [
      "Async JavaScript & ES6+ patterns",
      "Closures & execution behavior",
      "Scaler JavaScript certification completed",
      "Depth over chasing new tech every week",
    ],
    tags: ["JavaScript", "Scaler", "Full Stack", "Continuous Learning"],
    url: "https://www.linkedin.com/posts/aitha-venkata-subbaiah-setty_i-have-completed-javascript-course-with-certification-activity-7443972393003573248-76mg",
    postedAt: "2026-03-29T10:48:40.795Z",
    stats: { impressions: 619 },
  },
  {
    slug: "stratosfy-eight-months",
    title: "8 Months at Stratosfy — racing toward the 1-year mark",
    subtitle: "Cloud & AI systems · Smart refrigeration IoT",
    hook: "Building IoT ingestion pipelines, AI anomaly detection, and telemetry services at scale.",
    category: "Production Work",
    excerpt:
      "Contributing to the intelligence layer of Stratosfy's smart refrigeration platform — building data ingestion pipelines, AI-driven anomaly detection, and cloud services that process temperature telemetry at scale across restaurant and healthcare networks.",
    highlights: [
      "Data ingestion pipelines & AI anomaly detection",
      "BeaconX-T / BeaconX-AT sensors & Bridgenius Gateways",
      "Field device to AI model — full stack IoT context",
      "Production impact across food-tech operations",
    ],
    tags: ["Stratosfy", "IoT", "AI", "Cloud Engineering", "Data Pipelines"],
    url: "https://www.linkedin.com/posts/aitha-venkata-subbaiah-setty_stratosfy-ai-cloudengineering-activity-7392993500293894144-nyjr",
    images: [
      {
        src: "/writing/stratosfy-iot-hardware.png",
        caption: "BeaconX sensors & Bridgenius gateways",
        fit: "contain",
      },
      {
        src: "/writing/stratosfy-dashboard.png",
        caption: "TempGenie equipment telemetry dashboard",
        fit: "cover",
      },
    ],
    postedAt: "2025-11-08T18:36:45.627Z",
    stats: { reactions: 33, impressions: 1565 },
  },
];
