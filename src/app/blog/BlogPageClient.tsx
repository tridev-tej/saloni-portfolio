"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Clock, Search } from "lucide-react";
import Link from "@/components/TransitionLink";
import type { BlogPost } from "@/lib/blog";

const categories = [
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
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const categoryMatches = activeCategory === "all" || post.category === activeCategory;
      const queryMatches = !normalizedQuery || [post.title, post.excerpt, ...post.tags].some((value) => value.toLowerCase().includes(normalizedQuery));
      return categoryMatches && queryMatches;
    });
  }, [posts, activeCategory, query]);

  const [featuredPost, ...remainingPosts] = filteredPosts;

  return (
    <div>
      <header className="site-shell section-space">
        <p className="eyebrow">Essays and notes</p>
        <h1 className="page-title mt-5">Thinking in public.</h1>
        <p className="lead mt-8">
          Engineering, philosophy, fitness, and the habits of mind that connect them.
        </p>
      </header>

      <section className="border-y border-[var(--line)] bg-[var(--ink-soft)] py-6">
        <div className="site-shell grid gap-4 md:grid-cols-[minmax(240px,1fr)_auto] md:items-center">
          <label className="relative block">
            <span className="sr-only">Search essays</span>
            <Search aria-hidden="true" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="search"
              className="search-field pl-11"
              placeholder="Search essays"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div className="filter-row" aria-label="Filter essays by category">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`filter-button ${activeCategory === category.id ? "filter-button-active" : ""}`}
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={activeCategory === category.id}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {featuredPost ? (
        <main className="site-shell section-space">
          <section>
            <p className="eyebrow">Latest</p>
            <Link href={`/blog/${featuredPost.slug}`} className="group mt-6 grid gap-8 border-y border-[var(--line)] py-10 md:grid-cols-[1.4fr_0.6fr]">
              <div>
                <div className="meta-line">
                  <span>{featuredPost.category}</span>
                  <span>{formatDate(featuredPost.date)}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock aria-hidden="true" className="h-3.5 w-3.5" />{featuredPost.readTime}</span>
                </div>
                <h2 className="mt-5 max-w-4xl font-serif text-[clamp(2.5rem,5.8vw,5rem)] leading-[0.98] tracking-[-0.02em] group-hover:text-[var(--orange)]">
                  {featuredPost.title}
                </h2>
              </div>
              <div className="flex flex-col justify-between gap-6 md:pt-8">
                <p className="text-[var(--paper-dim)]">{featuredPost.excerpt}</p>
                <span className="text-link">Read essay <ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
              </div>
            </Link>
          </section>

          {remainingPosts.length > 0 && (
            <section className="mt-20">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="eyebrow">Archive</p>
                  <h2 className="section-heading mt-4">More writing.</h2>
                </div>
                <p className="text-sm text-[var(--muted)]">{filteredPosts.length} essays</p>
              </div>
              <ol className="editorial-list mt-10">
                {remainingPosts.map((post, index) => (
                  <li key={post.slug} className="editorial-row">
                    <span className="editorial-index">{String(index + 2).padStart(2, "0")}</span>
                    <article>
                      <div className="meta-line">
                        <span>{post.category}</span>
                        <span>{formatDate(post.date)}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="mt-3 font-serif text-2xl leading-tight md:text-3xl">
                        <Link href={`/blog/${post.slug}`} className="hover:text-[var(--orange)]">{post.title}</Link>
                      </h3>
                      <p className="mt-3 max-w-2xl text-[var(--paper-dim)]">{post.excerpt}</p>
                    </article>
                    <Link href={`/blog/${post.slug}`} className="mt-4 text-link md:mt-0">Read <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </main>
      ) : (
        <section className="site-shell section-space">
          <h2 className="section-heading">No essays found.</h2>
          <p className="section-intro mt-5">Try another search or clear the current filters.</p>
          <button type="button" className="button button-secondary mt-8" onClick={() => { setActiveCategory("all"); setQuery(""); }}>
            Clear filters
          </button>
        </section>
      )}
    </div>
  );
}
