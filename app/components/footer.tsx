import Link from "next/link";
const Footer = () => {
    return (
        <footer className="border-t py-6">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()} TechMind. All rights reserved.
                    </p>
                </div>
                <div className="flex flex-wrap gap-4">

                    <Link href="/about-us">About us</Link>
                    <Link href="/contact-us">Contact Us</Link>
                    <Link href="/terms-conditions">Terms & Conditions</Link>

                    <Link href="/privacy-policy">Privacy Policy</Link>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
