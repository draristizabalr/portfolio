/**
 * Canonical origin, shared by metadata, robots and the sitemap so there is one
 * place to set the domain. Vercel preview deployments can override it with
 * NEXT_PUBLIC_SITE_URL; the fallback keeps local development honest.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");
