# Grantsville Utah Stake site

Jekyll static site deployed to GitHub Pages at `grantsvilleutahstake.com` (see `CNAME`).
No npm, no build step beyond Jekyll, no tests, no linter.

## Google Sheets are the database

The site has no backend. Every piece of data is fetched at runtime from **published
Google Sheets CSVs**, listed in the `urls` map at the top of
`assets/js/services/resource-service.js`. Each sheet is effectively a table —
`Wards`, `Callings`, `Buildings`, `WardConferences`, `HighCouncilAssignments`,
`SpeakingAssignments`, `Welfare`, etc. — joined by id columns
(`WardId`, `HighCouncilorId`, `BuildingId`, `OrganizationId`, …).

This exists so anyone in the stake can update content without touching the repo.

**Never edit site content in this repo.** Prose, names, dates, and assignments all live
in the sheets. When asked for a content change, identify where it lives and hand that
back — for markdown prose that means the `General` sheet plus the `Section` / `Key` pair
the page looks up. Do not "fix" it by hardcoding text into HTML.

`markdown-files/*.md` is a scratchpad for drafting and previewing markdown before it is
pasted into a sheet cell. **Nothing on the site loads these files.** Update them only
when asked.

### Caching

`ResourceService.getData(key)` reads from `localStorage`; `loadLocal` invalidates an
entry by comparing its save time against the matching row in the `Versions` sheet, which
is itself cached in `sessionStorage`. Stale data while testing almost always means a
stale cache — `service.clearCache()` clears both.

## Conventions

- **A page** is a Liquid HTML file with front matter selecting a layout, plus a matching
  script in `assets/js/pages/` and often a `styles-<page>.css`. Names are not strictly
  parallel: `resource-guide/bishops.html` → `assets/js/pages/bishop.js`,
  `ward-conference.html` → `ward-conferences.js`.
- **Rendering** is vanilla JS cloning `<template>` elements declared inline in the page.
  No framework.
- **Markdown prose** from the `General` sheet goes through the shared
  `displaySection(section, key, headerId, contentId)` helper in `assets/js/helpers.js`.
  Reuse it instead of writing new fetch/parse code. Other shared helpers there:
  `parseDate`, `getCurrentYear` / `setCurrentYear`, `setFilterFromUrl`, `toggle`.
- **Dropdowns** come in pairs: an include in `_includes/controls/` that loads its class
  from `assets/js/controls/` (e.g. `dropdown-bishops.html` → `dropdown-bishop.js`). Each
  exposes `onSelectionChanged(cb)`. Reuse an existing one before adding another.
- **Filter state** persists through the URL query string (`?year=`, `?month=`,
  `?session=`) — see `getCurrentYear` and `setFilterFromUrl`.
- **CSS** is per-page files plus custom properties in `assets/css/styles-variables.css`.
  Use the existing tokens (`--color-link`, `--border-radius-card`, …) rather than literal
  colors. `styles-print.css` holds the `@media print` rules and is loaded by every layout.
- **Layouts** in `_layouts/` each duplicate the same `<head>` (PapaParse and marked from
  CDN, bootstrap-icons, the shared CSS list). Adding a global asset means editing each one.

## Dev and deploy

- `bundle exec jekyll serve` for local preview. Liquid layouts and includes do not render
  under VS Code Live Server, so use Jekyll for anything touching a layout or include.
- GitHub Pages rebuilds automatically when `main` updates. The working branch is `gregor`.
- **Do not commit unless explicitly asked.** Leave changes in the working tree for review.
