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
  type QRSettings,
} from "@/app/types/qr";

type QRControlsProps = {
  settings: QRSettings;
  onSettingsChange: (partial: Partial<QRSettings>) => void;
  onReset: () => void;
};

export default function QRControls({ settings, onSettingsChange, onReset }: QRControlsProps) {
  return (
    <Card className="shadow-sm !border-gray-100">
      <CardHeader className="pb-4">
        <CardTitle as="h2" className="text-lg font-semibold">
          Style Options
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* ── Colors ────────────────────────────────────────────── */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Colors</Label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "fg", label: "Foreground", key: "fgColor" as const },
              { id: "bg", label: "Background", key: "bgColor" as const },
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
