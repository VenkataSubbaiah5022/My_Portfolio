import { Document, Font, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import type { ResumeModel } from "@/lib/resume/engine";
import { visibleResume } from "@/lib/resume/export/layout";

// No hyphenation: a URL or email split with "-" across lines no longer parses as a link.
Font.registerHyphenationCallback((word) => [word]);

/* One column, one standard font, no tables, icons or images: what ATS parsers read reliably. */
const styles = StyleSheet.create({
  page: { paddingVertical: 36, paddingHorizontal: 43, fontFamily: "Helvetica", fontSize: 10, lineHeight: 1.3, color: "#111" },
  name: { fontFamily: "Helvetica-Bold", fontSize: 17 },
  headline: { fontSize: 11, marginTop: 2 },
  contact: { fontSize: 9, marginTop: 3, color: "#333" },
  section: { marginTop: 9 },
  heading: { fontFamily: "Helvetica-Bold", fontSize: 10.5, textTransform: "uppercase", borderBottomWidth: 0.75, borderBottomColor: "#444", paddingBottom: 1, marginBottom: 4 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  entry: { marginTop: 4 },
  bold: { fontFamily: "Helvetica-Bold" },
  muted: { color: "#333" },
  bullet: { flexDirection: "row", marginTop: 1.5, paddingLeft: 4 },
  bulletMark: { width: 9 },
  bulletText: { flex: 1 },
});

function Bullets({ items }: { items: string[] }) {
  return items.map((item) => (
    <View key={item} style={styles.bullet} wrap={false}>
      <Text style={styles.bulletMark}>•</Text>
      <Text style={styles.bulletText}>{item}</Text>
    </View>
  ));
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{title}</Text>
      {children}
    </View>
  );
}

function ResumePdf({ model }: { model: ResumeModel }) {
  const r = visibleResume(model);
  return (
    <Document title={`${r.name} — ${r.headline}`} author={r.name} subject="Resume" language="en">
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{r.name}</Text>
        <Text style={styles.headline}>{r.headline}</Text>
        <Text style={styles.contact}>{r.contactLine}</Text>

        <Section title="Summary">
          <Text>{r.summary}</Text>
        </Section>

        <Section title="Skills">
          {r.skills.map((group) => (
            <Text key={group.title} style={{ marginTop: 1 }}>
              <Text style={styles.bold}>{group.title}: </Text>
              {group.items.join(", ")}
            </Text>
          ))}
        </Section>

        <Section title="Experience">
          {r.experience.map((role) => (
            <View key={role.id} style={styles.entry}>
              <View style={styles.row}>
                <Text>
                  <Text style={styles.bold}>{role.heading}</Text> — {role.subheading}
                </Text>
                <Text style={styles.muted}>{role.dates}</Text>
              </View>
              <Bullets items={role.bullets} />
            </View>
          ))}
        </Section>

        {r.projects.length ? (
          <Section title="Projects">
            {r.projects.map((project) => (
              <View key={project.id} style={styles.entry}>
                <Text>
                  <Text style={styles.bold}>{project.heading}</Text> — {project.subheading}
                  {project.link ? <Text style={styles.muted}> | {project.link}</Text> : null}
                </Text>
                <Bullets items={project.bullets} />
              </View>
            ))}
          </Section>
        ) : null}

        <Section title="Education">
          {r.education.map((school) => (
            <View key={school.id} style={styles.entry}>
              <View style={styles.row}>
                <Text style={styles.bold}>{school.heading}</Text>
                <Text style={styles.muted}>{school.dates}</Text>
              </View>
              <Text>
                {school.subheading} · {school.detail}
              </Text>
            </View>
          ))}
        </Section>

        {r.certifications.length ? (
          <Section title="Certifications">
            <Bullets items={r.certifications} />
          </Section>
        ) : null}
      </Page>
    </Document>
  );
}

export function renderResumePdf(model: ResumeModel): Promise<Blob> {
  return pdf(<ResumePdf model={model} />).toBlob();
}

/** Page count read from the PDF's page tree. */
export async function pdfPageCount(blob: Blob): Promise<number> {
  const text = new TextDecoder("latin1").decode(await blob.arrayBuffer());
  const match = text.match(/\/Type \/Pages\s*\/Count (\d+)/);
  return match ? Number(match[1]) : 1;
}

/** Trims the resume one item at a time until the real render fits on one page. */
export async function fitToOnePage(
  model: ResumeModel,
  trimOnce: (model: ResumeModel) => ResumeModel | null,
): Promise<{ model: ResumeModel; pages: number }> {
  let current = model;
  let pages = await pdfPageCount(await renderResumePdf(current));
  for (let guard = 0; guard < 40 && pages > 1; guard++) {
    const next = trimOnce(current);
    if (!next) break;
    current = next;
    pages = await pdfPageCount(await renderResumePdf(current));
  }
  return { model: current, pages };
}
