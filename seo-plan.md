# SEO Improvement Plan — Divadlo Láryfáry 2026

**Created:** 2026-02-14
**Status:** Draft — not yet implemented

## Current State Summary

The site has solid foundations: proper `lang="cs"`, meta tags, Open Graph/Twitter Card tags, image alt text, semantic HTML, and mobile responsiveness via Bootstrap 5. However, it is missing critical 2026 SEO infrastructure.

### What exists ✅

- `<html lang="cs">`
- `<title>` with per-page values
- `<meta name="description">` per page
- `<meta name="keywords">` per page
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`)
- Twitter Card tags (`summary_large_image`)
- Favicon (SVG + ICO + apple-touch-icon)
- Image alt text on all images
- Semantic HTML (`<main>`, `<nav>`, `<footer>`, `<article>`, `<section>`)
- Google Fonts preconnect
- `rel="noopener"` on external links
- YouTube privacy embeds (`youtube-nocookie.com`)
- HTML breadcrumbs on show pages
- ARIA labels on interactive elements

### What is missing ❌

- `sitemap.xml`
- `<link rel="canonical">` on all pages
- Structured data (JSON-LD) — zero schema.org markup
- `og:locale` meta tag (value exists in `site.json` but is not rendered)
- Per-page `ogImage` on show pages (all use generic default)
- `loading="lazy"` on most images (only gallery page uses it)
- Responsive images (`<picture>`, `srcset`)

### robots.txt

A `robots.txt` exists on the hosting server but is not in the repo and lacks a `Sitemap:` directive. The existing `Disallow: /test-v3-9k4js/` rule is no longer needed.

Updated `robots.txt` should be:

```
User-agent: *
Allow: /

Sitemap: https://www.divadlolaryfary.cz/sitemap.xml
```

---

## Phase 1: Critical Technical SEO Infrastructure

> Unblocks crawling & indexing — do first.

### 1.1 Add `robots.txt` to repo

- Create `src/robots.txt` with `Allow: /` and `Sitemap:` directive
- Configure Eleventy passthrough in `.eleventy.js`
- Remove obsolete `Disallow: /test-v3-9k4js/` rule

### 1.2 Generate `sitemap.xml`

- Install `@11ty/eleventy-plugin-sitemap` or create a Nunjucks template that auto-generates a sitemap from all pages
- Every page needs a `<loc>` with full `https://www.divadlolaryfary.cz/` URL

### 1.3 Add canonical URLs

- Add `<link rel="canonical" href="{{ site.url }}{{ page.url }}">` in `src/_includes/layouts/_base-shared.njk`
- Add `url` property to `src/_data/site.json`

### 1.4 Render `og:locale` meta tag

- Output the existing `site.locale` value (`cs_CZ`) in `_base-shared.njk`

---

## Phase 2: Structured Data (JSON-LD)

> Rich results in Google — highest ROI for a theater site.

### 2.1 `Organization` / `TheaterGroup` schema

- Add site-wide JSON-LD in `_base-shared.njk`
- Include: name, logo, URL, contact info, social profiles, `sameAs` links

### 2.2 `TheaterEvent` schema on Program page

- `src/program.html` already has dates, venues, and ticket links
- Wrap each performance in `TheaterEvent` JSON-LD: `startDate`, `location`, `offers`, `performer`
- Enables Google's event rich results — critical for discovery

### 2.3 `BreadcrumbList` schema on show pages

- HTML breadcrumbs already exist on pohádka pages
- Add matching JSON-LD `BreadcrumbList`

### 2.4 `CreativeWork` schema on show pages

- Each pohádka page should have `CreativeWork` JSON-LD: name, description, author, image, genre

### 2.5 `Book` schema on Naše knihy page

- `src/nase-knihy.html` lists published books
- Add `Book` schema with title, author, publisher, ISBN (if available)

### 2.6 `Person` schema on Herci page

- `src/herci.html` has actor bios
- Add `Person` JSON-LD for: Jarmila Vlčková, Pavlína Jurková, Lukáš Jurek

---

## Phase 3: Content & Keyword Optimization

> Target Czech search intent for children's theater.

### 3.1 Optimize title tags with target keywords

| Page           | Current                                 | Proposed                                                      |
| -------------- | --------------------------------------- | ------------------------------------------------------------- |
| Home           | Představení pro děti - Divadlo Láryfáry | Divadlo pro děti Praha \| Divadlo Láryfáry – autorské pohádky |
| Repertoár      | Repertoár - Divadlo Láryfáry            | Pohádky pro děti – repertoár \| Divadlo Láryfáry              |
| Program        | Program - Divadlo Láryfáry              | Program představení pro děti \| Divadlo Láryfáry              |
| Pro pořadatele | Pro pořadatele - Divadlo Láryfáry       | Divadlo pro děti – objednávka představení \| Divadlo Láryfáry |

### 3.2 Enrich meta descriptions

- Include action keywords: "vstupenky", "objednávka", "Praha"
- Each description 150–160 chars with unique value proposition and CTA

### 3.3 Target keyword clusters

