import Image from "next/image";
import Link from "next/link";
import blogs from "@/app/data/blog.json";
import { BlogType } from "@/app/lib/types";
import { normalizeBlog } from "@/app/lib/normalizeBlog";

type Props = {
  relatedPosts: string[];
  currentSlug: string;
};

export default function RelatedPosts({ relatedPosts, currentSlug }: Props) {
  const posts = (relatedPosts ?? [])
    .filter((slug) => slug !== currentSlug)
    .map((slug) => (blogs as BlogType[]).find((b) => b.slug === slug))
    .filter((b): b is BlogType => b !== undefined)
    .map(normalizeBlog)
    .slice(0, 4);

  if (posts.length === 0) return null;

  return (
    <aside aria-label="Related articles" className="mt-10">
      <h2 className="mb-5 text-xl font-bold text-gray-900">Related Articles</h2>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {posts.map((post) => (
          <article key={post.slug} className="group rounded bg-white p-4 shadow">
            <Link
              href={`/blogs/${post.slug}`}
              className="flex flex-col overflow-hidden rounded"
              aria-label={`Read related article: ${post.title}`}
            >
              {post.cover && (
                <Image
                  src={post.cover.url}
                  alt={post.title}
                  width={post.cover.width}
                  height={post.cover.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="h-auto w-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              )}
            </Link>

            <h3 className="mt-4 text-xl font-semibold leading-snug">
              <Link href={`/blogs/${post.slug}`} className="transition hover:text-purple-600">
                {post.title}
              </Link>
            </h3>

            {post.description && (
              <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">
                {post.description}
              </p>
            )}
          </article>
        ))}
      </div>
    </aside>
  );
}
