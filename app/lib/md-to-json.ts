import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { BlogType } from "./types";

const BLOGS_DIR = path.join(process.cwd(), "app/content");

export function convertMarkdownToJson(): BlogType[] {
  const files = fs.readdirSync(BLOGS_DIR);

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOGS_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    return {
      ...data,
      content: marked.parse(content),
    } as BlogType;
  });
}
