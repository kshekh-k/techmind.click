"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import type {
  Options as QROptions,
  DotType,
  CornerSquareType,
} from "qr-code-styling";
import PendingQRBanner from "./PendingQRBanner";
import LogoUploader from "./LogoUploader";
import SaveQRButton from "./SaveQRButton";
import SaveQRPrompt from "./SaveQRPrompt";
import {
  DEFAULT_QR_SETTINGS,
  SIZE_OPTIONS,
  DOT_TYPE_OPTIONS,
  CORNER_TYPE_OPTIONS,
  SOCIAL_PRESETS,
  type QRFormat,
  type QRSettings,
  type QRInputType,
} from "@/app/types/qr";
import { useAuth } from "@/app/components/auth/AuthProvider";
import { buildQRData } from "@/utils/qr/generateQR";
import { downloadQR } from "@/utils/qr/downloadQR";
import { exportQRToPDF } from "@/utils/qr/exportPDF";
import { loadPendingQR } from "@/utils/qr/pendingQR";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  FileText,
  Link,
  Mail,
  Orbit,
  Smartphone,
  Star,
  Wifi,
  RotateCcw,
  Download,
  FileImage,
  Loader2,
  Circle,
  Grid,
  Grip,
  Sparkles,
  ChevronDown,
  CircleDot,
  Shield,
  Square,
  Hexagon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  RiInstagramLine,
  RiFacebookCircleLine,
  RiYoutubeLine,
  RiLinkedinBoxLine,
  RiPinterestLine,
  RiTwitterXLine,
  RiTiktokLine,
  RiWhatsappLine,
  RiSnapchatLine,
  RiTelegramLine,
  RiGoogleLine,
  RiAppleLine,
  RiGooglePlayLine,
  RiRestartLine,
} from "react-icons/ri";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Default: RiRestartLine,
  Instagram: RiInstagramLine,
  Facebook: RiFacebookCircleLine,
  YouTube: RiYoutubeLine,
  LinkedIn: RiLinkedinBoxLine,
  Pinterest: RiPinterestLine,
  X: RiTwitterXLine,
  TikTok: RiTiktokLine,
  WhatsApp: RiWhatsappLine,
  Snapchat: RiSnapchatLine,
  Telegram: RiTelegramLine,
  Google: RiGoogleLine,
  "App Store": RiAppleLine,
  "Google Play": RiGooglePlayLine,
};

const DOT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  rounded: Circle,
  dots: Grip,
  classy: Sparkles,
  "classy-rounded": Orbit,
  square: Square,
  "extra-rounded": Hexagon,
};

const CORNER_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  dot: CircleDot,
  square: Square,
  "extra-rounded": Shield,
};

