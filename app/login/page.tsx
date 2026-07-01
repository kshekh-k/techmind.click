import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import AuthForm from "@/app/components/auth/AuthForm"

export const metadata: Metadata = {
  title: "Login | TechMind",
  robots: { index: false, follow: false },
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams
  const redirectTo = next || "/"

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/techmind-click-logo.svg"
              alt="TechMind"
              width={160}
              height={40}
              className="h-9 w-auto mx-auto"
              priority
            />
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-500">Login to access your saved QR codes</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <AuthForm mode="login" redirectTo={redirectTo} />
        </div>
      </div>
    </div>
  )
}
