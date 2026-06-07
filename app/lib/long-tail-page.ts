import type { Metadata } from "next";
import { getLongTailPageBySlugPath, type LongTailPage } from "@/app/content/long-tail-pages";

const SITE_URL = "https://www.techmind.click";
const OG_IMAGE = `${SITE_URL}/images/text-case-converter-and-formatter-techmind-click-otg.png`;

function titleFromSlugSegment(segment: string): string {
  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getLongTailPage(slug: string): LongTailPage | undefined {
  return getLongTailPageBySlugPath(slug);
}

export function buildLongTailMetadata(slug: string): Metadata {
  const page = getLongTailPage(slug);
  if (!page) {
    return {};
  }

  const pagePath = `/${page.slug}`;
  const pageUrl = `${SITE_URL}${pagePath}`;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: pagePath },
    openGraph: {
      title: page.title,
      description: page.description,
      url: pageUrl,
      type: "article",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: page.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [OG_IMAGE],
    },
  };
}

export function buildLongTailSchemaGraph(page: LongTailPage) {
  const pagePath = `/${page.slug}`;
  const pageUrl = `${SITE_URL}${pagePath}`;
  const segments = page.slug.split("/");

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    ...segments.map((segment, index) => {
      const itemPath = segments.slice(0, index + 1).join("/");
      return {
        "@type": "ListItem",
        position: index + 2,
        name: titleFromSlugSegment(segment),
        item: `${SITE_URL}/${itemPath}`,
      };
    }),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.title,
        description: page.description,
        dateModified: page.updatedAt,
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems,
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "HowTo",
        name: page.h1,
        description: page.quickAnswer,
        totalTime: "PT2M",
        step: page.steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.title,
          text: step.description,
        })),
      },
      {
        "@type": "SoftwareApplication",
        name: "TechMind Tools",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: page.ctaHref.startsWith("http") ? page.ctaHref : `${SITE_URL}${page.ctaHref}`,
        featureList: [
          "Text formatting",
          "Case conversion",
          "PDF preparation workflow",
          "AI text cleanup",
          "No signup start",
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Convert Text to Uppercase Online",
        tool: "TechMind.click",
        step: [
          { "@type": "HowToStep", text: "Go to TechMind.click" },
          { "@type": "HowToStep", text: "Paste your text into the input box" },
          { "@type": "HowToStep", text: "Click the Uppercase button" },
          { "@type": "HowToStep", text: "Click Copy Text to copy the result" },
        ],
      }
    ],
  };
}