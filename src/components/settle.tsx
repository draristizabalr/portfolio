import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Fades and lifts its children into place on first paint.
 *
 * Deliberately a server component with no JavaScript: the animation lives in
 * the `settle` class in globals.css, so the content is visible and readable even
 * if no script ever runs. A JS animation library would instead ship
 * `opacity: 0` in the HTML and depend on hydration to reveal it.
 */
export function Settle({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  /** Milliseconds of delay, for staggering a row of objects. */
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("settle", className)}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
