import Link from "next/link";
import { ViewTransition } from "react";
import type { FolderMeta, FolderTone } from "@/content/sections";
import { cn } from "@/lib/cn";

/* Tailwind only sees class names it can read literally, so tones are looked up
   rather than interpolated. */
const tabTones: Record<FolderTone, string> = {
  kraft: "bg-kraft",
  manila: "bg-manila",
  olive: "bg-olive text-paper",
  paper: "bg-paper-shade",
};

const bodyTones: Record<FolderTone, string> = {
  kraft: "bg-kraft",
  manila: "bg-manila",
  olive: "bg-[#7b8367]",
  paper: "bg-paper-shade",
};

/**
 * A folder on the desk. The whole thing is the link, and it shares a view
 * transition name with the window it opens, so the browser morphs one into the
 * other instead of cutting between two screens.
 */
export function Folder({ folder }: { folder: FolderMeta }) {
  return (
    <ViewTransition
      name={`carpeta-${folder.slug}`}
      share="morph"
      default="none"
    >
      <Link
        href={`/${folder.slug}`}
        transitionTypes={["folder-open"]}
        className="group relative block pt-6 transition-transform duration-400 ease-paper hover:-translate-y-1.5 focus-visible:-translate-y-1.5"
      >
        {/* Papers inside, lifted a little so they peek out. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-4 top-3 h-10 rounded-t-[3px] bg-paper transition-transform duration-400 ease-paper group-hover:-translate-y-2"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-8 top-1 h-10 rounded-t-[3px] bg-paper-shade transition-transform duration-400 ease-paper group-hover:-translate-y-3.5"
        />

        <span
          className={cn(
            "relative block rounded-[3px] lift",
            bodyTones[folder.tone],
          )}
        >
          {/* The tab, offset left the way a real folder is cut. It sizes to
              its own label: a fixed width wraps a longer name like
              "experiencia laboral" straight over the folder body. */}
          <span
            className={cn(
              "absolute -top-6 left-0 flex h-6 items-center rounded-t-[3px] px-3 font-hand text-base whitespace-nowrap text-ink",
              tabTones[folder.tone],
            )}
          >
            {folder.tab}
          </span>

          <span className="flex min-h-[8.5rem] flex-col justify-end px-5 pt-8 pb-5">
            <span className="font-display text-xl text-ink">
              {folder.title}
            </span>
            <span className="mt-1 text-sm text-ink-soft">{folder.summary}</span>
          </span>
        </span>
      </Link>
    </ViewTransition>
  );
}
