import SectionShell from "../components/SectionShell";
import GlassCard from "../components/GlassCard";

export default function PublicationSection() {
  return (
    <SectionShell id="publication" eyebrow="Research" title="Peer-reviewed publication">
      <GlassCard>
        <article className="publication-card">
          <p className="publication-card__venue">Periodico di Mineralogia · Vol. 94 · 2025</p>
          <h3>Jarvis: AI-Powered Voice Genie</h3>
          <p>
            Published research on AI-powered voice assistance for accessibility and automation, covering speech
            recognition, NLP intent flow, and practical system-control actions.
          </p>
          <div className="publication-card__actions">
            <a href="https://zenodo.org/records/15123556" target="_blank" rel="noreferrer" className="btn btn--primary">
              Read Publication
            </a>
            <a href="https://github.com/VenkataSubbaiah5022" target="_blank" rel="noreferrer" className="btn btn--ghost">
              Related GitHub Work
            </a>
          </div>
        </article>
      </GlassCard>
    </SectionShell>
  );
}
