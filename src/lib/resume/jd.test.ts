import { describe, expect, it } from "vitest";
import { analyzeJobDescription } from "@/lib/resume/jd";
import { AI_JD, BACKEND_JD, FRONTEND_JD } from "@/lib/resume/test-fixtures";

const requirement = (jd: ReturnType<typeof analyzeJobDescription>, name: string) =>
  jd.skills.find((skill) => skill.name === name)?.requirement;

describe("analyzeJobDescription", () => {
  it("splits must-haves from nice-to-haves by section", () => {
    const jd = analyzeJobDescription(BACKEND_JD);
    expect(requirement(jd, "Node.js")).toBe("must");
    expect(requirement(jd, "Kafka")).toBe("nice");
    expect(requirement(jd, "GraphQL")).toBe("nice");
    expect(jd.minYears).toBe(2);
  });

  it("treats an inline 'Must have:' line as required", () => {
    expect(requirement(analyzeJobDescription(AI_JD), "NLP")).toBe("must");
  });

  it("does not let a requirement line ending in 'preferred' change the section", () => {
    const jd = analyzeJobDescription("Requirements:\n- Experience with Kafka preferred\n- Strong Node.js");
    expect(requirement(jd, "Kafka")).toBe("nice");
    expect(requirement(jd, "Node.js")).toBe("must");
  });

  it("detects the role family", () => {
    expect(analyzeJobDescription(BACKEND_JD).family).toBe("backend");
    expect(analyzeJobDescription(FRONTEND_JD).family).toBe("frontend");
    expect(analyzeJobDescription(AI_JD).family).toBe("ai");
  });

  it("lists unknown tech-looking terms without repeating known skills", () => {
    const jd = analyzeJobDescription(FRONTEND_JD);
    expect(jd.otherKeywords).toContain("WCAG");
    expect(jd.otherKeywords).not.toContain("ReactJS");
  });
});
