"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  {
    href: "/",
    label: "Case Converter",
  },
  {
    href: "/image-to-pdf",
    label: "Image to PDF",
  },
  {
    href: "/blogs",
    label: "Blogs",
  },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-14 items-center justify-between">
        <nav className="px-3 md:px-4 flex justify-between flex-1">
          <Link
            href="/"
            title="Techmind.click"
            className="mr-6 flex items-center space-x-2"
          >
            <Image
              src="/techmind-click-logo.svg"
              alt="Techmind.click logo"
              title="Techmind.click"
              width={40}
              height={40}
              className="w-40 h-auto"
            />
          </Link>
          {/* Mobile toggle button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="sm:hidden inline-flex items-center justify-center rounded-md border p-2"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <ul
            className={`
          sm:flex sm:gap-4 sm:static
          absolute right-0 w-56 sm:w-auto
          ${open ? "block bg-white rounded-b-sm shadow-md top-full" : "hidden"}  
        `}
          >
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-2 hover:bg-accent hover:text-accent-foreground transition"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="/login" title="Login">
              Login
            </Link>
          </Button>
          <Button asChild>
            <Link href="/signup" title="Sign Up">
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
