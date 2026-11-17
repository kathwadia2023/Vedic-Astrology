/* Single place for frequently changing business details. Edit values here only. */
export const CONFIG = {
  brandName: "[BRAND NAME – to be confirmed]",
  panditName: "Pandit Shri Udailal Ji Vyas",
  phoneDisplay: "[PHONE NUMBER]",
  phoneTel: "",              // e.g. "+919XXXXXXXXX" – leave empty until confirmed
  whatsapp: "",              // digits with country code, e.g. "919XXXXXXXXX"
  email: "[EMAIL – optional]",
  address: "[OFFICE / CONSULTATION ADDRESS]",
  hours: "[WORKING HOURS – to be confirmed]",
  apiBase: "",               // e.g. "https://api.yourdomain.in" once the FastAPI backend exists
  demoMode: true,            // true = nothing is sent; the user sees a clear "demo" notice
  endpoints: { kundli: "/api/enquiries/kundli", matching: "/api/enquiries/matching", appointment: "/api/enquiries/appointment" },
  captcha: { provider: "none", siteKey: "" },   // public site key only, never secrets
  payment: { mode: "manual", upiQrImage: "", note: "Payment details will be shared after enquiry confirmation." }
};
