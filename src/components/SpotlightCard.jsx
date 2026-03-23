import { useRef } from "react";
import { motion } from "framer-motion";

export default function SpotlightCard({ children, className = "" }) {
  const cardRef = useRef(null);

  const onMove = (event) => {
    const element = cardRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    element.style.setProperty("--spot-x", `${x}px`);
    element.style.setProperty("--spot-y", `${y}px`);
  };

  const onLeave = () => {
    const element = cardRef.current;
    if (!element) return;
    element.style.setProperty("--spot-x", "-180px");
    element.style.setProperty("--spot-y", "-180px");
  };

  return (
    <motion.div
      ref={cardRef}
      className={`spotlight-card ${className}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
