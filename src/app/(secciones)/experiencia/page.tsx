import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Window } from "@/components/desk/window";
import { experiencia, folderBySlug } from "@/content/sections";

const folder = folderBySlug("experiencia");

export const metadata: Metadata = {
  title: folder.title,
  description: folder.summary,
  alternates: { canonical: `/${folder.slug}` },
};

export default function ExperienciaPage() {
  return (
    <ViewTransition
      name={`carpeta-${folder.slug}`}
      share="morph"
      default="none"
    >
      <Window tab={folder.tab} title={folder.title} tone={folder.tone}>
        <ol className="flex flex-col gap-8">
          {experiencia.map((entry) => (
            <li key={`${entry.role}-${entry.company}`}>
              <article className="border-kraft-deep/40 border-t pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="font-display text-xl text-ink">
                    {entry.role}
                  </h2>
                  <p className="font-hand text-xl text-ink-faint">
                    {entry.period}
                  </p>
                </div>
                <p className="mt-1 text-sm uppercase tracking-[0.14em] text-ink-soft">
                  {entry.company}
                </p>
                <p className="mt-3 leading-7 text-ink-soft">{entry.summary}</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {entry.highlights.map((highlight, index) => (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: rendered from a constant that never reorders, so position is the only identity. Repeated bullet text would collide on a content key.
                      key={index}
                      className="flex gap-3 leading-7 text-ink-soft"
                    >
                      <span aria-hidden="true" className="text-brass">
                        —
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </Window>
    </ViewTransition>
  );
}
