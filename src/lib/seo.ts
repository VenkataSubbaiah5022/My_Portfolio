import { projects } from "@/lib/projects";
import { CONTACT_EMAIL } from "@/lib/contact";
import {
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_FULL_NAME,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/site";

const GITHUB_URL = "https://github.com/VenkataSubbaiah5022";
const LINKEDIN_URL =
  "https://www.linkedin.com/in/aitha-venkata-subbaiah-setty/";

export const SEO_KEYWORDS = [
  "Aitha Venkata Subbaiah Setty",
  "Aitha Venkata Subbaiah",
  "Venkata Subbaiah developer",
  "full stack developer",
  "full stack engineer India",
  "MERN stack developer",
  "React developer",
  "Node.js developer",
  "Java developer",
  "AI full stack developer",
  "software engineer",
  "software engineer India",
  "full stack developer Hyderabad",
  "full stack developer India",
  "Next.js developer",
  "TypeScript developer",
  "hire full stack developer",
  "remote full stack developer",
  "web developer portfolio",
  "MongoDB developer",
  "backend developer",
  "frontend developer",
];

export const PERSON_SAME_AS = [GITHUB_URL, LINKEDIN_URL] as const;

export const PERSON_KNOWS_ABOUT = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Java",
  "MongoDB",
  "Express.js",
  "MERN Stack",
  "PostgreSQL",
  "REST APIs",
  "WebSockets",
  "Microservices",
  "Docker",
  "Google Cloud Platform",
  "AWS",
  "Artificial Intelligence",
  "IoT",
  "CI/CD",
] as const;

export function getPersonJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: SITE_FULL_NAME,
    alternateName: [SITE_NAME, "Venkata Subbaiah", "Venkata Subbaiah Setty"],
    jobTitle: [
      SITE_TAGLINE,
      "Software Engineer",
      "MERN Stack Developer",
      "React Developer",
      "Node.js Developer",
      "AI Full Stack Developer",
    ],
    description: SITE_DESCRIPTION,
    url: siteUrl,
    image: `${siteUrl}/profile/venkata-profile.png`,
    email: `mailto:${CONTACT_EMAIL}`,
    telephone: "+91-9963132119",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    sameAs: [...PERSON_SAME_AS],
    knowsAbout: [...PERSON_KNOWS_ABOUT],
    worksFor: {
      "@id": `${siteUrl}/#organization-stratosfy`,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "RGMCET",
      url: "https://www.rgmcet.edu.in/",
    },
  };
}

export function getOrganizationJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization-stratosfy`,
    name: "Stratosfy",
    url: "https://www.stratosfy.io/",
    employee: {
      "@id": `${siteUrl}/#person`,
    },
  };
}

export function getWebsiteJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: `${SITE_FULL_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: siteUrl,
    inLanguage: "en-IN",
    publisher: {
      "@id": `${siteUrl}/#person`,
    },
  };
}

export function getWebPageJsonLd({
  path = "",
  name,
  description,
}: {
  path?: string;
  name: string;
  description: string;
}) {
  const siteUrl = getSiteUrl();
  const pageUrl = path ? `${siteUrl}${path}` : siteUrl;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`,
    url: pageUrl,
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
      "@id": `${siteUrl}/#person`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteUrl}/opengraph-image`,
    },
  };
}

export function getProfilePageJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: `${SITE_FULL_NAME} — Developer Portfolio`,
    description: SITE_DESCRIPTION,
    mainEntity: {
      "@id": `${siteUrl}/#person`,
    },
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
  };
}

export function getBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? `${siteUrl}${item.path}` : siteUrl,
    })),
  };
}

export function getFeaturedProjectsJsonLd() {
  const siteUrl = getSiteUrl();
  const featured = projects.filter((project) => project.featured);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured developer projects",
    itemListElement: featured.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.problem,
        applicationCategory: "WebApplication",
        operatingSystem: "Web",
        url: project.live ?? project.code ?? `${siteUrl}/projects`,
        author: {
          "@id": `${siteUrl}/#person`,
        },
        keywords: project.stack.join(", "),
      },
    })),
  };
}

export function getHomeJsonLd() {
  return [
    getPersonJsonLd(),
    getOrganizationJsonLd(),
    getWebsiteJsonLd(),
    getWebPageJsonLd({
      name: `${SITE_FULL_NAME} | ${SITE_TAGLINE}`,
      description: SITE_DESCRIPTION,
    }),
    getProfilePageJsonLd(),
    getFeaturedProjectsJsonLd(),
  ];
}

export function getProjectsPageJsonLd() {
  return [
    getWebPageJsonLd({
      path: "/projects",
      name: `Projects | ${SITE_FULL_NAME}`,
      description: `Production web apps, AI products, and realtime systems by ${SITE_FULL_NAME}, a full stack developer and software engineer in India.`,
    }),
    getBreadcrumbJsonLd([
      { name: "Home", path: "" },
      { name: "Projects", path: "/projects" },
    ]),
  ];
}

export function getCertificationsPageJsonLd() {
  return [
    getWebPageJsonLd({
      path: "/certifications",
      name: `Certifications | ${SITE_FULL_NAME}`,
      description: `Verified developer certifications for ${SITE_FULL_NAME} — React, SQL, cloud, IoT, Python, AWS, and MongoDB.`,
    }),
    getBreadcrumbJsonLd([
      { name: "Home", path: "" },
      { name: "Certifications", path: "/certifications" },
    ]),
  ];
}
