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
    "Convert text instantly with free online case converter and text formatting tools designed for writers, developers, students, bloggers, and content creators. Easily transform uppercase to lowercase, generate clean URL slugs, remove extra spaces, clean line breaks, and organize text for blogs, notes, coding projects, and documents. Our simple text formatting utilities help improve readability, content structure, and writing consistency without complicated software or installation. Quickly format Sentence case, Title Case, camelCase, snake_case, and slug text with one click. Whether you are preparing blog content, cleaning copied text, formatting UI labels, generating readable slugs, or organizing written content, these tools make text cleanup faster and easier.",

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
      "Convert text instantly with free online case converter and text formatting tools designed for writers, developers, students, bloggers, and content creators. Easily transform uppercase to lowercase, generate clean URL slugs, remove extra spaces, clean line breaks, and organize text for blogs, notes, coding projects, and documents. Our simple text formatting utilities help improve readability, content structure, and writing consistency without complicated software or installation. Quickly format Sentence case, Title Case, camelCase, snake_case, and slug text with one click. Whether you are preparing blog content, cleaning copied text, formatting UI labels, generating readable slugs, or organizing written content, these tools make text cleanup faster and easier.",

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
      "Convert text instantly with free online case converter and text formatting tools designed for writers, developers, students, bloggers, and content creators. Easily transform uppercase to lowercase, generate clean URL slugs, remove extra spaces, clean line breaks, and organize text for blogs, notes, coding projects, and documents. Our simple text formatting utilities help improve readability, content structure, and writing consistency without complicated software or installation. Quickly format Sentence case, Title Case, camelCase, snake_case, and slug text with one click. Whether you are preparing blog content, cleaning copied text, formatting UI labels, generating readable slugs, or organizing written content, these tools make text cleanup faster and easier.",

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
        "Convert text instantly with free online case converter and text formatting tools designed for writers, developers, students, bloggers, and content creators. Easily transform uppercase to lowercase, generate clean URL slugs, remove extra spaces, clean line breaks, and organize text for blogs, notes, coding projects, and documents. Our simple text formatting utilities help improve readability, content structure, and writing consistency without complicated software or installation. Quickly format Sentence case, Title Case, camelCase, snake_case, and slug text with one click. Whether you are preparing blog content, cleaning copied text, formatting UI labels, generating readable slugs, or organizing written content, these tools make text cleanup faster and easier.",
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
        "Convert text instantly with free online case converter and text formatting tools designed for writers, developers, students, bloggers, and content creators. Easily transform uppercase to lowercase, generate clean URL slugs, remove extra spaces, clean line breaks, and organize text for blogs, notes, coding projects, and documents. Our simple text formatting utilities help improve readability, content structure, and writing consistency without complicated software or installation. Quickly format Sentence case, Title Case, camelCase, snake_case, and slug text with one click. Whether you are preparing blog content, cleaning copied text, formatting UI labels, generating readable slugs, or organizing written content, these tools make text cleanup faster and easier.",

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
                Free Case Converter, Slug Generator & Text Formatting Tools
              </CardTitle>

              <p className="text-base md:text-lg text-muted-foreground mt-3 max-w-4xl">
                Convert text case, generate clean URL slugs, remove extra spaces, clean line breaks, and format content instantly with simple online text utilities designed for modern writing and content workflows.
              </p>
            </CardHeader>

            <CardContent>
              <div className="space-y-4 text-muted-foreground leading-7 prose max-w-none">
                <p>
                  Our tools help writers, developers, students, bloggers, and content creators organize and format text more efficiently without installing any software.
                </p>

                <h3>
                  Case Converter Tools
                </h3>
                <p>Quickly convert text into:</p>

                <ul>
                  <li>UPPERCASE</li>
                  <li>Lowercase</li>
                  <li>Sentence case</li>
                  <li>Title case</li>
                  <li>Toggle case</li>
                  <li>Inverse case</li>
                </ul>
                <h3>Slug Generator & Text Cleanup</h3>
                <p>
                  Generate clean and readable URL slugs from any text instantly. Remove unwanted characters, extra spaces, duplicate line breaks, and messy formatting with one click.
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
                  Whether you are formatting articles, preparing assignments, organizing notes, cleaning copied text, or structuring content for websites and apps, these utilities help make text cleaner, more readable, and easier to manage.
                </p>
                <p>Explore free online text formatting tools built for fast, simple, and distraction-free usage.</p>
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
