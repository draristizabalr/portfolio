import { BrandIcon } from "@/components/icons/brand-icon";
import { profile } from "@/content/profile";

/**
 * The wall board. Rows are ruled individually rather than by a repeating
 * background, so a rule always sits under its own row no matter how tall the
 * text inside it turns out to be. The card hangs very slightly off-square, the
 * way a pinned sheet does.
 */
export function WallBoard() {
  return (
    <section
      aria-labelledby="redes-heading"
      className="relative -rotate-[0.6deg] rounded-[3px] bg-paper px-5 py-7 lift sm:px-8 sm:py-9"
    >
      <div
        aria-hidden="true"
        className="grain-layer absolute inset-0 rounded-[3px]"
      />

      {/* Two brass pins. */}
      <div
        aria-hidden="true"
        className="absolute -top-2 left-1/2 flex -translate-x-1/2 gap-24 sm:gap-32"
      >
        {[0, 1].map((pin) => (
          <span
            key={pin}
            className="h-4 w-4 rounded-full bg-brass shadow-[inset_1px_1px_1px_rgba(255,255,255,0.6),0_2px_3px_rgba(0,0,0,0.35)]"
          />
        ))}
      </div>

      <h2
        id="redes-heading"
        className="relative font-hand text-3xl text-ink-soft sm:text-4xl"
      >
        dónde encontrarme
      </h2>

      <ul className="relative mt-4 flex flex-col">
        {profile.socials.map((social) => (
          <li
            key={social.brand}
            className="border-kraft-deep/45 border-b last:border-b-0"
          >
            <a
              href={social.href}
              target="_blank"
              /* `me` is the IndieWeb microformat for a profile belonging to the
                 same person as this page, which is what a portfolio link is. */
              rel="me noopener noreferrer"
              className="group flex min-h-12 items-center gap-3 py-2 transition-transform duration-300 ease-paper hover:translate-x-1 focus-visible:translate-x-1 sm:gap-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] bg-ink text-paper transition-colors duration-300 ease-paper group-hover:bg-rust">
                <BrandIcon brand={social.brand} size={17} />
              </span>
              <span className="font-display text-lg whitespace-nowrap text-ink">
                {social.label}
              </span>
              {/* min-w-0 is what lets the handle ellipsize instead of forcing
                  the row to wrap and breaking the rule alignment. */}
              <span className="ml-auto min-w-0 truncate font-hand text-xl text-ink-faint transition-colors duration-300 ease-paper group-hover:text-rust">
                {social.handle}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
