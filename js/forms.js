import { CONFIG } from "./config.js";
import { validateField, validateForm } from "./validation.js";
/* Data goes in a POST JSON body only – never in the URL, never to analytics. */
async function send(type, payload) {
  if (CONFIG.demoMode || !CONFIG.apiBase) return { demo: true };
  const res = await fetch(CONFIG.apiBase + CONFIG.endpoints[type], { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), credentials: "omit" });
  if (!res.ok) throw new Error("Server responded " + res.status);
  return res.json().catch(() => ({}));
}
export function initForms() {
  document.querySelectorAll("form[data-form]").forEach(form => {
    const status = form.querySelector(".status"), btn = form.querySelector("button[type=submit]"), label = btn.textContent;
    form.addEventListener("focusout", e => { if (e.target.matches("[data-v],[required]")) validateField(e.target); });
    form.addEventListener("submit", async e => {
      e.preventDefault(); status.hidden = true; status.className = "status";
      if (form.elements.website.value) return;   // honeypot
      if (!validateForm(form)) return;
      const data = Object.fromEntries(new FormData(form)); delete data.website;
      btn.disabled = true; btn.textContent = "Sending…";
      try {
        const r = await send(form.dataset.form, data); status.hidden = false;
        if (r.demo) { status.classList.add("bad"); status.textContent = "Demo mode: this enquiry was NOT sent. Set a backend in js/config.js to receive real enquiries."; }
        else { status.classList.add("ok"); status.textContent = "Thank you. Your enquiry has been received and Pandit Ji's team will contact you to confirm. " + CONFIG.payment.note; form.reset(); }
      } catch { status.hidden = false; status.classList.add("bad"); status.textContent = "Your enquiry could not be sent. Please try again or call Pandit Ji directly."; }
      finally { btn.disabled = false; btn.textContent = label; }
    });
  });
}
