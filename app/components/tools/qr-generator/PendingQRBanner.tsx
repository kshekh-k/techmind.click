"use client"

import { useState } from "react"
import { Save, X, Loader2, Check } from "lucide-react"
import { saveQR } from "@/app/services/qr-history/saveQR"
import { clearPendingQR } from "@/utils/qr/pendingQR"
import type { QRSettings } from "@/app/types/qr"

type Props = {
  settings: QRSettings
  onSaved: (id: string, name: string) => void
  onDismiss: () => void
}

function deriveName(s: QRSettings): string {
  switch (s.inputType) {
    case "url":
      try { return new URL(s.url).hostname.replace("www.", "") || "QR Code" } catch { return s.url.slice(0, 40) || "QR Code" }
    case "text":  return s.text.slice(0, 40) || "QR Code"
    case "phone": return s.phone || "QR Code"
    case "email": return s.email || "QR Code"
    case "wifi":  return s.wifi.ssid || "QR Code"
    default:      return "QR Code"
  }
}

export default function PendingQRBanner({ settings, onSaved, onDismiss }: Props) {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      const name = deriveName(settings)
      const result = await saveQR(settings, name)
      if (result) {
        clearPendingQR()
        setSaved(true)
        onSaved(result.id, name)
        setTimeout(onDismiss, 1800)
      }
    } catch (err) {
      console.error("Failed to save pending QR:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDismiss = () => {
    clearPendingQR()
    onDismiss()
  }

  if (saved) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm">
        <Check className="size-4 text-green-600 shrink-0" />
        <span className="text-green-700 font-medium">QR code saved to your profile!</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm">
      <Save className="size-4 text-indigo-500 shrink-0" />
      <span className="flex-1 text-indigo-700">
        Your QR code has been restored. Save it to your profile?
      </span>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 text-white h-7 px-3 text-xs font-medium transition-colors hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? <Loader2 className="size-3 animate-spin" /> : <Save className="size-3" />}
          Save
        </button>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="inline-flex items-center justify-center rounded-md border border-indigo-200 bg-white h-7 w-7 text-gray-500 transition-colors hover:bg-gray-50"
        >
          <X className="size-3" />
        </button>
      </div>
    </div>
  )
}
