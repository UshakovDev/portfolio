const { test, expect } = require("@playwright/test");
const { existsSync } = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");

test.describe("project data", () => {
  test("uses valid categories, unique identifiers and replaceable content", async () => {
    const {
      DEFAULT_PROJECT_CATEGORY,
      getAvailableProjectCategories,
      getCaseProjects,
      projectCategories,
      projects,
      resolveProjectCategory,
    } = await import("../data/projects.mjs");

    expect(DEFAULT_PROJECT_CATEGORY).toBe("personal");
    expect(projectCategories.map((category) => category.id)).toEqual([
      "personal",
      "direct",
      "studio",
    ]);
    expect(getAvailableProjectCategories().map((category) => category.id)).toEqual([
      "personal",
      "direct",
      "studio",
    ]);
    expect(resolveProjectCategory("#unknown")).toBe("personal");
    expect(resolveProjectCategory("#direct")).toBe("direct");
    expect(resolveProjectCategory("#%E0%A4%A")).toBe("personal");

    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);

    const slugs = getCaseProjects().map((project) => project.caseSlug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const project of projects) {
      expect(projectCategories.some((category) => category.id === project.category)).toBe(true);
      expect(project.id).toMatch(/^[a-z0-9-]+$/);
      expect(project.title.trim()).not.toBe("");
      expect(project.summary.trim()).not.toBe("");
      expect(project.role.trim()).not.toBe("");
      expect(project.result.trim()).not.toBe("");
      expect(project.stack.length).toBeGreaterThanOrEqual(3);
      expect(project.stack.length).toBeLessThanOrEqual(5);
      expect(existsSync(path.join(projectRoot, "public", project.image))).toBe(true);

      for (const url of [project.projectUrl, project.repositoryUrl].filter(Boolean)) {
        expect(url).toMatch(/^https:\/\//);
      }
    }

    for (const project of projects.filter((item) => item.category === "direct")) {
      expect(project.caseSlug).toMatch(/^[a-z0-9-]+$/);
      expect(project.case).toBeTruthy();
      expect(project.case.challenges.length).toBeGreaterThan(0);

      // Демонстрационный кейс никогда не должен оказаться опубликованным,
      // а опубликованный - помеченным как демонстрационный.
      if (project.isPlaceholder) {
        expect(project.published).toBe(false);
      } else {
        expect(project.contentStatus).toBe("verified");
      }
    }
  });

  test("publishes only approved non-placeholder cases in sitemap", async () => {
    const { getCaseProjects, getPublishedCaseProjects } = await import("../data/projects.mjs");
    const { buildSitemap } = await import("../scripts/generate-sitemap.mjs");

    const xml = buildSitemap();
    expect(xml).toContain("/services/");
    expect(xml).not.toContain("/testimonials/");

    const published = getPublishedCaseProjects();
    expect(published.length).toBeGreaterThan(0);

    for (const project of published) {
      expect(project.isPlaceholder).toBe(false);
      expect(project.published).toBe(true);
      expect(xml).toContain(`/work/${project.caseSlug}/`);
    }

    for (const project of getCaseProjects().filter((item) => item.isPlaceholder)) {
      expect(xml).not.toContain(project.caseSlug);
    }
  });
});
