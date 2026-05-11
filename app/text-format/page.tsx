import Layout from "@/app/components/layout";
import TextFormatter from "@/app/components/text-format";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Text Formatter | TechMind",
  description:
    "Text Formarter - Free online tools to Convert case and format text",
};

export default function TextFormat() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 xl:px-12 space-y-5">
      <TextFormatter />
      </div>
    </Layout>
  );
}
