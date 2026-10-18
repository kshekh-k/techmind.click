import Layout from "@/app/components/layout";
import Privacypolicy from "@/app/components/privacy-policy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how TechMind.click protects your privacy, our client-side text processing model, cookies policy, and Google AdSense compliance disclosures.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <Privacypolicy />
    </Layout>
  );
}
