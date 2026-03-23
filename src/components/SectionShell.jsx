import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function SectionShell({ id, eyebrow, title, children, className = "" }) {
  return (
    <motion.section
      id={id}
      className={`section-shell ${className}`.trim()}
      variants={itemVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="section-shell__head">
        {eyebrow ? <p className="section-shell__eyebrow">{eyebrow}</p> : null}
        {title ? <h2 className="section-shell__title">{title}</h2> : null}
      </div>
      {children}
    </motion.section>
  );
}
