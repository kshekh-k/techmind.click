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
      <TextFormatter />
    </Layout>
  );
}
