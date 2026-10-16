import { Settle } from "@/components/settle";
import { profile } from "@/content/profile";
import { WallBoard } from "./wall-board";

/**
 * The wall. It carries the identity plaque and the board of links, and it is
 * the lit half of the scene: daylight comes in from the upper left and drifts.
 */
export function Wall() {
  return (
    <div className="grain relative overflow-hidden bg-wall px-5 pt-14 pb-16 sm:px-8 lg:px-12 lg:pt-20 lg:pb-24">
      <div
        aria-hidden="true"
        className="animate-light-drift pointer-events-none absolute -top-40 -left-28 h-[28rem] w-[28rem] rounded-full bg-paper/80 blur-3xl"
      />
      <div aria-hidden="true" className="grain-layer absolute inset-0" />

      <div className="relative mx-auto flex w-full max-w-lg flex-col gap-12 lg:max-w-3xl lg:gap-16">
        <Settle>
          <Nameplate />
        </Settle>
        <Settle delay={100}>
          <WallBoard />
        </Settle>
      </div>

      {/* Skirting board where the wall meets the desk. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-4 bg-wall-shade"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-4 h-px bg-white/50"
      />
    </div>
  );
}

/**
 * A framed plaque rather than a heading in the page flow: this is the object
 * that tells a visitor whose desk they are standing at.
 */
function Nameplate() {
  return (
    <header className="relative">
      <div className="rounded-[3px] bg-desk-deep p-2 lift sm:p-2.5">
        <div className="relative overflow-hidden rounded-[2px] bg-paper px-6 py-9 text-center sm:px-10 sm:py-11">
          <div aria-hidden="true" className="grain-layer absolute inset-0" />
          <h1 className="relative font-display text-[2.1rem] leading-[1.1] text-ink sm:text-5xl">
            {profile.name}
          </h1>
          <p className="relative mt-3 text-xs uppercase tracking-[0.2em] text-ink-soft sm:text-sm">
            {profile.headline}
          </p>
          <p className="relative mt-5 font-hand text-2xl text-ink-faint sm:text-3xl">
            {profile.location}
          </p>
        </div>
      </div>
    </header>
  );
}
