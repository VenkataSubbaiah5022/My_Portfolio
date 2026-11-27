import { describe, expect, it } from "vitest";
import { compareResumes } from "@/lib/resume/compare";
import { buildMatchReport, buildResume } from "@/lib/resume/engine";
import { analyzeJobDescription } from "@/lib/resume/jd";
import { AI_JD, BACKEND_JD } from "@/lib/resume/test-fixtures";

const build = (text: string) => {
  const jd = analyzeJobDescription(text);
  return buildResume(jd, buildMatchReport(jd), { role: "Engineer", company: "Acme" });
};

describe("compareResumes", () => {
  it("finds nothing different between identical resumes", () => {
    const model = build(BACKEND_JD);
    const diff = compareResumes(model, structuredClone(model));
    expect(diff).toMatchObject({ summaryChanged: false, onlyA: [], onlyB: [], projectsOnlyA: [], projectsOnlyB: [] });
    expect(diff.shared).toBeGreaterThan(0);
  });

  it("reports a hidden line and a different summary", () => {
    const a = build(BACKEND_JD);
    const b = structuredClone(a);
    const hidden = b.experience[1].bullets.find((x) => !x.hidden)!;
    hidden.hidden = true;
    b.summary.text = "Different summary.";
    const diff = compareResumes(a, b);
    expect(diff.summaryChanged).toBe(true);
    expect(diff.onlyA).toEqual([hidden.text]);
    expect(diff.onlyB).toEqual([]);
  });

  it("shows different project picks for different job descriptions", () => {
    const diff = compareResumes(build(BACKEND_JD), build(AI_JD));
    expect(diff.projectsOnlyA.length + diff.projectsOnlyB.length).toBeGreaterThan(0);
  });
});
