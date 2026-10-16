/*
 * Generates the paper grain tile as a base64 PNG data URI.
 *
 * Why not an inline SVG with feTurbulence: the browser has to rasterize it on
 * every paint, and on a throttled mobile CPU that measured as 2.36s of LCP
 * render delay. A bitmap decodes instead of being computed.
 *
 * Why the noise is blurred rather than raw: feTurbulence produces
 * `fractalNoise`, which is spatially correlated and reads as paper tooth. Pure
 * white noise is maximally high-frequency and, at the same average darkness,
 * reads as television static. Two cheap octaves of blurred noise get back the
 * soft mottling without going near a runtime rasteriser.
 *
 * Run: node scripts/generate-grain.cjs
 */
const sharp = require("sharp");

const SIZE = 64;
/* Deterministic, so regenerating produces byte-identical output. */
let seed = 0x2f6e2b1;
function random() {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 0xffffffff;
}

/** One octave of noise, blurred so it carries soft structure. */
async function octave(pixels, blur, gain) {
  const raw = Buffer.alloc(pixels * pixels * 4);
  for (let i = 0; i < pixels * pixels; i += 1) {
    raw[i * 4 + 3] = Math.round(random() * 255 * gain);
  }
  return sharp(raw, { raw: { width: pixels, height: pixels, channels: 4 } })
    .blur(blur)
    .resize(SIZE, SIZE, { kernel: "cubic" })
    .raw()
    .toBuffer();
}

(async () => {
  /* A coarse octave for the mottling and a fine one for the tooth. Blur is
     proportional to the source size so both end up at a similar spatial scale
     once resized. */
  const coarse = await octave(16, 1.1, 0.5);
  const fine = await octave(64, 0.55, 0.5);

  const combined = Buffer.alloc(SIZE * SIZE * 4);
  for (let i = 0; i < SIZE * SIZE; i += 1) {
    // Averaged, then scaled down: paper grain is a whisper, not a texture.
    const alpha = (coarse[i * 4 + 3] + fine[i * 4 + 3]) / 2;
    combined[i * 4 + 3] = Math.round(Math.min(255, alpha) * 0.15);
  }

  const png = await sharp(combined, {
    raw: { width: SIZE, height: SIZE, channels: 4 },
  })
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer();

  console.error(`png bytes:    ${png.length}`);
  console.error(`base64 chars: ${png.toString("base64").length}`);
  console.log(`data:image/png;base64,${png.toString("base64")}`);
})();
