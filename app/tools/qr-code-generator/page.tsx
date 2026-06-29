import dynamic from "next/dynamic";
import { Suspense } from "react";
import Layout from "@/app/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free QR Code Generator Online | TechMind",
  description:
    "Generate custom QR codes online for free. Download QR codes in PNG, SVG, or PDF format with logo, colors, and style customization.",
  keywords: [
    "qr code generator",
    "free qr code generator",
    "custom qr code",
    "qr code with logo",
    "qr code download",
    "online qr code maker",
    "qr code png svg pdf",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/tools/qr-code-generator" },
  openGraph: {
    type: "website",
    title: "Free QR Code Generator Online | TechMind",
    description:
      "Generate custom QR codes online for free. Download QR codes in PNG, SVG, or PDF format with logo, colors, and style customization.",
    url: "/tools/qr-code-generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator Online | TechMind",
    description:
      "Generate custom QR codes online for free. Download in PNG, SVG, or PDF with custom colors and logo.",
  },
};

// qr-code-styling uses browser Canvas/SVG APIs — load client-only
const QRCodeGenerator = dynamic(
  () => import("@/app/components/tools/qr-generator/QRCodeGenerator"),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[500px] flex items-center justify-center text-muted-foreground"
        aria-busy="true"
        aria-label="Loading QR Code Generator…"
      >
        Loading…
      </div>
    ),
  },
);

export default function QRCodeGeneratorPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Free QR Code Generator
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Create custom QR codes for URLs, text, email, phone, or WiFi. Add a logo, pick your
            colors and style, then download as PNG, SVG, or PDF — free, no sign-up.
          </p>
        </div>

        <Suspense>
          <QRCodeGenerator />
        </Suspense>
      </div>
    </Layout>
  );
}
