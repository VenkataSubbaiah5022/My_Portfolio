import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ProjectsSection } from "@/components/ProjectsSection";
import { QuickActionsFab } from "@/components/QuickActionsFab";
import { SkillsSection } from "@/components/SkillsSection";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground antialiased">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
      <QuickActionsFab />
    </main>
  );
}
