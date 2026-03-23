import SectionShell from "../components/SectionShell";

const groups = [
  {
    title: "Frontend",
    logos: [
      { src: "https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg", alt: "React.js" },
      { src: "https://www.vectorlogo.zone/logos/javascript/javascript-ar21.svg", alt: "JavaScript" },
      { src: "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-ar21.svg", alt: "TypeScript" },
      { src: "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-ar21.svg", alt: "HTML5" },
      { src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg", alt: "CSS3" }
    ],
    skills: ["Component-driven UI", "Modern ES6+ JavaScript", "Responsive web interfaces"]
  },
  {
    title: "Backend",
    logos: [
      { src: "https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg", alt: "Node.js" },
      { src: "https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg", alt: "Express.js" },
      { src: "https://www.vectorlogo.zone/logos/python/python-horizontal.svg", alt: "Python" }
    ],
    skills: ["REST APIs", "Testing: Jest", "Testing: Pytest"]
  },
  {
    title: "Databases & DevOps",
    logos: [
      { src: "https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg", alt: "MongoDB" },
      { src: "https://www.vectorlogo.zone/logos/mysql/mysql-horizontal.svg", alt: "MySQL" },
      { src: "https://www.vectorlogo.zone/logos/docker/docker-ar21.svg", alt: "Docker" },
      { src: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-ar21.svg", alt: "GCP" }
    ],
    skills: ["GitHub Actions", "Bitbucket Pipelines"]
  },
  {
    title: "Concepts",
    logos: [],
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
            {group.logos.length ? (
              <div className="skills-logo-grid" aria-label={`${group.title} logos`}>
                {group.logos.map((logo) => (
                  <div className="skills-logo-item" key={logo.alt} title={logo.alt} aria-label={logo.alt}>
                    <img src={logo.src} alt={logo.alt} loading="lazy" />
                  </div>
                ))}
              </div>
            ) : null}
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
