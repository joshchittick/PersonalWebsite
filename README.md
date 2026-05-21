# joshchittick.com

Personal website. Built with React (no build step), deployed on Vercel.

## Stack

- **React 18** via CDN — no bundler, JSX transpiled in-browser by Babel
- **Tailwind-free** — custom CSS with CSS custom properties for theming
- **Leaflet.js** — interactive NYC running map, lazy-loaded
- **Formspree** — resume email capture
- **Vercel** — hosting and deployment

## Running locally

```bash
npx serve .
```

Opens at `http://localhost:3000` (or similar). No install step needed.

## Project structure

```
/
├── index.html               # Entry point
├── data.js                  # All site content (single source of truth)
├── variant-swiss-v2.jsx     # Main layout and all sections
├── shared.jsx               # Reusable components (map, clock, now panel)
├── tweaks-panel.jsx         # Live color/density editor
├── styles.css               # All styles
└── assets/
    ├── headshot.jpg
    ├── background.jpg
    └── josh-chittick-resume.pdf
```

## Updating content

All content lives in `data.js`. Edit that file to update bio, experience, projects, running routes, or contact info. No rebuild needed — just refresh the browser.

## Deploying

Pushes to `master` auto-deploy via Vercel. To redeploy manually, push any commit.
