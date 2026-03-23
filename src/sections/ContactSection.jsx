import SectionShell from "../components/SectionShell";

const contactLinks = [
  { label: "Email", href: "mailto:venkatasubbaiah5022@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aitha-venkata-subbaiah-setty/" },
  { label: "GitHub", href: "https://github.com/VenkataSubbaiah5022" },
  { label: "WhatsApp", href: "https://wa.me/+919963132119" }
];

export default function ContactSection() {
  return (
    <SectionShell id="contact" eyebrow="Let's Build" title="Open to full-time roles and impactful collaborations">
      <div className="contact-card">
        <p>
          If you are hiring for full stack engineering, IoT systems, or modern web platforms, I would love to connect.
        </p>
        <div className="contact-links">
          {contactLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
        <a className="btn btn--primary" href="/assets/Venkata_Subbaiah_Resume.pdf" target="_blank" rel="noreferrer">
          Download Resume
        </a>
      </div>
    </SectionShell>
  );
}
