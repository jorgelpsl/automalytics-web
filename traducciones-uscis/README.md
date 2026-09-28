# Traducciones certificadas para USCIS

Landing page (Next.js + React + Tailwind) for a Spanish → English certified translation service for USCIS filings. Quote requests are handed off to WhatsApp with the details already written.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Before publishing

All business details live in `src/data/site.ts`: name "Certa Traducciones", volume pricing (1–4 pages USD 30, 5–9 USD 25, 10+ USD 22 per page — the order's tier applies to every page), delivery in 24 to 48 hours, served at `certa.automalytics.com`.

- `whatsappNumber` — still defaults to Automalytics' number; set `NEXT_PUBLIC_WHATSAPP_NUMBER` once the business has its own.
- `email` — `null` hides it.
- `priceTiers` — an empty list would show "Cotización sin costo" instead of the live estimate.
- `turnaround` — `null` would make the FAQ say the turnaround is confirmed when quoting.

The requirements section quotes 8 CFR § 103.2(b)(3). The footer and FAQ state the service is not affiliated with USCIS — keep that.

## Card payments (Stripe)

Off until `STRIPE_SECRET_KEY` is set in the Vercel project (then redeploy, since the home page is static). With it, the quote form adds "Pagar $X con tarjeta": `/api/checkout` re-validates the order and prices it server-side from `priceTiers`, then sends the client to Stripe Checkout. After paying they land on `/pago-recibido`, which confirms the session with Stripe and hands them to WhatsApp with their order code (`CT-XXXXXX`, the `client_reference_id` in Stripe) to send the document photos.

Use a `sk_test_…` key first and pay with card `4242 4242 4242 4242`; switch to `sk_live_…` when it works. The key lives only in Vercel — never in the repo or client code.

## Document uploads and /admin

- **Uploads** turn on when a private Vercel Blob store is connected to the project (`BLOB_STORE_ID` with OIDC, or a legacy `BLOB_READ_WRITE_TOKEN`) and payments are on. After paying, `/pago-recibido` becomes the upload page; `/api/documents` only issues upload tokens for a paid Stripe session and only inside `pedidos/<order code>/`. JPG, PNG, WebP, HEIC or PDF, 20 MB each, up to the pages paid: each photo is one page and PDFs are counted in the browser; the count rides in the file name (`3p-acta.pdf`) and the token route enforces the total. Clients can remove their own files to fix mistakes.
- **/admin** turns on with `ADMIN_PASSWORD` (plus the Blob store). It lists paid orders from Stripe with the client's details and files; files are served only through `/api/admin/file` to a signed-in admin. Changing the password signs everyone out.
- Without these variables the site falls back to sending documents over WhatsApp.

## Owner notifications

With `RESEND_API_KEY` and `NOTIFY_EMAIL` set (and the Blob store), the owner gets an email when an order is paid (sent from `/pago-recibido`) and when a client uploads documents. Small markers under `avisos/` in the Blob store make each email go out once. Resend's shared sender (`onboarding@resend.dev`) only delivers to the Resend account's own address; set `NOTIFY_FROM` after verifying a domain to change it.
