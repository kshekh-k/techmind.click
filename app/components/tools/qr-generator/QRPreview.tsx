"use client";

import type React from "react";
import { Download, FileImage, FileText, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import type { QRFormat, QRSettings } from "@/app/types/qr";
import type { User } from "@supabase/supabase-js";
import SaveQRButton from "@/app/components/tools/qr-generator/SaveQRButton";
import SaveQRPrompt from "@/app/components/tools/qr-generator/SaveQRPrompt";

type QRPreviewProps = {
  qrContainerRef: React.RefObject<HTMLDivElement | null>;
  label: string;
  labelColor: string;
  bgColor: string;
  fileName: string;
  onLabelChange: (label: string) => void;
  onFileNameChange: (name: string) => void;
  onDownload: (format: QRFormat) => void;
  isExporting: boolean;
  user: User | null;
  settings: QRSettings;
  savedId?: string;
  onSaved: (id: string, name: string) => void;
};

export default function QRPreview({
  qrContainerRef,
  label,
  labelColor,
  bgColor,
  fileName,
  onLabelChange,
  onFileNameChange,
  onDownload,
  isExporting,
  user,
  settings,
  savedId,
  onSaved,
}: QRPreviewProps) {
  return (
    <Card className="shadow-sm !border-gray-100">
      <CardHeader className="pb-4">
        <CardTitle as="h2" className="text-lg font-semibold">
          Preview
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">

        {/* ── QR code display ─────────────────────────────────── */}
        <div className="flex items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-6">
          <div
            className="inline-flex flex-col items-center rounded-lg p-3 shadow-sm"
            style={{ backgroundColor: bgColor }}
          >
            <div ref={qrContainerRef} className="[&>svg]:rounded-sm [&>canvas]:rounded-sm" />

            {/* Label preview — always rendered so layout doesn't jump */}
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

        {/* ── Label ───────────────────────────────────────────── */}
        <div className="space-y-1.5">
          <Label htmlFor="qr-label" className="text-sm font-medium">
            Label
          </Label>
          <Input
            id="qr-label"
            placeholder="Add a label below the QR code"
            value={label}
            onChange={(e) => onLabelChange(e.target.value)}
            maxLength={60}
          />
          <p className="text-xs text-muted-foreground">
            Shown below the QR code — color follows the foreground color.
          </p>
        </div>

        {/* ── File name ───────────────────────────────────────── */}
        <div className="space-y-1.5">
          <Label htmlFor="qr-filename" className="text-sm font-medium">
            File name
          </Label>
          <Input
            id="qr-filename"
            placeholder="qr-code"
            value={fileName}
            onChange={(e) => onFileNameChange(e.target.value)}
          />
        </div>

        {/* ── Download ────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row gap-2 pt-1">
          <Button
            variant="outlineBlue"
            className="flex-1 gap-2"
            onClick={() => onDownload("png")}
            disabled={isExporting}
          >
            <FileImage className="size-4" />
            Download PNG
          </Button>
          <Button
            variant="outlinePurple"
            className="flex-1 gap-2"
            onClick={() => onDownload("svg")}
            disabled={isExporting}
          >
            <FileText className="size-4" />
            Download SVG
          </Button>
          <Button
            variant="outlineRose"
            className="flex-1 gap-2"
            onClick={() => onDownload("pdf")}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Exporting…
              </>
            ) : (
              <>
                <Download className="size-4" />
                Export PDF
              </>
            )}
          </Button>
        </div>

        {/* ── Save ────────────────────────────────────────────── */}
        {user ? (
          <SaveQRButton settings={settings} savedId={savedId} onSaved={onSaved} />
        ) : (
          <SaveQRPrompt />
        )}
      </CardContent>
    </Card>
  );
}
