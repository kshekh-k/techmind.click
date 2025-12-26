import Header from "@/app/components/header";
import Link from "next/link";
import Image from "next/image";
import blogs from "@/app/data/blog.json";
import { BlogType } from "@/app/lib/types";
import Layout from "@/app/components/layout";

export default function BlogsPage() {
  return (
    <>
 
<Layout>
      <div className="max-w-7xl mx-auto p-3 md:p-4" >
        <h1 className="text-4xl font-semibold">Blogs</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {(blogs as BlogType[]).map((blog) => (
            <div key={blog.id} className="bg-white p-4 rounded shadow">
              {blog.cover && (
                <Image
                  src={blog.cover.url}
                  alt={blog.title}
                  width={blog.cover.width}
                  height={blog.cover.height}
                  className="rounded"
                />
              )}

              <h2 className="text-xl font-semibold mt-4">
                <Link href={`/blogs/${blog.slug}`} className="hover:text-purple-600 transition">{blog.title}</Link>
              </h2>

              {/* Meta info */}
              <p className="text-sm text-gray-500 py-2 flex gap-2">
                 <span>
                🗓️ <time dateTime={blog.date}>
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time></span>
               <span> 
                👤 {blog.author}</span>
              </p>

              <p className="text-gray-600">{blog.description}</p>
            </div>
          ))}
        </div>
      </div></Layout>
    </>
  );
}
