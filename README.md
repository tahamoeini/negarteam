# Negar Team — The Negar Map

A one-page site that presents Negar as an evolving body of questions, products, systems, research, and experiments.

The site is designed around a continuous line: questions branch into projects, pause at an interrupt, and converge again. Visitors can switch the project map between product, question, and system perspectives. The project list and the short “Would Negar build it?” thought experiment remain accessible as ordinary content and controls.

## Stack and structure

- React 19, TypeScript, and Vite
- Plain CSS and a small inline SVG for the map thread
- No UI, animation, analytics, or runtime service dependencies

```text
public/
  brand/README.md       Approved logo integration notes
  favicon.png           Negar icon favicon
  robots.txt
src/
  App.tsx                Page sections and interactions
  data/projects.ts       Project descriptions, constraints, and prompts
  styles.css             Layout, visual system, and responsive rules
  main.tsx
```

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm ci
npm run dev
```

## Validate and build

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

The static production output is written to `dist/`. It can be deployed to any static host that serves `index.html` for the site root. The repository does not configure a production domain or canonical URL because the destination domain has not been confirmed.

## Add a project

Add an entry to `projects` in `src/data/projects.ts` with a verified question, description, category, system concern, URL, action text, and current stage. `App.tsx` renders the list and the three perspectives from that data. Keep claims tied to an official project source; avoid adding metrics or capabilities that the project itself does not substantiate.

Current descriptions were checked against the official repositories:

- [GlyphMend](https://github.com/tahamoeini/glyph-mend)
- [Synthora](https://github.com/tahamoeini/synthora)
- [Ariadne](https://github.com/tahamoeini/ariadne)
- [SmartPack](https://github.com/tahamoeini/smartpack)

## Brand and content notes

The approved logo exports are available in `src/assets/`. The header uses the supplied logotype, the closing section uses the primary lockup, and the favicon uses the supplied mark. The image artwork is displayed at its original proportions without recoloring or effects. See `public/brand/README.md` for the asset map and background notes.

The LinkedIn company page and contact address were not verifiable from the available official sources, so the footer currently points to the verified Negar GitHub repository and profile. Add a confirmed LinkedIn URL or contact address when one is available.

No canonical URL or sitemap is configured. Add both when the production domain is known.

## Accessibility and motion

- Semantic header, main, sections, headings, links, buttons, and a skip link
- Project descriptions are provided in text alongside the decorative SVG map
- Perspective controls expose their selected state and work by keyboard
- The thought experiment is keyboard-operable and announces changes
- Visible focus indicators, responsive layouts, and reduced-motion support
