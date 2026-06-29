"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { createClient } from "@/app/lib/supabase/client"

type Props = {
  onClose: () => void
  mode?: "login" | "signup"
}

export default function LoginModal({ onClose, mode: initialMode = "login" }: Props) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const supabase = createClient()

  const handleGoogle = async () => {
    setError(null)
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback",
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        onClose()
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setDone(true)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {mode === "login" ? "Sign in to your account" : "Sign up for free"}
        </p>

        {done ? (
          <div className="text-center text-sm text-gray-600 py-4">
            Check your email for a confirmation link.
          </div>
        ) : (
          <>
            <Button
              variant="outline"
              className="w-full gap-2 mb-4"
              onClick={handleGoogle}
              type="button"
            >
              <FcGoogle className="size-5" />
              Continue with Google
            </Button>

            <div className="relative my-4 flex items-center">
              <div className="flex-1 border-t border-gray-200" />
              <span className="mx-3 text-xs text-gray-400">or</span>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="auth-email" className="text-sm">Email</Label>
                <Input
                  id="auth-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="auth-password" className="text-sm">Password</Label>
                <Input
                  id="auth-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  minLength={6}
                />
              </div>

              {error && (
                <p className="text-xs text-red-500">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
              </Button>
            </form>

            <p className="mt-4 text-center text-xs text-gray-500">
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="font-medium text-gray-900 hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="font-medium text-gray-900 hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
