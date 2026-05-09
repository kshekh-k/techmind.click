"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
};

type MobileNavProps = {
  links: NavLink[];
};

export default function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="main-nav-links"
        className="sm:hidden inline-flex items-center justify-center rounded-md border p-2"
      >
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      <ul
        id="main-nav-links"
        role="list"
        className={`
          sm:flex sm:gap-4 sm:static
          absolute right-0 w-56 sm:w-auto
          ${open ? "block bg-white rounded-b-sm shadow-md top-full" : "hidden"}
        `}
      >
        {links.map((link) => (
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
    </>
  );
}
