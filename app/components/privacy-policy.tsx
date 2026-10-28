import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";

export default function Privacypolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto shadow-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold tracking-tight">Privacy Policy</CardTitle>
          <p className="text-sm text-muted-foreground">Last updated: May 15, 2026</p>
        </CardHeader>

        <CardContent className="space-y-6 text-gray-700 leading-relaxed">
          <section className="space-y-3">
            <p>
              At <strong>TechMind.click</strong> (&quot;TechMind&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we take your personal privacy seriously. This Privacy Policy outlines how your information is handled when you visit and use our website (accessible from{" "}
              <a href="https://www.techmind.click" className="text-primary hover:underline font-medium">
                https://www.techmind.click
              </a>
              ) and our suite of free online utilities, including our text case converters, URL slug generators, QR code generators, and PDF tools.
            </p>
            <p>
              By accessing or using TechMind.click, you agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </section>

          <Separator />

          {/* Core Privacy Proposition */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">1. Data Processing Architecture &amp; File Handling</h2>
            <p>
              We prioritize data minimization and transparent handling across all TechMind utilities:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Text Formatter &amp; Case Converter:</strong> Core text transformations (including uppercase, lowercase, sentence case, title case, slug generation, line break cleaning, space removal, word counting, and Unicode styling) execute locally within your web browser using client-side JavaScript. Text entered for these operations is processed in local memory and is not transmitted to our servers.
              </li>
              <li>
                <strong>Spell Check Processing:</strong> If you choose to use the optional spell check feature, your text is sent over an encrypted HTTPS connection to our server endpoint (<code>/api/spellcheck</code>), which queries LanguageTool (<code>api.languagetool.org</code>) to return grammar and spelling suggestions. We do not store or retain this text in any persistent database, but we recommend avoiding pasting sensitive personal or proprietary information into the spell checker.
              </li>
              <li>
                <strong>Image &amp; PDF Utilities:</strong>
                <ul className="list-circle pl-6 mt-1 space-y-1 text-sm">
                  <li>
                    <em>Image to WebP Converter:</em> Runs entirely inside your browser using client-side web workers (<code>browser-image-compression</code>). Your image files remain on your local device.
                  </li>
                  <li>
                    <em>Image to PDF Converter:</em> When you convert images to a PDF, your selected files are uploaded over HTTPS to our Next.js server endpoint (<code>/api/image-to-pdf</code>). Our server assembles the PDF document in transient memory using the <code>pdf-lib</code> library and streams the resulting file back to your browser. Your images are not saved to disk or stored in a persistent database. Server logs may record standard diagnostic error details or unsupported file names if a conversion fails.
                  </li>
                </ul>
              </li>
              <li>
                <strong>QR Code Generator &amp; Account Storage:</strong> Standard QR code creation occurs dynamically in-memory on your device using client-side JavaScript (<code>qr-code-styling</code>). What you type into the QR inputs (such as URLs, text, phone numbers, or Wi-Fi credentials) is rendered locally and is not transmitted to or stored on our servers when generating or downloading codes. If you register an account and explicitly choose to save a QR design, your configuration payload (including label, styling settings, and encoded content) is stored in our managed cloud database powered by Supabase (PostgreSQL), strictly associated with your authenticated user ID and protected by Row Level Security (RLS) policies so that only you can access, update, or delete your saved history.
              </li>
            </ul>
          </section>

          <Separator />

          {/* Information We Collect */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">2. Information We Collect</h2>
            <p>
              We do not require users to create an account or provide personal details to use our core utilities. However, certain standard technical data may be gathered automatically when navigating our site:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Log and Usage Data:</strong> Like most online services, our web servers and analytics systems automatically record standard technical log data when you access TechMind.click. This may include your IP address, browser type and version, operating system, referring URLs, pages visited, time spent on pages, and diagnostic timestamps.
              </li>
              <li>
                <strong>Contact Inquiries:</strong> If you voluntarily reach out to us via our contact form or email, we receive your name, email address, and message content solely to respond to your support request or inquiry.
              </li>
            </ul>
          </section>

          <Separator />

          {/* Cookies and Tracking */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">3. Cookies and Tracking Technologies</h2>
            <p>
              Cookies are small files stored on your computer or mobile device. TechMind.click uses cookies and similar technologies for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Essential &amp; Preference Cookies:</strong> To remember your UI preferences (such as dark/light theme or editor settings) and ensure reliable site navigation.
              </li>
              <li>
                <strong>Performance &amp; Analytics Cookies:</strong> We utilize Google Analytics (measurement ID: G-1LY4EXMSGY) and Vercel Analytics to understand anonymous aggregate visitor traffic, bounce rates, and popular tools so we can optimize site speed and reliability.
              </li>
              <li>
                <strong>Advertising Cookies:</strong> Used by third-party advertising partners, including Google AdSense, to deliver relevant ads as described in Section 4 below.
              </li>
            </ul>
            <p>
              You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However, some interactive features may not function properly without cookies enabled.
            </p>
          </section>

          <Separator />

          {/* Google AdSense Disclosures */}
          <section className="space-y-3 bg-slate-50 p-5 rounded-lg border border-slate-200">
            <h2 className="text-xl font-bold text-gray-900">4. Third-Party Advertising &amp; Google AdSense Compliance</h2>
            <p>
              We use third-party advertising companies, specifically <strong>Google AdSense</strong>, to serve advertisements when you visit TechMind.click.
            </p>
            <p className="font-semibold text-gray-800">Please review Google&apos;s advertising disclosures:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to TechMind.click or other websites on the internet.
              </li>
              <li>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our site and/or other sites across the internet.
              </li>
              <li>
                Users may opt out of personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline font-medium"
                >
                  Google Ads Settings
                </a>
                .
              </li>
              <li>
                Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{" "}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline font-medium"
                >
                  www.aboutads.info/choices/
                </a>{" "}
                or the Network Advertising Initiative at{" "}
                <a
                  href="https://optout.networkadvertising.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline font-medium"
                >
                  optout.networkadvertising.org
                </a>
                .
              </li>
            </ul>
          </section>

          <Separator />

          {/* Rights */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">5. User Privacy Rights (GDPR &amp; CCPA)</h2>
            <p>
              Depending on your location, you may have specific statutory privacy rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>European Economic Area (GDPR) &amp; UK:</strong> You have the right to access, correct, update, or request deletion of your personal data; object to processing; and request data portability. If you wish to exercise any of these rights, contact us at info@techmind.click.
              </li>
              <li>
                <strong>California Residents (CCPA/CPRA):</strong> You have the right to request disclosure of categories and specific pieces of personal information collected, request deletion, and opt out of the sale or sharing of personal information. TechMind.click does not sell or rent personal information to third parties.
              </li>
            </ul>
          </section>

          <Separator />

          {/* Children */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">6. Children&apos;s Privacy (COPPA)</h2>
            <p>
              TechMind.click is not directed at children under the age of 13. We do not knowingly collect or solicit personal information from children under 13. If you believe that a child under 13 has provided us with personal information, please contact us immediately, and we will promptly remove such information from our records.
            </p>
          </section>

          <Separator />

          {/* External Links */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">7. Links to Third-Party Websites</h2>
            <p>
              Our website and blog articles may contain links to external sites not operated by us. If you click on a third-party link, you will be directed to that party&apos;s site. We strongly advise you to review the Privacy Policy and terms of every site you visit, as we have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>
          </section>

          <Separator />

          {/* Contact */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">8. Contact Us &amp; Legal Entity</h2>
            <p>
              If you have any questions, feedback, or concerns regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-slate-50 p-4 rounded-lg border text-sm space-y-1">
              <p><strong>Website:</strong> <a href="https://www.techmind.click" className="text-primary hover:underline">https://www.techmind.click</a></p>
              <p><strong>Email:</strong> <a href="mailto:info@techmind.click" className="text-primary hover:underline">info@techmind.click</a> / <a href="mailto:kshekh@gmail.com" className="text-primary hover:underline">kshekh@gmail.com</a></p>
              <p><strong>Founder &amp; Operator:</strong> Kamran Shekh</p>
              <p><strong>Address:</strong> Plot No 47, Narayanpuri, Jhotwara, Jaipur, Rajasthan 302012, India</p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
