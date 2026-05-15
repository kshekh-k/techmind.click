"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
};

type MobileNavProps = {
  links: NavLink[];
  moreLinks: NavLink[];
};

export default function MobileNav({ links, moreLinks }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreMenuRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function closeOnOutsideInteraction(event: MouseEvent | PointerEvent) {
      const target = event.target as Node;
      if (moreMenuRef.current && !moreMenuRef.current.contains(target)) {
        setMoreOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideInteraction, true);
    document.addEventListener("click", closeOnOutsideInteraction, true);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideInteraction, true);
      document.removeEventListener("click", closeOnOutsideInteraction, true);
    };
  }, []);

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
          max-h-[calc(100vh-3.5rem)] overflow-y-auto sm:max-h-none sm:overflow-visible
          ${open ? "block bg-white rounded-b-sm shadow-md top-full" : "hidden"}
        `}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block px-4 py-2 hover:bg-accent hover:text-accent-foreground transition"
              onClick={() => {
                setOpen(false);
                setMoreOpen(false);
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}

        <li ref={moreMenuRef} className="relative z-20 sm:ml-1">
          {moreOpen ? (
            <button
              type="button"
              aria-label="Close more menu"
              className="fixed inset-0 z-10"
              onClick={() => setMoreOpen(false)}
            />
          ) : null}

          <button
            type="button"
            className="relative z-20 flex w-full items-center justify-between px-4 py-2 text-left transition hover:bg-accent hover:text-accent-foreground"
            aria-haspopup="menu"
            aria-expanded={moreOpen}
            aria-controls="more-nav-links"
            onClick={() => setMoreOpen((prev) => !prev)}
          >
            <span>More</span>
            <span aria-hidden="true" className={`text-xs transition ${moreOpen ? "rotate-180" : "rotate-0"}`}>
                  <ChevronDown size={16} />

            </span>
          </button>

          <ul
            id="more-nav-links"
            role="menu"
            className={`
              ${moreOpen ? "block" : "hidden"}
              relative z-20 sm:absolute sm:right-0 sm:top-full sm:mt-1 sm:w-64
              sm:rounded-md sm:border sm:bg-white sm:shadow-md
              sm:max-h-80 sm:overflow-y-auto
            `}
          >
            {moreLinks.map((link) => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  role="menuitem"
                  className="block px-4 py-2 hover:bg-accent hover:text-accent-foreground transition"
                  onClick={() => {
                    setOpen(false);
                    setMoreOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}
