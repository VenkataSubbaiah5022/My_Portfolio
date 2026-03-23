import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionRail from "./components/SectionRail";
import ThreeBackground from "./components/ThreeBackground";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import EducationSection from "./sections/EducationSection";
import StatsSection from "./sections/StatsSection";
import ProjectsSection from "./sections/ProjectsSection";
import ExperienceSection from "./sections/ExperienceSection";
import SkillsSection from "./sections/SkillsSection";
import PublicationSection from "./sections/PublicationSection";
import CertificationsSection from "./sections/CertificationsSection";
import ContactSection from "./sections/ContactSection";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.05
    }
  }
};

export default function App() {
  const [enableThree, setEnableThree] = useState(false);

  useEffect(() => {
    let idleId;
    let timeoutId;
    let rafId;

    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => setEnableThree(true), { timeout: 1800 });
      } else {
        timeoutId = window.setTimeout(() => setEnableThree(true), 900);
      }
    };

    rafId = window.requestAnimationFrame(schedule);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      if (idleId && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="app">
      <div className="bg-layer" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-orb bg-orb--a" aria-hidden="true" />
      <div className="bg-orb bg-orb--b" aria-hidden="true" />
      <div className="bg-orb bg-orb--c" aria-hidden="true" />
      {enableThree ? <ThreeBackground /> : null}
      <SectionRail />
      <main>
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          <HeroSection />
          <AboutSection />
          <EducationSection />
          <StatsSection />
          <ProjectsSection />
          <ExperienceSection />
          <PublicationSection />
          <SkillsSection />
          <CertificationsSection />
          <ContactSection />
        </motion.div>
      </main>
    </div>
  );
}
