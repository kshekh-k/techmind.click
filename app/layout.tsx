import "./globals.css";
import Script from "next/script";
const siteTitle = "TechMind – Online Text Formatting & Editing Tools";
const siteDescription =
  "TechMind - Free online tools for text formatting, case conversion, and image conversion. Improve your writing and productivity with smart online utilities.";
const siteKeywords = [
  "TechMind",
  "text case converter",
  "text formatter",
  "slug converter",
  "case converter online",
  "uppercase to lowercase",
  "lowercase to uppercase",
  "sentence case converter",
  "title case converter",
  "toggle case tool",
  "online text tools",
  "seo slug generator",
  "url slug converter",
  "content formatting tool",
  "writing productivity tools",
  "tools for writers",
  "tools for students",
  "tools for developers",
  "online text editor",
  "clean text tool",
].join(", ");
const siteUrl = "https://www.techmind.click";
const ogImage = `${siteUrl}/images/text-case-converter-and-formatter-techmind-click-otg.png`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={siteKeywords} />
        <meta name="author" content="TechMind" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={siteUrl} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={ogImage} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={ogImage} />
        <link rel="icon" href="/favicon.ico" />
        {/* Google Analytics – Load Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1LY4EXMSGY"
          strategy="afterInteractive"
        />

        {/* Google Analytics – Config */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1LY4EXMSGY', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  );
}
