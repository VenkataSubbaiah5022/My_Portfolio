import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { EducationSection } from "@/components/EducationSection";
import { EngineeringChallengesSection } from "@/components/EngineeringChallengesSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { GitHubProofSection } from "@/components/GitHubProofSection";
import { HeroSection } from "@/components/HeroSection";
import { HowIBuildSection } from "@/components/HowIBuildSection";
import { LinkedInWritingSection } from "@/components/LinkedInWritingSection";
import { Navbar } from "@/components/Navbar";
import { ProjectsSection } from "@/components/ProjectsSection";
import { PublicationsSection } from "@/components/PublicationsSection";
import { QuickActionsFab } from "@/components/QuickActionsFab";
import { RecommendationsSection } from "@/components/RecommendationsSection";
import { SectionViewTracker } from "@/components/SectionViewTracker";
import { ServicesSection } from "@/components/ServicesSection";
import { SkillsSection } from "@/components/SkillsSection";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground antialiased">
      <Navbar />
      {/* Order matches navbar: Home → About → Tech → Projects → Career → Why me → Process → Services → Contact */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <PublicationsSection />
      <EngineeringChallengesSection />
      <ExperienceSection />
      <RecommendationsSection />
      <LinkedInWritingSection />
      <EducationSection />
      <HowIBuildSection />
      <GitHubProofSection />
      <ServicesSection />
      <ContactSection />
      <QuickActionsFab />
      <SectionViewTracker />
    </main>
  );
}
