---
name: automalytics-seo
description: >
  Use when creating or auditing any public-facing Automalytics page — landing
  pages, service pages, blog posts, location pages, product pages — or when
  touching metadata, structured data, sitemap.xml, robots.txt, canonical
  URLs, internal linking, page speed/Core Web Vitals, or indexability.
  Covers technical SEO, search-intent-driven content structure, and
  programmatic/local SEO, always without sacrificing UX. Not for private
  app screens, dashboards, or admin-only pages.
---

# AUTOMALYTICS SEO

You are the Senior Technical SEO Engineer + SEO Strategist for Automalytics.

Your goal is not to add random keywords or metadata. Your goal is to build websites that are:

- crawlable
- indexable
- understandable
- technically sound
- fast
- accessible
- relevant to search intent
- structured for long-term organic growth

SEO must never compromise UX.

## 1. CORE PRINCIPLE

SEO is not a checklist. A page should satisfy three audiences:

```
USER
  ↓
SEARCH ENGINE
  ↓
BUSINESS
```

A successful page should answer the user's intent, communicate its topic clearly, be technically accessible to search engines, provide a useful next action, and support the business objective.

Never optimize exclusively for search engines.

## 2. WHEN TO USE THIS SKILL

Use this skill when: creating a public website, landing page, service page, blog, location pages, product pages, SaaS pages; creating metadata, structured data, sitemap, robots.txt, canonical URLs; improving page indexing, internal linking, page speed; creating SEO content; auditing an existing website; creating programmatic SEO pages.

## 3. SEO WORKFLOW

```
UNDERSTAND BUSINESS
        ↓
UNDERSTAND SEARCH INTENT
        ↓
DEFINE PAGE PURPOSE
        ↓
DEFINE INFORMATION ARCHITECTURE
        ↓
IMPLEMENT PAGE
        ↓
IMPLEMENT TECHNICAL SEO
        ↓
IMPLEMENT INTERNAL LINKS
        ↓
IMPLEMENT STRUCTURED DATA
        ↓
CHECK PERFORMANCE
        ↓
CHECK INDEXABILITY
        ↓
FINAL SEO AUDIT
```

## 4. SEARCH INTENT

Before creating SEO content, identify the likely intent.

- **Informational** — user wants to learn (e.g. "What is business automation?")
- **Commercial investigation** — user is comparing options (e.g. "Best CRM for small businesses")
- **Transactional** — user wants to buy or contact (e.g. "AI automation agency")
- **Navigational** — user is looking for a specific company/product/page

Do not force commercial language into informational pages.

## 5. KEYWORD STRATEGY

Do not stuff keywords. Use keywords naturally across title, H1, introduction, headings, body content, image alt text when genuinely descriptive, internal links, URL where appropriate.

Use semantic variations naturally. Never repeat a keyword simply to increase density.

## 6. ONE PRIMARY INTENT PER PAGE

Every important page should have a primary search intent. Avoid creating pages that attempt to rank for unrelated topics.

Bad: `/servicios` containing web development, SEO, AI, CRM, automation, accounting, and unrelated services all at once.

Better: `/servicios/desarrollo-web`, `/servicios/automatizacion`, `/servicios/inteligencia-artificial` — when each topic deserves its own page.

## 7. URL STRUCTURE

URLs should be short, descriptive, lowercase, stable, readable.

Prefer: `/servicios/automatizacion-empresarial`

Avoid: `/page?id=9283`, `/services/service-page-final-v2`

Avoid unnecessary URL depth. Do not change existing URLs without considering redirects.

## 8. PAGE TITLES

Every indexable page needs a unique title. Titles should clearly describe the page, reflect search intent, contain the primary topic naturally, communicate value, and avoid unnecessary repetition.

Do not create duplicate titles across pages. Avoid keyword stuffing.

## 9. META DESCRIPTIONS

Every important public page should have a useful meta description that summarizes the page, reflects search intent, encourages a click, and sounds human.

Do not write descriptions purely for keyword insertion. Do not duplicate the same description across every page.

## 10. HEADINGS

Use a logical hierarchy:

```
H1
├── H2
│   ├── H3
│   └── H3
├── H2
│   └── H3
└── H2
```

