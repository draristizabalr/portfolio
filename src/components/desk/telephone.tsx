import { profile, whatsappHref } from "@/content/profile";

/* A real keypad, left to right and top to bottom. Listing the keys rather than
   counting to twelve keeps every key stable and self-describing. */
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

/**
 * The desk telephone, dialling WhatsApp. Built from CSS shapes rather than an
 * illustration so it inherits the palette and stays crisp at any density.
 */
export function Telephone() {
  return (
    <section
      aria-labelledby="whatsapp-heading"
      className="flex flex-col items-center [perspective:800px] lg:[transform:rotateX(3deg)_rotateZ(-1.2deg)]"
    >
      <h2
        id="whatsapp-heading"
        className="mb-4 font-hand text-2xl text-paper/90 lg:text-3xl"
      >
        hablemos
      </h2>

      <a
        href={whatsappHref(profile)}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block w-full max-w-[13.5rem] transition-transform duration-300 ease-paper hover:-translate-y-1 focus-visible:-translate-y-1"
      >
        {/* Handset resting on the cradle: two cups joined by a bar. */}
        <span
          aria-hidden="true"
          className="absolute -top-5 left-1/2 z-10 flex w-[92%] -translate-x-1/2 items-center transition-transform duration-300 ease-paper group-hover:-translate-y-1.5"
        >
          <span className="h-7 w-7 shrink-0 rounded-full bg-ink shadow-[0_3px_8px_rgba(0,0,0,0.45)]" />
          <span className="h-3.5 flex-1 rounded-full bg-ink" />
          <span className="h-7 w-7 shrink-0 rounded-full bg-ink shadow-[0_3px_8px_rgba(0,0,0,0.45)]" />
        </span>
        {/* Cradle. */}
        <span
          aria-hidden="true"
          className="absolute -top-1 left-1/2 h-4 w-[92%] -translate-x-1/2 rounded-full bg-ink-soft"
        />

        <span className="relative block rounded-2xl bg-[#3b332b] px-5 pt-8 pb-5 lift">
          <span
            aria-hidden="true"
            className="absolute inset-x-5 top-3 h-px bg-brass/70"
          />

          <span className="block rounded-lg bg-ink/70 px-4 py-3">
            <span
              aria-hidden="true"
              className="grid grid-cols-3 gap-x-3 gap-y-1.5"
            >
              {KEYS.map((key) => (
                <span
                  key={key}
                  className="mx-auto h-1.5 w-6 rounded-full bg-paper/30 transition-colors duration-300 ease-paper group-hover:bg-paper/50"
                />
              ))}
            </span>
          </span>

          <span className="mt-3 block text-center font-display text-base text-paper">
            WhatsApp
          </span>
        </span>
      </a>

      <p className="mt-4 text-center font-hand text-xl text-paper/80">
        tocá el teléfono y te escribo
      </p>
    </section>
  );
}
