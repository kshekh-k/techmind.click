import Layout from "@/app/components/layout";
import RelatedPosts from "@/app/components/related-posts";
import blogs from "@/app/data/blog.json";
import { BlogType } from "@/app/lib/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import TextFormatter from "@/app/components/text-format";

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
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = (blogs as BlogType[]).find(
    (b) => b.slug === resolvedParams.slug
  );

  if (!blog) return {};

  const ogImage = blog.cover?.url
    ? `${SITE_URL}${blog.cover.url}`
    : `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  const canonicalUrl = `${SITE_URL}/blogs/${blog.slug}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${blog.title} | TechMind`,
    description: blog.description,
    keywords: Array.isArray(blog.keywords) ? blog.keywords.join(', ') : blog.keywords,
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
  const blog = (blogs as BlogType[]).find(
    (b) => b.slug === resolvedParams.slug
  );

  if (!blog) notFound();

  // ── JSON-LD Article schema ─────────────────────────────────────────────────
  // Helps Google understand the article structure → rich results in SERPs.
  const canonicalUrl = `${SITE_URL}/blogs/${blog.slug}`;
  const imageUrl = blog.cover?.url
    ? blog.cover.url.startsWith("http")
      ? blog.cover.url
      : `${SITE_URL}${blog.cover.url}`
    : `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blogs", item: `${SITE_URL}/blogs` },
          { "@type": "ListItem", position: 3, name: blog.title, item: canonicalUrl },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.description,
        author: { "@type": "Person", name: blog.author },
        datePublished: blog.date,
        dateModified: blog.date,
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
        keywords: Array.isArray(blog.keywords) ? blog.keywords.join(", ") : blog.keywords,
      },
    ],
  };

  return (
    <Layout>
      {/* Inject JSON-LD without blocking render */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />



      <div className="max-w-7xl mx-auto p-3 md:p-4 space-y-5 xl:space-y-10">
      <TextFormatter />
        
        <article className="prose prose-lg bg-white w-full max-w-full border rounded p-5 shadow-sm">
          <h1 className="leading-tight mb-0 pb-2 font-bold">{blog.title}</h1>

          {/* Meta info */}
          <p className="text-gray-500 m-0! py-1 flex gap-2">
            <span>
              <time dateTime={blog.date}>
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
            <span aria-label={`Author: ${blog.author}`}>{blog.author}</span>
          </p>

          {blog.cover && (
            <Link href="/" className="flex flex-col" aria-label={`Cover image for ${blog.title}`} title={blog.title}>
            <Image
              src={blog.cover.url}
              alt={blog.title}
              title={blog.title}
              width={blog.cover.width}
              height={blog.cover.height}
              // priority + eager: this IS the LCP element for blog pages
              priority
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
              className="rounded w-full h-auto"
            />
            </Link>
          )}

          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <div className="mt-3">
                <Link
                  href="/"
                  className="text-sm text-purple-700 italic underline underline-offset-4"
                >
                  Use Case Converter now
                </Link>
              </div>

        
        </article>
        
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
