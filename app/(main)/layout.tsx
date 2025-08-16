import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Text Formatter",
  description: "Free online tools to Convert case and format text",
  icons: {
    icon: "/techmind-favicon.svg",
    // Optional: add other icons for different devices
    shortcut: "/techmind-favicon.ico",
    apple: "/techmind-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-locator-target="vscode">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-muted/40 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
