import dynamic from "next/dynamic";
import { Suspense } from "react";
import Layout from "@/app/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image to PDF Converter Online - Convert JPG to PDF on Mobile & Desktop",
  description:
    "Convert JPG, JPEG, and PNG images into a single clean PDF document in your browser. Fast, free, mobile-friendly, and no app installation required.",
  keywords: [
    "image to pdf",
    "jpg to pdf",
    "png to pdf",
    "convert jpg to pdf on mobile without app",
    "free image to pdf converter",
    "online image to pdf tool",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/image-to-pdf" },
  openGraph: {
    type: "website",
    title: "Free Image to PDF Converter Online - Convert JPG to PDF on Mobile & Desktop",
    description:
      "Convert JPG, JPEG, and PNG images into a single clean PDF document in your browser. Fast, free, mobile-friendly, and no app installation required.",
    url: "/image-to-pdf",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image to PDF Converter Online",
    description:
      "Convert JPG, JPEG, and PNG images into a single clean PDF document in your browser — free, mobile-friendly, no app needed.",
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
      Loading converter…
    </div>
  ),
});

export default function ImageToPdfPage() {
  return (
    <Layout>
      <Suspense>
        <ImageToPdf />
      </Suspense>

      <section className="max-w-4xl mx-auto px-4 py-12 border-t mt-8 space-y-12 text-slate-800">
        {/* Mobile Instructions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            How to Convert JPG to PDF on Mobile Without an App
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            When applying for jobs, submitting official documents, or uploading receipts on a smartphone, portals often demand a single PDF file instead of separate image attachments. You do not need to install heavy third-party apps or register for an account to create a PDF on mobile. Follow these simple steps directly in your mobile browser:
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                1
              </span>
              <h3 className="font-semibold text-slate-900 text-sm">Select Your Photos</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tap the upload box above in Safari (iOS) or Chrome (Android). Choose photos from your Photo Library, Camera Roll, or Files app (up to 10 images).
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                2
              </span>
              <h3 className="font-semibold text-slate-900 text-sm">Organize Page Order</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Review your selected images. Use the &quot;Sort by Name&quot; or &quot;Sort by Size&quot; buttons, or drag items into your preferred page sequence if supported by your touch browser.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                3
              </span>
              <h3 className="font-semibold text-slate-900 text-sm">Name Your PDF</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Enter an optional descriptive file name (such as &quot;application-documents&quot;) in the output field to keep your downloads organized.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                4
              </span>
              <h3 className="font-semibold text-slate-900 text-sm">Convert &amp; Save</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tap &quot;Convert to PDF&quot;. Once processing finishes, confirm the download prompt to save the PDF directly to your device Files app or Downloads folder.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Specs & File Handling */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Supported Formats &amp; File Handling Transparency
          </h2>
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 text-sm text-slate-600 leading-relaxed">
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Supported Image Formats:</h3>
              <p>
                The converter natively embeds <strong>JPG, JPEG, and PNG</strong> images into standard PDF page containers. Each image is placed on a dedicated page that matches the source image&apos;s native aspect ratio and dimensions, preventing distortion or awkward cropping.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-1">How Your Files Are Handled:</h3>
              <p>
                When you initiate a conversion, selected images are transmitted securely over an encrypted HTTPS connection to TechMind&apos;s serverless conversion function. The PDF document is assembled entirely in temporary system memory using <code>pdf-lib</code> and returned directly as a downloadable file stream. <strong>Your files are never saved to permanent disk storage, stored in any database, or retained after the response completes.</strong>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Device &amp; Browser Variation:</h3>
              <p>
                Download behavior varies depending on your mobile operating system. On iPhones and iPads running iOS Safari, tapping download prompts you to save the file to iCloud Drive or &quot;On My iPhone&quot; inside the native Files app. On Android devices running Chrome, the PDF downloads directly into your system Downloads folder. For multi-megabyte camera photos (e.g., 48MP raw images), processing time may vary depending on your mobile network connection.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-200 p-5 space-y-2">
              <h3 className="font-semibold text-slate-900 text-sm">
                Can I convert JPG images to PDF on mobile without installing an app?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes. The tool runs directly in mobile browsers like Safari, Chrome, Samsung Internet, and Firefox on iOS and Android. No App Store or Google Play downloads, registrations, or permissions are required.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5 space-y-2">
              <h3 className="font-semibold text-slate-900 text-sm">
                Can I combine multiple photos into a single PDF document?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes. You can upload up to 10 images at once. The converter combines all selected images into a single organized PDF file, with each image rendered on its own page.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5 space-y-2">
              <h3 className="font-semibold text-slate-900 text-sm">
                Are my uploaded images stored on your servers?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                No. Images are received over HTTPS and processed strictly in temporary serverless execution memory. Files are never written to permanent disk storage or retained after conversion.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5 space-y-2">
              <h3 className="font-semibold text-slate-900 text-sm">
                Where is the converted PDF saved on my smartphone?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                On iOS (Apple), the PDF saves to the Files app (in iCloud Drive or the local Downloads folder). On Android, Chrome saves the PDF directly into your device&apos;s Downloads manager.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
