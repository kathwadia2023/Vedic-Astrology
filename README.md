# Handwritten Vedic Kundli website (static HTML/CSS/vanilla JS)

## Run locally
    python3 build.py            # regenerates the 7 pages, sitemap.xml, robots.txt
    python3 -m http.server 8000 # open http://localhost:8000
(ES modules need a server; opening files directly will not run the JS.)

## Edit content
- Business details (phone, WhatsApp, email, address, hours): `js/config.js`
- Page copy: `build.py` (placeholders show as yellow `[...]` boxes so none can be mistaken for real content)
- Before launch: set `BASE_URL` and `CLEAN_URLS = True` in `build.py` (host must rewrite `/about` to `about.html`), then rebuild.

## Forms (demo mode by default)
Forms validate in the browser, then call `forms.js`. With `demoMode: true` nothing is sent and the user sees a clear
"NOT sent" notice, never a fake success. To go live:
1. Build a FastAPI backend with `POST /api/enquiries/kundli|matching|appointment` accepting the JSON body (field names = form input names).
2. Backend: verify captcha token, rate-limit, store securely, email Pandit Ji, enable CORS for your domain only, HTTPS only.
3. In `js/config.js` set `apiBase` and `demoMode: false`. No secrets ever go in frontend code. Birth details are sent in the POST body only, never URLs or analytics.

## Payments
None collected online. Forms state "Payment details will be shared after enquiry confirmation." `config.payment` is ready for a UPI QR image,
bank-transfer instructions, or a Razorpay order created by the backend later.

## Still needed from the client
Brand name; phone/WhatsApp/email; office address, service area and hours; verified biography of Late Pandit Nathulal Ji and the family timeline;
Pandit Ji's qualifications, experience, expertise and message; Kundli inclusions, price, delivery charges and turnaround; whether Guna Milan is offered;
real testimonials (with consent); photographs (heritage, handwritten Kundlis, manuscripts, portraits) and any media/event photos with permission;
social links; privacy policy and terms; UPI QR (optional); domain; OG image (`assets/images/og-image.jpg`).

## Not yet done
Real photos (use WebP/AVIF with width/height + `loading="lazy"`), privacy.html/terms.html pages, LocalBusiness schema (only after address/hours confirmed),
Lighthouse and cross-browser testing on the deployed site, captcha widget.
