import Contactus from "@/app/components/contact-us";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the TechMind.click team for support inquiries, feedback, feature requests, or technical assistance.",
  alternates: {
    canonical: "/contact-us",
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8">
        <Contactus />
      </main>
      <Footer />
    </div>
  );
}
