import type { Metadata } from "next";
import { AllCertificationsView } from "@/components/AllCertificationsView";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Professional certifications and credentials — HackerRank, NPTEL, IBM, AWS Educate, MongoDB University, and more.",
};

export default function CertificationsPage() {
  return (
    <main className="relative bg-background text-foreground antialiased">
      <Navbar />
      <AllCertificationsView />
    </main>
  );
}
