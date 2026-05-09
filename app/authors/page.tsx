import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/app/components/layout";
import { getAuthors } from "@/app/lib/authors";

const SITE_URL = "https://www.techmind.click";

export const metadata: Metadata = {
  title: "Authors | TechMind Click",
  description: "Meet the contributors and editorial team behind TechMind Click content.",
  alternates: { canonical: "/authors" },
};

export default function AuthorsPage() {
  const authors = getAuthors();

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "TechMind Click Authors",
    itemListElement: authors.map((author, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/authors/${author.slug}`,
      name: author.name,
    })),
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold">Authors and Contributors</h1>
        <p className="mt-2 text-muted-foreground">Our content is reviewed by domain-focused contributors specializing in text formatting and content workflows.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {authors.map((author) => (
            <article key={author.slug} className="rounded-lg border bg-white p-4">
              <h2 className="text-xl font-semibold">
                <Link href={`/authors/${author.slug}`} className="underline underline-offset-4">{author.name}</Link>
              </h2>
              <p className="text-sm mt-1 text-muted-foreground">{author.role}</p>
              <p className="mt-2 text-sm">{author.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
