# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static HTML/CSS website for Anne Lane, a European-trained Naturopath. No build system, no dependencies, no package manager — pure HTML, CSS, and vanilla JavaScript. Hosted on GitHub Pages at `https://ypancey-art.github.io/anne-lane-website/`.

The `.nojekyll` file at the root disables Jekyll processing on GitHub Pages.

## Architecture

### Two-part structure

**Main SPA (`index.html`):**
A single-page application where Home, About, Services, and Book are all rendered as `<div class="page">` sections inside one HTML file. Navigation between these sections uses the `showPage(pageName)` JavaScript function, which toggles the `.active` class. All CSS is inline in a `<style>` block within `index.html`.

**Blog section (`blog/`):**
Separate HTML files that use actual page navigation (not SPA). `blog/blog.css` is a shared stylesheet for all blog pages. New blog posts are standalone `.html` files in the `blog/` folder.

### Navigation pattern

- The main nav links for Home, About, Services, and Book call `showPage()` with `href="#"`
- The Resources/Blog link uses a real `href="blog/index.html"` — this is intentional
- Blog pages link back to `../index.html` (not using `showPage`)

### Design tokens

CSS custom properties are defined in two places (keep them in sync):
- `index.html` inline `<style>` `:root` block
- `blog/blog.css` `:root` block

Key variables: `--cream`, `--cream-dark`, `--green`, `--green-light`, `--green-pale`, `--gold`, `--gold-light`, `--gold-pale`, `--brown`, `--text`, `--text-light`, `--white`

Typography: `Cormorant Garamond` (serif, used for all headings) and `Jost` (sans-serif, used for body text and UI elements), loaded from Google Fonts.

### Responsive breakpoints

- `900px`: major layout shifts (stacked navigation, single-column grids)
- `480px`: additional small-screen adjustments

## Adding a new blog post

1. Create `blog/your-post-slug.html` following the structure of existing posts (e.g. `blog/perimenopause-signs.html`)
2. Link to the new post from `blog/index.html` by adding a new `<article class="post-card">` block
3. Blog posts use `blog.css` and link back to `../index.html`

## Booking integration

The Book page contains a placeholder (`<div class="bookafy-placeholder">`) where a Bookafy scheduling widget embed code should go. The placeholder shows the expected embed snippet format.

## Contact form

The contact form in `index.html` uses `handleSubmit(event)` which only simulates submission (shows a success message, resets the form). It does not send data anywhere — a real form backend would need to be integrated.
