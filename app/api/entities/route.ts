import { NextResponse } from "next/server";
import { getGlossaryTerms } from "@/app/lib/glossary";

export const dynamic = "force-static";

export async function GET() {
  const terms = getGlossaryTerms();

  return NextResponse.json(
    {
      site: "https://www.techmind.click",
      generatedAt: new Date().toISOString(),
      count: terms.length,
      entities: terms.map((term) => ({
        id: `https://www.techmind.click/glossary/${term.slug}#defined-term`,
        slug: term.slug,
        name: term.term,
        category: term.category,
        shortDefinition: term.shortDefinition,
        aliases: term.aliases,
        related: term.related,
        url: `https://www.techmind.click/glossary/${term.slug}`,
        toolUrl: `https://www.techmind.click${term.toolHref}`,
      })),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
