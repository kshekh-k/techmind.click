import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import glossary from "@/app/data/glossary.json";
import redirects from "@/app/data/redirects.json";
import { generateMetadata as generateGlossaryMetadata } from "@/app/glossary/[slug]/page";

async function runSitemapValidation() {
  console.log("🔍 Validating Technical SEO: Sitemap, Robots, and Noindex consistency...\n");

  let hasErrors = false;

  // 1. Generate Sitemap Entries
  let entries: ReturnType<typeof sitemap>;
  try {
    entries = sitemap();
    console.log(`✅ Sitemap successfully generated with ${entries.length} URLs.`);
  } catch (error: any) {
    console.error("❌ Failed to execute sitemap() function:", error.message);
    process.exit(1);
  }

  const urls = entries.map((e) => e.url);
  const urlSet = new Set<string>();

  // 2. Check for duplicate URLs and format
  for (const url of urls) {
    if (!url.startsWith("https://www.techmind.click/")) {
      console.error(`❌ Invalid URL origin detected in sitemap: "${url}"`);
      hasErrors = true;
    }
    if (urlSet.has(url)) {
      console.error(`❌ Duplicate URL found in sitemap: "${url}"`);
      hasErrors = true;
    }
    urlSet.add(url);
  }

  // 3. Ensure Glossary Hub is present
  const glossaryHubUrl = "https://www.techmind.click/glossary";
  if (!urlSet.has(glossaryHubUrl)) {
    console.error(`❌ Expected indexable glossary hub "${glossaryHubUrl}" to be in sitemap, but it was missing.`);
    hasErrors = true;
  } else {
    console.log(`✅ Indexable glossary hub (${glossaryHubUrl}) is present in sitemap.`);
  }

  // 4. Ensure NO noindex glossary term pages (/glossary/[slug]) are in the sitemap
  const disallowedGlossaryUrls = urls.filter((url) => {
    const path = url.replace("https://www.techmind.click", "");
    return path.startsWith("/glossary/") && path !== "/glossary";
  });

  if (disallowedGlossaryUrls.length > 0) {
    console.error(
      `❌ Sitemap Inconsistency Error: Found ${disallowedGlossaryUrls.length} noindex glossary term URLs in sitemap:\n` +
        disallowedGlossaryUrls.slice(0, 5).map((u) => `   - ${u}`).join("\n") +
        (disallowedGlossaryUrls.length > 5 ? `\n   ...and ${disallowedGlossaryUrls.length - 5} more.` : "")
    );
    hasErrors = true;
  } else {
    console.log("✅ Zero noindex glossary term pages (/glossary/[slug]) found in sitemap.");
  }

  // 5. Cross-check against all slugs in glossary.json
  const glossarySlugs = (glossary as { slug: string }[]).map((g) => g.slug.trim().toLowerCase());
  let leakedGlossarySlugs = 0;
  for (const slug of glossarySlugs) {
    const fullUrl = `https://www.techmind.click/glossary/${slug}`;
    if (urlSet.has(fullUrl)) {
      console.error(`❌ Leaked glossary term in sitemap: "${fullUrl}"`);
      leakedGlossarySlugs++;
      hasErrors = true;
    }
  }
  if (leakedGlossarySlugs === 0) {
    console.log(`✅ Verified all ${glossarySlugs.length} glossary terms from data source are excluded from sitemap.`);
  }

  // 6. Ensure other disallowed routes (/login, /signup, /profile) are not in sitemap
  for (const forbidden of ["/login", "/signup", "/profile"]) {
    const forbiddenUrl = `https://www.techmind.click${forbidden}`;
    if (urlSet.has(forbiddenUrl)) {
      console.error(`❌ Forbidden auth route found in sitemap: "${forbiddenUrl}"`);
      hasErrors = true;
    }
  }

  // 6b. Ensure NO redirected routes (from redirects.json) are present in sitemap
  let redirectedInSitemapCount = 0;
  for (const entry of (redirects as { source: string }[])) {
    const fullRedirectedUrl = `https://www.techmind.click${entry.source}`;
    if (urlSet.has(fullRedirectedUrl)) {
      console.error(`❌ Sitemap Error: Redirected URL found in sitemap: "${fullRedirectedUrl}"`);
      redirectedInSitemapCount++;
      hasErrors = true;
    }
  }
  if (redirectedInSitemapCount === 0) {
    console.log(`✅ Verified zero redirected URLs from redirects.json are present in sitemap.`);
  }

  // 7. Ensure vital indexable routes remain present
  const requiredRoutes = [
    "https://www.techmind.click/",
    "https://www.techmind.click/text-format",
    "https://www.techmind.click/qr-code-generator",
    "https://www.techmind.click/image-to-pdf",
    "https://www.techmind.click/blogs",
    "https://www.techmind.click/about-us",
    "https://www.techmind.click/privacy-policy",
    "https://www.techmind.click/terms-conditions",
    "https://www.techmind.click/sitemap.html",
  ];

  for (const reqRoute of requiredRoutes) {
    if (!urlSet.has(reqRoute)) {
      console.error(`❌ Missing essential public route in sitemap: "${reqRoute}"`);
      hasErrors = true;
    }
  }
  console.log(`✅ Verified essential public landing, tool, blog, and legal pages remain in sitemap.`);

  // 8. Verify Glossary Route Metadata (noindex, follow & canonical)
  const sampleSlugs = ["ascii", "typescript", "token", "xml-sitemap", "qr-code"];
  for (const slug of sampleSlugs) {
    try {
      const meta = await generateGlossaryMetadata({ params: Promise.resolve({ slug }) });
      const robotsMeta = meta.robots as { index?: boolean; follow?: boolean } | undefined;
      const canonical = meta.alternates?.canonical;

      if (!robotsMeta || robotsMeta.index !== false || robotsMeta.follow !== true) {
        console.error(
          `❌ Invalid robots metadata for glossary slug "${slug}": expected { index: false, follow: true }, got:`,
          robotsMeta
        );
        hasErrors = true;
      }

      if (canonical !== `/glossary/${slug}`) {
        console.error(
          `❌ Invalid canonical for glossary slug "${slug}": expected "/glossary/${slug}", got: "${canonical}"`
        );
        hasErrors = true;
      }
    } catch (err: any) {
      console.error(`❌ Failed to generate metadata for glossary slug "${slug}":`, err.message);
      hasErrors = true;
    }
  }
  console.log(`✅ Verified sample glossary term pages return { index: false, follow: true } and proper canonical.`);

  // 9. Verify Robots.txt directives (must NOT block /glossary crawlers)
  try {
    const robotsData = robots();
    const disallowList = (Array.isArray(robotsData.rules) ? robotsData.rules[0]?.disallow : robotsData.rules?.disallow) || [];
    const blocksGlossary = Array.isArray(disallowList)
      ? disallowList.some((p: string) => p.includes("glossary"))
      : String(disallowList).includes("glossary");

    if (blocksGlossary) {
      console.error("❌ Robots.txt blocks glossary crawling! Search engines need to crawl pages to detect noindex.");
      hasErrors = true;
    } else {
      console.log("✅ Verified robots.txt permits crawling of glossary pages (required for discovering noindex).");
    }
  } catch (err: any) {
    console.error("❌ Failed to inspect robots():", err.message);
    hasErrors = true;
  }

  if (hasErrors) {
    console.log("\n❌ Sitemap & Noindex validation failed!");
    process.exit(1);
  } else {
    console.log("\n🎉 All Sitemap & Noindex validations passed successfully!");
  }
}

runSitemapValidation();
