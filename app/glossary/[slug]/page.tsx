import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Layout from "@/app/components/layout";
import {
  getGlossaryTermBySlug,
  getGlossaryTerms,
  getRelatedTermsForTerm,
  getRelatedBlogsForTerm,
} from "@/app/lib/glossary";
import FAQAccordion from "@/app/components/faq-accordion";
import TextFormatter from "@/app/components/text-format";
import QRCodeGeneratorLoader from "@/app/components/tools/qr-generator/QRCodeGeneratorLoader";
import {
  ArrowRight,
  BookOpen,
  Clock,
  HelpCircle,
  Code,
  ShieldCheck,
  Zap,
  Bookmark,
} from "lucide-react";

const SITE_URL = "https://www.techmind.click";

// Lazy-load PDF tool since it contains heavy libraries
const ImageToPdf = dynamic(() => import("@/app/components/image-to-pdf"), {
  loading: () => (
    <div
      className="min-h-[400px] flex items-center justify-center text-muted-foreground bg-slate-50 border border-slate-200 border-dashed rounded-3xl"
      aria-busy="true"
      aria-label="Loading converter…"
    >
      Loading PDF Converter…
    </div>
  ),
});

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getGlossaryTerms().map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTermBySlug(slug);

  if (!term) {
    return {};
  }

  const titleText = `${term.term} - Meaning, Examples & Use Cases | TechMind`;

  return {
    title: titleText,
    description: term.shortDefinition,
    alternates: { canonical: `/glossary/${term.slug}` },
    openGraph: {
      title: titleText,
      description: term.shortDefinition,
      url: `/glossary/${term.slug}`,
      siteName: "TechMind",
      type: "article",
      modifiedTime: term.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: term.shortDefinition,
    },
  };
}

