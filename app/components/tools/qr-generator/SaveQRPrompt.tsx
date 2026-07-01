"use client"

import { useRouter } from "next/navigation"
import { Save } from "lucide-react"
import { useAuth } from "@/app/components/auth/AuthProvider"
import { savePendingQR } from "@/utils/qr/pendingQR"
import type { QRSettings } from "@/app/types/qr"

type Props = {
  settings: QRSettings
}

export default function SaveQRPrompt({ settings }: Props) {
  const { user } = useAuth()
  const router = useRouter()

  if (user) return null

  const handleRedirect = (dest: "login" | "signup") => {
    savePendingQR(settings)
    const returnTo = encodeURIComponent(window.location.pathname)
    router.push(`/${dest}?next=${returnTo}`)
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm">
      <Save className="size-4 text-gray-400 shrink-0" />
      <span className="flex-1 text-gray-600">Want to save this QR code?</span>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => handleRedirect("login")}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background h-7 px-2.5 text-xs font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Login
        </button>
        <button
          onClick={() => handleRedirect("signup")}
          className="inline-flex items-center justify-center rounded-md bg-gray-900 text-white h-7 px-2.5 text-xs font-medium transition-colors hover:bg-gray-800"
        >
          Sign up
        </button>
      </div>
    </div>
  )
}
