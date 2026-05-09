import dynamic from "next/dynamic";
import { Suspense } from "react";
import Layout from "./components/layout";
import type { Metadata } from "next";

// Page-level metadata (overrides the root default set in layout.tsx)
export const metadata: Metadata = {
  title: "Free Online Text Formatter & Case Converter | TechMind Click",
  description:
    "Convert text to uppercase, lowercase, title case, sentence case and more — free, instant, no sign-up. The fastest online text formatter for writers, students and developers.",
  alternates: { canonical: "/" },
};

// Dynamic import — TextFormatter's JS is only fetched after the shell renders.
// This improves FCP and LCP because the initial HTML is served without waiting
// for the large component bundle to parse.
const TextFormatter = dynamic(() => import("./components/text-format"), {
  loading: () => (
    <div
      className="min-h-[400px] flex items-center justify-center text-muted-foreground"
      aria-busy="true"
      aria-label="Loading text formatter…"
    >
      Loading…
    </div>
  ),
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TechMind Click – Text Formatter",
  url: "https://www.techmind.click",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Free online text formatter and case converter. Uppercase, lowercase, title case, sentence case, slug generator and more.",
};

export default function Home() {
  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div
            className="min-h-[400px] flex items-center justify-center text-muted-foreground"
            aria-busy="true"
          >
            Loading…
          </div>
        }
      >
        <TextFormatter />
      </Suspense>
    </Layout>
  );
}
