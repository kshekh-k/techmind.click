import { Metadata } from "next";
import Contactus from '../components/contact-us';
import Header from '../components/header';
import Footer from '../components/footer';
export const metadata: Metadata = {
    title: "Contact Us | TechMind",
    description: "Get in touch with TechMind for inquiries, support, or collaborations.",
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
    )
}

export default ContactPage
