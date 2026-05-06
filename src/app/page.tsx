import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { EngineeringChallengesSection } from "@/components/EngineeringChallengesSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { GitHubProofSection } from "@/components/GitHubProofSection";
import { HeroSection } from "@/components/HeroSection";
import { HowIBuildSection } from "@/components/HowIBuildSection";
import { Navbar } from "@/components/Navbar";
import { ProjectsSection } from "@/components/ProjectsSection";
import { PublicationsSection } from "@/components/PublicationsSection";
import { QuickActionsFab } from "@/components/QuickActionsFab";
import { SkillsSection } from "@/components/SkillsSection";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground antialiased">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <EngineeringChallengesSection />
      <HowIBuildSection />
      <PublicationsSection />
      <GitHubProofSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
      <QuickActionsFab />
    </main>
  );
}
