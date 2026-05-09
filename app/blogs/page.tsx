import Link from "next/link";
import Image from "next/image";
import blogs from "@/app/data/blog.json";
import { BlogType } from "@/app/lib/types";
import Layout from "@/app/components/layout";
import type { Metadata } from "next";

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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-3 md:p-4">
        <h1 className="text-4xl font-semibold">Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {sortedBlogs.map((blog) => (
            <article key={blog.id} className="bg-white p-4 rounded shadow">
              {blog.cover && (
                <Image
                  src={blog.cover.url}
                  alt={blog.title}
                  width={blog.cover.width}
                  height={blog.cover.height}
                  // Responsive sizes — prevents browser downloading a 1200 px image
                  // for a ~400 px card slot, cutting image payload by ~60%.
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="rounded w-full h-auto"
                />
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
