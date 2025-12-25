import Layout from "@/app/components/layout";
import blogs from "@/app/data/blog.json";
import { BlogType } from "@/app/lib/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const SITE_URL = "https://www.techmind.click";
const DEFAULT_OG_IMAGE =
  "/images/text-case-converter-and-formatter-techmind-click-otg.png";

export const dynamicParams = false;

/* ---------- Static Params ---------- */
export function generateStaticParams() {
  return (blogs as BlogType[]).map((blog) => ({
    slug: blog.slug,
  }));
}

/* ---------- SEO / Metadata (Next.js 14 SAFE) ---------- */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  const blog = (blogs as BlogType[]).find(
    (b) => b.slug === slug
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
export default function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = (blogs as BlogType[]).find(
    (b) => b.slug === params.slug
  );

  if (!blog) notFound();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-3 md:p-4">
        <article className="prose prose-lg mx-auto max-w-4xl bg-white border rounded p-5 shadow-sm">
          <h1>{blog.title}</h1>

          {/* Meta info */}
          <p className="text-gray-500 !mt-2">
            <span>
              Posted on{" "}
              <time dateTime={blog.date}>
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
            {" • "}
            <span>By {blog.author}</span>
          </p>

          {blog.cover && (
            <Image
              src={blog.cover.url}
              alt={blog.title}
              width={blog.cover.width}
              height={blog.cover.height}
              priority
              className="rounded"
            />
          )}

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          />
        </article>
      </div>
    </Layout>
  );
}
