const { test, expect } = require("@playwright/test");

const BASE_PATH = "/portfolio";

test.describe("portfolio development functionality", () => {
  test("services are available from navigation and contain process and CTA", async ({ page }) => {
    await page.goto(`${BASE_PATH}/services/`);

    await expect(page.getByRole("link", { name: "Услуги" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    await expect(page.getByRole("link", { name: "Отзывы" })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Чем могу помочь" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Диагностика и оценка" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Доработки и интеграции" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Поддержка и развитие" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Как строится работа" })).toBeVisible();

    const cta = page.getByRole("link", { name: "Обсудить задачу" });
    await expect(cta).toHaveAttribute("href", `${BASE_PATH}/contact/`);
  });

  test("testimonials use a neutral unlisted placeholder", async ({ page }) => {
    await page.goto(`${BASE_PATH}/testimonials/`);

    await expect(page.getByRole("heading", { name: "Раздел готовится" })).toBeVisible();
    await expect(
      page.getByText(
        "Здесь будут опубликованы только подтверждённые отзывы с разрешения авторов."
      )
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Отзывы" })).toHaveCount(0);
  });

  test("project filters support hash, keyboard and browser history", async ({ page }) => {
    await page.goto(`${BASE_PATH}/work/`);

    const personal = page.getByRole("button", { name: /Собственные разработки/ });
    const direct = page.getByRole("button", { name: /Самостоятельные заказы/ });
    const studio = page.getByRole("button", { name: /В составе команды/ });

    await expect(personal).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#project-grid article")).toHaveCount(4);

    await direct.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/portfolio\/work\/#direct$/);
    await expect(direct).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#project-grid article")).toHaveCount(3);

    await studio.focus();
    await page.keyboard.press("Space");
    await expect(page).toHaveURL(/\/portfolio\/work\/#studio$/);
    await expect(studio).toHaveAttribute("aria-pressed", "true");

    await page.goBack();
    await expect(page).toHaveURL(/\/portfolio\/work\/#direct$/);
    await expect(direct).toHaveAttribute("aria-pressed", "true");

    await page.goForward();
    await expect(page).toHaveURL(/\/portfolio\/work\/#studio$/);
    await expect(studio).toHaveAttribute("aria-pressed", "true");

    await page.goto(`${BASE_PATH}/work/#unknown-category`);
    await expect(personal).toHaveAttribute("aria-pressed", "true");
  });

  test("project card content is visible without hover", async ({ page }) => {
    await page.goto(`${BASE_PATH}/work/#direct`);

    const card = page.locator("#project-grid article").first();
    await expect(card.getByText("Моя роль")).toBeVisible();
    await expect(card.getByText("Результат", { exact: true })).toBeVisible();
    await expect(card.getByLabel("Технологии проекта")).toBeVisible();
    await expect(card.getByRole("link", { name: "Подробнее" })).toBeVisible();
    await expect(card.getByText("Демонстрационные данные")).toBeVisible();
  });

  for (const width of [320, 375, 390]) {
    test(`work page has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`${BASE_PATH}/work/#direct`);
      await expect(page.locator("#project-grid article").first()).toBeVisible();

      const dimensions = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      }));

      expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
    });
  }

  test("filters work in a touch-enabled context", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    await page.goto(`http://127.0.0.1:4173${BASE_PATH}/work/#personal`);
    const direct = page.getByRole("button", { name: /Самостоятельные заказы/ });
    await direct.tap();
    await expect(direct).toHaveAttribute("aria-pressed", "true");
    await expect(page).toHaveURL(/#direct$/);

    await context.close();
  });
});
