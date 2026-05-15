import dynamic from "next/dynamic";
import { Suspense } from "react";
import Layout from "./components/layout";
import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

/* ---------------------------------------
 * SEO Metadata
 * ------------------------------------- */

export const metadata: Metadata = {
  title: "Free Online Text Formatter & Case Converter | TechMind",

  description:
    "Format text instantly with TechMind. Convert uppercase, lowercase, sentence case, title case, and generate SEO-friendly slugs online for free.",

  keywords: [
    "text formatter",
    "case converter",
    "uppercase converter",
    "lowercase converter",
    "sentence case converter",
    "title case converter",
    "slug generator",
    "text formatting tool",
    "online text converter",
    "free text formatter",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Free Online Text Formatter & Case Converter | TechMind",

    description:
      "Convert uppercase, lowercase, sentence case, title case, and SEO-friendly slugs instantly with TechMind’s free online text formatter.",

    url: "https://www.techmind.click",

    siteName: "TechMind",

    type: "website",

    images: [
      {
        url: "/images/text-case-converter-and-formatter-techmind-click-otg.png",
        width: 1200,
        height: 630,
        alt: "TechMind Text Formatter & Case Converter",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Free Online Text Formatter & Case Converter | TechMind",

    description:
      "Convert text case, clean formatting, and generate SEO-friendly slugs instantly using TechMind.",

    images: [
      "/images/text-case-converter-and-formatter-techmind-click-otg.png",
    ],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
    },
  },
};

/* ---------------------------------------
 * Dynamic Import
 * ------------------------------------- */

const TextFormatter = dynamic(() => import("./components/text-format"), {
  loading: () => (
    <div
      className="min-h-[400px] flex items-center justify-center text-muted-foreground"
      aria-busy="true"
      aria-label="Loading text formatter"
    >
      Loading...
    </div>
  ),
});

/* ---------------------------------------
 * Constants
 * ------------------------------------- */

const SITE_URL = "https://www.techmind.click";

const ORG_ID = `${SITE_URL}#organization`;
const WEBSITE_ID = `${SITE_URL}#website`;
const APP_ID = `${SITE_URL}#text-formatter-app`;

/* ---------------------------------------
 * Schema Graph
 * ------------------------------------- */

const schemaGraph = {
  "@context": "https://schema.org",

  "@graph": [
    /* ---------------------------------------
     * Organization
     * ------------------------------------- */

    {
      "@type": "Organization",

      "@id": ORG_ID,

      name: "TechMind",

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

    /* ---------------------------------------
     * Website
     * ------------------------------------- */

    {
      "@type": "WebSite",

      "@id": WEBSITE_ID,

      url: SITE_URL,

      name: "TechMind",

      publisher: {
        "@id": ORG_ID,
      },

      inLanguage: "en",

      potentialAction: {
        "@type": "SearchAction",

        target: `${SITE_URL}/blogs?query={search_term_string}`,

        "query-input": "required name=search_term_string",
      },
    },

    /* ---------------------------------------
     * Web Application
     * ------------------------------------- */

    {
      "@type": ["WebApplication", "SoftwareApplication"],

      "@id": APP_ID,

      name: "TechMind Text Formatter",

      applicationCategory: "UtilitiesApplication",

      operatingSystem: "Any",

      browserRequirements:
        "Requires JavaScript and a modern browser",

      isAccessibleForFree: true,

      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },

      url: SITE_URL,

      publisher: {
        "@id": ORG_ID,
      },

      keywords: [
        "text formatter",
        "case converter",
        "sentence case converter",
        "slug generator",
        "uppercase converter",
      ],

      featureList: [
        "Uppercase converter",
        "Lowercase converter",
        "Sentence case converter",
        "Title case formatter",
        "Slug generator",
        "Whitespace cleanup",
        "Text formatting",
      ],

      about: [
        {
          "@type": "Thing",
          name: "Text Formatting",
        },
        {
          "@type": "Thing",
          name: "Case Conversion",
        },
        {
          "@type": "Thing",
          name: "SEO Slug Generation",
        },
      ],

      description:
        "Free online text formatter and case converter with sentence case conversion, slug generation, and whitespace cleanup.",
    },

    /* ---------------------------------------
     * FAQ Schema
     * ------------------------------------- */

    {
      "@type": "FAQPage",

      "@id": `${SITE_URL}#faq`,

      mainEntity: [
        {
          "@type": "Question",

          name: "What is a text formatter tool?",

          acceptedAnswer: {
            "@type": "Answer",

            text: "A text formatter helps you quickly convert and clean text using uppercase, lowercase, sentence case, title case, and formatting tools.",
          },
        },

        {
          "@type": "Question",

          name: "Is TechMind text formatter free to use?",

          acceptedAnswer: {
            "@type": "Answer",

            text: "Yes, TechMind’s online text formatter is completely free to use with no sign-up required.",
          },
        },

        {
          "@type": "Question",

          name: "Can I generate SEO-friendly slugs from text?",

          acceptedAnswer: {
            "@type": "Answer",

            text: "Yes, you can instantly convert plain text into clean and SEO-friendly URL slugs.",
          },
        },
      ],
    },

    /* ---------------------------------------
     * HowTo Schema
     * ------------------------------------- */

    {
      "@type": "HowTo",

      "@id": `${SITE_URL}#howto-use-text-formatter`,

      name: "How to format text online with TechMind",

      description:
        "Quickly convert text into uppercase, lowercase, sentence case, title case, or SEO-friendly slugs.",

      totalTime: "PT1M",

      supply: [
        {
          "@type": "HowToSupply",
          name: "Your text",
        },
      ],

      step: [
        {
          "@type": "HowToStep",

          name: "Paste text",

          text: "Paste your text into the editor.",
        },

        {
          "@type": "HowToStep",

          name: "Choose formatting option",

          text: "Select uppercase, lowercase, sentence case, title case, or slug generator.",
        },

        {
          "@type": "HowToStep",

          name: "Copy formatted text",

          text: "Review and copy the converted result instantly.",
        },
      ],
    },

    /* ---------------------------------------
     * Breadcrumb Schema
     * ------------------------------------- */

    {
      "@type": "BreadcrumbList",

      "@id": `${SITE_URL}#breadcrumb`,

      itemListElement: [
        {
          "@type": "ListItem",

          position: 1,

          name: "Home",

          item: SITE_URL,
        },
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
    <CardTitle
      as="h1"
      className="text-3xl md:text-4xl font-extrabold tracking-tight text-left leading-tight"
    >
      Free Text Conversion, Slug Generator & Formatting Tools for Developers, SEO & Content Cleanup
    </CardTitle>

    <p className="text-base md:text-lg text-muted-foreground mt-3 max-w-4xl">
      Use powerful online tools to convert text case, generate SEO-friendly URL slugs, remove extra spaces,
      clean line breaks, format content, and optimize text structure for websites, coding projects,
      documents, and AI-readable content.
    </p>
  </CardHeader>

  <CardContent>
    <div className="space-y-4 text-muted-foreground leading-7">
      <p>
        Our platform provides simple and fast text formatting utilities designed for developers, SEO professionals,
        students, bloggers, marketers, and everyday users. Easily transform uppercase text to lowercase,
        generate clean URL slugs, convert snake_case, remove duplicate spaces, clean unwanted line breaks,
        and format text instantly without installing any software.
      </p>

      <p>
        These tools help improve readability, text consistency, website formatting, SEO optimization,
        coding workflows, and structured content organization. Whether you are preparing website content,
        cleaning copied text, formatting database values, or generating search-friendly URLs,
        our utilities make the process faster and easier.
      </p>

      <p>
        Explore free online text conversion tools including case converters, whitespace removers,
        slug generators, snake case converters, camel case tools, line break removers,
        text cleanup utilities, and other formatting solutions built for modern web usage.
      </p>
    </div>

    <div className="mt-6 flex flex-wrap gap-4 text-sm md:text-base">
      <Link
        href="/glossary"
        className="underline underline-offset-4 text-purple-700 font-medium hover:text-purple-900 transition-colors"
      >
        Glossary Definitions
      </Link>

      <Link
        href="/blogs"
        className="underline underline-offset-4 text-purple-700 font-medium hover:text-purple-900 transition-colors"
      >
        Blog Knowledge Hub
      </Link>

      <Link
        href="/authors"
        className="underline underline-offset-4 text-purple-700 font-medium hover:text-purple-900 transition-colors"
      >
        Authors and Contributors
      </Link>

      <Link
        href="/editorial-policy"
        className="underline underline-offset-4 text-purple-700 font-medium hover:text-purple-900 transition-colors"
      >
        Editorial Policy
      </Link>
    </div>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-xl border p-4 bg-muted/30">
        <h2 className="font-semibold text-lg mb-2">
          Popular Text Formatting Tools
        </h2>

        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
          <li>Uppercase & lowercase converter</li>
          <li>Slug generator for SEO-friendly URLs</li>
          <li>Snake case & camel case converter</li>
          <li>Whitespace & duplicate space remover</li>
          <li>Line break and text cleanup tools</li>
        </ul>
      </div>

      <div className="rounded-xl border p-4 bg-muted/30">
        <h2 className="font-semibold text-lg mb-2">
          Built for SEO, Developers & Daily Productivity
        </h2>

        <p className="text-sm text-muted-foreground">
          Improve text formatting, content consistency, coding workflows, and URL structure using
          lightweight online utilities optimized for speed, accessibility, and modern web standards.
        </p>
      </div>
    </div>
  </CardContent>
</Card>
      </div>
      </Suspense>
    </Layout>
  );
}
