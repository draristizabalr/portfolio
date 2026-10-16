import type { Metadata } from "next";
import { Caveat, Fraunces, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/* Fraunces carries two extra axes on top of weight and optical size. WONK adds
   the swashed, slightly off-kilter letterforms; SOFT rounds the terminals. Both
   are what keep the headings from reading as a generic serif. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Portfolio",
    template: "%s · Portfolio",
  },
  description: "Portfolio personal.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${fraunces.variable} ${caveat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
