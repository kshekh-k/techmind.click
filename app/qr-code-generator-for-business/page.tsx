import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/app/components/layout";
import FAQAccordion from "@/app/components/faq-accordion";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  FileCheck,
  Layers,
  Printer,
  QrCode,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

const SITE_URL = "https://www.techmind.click";
const PAGE_PATH = "/qr-code-generator-for-business";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const faqs = [
  {
    question:
      "Should I link my business card QR code to a vCard or a website URL?",
    answer:
      "For most business cards, linking to a mobile-friendly digital business card page or website landing page is recommended over a raw vCard. Raw vCards encode extensive text directly into the QR code matrix, creating a very dense, high-module pattern that requires a larger print size (at least 3.5cm) to scan reliably. A short URL keeps the QR code simple, clean, and easily scannable even at compact 2.5cm dimensions.",
  },
  {
    question:
      "What is the minimum physical size for a QR code on a business card?",
    answer:
      "The minimum recommended print size is 2.5 cm × 2.5 cm (approximately 1 inch × 1 inch). Printing smaller than 2 cm significantly reduces camera autofocus reliability, especially on older smartphone lenses or under dim ambient lighting.",
  },
  {
    question:
      "Which file format should I download for professional card printing?",
    answer:
      "Always download in vector SVG or PDF format. Unlike raster PNG or JPEG images that have a fixed pixel resolution and blur when scaled or printed, SVG and PDF files are mathematically defined vectors that render at the maximum DPI of any offset press or digital print shop.",
  },
  {
    question: "Can I print a colored QR code that matches my brand identity?",
    answer:
      "Yes, provided you maintain a strong contrast ratio of at least 4:1 between the dark foreground modules and the light background. Dark navy, forest green, deep purple, and charcoal on white or light cream scan consistently. Avoid yellow, light grey, or inverted (white dots on dark background) codes, as many smartphone camera sensors fail to recognize them.",
  },
  {
    question: "How does adding a company logo affect scanning reliability?",
    answer:
      "When embedding a logo in the center of a QR code, TechMind automatically raises the Reed-Solomon error correction to Level H (30% redundancy). This ensures that even though the center modules are obscured by the logo, the remaining data and finder patterns allow phones to decode the destination instantly.",
  },
];

const trustBadges = [
  "Print-Ready SVG & PDF",
  "Error Correction Level H",
  "High-Contrast Standards",
  "No Sign-Up Required",
];

const steps = [
  {
    title: "1. Select Destination Type",
    description:
      "Choose a concise website URL, portfolio link, or digital card landing page rather than a heavy raw vCard.",
  },
  {
    title: "2. Style with Brand Colors & Logo",
    description:
      "Apply your primary brand color to the foreground dots and embed your company logo with Level H error correction.",
  },
  {
    title: "3. Export Vector SVG or PDF",
    description:
      "Download resolution-independent vector files to provide directly to your print shop or design template.",
  },
  {
    title: "4. Test Physical Proof Before Full Run",
    description:
      "Print a 1:1 scale sample on the actual paper stock and test scan with both iOS and Android cameras before printing hundreds of cards.",
  },
];

const commonMistakes = [
  {
    title: "Printing with Glossy or Spot-UV Coating Over the Code",
    description:
      "High-gloss laminates reflect overhead lighting directly into phone camera lenses, creating glare that prevents barcode sensors from reading the matrix. Always specify a matte finish over the QR code area.",
  },
  {
    title: "Encoding Too Much Data Directly (Dense Matrix)",
    description:
      "Encoding a full contact card with phone, multiple emails, street address, and notes creates hundreds of tiny data modules that blur together on standard cardstock. Link to a hosted contact page instead.",
  },
  {
    title: "Ignoring the Quiet Zone (Border Margin)",
    description:
      "Every QR code requires an unbroken margin of at least 4 module widths around all four sides. Cropping the border too close to graphic elements or card edges stops scanning software from identifying code boundaries.",
  },
  {
    title: "Inverting Foreground and Background Colors",
    description:
      "While modern iPhone cameras can often detect white QR codes on dark cards, many Android default camera apps still expect dark modules on a light background. Never use inverted colors on business-critical collateral.",
  },
];

