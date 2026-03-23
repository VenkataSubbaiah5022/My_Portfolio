import SectionShell from "../components/SectionShell";

const certifications = [
  "NPTEL: Cloud Computing (2024)",
  "NPTEL: Introduction to IoT (2024)",
  "NPTEL: Soft Skills (2024)",
  "Postman API Fundamentals Expert (2025)",
  "IBM Python Certification (2026)",
  "MongoDB Badges (7x) - GFG x MongoDB (2026)"
];

const leadership = ["Class Representative (2021-2025)", "Anti-Ragging Squad Member"];

export default function CertificationsSection() {
  return (
    <SectionShell id="certifications" eyebrow="Credentials" title="Certifications and leadership">
      <div className="credentials-grid">
        <article className="credentials-block">
          <h3>Certifications</h3>
          <ul>
            {certifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="credentials-block">
          <h3>Leadership</h3>
          <ul>
            {leadership.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="credentials-note">
            Trusted to coordinate class-level initiatives and maintain student engagement throughout the program.
          </p>
        </article>
      </div>
    </SectionShell>
  );
}
