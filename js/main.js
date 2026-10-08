import { initMap } from "./giza-map.js";
import { initAnimations } from "./animations.js";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const byId = (id) => document.getElementById(id);
const icons = () =>
  window.lucide?.createIcons({
    attrs: { "aria-hidden": "true", focusable: "false" },
  });

function initNavigation() {
  const header = byId("site-header");
  const toggle = document.querySelector(".menu-toggle");
  const mobile = byId("mobile-nav");
  const closeMenu = (restoreFocus = false) => {
    mobile.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener("click", () => {
    const willOpen = mobile.hidden;
    mobile.hidden = !willOpen;
    toggle.setAttribute("aria-expanded", String(willOpen));
    toggle.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !mobile.hidden) closeMenu(true);
  });
  document.addEventListener("click", (e) => {
    if (!header.contains(e.target) && !mobile.hidden) closeMenu();
  });
  const mobileQuery = matchMedia("(max-width: 760px)");
  mobileQuery.addEventListener("change", () => closeMenu());
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({
        behavior: reduced() ? "instant" : "smooth",
        block: "start",
      });
      history.replaceState(null, "", link.getAttribute("href"));
      // Anchor navigation must also move the keyboard reading position.
      if (!target.hasAttribute("tabindex"))
        target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
  const sections = [
    "inicio",
    "complexo",
    "esfinge",
    "engenharia",
    "historia",
  ].map(byId);
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    const bar = byId("reading-progress");
    bar.style.transform = `scaleX(${progress})`;
    const rounded = String(Math.round(progress * 100));
    if (bar.getAttribute("aria-valuenow") !== rounded)
      bar.setAttribute("aria-valuenow", rounded);
    header.classList.toggle("scrolled", scrollY > 70);
    let current = "inicio";
    for (const section of sections)
      if (section.getBoundingClientRect().top <= innerHeight * 0.35)
        current = section.id;
    document
      .querySelectorAll(".desktop-nav a, .mobile-nav a")
      .forEach((link) => {
        if (link.hash === `#${current}`)
          link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
  };
  const schedule = () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  };
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });
  update();
}

function initDialogs() {
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog
      .querySelector(".dialog-close")
      ?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => {
      const r = dialog.getBoundingClientRect();
      if (
        e.target === dialog &&
        (e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom)
      )
        dialog.close();
    });
  });
  const details = {
    cabeca: [
      "01 — PODER REAL",
      "O rosto do horizonte",
      "A cabeça humana usa o nemes, toucado associado à realeza egípcia. O monumento não preserva o nariz, e as histórias que atribuem sua perda a Napoleão não têm fundamento.",
    ],
    corpo: [
      "02 — ESCULTURA MONUMENTAL",
      "A força do leão",
      "O corpo de leão foi talhado no calcário do próprio planalto. Ele reúne força animal e autoridade humana numa representação do poder real. A erosão varia conforme as camadas da rocha.",
    ],
    patas: [
      "03 — O HORIZONTE ORIENTAL",
      "Entre pedra e areia",
      "As patas dianteiras se estendem para leste. O corpo passou por períodos de soterramento por areia e sucessivas intervenções de conservação. Os blocos de revestimento registram diferentes fases de reparo.",
    ],
    estela: [
      "04 — MEMÓRIA DO NOVO IMPÉRIO",
      "A Estela do Sonho",
      "Erguida por Tutmés IV no século XIV a.C., a estela está entre as patas dianteiras. Sua inscrição conta que a Esfinge teria prometido ao príncipe a realeza se ele removesse a areia. O relato é um texto de legitimação real, não uma comprovação literal do sonho.",
    ],
  };
  document.querySelectorAll("[data-hotspot]").forEach((button) => {
    button.addEventListener("click", () => {
      const [number, title, description] = details[button.dataset.hotspot];
      byId("sphinx-dialog-number").textContent = number;
      byId("sphinx-dialog-title").textContent = title;
      byId("sphinx-dialog-description").textContent = description;
      byId("sphinx-dialog").showModal();
    });
  });
  byId("credits-open").addEventListener("click", () =>
    byId("credits-dialog").showModal(),
  );
}

function initEngineering() {
  const tabs = [...document.querySelectorAll('.engineering-tabs [role="tab"]')];
  const selectTab = (selected) => {
    tabs.forEach((tab) => {
      const active = tab === selected;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      byId(tab.getAttribute("aria-controls")).hidden = !active;
    });
    window.ScrollTrigger?.refresh();
  };
  tabs.forEach((tab, index) => {
    byId(tab.getAttribute("aria-controls")).hidden = index !== 0;
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (e) => {
      let next;
      if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = tabs.length - 1;
      if (next !== undefined) {
        e.preventDefault();
        selectTab(tabs[next]);
        tabs[next].focus();
      }
    });
  });
  const toggle = byId("orion-toggle");
  toggle.addEventListener("click", () => {
    const active = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", String(active));
    toggle.querySelector("span").textContent = active
      ? "Ocultar Órion"
      : "Observar Órion";
    byId("orion-comparison").hidden = !active;
    const stars = document.querySelector(".orion-stars");
    if (window.gsap && !reduced())
      window.gsap.to(stars, {
        opacity: active ? 1 : 0,
        duration: 0.7,
        overwrite: true,
      });
    else stars.style.opacity = active ? "1" : "0";
    window.ScrollTrigger?.refresh();
  });
}

async function start() {
  icons();
  initNavigation();
  initDialogs();
  initEngineering();
  document.querySelectorAll("img").forEach((img) => {
    const unavailable = () => img.parentElement.classList.add("media-fallback");
    img.addEventListener("error", unavailable, { once: true });
    if (img.complete && img.naturalWidth === 0) unavailable();
  });
  try {
    await initMap();
  } catch (error) {
    console.error("Mapa indisponível:", error);
    byId("giza-map").innerHTML =
      '<p class="map-loading">O mapa não pôde carregar. Consulte as descrições históricas nas seções abaixo ou recarregue a página.</p>';
  }
  icons();
  await document.fonts.ready;
  const cleanup = initAnimations();
  addEventListener("pagehide", () => cleanup(), { once: true });
  addEventListener("pageshow", (e) => {
    if (e.persisted) location.reload();
  });
}
if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", start, { once: true });
else start();
