import { useState } from "react";
import SectionShell from "../components/SectionShell";

const contactLinks = [
  { label: "Email", href: "mailto:venkatasubbaiah5022@gmail.com?subject=Freelance%20Project%20Inquiry" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aitha-venkata-subbaiah-setty/" },
  { label: "GitHub", href: "https://github.com/VenkataSubbaiah5022" },
  { label: "WhatsApp", href: "https://wa.me/+919963132119" }
];

export default function ContactSection() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const details = String(data.get("message") || "").trim();
    if (!name || !email || details.length < 20) return;
    try {
      const subject = encodeURIComponent(`Freelance Project Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nProject details:\n${details}\n\n---\nSent from portfolio contact form`
      );
      window.location.href = `mailto:venkatasubbaiah5022@gmail.com?subject=${subject}&body=${body}`;
      setStatus("success");
      setMessage("Your email draft has opened. Send it to reach me directly.");
    } catch {
      setStatus("error");
      setMessage("Email app could not open. Please write to: venkatasubbaiah5022@gmail.com");
    }
  };

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

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Start a project conversation</h3>
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" type="text" placeholder="Enter your name" required minLength={2} />

          <label htmlFor="email">Your email</label>
          <input id="email" name="email" type="email" placeholder="Enter your email" required />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Tell me about your opportunity..."
            required
            minLength={20}
          />

          <button className="btn btn--primary contact-submit" type="submit">
            Send via Email App
          </button>
          {message ? <p className={`contact-status contact-status--${status}`}>{message}</p> : null}
        </form>
      </div>
    </SectionShell>
  );
}
