import { mapPoints } from "./historical-data.js";

const icons = {
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  reset: '<path d="M3 9a9 9 0 1 1 1.9 9.1M3 4v5h5"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
};
const icon = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">${icons[name]}</svg>`;

/** Start the self-contained, keyboard-accessible north-up atlas. */
export async function initMap() {
  const root = document.getElementById("giza-map");
  if (!root || root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  root.innerHTML = `
    <div class="map-atlas">
      <div class="map-sheet">
        <div class="map-toolbar" role="group" aria-label="Enquadramento do mapa">
          <span class="map-toolbar-label">EXPLORAR O PLANALTO</span>
          <div class="map-controls">
            <button type="button" data-map-control="out" aria-label="Diminuir zoom">${icon("minus")}</button>
            <output class="map-zoom" aria-label="Nível de zoom">100%</output>
            <button type="button" data-map-control="in" aria-label="Aumentar zoom">${icon("plus")}</button>
            <button type="button" data-map-control="reset" aria-label="Restaurar visão geral" title="Visão geral">${icon("reset")}</button>
          </div>
        </div>
        <div class="map-viewport" tabindex="0" aria-label="Mapa de Gizé. Use os marcadores ou a lista de lugares. As setas movem o mapa quando ampliado; mais e menos controlam o zoom.">
          <div class="map-canvas">
            <div class="map-artwork" aria-hidden="true"></div>
            ${mapPoints.map((point) => `<button class="map-marker" type="button" data-map-point="${point.id}" style="--point-x:${point.x / 12}%;--point-y:${point.y / 9}%" aria-label="${point.id}. ${point.name}" aria-haspopup="dialog" aria-controls="map-detail" aria-pressed="false"><span>${point.id}</span><span class="map-marker-tooltip" aria-hidden="true">${point.shortName}</span></button>`).join("")}
          </div>
          <span class="map-drag-hint" aria-hidden="true">SELECIONE UM LUGAR PARA APROXIMAR</span>
        </div>
        <div class="map-legend" aria-label="Legenda do mapa">
          <span><i class="map-legend-stone"></i>Monumentos e vestígios</span>
          <span><i class="map-legend-water"></i>Área aquática interpretativa</span>
          <button class="map-overview" type="button" data-map-control="reset">VISÃO GERAL <span aria-hidden="true">↗</span></button>
        </div>
        <p class="map-cartographic-note">Esquema histórico, com norte para cima. Posições relativas; dimensões e contornos simplificados. A faixa aquática não delimita um canal ou porto.</p>
      </div>
      <nav class="map-index" aria-label="Lugares do complexo de Gizé">
        <p class="map-index-kicker">OITO LUGARES. UMA HISTÓRIA.</p>
        <ol>${mapPoints.map((point) => `<li><button type="button" data-map-point="${point.id}" aria-haspopup="dialog" aria-controls="map-detail" aria-pressed="false"><span class="map-index-number">${String(point.id).padStart(2, "0")}</span><span class="map-index-name">${point.shortName}</span><span class="map-index-arrow" aria-hidden="true">↗</span></button></li>`).join("")}</ol>
        <p class="map-index-footnote">Da arquitetura real ao cotidiano de quem a construiu.</p>
      </nav>
    </div>
    <p class="map-announcement" role="status" aria-live="polite"></p>
    <dialog class="map-detail" id="map-detail" aria-labelledby="map-detail-title" aria-describedby="map-detail-description">
      <button class="map-detail-close" type="button" aria-label="Fechar informações do lugar" autofocus>${icon("close")}</button>
      <div class="map-detail-content"></div>
    </dialog>`;

  const canvas = root.querySelector(".map-canvas");
  const viewport = root.querySelector(".map-viewport");
  const art = root.querySelector(".map-artwork");
  const dialog = root.querySelector(".map-detail");
  const content = root.querySelector(".map-detail-content");
  const announcement = root.querySelector(".map-announcement");
  const zoomOutput = root.querySelector(".map-zoom");
  let camera = { zoom: 1, x: 0, y: 0 };
  let activePoint = null;
  let returnFocus = null;
  let dragging = null;
  let dragged = false;

  function bounds() {
    const { width, height } = viewport.getBoundingClientRect();
    camera.x = Math.max(
      (-width * (camera.zoom - 1)) / 2,
      Math.min((width * (camera.zoom - 1)) / 2, camera.x),
    );
    camera.y = Math.max(
      (-height * (camera.zoom - 1)) / 2,
      Math.min((height * (camera.zoom - 1)) / 2, camera.y),
    );
  }

  function renderCamera(animate = true) {
    bounds();
    const duration = animate && !reducedMotion.matches ? 0.7 : 0;
    canvas.style.setProperty("--map-scale", camera.zoom);
    if (window.gsap) {
      window.gsap.to(canvas, {
        x: camera.x,
        y: camera.y,
        scale: camera.zoom,
        duration,
        ease: "power3.out",
        overwrite: true,
      });
    } else {
      canvas.style.transition = duration
        ? "transform 700ms cubic-bezier(.22,1,.36,1)"
        : "none";
      canvas.style.transform = `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`;
    }
    zoomOutput.textContent = `${Math.round(camera.zoom * 100)}%`;
    root.querySelector('[data-map-control="out"]').disabled = camera.zoom <= 1;
    root.querySelector('[data-map-control="in"]').disabled = camera.zoom >= 3;
  }

  function highlight(point) {
    root.querySelectorAll("[data-map-point]").forEach((button) => {
      const selected = Number(button.dataset.mapPoint) === point?.id;
      button.setAttribute("aria-pressed", String(selected));
      button.classList.toggle("is-active", selected);
    });
    root
      .querySelectorAll("[data-landmark]")
      .forEach((landmark) =>
        landmark.classList.toggle(
          "is-active",
          landmark.dataset.landmark === point?.key,
        ),
      );
  }

  function focusRegion(point) {
    const { width, height } = viewport.getBoundingClientRect();
    camera.zoom = 1.55;
    camera.x = (0.5 - point.x / 1200) * width * camera.zoom;
    camera.y = (0.5 - point.y / 900) * height * camera.zoom;
    renderCamera();
  }

  function select(point, trigger) {
    if (!point) return;
    activePoint = point;
    returnFocus = trigger;
    highlight(point);
    focusRegion(point);
    content.innerHTML = `
      ${point.image ? `<figure class="map-detail-image"><img src="${point.image}" alt="${point.imageAlt}" loading="lazy" width="1000" height="667"><figcaption>${point.imageCaption}</figcaption></figure>` : '<div class="map-detail-rule" aria-hidden="true"></div>'}
      <div class="map-detail-text">
        <p class="map-detail-kicker"><span>${String(point.id).padStart(2, "0")}</span> ${point.era}</p>
        <h3 id="map-detail-title">${point.name}</h3>
        <p class="map-detail-subtitle">${point.transliteration}</p>
        ${point.interpretation ? '<p class="map-interpretation">RECONSTRUÇÃO INTERPRETATIVA · NÃO É UM LEVANTAMENTO</p>' : ""}
        <p id="map-detail-description">${point.description}</p>
        <p>${point.detail}</p>
        <dl class="map-detail-fact"><dt>${point.factLabel}</dt><dd>${point.fact}</dd></dl>
        <div class="map-detail-sources"><span>CONTINUE A EXPLORAÇÃO</span>${point.sources.map((source) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.label} ${icon("arrow")}<span class="sr-only"> (abre em uma nova aba)</span></a>`).join("")}</div>
      </div>`;
    content.querySelector("img")?.addEventListener(
      "error",
      (event) => {
        event.target.closest("figure").hidden = true;
      },
      { once: true },
    );
    announcement.textContent = `Lugar ${point.id}: ${point.name}.`;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    dialog.querySelector(".map-detail-close").focus({ preventScroll: true });
  }

  root.querySelectorAll("[data-map-point]").forEach((button) =>
    button.addEventListener("click", () => {
      if (dragged) return;
      select(
        mapPoints.find((point) => point.id === Number(button.dataset.mapPoint)),
        button,
      );
    }),
  );

  function reset() {
    activePoint = null;
    highlight(null);
    camera = { zoom: 1, x: 0, y: 0 };
    renderCamera();
    announcement.textContent = "Visão geral do planalto restaurada.";
  }

  function zoom(direction) {
    const oldZoom = camera.zoom;
    camera.zoom = Math.max(1, Math.min(3, camera.zoom + direction * 0.3));
    camera.x *= camera.zoom / oldZoom;
    camera.y *= camera.zoom / oldZoom;
    renderCamera();
  }

  root.querySelectorAll("[data-map-control]").forEach((button) =>
    button.addEventListener("click", () => {
      if (button.dataset.mapControl === "reset") reset();
      else zoom(button.dataset.mapControl === "in" ? 1 : -1);
    }),
  );

  dialog
    .querySelector(".map-detail-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  });
  dialog.addEventListener("close", () =>
    returnFocus?.focus({ preventScroll: true }),
  );

  viewport.addEventListener("keydown", (event) => {
    if (event.target !== viewport) return;
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      zoom(1);
    } else if (event.key === "-") {
      event.preventDefault();
      zoom(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      reset();
    } else if (
      camera.zoom > 1 &&
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
    ) {
      event.preventDefault();
      camera.x +=
        event.key === "ArrowLeft" ? 45 : event.key === "ArrowRight" ? -45 : 0;
      camera.y +=
        event.key === "ArrowUp" ? 45 : event.key === "ArrowDown" ? -45 : 0;
      renderCamera();
    }
  });

  // Pointer dragging is offered on desktop. Touch keeps normal page scrolling;
  // touch exploration is fully available through marker, list and zoom buttons.
  viewport.addEventListener("pointerdown", (event) => {
    if (
      event.pointerType === "touch" ||
      event.button !== 0 ||
      event.target.closest("button") ||
      camera.zoom <= 1
    )
      return;
    dragged = false;
    dragging = {
      x: event.clientX,
      y: event.clientY,
      startX: camera.x,
      startY: camera.y,
      id: event.pointerId,
    };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add("is-dragging");
  });
  viewport.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const dx = event.clientX - dragging.x;
    const dy = event.clientY - dragging.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) dragged = true;
    camera.x = dragging.startX + dx;
    camera.y = dragging.startY + dy;
    renderCamera(false);
  });
  function endDrag() {
    dragging = null;
    viewport.classList.remove("is-dragging");
    // Click is dispatched before the next rendering frame.
    requestAnimationFrame(() => {
      dragged = false;
    });
  }
  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);

  const observer = new ResizeObserver(() => {
    if (activePoint) focusRegion(activePoint);
    else renderCamera(false);
  });
  observer.observe(viewport);

  try {
    const response = await fetch(
      new URL("../assets/svg/giza-map.svg", import.meta.url),
    );
    if (!response.ok) throw new Error(`Map ${response.status}`);
    art.innerHTML = await response.text();
    highlight(activePoint);
  } catch {
    // Media fallback retains the topology, controls and all eight descriptions.
    art.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" aria-hidden="true"><rect width="1200" height="900" fill="#eadfc8"/>${mapPoints
      .filter((point) => ["khufu", "khafre", "menkaure"].includes(point.key))
      .map(
        (point) =>
          `<path data-landmark="${point.key}" d="M${point.x - 65} ${point.y - 65}h130v130h-130Z" fill="#cbb58b" stroke="#9b825b"/><path d="M${point.x - 65} ${point.y - 65}l65 65 65-65" fill="#e4d1a8"/>`,
      )
      .join(
        "",
      )}<text x="1050" y="115" font-size="35" fill="#655a46">↑ N</text><text x="85" y="845" font-size="22" fill="#655a46">ESQUEMA DO PLANALTO · POSIÇÕES RELATIVAS</text></svg>`;
    announcement.textContent =
      "Ilustração detalhada indisponível. O esquema de posições e as informações continuam disponíveis.";
  }
  renderCamera(false);

  return () => {
    observer.disconnect();
    if (dialog.open) dialog.close();
    window.gsap?.killTweensOf(canvas);
    root.replaceChildren();
    delete root.dataset.initialized;
  };
}
