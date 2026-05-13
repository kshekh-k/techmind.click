import dynamic from "next/dynamic";
import { Suspense } from "react";
import Layout from "./components/layout";
import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

// Page-level metadata (overrides the root default set in layout.tsx)
export const metadata: Metadata = {
  title: "Free Online Text Formatter & Case Converter | TechMind Click",
  description:
    "Convert text to uppercase, lowercase, title case, sentence case and more — free, instant, no sign-up. The fastest online text formatter for writers, students and developers.",
  alternates: { canonical: "/" },
};

// Dynamic import — TextFormatter's JS is only fetched after the shell renders.
// This improves FCP and LCP because the initial HTML is served without waiting
// for the large component bundle to parse.
const TextFormatter = dynamic(() => import("./components/text-format"), {
  loading: () => (
    <div
      className="min-h-[400px] flex items-center justify-center text-muted-foreground"
      aria-busy="true"
      aria-label="Loading text formatter…"
    >
      Loading…
    </div>
  ),
});

const SITE_URL = "https://www.techmind.click";
const ORG_ID = `${SITE_URL}#organization`;
const WEBSITE_ID = `${SITE_URL}#website`;
const APP_ID = `${SITE_URL}#text-formatter-app`;

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "TechMind Click",
      url: SITE_URL,
      logo: `${SITE_URL}/techmind-click-logo.svg`,
      sameAs: [
        "https://x.com/kamranshekh",
        "https://www.linkedin.com/in/kshekh/",
        "https://www.facebook.com/kshekh01011986",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          url: `${SITE_URL}/contact-us`,
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "TechMind Click",
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/blogs?query={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": ["WebApplication", "SoftwareApplication"],
      "@id": APP_ID,
      name: "TechMind Text Formatter",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and a modern browser",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      url: SITE_URL,
      publisher: { "@id": ORG_ID },
      featureList: [
        "Uppercase and lowercase converter",
        "Sentence case and proper case converter",
        "Slug generator",
        "Whitespace cleanup",
        "Spell checking",
      ],
      description:
        "Free online text formatter and case converter with slug generation, spacing cleanup, and spelling checks.",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a text formatter tool?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A text formatter helps you quickly transform text into uppercase, lowercase, sentence case, proper case, and other readable formats.",
          },
        },
        {
          "@type": "Question",
          name: "Is TechMind Click text formatter free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, the text formatter is free to use with no sign-up required.",
          },
        },
        {
          "@type": "Question",
          name: "Can I generate SEO-friendly slugs from text?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can instantly convert plain text into clean, URL-friendly slugs.",
          },
        },
      ],
    },
    {
      "@type": "HowTo",
      "@id": `${SITE_URL}#howto-use-text-formatter`,
      name: "How to format text online with TechMind Click",
      description: "A quick process to format text for writing, SEO, and content cleanup.",
      totalTime: "PT1M",
      supply: [{ "@type": "HowToSupply", name: "Your text" }],
      step: [
        { "@type": "HowToStep", name: "Paste text", text: "Paste your text into the editor." },
        { "@type": "HowToStep", name: "Choose a transform", text: "Pick uppercase, lowercase, sentence case, proper case, or slugify." },
        { "@type": "HowToStep", name: "Copy result", text: "Review the output and copy the formatted text." },
      ],
    },
  ],
};

export default function Home() {
  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <Suspense
        fallback={
          <div
            className="min-h-[400px] flex items-center justify-center text-muted-foreground"
            aria-busy="true"
          >
            Loading…
          </div>
        }
      >
        <div className="max-w-7xl mx-auto px-3 md:px-4 space-y-5 xl:space-y-10">
        <TextFormatter />
      

      <Card className="shadow-sm !border-none">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-left">
           AI-Friendly Learning Hubs
          </CardTitle>
        </CardHeader>
         <CardContent>
        <p className="text-muted-foreground">
          Explore definition-first resources, expert-reviewed articles, and practical formatting guides designed for
          both human readers and AI retrieval systems.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link href="/glossary" className="underline underline-offset-4 text-purple-700">Glossary Definitions</Link>
          <Link href="/blogs" className="underline underline-offset-4 text-purple-700">Blog Knowledge Hub</Link>
          <Link href="/authors" className="underline underline-offset-4 text-purple-700">Authors and Contributors</Link>
          <Link href="/editorial-policy" className="underline underline-offset-4 text-purple-700">Editorial Policy</Link>
        </div>
        </CardContent>
      </Card>
      </div>
      </Suspense>
    </Layout>
  );
}
