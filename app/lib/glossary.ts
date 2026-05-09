import glossaryData from "@/app/data/glossary.json";

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
  shortDefinition: string;
  definition: string;
  category: string;
  aliases: string[];
  related: string[];
  toolHref: string;
  blogHrefs: string[];
  faqs: GlossaryFAQ[];
  examples: GlossaryExample[];
  updatedAt: string;
};

const glossary = glossaryData as GlossaryTerm[];

export function getGlossaryTerms(): GlossaryTerm[] {
  return [...glossary].sort((a, b) => a.term.localeCompare(b.term));
}

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossary.find((item) => item.slug === slug);
}
