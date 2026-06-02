# TerAustralis — Landing Site

The marketing / landing site for the **TerAustralis Incognita Protocol**
("Starbase Down Under"). Built with React 19, TypeScript, and Vite.

> For the protocol vision and litepaper, see the [root README](../README.md).

## What's here

A single-page site (`src/App.tsx`) with:

- An animated starfield hero canvas (twinkling stars + shooting stars)
- Features grid, stats bar, and a phased roadmap
- Call-to-action and footer linking to [x.com/TerAustralis](https://x.com/TerAustralis)

Most of the layout and copy lives in `src/App.tsx`; styling is in `src/App.css`.

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start the dev server with HMR
```

The dev server prints a local URL (typically http://localhost:5173).

## Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with hot reload    |
| `npm run build`   | Type-check (`tsc -b`) and build for production |
| `npm run preview` | Preview the production build locally         |
| `npm run lint`    | Run ESLint over the project                  |

## Project structure

```
my-app/
├── index.html          # HTML entry point
├── src/
│   ├── main.tsx        # React entry point
│   ├── App.tsx         # Page layout, sections, and starfield canvas
│   ├── App.css         # All page styling
│   ├── index.css       # Global/base styles
│   └── assets/         # Images (hero, logos)
├── public/             # Static assets served as-is (favicon, icons)
└── vite.config.ts      # Vite configuration
```

## Tech stack

- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) with [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)
- [ESLint](https://eslint.org)
