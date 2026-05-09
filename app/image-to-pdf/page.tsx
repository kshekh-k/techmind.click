import dynamic from "next/dynamic";
import { Suspense } from "react";
import Layout from "@/app/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image to PDF Converter Online | TechMind Click",
  description:
    "Convert JPG, PNG, and WebP images to a PDF file instantly — free, no watermark, no sign-up required.",
  alternates: { canonical: "/image-to-pdf" },
};

// pdf-lib + react-dropzone are large; lazy-load so they don't inflate the
// initial JS bundle for users who never visit this page.
const ImageToPdf = dynamic(() => import("@/app/components/image-to-pdf"), {
  loading: () => (
    <div
      className="min-h-[400px] flex items-center justify-center text-muted-foreground"
      aria-busy="true"
      aria-label="Loading converter…"
    >
      Loading…
    </div>
  ),
});

export default function ImageToPdfPage() {
  return (
    <Layout>
      <Suspense>
        <ImageToPdf />
      </Suspense>
    </Layout>
  );
}
