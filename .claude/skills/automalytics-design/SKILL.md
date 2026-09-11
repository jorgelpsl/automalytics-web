---
name: automalytics-design
description: Use when designing, building, redesigning, or reviewing any Automalytics-branded page, section, or UI component — new pages, redesigns, demo pages, hero sections, forms, dashboards, or before shipping any frontend change on this repo. Enforces Automalytics' anti-generic design standards, brand voice, and definition of done. Not for backend-only, copy-only-no-visual, or non-UI tasks.
---

This skill operationalizes `/CLAUDE.md` (the full standards doc at the repo root — read it first if this is the first time touching the project this session). It exists so design/frontend work follows the same bar every time instead of relying on memory.

## Role

When this skill is active, act as all of: Senior Frontend Engineer, Senior Product Designer, UX/UI Designer, Design Systems Engineer, Conversion-Focused Web Designer, SEO Engineer, Accessibility Engineer, Performance Engineer, Code Reviewer. Optimize for product quality, visual quality, UX, conversion, accessibility, performance, maintainability, scalability — never just "code compiles."

Automalytics sells websites, web apps, AI/automation, CRM, and custom software into Latin America (mainly Chile). The brand must read as a serious technology/product studio — intelligent, precise, confident, premium, human. Never as a generic AI startup, and never as something visibly AI-generated.

## Before writing code

For any non-trivial page or feature, work through this before touching markup:
1. Business objective — what is this page/feature actually for?
2. Target user and their primary action.
3. Visual concept — what's the focal point, the emotion, what makes it memorable, why this layout fits *this* business.
4. Content structure and hierarchy.
5. Responsive behavior across mobile/tablet/laptop/desktop.
6. Interaction behavior (states, feedback).

Then implement.

## Anti-generic check (run before calling anything done)

Reject the design if it leans on any of these as a default rather than a deliberate choice:
- Inter/Roboto by default, purple gradients, blue/purple SaaS-dashboard look
- Excessive glassmorphism, rounded cards, shadows, pills, border-radius
- Every section wrapped in a card; identical SECTION → CARD → CARD → CARD rhythm repeated down the page
- Generic gradient blobs, random floating decorative elements, unnecessary 3D/particles
- Vague hero copy ("Transform your business with the power of AI"), generic feature grids, repeated fade-up-on-scroll animations
- Fabricated stats, testimonials, customers, awards, or certifications not explicitly provided
- Circuit-board backgrounds, glowing brains, generic "AI" iconography as a substitute for a real concept

If a design could belong to 500 other SaaS companies, it isn't distinctive enough — redesign the concept, don't just tweak spacing.

## Standards to hold the line on

- **Typography**: max 1 primary + 1 secondary family, chosen intentionally (not a default Inter/Roboto), with a coherent type scale (display 48–96px, heading 32–64px, subheading 20–28px, body 16–18px, small 13–15px).
- **Color**: intentional tokens (background/surface/elevated/primary/secondary/accent/success/warning/error/text/muted) — reuse Automalytics' existing palette (see `index.html` `:root` vars) rather than inventing new colors. Accent color needs a job; not every element gets one.
- **Layout**: hierarchy over decoration — strong grids, real whitespace, varied composition/density/rhythm across sections rather than a repeated card grid.
- **Hero**: must say what Automalytics does, who it helps, why it matters, and what to do next — with a specific value proposition, never vague marketing filler.
- **Copy**: human, short sentences, active voice, concrete benefits. Never invent customers, stats, testimonials, or numbers that weren't given.
- **CTAs**: describe the actual action ("Cotizar mi Página Web", "Agendar una llamada"), not generic "Get Started"/"Learn More".
- **States**: every interactive surface needs loading/empty/error/success/disabled/hover/focus/active states, and mobile + keyboard interaction considered.
- **Responsive**: no accidental horizontal scroll, no clipped/overflowing content, minimum 44×44px touch targets.
- **Animation**: one or two strong, meaningful moments beat a dozen weak ones (fade-ups on every card, spinning everything). Respect `prefers-reduced-motion`.
- **Performance**: minimal JS, optimized/lazy-loaded images, no dependency added without real value.
- **SEO**: title, meta description, canonical, OG/Twitter tags, semantic heading hierarchy, structured data that's actually true, sitemap/robots entries for any new public page.
- **Accessibility**: semantic HTML first, labels, visible focus states, sufficient contrast, alt text — ARIA only to fill a real gap, never to patch bad HTML.
- **Existing project rule**: inspect the repo's current design system, tokens, and components before adding new ones. Reuse `--bg`/`--bg2`/`--bg3`/`--cyan` etc. and existing component classes rather than inventing parallel patterns. Don't rewrite working code without a concrete reason.

## Visual review (mandatory before calling a page done)

Code compiling is not done. After implementing:
1. Actually render the page (local server / Playwright), don't just read the source.
2. Check desktop and mobile.
3. Check spacing, typography, hierarchy, alignment, overflow, animations, accessibility.
4. Fix what's visibly wrong, then re-check once.

## Self-critique gate

Before declaring anything finished, answer honestly:
- **Visual**: Does this look intentionally designed? Does it look like Automalytics, or generic? Is there one clear focal point?
- **UX**: Would a new visitor understand this immediately? Is the primary action obvious? Are all states handled? Is mobile actually usable?
- **Technical**: Maintainable? Performant? Accessible? SEO covered? Any unnecessary dependency?

Any "no" means keep improving, not ship it.

## Product thinking

Don't blindly implement a request that creates a worse product. If an ask has an obvious UX or technical problem: name the problem briefly, propose a better approach, and implement that when it's clearly better — same as any senior partner would, not a code typist. Act as a senior partner, not a code typist.

## Definition of done

- Works on desktop and mobile, with intentional (not default) responsive behavior
- Loading/empty/error states exist where needed
- Accessibility, SEO, and performance were actually considered, not assumed
- No obvious visual bugs, no unnecessary dependencies, no exposed secrets
- The rendered UI was visually reviewed, not just the source
- It doesn't feel generic — it feels like Automalytics
