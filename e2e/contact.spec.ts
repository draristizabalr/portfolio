import { expect, test } from "playwright/test";

test.describe("the contact sheet", () => {
  test("rejects a whitespace-only name, which the browser's own check lets through", async ({
    page,
  }) => {
    await page.goto("/");

    // `required` treats spaces as a value, so this is the case that proves the
    // server-side check is real rather than a duplicate of the native one.
    await page.fill('input[name="name"]', "   ");
    await page.fill('input[name="email"]', "alguien@example.com");
    await page.fill(
      'textarea[name="message"]',
      "Un mensaje suficientemente largo.",
    );
    await page.locator('button[type="submit"]').click();

    /* Scoped to the form on purpose: the App Router keeps its own
       `[aria-live]` route announcer in the document, so an unscoped selector
       matches two elements. */
    await expect(page.locator("form [aria-live]")).toHaveText(
      /Revisá los campos marcados/,
    );

    const name = page.locator('input[name="name"]');
    await expect(name).toHaveAttribute("aria-invalid", "true");

    // The description must actually resolve, or a screen reader announces an
    // invalid field with no reason attached.
    const describedBy = await name.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    await expect(page.locator(`[id="${describedBy}"]`)).toHaveText(
      "Decime cómo te llamás.",
    );
  });

  test("gives each field its own error node, so two failures do not collide", async ({
    page,
  }) => {
    await page.goto("/");

    /* All three pass the browser's own checks — `required` accepts a
       whitespace-only value and a five-character message is non-empty — so the
       Server Action actually runs and both failures come back from zod. An
       empty or malformed field would be blocked natively and never reach the
       server, which is the trap this test fell into first. */
    await page.fill('input[name="name"]', "   ");
    await page.fill('input[name="email"]', "alguien@example.com");
    await page.fill('textarea[name="message"]', "corto");
    await page.locator('button[type="submit"]').click();

    await expect(page.locator("[aria-invalid='true']")).toHaveCount(2);

    const ids = await page
      .locator("form [aria-describedby]")
      .evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("aria-describedby")),
      );
    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);

    // Each description must resolve, or a field is announced as invalid with
    // no reason attached.
    for (const id of ids) {
      await expect(page.locator(`[id="${id}"]`)).not.toBeEmpty();
    }
  });

  test("keeps the honeypot off-screen without hiding it from the form", async ({
    page,
  }) => {
    await page.goto("/");

    const state = await page.evaluate(() => {
      const input = document.querySelector('input[name="company"]');
      if (!input) return null;
      const wrapper = input.parentElement;
      return {
        tabIndex: (input as HTMLInputElement).tabIndex,
        wrapperDisplay: wrapper ? getComputedStyle(wrapper).display : null,
        wrapperLeft: wrapper ? wrapper.getBoundingClientRect().left : null,
      };
    });

    expect(state).not.toBeNull();
    // Out of the tab order, so a keyboard visitor never lands in the trap.
    expect(state?.tabIndex).toBe(-1);
    // Off-screen rather than display:none: a hidden field is still submitted,
    // and some bots check whether a field is actually rendered.
    expect(state?.wrapperDisplay).not.toBe("none");
    expect(state?.wrapperLeft).toBeLessThan(0);
  });
});
