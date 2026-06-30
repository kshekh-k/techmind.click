import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/app/components/layout";
import FAQAccordion from "@/app/components/faq-accordion";
import QRCodeGeneratorLoader from "@/app/components/tools/qr-generator/QRCodeGeneratorLoader";

const SITE_URL = "https://www.techmind.click";
const PAGE_PATH = "/create-wifi-qr-code-free";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const faqs = [
  {
    question: "How does a WiFi QR code work?",
    answer:
      "It encodes your network name, password, and encryption type in WIFI: format. Scanning it with a phone camera connects the device automatically without typing.",
  },
  {
    question: "Is it safe to share my WiFi password in a QR code?",
    answer:
      "For guest networks, yes. Avoid using your main network password. Create a separate guest network and use that SSID and password in the QR code.",
  },
  {
    question: "What encryption should I select?",
    answer:
      "Choose WPA/WPA2 for modern routers. Use WEP only for older hardware. Select 'No password' for open networks.",
  },
  {
    question: "Where should I display the WiFi QR code?",
    answer:
      "Place it at reception desks, on table cards, near the entrance, or on printed menus so guests can connect immediately.",
  },
];

const trustBadges = [
  "Free No Sign-Up",
  "Works on iOS & Android",
  "No App Needed",
  "Instant Connect",
];

const steps = [
  {
    title: "Select the WiFi Tab",
    description: "Open the QR generator and select the WiFi tab from the content type options.",
    icon: "01",
  },
  {
    title: "Enter Network Details",
    description: "Enter your network name (SSID), password, and choose the encryption type (WPA/WPA2).",
    icon: "02",
  },
  {
    title: "Download and Display",
    description: "Download your WiFi QR code and display it at your venue for instant guest access.",
    icon: "03",
  },
];

