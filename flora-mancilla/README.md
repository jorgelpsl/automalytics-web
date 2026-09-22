# Flora Mancilla — Psicóloga Clínica

Landing page demo for Flora Mancilla, an independent clinical psychologist in Santiago,
Chile. Built as a standalone Next.js app inside the automalytics-web monorepo, deployed
as its own Vercel project.

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind CSS + lucide-react. Production builds use
`next build --webpack` (see `sensiplaytime/README.md` for why: a Vercel-only Turbopack bug
in `next/font/google` resolution).

## Content & assets

- **Logo** (`public/logo-flora-mancilla.webp`, `public/flora-mark.webp`): background-removed
  from the client-provided logo lockup, processed locally with `rembg` (nothing uploaded to
  a third party).
- **Resource posts** (`public/post-limites.webp`, `public/post-terapia.webp`): the client's
  own existing Instagram graphics, used as-is at their native resolution in the "Recursos"
  section — not stretched into a hero/banner size beyond what their source resolution
  supports.
- **Contact info** (phone, email) is read directly off the provided business card mockup and
  wired through `src/lib/whatsapp.ts`, the single place every WhatsApp deep link is built.
- No testimonials, credentials, certifications, or statistics are shown anywhere — none were
  provided, and none are invented.

## Booking

`src/components/Booking.tsx` is a real, working appointment picker (next 10 business days,
fixed time slots, name + optional note) — but there's no backend or calendar integration
behind it. Confirming opens a pre-filled WhatsApp message to Flora's real number so a human
confirms the actual time. The UI is honest about this ("ningún dato se guarda hasta que
hablemos").

## Development

```
npm install
npm run dev
```

## Production build

```
npm run build   # runs `next build --webpack`
npm run start
```
