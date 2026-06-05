# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

TerAustralis Incognita is a decentralized coordination protocol for space operations. The repo contains:

1. **A living protocol litepaper** — `README.md` at the root (currently v0.4.3). `drafts/` holds exploratory working documents. `RESONANCE.md` is the cultural/philosophical onboarding document.
2. **A React landing page** — `my-app/` (React + TypeScript + Vite), containerized and served by nginx.
3. **A .NET API backend** — `api/` (ASP.NET Core + PostgreSQL), handling auth and user data.
4. **A static multi-page site** — `site/` (plain HTML/CSS/JS, no build step), pages: Vision (3D Cesium viz), Map, Roadmap, Team, FAQ, Contact.

**Roles:** Crystal Elle Arena-Turner is the founder and keeper of all protocol vision and decisions. Sebastian ([@Sebastianrix](https://github.com/Sebastianrix)) is the webmaster.

---

## Landing page (`my-app/`)

All npm commands must be run from inside `my-app/`.

```bash
cd my-app
npm install            # install deps
npm run dev            # local dev server (Vite HMR)
npm run build          # tsc -b && vite build → dist/
npm run lint           # ESLint (TypeScript + React hooks + React Refresh rules)
npm run preview        # serve the built dist/ locally
npm test               # run Vitest test suite once
npm run test:watch     # Vitest in watch mode
npm run coverage       # Vitest coverage report
```

### Stack
- React 19, TypeScript ~6.0, Vite 8
- Test framework: Vitest + @testing-library/react (jsdom environment)
- No external UI library — plain CSS with custom properties

### App architecture

- **`src/App.tsx`** — single-file component tree: `StarCanvas` (animated canvas background) + `App` (all sections). Content data (`values[]`, `stack[]`, `roadmap[]`) is defined as plain arrays at the top of the file. Sections in order: nav, hero, stats bar, Core Thesis, Protocol Stack, Guiding Principles (Values), Roadmap, $TINC token, Who We Seek, CTA, footer.
- **`src/App.css`** — all component-level styles
- **`src/index.css`** — global reset, CSS custom properties, typography
- **`src/__tests__/App.test.tsx`** — Vitest + @testing-library/react tests for the above

### Design system (CSS variables, defined in `index.css`)
```
--purple: #9b5cff        --cyan: #22d3ee
--bg: #060814            --bg-card: rgba(255,255,255,0.03)
--border: rgba(255,255,255,0.08)
--text: #94a3b8          --text-h: #f1f5f9
```
Body font: **Inter**. Heading font: **Space Grotesk**.

### Guardian Constellation
`StarCanvas` contains code (currently commented out) for three named guardian stars (`Crystal`, `Dru`, `Ember`) at fixed relative positions. The names and placement are intentional and personal — see `drafts/guardian-constellation.md` before touching that code.

---

## API (`api/`)

ASP.NET Core backend. No standalone CLI tooling is configured — run via Docker Compose (see below).

- **Controllers**: `AuthController` (JWT issue, Google/GitHub OAuth callback), `UsersController` (profile endpoint)
- **Models**: `ApplicationUser` extends ASP.NET Identity; `AuthDtos` holds request/response shapes
- **Data**: EF Core with PostgreSQL; migration at `Data/Migrations/20260602000000_InitialCreate.cs`
- **Services**: `TokenService` generates and validates JWTs
- **Config**: Connection string and JWT/OAuth secrets are injected via environment variables — see `.env.example`

---

## Full-stack local development

Copy `.env.example` to `.env` and fill in secrets (JWT, OAuth, Postgres password), then:

```bash
docker compose up --build   # starts postgres, api (→ :5000), web (→ :8081)
```

`Caddyfile` configures the reverse proxy in production. Health check endpoints: `http://localhost:8081/` (web) and `http://localhost:5000/health` (api).

---

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) triggers on push to `main` and runs on a **self-hosted runner**. It deploys using Docker Compose (`docker compose up -d --build --remove-orphans`), then verifies both health-check endpoints before the job completes.

---

## Litepaper & drafts

### Versioning convention (from `README.md`)
- **Patch** (x.x.N) — wording, clarifications, minor refinements
- **Minor** (x.N.0) — new sections, major rewrites, new principles, roadmap updates
- **Major** (N.0.0) — ready for broad external sharing, testnet alignment, formal release

Update the version in the `README.md` header and add a changelog entry at the bottom.

### Branching
- **`main`** — stable working litepaper; small-to-medium edits go here directly
- **Topic branches** (e.g. `draft/tokenomics-revision`) — for large structural changes; consolidate back into `main` with an appropriate version bump once ready

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