export const metadata: Metadata = {
  title:
    "Business Card QR Code Guide: Print Sizing, Formats & Design - TechMind",
  description:
    "Comprehensive guide for creating professional QR codes on business cards. Learn minimum print dimensions, SVG vector requirements, logo error correction, and scanning test checklists.",
  keywords: [
    "qr code generator for business",
    "business card qr code guide",
    "qr code print size business card",
    "vcard qr code best practices",
    "svg qr code business card",
    "custom branded qr code printing",
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title:
      "Business Card QR Code Guide: Print Sizing, Formats & Design - TechMind",
    description:
      "Comprehensive guide for creating professional QR codes on business cards. Learn minimum print dimensions, SVG vector requirements, logo error correction, and scanning test checklists.",
    url: PAGE_URL,
    type: "article",
    siteName: "TechMind",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Business Card QR Code Guide: Print Sizing, Formats & Design - TechMind",
    description:
      "Comprehensive guide for creating professional QR codes on business cards. Learn minimum print dimensions, SVG vector requirements, logo error correction, and scanning test checklists.",
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
            name: "Business Card QR Code Guide",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "Article",
        headline:
          "Business Card QR Code Guide: Print Sizing, Formats & Design Best Practices",
        description:
          "Practical guidance on creating high-converting, scannable QR codes for business cards, brochures, and corporate stationery.",
        author: {
          "@type": "Organization",
          name: "TechMind",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "TechMind",
          url: SITE_URL,
        },
        mainEntityOfPage: PAGE_URL,
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

      <main className="mx-auto w-full max-w-7xl space-y-6 md:space-y-10 px-3 md:px-4 py-4">
        {/* Tool Launch Banner (Replacing Duplicate Widget) */}
        <section
          aria-label="Create QR Code Tool Callout"
          className="rounded-2xl border border-indigo-200 bg-linear-to-r from-indigo-900 via-indigo-800 to-blue-900 p-6 text-white shadow-md sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-300/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-100">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                <span>Primary Interactive Tool</span>
              </div>
              <h1 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl leading-tight">
                Business Card QR Code Guide &amp; Generator
              </h1>
              <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
                Need to create a print-ready QR code for your business card,
                flyer, or packaging? Use our full interactive generator to
                customize colors, embed your company logo, and download vector
                SVG or PDF files ready for the print shop.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                {trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-md border border-white/20 bg-white/10 px-2.5 py-1 text-indigo-100 font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/qr-code-generator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-cyan-300 hover:shadow-cyan-400/25"
              >
                <QrCode className="h-5 w-5" />
                <span>Launch QR Code Generator</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-center text-xs text-indigo-200">
                Free &bull; No Sign-Up &bull; High-Res Vector SVG
              </p>
            </div>
          </div>
        </section>

        {/* Core Strategy Guide */}
        <section className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <div className="space-y-2 border-b pb-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Choosing the Right QR Destination for Your Business Card
              </h2>
              <p className="text-slate-600 text-sm md:text-base">
                The most critical decision when adding a QR code to business
                stationery is selecting what the code actually contains.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-5 space-y-3 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-900">
                    Recommended: Digital Contact Landing Page
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Link your code to a clean, mobile-optimized personal landing
                  page (or LinkedIn profile). Because the QR code only encodes a
                  short URL, the barcode grid remains spacious and easily
                  scanned by any camera.
                </p>
                <ul className="text-xs text-slate-700 space-y-1 list-disc pl-5">
                  <li>
                    Small, low-density QR matrix fits in tight card corners
                  </li>
                  <li>
                    Destination can be updated without reprinting physical cards
                  </li>
                  <li>Scan analytics can be tracked via UTM parameters</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 p-5 space-y-3 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <h3 className="font-bold text-slate-900">
                    Use with Caution: Raw vCard Text
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A raw vCard embeds your entire contact card (full name, phone
                  numbers, job title, company, address) directly into the code
                  itself without internet access.
                </p>
                <ul className="text-xs text-slate-700 space-y-1 list-disc pl-5">
                  <li>
                    Creates a very dense matrix with hundreds of microscopic
                    dots
                  </li>
                  <li>
                    Requires a minimum physical footprint of 3.5cm to scan
                    reliably
                  </li>
                  <li>Cannot be updated once cards are printed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Print Sizing and Optical Rules */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-2 border-b pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700">
              <Printer className="h-4 w-4" />
              <span>Print Specifications</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Optical Print Rules &amp; Dimensional Requirements
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 space-y-2">
              <span className="text-xs font-bold text-indigo-700 uppercase">
                Minimum Size
              </span>
              <div className="text-2xl font-black text-slate-900">
                2.5 &times; 2.5 cm
              </div>
              <p className="text-xs text-slate-600">
                Approximately 1 &times; 1 inch. Below this size, smartphone
                camera lenses struggle with optical focus.
              </p>
            </div>

            <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 space-y-2">
              <span className="text-xs font-bold text-indigo-700 uppercase">
                Quiet Zone
              </span>
              <div className="text-2xl font-black text-slate-900">
                &ge; 4 Modules
              </div>
              <p className="text-xs text-slate-600">
                Leave an unbroken margin of at least 4 module widths of blank
                background around all four sides.
              </p>
            </div>

            <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 space-y-2">
              <span className="text-xs font-bold text-indigo-700 uppercase">
                Export Format
              </span>
              <div className="text-2xl font-black text-slate-900">
                SVG or PDF
              </div>
              <p className="text-xs text-slate-600">
                Never supply JPEG or 72 DPI PNG to a print vendor. Vectors scale
                crisply to any DPI plate.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="font-bold text-slate-900 text-lg">
              Card Finishes: Matte vs. Glossy vs. Textured Papers
            </h3>
            <div className="grid gap-4 md:grid-cols-3 text-sm">
              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <h4 className="font-semibold text-slate-900">
                  Matte Laminate (Recommended)
                </h4>
                <p className="text-xs text-slate-600">
                  Scatters ambient light evenly and prevents optical
                  reflections. Scanning apps achieve near-100% first-pass read
                  rates.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <h4 className="font-semibold text-slate-900">
                  Spot-UV / Gloss (Warning)
                </h4>
                <p className="text-xs text-slate-600">
                  Reflects ceiling lamps and outdoor sunlight like a mirror. Do
                  not apply spot-gloss varnish directly across the QR matrix.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <h4 className="font-semibold text-slate-900">
                  Kraft &amp; Textured Linen
                </h4>
                <p className="text-xs text-slate-600">
                  Porous cardstock causes wet ink to bleed, narrowing the white
                  margins between dots. Size up by at least 20% on textured
                  stock.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Steps to Production */}
        <section aria-label="Step-by-step workflow" className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
            Step-by-Step Business Card QR Preparation
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-2"
              >
                <h3 className="font-bold text-slate-900 text-sm md:text-base">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 md:p-8 space-y-5">
          <div className="flex items-center gap-2 text-rose-900 font-bold text-lg md:text-xl">
            <ShieldAlert className="h-6 w-6 text-rose-600 shrink-0" />
            <h2>4 Costly Business Card QR Mistakes to Avoid</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {commonMistakes.map((mistake) => (
              <div
                key={mistake.title}
                className="rounded-xl border border-rose-200/80 bg-white p-4 space-y-1.5 shadow-xs"
              >
                <h3 className="font-bold text-rose-950 text-sm">
                  {mistake.title}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {mistake.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Guides and Tools */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">
            Related QR Code Guides &amp; Resources
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/qr-code-generator"
              className="rounded-xl border border-slate-200 p-4 bg-white transition hover:border-indigo-300 hover:shadow-md space-y-1"
            >
              <h3 className="font-bold text-slate-900 text-sm">
                QR Code Generator Tool
              </h3>
              <p className="text-xs text-slate-600">
                Access the full customizable generator with vector SVG and PDF
                export options.
              </p>
            </Link>

            <Link
              href="/create-wifi-qr-code-free"
              className="rounded-xl border border-slate-200 p-4 bg-white transition hover:border-indigo-300 hover:shadow-md space-y-1"
            >
              <h3 className="font-bold text-slate-900 text-sm">
                Wi-Fi QR Code Guide
              </h3>
              <p className="text-xs text-slate-600">
                Setup instant network guest access for offices, venues, and
                hospitality spaces.
              </p>
            </Link>

            <Link
              href="/blogs/qr-code-color-size-print-guide-png-svg-resolution"
              className="rounded-xl border border-slate-200 p-4 bg-white transition hover:border-indigo-300 hover:shadow-md space-y-1"
            >
              <h3 className="font-bold text-slate-900 text-sm">
                Color &amp; Print Sizing Deep-Dive
              </h3>
              <p className="text-xs text-slate-600">
                Read our in-depth analysis on contrast ratios, CMYK color
                shifts, and resolution rules.
              </p>
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={faqs} />
        </section>
      </main>
    </Layout>
  );
}
