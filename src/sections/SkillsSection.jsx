import SectionShell from "../components/SectionShell";
import {
  FaCodeBranch,
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaDatabase,
  FaCloud,
  FaMicrochip
} from "react-icons/fa";


const groups = [
  {
    icon: FaReact,
    title: "Frontend",
    skills: ["React.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"]
  },
  {
    icon: FaNodeJs,
    title: "Backend",
    skills: ["Node.js", "Express.js", "Python", "REST APIs", "Jest", "Pytest"]
  },
  {
    icon: FaDatabase,
    title: "Databases & DevOps",
    skills: ["MongoDB", "MySQL", "Docker", "GCP", "GitHub Actions", "Bitbucket Pipelines"]
  },
  {
    icon: FaMicrochip,
    title: "Concepts",
    skills: ["Microservices", "Real-Time Systems", "CI/CD", "IoT Platforms", "Agile/Scrum"]
  }
];

const stackIcons = [
  { src: "https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg", alt: "React" },
  { src: "https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg", alt: "Node.js" },
  { src: "https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg", alt: "Express.js" },
  { src: "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-ar21.svg", alt: "TypeScript" },
  { src: "https://www.vectorlogo.zone/logos/python/python-horizontal.svg", alt: "Python" },
  { src: "https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg", alt: "MongoDB" },
  { src: "https://www.vectorlogo.zone/logos/mysql/mysql-horizontal.svg", alt: "MySQL" },
  { src: "https://www.vectorlogo.zone/logos/docker/docker-ar21.svg", alt: "Docker" },
  { src: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-ar21.svg", alt: "GCP" }
];

export default function SkillsSection() {
  return (
    <SectionShell id="skills" eyebrow="Capabilities" title="Technical stack">
      <div className="stack-icon-grid">
        {stackIcons.map(({ src, alt }) => (
          <div className="stack-icon-item" key={alt} title={alt} aria-label={alt}>
            <img src={src} alt={alt} loading="lazy" />
          </div>
        ))}
      </div>
      <div className="skills-grid">
        {groups.map((group) => (
          <section className="skills-group" key={group.title}>
            <h3>
              <group.icon />
              {group.title}
            </h3>
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
