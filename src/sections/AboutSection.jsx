import SectionShell from "../components/SectionShell";

export default function AboutSection() {
  return (
    <SectionShell id="about" eyebrow="Profile" title="Engineer who treats latency like a feature">
      <div className="about-grid">
        <p>
          MERN Full Stack Developer (backend-focused) with production ownership across architecture, APIs, and
          performance on IoT and real-time systems.
        </p>
        <p>
          I design APIs for reliability first: idempotency, retry logic, observability, and latency budgets that keep
          systems stable under production load.
        </p>
      </div>
      <div className="about-highlights">
        <span>MERN Architecture</span>
        <span>Node.js Microservices</span>
        <span>Sub-100ms API p95</span>
        <span>Idempotent API Design</span>
        <span>Rate Limits + Retries</span>
        <span>Observability Mindset</span>
      </div>
    </SectionShell>
  );
}
