import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import Link from "next/link";

export default function DisclaimerComponent() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="shadow-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold tracking-tight">Website &amp; Service Disclaimer</CardTitle>
          <p className="text-sm text-muted-foreground">Last updated: May 15, 2026</p>
        </CardHeader>

        <CardContent className="space-y-6 text-gray-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">1. General Information</h2>
            <p>
              The information, software utilities, case converters, slug generators, QR code tools, PDF converters, and educational blog articles provided on <strong>TechMind.click</strong> (&quot;the Website&quot;) are intended solely for general informational, educational, and workflow productivity purposes.
            </p>
            <p>
              All information on the Website is provided in good faith. However, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information or tool outputs on the Website.
            </p>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">2. Tool Outputs and User Verification</h2>
            <p>
              Our online utilities (including case conversion, extra space removal, line break fixing, slugification, and image-to-PDF transformation) operate client-side in your browser using automated algorithms.
            </p>
            <p>
              While we strive to ensure that all algorithms execute correctly and efficiently, text and document processing can produce unexpected results depending on character encodings, foreign language accents, unicode symbols, or unstandardized input formatting.
            </p>
            <p className="font-semibold text-gray-800">
              You are strongly advised to inspect and verify all converted text, generated slugs, QR codes, or PDF documents before submitting them for academic assignments, legal contracts, government portal filings, or production software deployments.
            </p>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">3. Advertising &amp; Google AdSense Disclosure</h2>
            <p>
              TechMind.click may display advertisements served by third-party advertising networks, including <strong>Google AdSense</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                The presence of any third-party advertisement on TechMind.click does not constitute an endorsement, guarantee, representation, or recommendation by TechMind of the products, services, or claims advertised.
              </li>
              <li>
                We do not control the content of third-party advertisements or the third-party websites to which they link.
              </li>
              <li>
                For more details on how advertising partners use cookies and your opt-out options, please review our{" "}
                <Link href="/privacy-policy" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </Link>
                .
              </li>
            </ul>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">4. External Links Disclaimer</h2>
            <p>
              TechMind.click may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
            </p>
            <p>
              We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through our site or any feature linked in any banner or other advertising.
            </p>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">5. Limitation of Liability</h2>
            <p>
              Under no circumstance shall TechMind.click, its founder, or contributors be held liable to you for any loss or damage of any kind incurred as a result of the use of the site, reliance on any information provided on the site, or use of our text formatting and PDF conversion tools. Your use of the site and your reliance on any information or tool output is solely at your own risk.
            </p>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">6. Contact Us</h2>
            <p>
              If you have any questions or feedback regarding this disclaimer, please contact us at{" "}
              <a href="mailto:info@techmind.click" className="text-primary hover:underline font-medium">
                info@techmind.click
              </a>{" "}
              or via our{" "}
              <Link href="/contact-us" className="text-primary hover:underline font-medium">
                Contact Page
              </Link>
              .
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
