import blogs from "@/app/data/blog.json";

export const dynamic = "force-static";
export const revalidate = 86400;

const SITE_URL = "https://www.techmind.click";

type Blog = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  cover?: { url: string };
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const sorted = [...(blogs as Blog[])].sort(
    (a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
  );

  const lastBuildDate = sorted[0]?.date
    ? new Date(sorted[0].date).toUTCString()
    : new Date().toUTCString();

  const items = sorted
    .map((blog) => {
      const url = `${SITE_URL}/blogs/${blog.slug.trim().toLowerCase()}`;
      const pubDate = blog.date ? new Date(blog.date).toUTCString() : "";
      const image = blog.cover?.url
        ? blog.cover.url.startsWith("http")
          ? blog.cover.url
          : `${SITE_URL}${blog.cover.url}`
        : "";

      return `
    <item>
      <title>${escapeXml(blog.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${blog.description ? `<description>${escapeXml(blog.description)}</description>` : ""}
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
      ${image ? `<enclosure url="${image}" type="image/png" />` : ""}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml("Free Online Text Formatter & Case Converter - TechMind")}</title>
    <link>${SITE_URL}/</link>
    <description>Free online text formatting tools including case converter, slug generator, and text cleanup utilities for writers, developers, students, bloggers, and content creators.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/images/text-case-converter-and-formatter-techmind-click-otg.png</url>
      <title>TechMind Click</title>
      <link>${SITE_URL}/</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
