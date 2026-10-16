import { expect, test } from "playwright/test";

const SECTIONS = [
  { slug: "personal", title: "Personal" },
  { slug: "profesional", title: "Perfil profesional" },
  { slug: "experiencia", title: "Experiencia laboral" },
  { slug: "proyectos", title: "Proyectos personales" },
];

for (const section of SECTIONS) {
  test.describe(`/${section.slug}`, () => {
    test("carries its own title, heading and canonical", async ({ page }) => {
      await page.goto(`/${section.slug}`);

      await expect(page).toHaveTitle(new RegExp(`^${section.title} · `));
      await expect(page.locator("h1:visible")).toHaveText(section.title);

      /* Self-referencing, not the home page. A single canonical on the root
         layout would have declared every section a duplicate of `/`, which is
         the failure this pins. */
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical).toMatch(new RegExp(`/${section.slug}$`));
    });

    test("exposes exactly one heading to assistive technology", async ({
      page,
    }) => {
      await page.goto(`/${section.slug}`);

      /* The desk's own <h1> stays in the document inside an <Activity
         mode="hidden"> subtree, so a raw count sees two. Only one is rendered,
         and only one is announced. */
      await expect(page.locator("h1:visible")).toHaveCount(1);
    });

    test("keeps the desk present behind the window", async ({ page }) => {
      await page.goto(`/${section.slug}`);

      // The backdrop is decorative, so it must not reach the accessibility tree.
      const backdrop = page.locator('[aria-hidden="true"].fixed');
      await expect(backdrop).toHaveCount(1);
    });
  });
}
