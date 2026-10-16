import type { Metadata } from "next";
import { Caveat, Fraunces, Inter } from "next/font/google";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/* Fraunces carries WONK on top of weight and optical size. WONK adds the
   swashed, slightly off-kilter letterforms that keep the headings from reading
   as a generic serif; SOFT only rounds the terminals, which is barely visible
   at heading sizes and costs a slice of the variable font. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["WONK"],
});

/* A single weight, not the variable font: the handwriting is only ever used at
   its regular cut, and the static file is a fraction of the variable one. */
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.headline}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.headline,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  creator: profile.name,
  /* No canonical here on purpose: a single `alternates.canonical` on the root
     layout would tell crawlers every section is a duplicate of the home page.
     Each section route declares its own instead. */
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: profile.name,
    title: `${profile.name} — ${profile.headline}`,
    description: profile.headline,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Person structured data, so a search result can show this as a person rather
 * than an anonymous page. The email is included because the desk already
 * publishes it on the contact sheet; drop the field if spam outweighs the
 * contact affordance.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.headline,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  sameAs: profile.socials.map((social) => social.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${fraunces.variable} ${caveat.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: this is the standard way to emit JSON-LD, and the object is a local constant built from our own content module, never user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* No motion provider and no animation runtime on the client. Every
            entrance animation is CSS (see the `settle` class) and every
            navigation transition is the browser's own View Transition API, so
            there is nothing for a JS animation library to do here. */}
        {children}
      </body>
    </html>
  );
}
