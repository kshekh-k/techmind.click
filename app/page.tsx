import dynamic from "next/dynamic";
import { Suspense } from "react";
import Layout from "./components/layout";
import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

/* ---------------------------------------
 * SEO Metadata
 * ------------------------------------- */
const siteUrl = "https://www.techmind.click"
const siteName = "TechMind.click"
const title = "Free Online Text Formatter & Case Converter | TechMind"
const description =
  "Format text instantly with our free online text formatter. Convert uppercase, lowercase, sentence case, title case, and more. Fast, private, and no sign-up required.";
const keywords = [
  "text formatter",
  "text formatter online",
  "case converter",
  "text case converter",
  "uppercase lowercase converter",
  "sentence case converter",
  "title case converter",
];
const featureList = [
  "Uppercase conversion",
  "Lowercase conversion",
  "Sentence case conversion",
  "Title case conversion",
  "Toggle case conversion",
  "Inverse case conversion",
  "Slug formatting",
  "Whitespace cleanup",
  "Line break cleanup",
  "Text formatting",
];
export const metadata: Metadata = {
  title: title,

  description: description,

  keywords: keywords,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: title,

    description: description,

    url: siteUrl,

    siteName: siteName,

    type: "website",

    images: [
      {
        url: "/images/text-case-converter-and-formatter-techmind-click-otg.png",
        width: 1200,
        height: 630,
        alt: "Free Online Text Formatter & Case Converter | TechMind",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: title,

    description: description,

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
 * Constants
 * ------------------------------------- */

const SITE_URL = siteUrl;
const ORG_ID = `${SITE_URL}#organization`;
const WEBSITE_ID = `${SITE_URL}#website`;
const APP_ID = `${SITE_URL}#text-formatter-app`;
const SEO_DESCRIPTION = description;

/* ---------------------------------------
 * Schema Graph
 * ------------------------------------- */

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization
    {
      "@type": "Organization",
      "@id": ORG_ID,

      name: siteName,
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

    // Website
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,

      url: SITE_URL,
      name: siteName,

      publisher: {
        "@id": ORG_ID,
      },

      inLanguage: "en",

      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/blogs?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },

    // Homepage
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}#homepage`,

      url: SITE_URL,

      name: "Free Online Text Formatter & Case Converter",

      isPartOf: {
        "@id": WEBSITE_ID,
      },

      about: {
        "@id": APP_ID,
      },

      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/text-case-converter-and-formatter-techmind-click-otg.png`,
      },

      breadcrumb: {
        "@id": `${SITE_URL}#breadcrumb`,
      },

      inLanguage: "en",
    },

    // Main Tool
    {
      "@type": ["WebApplication", "SoftwareApplication"],

      "@id": APP_ID,

      name: "TechMind Text Formatter & Case Converter",

      applicationCategory: "UtilitiesApplication",

      operatingSystem: "Any",

      browserRequirements: "Requires JavaScript and a modern browser",

      isAccessibleForFree: true,

      url: SITE_URL,

      publisher: {
        "@id": ORG_ID,
      },

      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },

      featureList: featureList,

      keywords: keywords,

      description: SEO_DESCRIPTION,
    },

    // Platform Schema (AEO)
    {
      "@type": "WebSite",

      "@id": `${SITE_URL}#platform`,

      name: siteName,     

      url: SITE_URL,

      publisher: {
        "@id": ORG_ID,
      },      

      description: SEO_DESCRIPTION,
    },

    // FAQ
    {
      "@type": "FAQPage",

      "@id": `${SITE_URL}#faq`,

      mainEntity: [
        {
          "@type": "Question",
          name: "What is a text formatter tool?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A text formatter helps convert and clean text using uppercase, lowercase, sentence case, title case and other formatting tools.",
          },
        },
        {
          "@type": "Question",
          name: "Is TechMind text formatter free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, TechMind text formatter is completely free to use.",
          },
        },
        {
          "@type": "Question",
          name: "Can I generate SEO-friendly URL slugs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can instantly generate clean SEO-friendly URL slugs.",
          },
        },
      ],
    },

    // HowTo
    {
      "@type": "HowTo",

      "@id": `${SITE_URL}#howto`,

      name: "How to use TechMind Text Formatter",

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
          text: "Paste your content into the editor.",
        },
        {
          "@type": "HowToStep",
          name: "Choose a formatting option",
          text: "Select uppercase, lowercase, title case, sentence case or slug generator.",
        },
        {
          "@type": "HowToStep",
          name: "Copy the result",
          text: "Copy the formatted text instantly.",
        },
      ],
    },

    // Breadcrumb
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

          {/* Privacy trust badge */}
          <div className="flex items-start gap-3 rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-900">
            <span className="mt-0.5 text-base leading-none">🔒</span>
            <div>
              <span className="font-semibold">Privacy First</span>
              {" — "}All text is processed locally in your browser. Nothing you
              type is ever sent to any server. Your content stays private.
            </div>
          </div>

          <Card className="shadow-sm !border-none">
            <CardHeader>
              <CardTitle
                as="h1"
                className="text-3xl md:text-4xl font-extrabold tracking-tight text-left leading-tight"
              >
                Free Online Text Formatter & Case Converter
              </CardTitle>

              <p className="text-base md:text-lg text-muted-foreground mt-3 max-w-4xl">
                Format text instantly with our free online text formatter.
                Convert uppercase, lowercase, sentence case, title case, and
                other text formats in seconds. Fast, private, and no sign-up
                required.
              </p>
            </CardHeader>

            <CardContent>
              <div className="space-y-4 text-muted-foreground leading-7 prose max-w-none">
                <p>
                  Our tools help writers, developers, students, bloggers, and
                  content creators organize and format text more efficiently
                  without installing any software.
                </p>

                <h3>Case Converter Tools</h3>
                <p>Quickly convert text into:</p>

                <ul>
                  <li>UPPERCASE</li>
                  <li>Lowercase</li>
                  <li>Sentence case</li>
                  <li>Title case</li>
                  <li>Toggle case</li>
                  <li>Inverse case</li>
                </ul>
                <h3>Text Cleanup & Slug Formatting</h3>
                <p>
                  Generate clean and readable URL slugs from any text instantly.
                  Remove unwanted characters, extra spaces, duplicate line
                  breaks, and messy formatting with one click.
                </p>
                <p>Useful for:</p>
                <ul>
                  <li>blog titles</li>
                  <li>content writing</li>
                  <li>document cleanup</li>
                  <li>project organization</li>
                  <li>readable text formatting</li>
                </ul>
                <h3>Simple Tools for Everyday Writing</h3>
                <p>
                  Whether you are formatting articles, preparing assignments,
                  organizing notes, cleaning copied text, or structuring content
                  for websites and apps, these utilities help make text cleaner,
                  more readable, and easier to manage.
                </p>
                <p>
                  Explore free online text formatting tools built for fast,
                  simple, and distraction-free usage.
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
                  className="underline underline-offset-4 font-medium text-purple-700 hover:text-purple-900 transition-colors"
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
                    Why Use Our Text Formatter?
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Improve text formatting, content consistency, coding
                    workflows, and URL structure using lightweight online
                    utilities optimized for speed, accessibility, and modern web
                    standards.
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
