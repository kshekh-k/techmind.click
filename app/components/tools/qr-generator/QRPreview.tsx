"use client";

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import DownloadButtons from "./DownloadButtons";
import type { QRFormat } from "@/app/types/qr";

type QRPreviewProps = {
  qrContainerRef: React.RefObject<HTMLDivElement | null>;
  label: string;
  labelColor: string;
  bgColor: string;
  fileName: string;
  onFileNameChange: (name: string) => void;
  onDownload: (format: QRFormat) => void;
  isExporting: boolean;
};

export default function QRPreview({
  qrContainerRef,
  label,
  labelColor,
  bgColor,
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
        {/* Outer centering shell */}
        <div className="flex items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-6 min-h-[320px]">
          {/*
            Inner "QR card" — white by default but respects bgColor.
            Label row is always rendered (min-height kept) so the preview
            doesn't jump when the user starts typing.
          */}
          <div
            className="inline-flex flex-col items-center rounded-lg p-3 shadow-sm"
            style={{ backgroundColor: bgColor }}
          >
            {/* QR code */}
            <div ref={qrContainerRef} className="[&>svg]:rounded-sm [&>canvas]:rounded-sm" />

            {/* Label row — always present so layout doesn't jump */}
            <div className="mt-2 flex min-h-[26px] w-full items-center justify-center px-2">
              {label ? (
                <p
                  className="text-sm font-semibold tracking-wide text-center break-words leading-snug max-w-full"
                  style={{ color: labelColor }}
                >
                  {label}
                </p>
              ) : (
                <p className="text-xs italic" style={{ color: labelColor, opacity: 0.3 }}>
                  label text
                </p>
              )}
            </div>
          </div>
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
