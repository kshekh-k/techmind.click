import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/app/components/layout";
import FAQAccordion from "@/app/components/faq-accordion";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  QrCode,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wifi,
  AlertTriangle,
} from "lucide-react";

const SITE_URL = "https://www.techmind.click";
const PAGE_PATH = "/create-wifi-qr-code-free";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const faqs = [
  {
    question: "How does a Wi-Fi QR code work without typing a password?",
    answer:
      "A Wi-Fi QR code encodes the network credentials using the standardized WIFI: URI format (e.g., WIFI:T:WPA;S:NetworkName;P:Password;;). When scanned with a native smartphone camera (iOS 11+ or Android 10+), the operating system parses the SSID and security key and prompts the user to join the wireless network in a single tap.",
  },
  {
    question: "Is it safe to display a Wi-Fi QR code publicly in a cafe, office, or Airbnb?",
    answer:
      "Yes, provided you connect guests to a dedicated Guest Network rather than your primary private network. Most modern wireless routers let you enable a guest network with 'Client Isolation', which allows visitors to access the internet while strictly preventing them from accessing your private computers, point-of-sale systems, NAS drives, or internal printers.",
  },
  {
    question: "What should I do if my Wi-Fi password contains special characters?",
    answer:
      "Special characters like semicolons (;), colons (:), commas (,), backslashes (\\), and quotes must be properly escaped with a backslash in the WIFI protocol string. TechMind's QR generator automatically handles syntax escaping so complex passwords encode and connect seamlessly.",
  },
  {
    question: "Can devices connect to a hidden Wi-Fi network using a QR code?",
    answer:
      "Yes. The standard WIFI: URI format supports a hidden network parameter (H:true). When configured, devices that scan the code will broadcast probe requests specifically for your hidden SSID to initiate authentication.",
  },
  {
    question: "What encryption setting should I select for modern routers?",
    answer:
      "Select WPA/WPA2 (or WPA3) for virtually all modern home and business routers. The WEP setting is obsolete and should only be used if maintaining legacy hardware from the early 2000s. For networks without any password, select 'Open' (nopass).",
  },
];

const trustBadges = [
  "Native iOS & Android Support",
  "Guest Isolation Friendly",
  "WPA/WPA2/WPA3 Support",
  "100% Client-Side In-Memory",
];

const steps = [
  {
    title: "1. Open Wi-Fi Tab in Generator",
    description: "Launch the TechMind QR Code Generator and click on the 'Wi-Fi' option in the type selector.",
  },
  {
    title: "2. Input Network SSID & Password",
    description: "Enter your exact network name (case-sensitive) and security password. Choose WPA/WPA2 for standard routers.",
  },
  {
    title: "3. Choose Color & Optional Logo",
    description: "Customize with high-contrast colors and download in vector SVG or PDF for print displays, or PNG for digital displays.",
  },
  {
    title: "4. Display at Key Guest Touchpoints",
    description: "Frame your printed Wi-Fi code at reception desks, conference tables, cafe counters, or hotel bedside stands.",
  },
];

export const metadata: Metadata = {
  title: "Wi-Fi QR Code Guide: Security, Setup & Syntax - TechMind",
  description:
    "Complete guide to generating and deploying Wi-Fi QR codes for guests and venues. Learn the WIFI: URI specification, guest network isolation, password escaping, and print recommendations.",
  keywords: [
    "wifi qr code generator",
    "create wifi qr code free",
    "wifi password qr code guide",
    "guest wifi qr code security",
    "wifi qr code format syntax",
    "connect to wifi qr code",
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: "Wi-Fi QR Code Guide: Security, Setup & Syntax - TechMind",
    description:
      "Complete guide to generating and deploying Wi-Fi QR codes for guests and venues. Learn the WIFI: URI specification, guest network isolation, password escaping, and print recommendations.",
    url: PAGE_URL,
    type: "article",
    siteName: "TechMind",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wi-Fi QR Code Guide: Security, Setup & Syntax - TechMind",
    description:
      "Complete guide to generating and deploying Wi-Fi QR codes for guests and venues. Learn the WIFI: URI specification, guest network isolation, password escaping, and print recommendations.",
  },
};

