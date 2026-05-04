import SectionShell from "../components/SectionShell";

const contactLinks = [
  { label: "Email", href: "mailto:venkatasubbaiah5022@gmail.com?subject=Freelance%20Project%20Inquiry" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aitha-venkata-subbaiah-setty/" },
  { label: "GitHub", href: "https://github.com/VenkataSubbaiah5022" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~017b9a8b315e94f07a?mp_source=share" }
];

export default function ContactSection() {
  return (
    <SectionShell id="contact" eyebrow="Contact" title="Drop a line - I reply within 24 hours">
      <div className="contact-grid">
        <div className="contact-card">
          <p>
            Open to Backend / MERN Full Stack opportunities and freelance contracts. Best for APIs, backend systems, and
            production-facing full stack delivery.
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
            <a className="btn btn--primary" href="/resume.pdf" target="_blank" rel="noreferrer">
              Download Resume
            </a>
            <a
              className="btn btn--ghost"
              href="https://www.upwork.com/freelancers/~017b9a8b315e94f07a?mp_source=share"
              target="_blank"
              rel="noreferrer"
            >
              Hire me on Upwork
            </a>
          </div>
          <p className="contact-note">Availability: Backend / Full Stack roles, freelance, and contract-to-hire.</p>
        </div>

       
      </div>
    </SectionShell>
  );
}
