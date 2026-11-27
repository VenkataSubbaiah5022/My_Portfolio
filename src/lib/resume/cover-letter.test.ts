import { describe, expect, it } from "vitest";
import { buildCoverLetter } from "@/lib/resume/cover-letter";
import { buildMatchReport, buildResume } from "@/lib/resume/engine";
import { factsById } from "@/lib/resume/facts";
import { analyzeJobDescription } from "@/lib/resume/jd";
import { BACKEND_JD } from "@/lib/resume/test-fixtures";

function letter() {
  const jd = analyzeJobDescription(BACKEND_JD);
  const report = buildMatchReport(jd);
  const model = buildResume(jd, report, { role: "Backend Engineer", company: "Acme Logistics" });
  return { report, letter: buildCoverLetter(model, report) };
}

describe("buildCoverLetter", () => {
  it("addresses the company and role", () => {
    const { letter: l } = letter();
    expect(l.text).toMatch(/^Dear Acme Logistics hiring team,/);
    expect(l.text).toContain("the Backend Engineer role at Acme Logistics");
    expect(l.text).toContain("Software Developer at Hala Mobility");
  });

  it("uses only numbers from the cited facts", () => {
    const { letter: l } = letter();
    const sourceNumbers = new Set(l.factIds.flatMap((id) => factsById.get(id)?.text.match(/\d+(?:\.\d+)?/g) ?? []));
    const body = l.text.split("\n\n").slice(1, -1).join(" ");
    for (const n of body.match(/\d+(?:\.\d+)?/g) ?? []) expect(sourceNumbers).toContain(n);
  });

  it("never names a skill the portfolio can't back", () => {
    const { letter: l, report } = letter();
    for (const item of report.items.filter((i) => i.status === "gap")) {
      expect(l.text).not.toContain(item.skill.spelling);
    }
  });
});
