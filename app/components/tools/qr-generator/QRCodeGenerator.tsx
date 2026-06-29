"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import type { Options as QROptions, DotType, CornerSquareType } from "qr-code-styling";
import QRControls from "./QRControls";
import QRPreview from "./QRPreview";
import { DEFAULT_QR_SETTINGS, type QRFormat, type QRSettings } from "@/app/types/qr";
import { buildQRData } from "@/utils/qr/generateQR";
import { downloadQR } from "@/utils/qr/downloadQR";
import { exportQRToPDF } from "@/utils/qr/exportPDF";

export default function QRCodeGenerator() {
  const [settings, setSettings] = useState<QRSettings>(DEFAULT_QR_SETTINGS);
  const [isExporting, setIsExporting] = useState(false);

  const qrContainerRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);

  const qrData = useMemo(() => buildQRData(settings), [settings]);

  const buildOptions = useCallback(
    (): QROptions => ({
      width: settings.size,
      height: settings.size,
      // canvas handles base64 data: URL logos reliably; svg mode + crossOrigin
      // silently blocks image load on data URLs (no CORS headers on data: scheme)
      type: "canvas",
      data: qrData || " ",
      image: settings.logo ?? undefined,
      margin: settings.margin,
      qrOptions: { errorCorrectionLevel: settings.logo ? "H" : "M" },
      dotsOptions: {
        color: settings.fgColor,
        type: settings.dotType as DotType,
      },
      backgroundOptions: { color: settings.bgColor },
      cornersSquareOptions: {
        color: settings.fgColor,
        type: settings.cornerType as CornerSquareType,
      },
      cornersDotOptions: { color: settings.fgColor },
      imageOptions: {
        // crossOrigin omitted — data: URLs have no CORS headers; setting it
        // causes browsers to silently drop the image
        margin: 5,
        hideBackgroundDots: true,
        imageSize: settings.logoSize,
      },
    }),
    [settings, qrData],
  );

  // Recreate the QR instance on every options change.
  // update() does not reliably re-render when the image prop changes
  // (null → data URL), so a fresh instance is the safest approach.
  useEffect(() => {
    if (!qrContainerRef.current) return;

    qrContainerRef.current.innerHTML = "";
    const qr = new QRCodeStyling(buildOptions());
    qr.append(qrContainerRef.current);
    qrInstanceRef.current = qr;

    return () => {
      if (qrContainerRef.current) qrContainerRef.current.innerHTML = "";
      qrInstanceRef.current = null;
    };
  }, [buildOptions]);

  const updateSettings = useCallback((partial: Partial<QRSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const handleDownload = useCallback(
    async (format: QRFormat) => {
      const qr = qrInstanceRef.current;
      if (!qr) return;

      try {
        if (format === "pdf") {
          setIsExporting(true);
          await exportQRToPDF(qr, settings.fileName, settings.size);
        } else {
          await downloadQR(qr, format, settings.fileName);
        }
      } catch (err) {
        console.error("QR download failed:", err);
      } finally {
        setIsExporting(false);
      }
    },
    [settings.fileName, settings.size],
  );

  const handleReset = useCallback(() => {
    setSettings(DEFAULT_QR_SETTINGS);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-2/5">
        <QRControls
          settings={settings}
          onSettingsChange={updateSettings}
          onReset={handleReset}
        />
      </div>
      <div className="w-full lg:w-3/5">
        <QRPreview
          qrContainerRef={qrContainerRef}
          fileName={settings.fileName}
          onFileNameChange={(name) => updateSettings({ fileName: name })}
          onDownload={handleDownload}
          isExporting={isExporting}
        />
      </div>
    </div>
  );
}
