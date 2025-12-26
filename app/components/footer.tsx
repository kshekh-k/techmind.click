import Link from "next/link";
const Footer = () => {
    return (
        <footer className="border-t p-3 bg-white">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()} TechMind. All rights reserved.
                    </p>
                </div>
                <div className="flex flex-wrap gap-4">

                    <Link href="/about-us"  title="About us">About us</Link>
                    <Link href="/contact-us"  title="Contact Us">Contact Us</Link>
                    <Link href="/blogs"  title="Contact Us">Blogs</Link>
                    <Link href="/terms-conditions"  title="Terms & Conditions">Terms & Conditions</Link>
                    <Link href="/privacy-policy"  title="Privacy Policy">Privacy Policy</Link>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
