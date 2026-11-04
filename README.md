# Morphism UI Playground

Advanced tactile interfaces with physics-based interactions, multi-sensory feedback, and Figma-ready component architecture.

## Features

- **Claymorphic Synthesizer** — Musical keyboard with Web Audio API, spring physics, particle bursts
- **Orbital Typewriter** — Circular keyboard with haptic feedback, speech synthesis
- **Physics States Gallery** — Interactive demonstrations of puff, squish, swell, bounce
- **Spring Damping Control** — Real-time physics parameter adjustment
- **Ambient Particle Background** — Canvas-based connected particle system
- **Cursor Glow Follower** — Magnetic cursor tracking with lag

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Web Audio API
- Web Speech API
- Vibration API

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Component Architecture

```
components/
├── morphism/
│   ├── ClayButton.tsx      # Multi-state clay button with liquid fill
│   ├── ClayCard.tsx        # 3D tilt card with squircle support
│   ├── GlassPanel.tsx      # Backdrop-filter glass container
│   └── GlassButton.tsx     # Sheen-effect glass button
├── keyboard/
│   ├── KeyboardKey.tsx     # White/black key with physics
│   ├── Visualizer.tsx      # Audio-reactive bar visualizer
│   └── Synthesizer.tsx     # Complete keyboard instrument
├── typewriter/
│   ├── CircularKey.tsx     # Orbital character key
│   ├── TypewriterScreen.tsx # Circular display with cursor
│   └── OrbitalTypewriter.tsx # Full typewriter assembly
├── physics/
│   └── PhysicsDemo.tsx     # Interactive physics gallery
└── ui/
    ├── AmbientBackground.tsx # Canvas particle system
    └── CursorGlow.tsx        # Magnetic cursor follower

hooks/
├── useAudioEngine.ts       # Web Audio API with ADSR envelope
├── useHaptic.ts            # Vibration API patterns
├── usePhysicsSpring.ts     # Damped harmonic oscillator
└── useParticleBurst.ts     # GSAP particle explosion

types/
└── index.ts               # TypeScript interfaces & types
```

## Design Tokens

### Claymorphism Shadow Stack
```css
/* Outer depth */
0 24px 48px -8px rgba(0,0,0,0.25)

/* Inner volume - bottom occlusion */
inset 0 -8px 24px rgba(0,0,0,0.12)

/* Inner volume - top light reflection */
inset 0 8px 24px rgba(255,255,255,0.55)

/* Edge highlight */
inset 0 2px 4px rgba(255,255,255,0.5)
```

### Spring Easings
| Name | Value | Use Case |
|------|-------|----------|
| bouncy | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Hover states |
| heavy | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Magnetic pull |
| gentle | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Subtle transitions |
| elastic | `cubic-bezier(0.68, -0.6, 0.32, 1.6)` | Bounce release |
| damped | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Press states |

## Keyboard Controls

### Synthesizer
- **White keys**: A S D F G H J K
- **Black keys**: W E T Y U
- **Sustain toggle**: Click button or use spacebar

### Typewriter
- Type any letter or number on physical keyboard
- Circular keys light up on corresponding input

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Static Export
```bash
npm run build
# Output in ./dist directory
```

## Performance

- GPU-accelerated transforms (`translate3d`, `will-change`)
- Lazy-loaded animation libraries
- Canvas particles with connection culling
- Reduced motion media query support
- Optimized package imports (Next.js experimental)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Requires Web Audio API support

## License

MIT

## Visual proof

[![Live demo](https://img.shields.io/badge/live%20demo-morphism-nextjs.vercel.app-111?style=for-the-badge&logo=vercel)](https://morphism-nextjs.vercel.app)

[![morphism-nextjs hero loop](docs/visual-proof/hero-poster.jpg)](docs/visual-proof/hero.mp4)

Poster links to an 8 s hero loop (`docs/visual-proof/hero.mp4`); social card at `docs/visual-proof/og.png`. Generated with [visual-proof-kit](https://github.com/MelodicBloom/visual-proof-kit).

Lighthouse: run locally — `npx lighthouse https://morphism-nextjs.vercel.app --view`
