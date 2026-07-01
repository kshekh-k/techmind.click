"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2, ExternalLink, User, Loader2 } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { useAuth } from "@/app/components/auth/AuthProvider"
import { getQRHistory } from "@/app/services/qr-history/getQRHistory"
import { deleteQR } from "@/app/services/qr-history/deleteQR"
import type { QRHistoryItem } from "@/app/types/auth"

function typeBadge(item: QRHistoryItem) {
  const type = item.settings.inputType
  const labels: Record<string, string> = {
    url: "URL",
    text: "Text",
    phone: "Phone",
    wifi: "WiFi",
  }
  const colors: Record<string, string> = {
    url: "bg-blue-50 text-blue-700",
    text: "bg-gray-100 text-gray-700",
    phone: "bg-green-50 text-green-700",
    wifi: "bg-purple-50 text-purple-700",
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colors[type] ?? "bg-gray-100 text-gray-600"}`}>
      {labels[type] ?? type}
    </span>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function ProfileClient() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [history, setHistory] = useState<QRHistoryItem[]>([])
  const [fetching, setFetching] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.push("/")
      return
    }
    getQRHistory()
      .then(setHistory)
      .catch(console.error)
      .finally(() => setFetching(false))
  }, [user, loading, router])

  const handleLoad = (item: QRHistoryItem) => {
    localStorage.setItem(
      "qr-preload",
      JSON.stringify({ settings: item.settings, id: item.id, name: item.name })
    )
    router.push("/qr-code-generator")
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteQR(id)
      setHistory((prev) => prev.filter((h) => h.id !== id))
    } catch (err) {
      console.error("Delete failed:", err)
    } finally {
      setDeletingId(null)
    }
  }

  if (loading || fetching) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-gray-400" />
      </div>
    )
  }

  if (!user) return null

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined
  const name = (user.user_metadata?.full_name ?? user.email ?? "") as string
  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      {/* ── User info ─────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={name}
            className="size-14 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <div className="size-14 rounded-full bg-gray-900 text-white flex items-center justify-center text-lg font-semibold">
            {initials || <User className="size-6" />}
          </div>
        )}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{name}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* ── QR history ────────────────────────────────────────── */}
      <div>
        <h2 className="text-base font-medium text-gray-700 mb-4">Saved QR Codes</h2>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center">
            <p className="text-sm text-gray-500">No saved QR codes yet.</p>
            <p className="text-xs text-gray-400 mt-1">Generate one and save it!</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => router.push("/qr-code-generator")}
            >
              Go to QR Generator
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.map((item) => (
              <Card key={item.id} className="shadow-sm !border-gray-100">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    {typeBadge(item)}
                  </div>
                  <p className="text-xs text-gray-400">{formatDate(item.updated_at)}</p>
                  <div className="flex gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-1.5 text-xs"
                      onClick={() => handleLoad(item)}
                    >
                      <ExternalLink className="size-3.5" />
                      Load in Editor
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 text-xs text-red-500 hover:text-red-600 hover:border-red-200"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                    >
                      {deletingId === item.id ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="size-3.5" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
