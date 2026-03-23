import SectionShell from "../components/SectionShell";

const groups = [
  {
    title: "Frontend",
    skills: ["React.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "Python", "REST APIs", "Jest", "Pytest"]
  },
  {
    title: "Databases & DevOps",
    skills: ["MongoDB", "MySQL", "Docker", "GCP", "GitHub Actions", "Bitbucket Pipelines"]
  },
  {
    title: "Concepts",
    skills: ["Microservices", "Real-Time Systems", "CI/CD", "IoT Platforms", "Agile/Scrum"]
  }
];

export default function SkillsSection() {
  return (
    <SectionShell id="skills" eyebrow="Capabilities" title="Technical stack">
      <div className="skills-grid">
        {groups.map((group) => (
          <section className="skills-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="tag-row">
              {group.skills.map((skill) => (
                <span className="tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </SectionShell>
  );
}
