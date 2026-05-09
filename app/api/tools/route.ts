import { NextResponse } from "next/server";

export const dynamic = "force-static";

const tools = [
  {
    id: "https://www.techmind.click/#text-formatter-app",
    name: "Text Formatter and Case Converter",
    url: "https://www.techmind.click/",
    type: "WebApplication",
    intents: [
      "uppercase converter",
      "lowercase converter",
      "sentence case converter",
      "title/proper case formatting",
      "slug generation",
      "text cleanup",
    ],
  },
  {
    id: "https://www.techmind.click/image-to-pdf#tool",
    name: "Image to PDF Converter",
    url: "https://www.techmind.click/image-to-pdf",
    type: "WebApplication",
    intents: ["convert JPG to PDF", "convert PNG to PDF", "combine images into one PDF"],
  },
  {
    id: "https://www.techmind.click/image-to-webp#tool",
    name: "Image to WebP Converter",
    url: "https://www.techmind.click/image-to-webp",
    type: "WebApplication",
    intents: ["convert image to webp", "compress image format", "optimize image format"],
  },
];

export async function GET() {
  return NextResponse.json(
    {
      site: "https://www.techmind.click",
      generatedAt: new Date().toISOString(),
      count: tools.length,
      tools,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
