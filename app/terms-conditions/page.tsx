import React from "react";
import type { Metadata } from "next";
import Layout from "@/app/components/layout";
import Terms from "@/app/components/terms-and-conditions";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Read the Terms and Conditions for using TechMind.click text formatting utilities, QR tools, and educational content.",
  alternates: {
    canonical: "/terms-conditions",
  },
};

export default function TermsPage() {
  return (
    <Layout>
      <Terms />
    </Layout>
  );
}
