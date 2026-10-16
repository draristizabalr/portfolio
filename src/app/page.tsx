/* Temporary materials probe: this page is replaced by the desk scene in T3.
   Its only job right now is to force Tailwind to emit the custom utilities so
   they can be inspected in the built CSS. */
export default function Home() {
  return (
    <main className="min-h-dvh p-4">
      <h1 className="font-display text-4xl">Portfolio</h1>
      <p className="font-hand text-2xl">handwritten</p>
      <div className="grain grain-layer h-40 w-40 bg-paper" />
      <div className="wood-grain h-40 w-40" />
      <div className="lift h-40 w-40 bg-kraft" />
    </main>
  );
}
