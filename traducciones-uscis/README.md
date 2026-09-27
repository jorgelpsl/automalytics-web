# Traducciones certificadas para USCIS

Landing page (Next.js + React + Tailwind) for a Spanish → English certified translation service for USCIS filings. Quote requests are handed off to WhatsApp with the details already written.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Before publishing

All business details live in `src/data/site.ts`. The name is final ("Certa Traducciones"); these are still provisional:

- `whatsappNumber` — defaults to Automalytics' number; set `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- `url` — set `NEXT_PUBLIC_SITE_URL` to the real domain (used for canonical, OG and sitemap).
- `email` — `null` hides it.
- `pricePerPage` — `null` shows "Cotización sin costo"; a number turns on the live estimate in the quote form and the FAQ answer.
- `turnaround` — `null` makes the FAQ say the turnaround is confirmed when quoting.

The requirements section quotes 8 CFR § 103.2(b)(3). The footer and FAQ state the service is not affiliated with USCIS — keep that.
