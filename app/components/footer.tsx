import Link from "next/link";

// Hardcode the current year so the server and client HTML always match,
// eliminating the hydration mismatch that new Date() causes in Server Components.
const YEAR = new Date().getFullYear();
 
 
const Footer = () => {
    return (
        <footer className="border-t p-3 bg-white">
            <div className="container mx-auto flex flex-col gap-3">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row border-b border-gray-200 pb-3 mb-2">
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
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <a href="https://www.producthunt.com/products/techmind-click?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-techmind-click-2" target="_blank" rel="noopener noreferrer">
                        <img alt="TechMind.click - Free Text Conversion, Slug Generator | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1147785&theme=neutral&t=1779271745322" />
                    </a>
                    <a href="https://fazier.com/launches/www.techmind.click" target="_blank" rel="noopener noreferrer">
                        <img src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=neutral" width="250" alt="Fazier badge" />
                    </a>
                </div>
            </div>
         
        </footer>
    );
};

export default Footer;