export const metadata: Metadata = {
  title: "Create a Free WiFi QR Code for Guests & Customers | TechMind",
  description:
    "Generate a WiFi QR code so guests can connect to your network instantly without typing a password. Free, no sign-up, customizable design.",
  keywords: [
    "wifi qr code generator",
    "create wifi qr code free",
    "qr code for wifi",
    "wifi password qr code",
    "guest wifi qr code",
    "wifi qr code maker",
    "connect wifi qr code",
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: "Create a Free WiFi QR Code for Guests & Customers | TechMind",
    description:
      "Generate a WiFi QR code so guests can connect to your network instantly without typing a password. Free, no sign-up, customizable design.",
    url: PAGE_URL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create a Free WiFi QR Code for Guests & Customers | TechMind",
    description:
      "Generate a WiFi QR code so guests can connect to your network instantly without typing a password. Free, no sign-up, customizable design.",
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
            name: "Create a Free WiFi QR Code for Guests and Customers",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to create a free WiFi QR code for guests",
        description:
          "Generate a WiFi QR code using TechMind so guests can connect to your network by scanning — no typing required.",
        totalTime: "PT2M",
        tool: [
          {
            "@type": "HowToTool",
            name: "TechMind QR Code Generator",
            url: `${SITE_URL}/qr-code-generator`,
          },
        ],
        step: steps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.title,
          text: step.description,
        })),
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
      {
        "@type": "SoftwareApplication",
        name: "TechMind WiFi QR Code Generator",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: `${SITE_URL}/qr-code-generator`,
        featureList: [
          "WiFi QR code generation",
          "WPA/WPA2 and WEP support",
          "Guest network QR code",
          "PNG, SVG, and PDF download",
          "No sign-up required",
          "Custom colors and logo",
        ],
      },
    ],
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <main className="mx-auto w-full max-w-7xl space-y-5 px-3 md:px-4 xl:space-y-10">
        <section id="tool">
          <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center text-muted-foreground">Loading QR Code Generator…</div>}>
            <QRCodeGeneratorLoader />
          </Suspense>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-indigo-200/40 bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-600 p-6 text-white shadow-sm sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide backdrop-blur-sm">
                WiFi QR Code Generator
              </p>
              <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Create a Free WiFi QR Code for Guests and Customers
              </h1>
              <p className="mt-4 max-w-xl text-sm text-indigo-50 sm:text-base">
                Let guests connect to your WiFi instantly by scanning a QR code — no
                typing passwords, no awkward spelling. Generate yours free in seconds.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/qr-code-generator"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Create WiFi QR Code
                </Link>
                <Link
                  href="/qr-code-generator-for-business"
                  className="rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  QR Code for Business
                </Link>
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-2 text-xs sm:text-sm">
                {trustBadges.map((badge) => (
                  <li
                    key={badge}
                    className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-indigo-50 backdrop-blur-md"
                  >
                    {badge}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/25 bg-white/10 p-4 shadow-xl backdrop-blur-xl sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                <span className="ml-2 text-xs text-indigo-100">www.techmind.click</span>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/15 bg-slate-950/40 p-5 ring-1 ring-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.3),transparent_40%)]" />
                <div className="relative flex h-full flex-col items-center justify-center gap-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-indigo-100">
                    Guest WiFi
                  </p>
                  {/* QR code illustration */}
                  <div className="grid grid-cols-7 gap-0.5 rounded-lg border-2 border-white/40 bg-white/10 p-2.5">
                    {[1,1,1,0,1,1,1, 1,0,1,0,1,0,1, 1,1,1,0,1,1,1, 0,0,0,1,0,0,0, 1,1,1,0,1,1,1, 1,0,1,1,1,0,1, 1,1,1,0,1,1,1].map((cell, i) => (
                      <span
                        key={i}
                        className={`h-3 w-3 rounded-sm ${cell ? "bg-white" : "bg-transparent"}`}
                      />
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-cyan-100">Scan to connect</p>
                    <p className="text-[10px] text-white/60">No password needed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-200/70 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
          <div className="prose prose-lg max-w-none">
            <p>
              Asking guests to type a long WiFi password is unnecessary friction.
              A WiFi QR code lets anyone connect to your network in one scan — the phone
              camera reads the code and connects automatically, no app required. Generate
              yours free with TechMind and display it wherever your guests need access.
            </p>
          </div>
        </section>

        <section aria-label="How to create a WiFi QR code" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Create a WiFi QR Code in 3 Steps
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.title}
                className="group rounded-2xl border border-indigo-200/70 bg-gradient-to-b from-white/90 to-indigo-50/80 p-5 shadow-md backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-sm font-bold text-white shadow">
                  {step.icon}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="prose prose-lg max-w-none rounded-2xl border border-slate-200 bg-white p-6 shadow-sm prose-headings:text-slate-900 prose-a:text-indigo-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900">
          <h2>How the WiFi QR Code Format Works</h2>

          <p>
            A WiFi QR code encodes credentials using the <code>WIFI:</code> URI scheme:
          </p>

          <pre>
            <code>WIFI:T:WPA;S:MyNetwork;P:mypassword;;</code>
          </pre>

          <p>
            When a phone camera scans this, iOS (since iOS 11) and Android (since Android 10)
            automatically offer to join the network — no third-party app required. The
            connection happens in one tap after scanning.
          </p>

          <h2>Where to Display Your WiFi QR Code</h2>

          <h3>Restaurants and Cafes</h3>
          <p>
            Print the QR code on table cards, menu holders, or near the counter.
            Customers can connect as soon as they sit down without asking staff.
          </p>

          <h3>Hotels and Airbnb</h3>
          <p>
            Place a framed printout on the welcome desk or inside the room. Update the
            code when the password changes — just regenerate and reprint.
          </p>

          <h3>Offices and Co-Working Spaces</h3>
          <p>
            Mount the QR code at the reception area or meeting room entrance. Visitors
            connect instantly without interrupting the host.
          </p>

          <h3>Events and Conferences</h3>
          <p>
            Display the QR code on screens, at registration desks, and on printed
            materials. Large events with many attendees benefit most from frictionless
            WiFi access.
          </p>

          <h2>Guest Network Security</h2>

          <p>
            Never put your main network credentials in a public QR code. Instead,
            create a dedicated guest network in your router settings. This isolates
            guest devices from your primary network and shared storage, protecting
            your internal resources while still giving guests internet access.
          </p>

          <p>
            Most modern routers — including those from TP-Link, Asus, Netgear, and
            consumer ISP-provided models — support guest networks with a separate SSID
            and password. Enable client isolation on the guest network to prevent
            devices from seeing each other.
          </p>

          <h2>Updating a WiFi QR Code When the Password Changes</h2>

          <p>
            If you change your guest network password (recommended every few months),
            simply return to TechMind, load your saved QR configuration, update the
            password field, and download a fresh code. Reprint or update the displayed
            image — it takes under two minutes.
          </p>

          <p>
            Ready to create yours? Visit the{" "}
            <Link href="/qr-code-generator">TechMind QR Code Generator</Link> and
            select the WiFi tab to get started.
          </p>
        </section>

        <section className="rounded-2xl border border-indigo-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Common questions about WiFi QR codes for guests and customers.
          </p>
          <div className="mt-5">
            <FAQAccordion items={faqs} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