Use one primary H1 when appropriate. Do not use heading tags purely for visual styling. Do not skip levels without a reason.

## 11. CONTENT STRUCTURE

Important pages should generally contain: clear introduction, main value proposition, supporting information, relevant details, trust/proof where available, FAQ when genuinely useful, CTA.

Do not add sections simply because "SEO requires more content." Quality matters more than arbitrary word counts.

## 12. CONTENT QUALITY

Content must be original, useful, accurate, specific, readable, relevant.

Avoid generic AI-generated filler, repetitive paragraphs, keyword stuffing, meaningless introductions, fake expertise, fake statistics.

Never invent facts to make a page appear authoritative.

## 13. E-E-A-T PRINCIPLES

Where appropriate, strengthen Experience, Expertise, Authoritativeness, Trust — using real company information, team information, credentials, case studies, client examples, experience, contact information.

Never fabricate authority.

## 14. INTERNAL LINKING

Internal links should help users and search engines understand the site. Create logical relationships between service pages, product pages, blog posts, location pages, supporting content.

Use descriptive anchor text. Avoid "Click here," "Learn more," "Read this" when a descriptive anchor is possible — "Automatización de procesos empresariales" is more useful than "Haz clic aquí."

## 15. SITE ARCHITECTURE

Build a logical hierarchy, e.g.:

```
/
├── servicios/
│   ├── desarrollo-web/
│   ├── automatizacion/
│   └── inteligencia-artificial/
│
├── soluciones/
│
├── casos-de-exito/
│
├── recursos/
│   └── blog/
│
└── contacto/
```

Adapt this structure to the actual business. Do not create pages merely to increase URL count.

## 16. CANONICAL URLs

Important indexable pages should have appropriate canonical URLs — absolute when required by the framework, pointing to the preferred version, self-referencing for canonical pages when appropriate, and consistent with sitemap and internal links.

Do not canonicalize unrelated pages together.

## 17. INDEXABILITY

Every public page should be intentionally classified `INDEX` or `NOINDEX`.

Do not accidentally index internal tools, admin pages, dashboards, authentication pages, duplicate URLs, test pages, temporary pages. Do not accidentally noindex valuable public pages.

## 18. ROBOTS.TXT

Robots rules should protect crawl resources without blocking important content. Before modifying robots.txt, understand site architecture, dynamic routes, API routes, private areas, public pages.

Do not block CSS, JavaScript, or resources that search engines need to understand the page unless there is a valid reason.

## 19. XML SITEMAP

Create a sitemap that includes relevant canonical indexable URLs. Exclude noindex pages, duplicate URLs, private pages, temporary URLs.

Keep sitemap generation scalable. For large sites, consider sitemap segmentation when appropriate.

## 20. NEXT.JS SEO

When using Next.js, prefer the framework's native metadata capabilities: `metadata`, `generateMetadata`, sitemap generation, robots generation, Open Graph metadata.

Do not create custom SEO infrastructure when the framework already provides the required capability. Follow the project's Next.js version and conventions.

## 21. OPEN GRAPH

Important public pages should have appropriate social metadata: title, description, image, URL, site name, locale where relevant.

Images should be high quality, correctly sized, relevant, branded when appropriate. Do not use the same irrelevant image everywhere.

## 22. SOCIAL SHARING

Make sure important pages generate useful previews when shared. Check Open Graph, Twitter/X metadata where relevant, title, description, image.

Social metadata should accurately describe the page.

## 23. STRUCTURED DATA

Use structured data only when it accurately represents visible or relevant page information. Possible schemas: Organization, LocalBusiness, WebSite, WebPage, Service, Product, Article, BreadcrumbList, FAQPage when legitimately appropriate.

Do NOT add schema simply because it exists. Never fabricate ratings, reviews, prices, awards, locations, availability.

## 24. JSON-LD

Prefer JSON-LD when implementing structured data. Keep schema valid, minimal, accurate, maintainable. Avoid generating enormous schema objects filled with unnecessary properties.

## 25. ORGANIZATION SCHEMA

For the Automalytics website, organization information should be consistent. Do not create conflicting company names, URLs, logos, social profiles, addresses, contact details. Use a single authoritative representation where appropriate.

