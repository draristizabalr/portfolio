/**
 * A cheap stand-in for the room, so the desk still reads as present behind an
 * opened section. It is fixed, inert and drawn in flat colour rather than
 * reusing the real wall and desk, which keeps a navigation cheap and stops the
 * backdrop from competing with the window for attention.
 */
export function SceneBackdrop() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 flex flex-col">
      <div className="relative flex-1 bg-wall">
        <div className="absolute inset-0 bg-wall-shade/40" />
      </div>
      <div className="h-4 bg-wall-shade" />
      <div className="wood-grain relative h-[38%] shrink-0">
        <div className="grain-layer absolute inset-0" />
      </div>
    </div>
  );
}
