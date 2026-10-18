import Layout from "@/app/components/layout";
import TextFormatter from "@/app/components/text-format";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Text Formatter & Editor",
  description:
    "Free online text formatter and case converter tool to convert uppercase, lowercase, sentence case, and clean extra spaces instantly.",
  alternates: {
    canonical: "/text-format",
  },
};

export default function TextFormat() {
  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-3 md:px-4 space-y-5 xl:space-y-10">
        <TextFormatter />
      </section>
    </Layout>
  );
}
