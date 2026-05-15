import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Layout from "@/app/components/layout";
import SolutionPageTemplate from "@/app/components/solution-page-template";
import { buildLongTailMetadata, buildLongTailSchemaGraph, getLongTailPage } from "@/app/lib/long-tail-page";

const SLUG = "convert-image-to-pdf-for-government-form";

export const metadata: Metadata = buildLongTailMetadata(SLUG);

export default function ConvertImageToPdfForGovernmentFormPage() {
  const page = getLongTailPage(SLUG);
  if (!page) notFound();

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLongTailSchemaGraph(page)) }} />
      <SolutionPageTemplate page={page} />
    </Layout>
  );
}
