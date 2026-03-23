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
    concepts: [
      { label: "Microservices", icon: "nodes" },
      { label: "Real-Time Systems", icon: "boltclock" },
      { label: "CI/CD", icon: "pipeline" },
      { label: "IoT Platforms", icon: "antenna" },
      { label: "Agile/Scrum", icon: "scrum" }
    ]
  }
];

function ConceptGlyph({ type }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 26 26",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };

  const stroke = "currentColor";
  const strokeWidth = 2;
  const strokeLinecap = "round";
  const strokeLinejoin = "round";

  if (type === "nodes") {
    return (
      <svg {...common}>
        <path d="M6.5 8.2L13 5.5L19.5 8.2V17.8L13 20.5L6.5 17.8V8.2Z" stroke={stroke} strokeWidth={strokeWidth} />
        <path d="M13 5.5V20.5" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} />
        <path d="M6.5 8.2L19.5 8.2" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} />
      </svg>
    );
  }

  if (type === "boltclock") {
    return (
      <svg {...common}>
        <circle cx="13" cy="13" r="8" stroke={stroke} strokeWidth={strokeWidth} />
        <path d="M13 8.5V13L15.8 14.2" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} />
        <path
          d="M9.2 20.4L11 16.6H8.7L10.4 12.8L15.2 12.8L12.8 17.1H15.1L12.9 20.4H9.2Z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin={strokeLinejoin}
        />
      </svg>
    );
  }

  if (type === "pipeline") {
    return (
      <svg {...common}>
        <path d="M6 8.2H12.2L13.8 10.2H20" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} />
        <path d="M6 17.8H12.2L13.8 15.8H20" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} />
        <path d="M12.7 10.1V15.9" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} />
        <path d="M19 10.2L21 8.2L23 10.2" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} />
      </svg>
    );
  }

  if (type === "antenna") {
    return (
      <svg {...common}>
        <path d="M13 4.8V14.2" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} />
        <path d="M10 9.6C12 7.6 14 7.6 16 9.6" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} />
        <path d="M7.3 12.4C10.1 9.6 15.9 9.6 18.7 12.4" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} />
        <circle cx="13" cy="18.1" r="2.1" stroke={stroke} strokeWidth={strokeWidth} />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M7 18.6L13 12.6L19 18.6" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} />
      <path d="M9.2 8.6H16.8" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} />
      <path d="M11.2 6.6H14.8" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} />
      <path d="M8.2 21H17.8" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} />
    </svg>
  );
}

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
            {group.title === "Concepts" ? (
              <div className="concept-grid">
                {group.concepts.map((c) => (
                  <div key={c.label} className="concept-item" title={c.label} aria-label={c.label}>
                    <div className="concept-icon">
                      <ConceptGlyph type={c.icon} />
                    </div>
                    <div className="concept-label">{c.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="tag-row">
                {group.skills.map((skill) => (
                  <span className="tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </SectionShell>
  );
}
