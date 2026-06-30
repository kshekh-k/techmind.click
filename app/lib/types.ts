export type BlogCover = {
  url: string;
  width: number;
  height: number;
};

export type BlogTool = "text-formatter" | "qr-code-generator";

export type BlogType = {
  id: number;
  slug: string;
  title: string;
  description: string;
  keywords: any;
  content: string; // HTML string
  author: string;
  date: string;
  lastModified?: string;
  cover?: BlogCover;
  relatedPosts?: string[];
  tool?: BlogTool;
};
