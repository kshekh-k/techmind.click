"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { LogOut, User } from "lucide-react"
import { useAuth } from "@/app/components/auth/AuthProvider"
import { cn } from "@/lib/utils"

export default function AuthButton() {
  const { user, loading, signOut } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  if (loading) return null

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center justify-center rounded-md border border-input bg-background h-8 px-3 text-xs font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        Login
      </Link>
    )
  }

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined
  const name = (user.user_metadata?.full_name ?? user.email ?? "") as string
  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown((v) => !v)}
        className="flex items-center gap-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="User menu"
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={name}
            className="size-8 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <div className={cn(
            "size-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold"
          )}>
            {initials || <User className="size-4" />}
          </div>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-10 z-50 w-44 rounded-xl border border-gray-100 bg-white shadow-lg py-1">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-xs font-medium text-gray-900 truncate">{name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <Link
            href="/profile"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setShowDropdown(false)}
          >
            <User className="size-4" />
            My QR Codes
          </Link>
          <button
            onClick={() => { signOut(); setShowDropdown(false) }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
