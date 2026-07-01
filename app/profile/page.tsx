import type { Metadata } from "next"
import Layout from "@/app/components/layout"
import ProfileClient from "./ProfileClient"

export const metadata: Metadata = {
  title: "My Profile | TechMind",
  robots: { index: false, follow: false },
}

export default function ProfilePage() {
  return (
    <Layout>
      <ProfileClient />
    </Layout>
  )
}
