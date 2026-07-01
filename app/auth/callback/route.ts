import { NextResponse } from "next/server"
import { createClient } from "@/app/lib/supabase/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Only allow relative paths to prevent open-redirect attacks
  const safePath = next.startsWith("/") ? next : "/"
  return NextResponse.redirect(`${origin}${safePath}`)
}
