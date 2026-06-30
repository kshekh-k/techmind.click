import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/app/components/layout";
import FAQAccordion from "@/app/components/faq-accordion";
import QRCodeGeneratorLoader from "@/app/components/tools/qr-generator/QRCodeGeneratorLoader";

const SITE_URL = "https://www.techmind.click";
const PAGE_PATH = "/create-qr-code-with-logo-free";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const faqs = [
  {
    question: "Does adding a logo make the QR code unscannable?",
    answer:
      "No. When a logo is added, error correction is automatically set to High (H level), which allows up to 30% of the code to be covered while remaining scannable.",
  },
  {
    question: "What image formats can I upload for the logo?",
    answer:
      "You can upload PNG, JPG, SVG, or WebP. PNG with a transparent background works best.",
  },
  {
    question: "How large should my logo be in the QR code?",
    answer:
      "Keep the logo at 20–30% of the total QR code area. The default logo size setting is already optimized for this.",
  },
  {
    question: "Can I use a dark QR code with a colored logo?",
    answer:
      "Yes. You can set any foreground and background color. Make sure there is enough contrast between the QR dots and background for reliable scanning.",
  },
];

const trustBadges = [
  "Free No Sign-Up",
  "PNG / SVG / PDF",
  "Auto Error Correction",
  "Brand-Ready Design",
];

const steps = [
  {
    title: "Enter Your URL or Content",
    description: "Type or paste the URL or text content you want the QR code to encode.",
    icon: "01",
  },
  {
    title: "Upload Your Logo",
    description: "Click the logo upload option in Style Options and choose your brand image file.",
    icon: "02",
  },
  {
    title: "Adjust Colors and Download",
    description: "Set foreground and background colors to match your brand, then download PNG, SVG, or PDF.",
    icon: "03",
  },
];

export const metadata: Metadata = {
  title: "Create a Custom QR Code with Logo Free | TechMind",
  description:
    "Add your brand logo to a QR code for free. Customize colors, dot style, and corner shapes, then download in PNG, SVG, or PDF — no sign-up required.",
  keywords: [
    "qr code with logo",
    "custom qr code with logo",
    "qr code generator with logo free",
    "branded qr code",
    "qr code logo upload",
    "create qr code with image",
    "qr code logo maker free",
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: "Create a Custom QR Code with Logo Free | TechMind",
    description:
      "Add your brand logo to a QR code for free. Customize colors, dot style, and corner shapes, then download in PNG, SVG, or PDF — no sign-up required.",
    url: PAGE_URL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create a Custom QR Code with Logo Free | TechMind",
    description:
      "Add your brand logo to a QR code for free. Customize colors, dot style, and corner shapes, then download in PNG, SVG, or PDF — no sign-up required.",
  },
};

