import dynamic from "next/dynamic";
import { Suspense } from "react";
import Layout from "./components/layout";
import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  FileText,
  MoveDown,
  MoveRight,
  QrCode,
  Rocket,
  ScanText,
  Users,
} from "lucide-react";

/* ---------------------------------------
 * SEO Metadata
 * ------------------------------------- */
const siteUrl = "https://www.techmind.click";
const siteName = "TechMind.click";
const title = "Free Online Text Formatter & Case Converter | TechMind";
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

              <p className="text-base md:text-lg text-muted-foreground mt-3 ">
                Need to change the way your text is written? Paste it into the formatter and choose the format you need. You can change capitalization, clean up text, or create a URL slug without installing another app.
              </p>
            </CardHeader>

            <CardContent>
              <div className="space-y-6 divide-y divide-gray-200 text-muted-foreground leading-7 prose max-w-none">
                <div className="pb-8">
                  <h3 className="text-center">Featured & Trusted</h3>

                  <p className="max-w-4xl mx-auto text-center">
                    TechMind has been listed on several product discovery and software directories.
                  </p>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Product Hunt */}
                    <Link
                      href="https://www.producthunt.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-xl border bg-card p-6 transition-all hover:border-primary hover:shadow-lg no-underline!"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex size-14 items-center justify-center rounded-full bg-orange-100">
                          <Award className="size-7 text-orange-600" />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mt-0!">
                            Product Hunt
                          </h4>

                          <p className="mt-1 text-sm text-muted-foreground mb-0!">
                            Discover our free online tools on Product Hunt.
                          </p>
                        </div>

                        <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </div>
                    </Link>

                    {/* Fazier */}
                    <Link
                      href="https://fazier.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-xl border bg-card p-6 transition-all hover:border-primary hover:shadow-lg no-underline!"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex size-14 items-center justify-center rounded-full bg-blue-100">
                          <Rocket className="size-7 text-blue-600" />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mt-0!">
                            Fazier
                          </h4>

                          <p className="mt-1 text-sm text-muted-foreground mb-0!">
                            Featured among useful tools for creators,
                            developers, and businesses.
                          </p>
                        </div>

                        <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </div>

                  {/* Trust Section */}

                  <div className="mt-10 rounded-xl bg-muted p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 flex size-20 shrink-0 items-center justify-center rounded-full bg-purple-100">
                        <Users className="size-8 text-purple-500" />
                      </div>

                      <h3 className="text-xl font-semibold mt-2! text-center">
                        Everyone can use
                      </h3>

                      <p className="mx-auto max-w-4xl text-muted-foreground">
                        There are plenty of small situations where changing text by hand becomes annoying. You might need to fix the capitalization of a heading, clean text copied from another website, or turn a page title into a URL slug. That's what this formatter is for.
                      </p>

                      <div className="mt-6 flex flex-wrap justify-center gap-3">
                        {[
                          "✍️ Writers & Bloggers",
                          "💻 Developers",
                          "🎓 Students",
                          "📈 Marketers",
                          "🏢 Businesses",
                          "🎥 Content Creators",
                          "👨‍🏫 Educators",
                          "🧑‍💼 Professionals",
                        ].map((item) => (
                          <span
                            key={item}
                            className="rounded-full border bg-background px-4 py-2 text-sm font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pb-8">
                  <h3 className="text-center">Who Uses Our Free Text Formatter?</h3>
                  <p className="mx-auto max-w-4xl text-muted-foreground text-center">
                    Different people use the formatter for different things. A blogger might use it for a headline, a developer might need a slug or camelCase text, and a student might simply need to fix capitalization in copied notes.
                  </p>
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <h4 className="mt-0!">✍️ Writers & Bloggers</h4>
                      <p className="mb-0!">
                        Format article titles, clean up copied text, change capitalization, and prepare text before publishing.
                      </p>
                    </div>

                    <div>
                      <h4 className="mt-0!">💻 Developers</h4>
                      <p className="mb-0!">
                        Developers can use the converter when a piece of text needs to follow a particular naming style. For example, a phrase can be changed into camelCase, snake_case, or a URL slug.
                      </p>
                    </div>

                    <div>
                      <h4 className="mt-0!">🎓 Students</h4>
                      <p className="mb-0!">
                        If you have copied text from a website or document, you can use the formatter to fix capitalization, spacing, or unwanted line breaks before using it in your notes or assignment.
                      </p>
                    </div>

                    <div>
                      <h4 className="mt-0!">📈 SEO Professionals</h4>
                      <p className="mb-0!">
                        Create readable URL slugs, clean up text, and prepare headings and other content for websites.
                      </p>
                    </div>

                    <div>
                      <h4 className="mt-0!">🏢 Businesses</h4>
                      <p className="mb-0!">
                        Format product names, emails, documents, and other text used in day-to-day work.
                      </p>
                    </div>

                    <div>
                      <h4 className="mt-0!">📱 Content Creators</h4>
                      <p className="mb-0!">
                        Captions and video descriptions often get edited in several places before they are published. The formatter can help clean up the text and fix its capitalization before you post it.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pb-8">
                  <div className="text-center">
                    <h3 >
                      See the Difference Instantly
                    </h3>

                    <p className="mx-auto max-w-4xl text-muted-foreground">
                      Use the same piece of text to see how different formatting options change it.
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-5 lg:gap-4">
                    <div className="flex items-center justify-between flex-wrap gap-1 w-full">
                      <div className="flex flex-col gap-2 border p-2 rounded">
                        <span className="flex text-xs font-semibold text-purple-500">
                          Before
                        </span>
                        <pre className="my-0! py-1.5! px-2! leading-none! whitespace-pre-wrap break-words text-sm font-medium bg-muted text-gray-900">
                          {`THIS IS MY FIRST BLOG POST`}
                        </pre>
                      </div>

                      <MoveRight className="size-5 text-purple-500 shrink-0 " />

                      <div className="flex flex-col gap-2 border p-3 rounded">
                        <span className="flex text-xs font-semibold text-purple-500">
                          Sentence Case
                        </span>
                        <pre className="my-0! py-1.5! px-2! leading-none! whitespace-pre-wrap break-words text-sm font-medium bg-muted text-gray-900">
                          {`This is my first blog post.`}
                        </pre>
                      </div>

                      <MoveRight className="size-5 text-purple-500 shrink-0" />

                      <div className="flex flex-col gap-2 border p-2 rounded">
                        <span className="flex text-xs font-semibold text-purple-500">
                          Title Case
                        </span>
                        <pre className="my-0! py-1.5! px-2! leading-none! whitespace-pre-wrap break-words text-sm font-medium bg-muted text-gray-900">
                          {`This Is My First Blog Post`}
                        </pre>
                      </div>

                      <MoveRight className="size-5 text-purple-500 shrink-0" />

                      <div className="flex flex-col gap-2 border p-2 rounded">
                        <span className="flex text-xs font-semibold text-purple-500">
                          SEO-Friendly Slug
                        </span>
                        <pre className="my-0! py-1.5! px-2! leading-none! whitespace-pre-wrap break-words text-sm font-medium bg-muted text-gray-900">
                          {`this-is-my-first-blog-post`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pb-8">
                  {/* Why This Matters */}
                  <div className="mt-10 rounded-xl border border-green-200 bg-green-50 p-5">
                    <h3 className="text-lg mt-0! font-semibold text-green-800">
                      Why This Matters
                    </h3>

                    <p className="mt-3 leading-7 text-green-700 mb-0!">
                      Changing text manually can take time, especially when you need to format several lines or use the same text in different places. A case converter can handle these changes quickly and help you keep your formatting consistent.
                    </p>
                    <p className="mt-1 leading-7 text-green-700 mb-0! text-sm italic">For example, the same text may need to appear as a heading, a sentence, or a URL slug depending on where you use it.</p>
                  </div>
                </div>
                <div className="pb-8">
                  <h3>Choose a format below to change your text.</h3>


                  <ul>
                    <li>Uppercase Converter</li>
                    <li>Lowercase Converter</li>
                    <li>Sentence Case</li>
                    <li>Title Case</li>
                    <li>Toggle Case</li>
                    <li>Inverse Case</li>
                    <li>Slug Generator</li>
                    <li>Whitespace Cleanup</li>
                    <li>Line Break Cleanup</li>
                    <li>camelCase Converter</li>
                    <li>snake_case Converter</li>
                  </ul>
                </div>
                <div className="pb-8">
                  <h3>Text Cleanup & Slug Formatting</h3>
                  <p>
                    Clean up text by removing extra spaces, unwanted characters, and unnecessary line breaks. You can also turn a title or phrase into a URL-friendly slug.
                  </p>
                  <h4>Useful for:</h4>
                  <ul>
                    <li>Blog titles</li>
                    <li>Website URLs</li>
                    <li>Content editing</li>
                    <li>Notes and documents</li>
                    <li>Cleaning copied text</li>
                  </ul>
                  <h3>Simple Tools for Everyday Writing</h3>
                  <p>
                    Not every text problem needs a separate editor. If a copied paragraph has extra spaces or broken lines, you can clean it here. If you need a URL from a title, the slug converter can handle that too.
                  </p>

                </div>
                <div className="pb-8">
                  <h3>Why Choose TechMind?</h3>
                  <p>The formatter is designed for simple text formatting tasks without requiring an account or additional software.</p>
                  <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse overflow-hidden rounded-lg border border-gray-200 text-left text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border-b border-gray-200 px-4 py-3 font-semibold text-gray-900">
                            Feature
                          </th>
                          <th className="border-b border-gray-200 px-4 py-3 font-semibold text-gray-900">
                            TechMind
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-700">
                            No sign-up required
                          </td>
                          <td className="px-4 py-3 text-green-600">
                            ✅
                          </td>
                        </tr>

                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-700">
                            Browser-based
                          </td>
                          <td className="px-4 py-3 text-green-600">
                            ✅
                          </td>
                        </tr>

                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-700">
                            Multiple formatting options
                          </td>
                          <td className="px-4 py-3 text-green-600">
                            ✅
                          </td>
                        </tr>

                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-700">
                            Mobile-friendly
                          </td>
                          <td className="px-4 py-3 text-green-600">
                            ✅
                          </td>
                        </tr>

                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-700">
                            Free to use
                          </td>
                          <td className="px-4 py-3 text-green-600">
                            ✅
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
                <div className="pb-8">
                  <h3>Related Tools & Resources</h3>
                  <p>
                    Looking for something else? These are a few other tools and resources available on TechMind.
                  </p>
                  <ul className="list-none pl-0! grid gap-4 md:grid-cols-2">
                    <li>
                      <Link
                        href="/qr-code-generator"
                        className="group rounded-xl border p-4 transition-all hover:border-primary hover:bg-muted/30 no-underline! flex justify-between"
                      >
                        <div className="flex items-start gap-3">
                          <QrCode className="h-5 w-5 text-purple-600" />
                          <div>
                            <h4 className="font-semibold mt-0!">
                              QR Code Generator
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Create QR codes for links, contact details, Wi-Fi, and other information.
                            </p>
                          </div>
                        </div>

                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/image-to-pdf"
                        className="group rounded-xl border p-4 transition-all hover:border-primary hover:bg-muted/30 no-underline! flex justify-between"
                      >
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="font-semibold mt-0!">
                              Image to PDF
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Convert JPG, PNG, and other images into PDF files.
                            </p>
                          </div>
                        </div>

                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/blogs"
                        className="group rounded-xl border p-4 transition-all hover:border-primary hover:bg-muted/30 no-underline! flex justify-between"
                      >
                        <div className="flex items-start gap-3">
                          <BookOpen className="h-5 w-5 text-green-600" />
                          <div>
                            <h4 className="font-semibold mt-0!">Blog Hub</h4>
                            <p className="text-sm text-muted-foreground">
                              Browse tutorials and articles about TechMind tools and related topics.
                            </p>
                          </div>
                        </div>

                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/glossary"
                        className="group rounded-xl border p-4 transition-all hover:border-primary hover:bg-muted/30 no-underline! flex justify-between"
                      >
                        <div className="flex items-start gap-3">
                          <ScanText className="h-5 w-5 text-orange-600" />
                          <div>
                            <h4 className="font-semibold mt-0!">Glossary</h4>
                            <p className="text-sm text-muted-foreground">
                              Learn the meaning of common technology and productivity terms.
                            </p>
                          </div>
                        </div>

                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="pb-8">
                  <h3>Popular Guides</h3>

                  <p>
                    These guides explain common text-formatting tasks and show you how to handle them.
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Link
                      href="/blogs/how-to-convert-text-to-uppercase-online-fast-and-free"
                      className="group rounded-xl border p-4 transition-all hover:border-primary hover:bg-muted/30 no-underline! flex"
                    >
                      <div className="flex items-start gap-3">
                        <BookOpen className="mt-1 h-5 w-5 text-primary" />

                        <div className="flex-1">
                          <h4 className="font-semibold group-hover:text-primary mt-0!">
                            How to Convert Uppercase to Lowercase
                          </h4>

                          <p className="mt-1 text-sm text-muted-foreground">
                            Learn how to change uppercase text to lowercase and other common formats.
                          </p>
                        </div>

                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>

                    <Link
                      href="/blogs/alternating-case-small-caps-text-generator-copy-paste"
                      className="group rounded-xl border p-4 transition-all hover:border-primary hover:bg-muted/30 no-underline!"
                    >
                      <div className="flex items-start gap-3">
                        <BookOpen className="mt-1 h-5 w-5 text-primary" />

                        <div className="flex-1">
                          <h4 className="font-semibold group-hover:text-primary mt-0!">
                            Fix WhatsApp Text Formatting
                          </h4>

                          <p className="mt-1 text-sm text-muted-foreground">
                            Remove unwanted spaces, line breaks, and other formatting problems from copied text.
                          </p>
                        </div>

                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>

                    <Link
                      href="/blogs/how-to-convert-image-to-pdf-free-no-app-needed"
                      className="group rounded-xl border p-4 transition-all hover:border-primary hover:bg-muted/30 no-underline!"
                    >
                      <div className="flex items-start gap-3">
                        <BookOpen className="mt-1 h-5 w-5 text-primary" />

                        <div className="flex-1">
                          <h4 className="font-semibold group-hover:text-primary mt-0!">
                            Convert Image to PDF
                          </h4>

                          <p className="mt-1 text-sm text-muted-foreground">
                            Learn how to combine images into a PDF file.
                          </p>
                        </div>

                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>

                    <Link
                      href="/qr-code-generator-for-business"
                      className="group rounded-xl border p-4 transition-all hover:border-primary hover:bg-muted/30 no-underline!"
                    >
                      <div className="flex items-start gap-3">
                        <BookOpen className="mt-1 h-5 w-5 text-primary" />

                        <div className="flex-1">
                          <h4 className="font-semibold group-hover:text-primary mt-0!">
                            QR Codes for Business
                          </h4>

                          <p className="mt-1 text-sm text-muted-foreground">
                            Learn how businesses can use QR codes for links, payments, menus, Wi-Fi, and other purposes.
                          </p>
                        </div>

                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>

                    <Link
                      href="/blogs/what-is-a-url-slug-how-to-create-seo-friendly-slugs"
                      className="group rounded-xl border p-4 transition-all hover:border-primary hover:bg-muted/30 md:col-span-2 no-underline!"
                    >
                      <div className="flex items-start gap-3">
                        <BookOpen className="mt-1 h-5 w-5 text-primary" />

                        <div className="flex-1">
                          <h4 className="font-semibold group-hover:text-primary mt-0!">
                            How to Create SEO-Friendly URLs
                          </h4>

                          <p className="mt-1 text-sm text-muted-foreground">
                            Learn how to create short, readable URLs from page or article titles.
                          </p>
                        </div>

                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </div>

                  <div className="mt-6 text-center flex justify-end">
                    <Link
                      href="/blogs"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline! no-underline!"
                    >
                      View All Guides
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className="pb-8">
                  <h3>Why Text Formatting Matters</h3>

                  <p>
                    Formatting changes how text looks and how easily people can read it. A consistent style also makes headings, documents, captions, and other content easier to organize.
                  </p><p>
                    For example, a blog title may need Title Case, while a URL usually works better as a short, lowercase slug.
                  </p>


                </div>
                <div className="pb-8">
                  <h3>More Free Productivity Tools</h3>

                  <p className="text-sm text-muted-foreground mt-2">
                    You can also use these free TechMind tools:
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href="/qr-code-generator"
                      className="underline underline-offset-4 text-purple-700 font-medium hover:text-purple-900 transition-colors"
                    >
                      QR Code Generator
                    </Link>

                    <Link
                      href="/image-to-pdf"
                      className="underline underline-offset-4 text-purple-700 font-medium hover:text-purple-900 transition-colors"
                    >
                      Image to PDF
                    </Link>

                    <Link
                      href="/blogs"
                      className="underline underline-offset-4 text-purple-700 font-medium hover:text-purple-900 transition-colors"
                    >
                      Blog Hub
                    </Link>

                    <Link
                      href="/glossary"
                      className="underline underline-offset-4 text-purple-700 font-medium hover:text-purple-900 transition-colors"
                    >
                      Glossary
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Suspense>
    </Layout>
  );
}
