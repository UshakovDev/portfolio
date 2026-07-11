const { test, expect } = require("@playwright/test");

const BASE_PATH = "/portfolio";
const SITE_URL = "https://ushakovdev.github.io/portfolio";

test.describe("SEO and static export", () => {
  const routes = [
    { route: "/", canonical: `${SITE_URL}/` },
    { route: "/about/", canonical: `${SITE_URL}/about/` },
    { route: "/services/", canonical: `${SITE_URL}/services/` },
    { route: "/work/", canonical: `${SITE_URL}/work/` },
    { route: "/contact/", canonical: `${SITE_URL}/contact/` },
    { route: "/privacy/", canonical: `${SITE_URL}/privacy/` },
  ];

  for (const { route, canonical } of routes) {
    test(`${route} has one complete page-specific metadata set`, async ({ page }) => {
      const response = await page.goto(`${BASE_PATH}${route}`);
      expect(response?.status()).toBe(200);

      await expect(page.locator("head title")).toHaveCount(1);
      await expect(page.locator('head meta[name="description"]')).toHaveCount(1);
      await expect(page.locator('head link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator('head meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('head meta[property="og:description"]')).toHaveCount(1);
      await expect(page.locator('head meta[property="og:url"]')).toHaveCount(1);
      await expect(page.locator('head meta[property="og:image"]')).toHaveCount(1);
      await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute("href", canonical);
      await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute(
        "content",
        canonical
      );
    });
  }

  test("placeholder case pages are generated but protected from indexing", async ({ page }) => {
    const { getCaseProjects } = await import("../data/projects.mjs");

    for (const project of getCaseProjects()) {
      const route = `${BASE_PATH}/work/${project.caseSlug}/`;
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { name: project.title })).toBeVisible();
      await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex,follow"
      );
      await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${SITE_URL}/work/${project.caseSlug}/`
      );
      await expect(page.getByRole("heading", { name: "Исходная проблема" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Моя ответственность" })).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Обсудить похожую задачу" })
      ).toHaveAttribute("href", `${BASE_PATH}/contact/`);
    }
  });

  test("testimonials are noindex and excluded from sitemap", async ({ page, request }) => {
    await page.goto(`${BASE_PATH}/testimonials/`);
    await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex,follow"
    );

    const sitemapResponse = await request.get(`${BASE_PATH}/sitemap.xml`);
    expect(sitemapResponse.status()).toBe(200);
    const sitemap = await sitemapResponse.text();
    expect(sitemap).toContain(`${SITE_URL}/services/`);
    expect(sitemap).toContain(`${SITE_URL}/work/`);
    expect(sitemap).not.toContain("/testimonials/");
    expect(sitemap).not.toContain("bitrix-store-example");

    const robotsResponse = await request.get(`${BASE_PATH}/robots.txt`);
    expect(robotsResponse.status()).toBe(200);
    expect(await robotsResponse.text()).toContain(`${SITE_URL}/sitemap.xml`);
  });

  test("project images load through the production base path", async ({ page }) => {
    await page.goto(`${BASE_PATH}/work/#personal`);
    const image = page.locator("#project-grid article img").first();
    await expect(image).toBeVisible();
    await expect
      .poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0))
      .toBe(true);
    await expect(image).toHaveAttribute("src", /\/portfolio\//);
  });
});
