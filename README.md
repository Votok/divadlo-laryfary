# Divadlo Láryfáry – Dětské divadlo Praha

Oficiální web **[Divadla Láryfáry](https://www.divadlolaryfary.cz)** – pražského profesionálního autorského divadla pro děti. Od roku 2008 hrajeme originální pohádky a představení pro děti v pražských divadlech (Kalich, Viola a další).

- 🎭 **Autorské pohádky pro děti** – unikátní repertoár vlastních her
- 📅 **Aktuální program** – představení s online prodejem vstupenek
- 📖 **Besedy a workshopy** – interaktivní programy pro školy a školky
- 📚 **Naše knihy** – knižní adaptace oblíbených pohádek

Web: [www.divadlolaryfary.cz](https://www.divadlolaryfary.cz)

## Project Overview (for AI tools)

### Stack / Generator

- Static site built with **Eleventy (11ty)**.
- Templates in **Nunjucks** (`.njk`).
- Source content in `src/`, output site generated into `_site/`.

### Key Settings & Config

- Eleventy is invoked via `npm` scripts in `package.json`:
  - `npm run dev` → `eleventy --serve --watch`
  - `npm run build` → `eleventy`
  - `npm start` → `eleventy --serve`
- Global site data lives in `src/_data/site.json`.
- Shared layouts and components are under `src/_includes/`.

### Folder Map

Top level:

- `src/` – **source of truth** for the site (pages, layouts, assets).
- `_site/` – **generated output** from Eleventy (do not edit by hand).
- `package.json` – Eleventy + build scripts and dependencies.

Inside `src/`:

- `src/index.html`, `src/*.html` – individual pages using Eleventy front matter.
- Most content pages are **plain HTML files** (`.html`) with YAML front matter at the top.
- `src/_data/site.json` – global config (site-wide metadata, navigation helpers, etc.).
- `src/_includes/layouts/` – base page layouts (e.g. `base.njk`, `subpage-clean.njk`).
- `src/_includes/components/` – reusable components (e.g. `header.njk`, `footer.njk`, `subpage-header.njk`, `bottom-nav.njk`).
- `src/css/style.css` – main styles for the new site.
- `src/images/` – images used by the new site.
- `src/admin/program-admin.html` – simple admin helper page for program data.

Inside `_site/`:

- Mirrors `src/` pages as final static HTML + processed assets.
- Used by the deployed site; safe to delete and re‑generate via `npm run build`.

### Mental Model

- Edit **only** files under `src/` (content, layouts, components, styles).
- Eleventy reads `src/`, `src/_data`, `src/_includes` and writes the compiled site to `_site/`.

## Subpage Structure

### Creating New Subpages

All subpages now use a consistent header structure with breadcrumbs, headline, and optional subheadline. The layout is flexible and allows for different column arrangements.

#### Front Matter Variables

```yaml
---
layout: layouts/subpage-clean.njk
title: "Page Title"
description: "SEO description"
pageTitle: "Display Title"
subtitle: "Optional subtitle"
breadcrumbs:
  - title: "Home"
    url: "/"
  - title: "Current Page"
# Optional header image:
headerImage:
  src: "path/to/image.jpg"
  alt: "Alt text"
---
```

#### Basic Subpage Template

```html
<!-- Subpage Header -->
<section class="subpage-header py-5">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-8">{% include "components/subpage-header.njk" %}</div>
      {% if headerImage %}
      <div class="col-lg-4 text-lg-end">
        <img
          src="{{ headerImage.src }}"
          alt="{{ headerImage.alt }}"
          class="img-fluid rounded shadow hero-images"
        />
      </div>
      {% endif %}
      <!-- Or add a custom badge in the right column: -->
      <!-- 
      <div class="col-lg-4 text-lg-end">
        <div class="performance-badge age-badge-custom p-3 rounded text-center mx-auto mx-lg-0">
          <strong>Badge text here</strong>
        </div>
      </div>
      -->
    </div>
  </div>
</section>

<!-- Your flexible content here -->
<section class="py-5">
  <div class="container">
    <!-- Any column layout you need -->
  </div>
</section>
```

### Components

- `components/subpage-header.njk` - Reusable header with breadcrumbs and titles
- `layouts/subpage-clean.njk` - Clean subpage layout template

### Badge System

The badge system allows you to add age-appropriate or other information badges next to page headlines. Badges appear in the right column of the subpage header and have custom background images.

#### Available Badge Classes:

- `age-badge` - General age badge (uses Erben background)
- `age-badge-erben` - Specific for Erben stories
- `duration-badge` - General duration badge (uses Erben background)
- `duration-badge-erben` - Specific duration badge for Erben stories

#### Creating Custom Badge Classes:

Add new badge classes in `src/css/style.css`:

```css
.age-badge-custom {
  background-image: url("../images/your-custom-age-background.jpg");
}

.duration-badge-custom {
  background-image: url("../images/your-custom-duration-background.jpg");
  flex-direction: column; /* Required for duration badges */
}
```

All badge classes inherit from `.performance-badge` base styles (280x76px dimensions, centered text, etc.).

**Note:** Duration badges should always include `flex-direction: column;` to properly stack the title and duration text.

### Development

Run the development server:

```bash
npx @11ty/eleventy --serve
```

Build for production:

```bash
npx @11ty/eleventy
```

## SEO

Web je optimalizován pro vyhledávače:

- **Structured Data (JSON-LD)** – `TheaterGroup`, `BreadcrumbList` a `CreativeWork` schema na stránkách pohádek.
- **Open Graph & Twitter Cards** – každá stránka má vlastní `og:title`, `og:description`, `og:image`.
- **Canonical URLs** – automaticky generované `<link rel="canonical">`.
- **Sitemap & robots.txt** – `src/sitemap.njk` generuje XML sitemap, `src/robots.txt` povoluje crawling.
- **Preload hero obrázků** – front matter `preloadImage` pro rychlejší LCP.
- **Sémantické HTML** – správná hierarchie nadpisů, alt texty u obrázků.
- **Klíčová slova** – každá stránka má vlastní `keywords` a `description` v front matter.
