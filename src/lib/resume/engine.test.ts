import { describe, expect, it } from "vitest";
import { resumePlainText, atsCheck } from "@/lib/resume/ats";
import {
  buildMatchReport,
  buildResume,
  checkLine,
  resumeFileName,
  trimOnce,
  type ResumeModel,
} from "@/lib/resume/engine";
import { factsById } from "@/lib/resume/facts";
import { analyzeJobDescription } from "@/lib/resume/jd";
import { SUMMARIES } from "@/lib/resume/profile";
import { AI_JD, BACKEND_JD, FRONTEND_JD } from "@/lib/resume/test-fixtures";
import { BULLET_VARIANTS } from "@/lib/resume/variants";

function build(text: string) {
  const jd = analyzeJobDescription(text);
  const report = buildMatchReport(jd);
  return { jd, report, model: buildResume(jd, report, { role: "Backend Engineer", company: "Acme Labs" }) };
}

const allBullets = (model: ResumeModel) => [...model.experience, ...model.projects].flatMap((e) => e.bullets);

describe("buildResume truthfulness", () => {
  for (const [name, text] of Object.entries({ BACKEND_JD, FRONTEND_JD, AI_JD })) {
    it(`uses only stored facts for ${name}`, () => {
      const { model } = build(text);
      for (const bullet of allBullets(model)) {
        const fact = factsById.get(bullet.factIds[0]);
        expect(fact, bullet.key).toBeDefined();
        const variants = Object.values(BULLET_VARIANTS[bullet.key] ?? {});
        expect([fact!.text, ...variants]).toContain(bullet.text);
        expect(checkLine(bullet.text, bullet.originalText, bullet.factIds)).toEqual([]);
      }
    });
  }

  it("never puts a gap skill on the resume", () => {
    const { model, report } = build(BACKEND_JD);
    const text = resumePlainText(model);
    for (const item of report.items.filter((i) => i.status === "gap")) {
      expect(text).not.toContain(item.skill.name);
    }
  });

  it("keeps every summary's numbers inside its cited facts", () => {
    for (const summary of Object.values(SUMMARIES)) {
      expect(checkLine(summary.text, summary.text, summary.factIds)).toEqual([]);
    }
  });

  it("keeps every role, newest first, with dates", () => {
    const { model } = build(BACKEND_JD);
    expect(model.experience.map((e) => e.id)).toEqual([
      "exp.hala-mobility",
      "exp.stratosfy",
      "exp.chegg",
      "exp.rk-microns",
    ]);
    expect(model.experience.every((e) => /\d{4}/.test(e.dates))).toBe(true);
  });
});

describe("checkLine", () => {
  const fact = "exp.stratosfy.p4";
  const original = factsById.get(fact)!.text;

  it("flags an edit and a number the fact doesn't have", () => {
    expect(checkLine("Reduced downtime by 90%", original, [fact])).toEqual(["edited", "unsupported-number"]);
  });

  it("allows an edit that keeps the fact's numbers", () => {
    expect(checkLine("Cut system downtime by 70% with better data models.", original, [fact])).toEqual(["edited"]);
  });

  it("flags a line with no known fact", () => {
    expect(checkLine("Anything", "Anything", ["exp.nope.p1"])).toEqual(["missing-fact"]);
  });
});

describe("trimOnce", () => {
  it("hides the lowest-scoring bullet and keeps two on the current role", () => {
    let model: ResumeModel | null = build(BACKEND_JD).model;
    let last = model;
    while (model) {
      last = model;
      model = trimOnce(model);
    }
    const current = last.experience[0].bullets.filter((b) => !b.hidden);
    expect(current).toHaveLength(2);
    expect(last.projects.filter((p) => !p.hidden)).toHaveLength(1);
  });
});

describe("resumeFileName", () => {
  it("builds a clean file name", () => {
    expect(resumeFileName(build(BACKEND_JD).model, "pdf")).toBe(
      "Aitha_Venkata_Subbaiah_Backend_Engineer_Acme_Labs.pdf",
    );
  });
});

describe("atsCheck", () => {
  it("passes a freshly built resume", () => {
    const { model, report } = build(BACKEND_JD);
    const check = atsCheck(model, report);
    expect(check.keywordPct).toBe(100);
    expect(check.warnings).toEqual([]);
  });

  it("catches an empty summary, a long bullet and a weak opening", () => {
    const { model, report } = build(BACKEND_JD);
    model.summary.text = "";
    model.experience[1].bullets[0].text = `responsible for ${"building services ".repeat(14)}`;
    const messages = atsCheck(model, report).warnings.map((w) => w.message).join("\n");
    expect(messages).toMatch(/Summary is empty/);
    expect(messages).toMatch(/Over 2 lines/);
    expect(messages).toMatch(/action verb/);
  });

  it("flags a keyword repeated in most sentences", () => {
    const { model, report } = build(BACKEND_JD);
    model.summary.text = "Node.js developer who loves Node.js.";
    for (const entry of model.experience) {
      for (const b of entry.bullets) b.text = `Built Node.js services in Node.js (${b.key}).`;
    }
    expect(atsCheck(model, report).warnings.map((w) => w.message).join("\n")).toMatch(/Node\.js.*stuffing/);
  });
});
