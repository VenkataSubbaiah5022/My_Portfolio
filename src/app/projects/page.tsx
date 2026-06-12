import type { Metadata } from "next";
import { AllProjectsView } from "@/components/AllProjectsView";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { getProjectsPageJsonLd } from "@/lib/seo";
import { getSiteUrl, SITE_FULL_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects — Full Stack Developer Portfolio",
  description: `Explore production web apps, AI products, mobile apps, and realtime systems built by ${SITE_FULL_NAME}, a MERN stack and React developer in India.`,
  alternates: {
    canonical: `${getSiteUrl()}/projects`,
  },
  openGraph: {
    title: `Projects | ${SITE_FULL_NAME} — Full Stack Developer`,
    url: `${getSiteUrl()}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={getProjectsPageJsonLd()} />
      <main className="relative text-foreground antialiased">
        <Navbar />
        <AllProjectsView />
      </main>
    </>
  );
}
