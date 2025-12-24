import Header from "@/app/components/header";
import Link from "next/link";
import Image from "next/image";
import { strapiClient } from "@/app/lib/strapi";

export default async function BlogsPage() {
  const articles = strapiClient.collection("articles");

  let allArticles = { data: [] } as any;
  try {
    allArticles = await articles.find({
      populate: ["cover", "author"],
    });
  } catch (err) {
    // Log and continue — avoid failing the entire build when external fetch fails during prerender
    // eslint-disable-next-line no-console
    console.error("Failed to fetch articles from Strapi:", err);
    allArticles = { data: [] } as any;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-semibold">Blogs</h1>
        <div className="grid grid-cols-4 gap-6 mt-12">
          {allArticles.data.map((article:any) => (
            <div key={article.id} className="bg-white p-4 rounded shadow">
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <Image
                  src={
                    article.cover?.url
                      ? `${process.env.STRAPI_URL}${article.cover.url}`
                      : "/images/no-image-placeholder.png"
                  }
                  alt={article.title}
                  height={article.cover?.height || 300}
                  width={article.cover?.width || 300}
                  className="size-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <Link
                  href={`/blogs/${article.documentId}`}
                  className="text-xl font-semibold mt-4 hover:text-blue-500 duration-150 inline-block"
                >
                  {article.title}
                </Link>
                <p className="">{article.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
