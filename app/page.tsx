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
                Format text instantly with our free online text formatter.
                Convert uppercase, lowercase, sentence case, title case, and
                other text formats in seconds. Fast, private, and no sign-up
                required.
              </p>
            </CardHeader>

            <CardContent>
              <div className="space-y-6 divide-y divide-gray-200 text-muted-foreground leading-7 prose max-w-none">
                <div className="pb-8">
                  <h3 className="text-center">Featured & Trusted</h3>

                  <p className="max-w-4xl mx-auto text-center">
                    TechMind is trusted by thousands of users for fast, private,
                    and free online productivity tools. We're also recognized by
                    leading product discovery platforms.
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
                        Built for Everyone
                      </h3>

                        <p className="mx-auto max-w-4xl text-muted-foreground">
                        TechMind helps writers, developers, students, marketers,
                        business owners, educators, and content creators
                        simplify everyday tasks with fast, browser-based tools
                        that are free, secure, and easy to use.
                      </p>

                      <div className="mt-6 flex flex-wrap justify-center gap-3">
                        {[
                          "✍️ Writers",
                          "💻 Developers",
                          "🎓 Students",
                          "📈 Marketers",
                          "🏢 Businesses",
                          "🎥 Creators",
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
                    Whether you're writing content, coding, studying, or
                    managing business documents, our text formatting tools help
                    you save time and improve consistency.
                  </p>
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <h4 className="mt-0!">✍️ Writers & Bloggers</h4>
                      <p className="mb-0!">
                        Format titles, convert sentence case, clean copied
                        content, and prepare articles for publishing.
                      </p>
                    </div>

                    <div>
                      <h4 className="mt-0!">💻 Developers</h4>
                      <p className="mb-0!">
                        Generate URL slugs, convert camelCase, snake_case, clean
                        code snippets, and organize text.
                      </p>
                    </div>

                    <div>
                      <h4 className="mt-0!">🎓 Students</h4>
                      <p className="mb-0!">
                        Prepare assignments, organize notes, fix copied text,
                        and improve readability.
                      </p>
                    </div>

                    <div>
                      <h4 className="mt-0!">📈 SEO Professionals</h4>
                      <p className="mb-0!">
                        Create SEO-friendly slugs, optimize headings, and
                        standardize content formatting.
                      </p>
                    </div>

                    <div>
                      <h4 className="mt-0!">🏢 Businesses</h4>
                      <p className="mb-0!">
                        Format emails, documents, product descriptions, and
                        reports quickly.
                      </p>
                    </div>

                    <div>
                      <h4 className="mt-0!">📱 Content Creators</h4>
                      <p className="mb-0!">
                        Prepare captions, social posts, and video descriptions
                        with ease.
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
                      Transform messy or inconsistent text into clean, readable
                      content with just one click. Compare how different
                      formatting options work using the same example.
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
                      Consistent text formatting improves readability, creates
                      professional-looking documents, helps writers maintain
                      style consistency, and generates clean, SEO-friendly URLs
                      for websites and blogs. With TechMind, every
                      transformation happens instantly in your browser—no
                      uploads, no sign-up, and no waiting.
                    </p>
                  </div>
                </div>
                 <div className="pb-8">
                  <h3>Case Converter Tools</h3>
                  <p>Quickly convert text into:</p>

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
                    Generate clean and readable URL slugs from any text
                    instantly. Remove unwanted characters, extra spaces,
                    duplicate line breaks, and messy formatting with one click.
                  </p>
                  <h4>Useful for:</h4>
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
                    organizing notes, cleaning copied text, or structuring
                    content for websites and apps, these utilities help make
                    text cleaner, more readable, and easier to manage.
                  </p>
                  <p>
                    Explore free online text formatting tools built for fast,
                    simple, and distraction-free usage.
                  </p>
                </div>
                 <div className="pb-8">
                  <h3>Why Choose TechMind?</h3>

                  <ul>
                    <li>⚡ Instant formatting</li>

                    <li>🔒 100% browser processing</li>

                    <li>🆓 Completely free</li>

                    <li>🚫 No signup</li>

                    <li>📱 Mobile friendly</li>

                    <li>♾ Unlimited usage</li>

                    <li>⚙️ Multiple formatting options</li>

                    <li>🌎 Works in every modern browser</li>
                  </ul>
                </div>
                 <div className="pb-8">
                  <h3>Related Tools & Resources</h3>
                  <p>
                    Explore more free productivity tools and helpful resources
                    from TechMind to simplify your everyday tasks.
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
                              Create custom QR codes for URLs, Wi-Fi, contacts,
                              and more.
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
                              Convert JPG, PNG, and other images into PDF
                              instantly.
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
                              Learn tips, tutorials, and best practices for
                              productivity.
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
                              Understand common technology and productivity
                              terms.
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
                    Learn how to format text, improve productivity, and use
                    TechMind's free online tools with our step-by-step guides.
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
                            Learn the easiest ways to convert uppercase text
                            into lowercase, sentence case, and title case in
                            seconds.
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
                            Remove unwanted spaces, broken line breaks, and
                            formatting issues before sending messages.
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
                            Discover how to combine JPG, PNG, and other images
                            into a professional PDF document online.
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
                            Learn how businesses use QR codes for menus,
                            payments, Wi-Fi, marketing, and customer engagement.
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
                            Understand URL slugs, naming conventions, and SEO
                            best practices to improve rankings and user
                            experience.
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
                    Proper text formatting improves readability, maintains
                    consistency across documents, helps search engines
                    understand page titles, creates cleaner URLs, and makes
                    digital content easier to read on every device. Whether
                    you're writing articles, preparing assignments, creating
                    software documentation, or publishing business content,
                    proper formatting helps present information professionally.
                  </p>

                  <h3>Why Choose TechMind?</h3>

                  <p>
                    Compare TechMind's free online text formatter with the
                    features commonly found in many text formatting tools.
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="px-4 py-3 text-left font-semibold">
                            Feature
                          </th>

                          <th className="px-4 py-3 text-center font-semibold text-primary">
                            TechMind
                          </th>

                          <th className="px-4 py-3 text-center font-semibold">
                            Many Online Tools
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-3">No Sign-Up Required</td>
                          <td className="px-4 py-3 text-center text-green-600 font-semibold">
                            <Check className="size-4 mx-auto" />
                          </td>
                          <td className="px-4 py-3 text-center">Sometimes</td>
                        </tr>

                        <tr className="border-b">
                          <td className="px-4 py-3">Unlimited Usage</td>
                          <td className="px-4 py-3 text-center text-green-600 font-semibold">
                            <Check className="size-4 mx-auto" />
                          </td>
                          <td className="px-4 py-3 text-center">
                            May have limits
                          </td>
                        </tr>

                        <tr className="border-b">
                          <td className="px-4 py-3">
                            Browser-Based Processing
                          </td>
                          <td className="px-4 py-3 text-center text-green-600 font-semibold">
                            <Check className="size-4 mx-auto" />
                          </td>
                          <td className="px-4 py-3 text-center">Varies</td>
                        </tr>

                        <tr className="border-b">
                          <td className="px-4 py-3">Privacy Focused</td>
                          <td className="px-4 py-3 text-center text-green-600 font-semibold">
                            <Check className="size-4 mx-auto" />
                          </td>
                          <td className="px-4 py-3 text-center">Varies</td>
                        </tr>

                        <tr className="border-b">
                          <td className="px-4 py-3">Fast Text Conversion</td>
                          <td className="px-4 py-3 text-center text-green-600 font-semibold">
                            <Check className="size-4 mx-auto" />
                          </td>
                          <td className="px-4 py-3 text-center">Usually</td>
                        </tr>

                        <tr className="border-b">
                          <td className="px-4 py-3">Mobile Friendly</td>
                          <td className="px-4 py-3 text-center text-green-600 font-semibold">
                            <Check className="size-4 mx-auto" />
                          </td>
                          <td className="px-4 py-3 text-center">Varies</td>
                        </tr>

                        <tr className="border-b">
                          <td className="px-4 py-3">Modern, Clean Interface</td>
                          <td className="px-4 py-3 text-center text-green-600 font-semibold">
                            <Check className="size-4 mx-auto" />
                          </td>
                          <td className="px-4 py-3 text-center">Varies</td>
                        </tr>

                        <tr className="border-b">
                          <td className="px-4 py-3">Free Forever</td>
                          <td className="px-4 py-3 text-center text-green-600 font-semibold">
                            <Check className="size-4 mx-auto" />
                          </td>
                          <td className="px-4 py-3 text-center">Not always</td>
                        </tr>

                        <tr className="border-b">
                          <td className="px-4 py-3">Works on Any Device</td>
                          <td className="px-4 py-3 text-center text-green-600 font-semibold">
                            <Check className="size-4 mx-auto" />
                          </td>
                          <td className="px-4 py-3 text-center">Usually</td>
                        </tr>

                        <tr>
                          <td className="px-4 py-3">
                            Multiple Text Formatting Options
                          </td>
                          <td className="px-4 py-3 text-center text-green-600 font-semibold">
                            <Check className="size-4 mx-auto" />
                          </td>
                          <td className="px-4 py-3 text-center">Varies</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                 <div className="pb-8">
                  <h3>More Free Productivity Tools</h3>

                  <p className="text-sm text-muted-foreground mt-2">
                    Discover more free online tools and resources from TechMind
                    for productivity, document management, and content creation.
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
