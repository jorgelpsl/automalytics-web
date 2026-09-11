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
- No real photo files are available yet: 6 real Instagram photos (nail art, a "LIFTING" cejas/pestañas educational graphic, logo/badge) were shown in chat but could not be saved to disk in this environment. The current build substitutes CSS/SVG color-swatch visuals instead of fabricated photos.
- Prices and exact street address are explicit placeholders (`$xxxxx`, `xxxxx`) per the prospect owner's own instruction — these must stay visibly placeholder, never replaced with invented realistic-looking numbers.
- The WhatsApp number currently wired into the demo is Automalytics' own number (a stand-in for the demo), not the prospect's real business number.
- The real, verifiable Instagram handle (@tuespacio_mujerbonita) is used and linked as the only social proof — no fabricated ratings, review counts, or client counts.

## Brand Commitments

Real brand evidence seen (not saved as files, described here for the record):
- Deep green background with a gold/bronze geometric emblem (thin interlocking-triangle/diamond line art).
- Italic serif script wordmark "Mujer bonita" + small-caps sans tagline "espacio de belleza".
- A circular badge variant of the logo with a pink → orange → gold ring border.
- Two real service categories confirmed: uñas (manicure, esculpidas, diseño/nail art) and lifting de cejas y pestañas. No other services are confirmed.
- Real marketing copy from the business's own "LIFTING" story graphic: "Realza la mirada", "No necesitas rímel", "Larga duración", "Resultado natural" — reused verbatim in the current build since it is the business's own claim, not Automalytics' invention.

The current implementation approximates the emblem with an original SVG monogram (not a pixel copy) and uses Playfair Display italic + Manrope on a green/gold/coral palette. Treat this as an evidence-grounded but non-final visual system — open to replacement in a redesign as long as the confirmed real facts above (colors, wordmark style, the two service categories, the real copy) are preserved or deliberately superseded with the user's approval.

## Evidence on Hand

- 6 real photos shown in chat (not on disk): nude glazed almond nails with a thin gold band; pink glitter ombré with white french tip; burgundy french tip with a small white dot design; a "LIFTING" educational graphic (cejas/pestañas) with the real copy quoted above; the square logo lockup; the circular badge logo.
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
