# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

TerAustralis Incognita is two things in one repo:

1. **A living protocol litepaper** — `README.md` at the root is the canonical litepaper (currently v0.4.3). `drafts/` holds exploratory working documents that feed into it. `RESONANCE.md` is the cultural/philosophical onboarding document for contributors.

2. **A landing page** — `my-app/` is a React + TypeScript + Vite single-page application deployed to GitHub Pages.

**Roles:** Crystal Elle Arena-Turner is the founder and keeper of all protocol vision and decisions. Sebastian ([@Sebastianrix](https://github.com/Sebastianrix)) is the webmaster for the site.

---

## Landing page (`my-app/`)

All npm commands must be run from inside `my-app/`.

```bash
cd my-app
npm install        # install deps
npm run dev        # local dev server (Vite HMR)
npm run build      # tsc -b && vite build  →  dist/
npm run lint       # ESLint (TypeScript + React hooks + React Refresh rules)
npm run preview    # serve the built dist/ locally
```

There is no test framework configured.

### Stack
- React 19, TypeScript ~6.0, Vite 8
- No external UI library — plain CSS with custom properties

### App architecture

The entire UI lives in two files:

- **`src/App.tsx`** — single-file component tree: `StarCanvas` (animated canvas background) + `App` (all sections: nav, hero, stats, features, roadmap, CTA, footer). Content data (`features[]`, `roadmap[]`) is defined as plain arrays at the top of the file.
- **`src/App.css`** — all component-level styles
- **`src/index.css`** — global reset, CSS custom properties, typography

### Design system (CSS variables, defined in `index.css`)
```
--purple: #9b5cff        --cyan: #22d3ee
--bg: #060814            --bg-card: rgba(255,255,255,0.03)
--border: rgba(255,255,255,0.08)
--text: #94a3b8          --text-h: #f1f5f9
```
Body font: **Inter**. Heading font: **Space Grotesk**.

### Guardian Constellation
`StarCanvas` hard-codes three named guardian stars (`Crystal`, `Dru`, `Ember`) at fixed relative positions on the canvas. The names and their placement are intentional and personal — see `drafts/guardian-constellation.md` before changing them.

### Deployment
GitHub Actions (`.github/workflows/deploy.yml`) deploys to GitHub Pages on every push to `main`.

**The production site is the static multi-page site in `site/`** (plain HTML/CSS/JS, no build step) — the workflow uploads `site/` directly. The custom domain (`teraustralis.com.au`) is carried by `site/CNAME`. See `site/README.md` for structure.

The React app in `my-app/` is **retired from production** but kept in the repo (its `npm` scripts and `my-app/public/CNAME` remain for local/historical use; they no longer drive the live site).

---

## Litepaper & drafts

### Versioning convention (from `README.md`)
- **Patch** (x.x.N) — wording, clarifications, minor refinements
- **Minor** (x.N.0) — new sections, major rewrites, new principles, roadmap updates
- **Major** (N.0.0) — ready for broad external sharing, testnet alignment, formal release

Update the version in the `README.md` header and add a changelog entry at the bottom.

### Branching
- **`main`** — stable working litepaper; small-to-medium edits go here directly
- **Topic branches** (e.g. `draft/tokenomics-revision`) — for large structural changes; consolidate the stable core back into `main` with an appropriate version bump once ready

### `drafts/` status system
Each draft in `drafts/README.md` carries one of:
- ✅ **Consolidated** — stable core is already in the litepaper
- 🟡 **Partially consolidated** — concept is in the litepaper; mechanical detail remains here
- ⚪ **Standalone** — lives here by design, not intended for the main litepaper

**`drafts/codex.md`** is the canonical one-page overview of the whole symbolic system — start there for orientation. The architecture in brief:

> **CrystalCore** (genesis steward) → **Starlines** (Route + Knowledge + Law) → **Navigator** (southern-hemisphere wayfinder) → **$TINC** (incentive/settlement) — bound by **"one, but many"**, protected by **Honesty & Truth**, with **consent mechanical at every layer**.

### Key cultural commitments encoded in the protocol
- All cultural/Indigenous framing is **provisional and consent-pending** until genuine partnership with relevant custodians and Prescribed Body Corporates is established.
- The Starline primitive encodes consent natively: a Starline is only open when every waypoint's Law conditions are satisfied — consent is never bypassed by routing.
- Uluru is honored but never used as infrastructure. Seven Sisters framing is consent-pending.
