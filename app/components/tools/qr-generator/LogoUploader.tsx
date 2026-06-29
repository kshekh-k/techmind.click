"use client";

import { useRef } from "react";
import { ImageIcon, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";

type LogoUploaderProps = {
  logo: string | null;
  logoSize: number;
  onLogoChange: (logo: string | null) => void;
  onLogoSizeChange: (size: number) => void;
};

export default function LogoUploader({
  logo,
  logoSize,
  onLogoChange,
  onLogoSizeChange,
}: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      // Downscale to ≤200 px — keeps the base64 string tiny (~20–40 KB)
      // and prevents the hang caused by multi-MB data URLs in React state
      const MAX = 200;
      const scale = Math.min(1, MAX / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(objectUrl);
      onLogoChange(canvas.toDataURL("image/png", 0.85));
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      // Fallback: raw FileReader (won't be compressed but at least won't silently fail)
      const reader = new FileReader();
      reader.onloadend = () => onLogoChange(reader.result as string);
      reader.readAsDataURL(file);
    };

    img.src = objectUrl;
  }

  return (
    <div className="space-y-3">
      <Label>Center Logo (optional)</Label>

      {logo ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded border overflow-hidden flex-shrink-0 bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt="Logo preview" className="size-full object-contain" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
                Change
              </Button>
              <Button variant="outlineRed" size="sm" onClick={() => onLogoChange(null)}>
                <X className="size-3.5" />
                Remove
              </Button>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <Label className="text-xs text-muted-foreground">Logo size</Label>
              <span className="text-xs text-muted-foreground">{Math.round(logoSize * 100)}%</span>
            </div>
            <input
              type="range"
              min={0.15}
              max={0.6}
              step={0.05}
              value={logoSize}
              onChange={(e) => onLogoSizeChange(Number(e.target.value))}
              className="w-full accent-black h-1.5"
            />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-200 px-4 py-5 text-sm text-muted-foreground hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <ImageIcon className="size-6 text-gray-400" />
          <span>Click to upload logo</span>
          <span className="text-xs">PNG, JPG, SVG</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
