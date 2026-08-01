"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Calendar, Clock, ArrowLeft, ArrowRight, Twitter, Linkedin, Link as LinkIcon, Check } from "lucide-react";
import Link from "next/link";
import type { BlogPostWithContent, BlogPost } from "@/lib/blog";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
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
  const [readPercent, setReadPercent] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Hero parallax
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.9], [1, 0]);

  // Reading progress
  const { scrollYProgress } = useScroll({ target: articleRef, offset: ["start start", "end end"] });
  const progressSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setReadPercent(Math.round(v * 100));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Share
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${post.title} by @salonidabgar`;

  const handleShare = (platform: string) => {
    if (platform === "Twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
    } else if (platform === "LinkedIn") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
    } else if (platform === "Copy link") {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Find next post
  const currentIndex = allPosts?.findIndex((p) => p.slug === post.slug) ?? -1;
  const nextPost = allPosts && currentIndex >= 0 ? allPosts[(currentIndex + 1) % allPosts.length] : null;

  // Drop cap: inject into first <p> of contentHtml
  const contentWithDropCap = post.contentHtml.replace(
    /^(<p>)(\s*)(\w)/,
    '$1$2<span class="drop-cap">$3</span>'
  );

  return (
    <div className="min-h-screen" ref={articleRef}>
      {/* ===== VERTICAL READING PROGRESS LINE — SIGNAL → MOLTEN ===== */}
      <motion.div
        className="fixed left-0 top-0 w-[3px] z-50 origin-top"
        style={{
          scaleY: progressSpring,
          background: "linear-gradient(180deg, var(--accent), var(--primary))",
          height: "100vh",
        }}
      />

      {/* ===== FLOATING PROGRESS INDICATOR ===== */}
      <motion.div
        className="fixed top-6 left-6 z-50 flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: readPercent > 5 ? 1 : 0, x: readPercent > 5 ? 0 : -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--ink-line)] flex items-center justify-center">
          <span className="text-[10px] font-mono font-bold text-[var(--accent)]">{readPercent}%</span>
        </div>
      </motion.div>

      {/* ===== POST HEADER — CINEMATIC NEAR-BLACK, THINKING = SIGNAL ===== */}
      <header ref={heroRef} className="relative overflow-hidden border-b border-[var(--ink-line)]">
        {/* faint accent wash carried from the post's own color, parallaxed */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-[0.10]`}
          style={{ y: heroY }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 0%, transparent 34%, rgba(10,10,11,0.55) 74%, var(--background) 100%)",
          }}
          aria-hidden="true"
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative max-w-4xl mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-20"
        >
          {/* mono eyebrow — category in signal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mono-label flex items-center gap-4 mb-8"
          >
            <span className="hidden sm:block h-px w-12 bg-[var(--bone-dim)] opacity-50" />
            <span className="n">{post.category}</span>
          </motion.div>

          {/* Title — big confident display uppercase */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold uppercase tracking-[-0.02em] leading-[0.95] text-[clamp(2.2rem,6.2vw,4.6rem)] text-[var(--bone)] mb-8"
          >
            {post.title}
          </motion.h1>

          {/* Excerpt — serif italic editorial accent */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-[clamp(1.15rem,2.3vw,1.8rem)] leading-[1.4] text-[var(--bone-dim)] max-w-[min(46ch,100%)] mb-10"
          >
            {post.excerpt}
          </motion.p>

          {/* Meta row — mono HUD, hairline separators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mono-label flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
              {formatDate(post.date)}
            </span>
            <span className="text-[var(--ink-line)]" aria-hidden="true">/</span>
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
              {post.readTime}
            </span>
          </motion.div>
        </motion.div>
      </header>

      {/* ===== ARTICLE BODY ===== */}
      <article className="max-w-3xl mx-auto px-6 py-16 relative">
        {/* Back + Share bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12 pb-8 border-b border-[var(--ink-line)]"
        >
          <Link
            href="/blog"
            className="mono-label inline-flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All essays
          </Link>

          <div className="flex items-center gap-2">
            <span className="mono-label mr-1 hidden sm:inline">Share</span>
            {[
              { icon: Twitter, label: "Twitter" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: copied ? Check : LinkIcon, label: "Copy link" },
            ].map(({ icon: Icon, label }) => (
              <motion.button
                key={label}
                onClick={() => handleShare(label)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg border transition-all ${
                  label === "Copy link" && copied
                    ? "border-[var(--accent)]/40 text-[var(--accent)]"
                    : "border-[var(--ink-line)] text-[var(--muted-light)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }`}
                aria-label={label}
              >
                <Icon className="w-3.5 h-3.5" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tags — mono uppercase pills, hairline border, hover fills signal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[0.68rem] uppercase tracking-[0.15em] px-3 py-1.5 rounded-md border border-[var(--ink-line)] text-[var(--bone-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* ===== THE PROSE (styled by .blog-prose — kept readable) ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: contentWithDropCap }}
        />

        {/* Divider — hairline */}
        <div className="my-16 hairline" />

        {/* Author — dark B card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b-card p-8 mb-12"
        >
          <div className="mono-label mb-6"><span className="n">Written by</span></div>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
              <span className="font-display text-xl font-bold text-[#0a0a0b]">S</span>
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-[var(--bone)]">Saloni Dabgar</h3>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.15em] text-[var(--muted-light)] mb-3">
                Engineer <span className="hl-molten">/</span> Builder <span className="hl-signal">/</span> Thinker
              </p>
              <p className="text-[var(--muted-light)] text-sm leading-relaxed">
                I write about systems — in code, in nature, in people. Software developer at Jaguar Land Rover,
                IIT Kanpur alumna, fitness enthusiast, and lifelong student of philosophy and the human mind.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ===== NEXT ESSAY TEASER — B CARD ===== */}
        {nextPost && (
          <Link href={`/blog/${nextPost.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="b-card group relative overflow-hidden p-8 md:p-10"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${nextPost.color} opacity-[0.08] group-hover:opacity-[0.14] transition-opacity`}
                aria-hidden="true"
              />
              <div className="relative flex items-center justify-between gap-6">
                <div>
                  <p className="mono-label mb-3"><span className="n">Next essay</span></p>
                  <h3 className="font-display font-bold uppercase tracking-[-0.01em] leading-tight text-xl md:text-2xl text-[var(--bone)] max-w-lg group-hover:text-[var(--accent)] transition-colors">
                    {nextPost.title}
                  </h3>
                </div>
                <ArrowRight className="w-6 h-6 flex-shrink-0 text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          </Link>
        )}
      </article>
    </div>
  );
}
