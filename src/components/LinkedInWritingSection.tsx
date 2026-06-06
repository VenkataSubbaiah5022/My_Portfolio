"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import {
  getPostImages,
  linkedInPosts,
  linkedInProfileUrl,
  type LinkedInPost,
  type PostImage,
} from "@/lib/linkedin-posts";
import { SectionHeading } from "@/components/SectionHeading";
import { trackOutboundClick } from "@/lib/analytics";

const CAROUSEL_INTERVAL_MS = 4500;

function PostImageCarousel({
  images,
  variant = "compact",
}: {
  images: PostImage[];
  variant?: "featured" | "compact";
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, CAROUSEL_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [images.length, paused]);

  const activeImage = images[activeIndex];
  const isFeatured = variant === "featured";
  const imageFit = activeImage.fit ?? (isFeatured ? "contain" : "cover");

  if (images.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative overflow-hidden ${
        isFeatured
          ? "flex h-full min-h-[260px] w-full items-center justify-center lg:min-h-[420px]"
          : "aspect-[16/10] w-full border-b border-border bg-muted/20"
      }`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeImage.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className={`absolute inset-0 flex items-center justify-center ${
            isFeatured ? "p-8" : imageFit === "contain" ? "bg-muted/30 p-3" : "p-0"
          }`}
        >
          <img
            src={activeImage.src}
            alt={activeImage.caption ?? ""}
            className={
              isFeatured
                ? "max-h-[300px] w-full max-w-md object-contain drop-shadow-2xl lg:max-h-[360px]"
                : imageFit === "contain"
                  ? "h-full w-full object-contain object-center"
                  : "h-full w-full object-cover object-center"
            }
          />
        </motion.div>
      </AnimatePresence>

      {activeImage.caption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent px-4 pb-3 pt-10">
          <p className="text-xs font-medium text-white/95">{activeImage.caption}</p>
        </div>
      )}

      {images.length > 1 && (
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/45 px-2 py-1 backdrop-blur-sm">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show image ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "w-4 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PostVisual({
  post,
  variant = "compact",
}: {
  post: LinkedInPost;
  variant?: "featured" | "compact";
}) {
  const images = getPostImages(post);

  if (images.length > 0) {
    return (
      <PostImageCarousel
        images={images}
        variant={variant}
      />
    );
  }

  return (
    <div className="relative flex aspect-[16/10] flex-col justify-end border-b border-border bg-[linear-gradient(160deg,#1e293b_0%,#0f172a_100%)] p-6">
      <span className="text-5xl leading-none font-serif text-white/15">&ldquo;</span>
      <p className="mt-2 line-clamp-4 text-base leading-snug font-medium text-white">
        {post.title}
      </p>
    </div>
  );
}

function formatImpressions(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return value.toLocaleString();
}

function EngagementBar({ stats }: { stats: LinkedInPost["stats"] }) {
  const items = [
    stats.reactions != null ? { label: "Reactions", value: String(stats.reactions) } : null,
    { label: "Impressions", value: formatImpressions(stats.impressions) },
    stats.comments != null ? { label: "Comments", value: String(stats.comments) } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="flex flex-wrap items-stretch overflow-hidden rounded-xl border border-border bg-background/50">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={`min-w-[88px] flex-1 px-4 py-3 ${
            index > 0 ? "border-l border-border" : ""
          }`}
        >
          <p className="text-lg font-semibold tracking-tight text-foreground">{item.value}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

function PostLink({
  post,
  source,
  className,
  children,
}: {
  post: LinkedInPost;
  source: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackOutboundClick(`LinkedIn Post: ${post.slug}`, post.url, source)}
      className={className}
    >
      {children}
    </a>
  );
}

function FeaturedPost({ post }: { post: LinkedInPost }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg"
    >
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="relative border-b border-border bg-[linear-gradient(180deg,rgba(99,102,241,0.06)_0%,transparent_100%)] lg:border-b-0 lg:border-r">
          <PostVisual post={post} variant="featured" />
        </div>

        <div className="flex flex-col justify-center gap-6 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-primary uppercase">
              Featured
            </span>
            <span className="text-[11px] text-muted-foreground">{post.category}</span>
            <span className="text-border">·</span>
            <span className="text-[11px] text-muted-foreground">{post.postedAgo}</span>
          </div>

          <div>
            <h3 className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
              {post.title}
            </h3>
            <p className="mt-2 text-sm font-medium text-primary">{post.subtitle}</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              {post.excerpt}
            </p>
          </div>

          <EngagementBar stats={post.stats} />

          <PostLink
            post={post}
            source="writing_featured"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0A66C2] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#004182]"
          >
            View on LinkedIn
            <ArrowUpRight className="h-4 w-4" />
          </PostLink>
        </div>
      </div>
    </motion.article>
  );
}

function CompactPost({ post, index }: { post: LinkedInPost; index: number }) {
  const hasImages = getPostImages(post).length > 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition hover:border-[#0A66C2]/25"
    >
      <PostVisual post={post} variant="compact" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-medium tracking-wide text-primary uppercase">
            {post.category}
          </span>
          <span className="text-[11px] text-muted-foreground">{post.postedAgo}</span>
        </div>

        {hasImages && (
          <h3 className="mt-3 line-clamp-2 text-lg leading-snug font-semibold tracking-tight">
            {post.title}
          </h3>
        )}

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {post.hook}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
          {post.stats.reactions != null && (
            <span>
              <strong className="font-semibold text-foreground">{post.stats.reactions}</strong>{" "}
              reactions
            </span>
          )}
          <span>
            <strong className="font-semibold text-foreground">
              {formatImpressions(post.stats.impressions)}
            </strong>{" "}
            impressions
          </span>
          {post.stats.comments != null && (
            <span>
              <strong className="font-semibold text-foreground">{post.stats.comments}</strong>{" "}
              comments
            </span>
          )}
        </div>

        <PostLink
          post={post}
          source="writing_compact"
          className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-[#0A66C2] transition group-hover:gap-2.5"
        >
          Read post
          <ArrowUpRight className="h-4 w-4" />
        </PostLink>
      </div>
    </motion.article>
  );
}

export function LinkedInWritingSection() {
  const featured = linkedInPosts.find((post) => post.featured)!;
  const others = linkedInPosts.filter((post) => !post.featured);

  return (
    <section id="writing" className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
      <div className="rounded-3xl border border-border/80 bg-card/40 p-6 sm:p-8 md:p-10">
        <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            badge="Professional writing"
            titleBefore="LinkedIn"
            titleHighlight="insights"
            description="Selected posts that show teaching, technical depth, and real production experience — the kind of signal recruiters look for beyond a résumé."
            align="left"
            className="mb-0 max-w-2xl md:mb-0"
          />

          <a
            href={linkedInProfileUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackOutboundClick("LinkedIn Profile", linkedInProfileUrl, "writing_header")
            }
            className="inline-flex w-fit items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 transition hover:border-[#0A66C2]/30"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A66C2]/10 text-[#0A66C2]">
              <LinkedInLogoIcon className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block text-xs text-muted-foreground">Connect on LinkedIn</span>
              <span className="block text-sm font-medium">Venkata Subbaiah Setty Aitha</span>
            </span>
          </a>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Industry teaching", detail: "IEEE workshop · alumni speaker" },
            { label: "Engineering craft", detail: "Fundamentals over hype" },
            { label: "Production context", detail: "IoT · AI · cloud at Stratosfy" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border/70 bg-background/60 px-4 py-3"
            >
              <p className="text-sm font-medium">{item.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <FeaturedPost post={featured} />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {others.map((post, index) => (
            <CompactPost key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
