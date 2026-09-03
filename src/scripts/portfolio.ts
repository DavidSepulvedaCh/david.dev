import { formatDuration, yearsSince } from "@/lib/dates";
import type { Lang } from "@/i18n/ui";

const docLang: Lang =
  document.documentElement.lang === "en" ? "en" : "es";

/* ===== Tabs ===== */
const tabs = document.querySelectorAll<HTMLButtonElement>(".v2-tab");
const panels = document.querySelectorAll<HTMLElement>(".v2-panel");
const indicator = document.querySelector<HTMLElement>(".v2-tab-indicator");
const tabIds = Array.from(tabs).map((t) => t.dataset.tab!);

function moveIndicator(target: HTMLElement) {
  if (!indicator) return;
  const parent = target.parentElement;
  const padLeft = parent
    ? parseFloat(getComputedStyle(parent).paddingLeft) || 0
    : 0;
  indicator.style.width = `${target.offsetWidth}px`;
  indicator.style.transform = `translateX(${target.offsetLeft - padLeft}px)`;
}

function ensureTabVisible(target: HTMLElement) {
  const parent = target.parentElement;
  if (!parent) return;
  if (parent.scrollWidth <= parent.clientWidth) return;
  const left = target.offsetLeft;
  const right = left + target.offsetWidth;
  const viewLeft = parent.scrollLeft;
  const viewRight = viewLeft + parent.clientWidth;
  if (left < viewLeft || right > viewRight) {
    parent.scrollTo({
      left: left + target.offsetWidth / 2 - parent.clientWidth / 2,
      behavior: "smooth",
    });
  }
}

function activate(name: string) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === name;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    // Roving tabindex: solo la pestaña activa entra en el orden de tabulación
    tab.tabIndex = isActive ? 0 : -1;
    if (isActive) {
      moveIndicator(tab);
      ensureTabVisible(tab);
    }
  });
  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === name);
  });
}

/* El idioma se cambia con un enlace; el hash conserva la pestaña abierta. */
const langLinks =
  document.querySelectorAll<HTMLAnchorElement>("[data-lang-link]");

function syncLangSwitch() {
  langLinks.forEach((a) => {
    a.href = a.href.split("#")[0] + location.hash;
  });
}

function selectTab(name: string, focus = false) {
  activate(name);
  history.replaceState(null, "", `#${name}`);
  syncLangSwitch();
  if (focus) {
    document.querySelector<HTMLButtonElement>(`[data-tab="${name}"]`)?.focus();
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => selectTab(tab.dataset.tab!));

  // Patrón ARIA de tablist: flechas, Home y End
  tab.addEventListener("keydown", (e) => {
    const i = tabIds.indexOf(tab.dataset.tab!);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabIds.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabIds.length) % tabIds.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabIds.length - 1;
    if (next < 0) return;
    e.preventDefault();
    selectTab(tabIds[next], true);
  });
});

// Abre la pestaña del hash (p. ej. al cambiar de idioma) y coloca el indicador
requestAnimationFrame(() => {
  const fromHash = location.hash.slice(1);
  if (tabIds.includes(fromHash)) activate(fromHash);
  syncLangSwitch();
  const active = document.querySelector<HTMLElement>(".v2-tab.is-active");
  if (active) moveIndicator(active);
});

window.addEventListener("resize", () => {
  const active = document.querySelector<HTMLElement>(".v2-tab.is-active");
  if (active) moveIndicator(active);
});

/* ===== Tema (menú: claro / oscuro / sistema) ===== */
const themeBtn = document.getElementById("v2-theme-toggle");
const themeMenu = document.getElementById("v2-theme-menu");
const themeOptions =
  themeMenu?.querySelectorAll<HTMLButtonElement>(".v2-theme-option");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
type Pref = "light" | "dark" | "system";

const labelMap: Record<Pref, Record<Lang, string>> = {
  light: { es: "Tema: claro", en: "Theme: light" },
  dark: { es: "Tema: oscuro", en: "Theme: dark" },
  system: { es: "Tema: sistema", en: "Theme: system" },
};

function resolve(pref: Pref): "light" | "dark" {
  if (pref === "system") return systemDark.matches ? "dark" : "light";
  return pref;
}

function applyPref(pref: Pref) {
  const resolved = resolve(pref);
  document.documentElement.setAttribute("data-v2-theme", resolved);
  document.documentElement.setAttribute("data-v2-theme-pref", pref);
  localStorage.setItem("v2-theme-pref", pref);
  const label = labelMap[pref][docLang];
  themeBtn?.setAttribute("aria-label", label);
  themeBtn?.setAttribute("title", label);
  themeOptions?.forEach((o) =>
    o.setAttribute("aria-checked", String(o.dataset.pref === pref))
  );
}

function openMenu() {
  if (!themeMenu || !themeBtn) return;
  themeMenu.hidden = false;
  requestAnimationFrame(() => themeMenu.classList.add("is-open"));
  themeBtn.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  if (!themeMenu || !themeBtn) return;
  themeMenu.classList.remove("is-open");
  themeBtn.setAttribute("aria-expanded", "false");
  // Wait for transition before hiding to keep it focusable while animating
  setTimeout(() => {
    if (themeBtn.getAttribute("aria-expanded") === "false") {
      themeMenu.hidden = true;
    }
  }, 180);
}

const initialPref =
  (localStorage.getItem("v2-theme-pref") as Pref | null) || "system";
applyPref(initialPref);

themeBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  const expanded = themeBtn.getAttribute("aria-expanded") === "true";
  expanded ? closeMenu() : openMenu();
});

themeOptions?.forEach((opt) => {
  opt.addEventListener("click", (e) => {
    e.stopPropagation();
    const pref = opt.dataset.pref as Pref | undefined;
    if (pref) applyPref(pref);
    closeMenu();
    themeBtn?.focus();
  });
});

document.addEventListener("click", (e) => {
  if (!themeMenu || themeMenu.hidden) return;
  const target = e.target as Node;
  if (!themeMenu.contains(target) && target !== themeBtn) closeMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && themeBtn?.getAttribute("aria-expanded") === "true") {
    closeMenu();
    themeBtn.focus();
  }
});

// Follow OS changes when the user is on "system"
systemDark.addEventListener("change", () => {
  const pref =
    (document.documentElement.getAttribute("data-v2-theme-pref") as Pref) ||
    "system";
  if (pref === "system") applyPref("system");
});

/* ===== Tilt 3D suave en service cards ===== */
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (!reduceMotion && finePointer) {
  document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rx = (0.5 - y) * 2.5;
      const ry = (x - 0.5) * 2.5;
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-1px)`;
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

/* ===== Duración de experiencia en tiempo real ===== */
function updateDurations() {
  document.querySelectorAll<HTMLElement>(".v2-duration").forEach((el) => {
    const start = el.dataset.start;
    if (!start) return;
    el.textContent = formatDuration(start, el.dataset.end || null, docLang);
  });
  document.querySelectorAll<HTMLElement>("[data-years-since]").forEach((el) => {
    const start = el.dataset.yearsSince;
    if (!start) return;
    el.textContent = `${yearsSince(start)}+`;
  });
}
updateDurations();
// Recomputa cada hora por si la página queda abierta
setInterval(updateDurations, 60 * 60 * 1000);

/* ===== Portfolio filter ===== */
const filters = document.querySelectorAll<HTMLButtonElement>(".v2-filter");
const items = document.querySelectorAll<HTMLElement>(".v2-project");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const f = btn.dataset.filter;
    items.forEach((it) => {
      it.style.display = f === "all" || it.dataset.cat === f ? "" : "none";
    });
  });
});
