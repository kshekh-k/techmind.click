import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Layout from "@/app/components/layout";
import { getAuthorBySlug, getAuthors } from "@/app/lib/authors";

const SITE_URL = "https://www.techmind.click";

type PageProps = {
  params: {
    slug: string;
  };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAuthors().map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return {};
  }

  return {
    title: `${author.name} | Author Profile`,
    description: author.bio,
    alternates: { canonical: `/authors/${author.slug}` },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    description: author.bio,
    jobTitle: author.role,
    url: `${SITE_URL}/authors/${author.slug}`,
    sameAs: author.sameAs,
    worksFor: {
      "@type": "Organization",
      name: "TechMind Click",
      url: SITE_URL,
    },
    knowsAbout: author.expertise,
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="max-w-4xl mx-auto px-4 rounded-lg border bg-white p-5">
        <h1 className="text-3xl font-bold">{author.name}</h1>
        <p className="mt-1 text-muted-foreground">{author.role}</p>
        <p className="mt-4">{author.bio}</p>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Expertise</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            {author.expertise.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Profiles</h2>
          <div className="mt-2 flex flex-wrap gap-3">
            {author.sameAs.map((url) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 text-purple-700">
                {url}
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Related Resources</h2>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link href="/blogs" className="underline underline-offset-4 text-purple-700">Blog Articles</Link>
            <Link href="/glossary" className="underline underline-offset-4 text-purple-700">Glossary</Link>
            <Link href="/editorial-policy" className="underline underline-offset-4 text-purple-700">Editorial Policy</Link>
          </div>
        </section>
      </article>
    </Layout>
  );
}
