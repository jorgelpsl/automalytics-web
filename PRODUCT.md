# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences on this surface:
- The salon owner behind Instagram @tuespacio_mujerbonita ("Mujer bonita — espacio de belleza"), a real prospect evaluating whether to hire Automalytics. She is the one who will actually open this page and decide.
- Her end clients (women in Chile booking uñas, lifting de cejas, lifting de pestañas), who are the ones who would use the booking flow if she adopts it.

## Product Purpose

`demo/mujerbonita.html` is a sales-demo landing page Automalytics built to pitch this specific prospect: it shows a live, self-serve appointment-booking flow (service → day → time → WhatsApp handoff) instead of just describing one. Success = the prospect sees it as a real, usable tool for her business and decides to work with Automalytics.

## Positioning

The differentiator is that the booking capability is demonstrated live in the hero itself (a real "next available slots" widget generated from the current date), not promised in copy. Competing pitches describe a feature; this one lets the visitor use it immediately.

## Operating Context

- The prospect currently has no website; her Instagram is the whole online presence, and scheduling happens through Instagram DMs/comments.
- The page is static (no backend, no build step) and lives inside Automalytics' own site at `/demo/mujerbonita.html`, linked from the main site's "Casos" section — same convention as the other demo pages (`gimnasio.html`, `dental.html`, `veterinaria.html`, `mundomania.html`).
- The real confirmation channel is WhatsApp; the booking widget's final step opens a prefilled `wa.me` message rather than submitting to any server.

## Capabilities and Constraints

- Plain HTML/CSS/vanilla JS only, no framework, no dependencies — matches every other demo in this repo.
- Real photo files ARE now on disk under `assets/demo-mujerbonita/` (recovered from the session transcript's base64 attachments, converted to WebP): `logo-badge.webp`, `trabajo-marmolado.webp`, `trabajo-floral.webp`, `trabajo-glitter.webp`, `estilo-guia.webp`, `espacio.webp`, `local-sign.webp` (unused so far). A middle batch of 4 photos (nude glazed nails, a pink glitter french, the real "LIFTING" graphic, a burgundy french) was shown in chat but never landed in the transcript and remains unrecoverable — the lifting section still uses the business's own quoted copy without a matching photo.
- Prices and exact street address are explicit placeholders (`$xxxxx`, `xxxxx`) per the prospect owner's own instruction — these must stay visibly placeholder, never replaced with invented realistic-looking numbers.
- The WhatsApp number currently wired into the demo is Automalytics' own number (a stand-in for the demo), not the prospect's real business number.
- The real, verifiable Instagram handle (@tuespacio_mujerbonita) is used and linked as the only social proof — no fabricated ratings, review counts, or client counts.

## Brand Commitments

Real brand evidence, now backed by actual files in `assets/demo-mujerbonita/`:
- `logo-badge.webp` is the real logo: deep green ground, a solid green interlocking-triangle/diamond emblem, italic script wordmark "Mujer bonita", small-caps "espacio de belleza", inside a circular badge with a pink → orange → gold ring border. Used as the nav/footer mark (clipped to a circle via CSS to drop the source photo's black corners).
- Two real service categories confirmed: uñas (manicure, esculpidas, diseño/nail art) and lifting de cejas y pestañas. No other services are confirmed.
- Real marketing copy from the business's own "LIFTING" story graphic: "Realza la mirada", "No necesitas rímel", "Larga duración", "Resultado natural" — reused verbatim since it is the business's own claim, not Automalytics' invention.
- `espacio.webp` shows the real reception counter: marble surface, the green wall-mounted logo sign, and retail Vidaluz home-fragrance products — the business is a bit more "boutique retail" than a nails-only shop, reflected in the Vitrina section's "Nuestro espacio" block.

Typography (Playfair Display italic + Manrope) and the green/gold/coral palette are Automalytics' own recreation choice, grounded in but not a pixel copy of the real logo's colors — open to further refinement with the user's approval.

## Evidence on Hand

- Real photo files on disk (`assets/demo-mujerbonita/`): the logo badge; marmolado nails with gems; floral nail art with pearls; glitter ombré with white french tip; the "¿Qué forma de uña va mejor con vos?" guide graphic; the reception-counter/Vidaluz photo.
- Real, verifiable Instagram: https://www.instagram.com/tuespacio_mujerbonita/
- No testimonials, review counts, client counts, years-in-business, or awards exist for this business — none may be invented for this surface.

## Product Principles

1. Prove the booking capability live in the page — a working "next available slots" widget beats a claim about one.
2. A placeholder stays a visible placeholder (`xxxxx`) until the real client supplies the fact; never invent a realistic-looking substitute.
3. Reuse the business's own real language and imagery when available; anything else on the page is clearly Automalytics' own design proposal, not the client's established brand truth.
4. The page must work as a genuinely usable booking tool if adopted as-is, not just read well as a mockup.
5. Keep this page's identity distinct from Automalytics' other demo pages (gimnasio, dental, veterinaria, mundomania) — each demo owns its own visual world.

## Accessibility & Inclusion

No product-specific requirement beyond Automalytics' house baseline (semantic HTML, keyboard operability, visible focus, sufficient contrast — see the repo's `CLAUDE.md`).
