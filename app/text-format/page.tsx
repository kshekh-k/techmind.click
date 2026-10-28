import Layout from "@/app/components/layout";
import TextFormatter from "@/app/components/text-format";
import FAQAccordion from "@/app/components/faq-accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Lock,
  QrCode,
  Sparkles,
  Zap,
} from "lucide-react";

const SITE_URL = "https://www.techmind.click";
const PAGE_URL = `${SITE_URL}/text-format`;

export const metadata: Metadata = {
  title: "Online Text Formatter & Editor | Free Case Converter - TechMind",
  description:
    "Transform, clean, and convert text online: uppercase, lowercase, sentence case, title case, camelCase, slugify, and whitespace cleanup. Fast, free, and 100% browser-based.",
  alternates: {
    canonical: "/text-format",
  },
  openGraph: {
    title: "Online Text Formatter & Editor | Free Case Converter - TechMind",
    description:
      "Transform, clean, and convert text online: uppercase, lowercase, sentence case, title case, camelCase, slugify, and whitespace cleanup. Fast, free, and 100% browser-based.",
    url: PAGE_URL,
    type: "website",
    siteName: "TechMind",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Text Formatter & Editor | Free Case Converter - TechMind",
    description:
      "Transform, clean, and convert text online: uppercase, lowercase, sentence case, title case, camelCase, slugify, and whitespace cleanup. Fast, free, and 100% browser-based.",
  },
};

const faqs = [
  {
    question: "Is my text uploaded or stored on TechMind servers?",
    answer:
      "No. All transformations run entirely client-side inside your browser using JavaScript. Your pasted text never leaves your device and is never logged, stored, or transmitted to any remote server.",
  },
  {
    question: "What is the difference between Title Case and Sentence Case?",
    answer:
      "Sentence case capitalizes only the first letter of each sentence and proper nouns (e.g., 'The quick brown fox jumps.'). Title case capitalizes the primary words in a headline or title while keeping short conjunctions, articles, and prepositions in lowercase (e.g., 'The Quick Brown Fox Jumps').",
  },
  {
    question: "How does the URL Slug generator handle special characters?",
    answer:
      "The slugify function normalizes accented characters (such as é to e), strips out non-alphanumeric punctuation marks, replaces spaces and underscores with hyphens, and converts all characters to lowercase for search-engine friendly URLs.",
  },
  {
    question: "Can I clean up messy text copied from PDFs or scanned documents?",
    answer:
      "Yes. The extra whitespace cleaner removes repeated spaces and tabs, while the line break cleaner joins broken lines caused by narrow PDF columns while preserving intentional double line breaks between paragraphs.",
  },
  {
    question: "Is there any character or word limit when formatting text?",
    answer:
      "No artificial limits are imposed by TechMind. You can format short snippets or full multi-page articles. Performance is bounded only by your browser's local device memory.",
  },
];

const transformationModes = [
  {
    title: "UPPERCASE",
    description: "Converts every character to capital letters. Ideal for warning labels, constants in code, and loud headings.",
    exampleBefore: "submit application now",
    exampleAfter: "SUBMIT APPLICATION NOW",
  },
  {
    title: "lowercase",
    description: "Transforms all letters to small characters. Essential for normalizing email addresses, database keys, and domain names.",
    exampleBefore: "User.Name@Domain.COM",
    exampleAfter: "user.name@domain.com",
  },
  {
    title: "Sentence case",
    description: "Capitalizes the first character of each sentence following terminal punctuation (. ! ?). Restores natural reading flow.",
    exampleBefore: "all caps error. another mistake here.",
    exampleAfter: "All caps error. Another mistake here.",
  },
  {
    title: "Title Case",
    description: "Applies standard headline capitalization, capitalizing major words while preserving lowercase on minor words.",
    exampleBefore: "the complete guide to modern web design",
    exampleAfter: "The Complete Guide to Modern Web Design",
  },
  {
    title: "camelCase & snake_case",
    description: "Formats phrases into standard programming naming conventions for variables, database columns, and API parameters.",
    exampleBefore: "order status code",
    exampleAfter: "orderStatusCode / order_status_code",
  },
  {
    title: "URL Slugify",
    description: "Removes special characters, accents, and punctuation, replacing spaces with clean hyphens for permalinks.",
    exampleBefore: "What is a 100% Free Online Tool?!",
    exampleAfter: "what-is-a-100-free-online-tool",
  },
  {
    title: "Whitespace & Line Break Cleanup",
    description: "Strips consecutive spaces and accidental line wraps from copied PDF columns, emails, and OCR scans.",
    exampleBefore: "Text   with    awkward \n line\nbreaks.",
    exampleAfter: "Text with awkward line breaks.",
  },
];

