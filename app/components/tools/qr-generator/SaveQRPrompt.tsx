"use client"

import { useRouter } from "next/navigation"
import { Save } from "lucide-react"
import { useAuth } from "@/app/components/auth/AuthProvider"
import { savePendingQR } from "@/utils/qr/pendingQR"
import type { QRSettings } from "@/app/types/qr"
import { Button } from "../../ui/button"

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
    <div className="flex flex-col gap-3 rounded-lg border border-gray-100 bg-gray-50  text-sm">
      <p className="text-sm text-gray-600 flex items-center gap-1">
        <Save className="size-3.5 text-gray-400 shrink-0" />
        <span className="text-gray-600 text-xs">Save this QR code?</span>
      </p>
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="cyan"
          size="xs"
          className="gap-1 flex-1 px-3 rounded-sm! text-xs"
          onClick={() => handleRedirect("login")}
        >
          Login
        </Button>
        <Button
          variant="blue"
          size="xs"
          className="gap-1 flex-1 px-3 rounded-sm! text-xs"
          onClick={() => handleRedirect("signup")}
        >
          Sign up
        </Button>
      </div>
    </div>
  )
}
