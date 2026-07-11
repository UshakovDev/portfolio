import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { getPublishedCaseProjects } from "../data/projects.mjs";

export const SITE_URL = "https://ushakovdev.github.io/portfolio";

export const staticSitemapRoutes = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  { path: "/about/", changefreq: "monthly", priority: "0.8" },
  { path: "/services/", changefreq: "monthly", priority: "0.9" },
  { path: "/work/", changefreq: "monthly", priority: "0.8" },
  { path: "/contact/", changefreq: "yearly", priority: "0.5" },
  { path: "/privacy/", changefreq: "yearly", priority: "0.3" },
];

function absoluteUrl(routePath) {
  return routePath === "/" ? `${SITE_URL}/` : `${SITE_URL}${routePath}`;
}

export function buildSitemap(caseProjects = getPublishedCaseProjects()) {
  const routes = [
    ...staticSitemapRoutes,
    ...caseProjects.map((project) => ({
      path: `/work/${project.caseSlug}/`,
      changefreq: "monthly",
      priority: "0.7",
    })),
  ];

  const body = routes
    .map(
      (route) => `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

export async function generateSitemap() {
  const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
  const outputPath = path.resolve(currentDirectory, "../public/sitemap.xml");
  await writeFile(outputPath, buildSitemap(), "utf8");
  return outputPath;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const outputPath = await generateSitemap();
  console.log(`Sitemap generated: ${outputPath}`);
}
