import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/app/components/layout";
import FAQAccordion from "@/app/components/faq-accordion";
import QRCodeGeneratorLoader from "@/app/components/tools/qr-generator/QRCodeGeneratorLoader";

const SITE_URL = "https://www.techmind.click";
const PAGE_PATH = "/qr-code-generator-for-business";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const faqs = [
  {
    question: "Can I put a QR code on my business card?",
    answer:
      "Yes. Generate a URL QR code pointing to your website or LinkedIn, download as PDF or SVG for print quality, and add it to your card design.",
  },
  {
    question: "What URL should I use for a business QR code?",
    answer:
      "Link to your website homepage, a specific landing page, your LinkedIn profile, or a contact vCard page.",
  },
  {
    question: "Can I add my company logo to the QR code?",
    answer:
      "Yes. Upload your logo in the customization panel. The error correction is automatically raised so the code stays scannable.",
  },
  {
    question: "What format should I download for printing?",
    answer:
      "Download SVG or PDF for print — they are vector formats that scale to any size without blurring.",
  },
];

const trustBadges = [
  "Free No Sign-Up",
  "Print-Ready PDF & SVG",
  "Logo Support",
  "Custom Brand Colors",
];

const steps = [
  {
    title: "Enter Your Business URL",
    description: "Enter your business URL or contact page link into the QR generator.",
    icon: "01",
  },
  {
    title: "Add Logo and Brand Colors",
    description: "Upload your logo and set your brand colors in the style options panel.",
    icon: "02",
  },
  {
    title: "Download and Print",
    description: "Download as SVG or PDF and print on business cards at any size.",
    icon: "03",
  },
];

export const metadata: Metadata = {
  title: "Free QR Code Generator for Business Cards & Marketing | TechMind",
  description:
    "Create professional QR codes for business cards, marketing materials, and campaigns. Customize colors, add your logo, and download in PNG, SVG, or PDF — free.",
  keywords: [
    "qr code generator for business",
    "business card qr code",
    "qr code for marketing",
    "custom qr code for business",
    "qr code generator free business",
    "qr code business card maker",
    "professional qr code generator",
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: "Free QR Code Generator for Business Cards & Marketing | TechMind",
    description:
      "Create professional QR codes for business cards, marketing materials, and campaigns. Customize colors, add your logo, and download in PNG, SVG, or PDF — free.",
    url: PAGE_URL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator for Business Cards & Marketing | TechMind",
    description:
      "Create professional QR codes for business cards, marketing materials, and campaigns. Customize colors, add your logo, and download in PNG, SVG, or PDF — free.",
  },
};

