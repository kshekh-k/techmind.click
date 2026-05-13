import Link from "next/link";
import Image from "next/image";
import blogs from "@/app/data/blog.json";
import { BlogType } from "@/app/lib/types";
import Layout from "@/app/components/layout";
import type { Metadata } from "next";
import TextFormatter from "../components/text-format";

export const metadata: Metadata = {
  title: "Blogs – Text Formatting Tips & Writing Productivity | TechMind Click",
  description:
    "Read articles on text formatting, writing productivity, SEO slug generators, and free online tools from the TechMind Click team.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  const sortedBlogs = [...(blogs as BlogType[])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.techmind.click/" },
          { "@type": "ListItem", position: 2, name: "Blogs", item: "https://www.techmind.click/blogs" },
        ],
      },
      {
        "@type": "ItemList",
        name: "TechMind Click Blog Articles",
        itemListElement: sortedBlogs.map((blog, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://www.techmind.click/blogs/${blog.slug}`,
          name: blog.title,
        })),
      },
    ],
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <div className="max-w-7xl mx-auto px-3 md:px-4 space-y-5 xl:space-y-10">
        <TextFormatter />
        <h1 className="text-4xl font-semibold">Blogs</h1>
        <p className="mt-2 text-muted-foreground max-w-3xl">
          Learn practical guides on text formatting, slug creation, content cleanup, and writing productivity.
          Need a quick tool? Try the <Link href="/" className="underline underline-offset-4 text-purple-700">Text Formatter</Link> or 
           <Link href="/image-to-pdf" className="underline underline-offset-4 ml-1 text-purple-700">Image to PDF converter</Link>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {sortedBlogs.map((blog) => (
            <article key={blog.id} className="bg-white p-4 group rounded shadow ">
              {blog.cover && (
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="flex flex-col rounded overflow-hidden"
                > <Image
                  src={blog.cover.url}
                  alt={blog.title}
                  width={blog.cover.width}
                  height={blog.cover.height}
                  // Responsive sizes — prevents browser downloading a 1200 px image
                  // for a ~400 px card slot, cutting image payload by ~60%.
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="w-full h-auto group-hover:scale-105 ease-in-out duration-300"
                /></Link>
              )}
              <h2 className="text-xl font-semibold mt-4">
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="hover:text-purple-600 transition"
                >
                  {blog.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-500 py-2 flex gap-2">
                <span>
                  <time dateTime={blog.date}>
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </span>
                <span aria-label={`Author: ${blog.author}`}>{blog.author}</span>
              </p>
              <p className="text-gray-600 line-clamp-3">{blog.description}</p>
              
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
