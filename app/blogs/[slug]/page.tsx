import Layout from "@/app/components/layout";
import RelatedPosts from "@/app/components/related-posts";
import blogs from "@/app/data/blog.json";
import { BlogType } from "@/app/lib/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import TextFormatter from "@/app/components/text-format";
import QRCodeGeneratorLoader from "@/app/components/tools/qr-generator/QRCodeGeneratorLoader";
import { normalizeBlog } from "@/app/lib/normalizeBlog";

const SITE_URL = "https://www.techmind.click";
const DEFAULT_OG_IMAGE =
  "/images/text-case-converter-and-formatter-techmind-click-otg.png";

export const dynamicParams = false;

/* ---------- Types ---------- */
type PageProps = {
  params: {
    slug: string;
  };
};

/* ---------- Static Params ---------- */
export function generateStaticParams() {
  return (blogs as BlogType[]).map((blog) => ({
    slug: blog.slug,
  }));
}

/* ---------- SEO / Metadata (CORRECT) ---------- */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const raw = (blogs as BlogType[]).find((b) => b.slug === resolvedParams.slug);

  if (!raw) return {};
  const blog = normalizeBlog(raw);

  const ogImage = blog.cover?.url
    ? `${SITE_URL}${blog.cover.url}`
    : `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  const canonicalUrl = `${SITE_URL}/blogs/${blog.slug}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: blog.title,
    description: blog.description,
    keywords: Array.isArray(blog.keywords)
      ? blog.keywords.join(", ")
      : blog.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: canonicalUrl,
      siteName: "TechMind",
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author],
      images: [
        {
          url: ogImage,
          width: blog.cover?.width || 1200,
          height: blog.cover?.height || 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [ogImage],
    },
  };
}

/* ---------- Page ---------- */
export default async function BlogPage({ params }: PageProps) {
  const resolvedParams = await params;
  const raw = (blogs as BlogType[]).find((b) => b.slug === resolvedParams.slug);

  if (!raw) notFound();
  const blog = normalizeBlog(raw!);

  // ── JSON-LD Article schema ─────────────────────────────────────────────────
  // Helps Google understand the article structure → rich results in SERPs.
  const canonicalUrl = `${SITE_URL}/blogs/${blog.slug}`;
  const imageUrl = blog.cover?.url
    ? blog.cover.url.startsWith("http")
      ? blog.cover.url
      : `${SITE_URL}${blog.cover.url}`
    : `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  // Extract FAQ Q&A pairs from HTML content: <p><strong>Q?</strong></p><p>A</p>
  const faqMatches = [
    ...blog.content.matchAll(
      /<p>\s*<strong>([\s\S]*?\?)<\/strong>\s*<\/p>\s*<p>([\s\S]*?)<\/p>/g,
    ),
  ];
  const faqEntities = faqMatches.map((m) => ({
    "@type": "Question",
    name: m[1].replace(/<[^>]+>/g, "").trim(),
    acceptedAnswer: {
      "@type": "Answer",
      text: m[2].replace(/<[^>]+>/g, "").trim(),
    },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blogs",
            item: `${SITE_URL}/blogs`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: blog.title,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.description,
        author: { "@type": "Person", name: blog.author },
        datePublished: blog.date,
        dateModified: blog.lastModified ?? blog.date,
        publisher: {
          "@type": "Organization",
          name: "TechMind Click",
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/techmind-click-logo.svg`,
          },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        image: {
          "@type": "ImageObject",
          url: imageUrl,
          width: blog.cover?.width || 1200,
          height: blog.cover?.height || 630,
        },
        articleSection: ["Text Formatting", "Productivity", "SEO"],
        keywords: Array.isArray(blog.keywords)
          ? blog.keywords.join(", ")
          : blog.keywords,
      },
      ...(faqEntities.length > 0
        ? [{ "@type": "FAQPage", mainEntity: faqEntities }]
        : []),
    ],
  };

  return (
    <Layout>
      {/* Inject JSON-LD without blocking render */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-3 md:px-4 space-y-5 xl:space-y-10">
        <article className="prose prose-lg bg-white w-full max-w-full border rounded-xl p-6 md:p-8 shadow-sm overflow-hidden">
          <nav
            aria-label="Breadcrumb"
            className="text-xs text-muted-foreground mb-4"
          >
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blogs" className="hover:underline">
              Blogs
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 font-medium">{blog.title}</span>
          </nav>

          <h1 className="leading-tight mb-2 font-bold text-gray-900">
            {blog.title}
          </h1>

          {/* Meta info */}
          <div className="text-gray-500 text-sm mb-6 pb-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
            <time dateTime={blog.date}>
              {new Date(blog.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <Link
              href="/authors/admin"
              className="text-primary hover:underline font-medium"
            >
              By{" "}
              {blog.author === "Admin"
                ? "TechMind Editorial Team"
                : blog.author}
            </Link>
            <span>•</span>
            <span>Educational Guide</span>
          </div>

          {blog.cover && (
            <div className="mb-6">
              <Image
                src={blog.cover.url}
                alt={blog.title}
                title={blog.title}
                width={blog.cover.width}
                height={blog.cover.height}
                priority
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                className="rounded-lg w-full h-auto border"
              />
            </div>
          )}

          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="blog-content leading-relaxed"
          />
        </article>

        {/* Interactive Tool Section */}
        {/* {blog.tool === "qr-code-generator" ? (
          <section className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Interactive QR Code Generator
              </h2>
              <p className="text-sm text-muted-foreground">
                Try the tool mentioned in this guide directly below — free,
                instant, and runs locally in your browser.
              </p>
            </div>
            <QRCodeGeneratorLoader />
          </section>
        ) : blog.tool === "text-formatter" ? (
          <section className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Interactive Text Formatter
              </h2>
              <p className="text-sm text-muted-foreground">
                Try the tool mentioned in this guide directly below — free,
                instant, and runs locally in your browser.
              </p>
            </div>
            <TextFormatter />
          </section>
        ) : null} */}

        {blog.relatedPosts && blog.relatedPosts.length > 0 && (
          <RelatedPosts
            relatedPosts={blog.relatedPosts}
            currentSlug={blog.slug}
          />
        )}
      </div>
    </Layout>
  );
}
