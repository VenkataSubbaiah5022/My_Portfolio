import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  TabStopType,
  TextRun,
} from "docx";
import type { ResumeModel } from "@/lib/resume/engine";
import { visibleResume } from "@/lib/resume/export/layout";

/* A4 with 0.6 in margins, in twips (1 in = 1440). */
const PAGE_WIDTH = 11906;
const MARGIN = 864;
const RIGHT_TAB = PAGE_WIDTH - MARGIN * 2;
const FONT = "Calibri";
const BODY = 21; // half-points → 10.5 pt

const run = (text: string, options: { bold?: boolean; size?: number } = {}) =>
  new TextRun({ text, font: FONT, size: options.size ?? BODY, bold: options.bold });

const heading = (title: string) =>
  new Paragraph({
    spacing: { before: 180, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "444444", space: 1 } },
    children: [run(title.toUpperCase(), { bold: true, size: 22 })],
  });

const bullet = (text: string) =>
  new Paragraph({ bullet: { level: 0 }, spacing: { after: 20 }, children: [run(text)] });

/** "Left text<TAB>right text" with the right part flush to the margin. */
const splitLine = (left: TextRun[], right: string) =>
  new Paragraph({
    spacing: { before: 80 },
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
    children: [...left, run(`\t${right}`)],
  });

/** A plain letter: one paragraph per blank-line-separated block, same page setup as the resume. */
export function renderCoverLetterDocx(text: string, author: string): Promise<Blob> {
  const paragraphs = text.split(/\n{2,}/).map(
    (block) =>
      new Paragraph({
        spacing: { after: 200 },
        children: block.split("\n").map((line, i) => new TextRun({ text: line, font: FONT, size: 22, break: i ? 1 : 0 })),
      }),
  );
  const doc = new Document({
    creator: author,
    title: `${author} — Cover letter`,
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE_WIDTH, height: 16838 },
            margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 },
          },
        },
        children: paragraphs,
      },
    ],
  });
  return Packer.toBlob(doc);
}

export function renderResumeDocx(model: ResumeModel): Promise<Blob> {
  const r = visibleResume(model);
  const children: Paragraph[] = [
    new Paragraph({ children: [run(r.name, { bold: true, size: 34 })] }),
    new Paragraph({ children: [run(r.headline, { size: 22 })] }),
    new Paragraph({ children: [run(r.contactLine, { size: 18 })] }),

    heading("Summary"),
    new Paragraph({ alignment: AlignmentType.LEFT, children: [run(r.summary)] }),

    heading("Skills"),
    ...r.skills.map(
      (group) => new Paragraph({ children: [run(`${group.title}: `, { bold: true }), run(group.items.join(", "))] }),
    ),

    heading("Experience"),
    ...r.experience.flatMap((role) => [
      splitLine([run(role.heading, { bold: true }), run(` — ${role.subheading}`)], role.dates),
      ...role.bullets.map(bullet),
    ]),
  ];

  if (r.projects.length) {
    children.push(
      heading("Projects"),
      ...r.projects.flatMap((project) => [
        new Paragraph({
          spacing: { before: 80 },
          children: [
            run(project.heading, { bold: true }),
            run(` — ${project.subheading}${project.link ? ` | ${project.link}` : ""}`),
          ],
        }),
        ...project.bullets.map(bullet),
      ]),
    );
  }

  children.push(
    heading("Education"),
    ...r.education.flatMap((school) => [
      splitLine([run(school.heading, { bold: true })], school.dates),
      new Paragraph({ children: [run(`${school.subheading} · ${school.detail}`)] }),
    ]),
  );

  if (r.certifications.length) {
    children.push(heading("Certifications"), ...r.certifications.map(bullet));
  }

  const doc = new Document({
    creator: r.name,
    title: `${r.name} — ${r.headline}`,
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE_WIDTH, height: 16838 },
            margin: { top: 720, bottom: 720, left: MARGIN, right: MARGIN },
          },
        },
        children,
      },
    ],
  });
  return Packer.toBlob(doc);
}
