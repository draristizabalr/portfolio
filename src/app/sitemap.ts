import type { MetadataRoute } from "next";
import { folders } from "@/content/sections";
import { siteUrl } from "@/lib/site";

/**
 * `lastModified` is deliberately omitted. Producing it would mean calling
 * `new Date()` while rendering, which Cache Components rejects as a
 * request-time read, and a build timestamp tells a crawler nothing it cannot
 * already infer from the response headers.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...folders.map((folder) => ({
      url: `${siteUrl}/${folder.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
