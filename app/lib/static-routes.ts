import type { MetadataRoute } from "next";

export type StaticRoute = {
  label: string;
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

/**
 * Single source of truth for all static pages.
 * Add new static pages here — sitemap.xml and sitemap.html pick them up automatically.
 */
export const STATIC_ROUTES: StaticRoute[] = [
  { label: "Home",                                                path: "/",                                                          changeFrequency: "weekly",  priority: 1.0 },
  { label: "Text Format",                                         path: "/text-format",                                               changeFrequency: "weekly",  priority: 0.9 },
  { label: "QR Code Generator",                                    path: "/qr-code-generator",                                         changeFrequency: "monthly", priority: 0.9 },
  { label: "Image to PDF",                                        path: "/image-to-pdf",                                              changeFrequency: "monthly", priority: 0.8 },
  { label: "Image to WebP",                                       path: "/image-to-webp",                                             changeFrequency: "monthly", priority: 0.7 },
  { label: "Blogs",                                               path: "/blogs",                                                     changeFrequency: "weekly",  priority: 0.7 },
  { label: "Glossary",                                            path: "/glossary",                                                  changeFrequency: "weekly",  priority: 0.7 },
  { label: "How to Convert Uppercase to Lowercase Without Excel", path: "/how-to-convert-uppercase-to-lowercase-without-excel",       changeFrequency: "monthly", priority: 0.6 },
  { label: "Change Caps Lock Text to Sentence Case Online Free",  path: "/change-caps-lock-text-to-sentence-case-online-free",        changeFrequency: "monthly", priority: 0.7 },
  { label: "About Us",                                            path: "/about-us",                                                  changeFrequency: "monthly", priority: 0.5 },
  { label: "Contact Us",                                          path: "/contact-us",                                                changeFrequency: "monthly", priority: 0.5 },
  { label: "Authors",                                             path: "/authors",                                                   changeFrequency: "monthly", priority: 0.5 },
  { label: "Sitemap",                                             path: "/sitemap.html",                                              changeFrequency: "weekly",  priority: 0.4 },
];
