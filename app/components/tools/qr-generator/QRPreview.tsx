"use client";

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import DownloadButtons from "./DownloadButtons";
import type { QRFormat } from "@/app/types/qr";

type QRPreviewProps = {
  qrContainerRef: React.RefObject<HTMLDivElement | null>;
  fileName: string;
  onFileNameChange: (name: string) => void;
  onDownload: (format: QRFormat) => void;
  isExporting: boolean;
};

export default function QRPreview({
  qrContainerRef,
  fileName,
  onFileNameChange,
  onDownload,
  isExporting,
}: QRPreviewProps) {
  return (
    <Card className="shadow-sm !border-gray-100">
      <CardHeader className="pb-4">
        <CardTitle as="h2" className="text-lg font-semibold">
          Preview
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* QR Code canvas area */}
        <div className="flex items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-6 min-h-[320px]">
          <div ref={qrContainerRef} className="[&>svg]:rounded-md [&>canvas]:rounded-md" />
        </div>

        {/* Download section */}
        <DownloadButtons
          fileName={fileName}
          onFileNameChange={onFileNameChange}
          onDownload={onDownload}
          disabled={false}
          isExporting={isExporting}
        />
      </CardContent>
    </Card>
  );
}
