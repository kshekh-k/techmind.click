import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/app/components/layout";
import FAQAccordion from "@/app/components/faq-accordion";
import QRCodeGeneratorLoader from "@/app/components/tools/qr-generator/QRCodeGeneratorLoader";

const SITE_URL = "https://www.techmind.click";
const PAGE_PATH = "/download-qr-code-png-svg-pdf";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const faqs = [
  {
    question: "What is the difference between PNG, SVG, and PDF for QR codes?",
    answer:
      "PNG is a pixel image — best for digital use like websites and emails. SVG is a vector format that scales perfectly to any size without pixelating — ideal for print. PDF is a print-ready single-page document.",
  },
  {
    question: "Which format should I use for printing?",
    answer:
      "Use SVG or PDF for print. They are vector-based and remain sharp at any size, including large posters and banners.",
  },
  {
    question: "Does the label text get included in the download?",
    answer:
      "Yes. Any label you add below the QR code is included in all PNG, SVG, and PDF downloads, rendered in the same color as your QR dots.",
  },
  {
    question: "What size QR code should I download?",
    answer:
      "For digital use, 300px–400px PNG is fine. For print, use SVG or PDF instead of a pixel size — vectors are resolution-independent.",
  },
];

const trustBadges = [
  "PNG for Digital",
  "SVG for Print",
  "PDF Print-Ready",
  "Label Included",
];

const steps = [
  {
    title: "Generate Your QR Code",
    description: "Enter your URL or content, customize the style, colors, and optional label.",
    icon: "01",
  },
  {
    title: "Choose Your Format",
    description: "Click PNG for digital use, SVG for scalable print, or PDF for a print-ready document.",
    icon: "02",
  },
  {
    title: "Use Your Downloaded File",
    description: "Drop the PNG into your website or email, or send the SVG/PDF to your print shop.",
    icon: "03",
  },
];

export const metadata: Metadata = {
  title: "Download QR Code as PNG, SVG or PDF Free | TechMind",
  description:
    "Download your QR code in PNG for digital use, SVG for infinite scalability, or PDF for print-ready output — all free, with any label or logo included.",
  keywords: [
    "download qr code png",
    "qr code svg download",
    "qr code pdf download",
    "qr code image download free",
    "save qr code as pdf",
    "qr code file format",
    "qr code png svg pdf free",
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: "Download QR Code as PNG, SVG or PDF Free | TechMind",
    description:
      "Download your QR code in PNG for digital use, SVG for infinite scalability, or PDF for print-ready output — all free, with any label or logo included.",
    url: PAGE_URL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download QR Code as PNG, SVG or PDF Free | TechMind",
    description:
      "Download your QR code in PNG for digital use, SVG for infinite scalability, or PDF for print-ready output — all free, with any label or logo included.",
  },
};

