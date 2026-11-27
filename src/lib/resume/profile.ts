import { CONTACT_EMAIL } from "@/lib/contact";
import { linkedInProfileUrl } from "@/lib/linkedin-posts";
import type { RoleFamily } from "@/lib/resume/jd";
import { SITE_FULL_NAME } from "@/lib/site";

export type ResumeContact = {
  name: string;
  location: string;
  email: string;
  links: { label: string; url: string }[];
};

export const RESUME_CONTACT: ResumeContact = {
  name: SITE_FULL_NAME,
  location: "Hyderabad, India",
  email: CONTACT_EMAIL,
  links: [
    { label: "LinkedIn", url: linkedInProfileUrl },
    { label: "GitHub", url: "https://github.com/VenkataSubbaiah5022" },
    { label: "Portfolio", url: "https://venkata-fullstack.vercel.app" },
  ],
};

/**
 * One summary per role family. Every claim (and every number) must come from
 * the cited facts; the studio flags a summary whose numbers are not in them.
 */
export const SUMMARIES: Record<RoleFamily, { text: string; factIds: string[] }> = {
  fullstack: {
    text: "Full stack developer building production web platforms with Node.js, TypeScript and React. Built 19+ microservices and 20+ REST APIs for a production IoT monitoring platform and reduced system downtime by 70%. Now ships real-time booking and fleet operations features for an EV rental platform at Hala Mobility.",
    factIds: ["exp.stratosfy.p1", "exp.stratosfy.p2", "exp.stratosfy.p4", "exp.hala-mobility.p3", "exp.hala-mobility.p4"],
  },
  backend: {
    text: "Backend-focused software developer building Node.js and TypeScript services. Built 19+ microservices and 20+ REST APIs for production IoT telemetry, and reduced system downtime by 70% through data modeling and aggregation work. Currently builds real-time booking and rental processing at Hala Mobility.",
    factIds: ["exp.stratosfy.p1", "exp.stratosfy.p2", "exp.stratosfy.p4", "exp.hala-mobility.p3"],
  },
  frontend: {
    text: "Software developer building React and Next.js products on top of Node.js and TypeScript services. Built REST APIs behind operational dashboards for a production IoT platform, and contributes to the executive app and service workflows for an EV rental platform at Hala Mobility.",
    factIds: ["exp.stratosfy.p2", "exp.hala-mobility.p5"],
  },
  ai: {
    text: "Full stack developer with hands-on AI work: an NLP voice assistant published on Zenodo, and TalentVault AI, a Gemini-powered resume extraction app on Next.js and Supabase. Built 19+ microservices and 20+ REST APIs in production with Node.js and TypeScript.",
    factIds: ["pub.jarvis-ai-assistant", "proj.talentvault-ai", "proj.talentvault-ai.h1", "exp.stratosfy.p1", "exp.stratosfy.p2"],
  },
  mobile: {
    text: "Software developer shipping mobile and backend features with Flutter and Node.js. Deployed features to live Stratosfy mobile apps and built 20+ REST APIs behind them, and built DuelDots, a Flutter multiplayer game live on Google Play.",
    factIds: ["exp.stratosfy.p3", "exp.stratosfy.p2", "proj.duel-dots", "proj.duel-dots.m1", "proj.duel-dots.m3"],
  },
};
