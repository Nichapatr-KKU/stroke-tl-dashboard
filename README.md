# STROKE-TL Digital Transitional Care Platform

A dependency-light React prototype of a modern hospital command center for stroke transitional care. It is configured for GitHub Pages at `https://nichapatr-kku.github.io/stroke-tl-dashboard/`. The dashboard demonstrates:

- Traffic-light risk dashboard for red / amber / green patient prioritization
- Patient journey tracking and timeline continuum visualization
- Stroke clinic follow-up panel
- LINE Official Account monitoring
- Pending task alerts and rapid response handoff
- Caregiver status indicators
- Readmission surveillance widget
- Google Apps Script automation concept for Sheets, Calendar, Gmail, and LINE OA webhooks

## Run locally

```bash
npm run dev
```

## Build

```bash
npm run build
```

The build outputs a GitHub Pages-ready `dist/` directory with an explicit `<base href="/stroke-tl-dashboard/">`, a `.nojekyll` marker, and a `404.html` fallback for the `/stroke-tl-dashboard/` repository path. The explicit base path keeps assets resolving correctly from both the repository root and GitHub Pages fallback routes.

## Preview the GitHub Pages path locally

```bash
npm run build
npm run preview:pages
```

Open `http://localhost:4173/stroke-tl-dashboard/`. The dev server strips `/stroke-tl-dashboard` before reading files so this local URL mirrors the production GitHub Pages path.