export default function CreateQRCodeWithLogoFreePage() {
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
            name: "Create a Custom QR Code with Logo for Free",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to create a custom QR code with logo for free",
        description:
          "Upload your logo and customize colors to create a branded QR code using TechMind's free generator.",
        totalTime: "PT3M",
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
        name: "TechMind QR Code Generator with Logo",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: `${SITE_URL}/qr-code-generator`,
        featureList: [
          "Logo upload to center of QR code",
          "Auto H-level error correction",
          "Custom foreground and background colors",
          "PNG, SVG, and PDF download",
          "Dot style and corner shape customization",
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
                QR Code with Logo Generator
              </p>
              <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Create a Custom QR Code with Logo for Free
              </h1>
              <p className="mt-4 max-w-xl text-sm text-indigo-50 sm:text-base">
                Add your brand logo to the center of a QR code. Customize colors and
                dot styles, then download in PNG, SVG, or PDF — no account needed.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/qr-code-generator"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Create QR Code with Logo
                </Link>
                <Link
                  href="/download-qr-code-png-svg-pdf"
                  className="rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  Download PNG / SVG / PDF
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
                    Branded QR Code
                  </p>
                  {/* QR code with logo illustration */}
                  <div className="relative grid grid-cols-7 gap-0.5 rounded-lg border-2 border-white/40 bg-white/10 p-2.5">
                    {[1,1,1,0,1,1,1, 1,0,1,0,1,0,1, 1,1,1,0,1,1,1, 0,0,0,0,0,0,0, 1,1,1,0,1,1,1, 1,0,1,0,1,0,1, 1,1,1,0,1,1,1].map((cell, i) => (
                      <span
                        key={i}
                        className={`h-3 w-3 rounded-sm ${cell ? "bg-white" : "bg-transparent"}`}
                      />
                    ))}
                    {/* Center logo placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-500 text-[8px] font-bold text-white shadow">
                        TM
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-cyan-100">Logo embedded at center</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-200/70 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
          <div className="prose prose-lg max-w-none">
            <p>
              Branded QR codes are more trustworthy and more memorable than plain black
              and white codes. Research shows that QR codes with logos receive up to 80%
              more scans than unbranded ones. TechMind&apos;s free QR code generator lets you
              add your logo, match your brand colors, and download a print-ready file —
              all without creating an account.
            </p>
          </div>
        </section>

        <section aria-label="How to create a QR code with logo" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Add Your Logo to a QR Code in 3 Steps
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
          <h2>Understanding QR Code Error Correction Levels</h2>

          <p>
            QR codes have four error correction levels that determine how much damage or
            obstruction a code can withstand while remaining scannable:
          </p>

          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>Recovery Capacity</th>
                <th>Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>L (Low)</td>
                <td>~7%</td>
                <td>Clean digital environments</td>
              </tr>
              <tr>
                <td>M (Medium)</td>
                <td>~15%</td>
                <td>General purpose</td>
              </tr>
              <tr>
                <td>Q (Quartile)</td>
                <td>~25%</td>
                <td>Industrial printing</td>
              </tr>
              <tr>
                <td>H (High)</td>
                <td>~30%</td>
                <td>Logo overlay — auto-selected by TechMind</td>
              </tr>
            </tbody>
          </table>

          <p>
            When you upload a logo in TechMind, the generator automatically switches
            to H-level error correction. This means even with 30% of the code covered
            by your logo, the QR code will still scan reliably.
          </p>

          <h2>Why Branded QR Codes Get More Scans</h2>

          <p>
            A plain black-and-white QR code gives no indication of what it leads to.
            A branded QR code with your logo communicates trust and intent. People are
            more likely to scan a code that visually belongs to a brand they recognize
            than an anonymous square of dots.
          </p>

          <h2>Color Contrast Requirements</h2>

          <p>
            QR code scanners detect the pattern based on contrast between light and dark
            modules. For reliable scanning:
          </p>

          <ul>
            <li>Use a <strong>dark foreground</strong> on a <strong>light background</strong></li>
            <li>Maintain a minimum contrast ratio of 4:1</li>
            <li>Avoid inverting (light dots on dark backgrounds can scan poorly on some apps)</li>
            <li>Test your code with multiple devices before printing at scale</li>
          </ul>

          <h2>Use Cases for Branded QR Codes</h2>

          <ul>
            <li><strong>Product packaging</strong> — link to usage instructions, recipes, or reorder pages</li>
            <li><strong>Flyers and print ads</strong> — track campaign traffic with a unique landing page URL</li>
            <li><strong>Instagram bio</strong> — export a PNG for your link-in-bio image</li>
            <li><strong>Event badges</strong> — link to a speaker profile or session schedule</li>
            <li><strong>Restaurant menus</strong> — link to an online menu or ordering system</li>
          </ul>

          <h2>Saving Your Branded QR Code</h2>

          <p>
            Save your QR configuration to your TechMind profile to reuse colors, logo,
            and style settings across multiple campaigns. This is especially useful when
            creating a family of QR codes that all share the same visual identity.
          </p>

          <p>
            Start creating your branded QR code now with the{" "}
            <Link href="/qr-code-generator">TechMind QR Code Generator</Link>, or
            learn about{" "}
            <Link href="/download-qr-code-png-svg-pdf">
              downloading in PNG, SVG, and PDF formats
            </Link>.
          </p>
        </section>

        <section className="rounded-2xl border border-indigo-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Common questions about adding logos and customizing QR codes.
          </p>
          <div className="mt-5">
            <FAQAccordion items={faqs} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
