"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { cn } from "@/lib/utils";
import LogoUploader from "./LogoUploader";
import {
  DOT_TYPE_OPTIONS,
  CORNER_TYPE_OPTIONS,
  SIZE_OPTIONS,
  SOCIAL_PRESETS,
  DEFAULT_QR_SETTINGS,
  type QRSettings,
} from "@/app/types/qr";

type QRControlsProps = {
  settings: QRSettings;
  onSettingsChange: (partial: Partial<QRSettings>) => void;
  onReset: () => void;
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
      if (!ctx) { URL.revokeObjectURL(objectUrl); return reject(new Error("no ctx")); }
      ctx.drawImage(img, 0, 0, 128, 128);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error("img load failed")); };
    img.src = objectUrl;
  });
}

export default function QRControls({ settings, onSettingsChange, onReset }: QRControlsProps) {
  return (
    <Card className="shadow-sm !border-gray-100">
      <CardHeader  >
        <CardTitle as="h2" className="text-lg font-semibold">
          Style Options
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* ── Social Media Presets ───────────────────────────────── */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Social Media Presets</Label>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() =>
                onSettingsChange({
                  fgColor: DEFAULT_QR_SETTINGS.fgColor,
                  bgColor: DEFAULT_QR_SETTINGS.bgColor,
                  cornerSquareColor: DEFAULT_QR_SETTINGS.cornerSquareColor,
                  cornerDotColor: DEFAULT_QR_SETTINGS.cornerDotColor,
                  dotType: DEFAULT_QR_SETTINGS.dotType,
                  cornerType: DEFAULT_QR_SETTINGS.cornerType,
                  logo: null,
                })
              }
              className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-500 transition-colors hover:border-gray-500 hover:text-gray-700 hover:shadow-xs"
            >
              ↺ Default
            </button>
            {SOCIAL_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                title={preset.name}
                onClick={async () => {
                  onSettingsChange({
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
                    onSettingsChange({ logo: dataUrl });
                  } catch {
                    onSettingsChange({ logo: preset.logoUrl });
                  }
                }}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium transition-colors hover:border-gray-400 hover:shadow-xs"
              >
                <span
                  className="inline-block size-3 rounded-full shrink-0"
                  style={{ backgroundColor: preset.brandColor }}
                />
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* ── Colors ────────────────────────────────────────────── */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Colors</Label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "fg",    label: "Foreground",    key: "fgColor" as const },
              { id: "bg",    label: "Background",    key: "bgColor" as const },
              { id: "csq",   label: "Corner Frame",  key: "cornerSquareColor" as const },
              { id: "cdot",  label: "Corner Dots",   key: "cornerDotColor" as const },
            ].map(({ id, label, key }) => (
              <div key={id}>
                <Label className="text-xs text-muted-foreground mb-1.5 block">{label}</Label>
                <div className="flex items-center gap-2 h-9">
                  <div className="relative flex-shrink-0">
                    <input
                      type="color"
                      id={`${id}-color-picker`}
                      value={settings[key]}
                      onChange={(e) => onSettingsChange({ [key]: e.target.value })}
                      className="sr-only"
                    />
                    <label
                      htmlFor={`${id}-color-picker`}
                      className="block size-8 rounded border border-gray-200 cursor-pointer shadow-xs hover:border-gray-400 transition-colors"
                      style={{ backgroundColor: settings[key] }}
                    />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    {settings[key]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Size ──────────────────────────────────────────────── */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Size</Label>
          <div className="grid grid-cols-4 gap-1.5">
            {SIZE_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => onSettingsChange({ size: value })}
                className={cn(
                  "rounded-md border py-1.5 text-xs font-medium transition-colors",
                  settings.size === value
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400",
                )}
              >
                {label}
                <span className="block text-[10px] opacity-70">{value}px</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Margin ────────────────────────────────────────────── */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-sm font-medium">Margin</Label>
            <span className="text-xs text-muted-foreground">{settings.margin}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={40}
            step={5}
            value={settings.margin}
            onChange={(e) => onSettingsChange({ margin: Number(e.target.value) })}
            className="w-full accent-black h-1.5"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>None</span>
            <span>Large</span>
          </div>
        </div>

        {/* ── Dot Style ─────────────────────────────────────────── */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Dot Style</Label>
          <div className="grid grid-cols-3 gap-1.5">
            {DOT_TYPE_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => onSettingsChange({ dotType: value })}
                className={cn(
                  "rounded-md border px-2 py-1.5 text-xs font-medium transition-colors",
                  settings.dotType === value
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Corner Style ──────────────────────────────────────── */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Corner Style</Label>
          <div className="grid grid-cols-3 gap-1.5">
            {CORNER_TYPE_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => onSettingsChange({ cornerType: value })}
                className={cn(
                  "rounded-md border px-2 py-1.5 text-xs font-medium transition-colors",
                  settings.cornerType === value
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Label Style ───────────────────────────────────────── */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Label Style</Label>

          {/* Color */}
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">Color</Label>
            <div className="flex items-center gap-2 h-9">
              <div className="relative flex-shrink-0">
                <input
                  type="color"
                  id="label-color-picker"
                  value={settings.labelColor}
                  onChange={(e) => onSettingsChange({ labelColor: e.target.value })}
                  className="sr-only"
                />
                <label
                  htmlFor="label-color-picker"
                  className="block size-8 rounded border border-gray-200 cursor-pointer shadow-xs hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: settings.labelColor }}
                />
              </div>
              <span className="text-xs font-mono text-muted-foreground uppercase">
                {settings.labelColor}
              </span>
            </div>
          </div>

          {/* Font size */}
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">Font Size</Label>
            <div className="grid grid-cols-4 gap-1.5">
              {([{ label: "SM", value: 12 }, { label: "MD", value: 14 }, { label: "LG", value: 18 }, { label: "XL", value: 22 }] as const).map(({ label: lbl, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onSettingsChange({ labelFontSize: value })}
                  className={cn(
                    "rounded-md border py-1.5 text-xs font-medium transition-colors",
                    settings.labelFontSize === value
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400",
                  )}
                >
                  {lbl}
                  <span className="block text-[10px] opacity-70">{value}px</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bold / Italic */}
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">Style</Label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => onSettingsChange({ labelBold: !settings.labelBold })}
                className={cn(
                  "rounded-md border py-1.5 text-sm font-bold transition-colors",
                  settings.labelBold
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400",
                )}
              >
                B
              </button>
              <button
                type="button"
                onClick={() => onSettingsChange({ labelItalic: !settings.labelItalic })}
                className={cn(
                  "rounded-md border py-1.5 text-sm italic transition-colors",
                  settings.labelItalic
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400",
                )}
              >
                I
              </button>
            </div>
          </div>
        </div>

        {/* ── Logo ──────────────────────────────────────────────── */}
        <LogoUploader
          logo={settings.logo}
          logoSize={settings.logoSize}
          onLogoChange={(logo) => onSettingsChange({ logo })}
          onLogoSizeChange={(logoSize) => onSettingsChange({ logoSize })}
        />

        {/* ── Reset ─────────────────────────────────────────────── */}
        <Button variant="outlineRed" className="w-full gap-2" onClick={onReset}>
          <RotateCcw className="size-3.5" />
          Reset to Defaults
        </Button>
      </CardContent>
    </Card>
  );
}
