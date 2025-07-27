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
