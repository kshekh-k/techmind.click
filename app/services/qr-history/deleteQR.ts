import { createClient } from "@/app/lib/supabase/client"

export async function deleteQR(id: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase
    .from("qr_history")
    .delete()
    .eq("id", id)

  if (error) throw error
}
