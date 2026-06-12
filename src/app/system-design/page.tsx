import type { Metadata } from "next";
import { SystemDesignIndexView } from "@/components/SystemDesignIndexView";
import { Navbar } from "@/components/Navbar";
import { getSiteUrl, SITE_FULL_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "System Design — Architecture Deep Dives",
  description: `Production platform architecture by ${SITE_FULL_NAME} — anonymized IoT telemetry pipelines, multi-product microservices, diagrams, data flows, and engineering trade-offs.`,
  alternates: {
    canonical: `${getSiteUrl()}/system-design`,
  },
  openGraph: {
    title: `System Design | ${SITE_FULL_NAME}`,
    url: `${getSiteUrl()}/system-design`,
  },
};

export default function SystemDesignPage() {
  return (
    <main className="relative bg-background text-foreground antialiased">
      <Navbar />
      <SystemDesignIndexView />
    </main>
  );
}
