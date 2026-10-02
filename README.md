# Negar Team — The Negar Map

A one-page site that presents Negar as an evolving body of questions, products, systems, research, and experiments.

The site is designed around a continuous line: questions branch into projects, pause at an interrupt, and converge again. Visitors can switch the project map between product, question, and system perspectives. The project list and the short “Would Negar build it?” thought experiment remain accessible as ordinary content and controls.

The page is available in English, Russian, and Simplified Chinese. The header language selector updates page copy and metadata, supports shareable `?lang=ru` and `?lang=zh` URLs, and remembers the selected language locally. The light and dark themes follow the operating system by default; a visitor can choose and save a theme from the header.

## Stack and structure

- React 19, TypeScript, and Vite
- Plain CSS and a small inline SVG for the map thread
- No UI framework, animation, analytics, or runtime service dependencies

```text
public/
  brand/README.md       Approved logo integration notes
  favicon.png           Negar icon favicon
  robots.txt
src/
  App.tsx                Page sections and interactions
  data/projects.ts       Project descriptions, constraints, and prompts
  i18n.ts                English, Russian, and Simplified Chinese interface and project copy
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

The approved logo exports are available in `src/assets/`. The header and closing section use the primary lockup; the hero and favicon use the supplied mark. The image artwork keeps its original proportions. See `public/brand/README.md` for the asset map and theme treatment.

The LinkedIn company page and contact address were not verifiable from the available official sources, so the footer currently points to the verified Negar GitHub repository and profile. Add a confirmed LinkedIn URL or contact address when one is available.

Set `VITE_SITE_URL` to the confirmed production origin at build time to emit localized canonical URLs, `hreflang` alternates, and the Open Graph URL. It is intentionally unset until the production domain is confirmed; a sitemap should be added at that point too.

## Accessibility and motion

- Semantic header, main, sections, headings, links, buttons, and a skip link
- Project descriptions are provided in text alongside the decorative SVG map
- Perspective controls expose their selected state and work by keyboard
- The thought experiment is keyboard-operable and announces changes
- Visible focus indicators, responsive layouts, and reduced-motion support
