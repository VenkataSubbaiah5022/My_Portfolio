import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const roles = [
  "Full Stack Developer",
  "IoT Platform Engineer",
  "React + Node.js Specialist",
  "TypeScript + Python Builder"
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aitha-venkata-subbaiah-setty/" },
  { label: "GitHub", href: "https://github.com/VenkataSubbaiah5022" },
  { label: "Email", href: "mailto:venkatasubbaiah5022@gmail.com" }
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero__content">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hero__eyebrow"
        >
          Hyderabad, India
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          Aitha Venkata <span>Subbaiah Setty</span>
        </motion.h1>
        <motion.p
          key={roles[roleIndex]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="hero__role"
        >
          {roles[roleIndex]}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="hero__summary"
        >
          I build production-grade applications that blend real-time systems, clean user experiences, and reliable
          backend architecture. Recent impact includes 70% downtime reduction and sub-100ms APIs on a live IoT platform.
        </motion.p>
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          <a className="btn btn--primary" href="/assets/Venkata_Subbaiah_Resume.pdf" target="_blank" rel="noreferrer">
            View Resume
          </a>
          <a className="btn btn--ghost" href="#contact">
            Contact Me
          </a>
        </motion.div>
        <motion.ul
          className="hero__socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </motion.ul>
        <div className="hero__metrics">
          <div>
            <strong>2024-26</strong>
            <span>Full-time Window</span>
          </div>
          <div>
            <strong>20+</strong>
            <span>Production APIs</span>
          </div>
          <div>
            <strong>19+</strong>
            <span>Microservices</span>
          </div>
        </div>
      </div>
      <motion.div
        className="hero__imageWrap"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.12 }}
      >
        <img className="hero__image" src="/assets/img/pic.png" alt="Aitha Venkata Subbaiah Setty portrait" />
      </motion.div>
    </section>
  );
}
