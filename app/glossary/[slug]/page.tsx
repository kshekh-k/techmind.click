import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Layout from "@/app/components/layout";
import { getGlossaryTermBySlug, getGlossaryTerms } from "@/app/lib/glossary";
import TextFormatter from "@/app/components/text-format";

const SITE_URL = "https://www.techmind.click";

type PageProps = {
  params: {
    slug: string;
  };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getGlossaryTerms().map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTermBySlug(slug);

  if (!term) {
    return {};
  }

  return {
    title: `${term.term} Meaning and Examples | Glossary`,
    description: term.shortDefinition,
    alternates: { canonical: `/glossary/${term.slug}` },
  };
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { slug } = await params;
  const term = getGlossaryTermBySlug(slug);

  if (!term) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/glossary/${term.slug}`;

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE_URL}/glossary` },
          { "@type": "ListItem", position: 3, name: term.term, item: canonicalUrl },
        ],
      },
      {
        "@type": "DefinedTerm",
        "@id": `${canonicalUrl}#defined-term`,
        name: term.term,
        description: term.definition,
        url: canonicalUrl,
        inDefinedTermSet: `${SITE_URL}/glossary#defined-term-set`,
        alternateName: term.aliases,
      },
      {
        "@type": "FAQPage",
        mainEntity: term.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }} />
      <section className="max-w-7xl mx-auto px-3 md:px-4 space-y-5 xl:space-y-10">
      <TextFormatter />
      <article className="rounded-lg border bg-white p-5">
        <header>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Glossary</p>
          <h1 className="text-3xl font-bold mt-1">{term.term}</h1>
          <p className="mt-3 text-muted-foreground">{term.shortDefinition}</p>
        </header>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Definition</h2>
          <p className="mt-2 leading-7">{term.definition}</p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Examples</h2>
          <ul className="mt-2 space-y-2">
            {term.examples.map((example) => (
              <li key={`${example.label}-${example.value}`} className="rounded border px-3 py-2">
                <span className="font-semibold">{example.label}: </span>
                <span>{example.value}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Common Questions</h2>
          <div className="mt-2 space-y-3">
            {term.faqs.map((faq) => (
              <div key={faq.q} className="rounded border px-3 py-2">
                <h3 className="font-medium">{faq.q}</h3>
                <p className="text-sm text-muted-foreground mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Related Concepts</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {term.related.map((item) => (
              <Link key={item} href={`/glossary/${item}`} className="rounded bg-gray-100 px-2 py-1 text-sm underline underline-offset-4">
                {item.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Use This in TechMind Tools</h2>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link href={term.toolHref} className="text-purple-700 underline underline-offset-4">
              Open Text Formatter Tool
            </Link>
            {term.blogHrefs.map((href) => (
              <Link key={href} href={href} className="text-purple-700 underline underline-offset-4">
                Related Guide
              </Link>
            ))}
          </div>
        </section>

        <footer className="mt-6 text-xs text-muted-foreground">Last updated: {term.updatedAt}</footer>
      </article>
      </section>
    </Layout>
  );
}
