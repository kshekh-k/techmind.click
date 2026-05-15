import Link from "next/link";
import Image from "next/image";
import MobileNav from "@/app/components/mobile-nav";

const LINKS = [
  { href: "/", label: "Case Converter" },
  { href: "/image-to-pdf", label: "Image to PDF" },
  { href: "/blogs", label: "Blogs" },
];

const MORE_LINKS = [
  {
    href: "/change-caps-lock-text-to-sentence-case-online-free",
    label: "Caps Lock to Sentence",
  },
  {
    href: "/how-to-convert-uppercase-to-lowercase-without-excel",
    label: "Uppercase to Lowercase",
  },
  {
    href: "/convert-image-to-pdf-for-government-form",
    label: "Image to PDF for Govt Form",
  },
  {
    href: "/does-techmind-store-uploaded-files",
    label: "Does TechMind Store Files?",
  },
  {
    href: "/fix-whatsapp-text-formatting-online",
    label: "Fix WhatsApp Formatting",
  },
  {
    href: "/convert-jpg-to-pdf-on-mobile-without-app",
    label: "JPG to PDF on Mobile",
  },
  {
    href: "/merge-pdf-files-for-job-application",
    label: "Merge PDF for Job Application",
  },
  {
    href: "/is-online-text-converter-safe",
    label: "Is Text Converter Safe?",
  },
  {
    href: "/how-techmind-protects-user-privacy",
    label: "How TechMind Protects Privacy",
  },
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

          <MobileNav links={LINKS} moreLinks={MORE_LINKS} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
