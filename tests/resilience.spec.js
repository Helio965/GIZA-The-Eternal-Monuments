import { test, expect } from "@playwright/test";

test("a exposição e o mapa funcionam sem as bibliotecas de animação", async ({
  page,
}) => {
  const exceptions = [];
  page.on("pageerror", (error) => exceptions.push(error.message));
  for (const name of ["gsap.min.js", "ScrollTrigger.min.js", "lucide.min.js"]) {
    await page.route(`**/${name}`, (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/javascript",
        body: "",
      }),
    );
  }
  await page.goto("/");
  await expect(page.locator(".hero-word")).toBeVisible();
  await expect(page.locator(".map-marker")).toHaveCount(8);
  await page.locator('.map-index [data-map-point="3"]').click();
  await expect(page.locator("#map-detail-title")).toHaveText(
    "Pirâmide de Quéfren",
  );
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Restaurar visão geral", exact: true })
    .click();
  await expect(page.getByLabel("Nível de zoom")).toHaveText("100%");
  await page.locator("#orion-toggle").click();
  await expect(page.locator("#orion-comparison")).toBeVisible();
  await expect(page.locator("#orion-comparison")).toContainText(
    "hipótese contestada",
  );
  expect(exceptions).toEqual([]);
});

test("falhas nas imagens e no SVG preservam os textos e os oito lugares", async ({
  page,
}) => {
  const exceptions = [];
  page.on("pageerror", (error) => exceptions.push(error.message));
  await page.route("**/assets/images/**", (route) => route.abort());
  await page.route("**/assets/svg/giza-map.svg", (route) =>
    route.fulfill({ status: 503, body: "Temporariamente indisponível" }),
  );
  await page.goto("/");
  await expect(page.locator(".hero-background")).toHaveClass(/media-fallback/);
  await expect(page.locator(".map-artwork svg")).toBeAttached();
  await expect(page.locator(".map-marker")).toHaveCount(8);
  await expect(page.locator(".map-announcement")).toContainText(
    "informações continuam disponíveis",
  );
  await page.locator('.map-index [data-map-point="5"]').click();
  await expect(page.locator("#map-detail-title")).toHaveText(
    "Grande Pirâmide de Quéops",
  );
  await expect(page.locator("#map-detail-description")).toContainText(
    "nordeste",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator("#engineering-heading")).toContainText("Precisão");
  expect(exceptions).toEqual([]);
});

test("trocar a preferência de movimento remove animações e mantém a exploração", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".map-marker")).toHaveCount(8);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page.evaluate(
        () => matchMedia("(prefers-reduced-motion: reduce)").matches,
      ),
    )
    .toBe(true);
  await expect
    .poll(() => page.evaluate(() => window.ScrollTrigger.getAll().length))
    .toBe(0);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect
    .poll(() =>
      page
        .locator(".hero-title")
        .evaluate((element) => Number(getComputedStyle(element).opacity)),
    )
    .toBe(1);
  await page.locator('.map-index [data-map-point="8"]').click();
  await expect(page.locator("#map-detail-title")).toHaveText("Heit el-Ghurab");
  await page.keyboard.press("Escape");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect
    .poll(() =>
      page.evaluate(
        () => matchMedia("(prefers-reduced-motion: no-preference)").matches,
      ),
    )
    .toBe(true);
  await expect
    .poll(() => page.evaluate(() => window.ScrollTrigger.getAll().length))
    .toBeGreaterThan(0);
});
