import { Suspense } from "react";
import Layout from "@/app/components/layout";
import type { Metadata } from "next";
import QRCodeGeneratorLoader from "@/app/components/tools/qr-generator/QRCodeGeneratorLoader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Link from "next/link";
import { ChevronDown, Star } from "lucide-react";

/* ─── Constants ─────────────────────────────────────────────────────────────── */

const SITE_URL = "https://www.techmind.click";
const PAGE_URL = `${SITE_URL}/qr-code-generator`;
const ORG_ID = `${SITE_URL}#organization`;
const WEBSITE_ID = `${SITE_URL}#website`;
const APP_ID = `${PAGE_URL}#app`;

const TITLE = "Free QR Code Generator - Custom QR Codes Online | TechMind";
const DESCRIPTION =
  "Generate free custom QR codes online for URLs, text, phone numbers, and WiFi. Add a logo, choose colors and dot styles, then download in PNG, SVG, or PDF - no sign-up required. Save QR code projects to your account and reopen them later for editing.";

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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
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
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          url: `${SITE_URL}/contact-us`,
        },
      ],
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
      supply: [
        {
          "@type": "HowToSupply",
          name: "URL, text, phone number, or WiFi credentials",
        },
      ],
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
          text: "Add a text label below the QR code - it will be included in all downloaded files.",
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
        {
          "@type": "ListItem",
          position: 2,
          name: "QR Code Generator",
          item: PAGE_URL,
        },
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

      <div className="max-w-7xl mx-auto px-4 space-y-10">


        {/* Tool */}
        <Suspense>
          <QRCodeGeneratorLoader />
        </Suspense>

        <Card className="shadow-sm !border-none">
          <CardContent className="py-5">
            <CardTitle
              as="h2"
              className="text-2xl md:text-3xl font-extrabold tracking-tight"
            >
              More Free Productivity Tools
            </CardTitle>

            <p className="text-sm text-muted-foreground mt-2">
              Looking for another tool? Try these free tools from TechMind.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded border flex items-center px-3 py-1.5 leading-none hover:border-purple-500 hover:bg-purple-500 hover:text-white transition"
              >
                Text Formatter
              </Link>

              <Link
                href="/image-to-pdf"
                className="rounded border flex items-center px-3 py-1 .5leading-none hover:border-purple-500 hover:bg-purple-500 hover:text-white transition"
              >
                Image to PDF
              </Link>

              <Link
                href="/blogs"
                className="rounded border flex items-center px-3 py-1.5 leading-none hover:border-purple-500 hover:bg-purple-500 hover:text-white transition"
              >
                Blog Hub
              </Link>

              <Link
                href="/glossary"
                className="rounded border flex items-center px-3 py-1.5 leading-none hover:border-purple-500 hover:bg-purple-500 hover:text-white transition"
              >
                Glossary
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* SEO Content */}
        <Card className="shadow-sm !border-none">
          <CardHeader>
            <CardTitle
              as="h2"
              className="text-2xl md:text-3xl font-extrabold tracking-tight"
            >
              Custom QR Code Generator - Free, Fast & No Sign-Up
            </CardTitle>
            <p className="text-base text-muted-foreground mt-3 max-w-4xl">
              Create a QR code from a URL, text, phone number, email address, or Wi-Fi details. You can change its colors, add a logo, choose different dot and corner styles, and add a label before saving the QR code.
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-5 text-muted-foreground leading-7 prose max-w-none">
              <h3>What types of QR codes can you create?</h3>
              <ul>
                <li>
                  <strong>URL QR Code</strong> - Turn a website or page URL into a QR code that opens when it is scanned.
                </li>
                <li>
                  <strong>Text QR Code</strong> - Add a short text message that can be displayed after scanning the code.
                </li>
                <li>
                  <strong>Phone QR Code</strong> - Add a phone number so someone can start a call after scanning the code.
                </li>
                <li>
                  <strong>WiFi QR Code</strong> - Add your Wi-Fi network details so guests can connect without typing the password manually.
                </li>
              </ul>

              <h3>Customization options</h3>
              <p>
                You can change several parts of the QR code before downloading it. Choose the foreground and background colors, change the dot and corner styles, add a logo, and adjust the size and margin.              </p>

              <h3>Popular Uses of QR Codes</h3>

              <p>
                A QR code is useful when you want to give someone quick access to a link or other information without asking them to type it. You can put one on a menu, business card, product package, poster, event ticket, or Wi-Fi sign.
              </p>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <h4>🏬 Restaurant Menus</h4>
                  <p>
                    Put a QR code on a table, counter, poster, or menu card and link it to your online menu. Customers can scan the code with their phone and open the menu without typing the URL.{" "}
                    <Link
                      href="/image-to-pdf"
                      className="text-purple-700 underline underline-offset-4 hover:text-purple-900"
                    >
                      Image to PDF Converter
                    </Link>

                  </p>
                </div>

                <div>
                  <h4>💼 Business Cards</h4>
                  <p>
                    Add a QR code to a business card and link it to your website, portfolio, LinkedIn profile, contact page, or other online information.{" "}
                    <Link
                      href="/"
                      className="text-purple-700 underline underline-offset-4 hover:text-purple-900"
                    >
                      Text Formatter
                    </Link>

                  </p>
                </div>

                <div>
                  <h4>📶 WiFi Sharing</h4>
                  <p>
                    Add the Wi-Fi network name and password to a QR code. Guests can scan it with a compatible phone instead of entering the network details manually.
                  </p>
                </div>

                <div>
                  <h4>📦 Product Packaging</h4>
                  <p>
                    A QR code on product packaging can link customers to a manual, setup instructions, warranty information, product videos, or a support page.
                  </p>
                </div>

                <div>
                  <h4>📢 Marketing & Advertising</h4>
                  <p>
                    Add a QR code to posters, flyers, brochures, magazines, or product catalogs when you want people to visit a website or landing page from printed material.
                  </p>
                </div>

                <div>
                  <h4>🎫 Events & Tickets</h4>
                  <p>
                    Use a QR code to share an event page, registration form, ticket information, venue map, schedule, or other event details.
                  </p>
                </div>

                <div>
                  <h4>📍 Google Maps & Locations</h4>
                  <p>
                    Link a QR code to a Google Maps location so visitors can open directions from their phone.{" "}
                    <Link
                      href="/blogs"
                      className="text-purple-700 underline underline-offset-4 hover:text-purple-900"
                    >
                      You can place the code on flyers, posters, signs, or other printed material.
                    </Link>

                  </p>
                </div>

                <div>
                  <h4>📱 Social Media & Websites</h4>
                  <p>
                    Link the QR code to your Instagram, Facebook, YouTube, LinkedIn, X profile, or website. Someone scanning the code can open the selected page directly.
                  </p>
                </div>
              </div>


              <h3>Download QR Codes in PNG, SVG, or PDF</h3>

              <p>
                Once your QR code looks the way you want, choose PNG, SVG, or PDF and save it to your device.{" "}
                <Link
                  href="/glossary"
                  className="text-purple-700 underline underline-offset-4 hover:text-purple-900"
                >
                  Glossary
                </Link>{" "}
                for explanations of PNG, SVG, PDF, and other common web terms.
              </p>

              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <h4>🖼 PNG Image</h4>
                  <p>
                    PNG works well for websites, social media posts, emails, presentations, and other digital content.
                  </p>
                </div>

                <div>
                  <h4>🎨 SVG Vector</h4>
                  <p>
                    SVG is useful when you need to resize the QR code without making it blurry, especially for print and design work.
                  </p>
                </div>

                <div>
                  <h4>📄 PDF Document</h4>
                  <p>
                    PDF is convenient when you need to print the QR code or include it in a document.
                  </p>
                </div>
              </div>

              <h3>Which QR Code Format Should You Choose?</h3>

              <p>
                Pick the format based on where you plan to use the QR code:
              </p>

              <ul>
                <li>
                  <strong>Choose PNG</strong> Good for websites, social media, presentations, and digital sharing.
                </li>
                <li>
                  <strong>Choose SVG</strong> Better when the QR code needs to be resized or used in a design or print project.
                </li>
                <li>
                  <strong>Choose PDF</strong> Useful when you want a print-ready file or need to include the QR code in a document.
                </li>
              </ul>

              <p>
                Your selected QR code settings are included in the downloaded file.
              </p>

              <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                <h4 className="font-semibold text-green-900 mt-0!">
                  High-Quality QR Codes for Print & Digital
                </h4>

                <p className="mb-0! text-sm text-green-800">
                  Use the downloaded QR code on a screen or in printed material. SVG is a good choice when you need to resize the code because it can be scaled without losing sharpness.
                </p>
              </div>

              <h3>Privacy and data</h3>
              <p>
                QR codes are generated in your browser. The information you enter, such as a URL, text, or Wi-Fi details, is used to create the QR code. It is not sent to our server unless you choose a feature that requires saving it to your account.
              </p>
            </div>

            {/* FAQ */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">
                Frequently Asked Questions
              </h3>

              {[
                {
                  q: "Is the QR code generator really free?",
                  a: "Yes. You can create and download QR codes without paying for the basic generator.",
                },
                {
                  q: "Do I need to create an account?",
                  a: "No account is required to create and download a QR code.",
                },
                {
                  q: "Will my QR code work on all phones?",
                  a: "Yes! Our QR codes work perfectly on all devices.",
                },
                {
                  q: "How do I make a WiFi QR code?",
                  a: "Select the WiFi tab, enter your network name (SSID), password, and encryption type. The QR code is generated instantly - scanning it connects the phone without typing the password.",
                },
                {
                  q: "Can I print the QR code?",
                  a: "Yes. Download as SVG or PDF for the sharpest print quality at any size.",
                },
              ].map(({ q, a }) => (
                <details
                  key={q}
                  className="group rounded-xl border border-gray-100 bg-gray-50 px-5 py-4"
                >
                  <summary className="cursor-pointer font-medium text-gray-900 list-none flex items-center justify-between gap-4">
                    {q}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0">
                      <ChevronDown className="size-4" />
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {a}
                  </p>
                </details>
              ))}
            </div>

            {/* Internal links */}
            <div className="mt-8 flex flex-col gap-4 text-sm">
              <h3 className="text-xl font-bold">Related Tools & Resources</h3>

              <p className="text-muted-foreground">
                You may also find these TechMind tools and guides useful.
              </p>

              <div className="flex flex-wrap gap-4  ">
                <Link
                  href="/image-to-pdf"
                  className="underline underline-offset-4 text-purple-700 font-medium hover:text-purple-900 transition-colors"
                >
                  Image to PDF Converter
                </Link>

                <Link
                  href="/"
                  className="underline underline-offset-4 text-purple-700 font-medium hover:text-purple-900 transition-colors"
                >
                  Text Formatter & Case Converter
                </Link>

                <Link
                  href="/blogs"
                  className="underline underline-offset-4 text-purple-700 font-medium hover:text-purple-900 transition-colors"
                >
                  QR Code Guides & Tutorials
                </Link>

                <Link
                  href="/glossary"
                  className="underline underline-offset-4 text-purple-700 font-medium hover:text-purple-900 transition-colors"
                >
                  Tech Glossary
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
