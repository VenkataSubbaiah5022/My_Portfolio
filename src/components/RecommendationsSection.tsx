"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Quote, Star } from "lucide-react";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { SectionHeading } from "@/components/SectionHeading";
import { trackOutboundClick } from "@/lib/analytics";

const linkedInRecommendationsUrl =
  "https://www.linkedin.com/in/aitha-venkata-subbaiah-setty/details/recommendations/";

const recommendations = [
  {
    quote:
      "I had the privilege of working with Venkata at Stratosfy for sometime. He consistently demonstrated exceptional skills in backend development, problem-solving, and delivering high-quality code under tight deadlines. What impressed me most was his collaborative spirit—always ready to support teammates and share knowledge. Venkata's professionalism and technical expertise make him a valuable asset to any organization, and I strongly recommend him for any future opportunities.",
    name: "Divyamala Chitaboina",
    role: "Senior QA Manual Tester",
    company: "Stratosfy",
    relation: "Same team",
    date: "Jul 2026",
    highlights: ["Backend expertise", "Collaborative", "Quality under pressure"],
  },
  {
    quote:
      "I had the pleasure of working with Venkata as a Full Stack Developer on our IoT platform. From a QA perspective, he was always supportive, quick to resolve issues, and ensured his work met quality standards. He has strong skills in both frontend and backend development and consistently delivered reliable and scalable solutions. His proactive approach and collaborative nature made teamwork smooth and effective. I highly recommend Venkata for any full stack development role.",
    name: "Geetha Niharika",
    role: "QA Analyst",
    company: "Stratosfy",
    relation: "Same team",
    date: "Mar 2026",
    highlights: ["Quality-focused", "Fast issue resolution", "Collaborative"],
  },
  {
    quote:
      "I worked with Venkata at Stratosfy where he contributed as a Full Stack Developer on our IoT platform, handling end-to-end development across frontend, backend, and real-time systems. He demonstrated strong ownership, consistently delivering reliable and scalable solutions while supporting production stability and performance. Venkata is technically capable, proactive, and easy to work with. I would strongly recommend him for any full stack development role.",
    name: "Allaa Eddine Ikhlef",
    role: "IoT Device Production & Hardware Operations",
    company: "Stratosfy",
    relation: "Direct manager",
    date: "Mar 2026",
    highlights: ["Strong ownership", "Production stability", "Full stack delivery"],
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function RecommendationsSection() {
  return (
    <section id="linkedin-recommendations" className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
      <div className="mb-6 flex flex-col gap-6 md:mb-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          badge="Social proof"
          titleBefore="LinkedIn"
          titleHighlight="recommendations"
          description="Verified LinkedIn endorsements from Stratosfy teammates on production work, reliability, and collaboration."
          align="left"
          className="mb-0 md:mb-0"
        />
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs text-primary">
          <BadgeCheck className="h-3.5 w-3.5" />
          {recommendations.length} received on LinkedIn
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {recommendations.map((item, idx) => (
          <motion.article
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-lg transition hover:border-primary/30"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.08),transparent_55%)]" />

            <div className="relative flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/10 text-sm font-semibold text-primary">
                  {getInitials(item.name)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs leading-5 text-muted-foreground">{item.role}</p>
                  <p className="text-xs text-muted-foreground">{item.company}</p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#0A66C2]/20 bg-[#0A66C2]/8 px-2 py-1 text-[10px] font-medium text-[#0A66C2]">
                <LinkedInLogoIcon className="h-3 w-3" />
                LinkedIn
              </span>
            </div>

            <div className="relative mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star
                  key={starIndex}
                  className="h-3.5 w-3.5 fill-primary/80 text-primary/80"
                  aria-hidden
                />
              ))}
              <span className="ml-2 text-[11px] text-muted-foreground">Strong recommend</span>
            </div>

            <blockquote className="relative mt-4 rounded-xl border border-border/70 bg-background/60 p-4">
              <Quote className="mb-2 h-4 w-4 text-primary/60" aria-hidden />
              <p className="text-sm leading-7 text-foreground/90">
                &ldquo;{item.quote}&rdquo;
              </p>
            </blockquote>

            <div className="relative mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                {item.relation}
              </span>
              <span className="rounded-full border border-border px-2.5 py-1 text-[10px] text-muted-foreground">
                {item.date}
              </span>
              {item.highlights.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-1 text-[10px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      <a
        href={linkedInRecommendationsUrl}
        target="_blank"
        rel="noreferrer"
        onClick={() =>
          trackOutboundClick(
            "LinkedIn Recommendations",
            linkedInRecommendationsUrl,
            "recommendations",
          )
        }
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:translate-y-[-1px]"
      >
        <LinkedInLogoIcon className="h-4 w-4" />
        Verify on my LinkedIn profile
      </a>
    </section>
  );
}
