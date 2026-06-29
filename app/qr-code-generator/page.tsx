import { Suspense } from "react";
import Layout from "@/app/components/layout";
import type { Metadata } from "next";
import QRCodeGeneratorLoader from "@/app/components/tools/qr-generator/QRCodeGeneratorLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import Link from "next/link";

/* ─── Constants ─────────────────────────────────────────────────────────────── */

const SITE_URL = "https://www.techmind.click";
const PAGE_URL = `${SITE_URL}/qr-code-generator`;
const ORG_ID = `${SITE_URL}#organization`;
const WEBSITE_ID = `${SITE_URL}#website`;
const APP_ID = `${PAGE_URL}#app`;

const TITLE = "Free QR Code Generator — Custom QR Codes Online | TechMind";
const DESCRIPTION =
  "Generate free custom QR codes online for URLs, text, phone numbers, and WiFi. Add a logo, choose colors and dot styles, then download in PNG, SVG, or PDF — no sign-up required. Save your QR codes to your profile and update them anytime.";

/* ─── Metadata ───────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "qr code generator",
    "free qr code generator",
    "custom qr code",
    "qr code with logo",
    "qr code download png svg pdf",
    "online qr code maker",
    "wifi qr code generator",
    "url qr code",
    "qr code for business",
    "qr code creator free",
    "qr code no sign up",
    "qr code color customization",
    "qr code generator online free",
    "generate qr code",
    "qr code download",
  ],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "/qr-code-generator" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "TechMind",
    images: [
      {
        url: `${SITE_URL}/images/qr-code-generator-techmind-click-og.png`,
        width: 1200,
        height: 630,
        alt: "Free QR Code Generator by TechMind",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/images/qr-code-generator-techmind-click-og.png`],
  },
};

/* ─── Schema Graph ───────────────────────────────────────────────────────────── */

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization
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
      contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", url: `${SITE_URL}/contact-us` }],
    },

    // WebSite
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "TechMind",
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },

    // WebPage
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": APP_ID },
      inLanguage: "en",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/qr-code-generator-techmind-click-og.png`,
      },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
    },

    // WebApplication
    {
      "@type": ["WebApplication", "SoftwareApplication"],
      "@id": APP_ID,
      name: "TechMind QR Code Generator",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and a modern browser",
      isAccessibleForFree: true,
      url: PAGE_URL,
      publisher: { "@id": ORG_ID },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "URL QR code generator",
        "Text QR code generator",
        "Phone number QR code",
        "WiFi QR code generator",
        "Custom logo upload",
        "Color customization",
        "Dot style customization",
        "Corner style customization",
        "Download as PNG",
        "Download as SVG",
        "Download as PDF",
        "Label below QR code",
        "Save QR to profile",
      ],
      keywords: [
        "qr code generator",
        "free qr code",
        "custom qr code",
        "qr code with logo",
        "wifi qr code",
      ],
      description: DESCRIPTION,
    },

    // FAQPage
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Is this QR code generator free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. TechMind QR Code Generator is completely free. You can generate, customize, and download QR codes in PNG, SVG, or PDF format without any payment or account required.",
          },
        },
        {
          "@type": "Question",
          name: "Can I add a logo to my QR code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can upload any image as a logo and it will appear in the center of the QR code. The error correction is automatically increased to ensure the QR remains scannable.",
          },
        },
        {
          "@type": "Question",
          name: "What types of QR codes can I generate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can generate QR codes for URLs, plain text, phone numbers, and WiFi networks. Each type encodes the data in the standard format recognized by all QR code scanner apps.",
          },
        },
        {
          "@type": "Question",
          name: "What file formats can I download?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can download your QR code as PNG (image), SVG (vector, infinitely scalable), or PDF (print-ready document). All formats include any label text you have added.",
          },
        },
        {
          "@type": "Question",
          name: "How do I create a WiFi QR code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Select the WiFi tab, enter your network name (SSID) and password, choose the encryption type (WPA/WEP/None), and the QR code will be generated automatically. Scanning it with a phone will connect the device to the network instantly.",
          },
        },
        {
          "@type": "Question",
          name: "Can I save my QR codes for later?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Create a free account or log in with Google to save your QR codes to your profile. You can load any saved QR back into the editor to update it at any time.",
          },
        },
        {
          "@type": "Question",
          name: "Does TechMind store my QR code data?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "QR codes are generated entirely in your browser. Data is only stored on our servers when you explicitly save a QR code to your profile while logged in.",
          },
        },
      ],
    },

    // HowTo
    {
      "@type": "HowTo",
      "@id": `${PAGE_URL}#howto`,
      name: "How to Create a Custom QR Code",
      totalTime: "PT2M",
      supply: [{ "@type": "HowToSupply", name: "URL, text, phone number, or WiFi credentials" }],
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Choose content type",
          text: "Select URL, Text, Phone, or WiFi from the tabs at the top of the tool.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Enter your content",
          text: "Type or paste your URL, text, phone number, or WiFi credentials. The QR code will appear instantly.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Customize the style",
          text: "Choose colors, dot style, corner style, size, margin, and optionally upload a logo.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Add a label (optional)",
          text: "Add a text label below the QR code — it will be included in all downloaded files.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Download your QR code",
          text: "Click PNG, SVG, or PDF to download your finished QR code.",
        },
      ],
    },

    // BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "QR Code Generator", item: PAGE_URL },
      ],
    },
  ],
};

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function QRCodeGeneratorPage() {
  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <div className="max-w-6xl mx-auto px-4 space-y-10">

        {/* Hero */}
        <div className="mb-2 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Free QR Code Generator
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Create custom QR codes for URLs, text, phone numbers, or WiFi. Add a logo, pick colors
            and a style, then download as PNG, SVG, or PDF — free, no sign-up required.
          </p>
        </div>

        {/* Tool */}
        <Suspense>
          <QRCodeGeneratorLoader />
        </Suspense>

        {/* SEO Content */}
        <Card className="shadow-sm !border-none">
          <CardHeader>
            <CardTitle as="h2" className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Custom QR Code Generator — Free, Fast & No Sign-Up
            </CardTitle>
            <p className="text-base text-muted-foreground mt-3 max-w-4xl">
              Generate professional QR codes for any use case in seconds. Customize every detail —
              colors, shapes, logo, and label — then download in the format you need.
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-5 text-muted-foreground leading-7 prose max-w-none">

              <h3>What types of QR codes can you create?</h3>
              <ul>
                <li><strong>URL QR Code</strong> — Link directly to any website, product page, portfolio, or social profile.</li>
                <li><strong>Text QR Code</strong> — Encode any plain text message. Scanners display the text without opening a browser.</li>
                <li><strong>Phone QR Code</strong> — Dial a phone number instantly when scanned — ideal for business cards and flyers.</li>
                <li><strong>WiFi QR Code</strong> — Let guests connect to your network by scanning a code, no password typing needed.</li>
              </ul>

              <h3>Customization options</h3>
              <p>
                Every QR code you generate on TechMind is fully customizable. Change the foreground
                and background colors to match your brand, choose from six dot styles (square, dots,
                rounded, extra-rounded, classy, classy-rounded), pick your corner shape, and upload
                any logo image to embed in the center. Adjust the size from 200px to 500px and set
                the margin to control white space around the code.
              </p>

              <h3>Download formats</h3>
              <ul>
                <li><strong>PNG</strong> — Best for digital use: social media, websites, emails, and presentations.</li>
                <li><strong>SVG</strong> — Vector format that scales to any size without losing quality. Ideal for print.</li>
                <li><strong>PDF</strong> — Print-ready single-page document. Perfect for flyers, posters, and packaging.</li>
              </ul>
              <p>
                All formats include any label text you add below the QR code, rendered in the same color as the QR dots.
              </p>

              <h3>Save and manage your QR codes</h3>
              <p>
                Sign in with Google or create a free account to save QR codes to your profile. Load any
                saved QR back into the editor, make changes, and update it at any time — useful for
                campaign links, menus, or anything that changes over time.
              </p>

              <h3>Privacy and data</h3>
              <p>
                QR codes are generated entirely in your browser using JavaScript. Your URLs, text,
                and WiFi credentials are never sent to any server unless you explicitly choose to
                save a QR code to your account. No tracking, no ads, no data collection.
              </p>
            </div>

            {/* FAQ */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h3>

              {[
                {
                  q: "Is the QR code generator really free?",
                  a: "Yes — completely free. No watermarks, no limits, no credit card. Generate and download as many QR codes as you like.",
                },
                {
                  q: "Do I need to create an account?",
                  a: "No account is needed to generate and download QR codes. Sign in only if you want to save codes to your profile for future editing.",
                },
                {
                  q: "Will my QR code work on all phones?",
                  a: "Yes. QR codes generated here follow the standard QR format and are compatible with the camera apps on all modern iOS and Android devices.",
                },
                {
                  q: "How do I make a WiFi QR code?",
                  a: "Select the WiFi tab, enter your network name (SSID), password, and encryption type. The QR code is generated instantly — scanning it connects the phone without typing the password.",
                },
                {
                  q: "Can I print the QR code?",
                  a: "Yes. Download as SVG or PDF for the sharpest print quality at any size.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="group rounded-xl border border-gray-100 bg-gray-50 px-5 py-4">
                  <summary className="cursor-pointer font-medium text-gray-900 list-none flex items-center justify-between gap-4">
                    {q}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0">▾</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>

            {/* Internal links */}
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <Link href="/image-to-pdf" className="underline underline-offset-4 text-purple-700 font-medium hover:text-purple-900 transition-colors">
                Image to PDF Converter
              </Link>
              <Link href="/blogs" className="underline underline-offset-4 text-purple-700 font-medium hover:text-purple-900 transition-colors">
                Blog Knowledge Hub
              </Link>
              <Link href="/glossary" className="underline underline-offset-4 text-purple-700 font-medium hover:text-purple-900 transition-colors">
                Glossary
              </Link>
              <Link href="/" className="underline underline-offset-4 text-purple-700 font-medium hover:text-purple-900 transition-colors">
                Text Case Converter
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>
    </Layout>
  );
}
