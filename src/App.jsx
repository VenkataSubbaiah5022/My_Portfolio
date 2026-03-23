import { motion } from "framer-motion";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import StatsSection from "./sections/StatsSection";
import ProjectsSection from "./sections/ProjectsSection";
import ExperienceSection from "./sections/ExperienceSection";
import SkillsSection from "./sections/SkillsSection";
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
  return (
    <div className="app">
      <div className="bg-layer" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <main>
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          <HeroSection />
          <AboutSection />
          <StatsSection />
          <ProjectsSection />
          <ExperienceSection />
          <SkillsSection />
          <ContactSection />
        </motion.div>
      </main>
    </div>
  );
}