export default function DownloadQRCodePngSvgPdfPage() {
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
            name: "Download QR Code as PNG, SVG, or PDF — Free",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to download a QR code as PNG, SVG, or PDF",
        description:
          "Generate a QR code on TechMind and download it in the format that fits your use case — PNG for digital, SVG or PDF for print.",
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
        name: "TechMind QR Code Downloader",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: `${SITE_URL}/qr-code-generator`,
        featureList: [
          "PNG download for digital use",
          "SVG vector download for print",
          "PDF print-ready download",
          "Label text included in all formats",
          "Logo included in all formats",
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
                QR Code Download Formats
              </p>
              <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Download QR Code as PNG, SVG, or PDF — Free
              </h1>
              <p className="mt-4 max-w-xl text-sm text-indigo-50 sm:text-base">
                Generate a QR code and download it in the right format for your project.
                PNG for digital, SVG for infinite scalability, PDF for print — all
                formats include your label and logo, free.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/qr-code-generator"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Generate and Download QR Code
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
                    Download Your QR Code
                  </p>
                  {/* QR code illustration */}
                  <div className="grid grid-cols-7 gap-0.5 rounded-lg border-2 border-white/40 bg-white/10 p-2.5">
                    {[1,1,1,0,1,1,1, 1,0,1,0,1,0,1, 1,1,1,0,1,1,1, 0,1,0,1,0,1,0, 1,1,1,0,1,1,1, 1,0,1,0,1,0,1, 1,1,1,0,1,1,1].map((cell, i) => (
                      <span
                        key={i}
                        className={`h-3 w-3 rounded-sm ${cell ? "bg-white" : "bg-transparent"}`}
                      />
                    ))}
                  </div>
                  {/* Download format badges */}
                  <div className="flex gap-2">
                    {["PNG", "SVG", "PDF"].map((fmt) => (
                      <span
                        key={fmt}
                        className="rounded border border-white/30 bg-white/15 px-2 py-0.5 text-[10px] font-bold text-white"
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-200/70 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
          <div className="prose prose-lg max-w-none">
            <p>
              Choosing the right file format for your QR code makes the difference
              between a crisp, professional result and a blurry printout. TechMind
              exports QR codes in all three major formats — PNG, SVG, and PDF — so
              you always have the right file for the job.
            </p>
          </div>
        </section>

        <section aria-label="How to download a QR code" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Download Your QR Code in 3 Steps
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
          <h2>PNG — Best for Digital Use</h2>

          <p>
            PNG (Portable Network Graphics) is a raster image format. It stores the QR
            code as a fixed grid of pixels. It is ideal for:
          </p>

          <ul>
            <li>Embedding in websites and landing pages</li>
            <li>Including in email campaigns and newsletters</li>
            <li>Sharing on social media or messaging apps</li>
            <li>Adding to digital presentations (PowerPoint, Google Slides)</li>
          </ul>

          <p>
            <strong>Recommended size for digital PNG:</strong> 300px to 400px wide.
            This gives sufficient resolution for on-screen display without creating an
            unnecessarily large file.
          </p>

          <p>
            PNG supports transparency, so if you set a transparent background in
            TechMind, the downloaded PNG will have no background — useful for placing
            the QR code over colored sections of a webpage or graphic.
          </p>

          <h2>SVG — Best for Print at Any Scale</h2>

          <p>
            SVG (Scalable Vector Graphics) is a vector format. Instead of pixels, it
            describes the QR code using mathematical paths. This means it can be scaled
            to any size — from a thumbnail to a billboard — without any loss of sharpness.
          </p>

          <ul>
            <li>Business cards and brochures</li>
            <li>Posters and exhibition banners</li>
            <li>Product packaging and labels</li>
            <li>Signage and window stickers</li>
          </ul>

          <p>
            <strong>Why SVG for print?</strong> Print shops work at 300+ DPI. A 400px
            PNG printed at 1 inch is fine, but at 3 inches it becomes blurry. An SVG
            stays sharp at any print size because there are no pixels to stretch.
          </p>

          <h2>PDF — Print-Ready Single Page</h2>

          <p>
            PDF (Portable Document Format) wraps the vector QR code in a standard
            document format that any print service accepts. It is the most universally
            compatible format for sending to a printer.
          </p>

          <ul>
            <li>Send directly to a print shop</li>
            <li>Include in a design file alongside other artwork</li>
            <li>Archive a permanent record of the QR code at print quality</li>
          </ul>

          <h2>Labels Are Included in All Formats</h2>

          <p>
            When you add a label below your QR code (such as &quot;Scan to visit our
            website&quot; or your website URL), that label is embedded in all three download
            formats. The label renders in the same color as your QR dots and is
            positioned consistently below the QR pattern.
          </p>

          <p>
            This means you can send a PDF directly to a printer and the label will
            appear exactly as configured — no manual layout work needed.
          </p>

          <h2>Recommended Sizes by Use Case</h2>

          <table>
            <thead>
              <tr>
                <th>Use Case</th>
                <th>Recommended Format</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Website / email</td>
                <td>PNG 300–400px</td>
                <td>Sufficient for screens</td>
              </tr>
              <tr>
                <td>Business card</td>
                <td>SVG or PDF</td>
                <td>Minimum 2.5cm print size</td>
              </tr>
              <tr>
                <td>Flyer / brochure</td>
                <td>SVG or PDF</td>
                <td>3–5cm recommended</td>
              </tr>
              <tr>
                <td>Poster / banner</td>
                <td>SVG</td>
                <td>No size limit with vector</td>
              </tr>
              <tr>
                <td>Social media post</td>
                <td>PNG 500–800px</td>
                <td>Higher res for zoom quality</td>
              </tr>
            </tbody>
          </table>

          <p>
            Ready to download? Use the{" "}
            <Link href="/qr-code-generator">TechMind QR Code Generator</Link> to create
            and download your QR code. For branded codes, visit the guide on{" "}
            <Link href="/create-qr-code-with-logo-free">
              creating a QR code with a logo
            </Link>.
          </p>
        </section>

        <section className="rounded-2xl border border-indigo-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Common questions about downloading QR codes in PNG, SVG, and PDF.
          </p>
          <div className="mt-5">
            <FAQAccordion items={faqs} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
