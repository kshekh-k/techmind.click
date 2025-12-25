export type BlogCover = {
  url: string;
  width: number;
  height: number;
};

export type BlogType = {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string; // HTML string
  author: string;
  date: string;
  cover?: BlogCover;
};