async function fetchLogoAsPng(url: string): Promise<string> {
  const res = await fetch(url);
  const svgText = await res.text();
  return new Promise<string>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(
      new Blob([svgText], { type: "image/svg+xml" }),
    );
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        return reject(new Error("no ctx"));
      }
      ctx.drawImage(img, 0, 0, 128, 128);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("img load failed"));
    };
    img.src = objectUrl;
  });
}

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

  const [dotDropdownOpen, setDotDropdownOpen] = useState(false);
  const [cornerDropdownOpen, setCornerDropdownOpen] = useState(false);
  const [socialDropdownOpen, setSocialDropdownOpen] = useState(false);
  const [selectedPresetName, setSelectedPresetName] = useState<string>("Default");

  const dotDropdownRef = useRef<HTMLDivElement>(null);
  const cornerDropdownRef = useRef<HTMLDivElement>(null);
  const socialDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dotDropdownRef.current &&
        !dotDropdownRef.current.contains(event.target as Node)
      ) {
        setDotDropdownOpen(false);
      }
      if (
        cornerDropdownRef.current &&
        !cornerDropdownRef.current.contains(event.target as Node)
      ) {
        setCornerDropdownOpen(false);
      }
      if (
        socialDropdownRef.current &&
        !socialDropdownRef.current.contains(event.target as Node)
      ) {
        setSocialDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // True once the user has typed any content — controls visibility of the
  // settings + QR grid. The grid itself stays in the DOM (display:none) so
  // qrContainerRef is always attached and the QR never needs re-initializing.
  const isValidUrl = (url: string) => /^[^\s.]+(\.[^\s]+)+$/.test(url.trim());
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const qrTypes = [
    { value: "url", label: "URL", icon: Link, color: "--color-purple-500" },
    { value: "text", label: "Text", icon: FileText, color: "--color-blue-500" },
    { value: "phone", label: "Phone", icon: Smartphone, color: "--color-red-500" },
    { value: "email", label: "Email", icon: Mail, color: "--color-cyan-500" },
    { value: "wifi", label: "Wi-Fi", icon: Wifi, color: "--color-emerald-500" },
  ] as const;

  const hasContent = useMemo(() => {
    switch (settings.inputType) {
      case "url":
        return isValidUrl(settings.url);
      case "text":
        return settings.text.trim().length > 0;
      case "phone":
        return settings.phone.trim().length > 0;
      case "email":
        return settings.email.trim().length > 0 && isValidEmail(settings.email);
      case "wifi":
        return settings.wifi.ssid.trim().length > 0;
      default:
        return false;
    }
  }, [
    settings.inputType,
    settings.url,
    settings.text,
    settings.phone,
    settings.email,
    settings.wifi.ssid,
  ]);

  const urlError = useMemo(() => {
    if (!settings.url.trim()) return null;
    return isValidUrl(settings.url)
      ? null
      : "Enter a valid domain e.g. domain.com or www.example.com";
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
      dotsOptions: {
        color: settings.fgColor,
        type: settings.dotType as DotType,
      },
      backgroundOptions: { color: settings.bgColor },
      cornersSquareOptions: {
        color: settings.cornerSquareColor,
        type: settings.cornerType as CornerSquareType,
      },
      cornersDotOptions: { color: settings.cornerDotColor },
      imageOptions: {
        margin: 8,
        hideBackgroundDots: true,
        imageSize: settings.logoSize,
      },
    }),
    [settings, qrData],
  );

  // Restore QR from localStorage on mount (profile preload takes priority over pending)
  useEffect(() => {
    const raw = localStorage.getItem("qr-preload");
    if (raw) {
      try {
        const {
          settings: preloadSettings,
          id,
          name,
        } = JSON.parse(raw) as {
          settings: QRSettings;
          id?: string;
          name?: string;
        };
        setSettings({ ...DEFAULT_QR_SETTINGS, ...preloadSettings });
        if (id) setSavedId(id);
        if (name) setSavedName(name);
      } catch { }
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
        color: settings.labelColor || "#000000",
        fontSize: settings.labelFontSize || 14,
        bold: settings.labelBold ?? false,
        italic: settings.labelItalic ?? false,
      };

      try {
        setIsExporting(true);
        if (format === "pdf") {
          await exportQRToPDF(
            qr,
            settings.fileName,
            settings.size,
            label,
            labelStyle,
            settings.bgColor,
            settings.logo,
            settings.logoSize,
          );
        } else {
          await downloadQR(
            qr,
            format,
            settings.fileName,
            label,
            labelStyle,
            settings.bgColor,
            settings.size,
            svgEl,
            settings.logo,
            settings.logoSize,
          );
        }
      } catch (err) {
        console.error("QR download failed:", err);
      } finally {
        setIsExporting(false);
      }
    },
    [
      settings.fileName,
      settings.size,
      settings.label,
      settings.labelColor,
      settings.labelFontSize,
      settings.labelBold,
      settings.labelItalic,
      settings.bgColor,
    ],
  );

  const handleReset = useCallback(() => setSettings(DEFAULT_QR_SETTINGS), []);

  return (
    <div className="space-y-6 -mt-6 sm:mt-0">
      {/* ── Pending QR save banner (shown after login when a guest QR was saved) */}
      {showPendingBanner && (
        <PendingQRBanner
          settings={settings}
          onSaved={(id, name) => {
            setSavedId(id);
            setSavedName(name);
            setShowPendingBanner(false);
          }}
          onDismiss={() => setShowPendingBanner(false)}
        />
      )}

      <div className="flex flex-col lg:grid lg:grid-cols-20 gap-4 xl:gap-6">
        <div className="col-span-8">
          {/* Hero */}
          <div className="mb-2 space-y-3 text-center ">
            <div className="max-w-lg space-y-3 ">
              <div className="flex justify-start">
                <p className="border border-slate-200 text-xs hidden sm:flex gap-2 items-center p-2 px-4 rounded text-purple-500">
                  <Star className="size-4  fill-purple-500 " /> 100% Free |{" "}
                  <span className="text-indigo-600">No Signup </span>|{" "}
                  <span className="text-blue-600">Unlimited QR Codes</span>
                </p>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 text-left mb-2">
                Generate Beautifull{" "}
                <span className="text-purple-500">QR Code</span> in Seconds
              </h1>

            </div>

            <Tabs
              className="space-y-2"
              value={settings.inputType}
              onValueChange={(v) =>
                updateSettings({ inputType: v as QRInputType })
              }
            >
              <TabsList className="w-full flex-wrap bg-transparent! h-auto! flex! gap-2">
                {qrTypes.map(({ value, label, icon: Icon, color }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="rounded-sm! font-medium transition-all text-xs! bg-white shadow-1! text-(color:--text-color)
                   data-[state=active]:bg-(--text-color)
                   data-[state=active]:text-white" style={{ '--text-color': `var(${color as string})` }}
                  >
                    <span className="flex items-center justify-center gap-1 py-1">
                      <Icon className="size-3.5" strokeWidth={2.5} />
                      <span>{label}</span>
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="url" className="space-y-1.5">
                <div className="relative">
                  <Input
                    placeholder="Enter URL e.g. https://www.techmind.click"
                    value={settings.url}
                    className={`px-5! py-3! h-auto text-base! bg-white shadow-1! focus:ring-black/5! focus:border-transparent focus:outline-transparent focus-visible:!ring-transparent focus-visible:!border-purple-500 ${urlError ? "!border-red-400 focus-visible:!ring-red-200" : "border-transparent"}`}
                    onChange={(e) => updateSettings({ url: e.target.value })}
                    type="text"
                    autoFocus
                  />

                </div>
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
                  className={`min-h-[90px] resize-none py-3! px-5! text-base! bg-white shadow-1! focus:ring-black/5! focus:border-transparent focus:outline-transparent focus-visible:!ring-transparent focus-visible:!border-purple-500 ${urlError ? "!border-red-400 focus-visible:!ring-red-200" : "border-transparent"}`}
                />
              </TabsContent>

              <TabsContent value="phone">
                <div className="relative">
                  <Input
                    placeholder="+1 555 000 0000"
                    value={settings.phone}
                    onChange={(e) => updateSettings({ phone: e.target.value })}
                    type="tel"
                    className={`px-5! py-3! h-auto text-base! bg-white shadow-1! focus:ring-black/5! focus:border-transparent focus:outline-transparent focus-visible:!ring-transparent focus-visible:!border-purple-500 `}
                  />

                </div>
              </TabsContent>

              <TabsContent value="email" className="space-y-1.5">
                <div className="relative">
                  <Input
                    placeholder="e.g. hello@example.com"
                    value={settings.email}
                    className={`px-5! py-3! h-auto text-base! bg-white shadow-1! focus:ring-black/5! focus:border-transparent focus:outline-transparent focus-visible:!ring-transparent focus-visible:!border-purple-500
                    ${emailError
                        ? "!border-red-400 focus-visible:!ring-red-200"
                        : ""
                      }`}
                    onChange={(e) => updateSettings({ email: e.target.value })}
                    type="text"
                  />

                </div>
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
                  className={`px-5! py-3! h-auto text-base! bg-white shadow-1! focus:ring-black/5! focus:border-transparent focus:outline-transparent focus-visible:!ring-transparent focus-visible:!border-purple-500`}
                  onChange={(e) =>
                    updateSettings({
                      wifi: { ...settings.wifi, ssid: e.target.value },
                    })
                  }
                />
                <Input
                  placeholder="Password"
                  value={settings.wifi.password}
                  className={`px-5! py-3! h-auto text-base! bg-white shadow-1! focus:ring-black/5! focus:border-transparent focus:outline-transparent focus-visible:!ring-transparent focus-visible:!border-purple-500`}
                  onChange={(e) =>
                    updateSettings({
                      wifi: { ...settings.wifi, password: e.target.value },
                    })
                  }
                  type="password"
                />
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-1">
                    <Label className="text-[10px] text-muted-foreground block text-left">
                      Encryption
                    </Label>
                    <select
                      value={settings.wifi.encryption}
                      onChange={(e) =>
                        updateSettings({
                          wifi: {
                            ...settings.wifi,
                            encryption: e.target.value as
                              | "WPA"
                              | "WEP"
                              | "nopass",
                          },
                        })
                      }
                      className={`px-5! py-3! w-full rounded text-base! bg-white border border-transparent shadow-1! focus:ring-black/5! focus:border-transparent focus:outline-transparent focus-visible:!ring-transparent focus-visible:!border-purple-500`}
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
                        updateSettings({
                          wifi: { ...settings.wifi, hidden: e.target.checked },
                        })
                      }
                      className="size-6 rounded text-purple-500"
                    />
                    <Label
                      htmlFor="wifi-hidden"
                      className="text-[10px] text-muted-foreground block text-left cursor-pointer"
                    >
                      Hidden
                    </Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* ── Colors ────────────────────────────────────────────── */}
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground block text-left">QR Colors</Label>
              <div className="sm:grid sm:grid-cols-4 gap-3 flex flex-wrap">
                {[
                  { id: "fg", label: "Foreground", key: "fgColor" as const },
                  { id: "bg", label: "Background", key: "bgColor" as const },
                  { id: "csq", label: "Corner Frame", key: "cornerSquareColor" as const },
                  { id: "cdot", label: "Corner Dots", key: "cornerDotColor" as const },
                ].map(({ id, label, key }) => (
                  <div key={id} className="space-y-1 bg-white shadow-1! p-2 rounded-sm">
                    <Label className="text-[10px] text-muted-foreground block text-left">{label}</Label>
                    <div className="flex items-center gap-1 ">
                      <div className="relative flex items-center ">
                        <input
                          type="color"
                          id={`${id}-color-picker`}
                          value={settings[key]}
                          onChange={(e) => updateSettings({ [key]: e.target.value })}
                          className="sr-only"
                        />
                        <label
                          htmlFor={`${id}-color-picker`}
                          className="block size-5 rounded-sm! border border-gray-200 cursor-pointer shadow-xs hover:border-gray-400 transition-colors"
                          style={{ backgroundColor: settings[key] }}
                        />
                      </div>
                      <label htmlFor={`${id}-color-picker`} className="text-[10px] font-mono text-muted-foreground uppercase">
                        {settings[key]}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap sm:grid sm:grid-cols-3 gap-4 w-full">
              {/* ── Margin ────────────────────────────────────────────── */}
              <div className="space-y-2 w-full sm:w-auto">

                <Label className="text-[10px] text-muted-foreground block text-left">Margin</Label>
                <div className="bg-white shadow-1! p-2.5   rounded-sm items-center flex gap-1">


                  <input
                    type="range"
                    min={0}
                    max={40}
                    step={5}
                    value={settings.margin}
                    onChange={(e) => updateSettings({ margin: Number(e.target.value) })}
                    className="w-full accent-purple-600 h-1.5 cursor-pointer"
                  />
                  <span className="text-[10px] text-muted-foreground">{settings.margin}px</span>

                </div>
              </div>

              {/* ── Dot Style ─────────────────────────────────────────── */}
              <div ref={dotDropdownRef} className="space-y-2 flex-1 relative">
                <Label className="text-[10px] text-muted-foreground block text-left">Dot Style</Label>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setDotDropdownOpen(!dotDropdownOpen);
                      setCornerDropdownOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-sm! shadow-1! hover:border-gray-400 transition-colors h-9"
                  >
                    <span className="flex items-center gap-2">
                      {(() => {
                        const SelectedIcon = DOT_ICONS[settings.dotType] || Circle;
                        const currentOption = DOT_TYPE_OPTIONS.find((o) => o.value === settings.dotType) || DOT_TYPE_OPTIONS[0];
                        return (
                          <>
                            <SelectedIcon className="size-3.5 text-purple-600" />
                            <span className="font-medium text-gray-700">{currentOption.label}</span>
                          </>
                        );
                      })()}
                    </span>
                    <ChevronDown className={cn("size-3.5 text-gray-500 transition-transform", dotDropdownOpen && "rotate-180")} />
                  </button>

                  {dotDropdownOpen && (
                    <div className="absolute z-30 w-full mt-1 bg-white border border-gray-100 rounded-sm shadow-lg max-h-48 overflow-y-auto py-1">
                      {DOT_TYPE_OPTIONS.map((opt) => {
                        const IconComponent = DOT_ICONS[opt.value] || Circle;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              updateSettings({ dotType: opt.value });
                              setDotDropdownOpen(false);
                            }}
                            className={cn(
                              "flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-purple-50 transition-colors",
                              settings.dotType === opt.value
                                ? "bg-purple-50 text-purple-700 font-semibold"
                                : "text-gray-600"
                            )}
                          >
                            <IconComponent className={cn("size-3.5", settings.dotType === opt.value ? "text-purple-700" : "text-gray-400")} />
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Corner Style ──────────────────────────────────────── */}
              <div ref={cornerDropdownRef} className="space-y-2 flex-1 relative">
                <Label className="text-[10px] text-muted-foreground block text-left">Corner Style</Label>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setCornerDropdownOpen(!cornerDropdownOpen);
                      setDotDropdownOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-sm! shadow-1! hover:border-gray-400 transition-colors h-9"
                  >
                    <span className="flex items-center gap-2">
                      {(() => {
                        const SelectedIcon = CORNER_ICONS[settings.cornerType] || CircleDot;
                        const currentOption = CORNER_TYPE_OPTIONS.find((o) => o.value === settings.cornerType) || CORNER_TYPE_OPTIONS[0];
                        return (
                          <>
                            <SelectedIcon className="size-3.5 text-purple-600" />
                            <span className="font-medium text-gray-700">{currentOption.label}</span>
                          </>
                        );
                      })()}
                    </span>
                    <ChevronDown className={cn("size-3.5 text-gray-500 transition-transform", cornerDropdownOpen && "rotate-180")} />
                  </button>

                  {cornerDropdownOpen && (
                    <div className="absolute z-30 w-full mt-1 bg-white border border-gray-100 rounded-sm shadow-lg max-h-48 overflow-y-auto py-1">
                      {CORNER_TYPE_OPTIONS.map((opt) => {
                        const IconComponent = CORNER_ICONS[opt.value] || CircleDot;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              updateSettings({ cornerType: opt.value });
                              setCornerDropdownOpen(false);
                            }}
                            className={cn(
                              "flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-purple-50 transition-colors",
                              settings.cornerType === opt.value
                                ? "bg-purple-50 text-purple-700 font-semibold"
                                : "text-gray-600"
                            )}
                          >
                            <IconComponent className={cn("size-3.5", settings.cornerType === opt.value ? "text-purple-700" : "text-gray-400")} />
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {/* ── Logo ──────────────────────────────────────────────── */}
              <LogoUploader
                logo={settings.logo}
                logoSize={settings.logoSize}
                onLogoChange={(logo) => updateSettings({ logo })}
                onLogoSizeChange={(logoSize) => updateSettings({ logoSize })}
              />
              {/* ── Social Media Presets ───────────────────────────────── */}
              <div ref={socialDropdownRef} className="space-y-1 relative">
                <Label className="text-[10px] text-muted-foreground block text-left">Social Presets</Label>
                <div>
                  <button
                    type="button"
                    onClick={() => setSocialDropdownOpen(!socialDropdownOpen)}
                    className="flex items-center justify-between w-full px-3 py-3.5 text-xs bg-white border border-gray-200 rounded-sm! shadow-1! hover:border-gray-400 transition-colors h-11.5"
                  >
                    <span className="flex items-center gap-2">
                      {(() => {
                        const SelectedIcon = SOCIAL_ICONS[selectedPresetName] || RiRestartLine;
                        const preset = SOCIAL_PRESETS.find((p) => p.name === selectedPresetName);
                        const displayColor = selectedPresetName === "Default" ? "#6B7280" : (preset?.brandColor || "#6B7280");
                        return (
                          <>
                            <SelectedIcon className="size-4 shrink-0" style={{ color: displayColor }} />
                            <span className="font-medium text-gray-700">{selectedPresetName}</span>
                          </>
                        );
                      })()}
                    </span>
                    <ChevronDown className={cn("size-3.5 text-gray-500 transition-transform", socialDropdownOpen && "rotate-180")} />
                  </button>

                  {socialDropdownOpen && (
                    <div className="absolute z-30 w-full mt-1 bg-white border border-gray-100 rounded-sm shadow-lg max-h-48 overflow-y-auto py-1">
                      {/* Default Option */}
                      <button
                        type="button"
                        onClick={() => {
                          updateSettings({
                            fgColor: DEFAULT_QR_SETTINGS.fgColor,
                            bgColor: DEFAULT_QR_SETTINGS.bgColor,
                            cornerSquareColor: DEFAULT_QR_SETTINGS.cornerSquareColor,
                            cornerDotColor: DEFAULT_QR_SETTINGS.cornerDotColor,
                            dotType: DEFAULT_QR_SETTINGS.dotType,
                            cornerType: DEFAULT_QR_SETTINGS.cornerType,
                            logo: null,
                          });
                          setSelectedPresetName("Default");
                          setSocialDropdownOpen(false);
                        }}
                        className={cn(
                          "flex items-center justify-between w-full px-3 py-2 text-xs text-left hover:bg-purple-50 transition-colors",
                          selectedPresetName === "Default"
                            ? "bg-purple-50 text-purple-700 font-semibold"
                            : "text-gray-600"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <RiRestartLine className="size-4 text-gray-500 shrink-0" />
                          <span>Default (Reset)</span>
                        </span>
                      </button>

                      {/* Social Options */}
                      {SOCIAL_PRESETS.map((preset) => {
                        const IconComponent = SOCIAL_ICONS[preset.name] || RiRestartLine;
                        return (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={async () => {
                              setSelectedPresetName(preset.name);
                              setSocialDropdownOpen(false);
                              updateSettings({
                                fgColor: preset.fgColor,
                                bgColor: preset.bgColor,
                                cornerSquareColor: preset.cornerSquareColor,
                                cornerDotColor: preset.cornerDotColor,
                                dotType: preset.dotType,
                                cornerType: preset.cornerType,
                                logo: null,
                              });
                              try {
                                const dataUrl = await fetchLogoAsPng(preset.logoUrl);
                                updateSettings({ logo: dataUrl });
                              } catch {
                                updateSettings({ logo: preset.logoUrl });
                              }
                            }}
                            className={cn(
                              "flex items-center justify-between w-full px-3 py-2 text-xs text-left hover:bg-purple-50 transition-colors",
                              selectedPresetName === preset.name
                                ? "bg-purple-50 text-purple-700 font-semibold"
                                : "text-gray-600"
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <IconComponent className="size-4 shrink-0" style={{ color: preset.brandColor }} />
                              <span>{preset.name}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Reset ─────────────────────────────────────────────── */}
            <Button variant="outline" className="w-full gap-2 border-transparent shadow-1! bg-white " onClick={handleReset}>
              <RotateCcw className="size-3.5" />
              Reset to Defaults
            </Button>

          </div>
        </div>


        {/* QR + label + file name + download – merged from QRPreview */}


        {/* ── QR code display ─────────────────────────────────── */}
        <div className="col-span-8 flex items-center justify-center bg-gray-100 rounded">
          <div
            className="rounded-lg p-2 shadow-1!"
            style={{ backgroundColor: settings.bgColor }}
          >
            <div ref={qrContainerRef} className="[&>svg]:rounded-sm [&>canvas]:rounded-sm [&>svg]:max-w-full" />

            {/* Label preview — always rendered so layout doesn't jump */}
            <div className="mt-2 flex min-h-[26px] w-full items-center justify-center px-2">
              {settings.label ? (
                <p
                  className="tracking-wide text-center break-words leading-snug max-w-full"
                  style={{
                    color: settings.labelColor,
                    fontSize: `${settings.labelFontSize}px`,
                    fontWeight: settings.labelBold ? 700 : 400,
                    fontStyle: settings.labelItalic ? "italic" : "normal",
                  }}
                >
                  {settings.label}
                </p>
              ) : (
                <p className="text-xs italic" style={{ color: settings.labelColor, opacity: 0.3 }}>
                  label text
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-4 space-y-4">
          {/* ── Label ───────────────────────────────────────────── */}
          <div className="space-y-1.5">
            <Label htmlFor="qr-label" className="text-[10px] text-muted-foreground block">
              Label
            </Label>
            <Input
              id="qr-label"
              placeholder="Add a label below the QR code"
              value={settings.label}
              onChange={(e) => updateSettings({ label: e.target.value })}
              maxLength={60}
              className="px-3! py-2.5! h-auto text-xs! rounded-sm! bg-white shadow-1! focus:ring-black/5! focus:border-transparent focus:outline-transparent focus-visible:!ring-transparent focus-visible:!border-purple-500"
            />
          </div>

          {/* ── Label Style ───────────────────────────────────────── */}
          <div className="flex gap-2 justify-between items-center">
            {/* Color */}
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground block">Color</Label>
              <div className="flex flex-col items-center gap-1 ">
                <div className="relative flex items-center rounded-sm! bg-white shadow-1! p-1">
                  <input
                    type="color"
                    id="label-color-picker"
                    value={settings.labelColor}
                    onChange={(e) => updateSettings({ labelColor: e.target.value })}
                    className="sr-only"
                  />
                  <label
                    htmlFor="label-color-picker"
                    className="block size-5 rounded-sm! border border-gray-200 cursor-pointer shadow-xs hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: settings.labelColor }}
                  />
                </div>
                <label htmlFor="label-color-picker" className="text-[10px] font-mono text-muted-foreground uppercase">
                  {settings.labelColor}
                </label>
              </div>
            </div>

            {/* Font size */}
            <div className="space-y-1">
              <Label htmlFor="qr-label-fontsize" className="text-[10px] text-muted-foreground block">Font Size</Label>
              <select
                id="qr-label-fontsize"
                value={settings.labelFontSize}
                onChange={(e) => updateSettings({ labelFontSize: Number(e.target.value) })}
                className="w-full px-1! py-1! h-6 text-[10px]! bg-white shadow-1! border border-transparent rounded-sm! focus:outline-none!"
              >
                <option value={12}>SM (12px)</option>
                <option value={14}>MD (14px)</option>
                <option value={18}>LG (18px)</option>
                <option value={22}>XL (22px)</option>
              </select>
            </div>

            {/* Bold / Italic */}
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground block">Style</Label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => updateSettings({ labelBold: !settings.labelBold })}
                  className={cn(
                    "text-xs bg-white shadow-1! py-1 px-2 font-bold transition-colors rounded-sm!",
                    settings.labelBold
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-600",
                  )}
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => updateSettings({ labelItalic: !settings.labelItalic })}
                  className={cn(
                    "text-xs bg-white shadow-1! py-1 px-2 italic font-medium transition-colors rounded-sm!",
                    settings.labelItalic
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-600",
                  )}
                >
                  i
                </button>
              </div>
            </div>
          </div>

          {/* ── Size ──────────────────────────────────────────────── */}
          <div className="space-y-2">
            <Label className="text-[10px] text-muted-foreground block">Size</Label>
            <div className="grid grid-cols-3 gap-1.5">
              {SIZE_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateSettings({ size: value })}
                  className={cn(
                    "text-[10px] leading-none bg-white shadow-1! py-3 font-medium transition-colors rounded-sm! ",
                    settings.size === value
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-600",
                  )}
                >
                  {label}
                  <span className="block text-[10px] opacity-70 pt-1" >{value}px</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── File name ───────────────────────────────────────── */}
          <div className="space-y-1.5">
            <Label htmlFor="qr-filename" className="text-[10px] text-muted-foreground block">
              File name
            </Label>
            <Input
              id="qr-filename"
              placeholder="qr-code"
              value={settings.fileName}
              onChange={(e) => updateSettings({ fileName: e.target.value })}
              className="px-3! py-2.5! h-auto text-xs! rounded-sm! bg-white shadow-1! focus:ring-black/5! focus:border-transparent focus:outline-transparent focus-visible:!ring-transparent focus-visible:!border-purple-500"
            />
          </div>

          {/* ── Download ────────────────────────────────────────── */}
          <div className="space-y-2">
            <Label className="text-[10px] text-muted-foreground block">Download</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outlineBlue"
                className="flex-1 gap-1 rounded-sm! text-xs! border-transparent shadow-1 bg-white" size={'xs'}
                onClick={() => handleDownload("png")}
                disabled={isExporting}
              >
                <FileImage className="size-3" />
                PNG
              </Button>
              <Button
                variant="outlinePurple"
                className="flex-1 gap-1 rounded-sm! text-xs! border-transparent shadow-1 bg-white" size={'xs'}
                onClick={() => handleDownload("svg")}
                disabled={isExporting}
              >
                <FileText className="size-3" />
                SVG
              </Button>
              <Button
                variant="outlineRose"
                className="flex-1 gap-1 rounded-sm! text-xs! border-transparent shadow-1 bg-white" size={'xs'}
                onClick={() => handleDownload("pdf")}
                disabled={isExporting}
              >
                {isExporting ? (
                  <>
                    <Loader2 className="size-3 animate-spin" />
                  </>
                ) : (
                  <>
                    <Download className="size-3" />
                    PDF
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* ── Save ────────────────────────────────────────────── */}
          {user ? (
            <SaveQRButton settings={settings} savedId={savedId} onSaved={(id, name) => {
              setSavedId(id);
              setSavedName(name);
            }} />
          ) : (
            <SaveQRPrompt settings={settings} />
          )}
        </div>



      </div>


    </div>
  );
}
