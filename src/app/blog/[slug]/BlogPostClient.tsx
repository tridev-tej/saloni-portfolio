"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, Copy, Linkedin, Twitter } from "lucide-react";
import Link from "@/components/TransitionLink";
import type { BlogPost, BlogPostWithContent } from "@/lib/blog";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPostClient({
  post,
  allPosts,
}: {
  post: BlogPostWithContent;
  allPosts?: BlogPost[];
}) {
  const [copied, setCopied] = useState(false);
  const currentIndex = allPosts?.findIndex((item) => item.slug === post.slug) ?? -1;
  const nextPost = allPosts && currentIndex >= 0 ? allPosts[(currentIndex + 1) % allPosts.length] : null;

  const share = (platform: "Twitter" | "LinkedIn" | "Copy") => {
    const url = window.location.href;
    if (platform === "Twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`, "_blank", "noopener,noreferrer");
      return;
    }
    if (platform === "LinkedIn") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank", "noopener,noreferrer");
      return;
    }
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div>
      <header className="border-b border-[var(--line)]">
        <div className="narrow-shell section-space">
          <Link href="/blog" className="text-link">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> All essays
          </Link>
          <p className="eyebrow mt-12">{post.category}</p>
          <h1 className="mt-5 font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.94] tracking-[-0.025em]">
            {post.title}
          </h1>
          <p className="lead mt-8">{post.excerpt}</p>
          <div className="meta-line mt-8">
            <span>{formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-1.5"><Clock aria-hidden="true" className="h-3.5 w-3.5" />{post.readTime}</span>
          </div>
        </div>
      </header>

      <main className="narrow-shell py-14 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[var(--line)] pb-8">
          <div className="topic-list" aria-label="Essay tags">
            {post.tags.map((tag) => <span key={tag} className="topic">{tag}</span>)}
          </div>
          <div className="flex items-center gap-2" aria-label="Share this essay">
            <button type="button" className="icon-button" onClick={() => share("Twitter")} aria-label="Share on Twitter"><Twitter aria-hidden="true" className="h-4 w-4" /></button>
            <button type="button" className="icon-button" onClick={() => share("LinkedIn")} aria-label="Share on LinkedIn"><Linkedin aria-hidden="true" className="h-4 w-4" /></button>
            <button type="button" className="icon-button" onClick={() => share("Copy")} aria-label={copied ? "Link copied" : "Copy link"}>
              {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <article className="blog-prose mt-12" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

        <aside className="mt-16 border-y border-[var(--line)] py-8">
          <p className="eyebrow">Written by</p>
          <h2 className="mt-3 font-display text-xl font-semibold">Saloni Dabgar</h2>
          <p className="mt-3 max-w-2xl text-[var(--paper-dim)]">
            Software developer at Jaguar Land Rover and IIT Kanpur alumna. I write about systems in code, nature, and people.
          </p>
        </aside>

        {nextPost && (
          <Link href={`/blog/${nextPost.slug}`} className="group mt-16 grid gap-6 border-t border-[var(--line)] pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="eyebrow">Next essay</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight group-hover:text-[var(--orange)]">{nextPost.title}</h2>
            </div>
            <span className="text-link">Read next <ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
          </Link>
        )}
      </main>
    </div>
  );
}
