export type Publication = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  venue: string;
  year: string;
  url: string;
  researchAreas: string[];
  tags: string[];
};

/** Source of truth for the Publications section and the resume builder. */
export const publications: Publication[] = [
  {
    id: "jarvis-ai-assistant",
    title: "Jarvis AI Assistant",
    subtitle:
      "Jarvis: AI-Powered Voice Genie — research paper on NLP-driven voice automation",
    summary:
      "Research publication documenting an NLP-based voice assistant with speech recognition, command routing, API automation, and text-to-speech response pipeline for hands-free productivity workflows.",
    venue: "Zenodo",
    year: "2025",
    url: "https://zenodo.org/records/15123556",
    researchAreas: ["NLP", "Voice Interfaces", "AI Automation", "Speech Recognition"],
    tags: ["Python", "NLP", "Speech Recognition", "Automation APIs"],
  },
];
