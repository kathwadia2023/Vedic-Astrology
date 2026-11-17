export function initGallery() {
  const items = [...document.querySelectorAll(".masonry figure")]; if (!items.length) return;
  const dlg = document.getElementById("lb"), body = dlg.querySelector(".lb-body"), cap = dlg.querySelector(".lb-cap");
  let i = 0, opener = null; const vis = () => items.filter(f => !f.hidden);
  const show = n => { const v = vis(); i = (n + v.length) % v.length; body.innerHTML = v[i].querySelector("button").innerHTML; cap.textContent = v[i].querySelector("figcaption").textContent; };
  items.forEach(f => f.querySelector("button").addEventListener("click", e => { opener = e.currentTarget; show(vis().indexOf(f)); dlg.showModal(); }));
  dlg.querySelector("[data-prev]").onclick = () => show(i - 1); dlg.querySelector("[data-next]").onclick = () => show(i + 1);
  dlg.querySelector("[data-close]").onclick = () => dlg.close(); dlg.addEventListener("close", () => opener?.focus());
  dlg.addEventListener("keydown", e => { if (e.key === "ArrowLeft") show(i - 1); if (e.key === "ArrowRight") show(i + 1); });
  document.querySelectorAll(".filters button").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach(x => x.setAttribute("aria-pressed", x === b));
    items.forEach(f => f.hidden = b.dataset.cat !== "all" && f.dataset.cat !== b.dataset.cat);
  }));
}
