import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

/**
 * Fixes frontmatter that was accidentally indented (e.g. typed on a phone).
 * Handles two cases:
 *   1. The opening --- itself is indented
 *   2. The --- is fine but YAML keys inside are indented
 * Strips the detected indent from all lines so gray-matter can parse it.
 */
function fixIndentedFrontmatter(raw: string): string {
  const lines = raw.split("\n");

  // Find the indent: either from the opening --- or from the first key after ---
  let indent = "";
  const openMatch = lines[0]?.match(/^(\s+)---/);
  if (openMatch) {
    indent = openMatch[1];
  } else if (lines[0]?.trim() === "---" && lines[1]) {
    const keyMatch = lines[1].match(/^(\s+)\S/);
    if (keyMatch) indent = keyMatch[1];
  }

  if (!indent) return raw; // no indentation issue

  const indentRegex = new RegExp(`^${indent}`);
  return lines.map((line) => line.replace(indentRegex, "")).join("\n");
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  emoji: string;
  color: string;
  image?: string;
}

export interface BlogPostWithContent extends BlogPost {
  contentHtml: string;
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(BLOG_DIR, filename);
    const fileContents = fixIndentedFrontmatter(fs.readFileSync(filePath, "utf8"));
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      readTime: data.readTime,
      category: data.category,
      tags: data.tags,
      featured: data.featured ?? false,
      emoji: data.emoji,
      color: data.color,
      image: data.image ?? undefined,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPostWithContent | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fixIndentedFrontmatter(fs.readFileSync(filePath, "utf8"));
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html, { sanitize: false }).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    readTime: data.readTime,
    category: data.category,
    tags: data.tags,
    featured: data.featured ?? false,
    emoji: data.emoji,
    color: data.color,
    image: data.image ?? undefined,
    contentHtml,
  };
}
