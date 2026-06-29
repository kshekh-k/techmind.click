"use client"

import Link from "next/link"
import { Save } from "lucide-react"
import { useAuth } from "@/app/components/auth/AuthProvider"

export default function SaveQRPrompt() {
  const { user } = useAuth()

  if (user) return null

  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm">
      <Save className="size-4 text-gray-400 shrink-0" />
      <span className="flex-1 text-gray-600">Want to save this QR code?</span>
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background h-7 px-2.5 text-xs font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center justify-center rounded-md bg-gray-900 text-white h-7 px-2.5 text-xs font-medium transition-colors hover:bg-gray-800"
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}
