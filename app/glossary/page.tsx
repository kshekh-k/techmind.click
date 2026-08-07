import type { Metadata } from "next";
import Layout from "@/app/components/layout";
import { getGlossaryTerms } from "@/app/lib/glossary";
import GlossaryClientList from "./GlossaryClientList";

const SITE_URL = "https://www.techmind.click";

export const metadata: Metadata = {
  title: "TechMind Glossary - Tech, SEO, QR, PDF & Programming Terms",
  description:
    "Explore TechMind's comprehensive, data-driven glossary of text formatting, SEO, QR codes, PDF conversion, AI writing, and web development terms.",
  alternates: { canonical: "/glossary" },
  openGraph: {
    title: "TechMind Glossary - Tech, SEO, QR, PDF & Programming Terms",
    description: "Explore TechMind's comprehensive, data-driven glossary of text formatting, SEO, QR codes, PDF conversion, AI writing, and web development terms.",
    url: "/glossary",
    siteName: "TechMind",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechMind Glossary - Tech, SEO, QR, PDF & Programming Terms",
    description: "Explore TechMind's comprehensive, data-driven glossary of text formatting, SEO, QR codes, PDF conversion, AI writing, and web development terms.",
  }
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
        name: "TechMind Productivity & Web Development Glossary",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <GlossaryClientList terms={terms} />
    </Layout>
  );
}

