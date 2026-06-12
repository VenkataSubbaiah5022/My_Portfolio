import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudyView } from "@/components/ProjectCaseStudyView";
import { Navbar } from "@/components/Navbar";
import { getCaseStudy, hasCaseStudy } from "@/lib/case-studies";
import { getProjectBySlug, projects } from "@/lib/projects";
import { getSiteUrl, SITE_FULL_NAME } from "@/lib/site";

type ProjectCaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects
    .filter((project) => hasCaseStudy(project.slug))
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const caseStudy = getCaseStudy(slug);

  if (!project || !caseStudy) {
    return { title: "Project not found" };
  }

  const url = `${getSiteUrl()}/projects/${slug}`;

  return {
    title: `${project.title} — Case Study`,
    description: caseStudy.solution,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} Case Study | ${SITE_FULL_NAME}`,
      description: caseStudy.businessNeed,
      url,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const caseStudy = getCaseStudy(slug);

  if (!project || !caseStudy) {
    notFound();
  }

  return (
    <main className="relative bg-background text-foreground antialiased">
      <Navbar />
      <ProjectCaseStudyView project={project} caseStudy={caseStudy} />
    </main>
  );
}
