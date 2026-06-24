import type { MetadataRoute } from "next";

const SITE_URL = "https://www.techmind.click";

export const revalidate = 3600;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/sitemap.html`, `${SITE_URL}/feed.xml`],
  };
}
