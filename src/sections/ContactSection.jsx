import SectionShell from "../components/SectionShell";

const contactLinks = [
  { label: "Email", href: "mailto:venkatasubbaiah5022@gmail.com?subject=Freelance%20Project%20Inquiry" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aitha-venkata-subbaiah-setty/" },
  { label: "GitHub", href: "https://github.com/VenkataSubbaiah5022" },
  { label: "WhatsApp", href: "https://wa.me/+919963132119" }
];

export default function ContactSection() {
  return (
    <SectionShell id="contact" eyebrow="Freelance" title="Available for contract work worldwide">
      <div className="contact-grid">
        <div className="contact-card">
          <p>
            I help startups and teams ship modern web products, APIs, and automation workflows. Open to remote freelance
            projects across all time zones.
          </p>
          <div className="service-pills">
            <span>Full Stack Product Builds</span>
            <span>API & Microservices</span>
            <span>Performance Optimization</span>
            <span>IoT Dashboards</span>
            <span>AI/NLP Integrations</span>
          </div>
          <div className="contact-links">
            {contactLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
          <div className="contact-cta-row">
            <a className="btn btn--primary" href="/assets/Venkata_Subbaiah_Resume.pdf" target="_blank" rel="noreferrer">
              Download Resume
            </a>
            <a className="btn btn--ghost" href="mailto:venkatasubbaiah5022@gmail.com">
              Direct Email
            </a>
          </div>
          <p className="contact-note">Availability: Remote freelance and contract projects worldwide.</p>
        </div>

       
      </div>
    </SectionShell>
  );
}
