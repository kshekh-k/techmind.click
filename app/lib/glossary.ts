import glossaryData from "@/app/data/glossary.json";
import blogsData from "@/app/data/blog.json";

export type GlossaryFAQ = {
  q: string;
  a: string;
};

export type GlossaryExample = {
  label: string;
  value: string;
};

export type GlossaryTerm = {
  slug: string;
  term: string;
  title?: string;
  shortDefinition: string;
  definition: string;
  whyItMatters?: string;
  useCases?: string[];
  category: string;
  aliases: string[];
  keywords?: string[];
  related: string[];
  relatedTerms?: string[];
  toolHref: string;
  blogHrefs: string[];
  faqs: GlossaryFAQ[];
  faq?: GlossaryFAQ[];
  examples: GlossaryExample[];
  example?: string;
  updatedAt: string;
};

export type BlogItem = {
  slug: string;
  title: string;
  description: string;
  keywords?: string[];
  date: string;
  author: string;
  cover?: {
    url: string;
    width: number;
    height: number;
  };
};

const glossary = glossaryData as GlossaryTerm[];
const blogs = blogsData as BlogItem[];

export function getGlossaryTerms(): GlossaryTerm[] {
  return [...glossary].sort((a, b) => a.term.localeCompare(b.term));
}

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossary.find((item) => item.slug === slug);
}

/**
 * Dynamically computes related glossary terms based on same category or matching keywords
 */
export function getRelatedTermsForTerm(term: GlossaryTerm, limit = 5): GlossaryTerm[] {
  const currentKeywords = term.keywords || [];
  
  return glossary
    .filter((t) => t.slug !== term.slug)
    .map((t) => {
      let score = 0;
      if (t.category === term.category) {
        score += 5;
      }
      const tKeywords = t.keywords || [];
      const commonKeywords = tKeywords.filter((kw) => currentKeywords.includes(kw));
      score += commonKeywords.length * 2;
      return { term: t, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.term)
    .slice(0, limit);
}

/**
 * Dynamically computes related blog posts for a glossary term based on keywords and description
 */
export function getRelatedBlogsForTerm(term: GlossaryTerm, limit = 4): BlogItem[] {
  const currentKeywords = term.keywords || [];
  const termTitleLower = (term.term || term.title || "").toLowerCase();

  return blogs
    .map((blog) => {
      let score = 0;
      const blogTitleLower = blog.title.toLowerCase();
      const blogDescLower = blog.description.toLowerCase();
      const blogKeywords = (blog.keywords || []).map((k) => k.toLowerCase());

      // If title or description has exact matches
      if (blogTitleLower.includes(termTitleLower)) score += 6;
      if (blogDescLower.includes(termTitleLower)) score += 3;

      // Match keywords
      currentKeywords.forEach((kw) => {
        const kwLower = kw.toLowerCase();
        if (blogKeywords.includes(kwLower)) score += 4;
        if (blogTitleLower.includes(kwLower)) score += 2;
      });

      // Boost based on matching category concepts
      const termCatLower = term.category.toLowerCase();
      if (blogTitleLower.includes(termCatLower) || blogDescLower.includes(termCatLower)) {
        score += 2;
      }

      return { blog, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.blog)
    .slice(0, limit);
}

