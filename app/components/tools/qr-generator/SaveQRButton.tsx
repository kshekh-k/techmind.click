"use client"

import { useState } from "react"
import { Save, Check, Loader2 } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { saveQR } from "@/app/services/qr-history/saveQR"
import type { QRSettings } from "@/app/types/qr"

type Props = {
  settings: QRSettings
  savedId?: string
  onSaved: (id: string, name: string) => void
}

function deriveName(settings: QRSettings): string {
  switch (settings.inputType) {
    case "url": {
      try {
        const hostname = new URL(settings.url).hostname.replace("www.", "")
        return hostname || "QR Code"
      } catch {
        return settings.url.slice(0, 30) || "QR Code"
      }
    }
    case "text":
      return settings.text.slice(0, 30) || "QR Code"
    case "phone":
      return settings.phone || "QR Code"
    case "wifi":
      return settings.wifi.ssid || "QR Code"
    default:
      return "QR Code"
  }
}

export default function SaveQRButton({ settings, savedId, onSaved }: Props) {
  const [showInput, setShowInput] = useState(false)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSaveClick = async () => {
    if (savedId) {
      // Update directly
      setLoading(true)
      try {
        const result = await saveQR(settings, deriveName(settings), savedId)
        if (result) {
          onSaved(result.id, deriveName(settings))
          setSaved(true)
          setTimeout(() => setSaved(false), 2000)
        }
      } catch (err) {
        console.error("Failed to save QR:", err)
      } finally {
        setLoading(false)
      }
      return
    }
    // Show name input
    setName(deriveName(settings))
    setShowInput(true)
  }

  const handleConfirmSave = async () => {
    setLoading(true)
    try {
      const result = await saveQR(settings, name.trim() || deriveName(settings))
      if (result) {
        onSaved(result.id, name.trim() || deriveName(settings))
        setSaved(true)
        setShowInput(false)
        setTimeout(() => setSaved(false), 2000)
      }
    } catch (err) {
      console.error("Failed to save QR:", err)
    } finally {
      setLoading(false)
    }
  }

  if (saved) {
    return (
      <div className="flex w-full items-center justify-center gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
        <Check className="size-4" />
        Saved!
      </div>
    )
  }

  if (showInput) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name this QR code"
          onKeyDown={(e) => e.key === "Enter" && handleConfirmSave()}
          autoFocus
        />
        <div className="flex gap-2">
          <Button
            className="flex-1 gap-2"
            onClick={handleConfirmSave}
            disabled={loading}
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            Save
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setShowInput(false)}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Button
      variant="outline"
      className="w-full gap-2"
      onClick={handleSaveClick}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Save className="size-4" />
      )}
      {savedId ? "Update Saved QR" : "Save QR Code"}
    </Button>
  )
}
