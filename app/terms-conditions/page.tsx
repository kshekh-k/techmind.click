import React from "react";
import { Metadata } from "next";
import Layout from "@/app/components/layout";
import Terms from "@/app/components/terms-and-conditions";
export const metadata: Metadata = {
  title: "Terms and Conditions | TechMind",
  description:
    "Read our Terms and Conditions to understand the rules and guidelines for using our services.",
};
function TermsPage() {
  return (
    <Layout>
      <Terms />
    </Layout>
  );
}

export default TermsPage;
