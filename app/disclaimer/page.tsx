import React from "react";
import type { Metadata } from "next";
import Layout from "@/app/components/layout";
import DisclaimerComponent from "@/app/components/disclaimer";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the TechMind.click disclaimer regarding tool outputs, accuracy, external links, and third-party advertising disclosures.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <Layout>
      <DisclaimerComponent />
    </Layout>
  );
}
