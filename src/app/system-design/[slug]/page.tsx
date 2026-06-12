import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SystemDesignDetailView } from "@/components/SystemDesignDetailView";
import { Navbar } from "@/components/Navbar";
import { getSiteUrl, SITE_FULL_NAME } from "@/lib/site";
import { getSystemDesign, systemDesigns } from "@/lib/system-design";

type SystemDesignDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return systemDesigns.map((design) => ({ slug: design.slug }));
}

export async function generateMetadata({
  params,
}: SystemDesignDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const design = getSystemDesign(slug);

  if (!design) {
    return { title: "System design not found" };
  }

  const url = `${getSiteUrl()}/system-design/${slug}`;

  return {
    title: `${design.title} — System Design`,
    description: design.overview,
    alternates: { canonical: url },
    openGraph: {
      title: `${design.title} | ${SITE_FULL_NAME}`,
      description: design.subtitle,
      url,
    },
  };
}

export default async function SystemDesignDetailPage({
  params,
}: SystemDesignDetailPageProps) {
  const { slug } = await params;
  const design = getSystemDesign(slug);

  if (!design) {
    notFound();
  }

  return (
    <main className="relative bg-background text-foreground antialiased">
      <Navbar />
      <SystemDesignDetailView design={design} />
    </main>
  );
}