| Cluster        | Keywords (Czech)                                                                                                                             | Target Page        |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **Brand**      | divadlo Láryfáry, Láryfáry divadlo                                                                                                           | Home, all pages    |
| **Core**       | divadlo pro děti, dětské divadlo Praha, pohádky pro děti                                                                                     | Home, Repertoár    |
| **Intent**     | vstupenky dětské divadlo, představení pro děti Praha, program divadla pro děti                                                               | Program            |
| **Organizers** | objednání divadla pro děti, divadlo pro školy, divadlo pro školky, představení pro MŠ a ZŠ                                                   | Pro pořadatele     |
| **Shows**      | autorské pohádky, cirkusácká pohádka, pohádka o námořnících, strakaté bajky                                                                  | Show pages         |
| **Books**      | knihy pro děti, dětské knížky, autorské čtení pro děti                                                                                       | Naše knihy, Besedy |
| **Location**   | Divadlo Kalich, Divadlo Viola Praha, divadlo Malostranská beseda                                                                             | Program, Kontakt   |
| **Long-tail**  | nejlepší divadlo pro děti Praha, kam s dětmi Praha divadlo, pohádka pro děti v divadle, divadlo pro děti od 3 let, divadlo pro děti od 4 let | Home, Repertoár    |

### 3.4 Add age-range info to show pages

- Add "vhodné pro děti od X let" in content and structured data
- Google users frequently search by age

### 3.5 Set per-page `ogImage`

- Each pohádka page should set a custom `ogImage` in front matter using the show's hero image

---

## Phase 4: Performance & Technical Polish

> Core Web Vitals — Google ranking signal.

### 4.1 Add `loading="lazy"` to below-fold images

- Currently only `galerie.html` uses lazy loading
- Add to: repertoar cards, show page images, actor photos

### 4.2 Lazy-load YouTube iframes

- Replace raw `<iframe>` embeds with `lite-youtube-embed` or `loading="lazy"` on iframes
- Impacts LCP on home and show pages

### 4.3 Preload critical assets

- Add `<link rel="preload">` for hero images and critical fonts in `_base-shared.njk`

### 4.4 Add responsive images

- Use `<picture>` with `srcset` for key images (hero, show cards)
- Serve appropriately sized images per viewport

---

## Phase 5: Content Marketing & Authority (Ongoing)

> Long-term organic growth strategy.

### 5.1 Internal linking strategy

- Cross-link related show pages
- Link from repertoár to individual shows
- Link from program entries to show detail pages

### 5.2 Google Business Profile optimization

- Ensure GBP listing is current with 2026 program, photos, correct categories ("Dětské divadlo", "Divadlo")

### 5.3 Backlink opportunities

- Seek listings on: kudyznudy.cz, firmy.cz, prahamestskych.cz, akceprodeti.cz, local parent community sites

---

## Files to Modify

| File                                     | Changes                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------ |
| `src/_includes/layouts/_base-shared.njk` | Canonical URL, `og:locale`, JSON-LD Organization, preloads               |
| `src/_data/site.json`                    | Add `url` property                                                       |
| `src/index.html`                         | Title & description optimization                                         |
| `src/program.html`                       | TheaterEvent JSON-LD (schedule managed outside repo)                     |
| `src/repertoar.html`                     | Keyword optimization                                                     |
| `src/herci.html`                         | Person JSON-LD                                                           |
| `src/nase-knihy.html`                    | Book JSON-LD                                                             |
| `src/pro-poradatele.html`                | Keyword optimization for organizer searches                              |
| `src/pohadka-*.html`                     | CreativeWork JSON-LD, BreadcrumbList JSON-LD, custom ogImage, age ranges |
| `.eleventy.js`                           | Configure sitemap generation, robots.txt passthrough                     |

## Files to Create

| File                          | Purpose                                |
| ----------------------------- | -------------------------------------- |
| `src/robots.txt`              | Crawl instructions + Sitemap directive |
| `src/sitemap.njk` (or plugin) | Auto-generated XML sitemap             |

---

## Verification Checklist

- [ ] **Google Rich Results Test** — Validate each page type at search.google.com/test/rich-results
- [ ] **Google Search Console** — Submit sitemap.xml, check indexing coverage, monitor crawl errors
- [ ] **PageSpeed Insights** — Before/after Phase 4 (target LCP < 2.5s, CLS < 0.1)
- [ ] **Schema.org Validator** — Validate all JSON-LD at validator.schema.org
- [ ] **W3C HTML Validator** — Run on key pages
- [ ] **Manual SERP check** — Search target keywords monthly, track positions

---

## Priority & Timeline

| Phase   | Priority    | Effort     | Impact                             |
| ------- | ----------- | ---------- | ---------------------------------- |
| Phase 1 | 🔴 Critical | ~2–3 hours | Unblocks indexing                  |
| Phase 2 | 🔴 High     | ~4–6 hours | Rich results in Google             |
| Phase 3 | 🟡 Medium   | ~3–4 hours | Better ranking for target keywords |
| Phase 4 | 🟡 Medium   | ~3–4 hours | Core Web Vitals improvement        |
| Phase 5 | 🟠 Ongoing  | Continuous | Long-term authority growth         |

**2026 Note:** Google's emphasis on E-E-A-T (Experience, Expertise, Authority, Trust) means Phases 2–3 (structured data + content quality) will have the highest ROI.
