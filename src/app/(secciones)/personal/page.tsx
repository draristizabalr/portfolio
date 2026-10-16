import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Window } from "@/components/desk/window";
import { folderBySlug, personal } from "@/content/sections";

const folder = folderBySlug("personal");

export const metadata: Metadata = {
  title: folder.title,
  description: folder.summary,
  alternates: { canonical: `/${folder.slug}` },
};

export default function PersonalPage() {
  return (
    <ViewTransition
      name={`carpeta-${folder.slug}`}
      share="morph"
      default="none"
    >
      <Window tab={folder.tab} title={folder.title} tone={folder.tone}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            {personal.intro.map((paragraph, index) => (
              <p
                // biome-ignore lint/suspicious/noArrayIndexKey: the list is rendered from a constant that never reorders, so position is the only identity available. Content strings cannot be the key: two identical paragraphs would collide.
                key={index}
                className="text-base leading-7 text-ink-soft sm:text-lg sm:leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="grid gap-5 sm:grid-cols-3">
            {personal.facts.map((fact) => (
              <div
                key={fact.label}
                className="border-kraft-deep/40 border-t pt-3"
              >
                <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">
                  {fact.label}
                </dt>
                <dd className="mt-1 font-hand text-xl text-ink">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Window>
    </ViewTransition>
  );
}
