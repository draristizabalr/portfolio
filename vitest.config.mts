import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    // The unit under test is pure domain logic with no DOM, so no browser
    // environment is needed.
    environment: "node",
    // Playwright owns e2e/; vitest must not try to collect those specs.
    include: ["src/**/*.test.ts"],
  },
});
