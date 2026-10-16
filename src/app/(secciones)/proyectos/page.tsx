import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Window } from "@/components/desk/window";
import { folderBySlug, proyectos } from "@/content/sections";

const folder = folderBySlug("proyectos");

export const metadata: Metadata = {
  title: folder.title,
  description: folder.summary,
  alternates: { canonical: `/${folder.slug}` },
};

export default function ProyectosPage() {
  return (
    <ViewTransition
      name={`carpeta-${folder.slug}`}
      share="morph"
      default="none"
    >
      <Window tab={folder.tab} title={folder.title} tone={folder.tone}>
        <ul className="flex flex-col gap-8">
          {proyectos.map((project) => (
            <li key={project.name}>
              <article className="border-kraft-deep/40 border-t pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="font-display text-xl text-ink">
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-kraft-deep decoration-dotted underline-offset-4 transition-colors duration-200 ease-paper hover:text-rust"
                      >
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h2>
                  <p className="font-hand text-xl text-ink-faint">
                    {project.year}
                  </p>
                </div>
                <p className="mt-3 leading-7 text-ink-soft">
                  {project.summary}
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                  {project.stack.map((item, index) => (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: rendered from a constant that never reorders, so position is the only identity. Repeated stack entries would collide on a content key.
                      key={index}
                      className="rounded-[2px] bg-kraft/60 px-2 py-1 font-hand text-lg text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </Window>
    </ViewTransition>
  );
}
