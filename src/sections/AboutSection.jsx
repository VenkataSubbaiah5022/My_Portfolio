import SectionShell from "../components/SectionShell";

export default function AboutSection() {
  return (
    <SectionShell id="about" eyebrow="Profile" title="Building high-impact, real-world software">
      <div className="about-grid">
        <p>
          Full Stack Developer with strong ownership across frontend, backend, and deployments. I have delivered a
          production IoT monitoring platform using React.js, Node.js (TypeScript), Python, and MongoDB.
        </p>
        <p>
          My core strengths are microservices, real-time data systems, performance optimization, and shipping practical
          products fast. I also published peer-reviewed AI/NLP research in 2025.
        </p>
      </div>
    </SectionShell>
  );
}
