"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import type { Options as QROptions, DotType, CornerSquareType } from "qr-code-styling";
import QRControls from "./QRControls";
import QRPreview from "./QRPreview";
import PendingQRBanner from "./PendingQRBanner";
import {
  DEFAULT_QR_SETTINGS,
  type QRFormat,
  type QRSettings,
  type QRInputType,
} from "@/app/types/qr";
import { useAuth } from "@/app/components/auth/AuthProvider";
import { buildQRData } from "@/utils/qr/generateQR";
import { downloadQR } from "@/utils/qr/downloadQR";
import { exportQRToPDF } from "@/utils/qr/exportPDF";
import { loadPendingQR } from "@/utils/qr/pendingQR";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

export default function QRCodeGenerator() {
  const { user, loading: authLoading } = useAuth();
  const [settings, setSettings] = useState<QRSettings>(DEFAULT_QR_SETTINGS);
  const [isExporting, setIsExporting] = useState(false);
  const [savedId, setSavedId] = useState<string | undefined>(undefined);
  const [savedName, setSavedName] = useState("");
  const [pendingRestored, setPendingRestored] = useState(false);
  const [showPendingBanner, setShowPendingBanner] = useState(false);

  const qrContainerRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);
  const prevLogoRef = useRef<string | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // True once the user has typed any content — controls visibility of the
  // settings + QR grid. The grid itself stays in the DOM (display:none) so
  // qrContainerRef is always attached and the QR never needs re-initializing.
  const isValidUrl = (url: string) => /^[^\s.]+(\.[^\s]+)+$/.test(url.trim());
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const hasContent = useMemo(() => {
    switch (settings.inputType) {
      case "url":   return isValidUrl(settings.url);
      case "text":  return settings.text.trim().length > 0;
      case "phone": return settings.phone.trim().length > 0;
      case "email": return settings.email.trim().length > 0 && isValidEmail(settings.email);
      case "wifi":  return settings.wifi.ssid.trim().length > 0;
      default:      return false;
    }
  }, [settings.inputType, settings.url, settings.text, settings.phone, settings.email, settings.wifi.ssid]);

  const urlError = useMemo(() => {
    if (!settings.url.trim()) return null;
    return isValidUrl(settings.url) ? null : "Enter a valid domain e.g. domain.com or www.example.com";
  }, [settings.url]);

  const emailError = useMemo(() => {
    if (!settings.email.trim()) return null;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)
      ? null
      : "Enter a valid email address (e.g. hello@example.com)";
  }, [settings.email]);

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
      cornersSquareOptions: { color: settings.cornerSquareColor, type: settings.cornerType as CornerSquareType },
      cornersDotOptions: { color: settings.cornerDotColor },
      imageOptions: { margin: 5, hideBackgroundDots: true, imageSize: settings.logoSize },
    }),
    [settings, qrData],
  );

  // Restore QR from localStorage on mount (profile preload takes priority over pending)
  useEffect(() => {
    const raw = localStorage.getItem("qr-preload");
    if (raw) {
      try {
        const { settings: preloadSettings, id, name } = JSON.parse(raw) as {
          settings: QRSettings;
          id?: string;
          name?: string;
        };
        setSettings(preloadSettings);
        if (id) setSavedId(id);
        if (name) setSavedName(name);
      } catch {}
      localStorage.removeItem("qr-preload");
      return;
    }

    const pending = loadPendingQR();
    if (pending) {
      setSettings(pending);
      setPendingRestored(true);
    }
  }, []);

  // Show save banner once auth resolves, user is confirmed logged in, and a pending QR was restored
  useEffect(() => {
    if (!authLoading && user && pendingRestored) setShowPendingBanner(true);
  }, [authLoading, user, pendingRestored]);

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
      const labelStyle = {
        color: settings.labelColor,
        fontSize: settings.labelFontSize,
        bold: settings.labelBold,
        italic: settings.labelItalic,
      };

      try {
        setIsExporting(true);
        if (format === "pdf") {
          await exportQRToPDF(qr, settings.fileName, settings.size, label, labelStyle, settings.bgColor, settings.logo, settings.logoSize);
        } else {
          await downloadQR(qr, format, settings.fileName, label, labelStyle, settings.bgColor, settings.size, svgEl, settings.logo, settings.logoSize);
        }
      } catch (err) {
        console.error("QR download failed:", err);
      } finally {
        setIsExporting(false);
      }
    },
    [settings.fileName, settings.size, settings.label, settings.labelColor, settings.labelFontSize, settings.labelBold, settings.labelItalic, settings.bgColor],
  );

  const handleReset = useCallback(() => setSettings(DEFAULT_QR_SETTINGS), []);

  return (
    <div className="space-y-6">

      {/* ── Pending QR save banner (shown after login when a guest QR was saved) */}
      {showPendingBanner && (
        <PendingQRBanner
          settings={settings}
          onSaved={(id, name) => { setSavedId(id); setSavedName(name); setShowPendingBanner(false); }}
          onDismiss={() => setShowPendingBanner(false)}
        />
      )}

      {/* ── Step 1: Content input ─────────────────────────────────── */}
      <Card className="shadow-sm !border-gray-100 gap-3!">
        <CardHeader >
          <CardTitle as="h2" className="text-base font-medium text-gray-600">
            What should your QR code point to?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={settings.inputType}
            onValueChange={(v) => updateSettings({ inputType: v as QRInputType })}
          >
            <TabsList className="w-full grid grid-cols-5 mb-4">
              {(["url", "text", "phone", "email", "wifi"] as const).map((t) => (
                <TabsTrigger key={t} value={t} className="text-xs capitalize">
                  {t === "url" ? "URL" : t.charAt(0).toUpperCase() + t.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="url" className="space-y-1.5">
              <Input
                placeholder="Enter URL e.g. https://www.techmind.click"
                value={settings.url}
                className={`py-5! bg-gray-50 ${urlError ? "!border-red-400 focus-visible:!ring-red-200" : "border-neutral-500"}`}
                onChange={(e) => updateSettings({ url: e.target.value })}
                type="text"
                autoFocus
              />
              {urlError && (
                <p className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  <span>⚠</span> {urlError}
                </p>
              )}
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

            <TabsContent value="email" className="space-y-1.5">
              <Input
                placeholder="e.g. hello@example.com"
                value={settings.email}
                className={emailError ? "!border-red-400 focus-visible:!ring-red-200" : ""}
                onChange={(e) => updateSettings({ email: e.target.value })}
                type="text"
              />
              {emailError && (
                <p className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  <span>⚠</span> {emailError}
                </p>
              )}
            </TabsContent>

            <TabsContent value="wifi" className="space-y-3">
              <Input
                placeholder="Network name (SSID)"
                value={settings.wifi.ssid}
                onChange={(e) =>
                  updateSettings({ wifi: { ...settings.wifi, ssid: e.target.value } })
                }
              />
              <Input
                placeholder="Password"
                value={settings.wifi.password}
                onChange={(e) =>
                  updateSettings({ wifi: { ...settings.wifi, password: e.target.value } })
                }
                type="password"
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
      <div className="flex flex-col md:grid md:grid-cols-12 gap-6" >
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
            bgColor={settings.bgColor}
            fileName={settings.fileName}
            onLabelChange={(label) => updateSettings({ label })}
            onFileNameChange={(name) => updateSettings({ fileName: name })}
            onDownload={handleDownload}
            isExporting={isExporting}
            user={user}
            settings={settings}
            savedId={savedId}
            onSaved={(id, name) => { setSavedId(id); setSavedName(name); }}
          />
        </div>
      </div>
    </div>
  );
}
