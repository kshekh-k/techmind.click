"use client";

import { Download, FileImage, FileText, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import type { QRFormat } from "@/app/types/qr";

type DownloadButtonsProps = {
  fileName: string;
  onFileNameChange: (name: string) => void;
  onDownload: (format: QRFormat) => void;
  disabled: boolean;
  isExporting: boolean;
};

export default function DownloadButtons({
  fileName,
  onFileNameChange,
  onDownload,
  disabled,
  isExporting,
}: DownloadButtonsProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="qr-filename" className="mb-1.5 block text-sm">
          File name
        </Label>
        <Input
          id="qr-filename"
          value={fileName}
          onChange={(e) => onFileNameChange(e.target.value)}
          placeholder="qr-code"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button
          variant="outlineBlue"
          className="w-full gap-2"
          onClick={() => onDownload("png")}
          disabled={disabled || isExporting}
        >
          <FileImage className="size-4" />
          Download PNG
        </Button>
        <Button
          variant="outlinePurple"
          className="w-full gap-2"
          onClick={() => onDownload("svg")}
          disabled={disabled || isExporting}
        >
          <FileText className="size-4" />
          Download SVG
        </Button>
        <Button
          variant="outlineRose"
          className="w-full gap-2"
          onClick={() => onDownload("pdf")}
          disabled={disabled || isExporting}
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
    </div>
  );
}
