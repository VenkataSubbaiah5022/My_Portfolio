const PRODUCTION_SITE_URL = "https://venkata-fullstack.vercel.app";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/$/, "");
}

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
    return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL.trim());
  }
  if (process.env.VERCEL_URL?.trim()) {
    return normalizeSiteUrl(`https://${process.env.VERCEL_URL.trim()}`);
  }
  return PRODUCTION_SITE_URL;
}

export function getMetadataBase() {
  return new URL(getSiteUrl());
}

export const SITE_NAME = "Aitha Venkata Subbaiah";
export const SITE_FULL_NAME = "Aitha Venkata Subbaiah Setty";
export const SITE_TAGLINE = "Full Stack Developer";
export const SITE_DESCRIPTION =
  "Aitha Venkata Subbaiah Setty — full stack developer and software engineer in India. MERN stack, React, Node.js, Java, and AI-powered products. Production APIs, scalable web apps, and modern UX. Open to full-time and remote engineering roles in Hyderabad and across India.";
