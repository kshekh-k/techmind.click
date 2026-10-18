import React from "react";
import type { Metadata } from "next";
import Layout from "@/app/components/layout";
import AboutPage from "@/app/components/about-us";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about TechMind.click, our mission to build fast, private, browser-based text utilities, and our editorial standards.",
  alternates: {
    canonical: "/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <Layout>
      <AboutPage />
    </Layout>
  );
}
