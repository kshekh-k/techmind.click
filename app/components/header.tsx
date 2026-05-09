import Link from "next/link";
import Image from "next/image";
import MobileNav from "@/app/components/mobile-nav";

const LINKS = [
  { href: "/", label: "Case Converter" },
  { href: "/image-to-pdf", label: "Image to PDF" },
  { href: "/blogs", label: "Blogs" },
];

// ─── Header (Server Component wrapper) ───────────────────────────────────────
// The outer shell is a Server Component so it has zero JS cost.
// Only the mobile toggle subtree is hydrated.
const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-14 items-center justify-between">
        <nav
          aria-label="Main navigation"
          className="px-3 md:px-4 flex justify-between flex-1"
        >
          <Link
            href="/"
            title="Techmind.click"
            className="mr-6 flex items-center space-x-2"
            aria-label="TechMind Click home"
          >
            <Image
              src="/techmind-click-logo.svg"
              alt="Techmind.click logo"
              title="Techmind.click"
              width={160}
              height={40}
              className="w-40 h-auto"
              priority
            />
          </Link>

          <MobileNav links={LINKS} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
