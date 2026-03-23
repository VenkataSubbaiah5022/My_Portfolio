import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", as: Comp = "article" }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={`glass-card ${className}`.trim()}
    >
      <Comp>{children}</Comp>
    </motion.div>
  );
}
