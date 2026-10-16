"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Motion animates through inline styles, so a CSS `prefers-reduced-motion`
 * guard cannot stop it. `reducedMotion="user"` makes motion drop transform and
 * layout animation on its own when the visitor asks for less movement, while
 * keeping opacity fades that carry no positional meaning.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
