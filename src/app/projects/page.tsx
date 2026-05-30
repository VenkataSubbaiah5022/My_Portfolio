import type { Metadata } from "next";
import { AllProjectsView } from "@/components/AllProjectsView";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "All Projects | Aitha",
  description:
    "Explore full stack web applications, AI products, and realtime systems built by Aitha.",
};

export default function ProjectsPage() {
  return (
    <main className="relative text-foreground antialiased">
      <Navbar />
      <AllProjectsView />
    </main>
  );
}
