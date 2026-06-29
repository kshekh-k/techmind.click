import type { Metadata } from "next";
import Link from "next/link";
import blogs from "@/app/data/blog.json";
import glossary from "@/app/data/glossary.json";
import authors from "@/app/data/authors.json";
import { getAllLongTailSlugs } from "@/app/content/long-tail-pages";
import { STATIC_ROUTES } from "@/app/lib/static-routes";
import Layout from "@/app/components/layout";

export const metadata: Metadata = {
  title: "Sitemap - TechMind Click",
  description: "Browse all pages on TechMind Click — tools, blogs, glossary, and author profiles.",
  alternates: { canonical: "/sitemap.html" },
  robots: { index: true, follow: true },
};

const SITE_URL = "https://www.techmind.click";

type SitemapEntry = {
  label: string;
  href: string;
};

type SitemapSection = {
  title: string;
  entries: SitemapEntry[];
};

function buildSections(): SitemapSection[] {
  const staticPages: SitemapEntry[] = STATIC_ROUTES.map((r) => ({
    label: r.label,
    href: r.path,
  }));

  const blogEntries: SitemapEntry[] = (blogs as { slug: string; title?: string; date?: string }[])
    .slice()
    .sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime())
    .map((b) => ({
      label: b.title ?? b.slug,
      href: `/blogs/${b.slug.trim().toLowerCase()}`,
    }));

  const glossaryEntries: SitemapEntry[] = (glossary as { slug: string; term?: string }[]).map((g) => ({
    label: g.term ?? g.slug,
    href: `/glossary/${g.slug.trim().toLowerCase()}`,
  }));

  const authorEntries: SitemapEntry[] = (authors as { slug: string; name?: string }[]).map((a) => ({
    label: a.name ?? a.slug,
    href: `/authors/${a.slug.trim().toLowerCase()}`,
  }));

  const longTailEntries: SitemapEntry[] = getAllLongTailSlugs().map((slug) => ({
    label: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    href: `/${slug}`,
  }));

  return [
    { title: "Main Pages", entries: staticPages },
    { title: "Blog Posts", entries: blogEntries },
    { title: "Glossary Terms", entries: glossaryEntries },
    { title: "Authors", entries: authorEntries },
    { title: "Resources & Guides", entries: longTailEntries },
  ];
}

export default function SitemapHtmlPage() {
  const sections = buildSections();
  const totalCount = sections.reduce((sum, s) => sum + s.entries.length, 0);

  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sitemap</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {totalCount} pages &mdash;{" "}
            <a
              href={`${SITE_URL}/sitemap.xml`}
              className="text-purple-700 hover:text-purple-900 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View XML sitemap
            </a>
          </p>
        </div>

        <div className="grid gap-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                {section.title}
                <span className="ml-2 text-sm font-normal text-gray-400">({section.entries.length})</span>
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                {section.entries.map((entry) => (
                  <li key={entry.href} className="truncate">
                    <Link
                      href={entry.href} title={entry.label}
                      className="text-purple-700 hover:text-purple-900 hover:underline text-sm leading-6 transition"
                    >
                      {entry.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </Layout>
  );
}