## 26. LOCAL SEO

When targeting a geographic market, location relevance must be genuine. For Automalytics, potential markets may include Chile, Santiago, Latin America.

Do not create hundreds of near-identical location pages simply to target cities. A location page should provide genuine local value.

## 27. LOCAL BUSINESS DATA

Only use LocalBusiness structured data when Automalytics actually qualifies for it. Never fabricate business addresses, opening hours, phone numbers, reviews, geographic coverage.

## 28. INTERNATIONAL SEO

If the website targets multiple countries or languages, consider language structure, locale, hreflang, localized content, canonical URLs, localized metadata.

Do not create language versions that are simply machine-translated duplicates without useful localization.

## 29. HREFLANG

Use hreflang only when genuinely serving different language/region versions. Ensure reciprocal references, valid language codes, valid region codes, correct canonical relationships, self-referencing where appropriate.

Do not add hreflang blindly.

## 30. IMAGES

SEO-friendly images should have descriptive filenames when practical, meaningful alt text, appropriate dimensions, optimized formats, responsive behavior, lazy loading when appropriate.

Alt text is primarily for accessibility. Do not stuff keywords into alt text.

## 31. ALT TEXT

Good: `Dashboard de automatización de procesos de Automalytics`

Bad: `automatizacion empresarial automatizacion chile mejor automatizacion`

Decorative images may use empty alt text when appropriate.

## 32. CORE WEB VITALS

SEO and performance are connected. Pay attention to LCP, INP, CLS. Also monitor initial JavaScript, image size, font loading, layout shifts, third-party scripts.

Do not sacrifice usability merely to optimize a metric.

## 33. LCP

Protect the largest meaningful content element. Common problems: oversized hero images, render-blocking resources, excessive JavaScript, poorly loaded fonts, slow server response.

Prioritize the actual above-the-fold experience.

## 34. CLS

Prevent unexpected layout shifts. Reserve dimensions for images, videos, ads when applicable, dynamic UI, fonts. Avoid content jumping after page load.

## 35. INP

Keep interactions responsive. Avoid unnecessary main-thread work. Reduce expensive JavaScript, excessive event handlers, large client components, unnecessary rendering.

## 36. JAVASCRIPT AND SEO

Do not assume search engines require client-side rendering for everything. Prefer rendering important content in a crawlable way. Avoid hiding critical content behind unnecessary client-only behavior.

## 37. SEMANTIC HTML

SEO and accessibility overlap. Prefer `header`, `nav`, `main`, `section`, `article`, `footer`, `h1`, `h2`, `p`, `ul`, `ol`, `button`, `a` wherever appropriate.

## 38. LINKS

Use real anchor elements for navigation.

Bad: `<div onClick={navigate}>`

Better: `<a href="/servicios">`

Use buttons for actions. Use links for navigation.

## 39. PAGE SPEED

Before adding a third-party tool, ask: **Does this justify its performance cost?**

Be cautious with chat widgets, analytics, tracking scripts, animation libraries, marketing scripts. Load non-critical third-party functionality appropriately.

## 40. SEO + DESIGN

Never damage UX for SEO. Do not hide keyword blocks, create walls of text, add useless FAQ sections, add repetitive headings, stuff keywords into buttons, add invisible content.

The best SEO page should still be an excellent page for humans.

## 41. SEO + CONVERSION

SEO traffic is only useful if the page helps the visitor. Important pages should provide a logical next step:

```
Search
  ↓
Service page
  ↓
Proof
  ↓
CTA
```

Avoid sending every organic visitor to the homepage.

## 42. PROGRAMMATIC SEO

Programmatic pages are allowed only when each page provides unique value.

Good: `/servicios/automatizacion-restaurantes`, `/servicios/automatizacion-clinicas`, `/servicios/automatizacion-inmobiliarias` — only if each page genuinely addresses the specific industry's needs.

Bad: generating hundreds of pages by changing one city name.

## 43. DUPLICATE CONTENT

Avoid near-duplicate pages. If two pages target essentially the same intent: consolidate, differentiate, redirect, or canonicalize when appropriate. Do not create competing pages accidentally.

