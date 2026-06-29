"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Textarea } from "@/app/components/ui/textarea";
import { cn } from "@/lib/utils";
import LogoUploader from "./LogoUploader";
import {
  DOT_TYPE_OPTIONS,
  CORNER_TYPE_OPTIONS,
  SIZE_OPTIONS,
  type QRSettings,
  type QRInputType,
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
          QR Settings
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ── Content Type ──────────────────────────────────────── */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Content Type</Label>
          <Tabs
            value={settings.inputType}
            onValueChange={(v) => onSettingsChange({ inputType: v as QRInputType })}
          >
            <TabsList className="w-full grid grid-cols-5">
              {(["url", "text", "email", "phone", "wifi"] as const).map((t) => (
                <TabsTrigger key={t} value={t} className="text-xs capitalize">
                  {t === "url" ? "URL" : t.charAt(0).toUpperCase() + t.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="url" className="mt-3">
              <Input
                placeholder="https://example.com"
                value={settings.url}
                onChange={(e) => onSettingsChange({ url: e.target.value })}
                type="url"
              />
            </TabsContent>

            <TabsContent value="text" className="mt-3">
              <Textarea
                placeholder="Enter your text…"
                value={settings.text}
                onChange={(e) => onSettingsChange({ text: e.target.value })}
                className="min-h-[90px] resize-none"
              />
            </TabsContent>

            <TabsContent value="email" className="mt-3">
              <Input
                placeholder="hello@example.com"
                value={settings.email}
                onChange={(e) => onSettingsChange({ email: e.target.value })}
                type="email"
              />
            </TabsContent>

            <TabsContent value="phone" className="mt-3">
              <Input
                placeholder="+1 555 000 0000"
                value={settings.phone}
                onChange={(e) => onSettingsChange({ phone: e.target.value })}
                type="tel"
              />
            </TabsContent>

            <TabsContent value="wifi" className="mt-3 space-y-3">
              <Input
                placeholder="Network name (SSID)"
                value={settings.wifi.ssid}
                onChange={(e) =>
                  onSettingsChange({ wifi: { ...settings.wifi, ssid: e.target.value } })
                }
              />
              <Input
                placeholder="Password"
                value={settings.wifi.password}
                onChange={(e) =>
                  onSettingsChange({ wifi: { ...settings.wifi, password: e.target.value } })
                }
                type="password"
              />
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground mb-1 block">Encryption</Label>
                  <select
                    value={settings.wifi.encryption}
                    onChange={(e) =>
                      onSettingsChange({
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
                      onSettingsChange({ wifi: { ...settings.wifi, hidden: e.target.checked } })
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
        </div>

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
        <Button
          variant="outlineRed"
          className="w-full gap-2"
          onClick={onReset}
        >
          <RotateCcw className="size-3.5" />
          Reset to Defaults
        </Button>
      </CardContent>
    </Card>
  );
}
