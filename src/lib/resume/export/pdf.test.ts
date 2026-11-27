import { inflateSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import { buildMatchReport, buildResume, trimOnce } from "@/lib/resume/engine";
import { fitToOnePage, pdfPageCount, renderResumePdf } from "@/lib/resume/export/pdf";
import { analyzeJobDescription } from "@/lib/resume/jd";
import { BACKEND_JD } from "@/lib/resume/test-fixtures";

/** Text drawn in each page's content stream, in drawing order. */
async function pdfText(blob: Blob): Promise<string> {
  const bytes = Buffer.from(await blob.arrayBuffer());
  const raw = bytes.toString("latin1");
  const parts: string[] = [];
  let at = 0;
  while ((at = raw.indexOf("\nstream\n", at)) !== -1) {
    const start = at + "\nstream\n".length;
    const end = raw.indexOf("\nendstream", start);
    if (end === -1) break;
    try {
      const content = inflateSync(bytes.subarray(start, end)).toString("latin1");
      for (const match of content.matchAll(/<([0-9a-fA-F]+)>/g)) {
        parts.push(Buffer.from(match[1], "hex").toString("latin1"));
      }
    } catch {
      // Not a deflated content stream (fonts, metadata).
    }
    at = end;
  }
  return parts.join("");
}

describe("resume PDF", () => {
  const jd = analyzeJobDescription(BACKEND_JD);
  const model = buildResume(jd, buildMatchReport(jd), { role: "Backend Engineer", company: "Acme" });

  it("fits on one page after trimming", async () => {
    const result = await fitToOnePage(model, trimOnce);
    expect(result.pages).toBe(1);
    expect(await pdfPageCount(await renderResumePdf(result.model))).toBe(1);
  });

  it("keeps sections in reading order for ATS parsers", async () => {
    const text = await pdfText(await renderResumePdf(model));
    const order = ["Aitha Venkata Subbaiah Setty", "SUMMARY", "SKILLS", "EXPERIENCE", "PROJECTS", "EDUCATION"].map(
      (heading) => text.indexOf(heading),
    );
    expect(order.every((index) => index >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("does not hyphenate URLs", async () => {
    const text = await pdfText(await renderResumePdf(model));
    expect(text).toContain("github.com/VenkataSubbaiah5022");
    expect(text).not.toMatch(/VenkataSub-/);
  });
});
