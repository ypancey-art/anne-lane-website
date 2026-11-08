# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static website for Anne Lane, a European-trained Naturopath, live at `https://annelane.co`. No build system, no dependencies, no package manager — plain HTML, CSS, and vanilla JavaScript. Merging to `main` publishes the site (`CNAME` and `wrangler.jsonc` hold the hosting config; `.nojekyll` disables Jekyll processing).

## Architecture

### Pages

Every page is its own HTML file with real navigation (there is no single-page app and no `showPage()`):

- `index.html` (home), `about.html`, `services.html`, `book.html`
- `preconception/index.html` — a landing page for the preconception programme (images in `preconception/images/`)
- `blog/` — "Lane Musings": `blog/index.html` (post grid, category filter) plus one standalone HTML file per article

The top-level pages share `style.css` and `main.js` (`toggleMenu()` / `closeMenu()` for the mobile nav). `preconception/index.html` loads them from `../`. The blog uses its own stylesheet, `blog/blog.css`.

### Design tokens

CSS custom properties are defined in two places — keep them in sync:
- `style.css` `:root`
- `blog/blog.css` `:root`

Key variables: `--cream`, `--cream-dark`, `--green`, `--green-light`, `--green-pale`, `--gold`, `--gold-light`, `--gold-pale`, `--brown`, `--text`, `--text-light`, `--white`

Typography: `Cormorant Garamond` (serif, used for headings) and `Jost` (sans-serif, used for body text and UI), loaded from Google Fonts.

### Responsive breakpoints

- `900px`: major layout shifts (stacked navigation, single-column grids)
- `480px`: additional small-screen adjustments

## Adding a new blog post

1. Copy the structure of a recent post (e.g. `blog/fall-and-womens-health.html`) to `blog/your-post-slug.html`.
2. Update the `<title>`, description, Open Graph tags, `canonical`/`og:url`/`og:image` (absolute `https://annelane.co/...` URLs), and the JSON-LD block (headline, dates, url).
3. Add a new `<article class="post-card" data-category="...">` block at the top of the grid in `blog/index.html` (the category must match one of the `.cat-btn` categories).
4. Add the URL to `sitemap.xml`.
5. Use real, working `href`s: posts link back to `../index.html`, `../services.html`, etc.

The sidebar newsletter form on each post is the real Formspree + Cloudflare Turnstile form, driven by the shared `blog/newsletter.js`. Copy it from an existing post rather than rebuilding it.

## Images and credits

- Photos of Anne live in `media/`. Keep them under roughly 1800px on the longest side and a few hundred KB each (they were resized in Nov 2026).
- Stock photos come from Pexels. Credit the photographer next to the images (`<p class="photo-credit">Photos: Name / Pexels</p>`, linked to the Pexels photo page). Do not publish photos from other sites without a licence.

## Forms

- Booking/contact form (`book.html`) and the newsletter forms post to Formspree (`https://formspree.io/f/mvzbbwqa`) with Cloudflare Turnstile verification. The Web3Forms code in `book.html` is commented out and unused.

## SEO files

- `sitemap.xml` and `robots.txt` live at the repo root. Add new pages to the sitemap.
- `llms.txt` describes the site for AI tools; keep it consistent with the site content and use `annelane.co` URLs.