export default function CreateWifiQRCodeFreePage() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "QR Code Generator",
            item: `${SITE_URL}/qr-code-generator`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Wi-Fi QR Code Guide",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "Article",
        headline: "Wi-Fi QR Code Guide: Protocol Syntax, Security & Venue Setup",
        description:
          "Authoritative guide for creating secure, scannable Wi-Fi QR codes for offices, cafes, events, and short-term rentals.",
        author: {
          "@type": "Organization",
          name: "TechMind",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "TechMind",
          url: SITE_URL,
        },
        mainEntityOfPage: PAGE_URL,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <main className="mx-auto w-full max-w-7xl space-y-6 md:space-y-10 px-3 md:px-4 py-4">
        {/* Tool Launch Callout (Consolidated tool interface) */}
        <section
          aria-label="Create Wi-Fi QR Code Tool Callout"
          className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 text-white shadow-md sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-300/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">
                <Wifi className="h-3.5 w-3.5 text-cyan-400" />
                <span>Wi-Fi Network Setup Guide</span>
              </div>
              <h1 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl leading-tight">
                Create a Free Wi-Fi QR Code for Guests &amp; Customers
              </h1>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Eliminate password typing friction. When guests scan your QR code with their phone camera,
                their device joins your network automatically. Use our full interactive generator to produce
                print-ready Wi-Fi codes with custom framing and logos.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                {trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-md border border-white/20 bg-white/10 px-2.5 py-1 text-slate-200 font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/qr-code-generator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-cyan-300 hover:shadow-cyan-400/25"
              >
                <QrCode className="h-5 w-5" />
                <span>Open Wi-Fi QR Generator</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-center text-xs text-slate-300">
                Select the <strong>Wi-Fi</strong> tab in the generator
              </p>
            </div>
          </div>
        </section>

        {/* Technical Protocol Explanation */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-2 border-b pb-4">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              How the Wi-Fi QR Code Standard Operates
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Wi-Fi QR codes follow the industry-standard ZXing URI syntax, supported natively by Apple iOS and Google Android.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-900 p-4 text-slate-100 font-mono text-xs md:text-sm overflow-x-auto">
              <code>WIFI:T:WPA;S:CafeGuestNetwork;P:SuperSecretPass123!;H:false;;</code>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs md:text-sm">
              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50 space-y-1">
                <span className="font-bold text-slate-900">T: (Authentication)</span>
                <p className="text-slate-600">Specifies encryption mode: WPA, WEP, or nopass for open public Wi-Fi.</p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50 space-y-1">
                <span className="font-bold text-slate-900">S: (Network SSID)</span>
                <p className="text-slate-600">The exact broadcast name of your router. Must match case exactly.</p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50 space-y-1">
                <span className="font-bold text-slate-900">P: (Pre-Shared Key)</span>
                <p className="text-slate-600">Your network security password, parsed safely without displaying on screen.</p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50 space-y-1">
                <span className="font-bold text-slate-900">H: (Hidden Flag)</span>
                <p className="text-slate-600">Set to true if your router does not broadcast its SSID beacon frame.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Guest Isolation Best Practice */}
        <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 md:p-8 space-y-5">
          <div className="flex items-center gap-3 text-amber-950 font-bold text-lg md:text-xl">
            <ShieldCheck className="h-6 w-6 text-amber-700 shrink-0" />
            <h2>Critical Network Security: Isolate Guest Traffic</h2>
          </div>
          <div className="space-y-3 text-sm md:text-base text-amber-900 leading-relaxed">
            <p>
              Never create a public QR code that encodes your primary office or home network password.
              If guests connect to your primary Wi-Fi, their devices reside on the same local subnet as your
              personal computers, file servers, network-attached storage (NAS), and smart devices.
            </p>
            <div className="grid gap-4 md:grid-cols-3 text-xs md:text-sm pt-2">
              <div className="rounded-xl border border-amber-300/80 bg-white p-4 space-y-1 text-slate-800">
                <h3 className="font-bold text-amber-950">1. Enable Guest SSID</h3>
                <p className="text-slate-600">
                  Access your router settings (e.g. TP-Link, Netgear, Asus, UniFi) and create a separate network named &quot;Venue_Guest&quot;.
                </p>
              </div>

              <div className="rounded-xl border border-amber-300/80 bg-white p-4 space-y-1 text-slate-800">
                <h3 className="font-bold text-amber-950">2. Turn on Client Isolation</h3>
                <p className="text-slate-600">
                  Ensure &quot;AP Isolation&quot; or &quot;Client Isolation&quot; is active. This prevents guest laptops from pinging or sniffing other connected phones.
                </p>
              </div>

              <div className="rounded-xl border border-amber-300/80 bg-white p-4 space-y-1 text-slate-800">
                <h3 className="font-bold text-amber-950">3. Rotate Key Periodically</h3>
                <p className="text-slate-600">
                  Change the guest password every few months. Updating your QR code takes under 60 seconds with TechMind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Instructions */}
        <section aria-label="Step-by-step instructions" className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
            How to Set Up Your Guest Wi-Fi QR Code
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-2"
              >
                <h3 className="font-bold text-slate-900 text-sm md:text-base">{step.title}</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Display and Physical Placement Recommendations */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-2 border-b pb-4">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Optimal Display Locations by Venue Type
            </h2>
            <p className="text-slate-600 text-sm">
              Displaying the code where visitors naturally pause eliminates repeated staff inquiries.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="rounded-xl border border-slate-200 p-4 space-y-2">
              <h3 className="font-bold text-slate-900">Cafes &amp; Restaurants</h3>
              <p className="text-xs text-slate-600">
                Place small acrylic tent stands on each table or print on the bottom of physical menus.
                Include a label: &quot;Free Wi-Fi &bull; Scan with your camera to connect&quot;.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 space-y-2">
              <h3 className="font-bold text-slate-900">Offices &amp; Co-Working</h3>
              <p className="text-xs text-slate-600">
                Mount framed signs in conference rooms, reception desks, and lounge areas.
                Ensures visiting clients connect immediately without interrupting ongoing meetings.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 space-y-2">
              <h3 className="font-bold text-slate-900">Hotels &amp; Vacation Rentals</h3>
              <p className="text-xs text-slate-600">
                Print on the inside cover of the guest house manual and on the bedside table.
                Eliminates late-night host messaging about Wi-Fi access.
              </p>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">
            Related QR Code Tools &amp; Tutorials
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/qr-code-generator"
              className="rounded-xl border border-slate-200 p-4 bg-white transition hover:border-indigo-300 hover:shadow-md space-y-1"
            >
              <h3 className="font-bold text-slate-900 text-sm">Interactive QR Code Generator</h3>
              <p className="text-xs text-slate-600">
                Create custom Wi-Fi, URL, and text QR codes with instant vector downloads.
              </p>
            </Link>

            <Link
              href="/qr-code-generator-for-business"
              className="rounded-xl border border-slate-200 p-4 bg-white transition hover:border-indigo-300 hover:shadow-md space-y-1"
            >
              <h3 className="font-bold text-slate-900 text-sm">Business Card QR Guide</h3>
              <p className="text-xs text-slate-600">
                Learn optical sizing, material laminates, and printing checklists for stationery.
              </p>
            </Link>

            <Link
              href="/download-qr-code-png-svg-pdf"
              className="rounded-xl border border-slate-200 p-4 bg-white transition hover:border-indigo-300 hover:shadow-md space-y-1"
            >
              <h3 className="font-bold text-slate-900 text-sm">PNG vs. SVG vs. PDF Guide</h3>
              <p className="text-xs text-slate-600">
                Understand resolution math and why vector formats are critical for physical signage.
              </p>
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={faqs} />
        </section>
      </main>
    </Layout>
  );
}
