import { MetadataRoute } from "next";
import { cancerTypes, pathways, resources, specialists } from "@/lib/data";
import { site } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/care",
    "/cancer-types",
    "/specialists",
    "/ai",
    "/reports",
    "/appointments",
    "/resources",
    "/about",
    "/contact",
    "/login",
  ].map((path) => ({
    url: `${site.url}${path || "/"}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...pathways.map((p) => ({ url: `${site.url}/care/${p.slug}`, lastModified: new Date() })),
    ...cancerTypes.map((c) => ({ url: `${site.url}/cancer-types/${c.slug}`, lastModified: new Date() })),
    ...specialists.map((s) => ({ url: `${site.url}/specialists/${s.id}`, lastModified: new Date() })),
    ...resources.map((r) => ({ url: `${site.url}/resources/${r.slug}`, lastModified: new Date() })),
  ];
}
