import Link from "next/link";
import type { ReactNode } from "react";
import type { FolderTone } from "@/content/sections";
import { cn } from "@/lib/cn";

/* Tailwind only emits class names it can read literally, so tones are looked
   up rather than interpolated. Mirrors the lookup in folder.tsx. */
const stripTones: Record<FolderTone, string> = {
  kraft: "bg-kraft",
  manila: "bg-manila",
  olive: "bg-olive text-paper",
  paper: "bg-paper-shade",
};

/**
 * An opened section, drawn as the folder it came out of: a kraft tab strip
 * carrying the label, and cream paper below. The caller wraps this in a
 * `<ViewTransition>` sharing a name with the folder on the desk, so the browser
 * morphs one into the other rather than cutting between screens.
 */
export function Window({
  tab,
  title,
  tone,
  children,
}: {
  tab: string;
  title: string;
  tone: FolderTone;
  children: ReactNode;
}) {
  return (
    <div className="relative mx-auto w-full max-w-3xl pt-6">
      {/* The tab, offset left the way a real folder is cut. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-0 flex h-6 items-center rounded-t-[3px] px-4 font-hand text-base whitespace-nowrap text-ink",
          stripTones[tone],
        )}
      >
        {tab}
      </span>

      <div className="relative rounded-[3px] bg-paper lift">
        <div
          aria-hidden="true"
          className="grain-layer absolute inset-0 rounded-[3px]"
        />

        <div className="relative flex items-center justify-between gap-4 border-kraft-deep/40 border-b px-5 py-4 sm:px-8">
          <h1 className="font-display text-2xl text-ink sm:text-3xl">
            {title}
          </h1>
          <Link
            href="/"
            transitionTypes={["nav-back"]}
            aria-label="Cerrar y volver al escritorio"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-[2px] px-3 font-hand text-xl text-ink-soft transition-colors duration-200 ease-paper hover:bg-kraft/50 hover:text-rust focus-visible:bg-kraft/50"
          >
            <span aria-hidden="true">×</span>
            cerrar
          </Link>
        </div>

        <div className="relative px-5 py-7 sm:px-8 sm:py-9">{children}</div>
      </div>
    </div>
  );
}
