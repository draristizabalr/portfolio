import { expect, type Locator, test } from "playwright/test";

/**
 * The smallest computed opacity along the ancestor chain, which is what a
 * visitor actually sees. Checking only the element itself would miss a wrapper
 * left at zero.
 */
function effectiveOpacity(locator: Locator) {
  return locator.evaluate((el) => {
    let node: Element | null = el;
    let min = 1;
    while (node) {
      min = Math.min(min, Number(getComputedStyle(node).opacity));
      node = node.parentElement;
    }
    return min;
  });
}

test.describe("robustness", () => {
  test("keeps every essential thing readable with JavaScript disabled", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto("/", { waitUntil: "load" });

    const essentials = [
      ["the name", "h1"],
      ["the telephone", 'a[href^="https://wa.me/"]'],
      ["the contact form", "form"],
      ["the name input", 'input[name="name"]'],
      ["the submit button", 'button[type="submit"]'],
      ["the mail fallback", 'a[href^="mailto:"]'],
      ["a social link", 'a[rel~="me"]'],
    ] as const;

    for (const [label, selector] of essentials) {
      /* The entrance animation is CSS, so it must reach its end state with no
         script at all. Content left at opacity 0 here is content a visitor
         without JavaScript can never reach — which is exactly what a
         JavaScript animation library produced before this was pinned. */
      await expect
        .poll(() => effectiveOpacity(page.locator(selector).first()), {
          message: `${label} stayed invisible without JavaScript`,
          timeout: 5_000,
        })
        .toBe(1);
    }

    await expect(page.locator('a[href^="/"]')).toHaveCount(4);
    await context.close();
  });

  test("never overflows horizontally", async ({ page }) => {
    for (const path of ["/", "/personal", "/experiencia", "/proyectos"]) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow, `${path} overflows horizontally`).toBeLessThanOrEqual(0);
    }
  });

  test("logs nothing to the console error channel", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.locator('a[href="/personal"]').click();
    await page.waitForLoadState("networkidle");

    /* React reports duplicate keys, failed Server Action calls and hydration
       mismatches here. All three shipped undetected once already. */
    expect(errors).toEqual([]);
  });
});