export default function QRCodeGeneratorForBusinessPage() {
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
            name: "QR Code Generator",
            item: `${SITE_URL}/qr-code-generator`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Free QR Code Generator for Business Cards and Marketing",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to create a QR code for business cards and marketing",
        description:
          "Generate a professional QR code for your business card or marketing materials using TechMind's free QR code generator.",
        totalTime: "PT2M",
        tool: [
          {
            "@type": "HowToTool",
            name: "TechMind QR Code Generator",
            url: `${SITE_URL}/qr-code-generator`,
          },
        ],
        step: steps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.title,
          text: step.description,
        })),
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
        name: "TechMind QR Code Generator for Business",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: `${SITE_URL}/qr-code-generator`,
        featureList: [
          "Business card QR code generation",
          "Logo upload support",
          "Custom brand colors",
          "PNG, SVG, and PDF download",
          "Print-ready vector export",
          "No sign-up required",
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
        <section id="tool">
          <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center text-muted-foreground">Loading QR Code Generator…</div>}>
            <QRCodeGeneratorLoader />
          </Suspense>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-indigo-200/40 bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-600 p-6 text-white shadow-sm sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide backdrop-blur-sm">
                Business QR Code Generator
              </p>
              <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Free QR Code Generator for Business Cards and Marketing
              </h1>
              <p className="mt-4 max-w-xl text-sm text-indigo-50 sm:text-base">
                Create professional, branded QR codes for business cards, flyers, and
                marketing campaigns. Add your logo, set brand colors, and download
                print-ready SVG or PDF — completely free.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/qr-code-generator"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Create Business QR Code
                </Link>
                <Link
                  href="/create-qr-code-with-logo-free"
                  className="rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  Add Logo to QR Code
                </Link>
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-2 text-xs sm:text-sm">
                {trustBadges.map((badge) => (
                  <li
                    key={badge}
                    className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-indigo-50 backdrop-blur-md"
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
                <span className="ml-2 text-xs text-indigo-100">www.techmind.click</span>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/15 bg-slate-950/40 p-5 ring-1 ring-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.3),transparent_40%)]" />
                <div className="relative flex h-full flex-col items-center justify-center gap-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-indigo-100">
                    Business Card QR Code
                  </p>
                  {/* QR code illustration */}
                  <div className="grid grid-cols-7 gap-0.5 rounded-lg border-2 border-white/40 bg-white/10 p-2.5">
                    {Array.from({ length: 49 }).map((_, i) => {
                      const corners = [0,1,2,7,8,9,14,6,13,20,42,43,44,49,48,47,41,35,36,37,38];
                      const isDark = corners.includes(i) || Math.random() > 0.5;
                      return (
                        <span
                          key={i}
                          className={`h-3 w-3 rounded-sm ${isDark ? "bg-white" : "bg-transparent"}`}
                        />
                      );
                    })}
                  </div>
                  <p className="text-xs text-cyan-100">Scan to visit website</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-200/70 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
          <div className="prose prose-lg max-w-none">
            <p>
              A QR code on your business card bridges the physical and digital worlds.
              Instead of asking someone to type a URL, they scan your code and land
              directly on your website, LinkedIn profile, or portfolio — in seconds.
              TechMind&apos;s free QR code generator lets you create branded, print-ready
              codes with no account required.
            </p>
          </div>
        </section>

        <section aria-label="How to create a business QR code" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Create Your Business QR Code in 3 Steps
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.title}
                className="group rounded-2xl border border-indigo-200/70 bg-gradient-to-b from-white/90 to-indigo-50/80 p-5 shadow-md backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-sm font-bold text-white shadow">
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

        <section className="prose prose-lg max-w-none rounded-2xl border border-slate-200 bg-white p-6 shadow-sm prose-headings:text-slate-900 prose-a:text-indigo-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900">
          <h2>Why QR Codes on Business Cards Increase Engagement</h2>

          <p>
            Studies consistently show that business cards with QR codes generate more
            follow-through than those without. When someone receives your card, typing a
            URL is friction. Scanning a QR code is effortless — it takes under two
            seconds on any modern smartphone.
          </p>

          <p>
            Linking your QR code to a dedicated landing page (rather than just your
            homepage) allows you to track campaign performance, personalize the message
            for the event or audience, and update the destination without reprinting
            cards.
          </p>

          <h2>Best Practices for Business Card QR Codes</h2>

          <h3>Minimum Print Size</h3>
          <p>
            Print your QR code at a minimum of 2cm × 2cm (about 0.8 inches). Below
            this size, cameras struggle to focus and scanning reliability drops sharply.
            For business cards, 2.5cm–3cm is ideal.
          </p>

          <h3>Color Contrast</h3>
          <p>
            Always use a dark foreground on a light background. Avoid low-contrast
            combinations like light grey on white or yellow on white — scanning apps
            rely on contrast to detect the QR pattern. A minimum contrast ratio of 4:1
            is recommended.
          </p>

          <h3>What URL to Link</h3>
          <ul>
            <li><strong>Website homepage</strong> — suitable for general networking</li>
            <li><strong>LinkedIn profile</strong> — great for professional events and conferences</li>
            <li><strong>Portfolio or case study page</strong> — ideal for designers, developers, and freelancers</li>
            <li><strong>vCard contact page</strong> — lets people save your contact details directly</li>
          </ul>

          <h3>Logo and Branding</h3>
          <p>
            Adding your logo to the center of the QR code increases brand recognition
            and scan rates. TechMind automatically raises error correction to H-level
            (30% redundancy) when a logo is present, ensuring the code remains fully
            scannable even with the center obscured.
          </p>

          <h2>Marketing Materials Beyond Business Cards</h2>

          <p>
            Business QR codes work equally well on brochures, exhibition banners, email
            signatures (as an image), packaging inserts, and product labels. Any
            printed touchpoint where you want to drive someone to a digital destination
            is a candidate for a QR code.
          </p>

          <h2>Saving Your QR Code for Future Updates</h2>

          <p>
            Save your QR code configuration to your TechMind profile so you can reload
            and regenerate it if your URL or branding changes. Updating a saved QR code
            takes seconds — no need to redesign from scratch.
          </p>

          <p>
            Ready to build your business QR code? Use the{" "}
            <Link href="/qr-code-generator">TechMind QR Code Generator</Link>, or learn
            how to add a logo with the guide on{" "}
            <Link href="/create-qr-code-with-logo-free">
              creating a custom QR code with logo
            </Link>.
          </p>
        </section>

        <section className="rounded-2xl border border-indigo-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Common questions about creating QR codes for business cards and marketing.
          </p>
          <div className="mt-5">
            <FAQAccordion items={faqs} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
