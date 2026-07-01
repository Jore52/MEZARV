# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MEZARV is a single-page portfolio site for the Peruvian plastic artist Pedro Antonio Vejarano Mezarina ("Mezarv"). It is a React 19 + Vite + TypeScript app styled with Tailwind CSS v4, deployed on Vercel. It was scaffolded from Google AI Studio. UI copy is in Spanish — keep it that way.

## Commands

```bash
npm install       # install dependencies
npm run dev       # dev server on port 3000, host 0.0.0.0
npm run build     # production build to dist/
npm run preview   # preview the built bundle
```

There is no test runner, linter, or formatter configured. `tsc` is present (via the `typescript` devDependency) but there is no typecheck script; run `npx tsc --noEmit` for a manual type check.

## Architecture

- **Entry:** `index.html` → `index.tsx` (React root, `StrictMode`) → `App.tsx`.
- **`App.tsx`** is the entire page shell: fixed nav, hero, and a scroll-spy `useEffect` that sets `activeSection` by comparing `window.scrollY + 150` against each section's `offsetTop`. Section `id`s (`inicio`, `artista`, `galeria`, `proceso`, `talleres`, `certificados`, `contacto`) are hardcoded in the scroll logic and must stay in sync with the section elements rendered by `App.tsx` and its child components. Navigation uses smooth-scroll to these anchors, not a router.
- **`components/`** — one section component each: `Profile`, `Gallery`, `InProcess` (Atelier / work-in-progress), `Workshops` (talleres + cultural events), `Certificates` (trayectoria), plus `AICurator` (floating AI chat widget). Note `Gallery` is imported in `App.tsx` but not present in the `components/` glob at all times — verify it exists before assuming.
- **`data/portfolio.ts`** is the single content source of truth: exports `galleryItems`, `atelierItems`, `workshopItems`, `certificates`, and `contactInfo`. Editing site content (artworks, events, contact links) means editing this file, not the components. Content models live in `types.ts` (`Artwork`, `Certificate`, `ProcessItem`, `EventItem`).
- **`services/gemini.ts`** wraps the `@google/genai` client for the AI Curator chatbot. Its system prompt is **dynamically built from `data/portfolio.ts`** — the assistant answers about real catalog items because they are stringified into `systemInstruction` at request time. Model is `gemini-1.5-flash`. All errors are swallowed and returned as friendly Spanish fallback strings; the client is created lazily and the widget degrades gracefully when no API key is present.

## Styling

Tailwind v4 is configured via the `@tailwindcss/vite` plugin (no `tailwind.config.js`). The theme is defined in `index.css` using the `@theme` block — custom tokens include colors `void` (`#09090b`), `gold` (`#d4af37`), `glass`, and fonts `sans` (Inter) / `serif` (Cinzel). Use these token names (e.g. `text-gold`, `bg-void`, `font-serif`) rather than raw hex values. Animations use `framer-motion`; icons use `lucide-react`.

## API key handling (important, and currently fragile)

The Gemini key is resolved through **two different mechanisms** that must both be considered:

1. `vite.config.ts` reads `GEMINI_API_KEY` from the environment and `define`s it as both `process.env.API_KEY` and `process.env.GEMINI_API_KEY` (compile-time inlining).
2. `services/gemini.ts` first checks `import.meta.env.VITE_GEMINI_API_KEY`, then falls back to `process.env.API_KEY`.

So for **local dev** set `GEMINI_API_KEY` in `.env.local` (the README's documented path). For a build where `import.meta.env` is used, the variable must be named `VITE_GEMINI_API_KEY`. When touching key resolution or deployment (Vercel env vars), make sure the variable name matches the path that will actually run. The key is inlined into the client bundle — it is a public/restricted key by design for this static site.

## Deployment

Deployed to Vercel (`npm run build` → `dist/`). The `package.json` `name` field avoids a `---` sequence because Vercel rejected it (see git history); do not reintroduce invalid characters into the project name.