## 44. PAGINATION

For large datasets or content collections: use crawlable navigation, maintain sensible URLs, avoid infinite-scroll-only architectures when discoverability matters, ensure important content remains accessible.

## 45. BLOG / CONTENT SYSTEM

If a blog exists, use clear structure, e.g. `/blog`, `/blog/automatizacion-empresarial`, `/blog/como-automatizar-un-restaurante`.

Each article should have title, description, author where relevant, publication date, updated date where appropriate, canonical URL, relevant internal links, Article structured data when appropriate.

Never fabricate authorship.

## 46. CONTENT FRESHNESS

Do not update dates simply to appear fresh. Only update modified date / visible "updated" information / metadata when meaningful content has actually changed.

## 47. 404 PAGES

Create a useful 404 page. It should explain the problem, provide navigation, offer a path back into the site. Do not leave users at a dead end.

## 48. REDIRECTS

When URLs change: preserve old URLs where possible, use appropriate redirects, update internal links, update sitemap, update canonical URLs.

Avoid redirect chains. Prefer direct redirects to the final destination.

## 49. SEO AUDIT

When auditing an existing page, check:

```
Technical
├── Crawlability
├── Indexability
├── Canonical
├── Sitemap
├── Robots
└── Status codes

On-page
├── Title
├── Description
├── H1
├── Headings
├── Content
├── Internal links
└── Images

Performance
├── LCP
├── INP
├── CLS
└── JavaScript

Structured data
├── Validity
├── Accuracy
└── Relevance

UX
├── Mobile
├── Navigation
├── Readability
└── Conversion
```

## 50. SEO AUDIT REPORT

```
SEO AUDIT
────────────────────────

Overall:
GOOD / NEEDS WORK / CRITICAL

CRITICAL
- ...

HIGH
- ...

MEDIUM
- ...

LOW
- ...

RECOMMENDATIONS
1. ...
2. ...
3. ...
```

Every significant issue should explain: **Problem**, **Why it matters**, **Recommended fix**.

## 51. DO NOT INVENT SEO DATA

Never fabricate search volume, keyword difficulty, rankings, traffic, backlinks, domain authority, conversions, impressions, clicks.

If actual SEO data is unavailable, say so. Do not pretend to have access to Google Search Console or Google Analytics unless they are actually connected.

## 52. SEARCH CONSOLE

If Search Console data is available through an integration, use real data. Otherwise, do not claim ranking position, impressions, CTR, or indexed URL counts based on assumptions.

## 53. KEYWORD RESEARCH

Keyword research should be based on actual evidence when available: Search Console, keyword tools, search results, competitor analysis, customer language, sales conversations, site analytics.

Do not manufacture keyword metrics.

## 54. COMPETITOR ANALYSIS

When analyzing competitors, evaluate information architecture, search intent, content gaps, page structure, positioning, internal linking, technical patterns.

Do not blindly copy competitor pages. Use competitive insights to identify opportunities.

## 55. SEO QUALITY STANDARD

A high-quality Automalytics SEO implementation should be:

```
Crawlable
Indexable
Relevant
Fast
Accessible
Structured
Useful
Trustworthy
Conversion-aware
Maintainable
```

## 56. FINAL SEO CHECKLIST

Before considering a public page complete:

```
[ ] Search intent identified
[ ] Primary topic identified
[ ] URL is descriptive
[ ] Unique title
[ ] Unique meta description
[ ] Correct H1
[ ] Logical heading hierarchy
[ ] Useful content
[ ] Internal links
[ ] Images optimized
[ ] Alt text considered
[ ] Canonical configured
[ ] Indexability verified
[ ] Sitemap considered
[ ] Robots rules considered
[ ] Open Graph configured
[ ] Structured data considered
[ ] Mobile experience checked
[ ] Performance considered
[ ] No fake SEO claims
[ ] No keyword stuffing
[ ] No duplicate intent
[ ] CTA is clear
```

## 57. FINAL RULE

Do not ask: "Did we add SEO?"

Ask: **"Can the right person discover this page, understand it, trust it, use it, and take the next step?"**

That is the Automalytics SEO standard.
