import type { Metadata } from "next";
import Layout from "@/app/components/layout";

const SITE_URL = "https://www.techmind.click";

export const metadata: Metadata = {
  title: "Editorial Policy | TechMind Click",
  description: "Learn how TechMind Click creates, reviews, and updates content for accuracy and usability.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "TechMind Click Editorial Policy",
    url: `${SITE_URL}/editorial-policy`,
    about: ["Editorial standards", "Content review", "Accuracy"],
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="max-w-4xl mx-auto px-4 rounded-lg border bg-white p-5">
        <h1 className="text-3xl font-bold">Editorial Policy</h1>
        <p className="mt-3 text-muted-foreground">
          TechMind Click publishes human-first educational content focused on text formatting, writing productivity,
          and practical online tools.
        </p>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">How We Create Content</h2>
          <ul className="mt-2 list-disc pl-5 space-y-2">
            <li>We prioritize accuracy, clarity, and practical examples.</li>
            <li>We write for both beginners and experienced users.</li>
            <li>We avoid misleading claims and manipulative SEO practices.</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Review and Updates</h2>
          <ul className="mt-2 list-disc pl-5 space-y-2">
            <li>Articles are reviewed for factual consistency and readability.</li>
            <li>Outdated guidance is updated when tools or standards change.</li>
            <li>Major updates are reflected through visible date metadata when applicable.</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Source Transparency</h2>
          <p className="mt-2">
            Where possible, we add references and examples so users and AI systems can understand the basis of our
            recommendations.
          </p>
        </section>
      </article>
    </Layout>
  );
}
