"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, BookOpen, Search } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "Software Engineering", label: "Engineering" },
  { id: "Career", label: "Career" },
  { id: "Health & Fitness", label: "Fitness" },
  { id: "Personal Growth", label: "Growth" },
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPageClient({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = activeCategory === "all" || post.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen">
      {/* ===== EDITORIAL HERO ===== */}
      <section className="pt-20 pb-10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="mono-label mb-6 flex items-center gap-4 hero-anim" style={{ animationDelay: "0.1s" }}>
            <span className="hidden sm:block h-px w-12 bg-[var(--bone-dim)] opacity-50" />
            <span>Essays <span className="n">&amp;</span> Ideas</span>
          </div>

          <h1
            className="font-display font-bold uppercase tracking-[-0.03em] leading-[0.9] text-[clamp(3.2rem,11vw,8rem)] text-[var(--bone)] whitespace-nowrap"
            aria-label="Thinking"
          >
            {"Thinking".split("").map((char, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="hero-char"
                style={{ animationDelay: `${0.2 + i * 0.04}s` }}
              >
                {char}
              </span>
            ))}
          </h1>

          <p
            className="font-serif italic text-[clamp(1.15rem,2.2vw,1.8rem)] leading-[1.35] max-w-[min(42ch,100%)] mt-7 text-[var(--bone)] hero-anim"
            style={{ animationDelay: "0.4s" }}
          >
            What I think. How I think. Why I think. Essays at the intersection of{" "}
            <span className="hl-molten not-italic">engineering</span>,{" "}
            <span className="hl-signal not-italic">philosophy</span>, fitness, and the human experience.
          </p>
        </div>
      </section>

      {/* ===== SEARCH + FILTERS ===== */}
      <section className="relative py-5 border-y border-[var(--ink-line)]">
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="SEARCH ESSAYS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--ink-line)] focus:border-[var(--accent)] focus:outline-none transition-colors font-mono text-xs tracking-[0.12em] uppercase placeholder:text-[var(--muted)]"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="mono-label flex-shrink-0 mr-1 hidden sm:inline">Filter <span className="m">/</span></span>
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-mono text-[0.68rem] tracking-[0.12em] uppercase transition-all border ${
                  activeCategory === cat.id
                    ? "bg-[var(--accent)] text-[#0a0a0b] border-[var(--accent)]"
                    : "bg-transparent text-[var(--muted-light)] border-[var(--ink-line)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED ESSAY ===== */}
      {featuredPost && (
        <section className="py-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mono-label mb-5">Latest <span className="n">/</span> Featured</div>
            <Link href={`/blog/${featuredPost.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="b-card group relative overflow-hidden h-[360px] md:h-[420px]"
              >
                {/* dot-grid texture + molten featured index */}
                <div className="absolute inset-0 pattern-dots opacity-40 pointer-events-none" />
                <div
                  className="absolute -top-10 -right-4 pointer-events-none select-none"
                  aria-hidden="true"
                >
                  <span className="font-display font-bold text-[13rem] leading-none text-[var(--primary)] opacity-[0.07]">
                    01
                  </span>
                </div>
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-4 font-mono text-[0.68rem] tracking-[0.14em] uppercase">
                    <span className="text-[var(--primary)] border border-[var(--primary)]/40 rounded-full px-3 py-1">
                      {featuredPost.category}
                    </span>
                    <span className="text-[var(--bone-dim)] flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {featuredPost.readTime}
                    </span>
                    <span className="text-[var(--muted)]">{formatDate(featuredPost.date)}</span>
                  </div>

                  <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[var(--bone)] leading-[1.02] mb-4 max-w-3xl group-hover:translate-x-1 transition-transform duration-500">
                    {featuredPost.title}
                  </h2>

                  <p className="text-[var(--bone-dim)] text-sm md:text-base max-w-2xl leading-relaxed mb-6 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.14em] uppercase text-[var(--accent)] group-hover:gap-3 transition-all">
                    Read essay <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>
        </section>
      )}

      {/* ===== REMAINING ESSAYS — EDITORIAL LIST ===== */}
      <section className="py-10 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="b-sechead">
            <span className="idx">02</span>
            <h2>The Index</h2>
            <span className="tail mono-label hidden sm:inline">
              {filteredPosts.length} {filteredPosts.length === 1 ? "Essay" : "Essays"}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="border-t border-[var(--ink-line)]"
            >
              {remainingPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="border-b border-[var(--ink-line)]"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <motion.div
                      className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 md:gap-8 py-7 md:py-8"
                      whileHover={{ x: 4 }}
                    >
                      {/* Molten index */}
                      <span className="font-mono text-[var(--primary)] text-sm pt-1 tabular-nums w-8">
                        {String(index + 2).padStart(2, "0")}
                      </span>

                      {/* Text */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2 font-mono text-[0.66rem] tracking-[0.14em] uppercase">
                          <span className="text-[var(--primary)]">{post.category}</span>
                          <span className="text-[var(--muted)]">{formatDate(post.date)}</span>
                          <span className="text-[var(--muted)] flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="font-serif text-xl md:text-2xl leading-snug text-[var(--bone)] group-hover:text-[var(--accent)] transition-colors mb-2">
                          {post.title}
                        </h3>

                        <p className="text-sm text-[var(--muted-light)] leading-relaxed line-clamp-2 max-w-2xl">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="hidden md:block w-5 h-5 mt-1 text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </motion.div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <BookOpen className="w-14 h-14 mx-auto mb-5 text-[var(--muted)]" />
              <h3 className="font-serif text-2xl mb-2 text-[var(--bone)]">No essays found</h3>
              <p className="text-[var(--muted)] text-sm mb-6">
                {searchQuery
                  ? `No results for "${searchQuery}".`
                  : "Check back soon."}
              </p>
              <button
                onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                className="px-5 py-2.5 rounded-full font-mono text-[0.68rem] tracking-[0.12em] uppercase border border-[var(--ink-line)] hover:border-[var(--accent)] text-[var(--muted-light)] hover:text-[var(--accent)] transition-all"
              >
                View All
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
