import { Metadata } from "next";
import Layout from "../components/layout";
import TextFormatter from "../components/text-format";
export const metadata: Metadata = {
    title: "Text Formatter | TechMind",
    description: "Text Formarter - Free online tools to Convert case and format text",
};

export default function TextFormat() {
    return (
        <Layout>
            <TextFormatter />
        </Layout>
    );
}