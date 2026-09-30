# Negar Team site agent guidance

## Purpose

Maintain the Negar Map: a question-led view of technology products, systems, research, experiments, and unresolved ideas. The site should make relationships and evidence easier to understand.

## Read before changing code

1. Read this file and every more-specific `AGENTS.md` that applies to the files you will edit.
2. Check `git status` and preserve unrelated work.
3. Inspect the repository README, app entry points, content source, approved assets, and package scripts. Use the commands and conventions that are actually present. Do not assume a framework, package manager, test runner, deployment target, or file layout.
4. Use the current Web Design System guide as visual and content direction. Current source code and more-specific project instructions take precedence for implementation details.

## Product and content model

- Keep the question primary. A project is one possible current form of an inquiry.
- Preserve the existing narrative order: Hero; origin; current questions; System Interrupt; constraints; Negar Test; work domains; margin note; closing thesis.
- The current live map has four records: Documents → GlyphMend (Available), Markets → Synthora (Available), Context → Ariadne (In progress), and Files → SmartPack (Available). Verify descriptions, status, and URLs against each official project source before editing or publishing.
- Keep the fifth node honestly unresolved until an approved, evidence-backed question exists. Never invent a project or placeholder facts to fill a gap.
- Preserve the three map perspectives: Products, Questions, Systems. They describe the same relationships from different angles. A single perspective is selected at a time.
- Keep the Negar Test’s sequence and responses sourced from the project data. Only the first visible prompt (“It uses AI.” → “irrelevant”) was verified in the public review; inspect source for the remaining items.
- Do not invent customers, metrics, user outcomes, capabilities, architecture, dates, ownership, release states, or endorsements.
- Do not merge independent project identities into the Negar visual identity. Use “I” only for personal first-person statements and “we” for team statements when the source supports that distinction.

## Visual rules

- Preserve the current editorial balance: warm neutral paper, deep blue-green ink, quiet route marks, a restrained warm accent, and a tonal pause for System Interrupt. Exact values were not measured in the browser; resolve all hex values and typography families from the repository’s own CSS, fonts, or design tokens before implementation.
- Current typography roles: clean sans-serif section and display headings; expressive italic serif emphasis and serif question prompts; sans-serif product names and body copy; compact monospaced labels. Match installed, licensed project fonts rather than adding lookalikes.
- Keep the organic dotted route meaningful. It connects question, current form, and system concern; it is not a decoration. Do not route it through text.
- Keep generous space, clear reading order, and the unknown node visibly unresolved. Avoid generic product-card grids, stock team photography, gradients without meaning, fake-terminal styling, unnecessary rounded containers, and motion that delays reading.
- Do not redraw, recolor, warp, or add effects to supplied approved logo artwork.

## Interaction and accessibility

- Keep Products, Questions, and Systems mutually exclusive, keyboard operable, and programmatically exposed as the selected value. The desktop accessibility tree exposed checkbox roles in the reviewed build; confirm the current implementation and choose semantics that accurately express single selection.
- Preserve visible focus, logical heading order, semantic landmarks, useful link names, and text equivalents for map relationships. Never make the SVG route the only source of content.
- Keep project question, summary, status, and action understandable without color or motion.
- Respect `prefers-reduced-motion`; retain all text and state when motion is removed. Avoid scroll hijacking and focus traps.
- Check actual text contrast, especially quiet labels and inactive question text. Do not infer WCAG conformance from screenshots.
- At 360, 768, 1280, and 1440 px, verify line wrapping, touch target usability, route position, reading order, and horizontal overflow. Test Persian/RTL shaping and mixed-script names if localization is touched.

## Implementation workflow

- Locate the actual source of each value or record before editing; avoid duplicated content and parallel token systems.
- Reuse current components, CSS conventions, and dependencies. Add a dependency only when it materially supports the requested behavior.
- Keep changes scoped and preserve unrelated edits. Do not overwrite user work.
- Run the relevant existing formatting, lint, type-check, test, and production-build commands discovered in the repository. If a command is absent or unavailable, report that accurately; never claim an unrun check passed.
- Inspect the changed page in a browser at relevant sizes and states. Capture before/after evidence for material visual changes when the environment supports it.
- Do not publish or deploy unless the user explicitly requests it.

## Completion report

State what changed, which files changed, which checks ran and their results, and any known limitation such as an unverified content source, unavailable viewport, or missing test script. Keep the report concise and factual.
