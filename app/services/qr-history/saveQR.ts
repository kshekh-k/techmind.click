import { createClient } from "@/app/lib/supabase/client"
import type { QRSettings } from "@/app/types/qr"

export async function saveQR(
  settings: QRSettings,
  name: string,
  id?: string
): Promise<{ id: string } | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  if (id) {
    const { data, error } = await supabase
      .from("qr_history")
      .update({ settings, name, updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", user.id)
      .select("id")
      .single()

    if (error) throw error
    return data
  }

  const { data, error } = await supabase
    .from("qr_history")
    .insert({ user_id: user.id, settings, name })
    .select("id")
    .single()

  if (error) throw error
  return data
}
