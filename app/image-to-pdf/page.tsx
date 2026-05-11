import dynamic from "next/dynamic";
import { Suspense } from "react";
import Layout from "@/app/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image to PDF Converter Online",
  description:
    "Convert JPG, PNG, and WebP images to a PDF file instantly — free, no watermark, no sign-up required.",
  keywords: [
    "image to pdf",
    "jpg to pdf",
    "png to pdf",
    "webp to pdf",
    "free image to pdf converter",
    "online image to pdf tool",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/image-to-pdf" },
  openGraph: {
    type: "website",
    title: "Free Image to PDF Converter Online",
    description:
      "Convert JPG, PNG, and WebP images to a PDF file instantly — free, no watermark, no sign-up required.",
    url: "/image-to-pdf",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image to PDF Converter Online",
    description:
      "Convert JPG, PNG, and WebP images to a PDF file instantly — free, no watermark, no sign-up required.",
  },
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
