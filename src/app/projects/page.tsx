import type { Metadata } from "next";
import { AllProjectsView } from "@/components/AllProjectsView";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "All Projects",
  description:
    "Explore full stack web applications, AI products, Tableau dashboards, and realtime systems by Aitha Venkata Subbaiah.",
};

export default function ProjectsPage() {
  return (
    <main className="relative text-foreground antialiased">
      <Navbar />
      <AllProjectsView />
    </main>
  );
}
