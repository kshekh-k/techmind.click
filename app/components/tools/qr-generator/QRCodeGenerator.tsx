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
  const prevLogoRef = useRef<string | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const qrData = useMemo(() => buildQRData(settings), [settings]);

  const buildOptions = useCallback(
    (): QROptions => ({
      width: settings.size,
      height: settings.size,
      // svg mode is non-blocking — QR paths are SVG elements drawn async.
      // canvas mode draws every dot synchronously inside append(), which blocks
      // the main thread for several seconds when a logo is involved.
      type: "svg",
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

  // Unmount-only cleanup so the container isn't cleared on every dep change.
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (qrContainerRef.current) qrContainerRef.current.innerHTML = "";
      qrInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!qrContainerRef.current) return;

    const logoChanged = prevLogoRef.current !== settings.logo;
    // Capture options now so the debounced callback uses the options from
    // this render, not whatever buildOptions returns later.
    const opts = buildOptions();

    const apply = () => {
      if (!qrContainerRef.current) return;
      prevLogoRef.current = settings.logo;

      if (!qrInstanceRef.current || logoChanged) {
        qrContainerRef.current.innerHTML = "";
        const qr = new QRCodeStyling(opts);
        qr.append(qrContainerRef.current);
        qrInstanceRef.current = qr;
      } else {
        qrInstanceRef.current.update(opts);
      }
    };

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    if (logoChanged) {
      // Logo changes are applied immediately so the preview feels responsive.
      apply();
    } else {
      // Debounce rapid changes (typing URL, dragging sliders) to avoid
      // flooding qr-code-styling on every keystroke.
      debounceTimerRef.current = setTimeout(apply, 200);
    }

    // Only cancel the pending timer — do NOT clear the container here, or
    // the QR preview will flash blank on every keystroke while debouncing.
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [buildOptions, settings.logo]);

  const updateSettings = useCallback((partial: Partial<QRSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const handleDownload = useCallback(
    async (format: QRFormat) => {
      const qr = qrInstanceRef.current;
      if (!qr) return;

      const label = settings.label.trim();
      const svgEl = label
        ? (qrContainerRef.current?.querySelector("svg") as SVGSVGElement | null)
        : null;

      try {
        setIsExporting(true);
        if (format === "pdf") {
          await exportQRToPDF(qr, settings.fileName, settings.size, label, settings.fgColor, settings.bgColor);
        } else {
          await downloadQR(qr, format, settings.fileName, label, settings.fgColor, settings.bgColor, settings.size, svgEl);
        }
      } catch (err) {
        console.error("QR download failed:", err);
      } finally {
        setIsExporting(false);
      }
    },
    [settings.fileName, settings.size, settings.label, settings.fgColor, settings.bgColor],
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
          label={settings.label}
          labelColor={settings.fgColor}
          bgColor={settings.bgColor}
          fileName={settings.fileName}
          onFileNameChange={(name) => updateSettings({ fileName: name })}
          onDownload={handleDownload}
          isExporting={isExporting}
        />
      </div>
    </div>
  );
}
