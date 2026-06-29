"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import type { Options as QROptions, DotType, CornerSquareType } from "qr-code-styling";
import QRControls from "./QRControls";
import QRPreview from "./QRPreview";
import {
  DEFAULT_QR_SETTINGS,
  type QRFormat,
  type QRSettings,
  type QRInputType,
} from "@/app/types/qr";
import { buildQRData } from "@/utils/qr/generateQR";
import { downloadQR } from "@/utils/qr/downloadQR";
import { exportQRToPDF } from "@/utils/qr/exportPDF";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

export default function QRCodeGenerator() {
  const [settings, setSettings] = useState<QRSettings>(DEFAULT_QR_SETTINGS);
  const [isExporting, setIsExporting] = useState(false);

  const qrContainerRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);
  const prevLogoRef = useRef<string | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // True once the user has typed any content — controls visibility of the
  // settings + QR grid. The grid itself stays in the DOM (display:none) so
  // qrContainerRef is always attached and the QR never needs re-initializing.
  const hasContent = useMemo(() => {
    switch (settings.inputType) {
      case "url":   return settings.url.trim().length > 0;
      case "text":  return settings.text.trim().length > 0;
      case "phone": return settings.phone.trim().length > 0;
      case "wifi":  return settings.wifi.ssid.trim().length > 0;
      default:      return false;
    }
  }, [settings.inputType, settings.url, settings.text, settings.phone, settings.wifi.ssid]);

  const qrData = useMemo(() => buildQRData(settings), [settings]);

  const buildOptions = useCallback(
    (): QROptions => ({
      width: settings.size,
      height: settings.size,
      type: "svg",
      data: qrData || " ",
      image: settings.logo ?? undefined,
      margin: settings.margin,
      qrOptions: { errorCorrectionLevel: settings.logo ? "H" : "M" },
      dotsOptions: { color: settings.fgColor, type: settings.dotType as DotType },
      backgroundOptions: { color: settings.bgColor },
      cornersSquareOptions: { color: settings.fgColor, type: settings.cornerType as CornerSquareType },
      cornersDotOptions: { color: settings.fgColor },
      imageOptions: { margin: 5, hideBackgroundDots: true, imageSize: settings.logoSize },
    }),
    [settings, qrData],
  );

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
      apply();
    } else {
      debounceTimerRef.current = setTimeout(apply, 200);
    }

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

  const handleReset = useCallback(() => setSettings(DEFAULT_QR_SETTINGS), []);

  return (
    <div className="space-y-6">

      {/* ── Step 1: Content input ─────────────────────────────────── */}
      <Card className="shadow-sm !border-gray-100">
        <CardHeader className="pb-3">
          <CardTitle as="h2" className="text-base font-medium text-gray-600">
            What should your QR code point to?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={settings.inputType}
            onValueChange={(v) => updateSettings({ inputType: v as QRInputType })}
          >
            <TabsList className="w-full grid grid-cols-4 mb-4">
              {(["url", "text", "phone", "wifi"] as const).map((t) => (
                <TabsTrigger key={t} value={t} className="text-xs capitalize">
                  {t === "url" ? "URL" : t.charAt(0).toUpperCase() + t.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="url">
              <Input
                placeholder="https://www.techmind.click"
                value={settings.url}
                onChange={(e) => updateSettings({ url: e.target.value })}
                type="url"
                autoFocus
              />
            </TabsContent>

            <TabsContent value="text">
              <Textarea
                placeholder="Enter your text…"
                value={settings.text}
                onChange={(e) => updateSettings({ text: e.target.value })}
                className="min-h-[90px] resize-none"
              />
            </TabsContent>

            <TabsContent value="phone">
              <Input
                placeholder="+1 555 000 0000"
                value={settings.phone}
                onChange={(e) => updateSettings({ phone: e.target.value })}
                type="tel"
              />
            </TabsContent>

            <TabsContent value="wifi" className="space-y-3">
              <Input
                placeholder="Network name (SSID)"
                value={settings.wifi.ssid}
                onChange={(e) =>
                  updateSettings({ wifi: { ...settings.wifi, ssid: e.target.value } })
                }
              />
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground mb-1 block">Encryption</Label>
                  <select
                    value={settings.wifi.encryption}
                    onChange={(e) =>
                      updateSettings({
                        wifi: {
                          ...settings.wifi,
                          encryption: e.target.value as "WPA" | "WEP" | "nopass",
                        },
                      })
                    }
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs focus:outline-none focus:ring-[3px] focus:ring-ring/50"
                  >
                    <option value="WPA">WPA / WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">No password</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="wifi-hidden"
                    checked={settings.wifi.hidden}
                    onChange={(e) =>
                      updateSettings({ wifi: { ...settings.wifi, hidden: e.target.checked } })
                    }
                    className="size-4 rounded accent-black"
                  />
                  <Label htmlFor="wifi-hidden" className="text-xs cursor-pointer">
                    Hidden
                  </Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* ── Step 2: Style options + QR preview ───────────────────────
           Always in the DOM (display:none when no content) so the
           qrContainerRef stays attached and the QR doesn't need
           re-mounting every time the user starts typing.          */}
      <div
        className="flex flex-col md:grid md:grid-cols-12 gap-6"
        style={{ display: hasContent ? undefined : "none" }}
      >
        {/* Style panel – 2 cols */}
        <div className="md:col-span-3 lg:col-span-4">
          <QRControls
            settings={settings}
            onSettingsChange={updateSettings}
            onReset={handleReset}
          />
        </div>

        {/* QR + label + file name + download – 4 cols */}
        <div className="md:col-span-9 lg:col-span-8">
          <QRPreview
            qrContainerRef={qrContainerRef}
            label={settings.label}
            labelColor={settings.fgColor}
            bgColor={settings.bgColor}
            fileName={settings.fileName}
            onLabelChange={(label) => updateSettings({ label })}
            onFileNameChange={(name) => updateSettings({ fileName: name })}
            onDownload={handleDownload}
            isExporting={isExporting}
          />
        </div>
      </div>
    </div>
  );
}
