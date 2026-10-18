import type { MetadataRoute } from "next";
import blogs from "@/app/data/blog.json";
import authors from "@/app/data/authors.json";
import { getAllLongTailSlugs } from "@/app/content/long-tail-pages";
import { STATIC_ROUTES } from "@/app/lib/static-routes";

export const dynamic = "force-static";
export const revalidate = 86400;

type Blog = {
  slug: string;
  date?: string;
};

type Author = {
  slug: string;
  updatedAt?: string;
};

const SITE_URL = "https://www.techmind.click";

function toDate(value?: string): Date {
  const fallback = new Date("2026-05-11T00:00:00.000Z");
  if (!value) {
    return fallback;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

function normalizeSlug(slug: string): string {
  return slug.trim().toLowerCase();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    lastModified: toDate(),
  }));

  const blogRoutes: MetadataRoute.Sitemap = (blogs as Blog[]).map((blog) => ({
    url: `${SITE_URL}/blogs/${normalizeSlug(blog.slug)}`,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: toDate(blog.date),
  }));

  // NOTE (Technical SEO):
  // Individual glossary term routes (/glossary/[slug]) intentionally emit
  // `robots: { index: false, follow: true }` (see app/glossary/[slug]/page.tsx)
  // to prevent indexing of thin or programmatic definitions while preserving internal link equity.
  // In accordance with Google Search Central and XML sitemap standards, noindex URLs
  // MUST NOT be included in the XML sitemap to prevent "Submitted URL marked noindex" coverage errors.
  // The primary glossary hub (/glossary) remains fully indexable and is included via STATIC_ROUTES.

  const authorRoutes: MetadataRoute.Sitemap = (authors as Author[]).map((author) => ({
    url: `${SITE_URL}/authors/${normalizeSlug(author.slug)}`,
    changeFrequency: "monthly",
    priority: 0.5,
    lastModified: toDate(author.updatedAt),
  }));

  const longTailRoutes: MetadataRoute.Sitemap = getAllLongTailSlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: toDate("2026-05-15T00:00:00.000Z"),
  }));

  const uniqueEntries = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of [
    ...staticRoutes,
    ...authorRoutes,
    ...blogRoutes,
    ...longTailRoutes,
  ]) {
    uniqueEntries.set(entry.url, entry);
  }

  return Array.from(uniqueEntries.values());
}
