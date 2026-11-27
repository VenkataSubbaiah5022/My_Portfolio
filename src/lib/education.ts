export type Education = {
  id: string;
  degree: string;
  institution: string;
  shortName: string;
  url: string;
  logo: string;
  graduationYear: string;
  cgpa: string;
  highlights: string[];
};

/** Source of truth for the About section's education card and the resume builder. */
export const education: Education[] = [
  {
    id: "rgmcet",
    degree: "B.Tech — Computer Science & Engineering (Business Systems)",
    institution: "Rajeev Gandhi Memorial College of Engineering and Technology",
    shortName: "RGMCET",
    url: "https://www.rgmcet.edu.in/",
    logo: "/education/rgmcet-logo.png",
    graduationYear: "2025",
    cgpa: "8.01",
    highlights: ["Class Representative (60+ students)"],
  },
];
