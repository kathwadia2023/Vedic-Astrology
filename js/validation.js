const rules = {
  required: v => v.trim() !== "" || "This field is required.",
  phone: v => /^[6-9]\d{9}$/.test(v.replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "")) || "Enter a valid 10-digit Indian mobile number.",
  email: v => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || "Enter a valid email address.",
  pin: v => /^[1-9]\d{5}$/.test(v) || "Enter a valid 6-digit PIN code.",
  dob: v => { const d = new Date(v); return (!isNaN(d) && d <= new Date() && d.getFullYear() >= 1900) || "Enter a valid date of birth that is not in the future."; },
  checked: (v, el) => el.checked || "Please accept to continue."
};
export function validateField(el) {
  const kinds = (el.dataset.v || "").split(" ").filter(Boolean);
  if (el.required && !kinds.includes("checked")) kinds.unshift("required");
  let msg = "";
  for (const k of kinds) { const r = rules[k](el.value || "", el); if (r !== true) { msg = r; break; } }
  el.setAttribute("aria-invalid", msg ? "true" : "false");
  const out = document.getElementById(el.id + "-err"); if (out) out.textContent = msg;
  return !msg;
}
export function validateForm(form) {
  let first = null;
  form.querySelectorAll("input,select,textarea").forEach(el => { if ((el.dataset.v || el.required) && !validateField(el) && !first) first = el; });
  if (first) first.focus();
  return !first;
}
