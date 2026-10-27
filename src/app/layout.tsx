import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Instrument_Serif } from "next/font/google";
import { MotionShell } from "@/components/motion-shell";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://halfpastcreative.com"),
  title: {
    default: "Half Past Creative | Ideas in Motion",
    template: "%s | Half Past Creative",
  },
  description:
    "Strategy, film, motion, music, and brand experiences by Half Past Creative in Mumbai.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      data-theme="half-past"
      data-scroll-behavior="smooth"
      lang="en"
      className={`${geistSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-base-100 text-base-content">
        <MotionShell>
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionShell>
      </body>
    </html>
  );
}
