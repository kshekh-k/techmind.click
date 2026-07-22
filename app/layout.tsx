import "./globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { AuthProvider } from "@/app/components/auth/AuthProvider";
import { Analytics } from "@vercel/analytics/next";
// ─── Font ────────────────────────────────────────────────────────────────────
// next/font downloads and self-hosts the font, eliminating render-blocking
// Google Fonts requests and preventing FOIT/FOUT.
// Only load the weights actually used on the site.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",      // prevent FOIT; show fallback until font loads
  preload: true,
  variable: "--font-inter",
});

// ─── Site-wide defaults (can be overridden per page) ─────────────────────────
const SITE_URL = "https://www.techmind.click";
const OG_IMAGE = `${SITE_URL}/images/text-case-converter-and-formatter-techmind-click-otg.png`;
const siteName = "TechMind.click"
const title = "Free Online Text Formatter & Case Converter | TechMind";
const description = "Free online text formatter and case converter for converting uppercase, lowercase, sentence case, title case, and cleaning text instantly. Fast, private, and browser-based."
const keywords = [
  "text formatter",
  "text formatter online",
  "case converter",
  "text case converter",
  "uppercase lowercase converter",
  "sentence case converter",
  "title case converter",
]
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
  "Text formatting"]
export const metadata: Metadata = {
  // metadataBase is required for relative OG image URLs to resolve correctly
  metadataBase: new URL(SITE_URL),

  title: {
    default: title,
    // Pages that export their own title inherit this template automatically
    template: `%s | ${siteName}`,
  },
  description: description,
  keywords: keywords,
  authors: [{ name: siteName }],
  robots: { index: true, follow: true },

  // Canonical for the root — child pages override via their own metadata
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
  },

  // Verification tags
  other: {
    "p:domain_verify": "1dc8540b6963e0d5e7f3b2c413ea7d18",
    "saashub-verification": "9co7xpw6sv2e",
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: siteName,
    title: title,
    description:  description,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description, 
    images: [OG_IMAGE],
  },

  icons: {
    icon: [
      { url: "/techmind-favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

// ─── Site-wide JSON-LD schemas ────────────────────────────────────────────────
const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "TechMind Text Formatter & Case Converter",
  url: SITE_URL,
  description: description,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any modern web browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: featureList,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Free Online Text Formatter & Case Converter",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.techmind.click/blogs?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Apply the font CSS variable; Tailwind picks it up via --font-inter
    <html lang="en" className={inter.variable}>
      <head>
        {/* AI/LLM Resources — Geordy (2026-06-21) */}
        <link rel="alternate" type="application/yaml" href="https://ai.techmind.click/index.yaml" title="YAML" data-ai="true" data-purpose="configuration" data-format="yaml" data-frequency="daily" data-version="2026-06-21" />
        <link rel="alternate" type="text/markdown" href="https://ai.techmind.click/index.md" title="Markdown" data-ai="true" data-purpose="documentation" data-format="markdown" data-frequency="daily" data-version="2026-06-21" />
        <link rel="llms" href="https://ai.techmind.click/llms.txt" title="LLMs.txt" data-ai="true" data-purpose="llm-policy" data-format="plain" data-frequency="daily" data-version="2026-06-21" />
        <link rel="alternate" type="application/ld+json" href="https://ai.techmind.click/index.schema.json" title="Schema JSON-LD" data-ai="true" data-purpose="structured-data" data-format="jsonld" data-frequency="daily" data-version="2026-06-21" />
        <link rel="alternate" type="application/rss+xml" href="https://ai.techmind.click/index.xml" title="RSS Feed" data-ai="true" data-purpose="syndication" data-format="rss" data-frequency="weekly" data-version="2026-06-21" />
        <link rel="alternate" type="application/json" href="https://ai.techmind.click/index.manifest.json" title="Manifest" data-ai="true" data-purpose="app-manifest" data-format="json" data-frequency="monthly" data-version="2026-06-21" />
        <link rel="alternate" type="text/plain" href="https://ai.techmind.click/humans.txt" title="Humans.txt" data-ai="true" data-purpose="credits" data-format="plain" data-frequency="monthly" data-version="2026-06-21" />
        <link rel="alternate" type="application/json" href="https://ai.techmind.click/index.og.json" title="Open Graph" data-ai="true" data-purpose="open-graph" data-format="json" data-frequency="weekly" data-version="2026-06-21" />
      </head>
      <body className="flex flex-col min-h-screen font-sans bg-gray-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        <AuthProvider>{children}</AuthProvider>

        {/* ── Google Analytics ────────────────────────────────────────────────
            strategy="lazyOnload" waits until the browser is idle, so GA never
            competes with initial render, hydration, or LCP. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1LY4EXMSGY"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1LY4EXMSGY');
          `}
        </Script>
        {/* Vercel Analytics */}
  <Analytics />
      </body>
    </html>
  );
}