export default function TextFormat() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Text Formatter & Editor",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "WebApplication",
        name: "TechMind Online Text Formatter & Editor",
        url: PAGE_URL,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript and a modern web browser",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Uppercase and lowercase conversion",
          "Sentence case normalization",
          "Title case headline formatting",
          "URL slug generation",
          "Whitespace and double space cleanup",
          "Line break removal",
          "camelCase and snake_case formatting",
          "Real-time character and word count statistics",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
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

      <main className="max-w-7xl mx-auto px-3 md:px-4 space-y-6 md:space-y-10 py-4">
        {/* Interactive Tool Component */}
        <section id="tool" aria-label="Text Formatter Tool">
          <TextFormatter />
        </section>

        {/* Privacy First Callout */}
        <div className="flex items-start gap-3 rounded-xl border border-purple-200 bg-purple-50/80 p-4 text-sm text-purple-950 shadow-sm">
          <Lock className="h-5 w-5 text-purple-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-purple-900">
              100% Client-Side Privacy Guarantee
            </p>
            <p className="text-purple-800 leading-relaxed">
              Every formatting action runs locally in your browser memory via JavaScript.
              No text you paste is ever transmitted to, stored on, or logged by our servers.
              Your confidential drafts, emails, and notes remain strictly on your machine.
            </p>
          </div>
        </div>

        {/* Editorial Guide Card */}
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-700">
              <Sparkles className="h-4 w-4" />
              <span>Reference &amp; Practical Guide</span>
            </div>
            <CardTitle as="h1" className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              Online Text Formatter &amp; Case Conversion Guide
            </CardTitle>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Whether you are cleaning text copied from a PDF document, preparing headlines for a blog post,
              generating clean URL slugs for SEO, or normalizing data columns for programming, having the right
              casing style saves manual editing effort and eliminates grammatical mistakes.
            </p>
          </CardHeader>

          <CardContent className="space-y-8 text-slate-700 leading-relaxed text-sm md:text-base">
            {/* Supported Transformations Grid */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-2">
                Available Formatting Modes &amp; Use Cases
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {transformationModes.map((mode) => (
                  <div
                    key={mode.title}
                    className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900">{mode.title}</h3>
                      <span className="text-[11px] font-semibold text-purple-700 uppercase bg-purple-100 px-2 py-0.5 rounded">
                        Transform
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-600">
                      {mode.description}
                    </p>
                    <div className="rounded border bg-white p-2 text-xs font-mono space-y-1">
                      <div className="text-slate-400">Input:  {mode.exampleBefore}</div>
                      <div className="text-emerald-700 font-semibold">Output: {mode.exampleAfter}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* How to use the editor */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-2">
                How to Format and Clean Text in 3 Simple Steps
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 p-4 bg-white space-y-2">
                  <div className="flex items-center gap-2 text-purple-700 font-bold">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-sm">1</span>
                    <h3>Paste Your Text</h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600">
                    Paste raw text into the input field from your document, PDF, email, spreadsheet, or chat window.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4 bg-white space-y-2">
                  <div className="flex items-center gap-2 text-purple-700 font-bold">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-sm">2</span>
                    <h3>Select Format Mode</h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600">
                    Click any conversion button (e.g. Sentence Case, Title Case, Slugify, or Space Remover) to apply changes immediately.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4 bg-white space-y-2">
                  <div className="flex items-center gap-2 text-purple-700 font-bold">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-sm">3</span>
                    <h3>Copy or Download</h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600">
                    Click the Copy button to copy your formatted result to your clipboard, or download it as a plain text file.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Editing Pitfalls */}
            <section className="space-y-3 rounded-xl border border-amber-200 bg-amber-50/60 p-5 text-amber-950">
              <h3 className="font-bold text-amber-900 flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-700" />
                Tips for Handling Complex Text Edge Cases
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-amber-900">
                <li>
                  <strong>Acronyms in Sentence Case:</strong> Converting all-caps text to sentence case will lower words like <em>NASA</em>, <em>HTML</em>, or <em>FBI</em>. Review acronyms after conversion to restore uppercase letters.
                </li>
                <li>
                  <strong>Accented Characters &amp; Diacritics:</strong> UTF-8 accents (like é, à, ü, ñ) are preserved accurately in case conversion, but normalized to standard ASCII letters when using the URL slug generator.
                </li>
                <li>
                  <strong>Hard Line Wraps:</strong> When copying text from PDFs or terminal screens, lines often contain hard carriage returns. Use the Line Break Cleaner to re-wrap sentences into continuous paragraphs.
                </li>
              </ul>
            </section>

            {/* Related Tools Navigation */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-2">
                Explore More Free Utilities on TechMind
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/qr-code-generator"
                  className="group rounded-xl border border-slate-200 p-4 transition-all hover:border-purple-300 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <QrCode className="h-5 w-5 text-purple-600 mt-1" />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-slate-900 group-hover:text-purple-700">
                        QR Code Generator
                      </h4>
                      <p className="text-xs text-slate-600">
                        Create customizable QR codes with logos, custom colors, and vector SVG/PDF download.
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/image-to-pdf"
                  className="group rounded-xl border border-slate-200 p-4 transition-all hover:border-purple-300 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-blue-600 mt-1" />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-slate-900 group-hover:text-purple-700">
                        Image to PDF
                      </h4>
                      <p className="text-xs text-slate-600">
                        Convert JPG, PNG, and camera photos into submission-ready PDF files directly in your browser.
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/blogs"
                  className="group rounded-xl border border-slate-200 p-4 transition-all hover:border-purple-300 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-1" />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-slate-900 group-hover:text-purple-700">
                        Productivity Tutorials
                      </h4>
                      <p className="text-xs text-slate-600">
                        Read practical guides on formatting standards, SEO URL optimization, and document prep.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </section>

            {/* FAQs */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-2">
                Frequently Asked Questions
              </h2>
              <FAQAccordion items={faqs} />
            </section>
          </CardContent>
        </Card>
      </main>
    </Layout>
  );
}
