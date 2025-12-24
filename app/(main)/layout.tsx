import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Text Case Converter & Formatter - TechMind",
   description:
    "Convert text case, slug convert, format content, and clean text instantly using our free case converter & text formatter tool. Fast and easy.",
  keywords: [
    "text case converter",
    "slug converter",
    "case converter online",
    "text formatter",
    "uppercase to lowercase",
    "lowercase to uppercase",
    "title case converter",
    "sentence case",
    "text formatting tool"
  ],
  alternates: {
    canonical: "https://techmind.click"
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },

  openGraph: {
    type: "website",
    url: "https://techmind.click",
    title: "Text Case Converter & Formatter – TechMind",
    description:
      "Free online text case converter and formatter. Convert uppercase, lowercase, title case and more instantly.",
    siteName: "TechMind",
    images: [
      {
        url: "https://techmind.click/text-case-converter-and-formatter-techmind-click.png",
        width: 1200,
        height: 630,
        alt: "Text Case Converter & Formatter"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Text Case Converter & Formatter – TechMind",
    description:
      "Instantly convert and format text using our free case converter tool.",
    images: ["https://techmind.click/text-case-converter-and-formatter-techmind-click.png"]
  },  
  
  icons: {
    icon: "/techmind-favicon.svg",
    shortcut: "/techmind-favicon.ico",
    apple: "/techmind-favicon.png",
  },


  
};

function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Text Case Converter & Formatter",
    url: "https://techmind.click",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a text case converter?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "A text case converter helps you change text into uppercase, lowercase, title case, or sentence case instantly.",
        },
      },
      {
        "@type": "Question",
        name: "Is this tool free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes, TechMind’s text case converter and formatter is completely free to use online.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-locator-target="vscode">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-muted/40 antialiased`}
      >
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
