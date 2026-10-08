import { test, expect } from "@playwright/test";

// Expectations are editorial requirements rather than imports from the app's
// implementation, so swapped labels or incomplete historical content fail.
const places = [
  {
    id: 1,
    title: "Pirâmide de Miquerinos",
    description: /sudoeste/,
    fact: /sudoeste/,
  },
  {
    id: 2,
    title: "Templo funerário de Quéfren",
    description: /imediatamente a leste/,
    fact: /leste/,
  },
  {
    id: 3,
    title: "Pirâmide de Quéfren",
    description: /revestimento original/,
    fact: /Revestimento/,
  },
  {
    id: 4,
    title: "Calçada processional de Quéfren",
    description: /ligava o templo do vale/,
    fact: /vale.*funerário/,
  },
  {
    id: 5,
    title: "Grande Pirâmide de Quéops",
    description: /nordeste/,
    fact: /146,6/,
  },
  {
    id: 6,
    title: "Grande Esfinge e templos próximos",
    description: /corpo de leão/,
    fact: /leste/,
  },
  {
    id: 7,
    title: "Transporte fluvial e acessos aquáticos",
    description: /Merer/,
    fact: /interpretativa/,
  },
  {
    id: 8,
    title: "Heit el-Ghurab",
    description: /alojamento/,
    fact: /alimentação/,
  },
];

const hotspots = [
  {
    key: "cabeca",
    title: "O rosto do horizonte",
    text: /Napoleão.*não têm fundamento/,
  },
  {
    key: "corpo",
    title: "A força do leão",
    text: /calcário do próprio planalto/,
  },
  {
    key: "patas",
    title: "Entre pedra e areia",
    text: /se estendem para leste/,
  },
  {
    key: "estela",
    title: "A Estela do Sonho",
    text: /Tutmés IV.*século XIV a.C./,
  },
];

test.beforeEach(async ({ page }) => {
  const failures = [];
  page.on("pageerror", (error) => failures.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") failures.push(`console: ${message.text()}`);
  });
  page.__exhibitionFailures = failures;
  await page.goto("/");
  await expect(page.locator(".map-artwork svg")).toBeAttached();
  await page.evaluate(() => document.fonts.ready);
});

test.afterEach(async ({ page }) => {
  expect(
    page.__exhibitionFailures,
    "A exposição não deve produzir erros no console ou exceções",
  ).toEqual([]);
});

async function resetMap(page) {
  await page
    .getByRole("button", { name: "Restaurar visão geral", exact: true })
    .click();
  await expect(page.getByLabel("Nível de zoom")).toHaveText("100%");
  await expect
    .poll(() =>
      page.locator(".map-canvas").evaluate((element) => {
        const transform = getComputedStyle(element).transform;
        return transform === "none" ? 1 : new DOMMatrix(transform).a;
      }),
    )
    .toBeCloseTo(1, 3);
}

async function goToSection(page, id) {
  await page
    .locator(`#${id}`)
    .evaluate((element) =>
      element.scrollIntoView({ behavior: "instant", block: "start" }),
    );
  const heading = page.locator(`#${id} h2`).first();
  await expect(heading).toBeInViewport();
  await expect
    .poll(() =>
      heading.evaluate((element) => Number(getComputedStyle(element).opacity)),
    )
    .toBeGreaterThan(0.98);
}

