import type { Metadata } from "next";
import { AllCertificationsView } from "@/components/AllCertificationsView";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { getCertificationsPageJsonLd } from "@/lib/seo";
import { getSiteUrl, SITE_FULL_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Certifications — Developer Credentials",
  description: `Verified developer certifications for ${SITE_FULL_NAME} — HackerRank React, SQL, NPTEL cloud & IoT, IBM Python, AWS Educate, MongoDB University, and more.`,
  alternates: {
    canonical: `${getSiteUrl()}/certifications`,
  },
  openGraph: {
    title: `Certifications | ${SITE_FULL_NAME} — Full Stack Developer`,
    url: `${getSiteUrl()}/certifications`,
  },
};

export default function CertificationsPage() {
  return (
    <>
      <JsonLd data={getCertificationsPageJsonLd()} />
      <main className="relative bg-background text-foreground antialiased">
        <Navbar />
        <AllCertificationsView />
      </main>
    </>
  );
}
