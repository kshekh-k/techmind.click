import type { BlogType } from "./types";

export function normalizeBlog(blog: BlogType): BlogType {
  const year = String(new Date().getFullYear());
  const r = (s: string) => s.replaceAll("CURRENT_YEAR", year);
  return {
    ...blog,
    title: r(blog.title),
    description: r(blog.description),
    content: r(blog.content),
    keywords: Array.isArray(blog.keywords) ? blog.keywords.map(r) : r(String(blog.keywords)),
  };
}