test("a abertura e as mídias locais carregam sem erros", async ({
  page,
}, testInfo) => {
  await expect(page).toHaveTitle("GIZA — The Eternal Monuments");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("GIZA");
  await expect
    .poll(() =>
      page
        .locator(".hero-word")
        .evaluate((element) => Number(getComputedStyle(element).opacity)),
    )
    .toBeGreaterThan(0.98);
  await expect
    .poll(() =>
      page
        .locator(".hero-background img")
        .evaluate((image) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  await page.screenshot({ path: testInfo.outputPath("hero.png") });

  // Force all initially lazy images to load so missing media below the fold
  // cannot escape verification merely because a test did not scroll to it.
  await page.locator("img").evaluateAll((images) =>
    images.forEach((image) => {
      image.loading = "eager";
    }),
  );
  await expect
    .poll(
      () =>
        page
          .locator("img")
          .evaluateAll((images) =>
            images
              .filter((image) => !image.complete || image.naturalWidth === 0)
              .map((image) => image.getAttribute("src")),
          ),
      {
        message:
          "Todas as fotografias devem estar disponíveis como arquivos locais",
      },
    )
    .toEqual([]);
  const localMedia = await page
    .locator("img")
    .evaluateAll((images) =>
      images.every((image) => new URL(image.src).origin === location.origin),
    );
  expect(localMedia).toBe(true);
});

test("os oito marcadores e os oito itens da lista mostram informações e devolvem o foco", async ({
  page,
}, testInfo) => {
  await goToSection(page, "complexo");
  await expect(page.locator(".map-marker")).toHaveCount(8);
  await expect(page.locator(".map-index [data-map-point]")).toHaveCount(8);
  const dialog = page.locator("#map-detail");

  for (const selector of [".map-marker", ".map-index button"]) {
    for (const place of places) {
      await resetMap(page);
      const trigger = page.locator(`${selector}[data-map-point="${place.id}"]`);
      await trigger.click();
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole("heading")).toHaveText(place.title);
      await expect(page.locator("#map-detail-description")).toContainText(
        place.description,
      );
      await expect(dialog.locator(".map-detail-fact dd")).toContainText(
        place.fact,
      );
      await expect(
        page.locator(`[data-map-point="${place.id}"][aria-pressed="true"]`),
      ).toHaveCount(2);
      await expect(
        dialog.locator(".map-detail-sources a").first(),
      ).toHaveAttribute("href", /^https:\/\//);
      if (place.id === 7) {
        await expect(dialog.locator(".map-interpretation")).toContainText(
          "RECONSTRUÇÃO INTERPRETATIVA",
        );
        await expect(dialog).toContainText("Não representa o traçado exato");
      }
      if (place.id % 2 === 0) await page.keyboard.press("Escape");
      else
        await dialog
          .getByRole("button", { name: "Fechar informações do lugar" })
          .click();
      await expect(dialog).not.toBeVisible();
      await expect(trigger).toBeFocused();
    }
  }
  await resetMap(page);
  await page
    .locator("#giza-map")
    .screenshot({ path: testInfo.outputPath("mapa.png") });
});

test("zoom, limites e comandos do teclado preservam a visão geral", async ({
  page,
}) => {
  await goToSection(page, "complexo");
  const zoom = page.getByLabel("Nível de zoom");
  const plus = page.getByRole("button", { name: "Aumentar zoom", exact: true });
  const minus = page.getByRole("button", {
    name: "Diminuir zoom",
    exact: true,
  });
  await expect(minus).toBeDisabled();
  await plus.click();
  await expect(zoom).toHaveText("130%");
  await minus.click();
  await expect(zoom).toHaveText("100%");
  const viewport = page.locator(".map-viewport");
  await viewport.focus();
  await page.keyboard.press("+");
  await expect(zoom).toHaveText("130%");
  await page.keyboard.press("ArrowLeft");
  await expect
    .poll(() =>
      page
        .locator(".map-canvas")
        .evaluate(
          (element) => new DOMMatrix(getComputedStyle(element).transform).e,
        ),
    )
    .toBeGreaterThan(1);
  await page.keyboard.press("Home");
  await expect(zoom).toHaveText("100%");
  await expect(minus).toBeDisabled();
  for (let count = 0; count < 7; count += 1) await plus.click();
  await expect(zoom).toHaveText("300%");
  await expect(plus).toBeDisabled();
  await resetMap(page);
  await expect(page.locator(".map-announcement")).toHaveText(
    "Visão geral do planalto restaurada.",
  );
});

test("a Esfinge oferece quatro detalhes historicamente contextualizados pelo teclado", async ({
  page,
}) => {
  await goToSection(page, "esfinge");
  for (const hotspot of hotspots) {
    const trigger = page.locator(`[data-hotspot="${hotspot.key}"]`);
    await trigger.scrollIntoViewIfNeeded();
    await trigger.focus();
    await page.keyboard.press("Enter");
    const dialog = page.locator("#sphinx-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading")).toHaveText(hotspot.title);
    await expect(page.locator("#sphinx-dialog-description")).toContainText(
      hotspot.text,
    );
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  }
});

test("as abas da engenharia usam setas, Home e End; Órion é apresentado como hipótese", async ({
  page,
}) => {
  await goToSection(page, "engenharia");
  const first = page.getByRole("tab", { name: "A pedra", exact: true });
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "O trabalho", exact: true }),
  ).toBeFocused();
  await expect(page.locator("#panel-logistica")).toBeVisible();
  await expect(page.locator("#panel-logistica")).toContainText(
    "papiros de Merer",
  );
  await expect(page.locator("#panel-materiais")).toBeHidden();
  await page.keyboard.press("End");
  await expect(
    page.getByRole("tab", { name: "O norte", exact: true }),
  ).toBeFocused();
  await expect(page.locator("#panel-orientacao")).toContainText(
    "não está estabelecida",
  );
  await page.keyboard.press("ArrowRight");
  await expect(first).toBeFocused();
  await page.keyboard.press("ArrowLeft");
  await expect(
    page.getByRole("tab", { name: "O norte", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Home");
  await expect(first).toBeFocused();
  await expect(page.locator("#panel-materiais")).toBeVisible();
  await expect(
    page.locator('.engineering-tabs [aria-selected="true"]'),
  ).toHaveCount(1);

  const toggle = page.locator("#orion-toggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#orion-comparison")).toBeVisible();
  await expect(page.locator("#orion-comparison")).toContainText(
    "hipótese contestada, sem comprovação arqueológica",
  );
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator("#orion-comparison")).toBeHidden();
});

