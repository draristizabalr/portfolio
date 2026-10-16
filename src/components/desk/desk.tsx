import type { ReactNode } from "react";

/**
 * The desk surface. Objects are laid on the wood rather than stacked in a
 * column, so the container only supplies the material and the light falling
 * across the back edge where it meets the wall.
 */
export function Desk({ children }: { children: ReactNode }) {
  return (
    <div
      className="wood-grain relative px-5 pt-14 pb-20 sm:px-8 lg:px-12 lg:pt-16 lg:pb-24"
      /* Named so the desk can be pinned in CSS during a view transition: the
         surface is the fixed reference that makes the content's motion
         legible, so it must not slide with everything else. */
      style={{ viewTransitionName: "desk-surface" }}
    >
      <div aria-hidden="true" className="grain-layer absolute inset-0" />
      {/* A shallow shade along the back edge. Any heavier and it reads as a
          gap between the wall and the desk rather than as contact shadow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-desk-deep/25 to-transparent"
      />

      <div className="relative mx-auto grid w-full max-w-lg gap-12 sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
        {children}
      </div>

      {/* Front edge of the desk. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-6 bg-desk-deep"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-6 h-px bg-black/25"
      />
    </div>
  );
}
