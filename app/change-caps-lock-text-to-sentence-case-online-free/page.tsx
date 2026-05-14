import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/app/components/layout";
import FAQAccordion from "@/app/components/faq-accordion";
import TextFormatter from "@/app/components/text-format";

const SITE_URL = "https://www.techmind.click";
const PAGE_PATH = "/change-caps-lock-text-to-sentence-case-online-free";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/images/text-case-converter-and-formatter-techmind-click-otg.png`;

const faqs = [
  {
    question: "Can I fix CAPS LOCK text for free?",
    answer: "Yes, TechMind's sentence case converter is completely free to use.",
  },
  {
    question: "Does this tool work on mobile devices?",
    answer:
      "Yes, it works on Android, iPhone, tablets, and desktop devices.",
  },
  {
    question: "Can I convert long paragraphs?",
    answer:
      "Yes, you can convert emails, articles, assignments, and long text instantly.",
  },
  {
    question: "Is my text saved?",
    answer:
      "No, your text is processed securely and is not permanently stored.",
  },
];

const trustBadges = [
  "Free Online Tool",
  "Works on Mobile",
  "No Sign-Up",
  "Instant Conversion",
];

const steps = [
  {
    title: "Paste Text",
    description: "Paste your all-caps content into the input box.",
    icon: "01",
  },
  {
    title: "Convert to Sentence Case",
    description: "Select the sentence case option to auto-fix capitalization.",
    icon: "02",
  },
  {
    title: "Copy Corrected Text",
    description: "Copy the cleaned text and use it in your email or document.",
    icon: "03",
  },
];

export const metadata: Metadata = {
  title: "Change CAPS LOCK Text to Sentence Case Online Free",
  description:
    "Typed an entire email or paragraph in CAPS LOCK? Instantly convert caps lock text into proper sentence case online for free using TechMind's text formatter tool.",
  keywords: [
    "change caps lock text",
    "sentence case converter",
    "caps lock to normal text",
    "convert caps lock text online",
    "text case converter",
    "fix caps lock text",
    "online sentence case converter",
    "convert uppercase to sentence case",
    "free text formatter",
    "case converter tool",
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: "Change CAPS LOCK Text to Sentence Case Online Free",
    description:
      "Typed an entire email or paragraph in CAPS LOCK? Instantly convert caps lock text into proper sentence case online for free using TechMind's text formatter tool.",
    url: PAGE_URL,
    type: "article",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Change caps lock text to sentence case online free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Change CAPS LOCK Text to Sentence Case Online Free",
    description:
      "Typed an entire email or paragraph in CAPS LOCK? Instantly convert caps lock text into proper sentence case online for free using TechMind's text formatter tool.",
    images: [OG_IMAGE],
  },
};

export default function ChangeCapsLockToSentenceCasePage() {
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
            name: "Change CAPS LOCK Text to Sentence Case Online Free",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to change caps lock text to sentence case online free",
        description:
          "Paste your uppercase text into TechMind, convert to sentence case, and copy your corrected text instantly.",
        totalTime: "PT1M",
        tool: [
          {
            "@type": "HowToTool",
            name: "TechMind Text Formatter",
            url: `${SITE_URL}/text-format`,
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Paste Text",
            text: "Paste your uppercase text into the input box.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Convert to Sentence Case",
            text: "Select the sentence case option.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Copy Corrected Text",
            text: "Copy your corrected sentence case text instantly.",
          },
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
      {
        "@type": "SoftwareApplication",
        name: "TechMind Sentence Case Converter",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: `${SITE_URL}/text-format`,
        featureList: [
          "Fix caps lock text",
          "Convert uppercase to sentence case",
          "Free sentence case converter",
          "Lowercase converter",
          "Title case formatter",
          "Slug generator",
          "Remove extra spaces",
        ],
      },
    ],
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <main className="mx-auto w-full max-w-7xl space-y-5 px-3 md:px-4 xl:space-y-10">
        <section id="tool" >
          <TextFormatter />
        </section>
        
        
        <section className="relative overflow-hidden rounded-3xl border border-purple-200/40 bg-gradient-to-br from-purple-700 via-violet-600 to-fuchsia-600 p-6 text-white shadow-2xl sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-fuchsia-200/20 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide backdrop-blur-sm">
                Online Text Formatter
              </p>
              <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Typed Everything in CAPS LOCK?
              </h1>
              <p className="mt-4 max-w-xl text-sm text-purple-50 sm:text-base">
                Convert your uppercase emails, documents, and paragraphs into
                proper sentence case instantly using TechMind's free online
                formatter.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/#"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-purple-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Fix CAPS LOCK Text
                </Link>
                <Link
                  href="/text-format"
                  className="rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  Try Free Sentence Case Tool
                </Link>
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-2 text-xs sm:text-sm">
                {trustBadges.map((badge) => (
                  <li
                    key={badge}
                    className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-purple-50 backdrop-blur-md"
                  >
                    {badge}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/25 bg-white/10 p-4 shadow-xl backdrop-blur-xl sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                <span className="ml-2 text-xs text-purple-100">www.techmind.click</span>
              </div>

              <div className="relative aspect-[1080/460] overflow-hidden rounded-xl border border-white/15 bg-slate-950/40 p-4 ring-1 ring-white/10 sm:p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.35),transparent_40%)]" />
                <div className="relative h-full">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-100 sm:text-xs">
                    TYPED EVERYTHING IN CAPS LOCK?
                  </p>
                  <p className="mt-2 text-sm font-medium text-fuchsia-100 sm:text-base">
                    Convert It to Proper Sentence Case Instantly
                  </p>

                  <div className="mt-4 rounded-lg bg-white/10 p-3">
                    <p className="font-mono text-[11px] text-purple-100 sm:text-xs">
                      THIS IS MY EMAIL WRITTEN IN CAPS.
                    </p>
                    <p className="my-1 text-center text-lg text-white/80">↓</p>
                    <p className="font-mono text-[11px] text-emerald-100 sm:text-xs">
                      This is my email written in caps.
                    </p>
                  </div>

                  <p className="absolute bottom-0 right-0 text-[10px] text-purple-100/90 sm:text-xs">
                    TechMind
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-purple-200/70 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
          <section className="prose prose-lg max-w-none">
            <p>
              Accidentally typed your email, message, or document in CAPS LOCK?
              Use TechMind's free online sentence case converter to instantly fix
              uppercase text and turn it into clean, readable sentence case.
            </p>
          </section>
        </section>

        <section aria-label="Sentence case conversion steps" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Convert in 3 Simple Steps
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.title}
                className="group rounded-2xl border border-purple-200/70 bg-gradient-to-b from-white/90 to-purple-50/80 p-5 shadow-md backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 text-sm font-bold text-white shadow">
                  {step.icon}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        

        <section className="prose prose-lg max-w-none rounded-2xl border border-slate-200 bg-white p-6 shadow-sm prose-headings:text-slate-900 prose-a:text-purple-700 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-purple-500 prose-blockquote:text-slate-700 prose-strong:text-slate-900">
          <h2>Why CAPS LOCK Text Is Hard to Read</h2>

          <p>
            Writing entire paragraphs in uppercase can make text difficult to read and
            look unprofessional in emails, documents, and social media posts.
          </p>

          <p>
            Many users accidentally leave CAPS LOCK enabled while typing quickly.
            Instead of manually rewriting everything, a sentence case converter can fix
            the formatting instantly.
          </p>

          <blockquote>
            "Good writing is clear thinking made visible." - Bill Wheeler
          </blockquote>

          <h2>What Is Sentence Case?</h2>

          <p>
            Sentence case is a writing format where only the first letter of a sentence
            is capitalized while the remaining letters stay lowercase.
          </p>

          <h3>Example</h3>

          <p>
            <strong>Before:</strong>
          </p>

          <pre>
            <code>THIS IS AN IMPORTANT EMAIL MESSAGE.</code>
          </pre>

          <p>
            <strong>After:</strong>
          </p>

          <pre>
            <code>This is an important email message.</code>
          </pre>

          <h2>How to Fix CAPS LOCK Text Online</h2>

          <ol>
            <li>Paste your uppercase text into the input box</li>
            <li>Select the "Sentence Case" option</li>
            <li>Copy your corrected text instantly</li>
          </ol>

          <h2>Why Use TechMind Instead of Manual Editing?</h2>

          <table>
            <thead>
              <tr>
                <th>Manual Editing</th>
                <th>TechMind Tool</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Time-consuming</td>
                <td>One-click conversion</td>
              </tr>
              <tr>
                <td>Easy to make mistakes</td>
                <td>Automatic formatting</td>
              </tr>
              <tr>
                <td>Hard for large text</td>
                <td>Works instantly for long paragraphs</td>
              </tr>
              <tr>
                <td>No formatting support</td>
                <td>Multiple formatting tools included</td>
              </tr>
            </tbody>
          </table>

          <h2>Perfect for Emails, Assignments, and Office Work</h2>

          <ul>
            <li>Fix office emails typed in CAPS</li>
            <li>Correct assignment formatting</li>
            <li>Clean copied text</li>
            <li>Improve readability instantly</li>
            <li>Format social media captions</li>
          </ul>

          <blockquote>
            "Simplicity is the ultimate sophistication." - Leonardo da Vinci
          </blockquote>

          <h2>Additional Formatting Features</h2>

          <ul>
            <li>UPPERCASE Converter</li>
            <li>lowercase Converter</li>
            <li>Title Case Formatter</li>
            <li>Slug Generator</li>
            <li>Remove Extra Spaces</li>
            <li>Text Formatter</li>
          </ul>

          <p>
            Need related help? Try the <Link href="/text-format">TechMind text case converter</Link>,
            learn the basics in <Link href="/blogs/what-is-sentence-case">what is sentence case</Link>,
            compare styles with <Link href="/blogs/title-case-vs-sentence-case-which-one-should-you-use">title case vs sentence case</Link>,
            or follow this tutorial:
            <Link href="/how-to-convert-uppercase-to-lowercase-without-excel">
              how to convert uppercase to lowercase without excel
            </Link>.
          </p>

          <h2>Frequently Asked Questions</h2>

          <h3>Can I fix CAPS LOCK text for free?</h3>
          <p>Yes, TechMind's sentence case converter is completely free to use.</p>

          <h3>Does this tool work on mobile devices?</h3>
          <p>Yes, it works on Android, iPhone, tablets, and desktop devices.</p>

          <h3>Can I convert long paragraphs?</h3>
          <p>
            Yes, you can convert emails, articles, assignments, and long text instantly.
          </p>

          <h3>Is my text saved?</h3>
          <p>No, your text is processed securely and is not permanently stored.</p>

          <h2>Final Thoughts</h2>

          <p>
            If you accidentally typed text with CAPS LOCK enabled, you do not need to
            rewrite everything manually. TechMind's free sentence case converter can
            instantly transform uppercase text into readable sentence case in one click.
          </p>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-purple-200/60 bg-gradient-to-br from-white to-purple-50/70 p-6 shadow-xl sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(168,85,247,0.15),transparent_36%),radial-gradient(circle_at_90%_90%,rgba(236,72,153,0.15),transparent_38%)]" />
          <div className="relative space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              Real TechMind Tool Preview
            </h2>
            <p className="max-w-3xl text-sm text-slate-600 sm:text-base">
              A live look at TechMind's text formatter interface to build trust and
              show exactly how quickly you can fix uppercase email text online.
            </p>

            <div className="overflow-hidden rounded-2xl border border-purple-200/70 bg-slate-950 p-2 shadow-2xl">
              <div className="mb-2 flex items-center gap-2 px-2 pt-1">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                <span className="ml-2 text-xs text-slate-300">www.techmind.click</span>
              </div>
              <Image
                src="/images/text-case-converter-and-formatter-techmind-click.png"
                alt="TechMind text formatter screenshot in browser frame"
                width={1280}
                height={720}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px"
                loading="lazy"
                className="h-auto w-full rounded-xl"
              />
            </div>
          </div>
        </section>

        <section aria-label="Writing quotes" className="grid gap-4 md:grid-cols-2">
          {["Simplicity is the ultimate sophistication.", "Good writing is clear thinking made visible."].map(
            (quote, index) => (
              <figure
                key={quote}
                className="rounded-2xl border border-purple-200/70 bg-white/55 p-6 shadow-md backdrop-blur-md"
              >
                <blockquote className="text-lg font-medium text-slate-800">"{quote}"</blockquote>
                <figcaption className="mt-3 text-sm text-purple-700">
                  {index === 0 ? "- Leonardo da Vinci" : "- Bill Wheeler"}
                </figcaption>
              </figure>
            )
          )}
        </section>

        <section className="rounded-2xl border border-purple-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Quick answers about using this free sentence case converter online.
          </p>
          <div className="mt-5">
            <FAQAccordion items={faqs} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
