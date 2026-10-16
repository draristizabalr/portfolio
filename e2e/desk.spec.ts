import { expect, test } from "playwright/test";

const FOLDER_SLUGS = ["personal", "profesional", "experiencia", "proyectos"];

test.describe("the desk", () => {
  test("shows a folder for each section, each pointing at its own route", async ({
    page,
  }) => {
    await page.goto("/");

    for (const slug of FOLDER_SLUGS) {
      await expect(page.locator(`a[href="/${slug}"]`)).toBeVisible();
    }
  });

  test("names the person in the only heading on the page", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1:visible")).toHaveCount(1);
  });

  test("links to each social profile safely and identifies them as the same person", async ({
    page,
  }) => {
    await page.goto("/");

    const links = page.locator('a[rel~="me"]');
    await expect(links).toHaveCount(3);

    for (const link of await links.all()) {
      const rel = await link.getAttribute("rel");
      const href = await link.getAttribute("href");

      // `me` is the IndieWeb microformat; the other two stop a new tab from
      // reaching back into this one.
      expect(rel).toContain("me");
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
      expect(await link.getAttribute("target")).toBe("_blank");
      expect(href).toMatch(/^https:\/\//);
    }
  });

  test("dials WhatsApp with a digits-only number and a URL-encoded message", async ({
    page,
  }) => {
    await page.goto("/");

    const href = await page
      .locator('a[href^="https://wa.me/"]')
      .getAttribute("href");
    expect(href).toBeTruthy();

    const url = new URL(href as string);
    // wa.me rejects anything but digits, so a formatted number with a plus or
    // spaces would silently fail to open the chat.
    expect(url.pathname.replace(/^\//, "")).toMatch(/^\d+$/);
    expect(url.searchParams.get("text")).toBeTruthy();
    expect(href).not.toMatch(/\s/);
  });

  test("opens a folder into its section and closes back to the desk", async ({
    page,
  }) => {
    await page.goto("/");

    await page.locator('a[href="/proyectos"]').click();
    await expect(page).toHaveURL("/proyectos");
    await expect(page.locator("h1:visible")).toHaveText("Proyectos personales");

    await page.locator('a[aria-label="Cerrar y volver al escritorio"]').click();
    await expect(page).toHaveURL("/");
  });
});
