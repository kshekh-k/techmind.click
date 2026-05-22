import type { MetadataRoute } from "next";
import blogs from "@/app/data/blog.json";
import glossary from "@/app/data/glossary.json";
import authors from "@/app/data/authors.json";
import { getAllLongTailSlugs } from "@/app/content/long-tail-pages";

export const dynamic = "force-static";
export const revalidate = 86400;

type Blog = {
  slug: string;
  date?: string;
};

type GlossaryItem = {
  slug: string;
  updatedAt?: string;
};

type Author = {
  slug: string;
  updatedAt?: string;
};

const SITE_URL = "https://techmind.click";

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
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1.0, lastModified: toDate() },
    { url: `${SITE_URL}/text-format`, changeFrequency: "weekly", priority: 0.9, lastModified: toDate() },
    { url: `${SITE_URL}/image-to-pdf`, changeFrequency: "monthly", priority: 0.8, lastModified: toDate() },
    { url: `${SITE_URL}/image-to-webp`, changeFrequency: "monthly", priority: 0.7, lastModified: toDate() },
    { url: `${SITE_URL}/blogs`, changeFrequency: "weekly", priority: 0.7, lastModified: toDate() },
    { url: `${SITE_URL}/glossary`, changeFrequency: "weekly", priority: 0.7, lastModified: toDate() },
    {
      url: `${SITE_URL}/how-to-convert-uppercase-to-lowercase-without-excel`,
      changeFrequency: "monthly",
      priority: 0.6,
      lastModified: toDate(),
    },
    {
      url: `${SITE_URL}/change-caps-lock-text-to-sentence-case-online-free`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: toDate(),
    },
    { url: `${SITE_URL}/about-us`, changeFrequency: "monthly", priority: 0.5, lastModified: toDate() },
    { url: `${SITE_URL}/contact-us`, changeFrequency: "monthly", priority: 0.5, lastModified: toDate() },
    { url: `${SITE_URL}/authors`, changeFrequency: "monthly", priority: 0.5, lastModified: toDate() },
    { url: `${SITE_URL}/editorial-policy`, changeFrequency: "monthly", priority: 0.5, lastModified: toDate() },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3, lastModified: toDate() },
    { url: `${SITE_URL}/terms-conditions`, changeFrequency: "yearly", priority: 0.3, lastModified: toDate() },
  ];

  const blogRoutes: MetadataRoute.Sitemap = (blogs as Blog[]).map((blog) => ({
    url: `${SITE_URL}/blogs/${normalizeSlug(blog.slug)}`,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: toDate(blog.date),
  }));

  const glossaryRoutes: MetadataRoute.Sitemap = (glossary as GlossaryItem[]).map((term) => ({
    url: `${SITE_URL}/glossary/${normalizeSlug(term.slug)}`,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: toDate(term.updatedAt),
  }));

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
    ...glossaryRoutes,
    ...authorRoutes,
    ...blogRoutes,
    ...longTailRoutes,
  ]) {
    uniqueEntries.set(entry.url, entry);
  }

  return Array.from(uniqueEntries.values());
}
