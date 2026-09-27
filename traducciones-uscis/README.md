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
