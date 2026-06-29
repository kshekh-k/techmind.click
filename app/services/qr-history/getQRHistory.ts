import { createClient } from "@/app/lib/supabase/client"
import type { QRHistoryItem } from "@/app/types/auth"

export async function getQRHistory(): Promise<QRHistoryItem[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("qr_history")
    .select("*")
    .order("updated_at", { ascending: false })

  if (error) throw error
  return (data ?? []) as QRHistoryItem[]
}
