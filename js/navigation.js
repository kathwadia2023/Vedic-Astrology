import { CONFIG } from "./config.js";
export function initNav() {
  const t = document.querySelector(".nav-toggle"), n = document.getElementById("nav");
  t?.addEventListener("click", () => t.setAttribute("aria-expanded", n.classList.toggle("open")));
  document.addEventListener("keydown", e => { if (e.key === "Escape" && n.classList.contains("open")) { n.classList.remove("open"); t.setAttribute("aria-expanded", false); t.focus(); } });
  document.querySelectorAll("[data-cfg]").forEach(el => { const v = CONFIG[el.dataset.cfg]; if (v) el.textContent = v; });
  document.querySelectorAll("[data-call]").forEach(a => CONFIG.phoneTel ? a.href = "tel:" + CONFIG.phoneTel : a.addEventListener("click", e => e.preventDefault()));
  document.querySelectorAll("[data-wa]").forEach(a => CONFIG.whatsapp ? a.href = "https://wa.me/" + CONFIG.whatsapp : a.addEventListener("click", e => e.preventDefault()));
}
