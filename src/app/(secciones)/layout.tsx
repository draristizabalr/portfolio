import type { ReactNode } from "react";
import { SceneBackdrop } from "@/components/desk/scene-backdrop";

/**
 * Every opened section shares this: the room still behind the window, and a
 * column wide enough to read comfortably. Route groups do not appear in the
 * URL, so /personal stays /personal.
 */
export default function SeccionesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SceneBackdrop />
      <main className="relative flex min-h-dvh justify-center px-4 py-10 sm:px-8 sm:py-16">
        {children}
      </main>
    </>
  );
}
