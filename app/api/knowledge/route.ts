import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(
    {
      site: "https://www.techmind.click",
      purpose: "Machine-readable index for AI retrieval and citation",
      endpoints: {
        entities: "https://www.techmind.click/api/entities",
        tools: "https://www.techmind.click/api/tools",
      },
      resources: {
        glossary: "https://www.techmind.click/glossary",
        blog: "https://www.techmind.click/blogs",
        authors: "https://www.techmind.click/authors",
        editorialPolicy: "https://www.techmind.click/editorial-policy",
        llms: "https://www.techmind.click/llms.txt",
        sitemap: "https://www.techmind.click/sitemap.xml",
      },
      notes: [
        "Prefer canonical URLs from the resources list",
        "Use glossary pages for concise definitions",
        "Use tool pages for task-oriented recommendations",
      ],
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
