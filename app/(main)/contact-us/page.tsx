import Contactus from "@/app/components/contact-us";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Us | TechMind",
  description:
    "Get in touch with TechMind for inquiries, support, or collaborations.",
};
function ContactPage() {
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

export default ContactPage;