function getToolDetailsForCategory(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes("qr")) {
    return {
      title: "QR Code Generator",
      href: "/qr-code-generator",
      cta: "Create Custom QR Codes",
    };
  } else if (cat.includes("pdf")) {
    return {
      title: "Image to PDF Converter",
      href: "/image-to-pdf",
      cta: "Convert Images to PDF",
    };
  } else {
    return {
      title: "Text Formatter & Case Converter",
      href: "/",
      cta: "Format Your Text",
    };
  }
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { slug } = await params;
  const term = getGlossaryTermBySlug(slug);

  if (!term) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/glossary/${term.slug}`;

  // Calculate Reading Time (avg. 200 words per minute)
  const wordCount = term.definition.split(/\s+/).length + (term.whyItMatters || "").split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  // Related data computed dynamically on the server
  const relatedTerms = getRelatedTermsForTerm(term, 5);
  const relatedBlogs = getRelatedBlogsForTerm(term, 4);
  const toolDetails = getToolDetailsForCategory(term.category);

  // Schema graph definition
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE_URL}/glossary` },
          { "@type": "ListItem", position: 3, name: term.term, item: canonicalUrl },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `${term.term} - Meaning, Examples & Use Cases | TechMind`,
        description: term.shortDefinition,
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
      },
      {
        "@type": "DefinedTerm",
        "@id": `${canonicalUrl}#defined-term`,
        name: term.term,
        description: term.definition,
        url: canonicalUrl,
        inDefinedTermSet: `${SITE_URL}/glossary#defined-term-set`,
        alternateName: term.aliases,
      },
      ...(term.faqs && term.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${canonicalUrl}#faq`,
              mainEntity: term.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            },
          ]
        : []),
    ],
  };

  // Select which tool to render at the top based on category
  const renderTool = () => {
    const cat = term.category.toLowerCase();
    if (cat.includes("qr")) {
      return <QRCodeGeneratorLoader />;
    } else if (cat.includes("pdf")) {
      return <ImageToPdf />;
    } else {
      return <TextFormatter />;
    }
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-10">
        {/* 1. Hero Section */}
        <header className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/glossary"
              className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-full transition"
            >
              Glossary Hub
            </Link>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              {term.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            What is {term.term}?
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
            {term.shortDefinition}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {readingTime} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Bookmark className="size-3.5" />
              Updated {term.updatedAt}
            </span>
          </div>
        </header>

        {/* 6. Embedded Category Tool */}
        <section className="bg-slate-50 border border-slate-100 rounded-3xl p-2 md:p-4 shadow-xs">
          <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200/50 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Zap className="size-4 text-amber-500 fill-amber-500" />
              <span>Interactive {toolDetails.title}</span>
            </div>
            <span className="text-[10px] text-slate-400">Launch tool in-place</span>
          </div>
          {renderTool()}
        </section>

        {/* Details Grid Layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* 2. Detailed Definition */}
            <article className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="size-5 text-purple-600" />
                Detailed Definition
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                {term.definition}
              </p>
            </article>

            {/* 3. Example Section */}
            {(term.example || (term.examples && term.examples.length > 0)) && (
              <section className="rounded-2xl border border-slate-200 bg-slate-900 p-6 shadow-xs space-y-4 text-slate-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                    <Code className="size-5 text-purple-400" />
                    Practical Example
                  </h2>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                    Code/Output block
                  </span>
                </div>
                {term.example ? (
                  <pre className="text-xs md:text-sm font-mono bg-slate-950 p-4 rounded-xl overflow-x-auto text-emerald-400 border border-slate-800 leading-relaxed">
                    {term.example}
                  </pre>
                ) : (
                  <div className="space-y-3">
                    {term.examples.map((ex, i) => (
                      <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                          {ex.label}
                        </span>
                        <p className="text-xs md:text-sm font-mono text-emerald-400">{ex.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* 4. Why It Matters */}
            {term.whyItMatters && (
              <section className="rounded-2xl border border-purple-100 bg-purple-50/30 p-6 md:p-8 shadow-xs space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="size-5 text-purple-600" />
                  Why It Matters
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {term.whyItMatters}
                </p>
              </section>
            )}

            {/* 5. Common Use Cases */}
            {term.useCases && term.useCases.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                  Common Use Cases
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {term.useCases.map((useCase, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-purple-200 transition"
                    >
                      <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-bold mb-2">
                        {idx + 1}
                      </div>
                      <p className="text-xs md:text-sm font-semibold text-slate-700 leading-relaxed">
                        {useCase}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 9. Frequently Asked Questions */}
            {term.faqs && term.faqs.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="size-5 text-purple-600" />
                  Frequently Asked Questions
                </h2>
                <FAQAccordion
                  items={term.faqs.map((faq) => ({
                    question: faq.q,
                    answer: faq.a,
                  }))}
                />
              </section>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* 6. Related Tool Card */}
            <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-white to-purple-50/40 p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Recommended Tool
              </h3>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-base">{toolDetails.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Apply this concept instantly using TechMind&apos;s clean, optimized workflow
                  utilities.
                </p>
              </div>
              <Link
                href={toolDetails.href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs py-2.5 shadow-xs transition"
              >
                <span>{toolDetails.cta}</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* 7. Related Terms */}
            {relatedTerms.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  Related Terms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {relatedTerms.map((rt) => (
                    <Link
                      key={rt.slug}
                      href={`/glossary/${rt.slug}`}
                      className="text-xs font-semibold text-slate-600 hover:text-purple-700 bg-slate-50 border border-slate-200/50 hover:border-purple-200 px-3 py-1.5 rounded-lg transition"
                    >
                      {rt.term}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 8. Related Articles */}
            {relatedBlogs.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  Related Guides
                </h3>
                <div className="space-y-3">
                  {relatedBlogs.map((blog) => (
                    <article key={blog.slug} className="group flex flex-col gap-1">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition">
                        <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{blog.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 10. Bottom CTA */}
        <section className="rounded-3xl border border-purple-200/60 bg-gradient-to-br from-purple-800 via-violet-700 to-fuchsia-700 p-6 md:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
              Ready to Solve This in Under 2 Minutes?
            </h2>
            <p className="max-w-2xl text-xs md:text-sm text-purple-100 leading-relaxed">
              Use TechMind&apos;s optimized workflow dashboard to complete this task quickly with clean
              output, robust security, and no account requirements.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href={toolDetails.href}
              className="rounded-xl bg-white px-5 py-3 text-xs md:text-sm font-semibold text-purple-700 hover:bg-purple-50 transition shadow-xs"
            >
              {toolDetails.cta}
            </Link>
            <Link
              href="/contact-us"
              className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-xs md:text-sm font-semibold text-white hover:bg-white/20 transition"
            >
              Ask a Question
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

