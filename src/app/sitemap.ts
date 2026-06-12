import type { MetadataRoute } from "next";
import { caseStudySlugs } from "@/lib/case-studies";
import { getSiteUrl } from "@/lib/site";
import { systemDesigns } from "@/lib/system-design";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/system-design`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/certifications`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const caseStudyPages: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const systemDesignPages: MetadataRoute.Sitemap = systemDesigns.map((design) => ({
    url: `${siteUrl}/system-design/${design.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...caseStudyPages, ...systemDesignPages];
}
