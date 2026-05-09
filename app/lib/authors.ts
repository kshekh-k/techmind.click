import authorsData from "@/app/data/authors.json";

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  sameAs: string[];
  updatedAt: string;
};

const authors = authorsData as Author[];

export function getAuthors(): Author[] {
  return [...authors];
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug);
}
