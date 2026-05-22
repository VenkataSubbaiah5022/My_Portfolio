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
import { SectionViewTracker } from "@/components/SectionViewTracker";
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
      <SectionViewTracker />
      <p className="mx-auto max-w-6xl px-4 pb-8 text-center text-[11px] text-muted-foreground">
        This site uses Google Analytics and Microsoft Clarity to understand traffic and
        improve the experience. No personal data is sold.
      </p>
    </main>
  );
}
