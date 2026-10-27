# Material Morphism Atlas v1 — Design
Date: 2026-10-26 · Host: MelodicBloom/morphism-nextjs · Live: https://morphism-nextjs.vercel.app

## Goal
One hub that presents glass, neu, clay, wood, washi, and nacre as a single material family with shared tokens (light angle, depth, softness, specular). Covers “glassmorphism” via real backdrop-filter + SVG refraction from svg-filter-lab.

## Approved constraints
- Extend morphism-nextjs (do not create a new repo)
- Keep existing home playground (Hero + ClientPlayground + Specs)
- v1 out of scope: npm publish of tokens, Remotion heroes, full upstream component ports

## Architecture
1. **Routes**
   - `/` — existing playground (unchanged behavior)
   - `/atlas` — family index: grid of six material cards → specimen routes
   - `/atlas/[material]` — specimen for `glass | neu | clay | wood | washi | nacre`
2. **Tokens** — extend `lib/morphismTokens.ts` + CSS custom properties in `globals.css`:
   - Shared axes: `--mat-light-angle`, `--mat-depth`, `--mat-softness`, `--mat-specular`
   - Per-material surface/border/shadow/radius/motionCharacter (add neu, wood, washi, nacre; strengthen glass)
3. **Glass specimen** — `GlassPanel` with real `backdrop-filter`; embed 1–2 SVG filter presets (refraction/frost) inlined or fetched from MelodicBloom/svg-filter-lab patterns; URL-tunable knobs for blur/saturation
4. **UI** — Atlas nav linking materials; token knobs (range inputs) that update CSS vars live; `prefers-reduced-motion` disables heavy motion
5. **Copy** — short preservative note per material: what it optimizes for / against

## Success criteria
- `npm run build` + type-check green
- Deployed to existing Vercel project; `/atlas` and six specimens reachable
- Glass specimen visibly uses backdrop-filter + at least one SVG filter
- Proof screenshot at `/workspace/visual-proof/atlas/demo-atlas.png`
- Open PR to MelodicBloom/morphism-nextjs (do not merge unless asked)

## Non-goals v1
Storybook publish, `@melodicbloom/motion` package extract, wood fBm shader perfection, kozo full 20-component port
