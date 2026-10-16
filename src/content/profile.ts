/**
 * Single source of truth for every piece of personal data on the site.
 *
 * Every value marked PLACEHOLDER below is a stand-in. Replace them and nothing
 * else in the codebase needs to change: the desk reads all of it from here.
 *
 * `whatsapp.number` must be digits only, including the country code and with no
 * `+`, spaces or dashes — that is the format wa.me requires. For example, an
 * Argentine number written as +54 9 11 5555 4444 becomes "5491155554444".
 */

export type BrandName =
  | "linkedin"
  | "github"
  | "x"
  | "instagram"
  | "youtube"
  | "telegram"
  | "bluesky"
  | "mastodon";

export type SocialLink = {
  brand: BrandName;
  /** Shown next to the icon, and read out by screen readers. */
  label: string;
  /** The @handle or short URL shown in the handwriting font. */
  handle: string;
  href: string;
};

export type Profile = {
  name: string;
  headline: string;
  location: string;
  email: string;
  whatsapp: {
    /** Digits only, with country code. See the note at the top of this file. */
    number: string;
    /** Prefilled into the WhatsApp message box. */
    message: string;
  };
  socials: SocialLink[];
};

export const profile: Profile = {
  name: "PLACEHOLDER Nombre Apellido",
  headline: "PLACEHOLDER Desarrollador de software",
  location: "PLACEHOLDER Ciudad, País",
  email: "placeholder@example.com",
  whatsapp: {
    number: "5490000000000",
    message: "PLACEHOLDER Hola, vi tu portfolio y quería hablar con vos.",
  },
  socials: [
    {
      brand: "linkedin",
      label: "LinkedIn",
      handle: "PLACEHOLDER /in/usuario",
      href: "https://www.linkedin.com/in/placeholder",
    },
    {
      brand: "github",
      label: "GitHub",
      handle: "PLACEHOLDER @usuario",
      href: "https://github.com/placeholder",
    },
    {
      brand: "x",
      label: "X",
      handle: "PLACEHOLDER @usuario",
      href: "https://x.com/placeholder",
    },
  ],
};

/** wa.me wants the number without a leading `+` or any separators. */
export function whatsappHref({ whatsapp }: Profile) {
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`;
}

export function mailtoHref({ email }: Profile) {
  return `mailto:${email}`;
}
