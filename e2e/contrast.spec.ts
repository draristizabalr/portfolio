import { expect, test } from "playwright/test";

/**
 * Pins the WCAG AA contrast that Lighthouse flagged on the olive folder.
 *
 * Without this, a tone change that drops a text/background pair back below 4.5:1
 * would pass every other check in the suite and only surface in an audit. The
 * ratios are computed here rather than asserted against literal colours, so
 * retuning the palette stays allowed as long as it stays readable.
 */
function contrastOf(sel: string) {
  const parse = (value: string) => {
    const match = value.match(/rgba?\(([^)]+)\)/);
    if (!match) return null;
    const parts = match[1]
      .split(/[,\s/]+/)
      .filter(Boolean)
      .map(Number);
    return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
  };
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const luminance = (c: { r: number; g: number; b: number }) =>
    0.2126 * channel(c.r) + 0.7152 * channel(c.g) + 0.0722 * channel(c.b);

  const element = document.querySelector(sel);
  if (!element) return null;

  // The first opaque ancestor background is what the text actually sits on.
  let node: Element | null = element;
  let background = { r: 255, g: 255, b: 255, a: 1 };
  while (node) {
    const candidate = parse(getComputedStyle(node).backgroundColor);
    if (candidate && candidate.a === 1) {
      background = candidate;
      break;
    }
    node = node.parentElement;
  }

  const foreground = parse(getComputedStyle(element).color);
  if (!foreground) return null;

  const a = luminance(foreground);
  const b = luminance(background);
  const [hi, lo] = a > b ? [a, b] : [b, a];

  return {
    ratio: (hi + 0.05) / (lo + 0.05),
    color: getComputedStyle(element).color,
    background: `rgb(${background.r}, ${background.g}, ${background.b})`,
  };
}

const FOLDERS = ["personal", "profesional", "experiencia", "proyectos"];

const TARGETS = [
  ...FOLDERS.flatMap((slug) => [
    {
      label: `${slug} folder tab`,
      selector: `a[href="/${slug}"] span.font-hand`,
    },
    {
      label: `${slug} folder title`,
      selector: `a[href="/${slug}"] span.font-display`,
    },
    {
      label: `${slug} folder summary`,
      selector: `a[href="/${slug}"] span.mt-1`,
    },
  ]),
  /* Scoped to the section that holds the form, and to the labels outside the
     honeypot wrapper: the trap's label is off-screen, so its contrast is
     meaningless and would only add noise. */
  { label: "sheet heading", selector: "section:has(form) h2" },
  { label: "sheet field label", selector: "form div:not([aria-hidden]) label" },
];

test.describe("colour contrast", () => {
  test("clears WCAG AA on every folder tone and on the sheet", async ({
    page,
  }) => {
    await page.goto("/");

    const failures: string[] = [];

    for (const target of TARGETS) {
      const result = await page.evaluate(contrastOf, target.selector);
      expect(
        result,
        `${target.label}: selector matched nothing`,
      ).not.toBeNull();

      const ratio = result?.ratio ?? 0;
      if (ratio < 4.5) {
        failures.push(
          `${target.label}: ${ratio.toFixed(2)}:1 (${result?.color} on ${result?.background})`,
        );
      }
    }

    expect(failures).toEqual([]);
  });
});
