import Header from "@/app/components/header";
import { strapiClient } from "@/app/lib/strapi";
import { marked } from "marked";
import Image from "next/image";

type Props = {
  params: Promise<{ blog_id: string }>;
};

export default async function BlogsPage({ params }: Props) {
  const { blog_id } = await params;

  const articles = strapiClient.collection("articles");
  const response = await articles.findOne(blog_id, {
    populate: ["cover", "author", "blocks"],
  });

  const article = response.data;

  const articleBody = article.blocks.find(
    (block: any) => block.__component === "shared.rich-text"
  );

  return (
    <>
      <Header />
      <div className="container mx-auto py-12">
        <div className="prose mx-auto">
          <Image
            src={
              article.cover?.url
                ? `${process.env.STRAPI_URL}${article.cover.url}`
                : "/images/no-image-placeholder.png"
            }
            alt={article.title}
            height={article.cover?.height || 300}
            width={article.cover?.width || 300}
            className="mx-auto"
          />
          <h1>{article.title}</h1>
          <article
            className="mt-12"
            dangerouslySetInnerHTML={{
              __html: marked.parse(articleBody?.body),
            }}
          />
        </div>
      </div>
    </>
  );
}
