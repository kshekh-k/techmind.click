import "./globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

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

export const metadata: Metadata = {
  // metadataBase is required for relative OG image URLs to resolve correctly
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Free Online Text Formatter Tool | TechMind Click",
    // Pages that export their own title inherit this template automatically
    template: "%s | TechMind Click",
  },
  description:
    "Use our free online text formatter to convert case, clean, and edit text instantly. Perfect for students, writers, and professionals to format content fast and easily.",
  keywords: [
    "text case converter",
    "text formatter",
    "slug converter",
    "case converter online",
    "uppercase to lowercase",
    "sentence case converter",
    "title case converter",
    "online text tools",
    "seo slug generator",
    "content formatting tool",
  ],
  authors: [{ name: "TechMind" }],
  robots: { index: true, follow: true },

  // Canonical for the root — child pages override via their own metadata
  alternates: { canonical: "/" },

  // Verification tags
  other: {
    "p:domain_verify": "1dc8540b6963e0d5e7f3b2c413ea7d18",
    "saashub-verification": "9co7xpw6sv2e",
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "TechMind Click",
    title: "Free Online Text Formatter Tool | TechMind Click",
    description:
      "Use our free online text formatter to convert case, clean, and edit text instantly.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "TechMind Click" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Text Formatter Tool | TechMind Click",
    description:
      "Use our free online text formatter to convert case, clean, and edit text instantly.",
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

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Apply the font CSS variable; Tailwind picks it up via --font-inter
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen font-sans">
        {children}

        {/* ── Google Analytics ────────────────────────────────────────────────
            strategy="afterInteractive" defers both scripts until after
            hydration so they never block FCP or LCP.
            Placing them in <body> (not <head>) is the recommended pattern.   */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1LY4EXMSGY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1LY4EXMSGY');
          `}
        </Script>
      </body>
    </html>
  );
}