test("a exploração e a navegação levam às seções, sem bloquear o conteúdo", async ({
  page,
}, testInfo) => {
  await page.getByRole("link", { name: "INICIAR EXPLORAÇÃO" }).click();
  await expect(page).toHaveURL(/#complexo$/);
  await expect(page.locator("#complexo")).toBeFocused();
  await expect(page.locator("#complex-heading")).toBeInViewport();

  if (testInfo.project.name === "mobile") {
    const toggle = page.locator(".menu-toggle");
    await expect(toggle).toHaveAttribute("aria-label", "Abrir menu");
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#mobile-nav")).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(page.locator("#mobile-nav a").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-nav")).toBeHidden();
    await expect(toggle).toBeFocused();
    await toggle.click();
    await page
      .locator("#mobile-nav")
      .getByRole("link", { name: "A Esfinge", exact: true })
      .click();
    await expect(page.locator("#mobile-nav")).toBeHidden();
  } else {
    await page
      .locator(".desktop-nav")
      .getByRole("link", { name: "A Esfinge", exact: true })
      .click();
  }
  await expect(page).toHaveURL(/#esfinge$/);
  await expect(page.locator("#esfinge")).toBeFocused();
  await expect(page.locator("#sphinx-heading")).toBeInViewport();

  for (const id of [
    "prologo",
    "complexo",
    "esfinge",
    "engenharia",
    "historia",
  ]) {
    await goToSection(page, id);
    await expect
      .poll(
        () =>
          page.evaluate(
            () => document.documentElement.scrollWidth - innerWidth,
          ),
        {
          message: `A seção ${id} não deve criar rolagem horizontal`,
        },
      )
      .toBeLessThanOrEqual(1);
  }
  await page.locator(".site-footer").scrollIntoViewIfNeeded();
  await expect(page.locator(".site-footer")).toBeInViewport();
  await expect
    .poll(async () =>
      Number(
        await page.locator("#reading-progress").getAttribute("aria-valuenow"),
      ),
    )
    .toBeGreaterThan(90);
});

test("fontes, créditos e links locais estão disponíveis", async ({
  page,
  request,
}) => {
  const links = page.locator(".footer-sources a");
  await expect(links).toHaveCount(4);
  const domains = await links.evaluateAll((elements) =>
    elements.map((element) => new URL(element.href).hostname),
  );
  expect(domains).toEqual([
    "egymonuments.gov.eg",
    "giza.fas.harvard.edu",
    "aeraweb.org",
    "whc.unesco.org",
  ]);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  }
  await page.locator("#credits-open").click();
  const dialog = page.locator("#credits-dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("SIL Open Font License");
  const localLinks = await page
    .locator("a[href]")
    .evaluateAll((elements) => [
      ...new Set(
        elements
          .map((element) => element.getAttribute("href"))
          .filter(
            (href) => href && !href.startsWith("#") && !/^https?:/.test(href),
          ),
      ),
    ]);
  for (const path of localLinks) {
    const response = await request.get(path);
    expect(response.status(), `O documento local ${path} deve existir`).toBe(
      200,
    );
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.locator("#credits-open")).toBeFocused();
});

test("movimento reduzido conserva a leitura sem cenas fixadas", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "reduced-motion",
    "A configuração é específica da preferência de movimento reduzido.",
  );
  expect(
    await page.evaluate(
      () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
  ).toBe(true);
  expect(
    await page.evaluate(
      () =>
        window.ScrollTrigger.getAll().filter((trigger) => trigger.pin).length,
    ),
  ).toBe(0);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  for (const id of [
    "prologo",
    "complexo",
    "esfinge",
    "engenharia",
    "historia",
  ]) {
    await goToSection(page, id);
    expect(
      await page
        .locator(`#${id} .scene-reveal`)
        .evaluateAll((elements) =>
          elements.every(
            (element) => Number(getComputedStyle(element).opacity) >= 0.99,
          ),
        ),
    ).toBe(true);
  }
  await page.screenshot({
    path: testInfo.outputPath("pagina-completa.png"),
    fullPage: true,
  });
});
