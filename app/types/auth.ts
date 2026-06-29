import type { QRSettings } from "@/app/types/qr"

export type Profile = {
  id: string
  name: string | null
  avatar_url: string | null
  email: string | null
  created_at: string
}

export type QRHistoryItem = {
  id: string
  name: string
  settings: QRSettings
  created_at: string
  updated_at: string
}
