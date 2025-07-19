# Divadlo Láryfáry Website

Website for Divadlo Láryfáry using Eleventy (11ty) static site generator.

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

### Development

Run the development server:

```bash
npx @11ty/eleventy --serve
```

Build for production:

```bash
npx @11ty/eleventy
```
