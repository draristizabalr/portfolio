import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Window } from "@/components/desk/window";
import { folderBySlug, profesional } from "@/content/sections";

const folder = folderBySlug("profesional");

export const metadata: Metadata = {
  title: folder.title,
  description: folder.summary,
  alternates: { canonical: `/${folder.slug}` },
};

export default function ProfesionalPage() {
  return (
    <ViewTransition
      name={`carpeta-${folder.slug}`}
      share="morph"
      default="none"
    >
      <Window tab={folder.tab} title={folder.title} tone={folder.tone}>
        <div className="flex flex-col gap-8">
          <p className="text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
            {profesional.pitch}
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {profesional.groups.map((group) => (
              <section
                key={group.area}
                className="border-kraft-deep/40 border-t pt-4"
              >
                <h2 className="font-display text-lg text-ink">{group.area}</h2>
                <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                  {group.items.map((item, index) => (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: rendered from a constant that never reorders, so position is the only identity. Two skills with the same name in one group would collide on a content key.
                      key={index}
                      className="rounded-[2px] bg-kraft/60 px-2 py-1 font-hand text-lg text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </Window>
    </ViewTransition>
  );
}
