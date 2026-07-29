# mariovyord.github.io

Personal portfolio + digital garden built with Astro 4 (no React/Vue/Svelte). Deployed to GitHub Pages via `main` branch pushes.

## Commands

- `npm run dev` — dev server on `localhost:4321`
- `npm run build` — `astro check && astro build` (type-check first, then build). Both must pass.
- No separate lint, test, or formatter scripts.

## Architecture

- **Pages:** `src/pages/` — home (`/`), notes list (`/notes/`), notes detail (`/notes/[...slug]/`), tags filter (`/tags/[tag]/`), playground (`/playground`), RSS (`/rss.xml`)
- **Content:** Markdown files in `src/content/notes/` with frontmatter schema at `src/content/config.ts`. Frontmatter: `title`, `description`, `pubDate`, optional `updatedDate`/`heroImage`, `tags: string[]`, `status: "seedling" | "growing" | "evergreen"`
- **Styling:** Plain CSS only. Scoped `<style>` blocks in `.astro` components + one global stylesheet at `src/styles/global.css`. Imported via `BaseHead.astro` (the only CSS entry point).
- **Fonts:** Self-hosted Roboto (headings) + Libre Baskerville (body). Preloaded in `BaseHead`.
- **Scripts:** Use `astro:page-load` event for re-init after ViewTransitions (see `PostCard.astro` tilt, `BlogPost.astro` copy button).
- **Theme:** `data-theme` attribute on `<html>`; `is:inline` script in `BaseHead` prevents flash; persists to `localStorage`.

## Quirks

- `build` = type-check then build. If `astro check` fails, the full build fails. Fix TS errors first.
- Route `/playground` is consistently misspelled (missing 'a') across all files — do not "fix" it.
- `@rollup/rollup-linux-x64-gnu` in devDeps is Linux-specific, only needed for GitHub Actions CI. Ignore on macOS.
- No 404 page, no RSS autodiscovery `<link>`.
- Respect `prefers-reduced-motion` in all interactive effects.
- Default OG image `/blog-placeholder-1.jpg` does not exist in the repo.
- JetBrains Mono font files in `/public/fonts/` are not loaded anywhere — only Roboto and Libre Baskerville are used.

## Cool effects (WIP on `cool-effects-plan` branch)

Checklist at `cool-effects-checklist.md`. Current progress:
- [x] Reading progress bar
- [x] Magnetic hover on social links
- [ ] Animated floating tech-stack tags
- [ ] Spotlight follower
- [ ] Interactive 3D hero scene
- [ ] Scrollytelling homepage sections
