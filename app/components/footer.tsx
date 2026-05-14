import Link from "next/link";

// Hardcode the current year so the server and client HTML always match,
// eliminating the hydration mismatch that new Date() causes in Server Components.
const YEAR = new Date().getFullYear();
 
 
const Footer = () => {
    return (
        <footer className="border-t p-3 bg-white">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; {YEAR} TechMind. All rights reserved. | Developed by <Link href="https://kshekh.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">kshekh.com</Link>
                    </p>
                </div>
                <nav aria-label="Footer navigation">
                    <ul className="flex flex-wrap gap-4 list-none p-0 m-0 text-sm">
                        <li><Link href="/about-us" title="About us">About us</Link></li>
                        <li><Link href="/contact-us" title="Contact Us">Contact Us</Link></li>
                        <li><Link href="/blogs" title="Blogs">Blogs</Link></li>
                        <li><Link href="/glossary" title="Glossary">Glossary</Link></li>
                        <li><Link href="/authors" title="Authors">Authors</Link></li>
                        <li><Link href="/editorial-policy" title="Editorial Policy">Editorial Policy</Link></li>
                        <li><Link href="/terms-conditions" title="Terms & Conditions">Terms &amp; Conditions</Link></li>
                        <li><Link href="/privacy-policy" title="Privacy Policy">Privacy Policy</Link></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
