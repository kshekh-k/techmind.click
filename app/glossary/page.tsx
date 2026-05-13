import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/app/components/layout";
import { getGlossaryTerms } from "@/app/lib/glossary";
import TextFormatter from "../components/text-format";

const SITE_URL = "https://www.techmind.click";

export const metadata: Metadata = {
  title: "Glossary | Text Formatting Definitions and Concepts",
  description:
    "Explore clear definitions for text formatting terms like sentence case, title case, slug, camel case, and more.",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryPage() {
  const terms = getGlossaryTerms();

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE_URL}/glossary` },
        ],
      },
      {
        "@type": "DefinedTermSet",
        "@id": `${SITE_URL}/glossary#defined-term-set`,
        name: "TechMind Click Text Formatting Glossary",
        hasDefinedTerm: terms.map((term) => ({
          "@type": "DefinedTerm",
          name: term.term,
          url: `${SITE_URL}/glossary/${term.slug}`,
          inDefinedTermSet: `${SITE_URL}/glossary#defined-term-set`,
        })),
      },
    ],
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }} />
      <section className="max-w-7xl mx-auto px-3 md:px-4 space-y-5 xl:space-y-10">
        <TextFormatter />
        <h1 className="text-3xl md:text-4xl font-bold">Text Formatting Glossary</h1>
        <p className="mt-3 text-muted-foreground max-w-3xl">
          This glossary defines core formatting concepts used in writing, SEO, and developer workflows.
          Each term includes practical usage notes, examples, and links to related tools.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {terms.map((term) => (
            <article key={term.slug} className="rounded-lg border bg-white p-4">
              <h2 className="text-xl font-semibold">
                <Link href={`/glossary/${term.slug}`} className="underline underline-offset-4">
                  {term.term}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{term.shortDefinition}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                <span className="text-xs rounded bg-gray-100 px-2 py-1">{term.category}</span>
                {term.aliases.slice(0, 2).map((alias) => (
                  <span key={alias} className="text-xs rounded bg-gray-100 px-2 py-1">{alias}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
