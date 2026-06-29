"use client";

import dynamic from "next/dynamic";

const QRCodeGenerator = dynamic(() => import("./QRCodeGenerator"), {
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
});

export default function QRCodeGeneratorLoader() {
  return <QRCodeGenerator />;
}
