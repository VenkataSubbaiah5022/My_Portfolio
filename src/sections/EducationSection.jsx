import SectionShell from "../components/SectionShell";

export default function EducationSection() {
  return (
    <SectionShell id="education" eyebrow="Education" title="Academic foundation">
      <div className="credentials-grid">
        <article className="credentials-block">
          <h3>B.Tech in Computer Science & Business Systems</h3>
          <ul>
            <li>Rajeev Gandhi Memorial College of Engineering & Technology</li>
            <li>2021 - 2025</li>
            <li>CGPA: 8.01 / 10</li>
          </ul>
        </article>
        <article className="credentials-block">
          <h3>Freelance Snapshot</h3>
          <ul>
            <li>Location base: India (remote-first)</li>
            <li>Open to worldwide freelance and contract projects</li>
            <li>Preferred stack: React, Node.js, TypeScript, Python, MongoDB</li>
          </ul>
        </article>
      </div>
    </SectionShell>
  );
}
