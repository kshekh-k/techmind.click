import fs from "fs";
import path from "path";
import { convertMarkdownToJson } from "../lib/md-to-json";

const OUTPUT_PATH = path.join(
  process.cwd(),
  "app/data/blog.json"
);

const blogs = convertMarkdownToJson();

fs.writeFileSync(
  OUTPUT_PATH,
  JSON.stringify(blogs, null, 2),
  "utf-8"
);

console.log("✅ blogs.json generated successfully");
