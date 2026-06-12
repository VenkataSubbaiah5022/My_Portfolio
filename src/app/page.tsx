import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { EngineeringChallengesSection } from "@/components/EngineeringChallengesSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { GitHubProofSection } from "@/components/GitHubProofSection";
import { HeroSection } from "@/components/HeroSection";
import { JsonLd } from "@/components/JsonLd";
import { LinkedInWritingSection } from "@/components/LinkedInWritingSection";
import { Navbar } from "@/components/Navbar";
import { ProcessSection } from "@/components/ProcessSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { PublicationsSection } from "@/components/PublicationsSection";
import { QuickActionsFab } from "@/components/QuickActionsFab";
import { RecommendationsSection } from "@/components/RecommendationsSection";
import { SectionViewTracker } from "@/components/SectionViewTracker";
import { ServicesSection } from "@/components/ServicesSection";
import { SkillsSection } from "@/components/SkillsSection";
import { SystemDesignSection } from "@/components/SystemDesignSection";
import { WhyMeSection } from "@/components/WhyMeSection";
import { getHomeJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={getHomeJsonLd()} />
      <main className="relative bg-background text-foreground antialiased">
        <Navbar />
        {/* Order matches navbar: Home → About → Tech → Projects → Career → Why me → Process → Services → Contact */}
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <SystemDesignSection />
        <PublicationsSection />
        <EngineeringChallengesSection />
        <ExperienceSection />
        <WhyMeSection />
        <RecommendationsSection />
        <LinkedInWritingSection />
        <ProcessSection />
        <GitHubProofSection />
        <ServicesSection />
        <ContactSection />
        <QuickActionsFab />
        <SectionViewTracker />
      </main>
    </>
  );
}
