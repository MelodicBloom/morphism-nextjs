import type { MorphismVariant } from '@/types';

interface VariantTokens {
  surface: string;
  border: string;
  shadowIdle: string;
  shadowHover: string;
  shadowPressed: string;
  radius: string;
  focusRing: string;
  motionCharacter: string;
}

export const MORPHISM_TOKENS: Record<MorphismVariant, VariantTokens> = {
  clay: {
    surface: 'var(--clay-surface, linear-gradient(145deg, #c084fc, #7c3aed))',
    border: 'none',
    shadowIdle: 'var(--clay-shadow-idle)',
    shadowHover: 'var(--clay-shadow-hover)',
    shadowPressed: 'var(--clay-shadow-pressed)',
    radius: '1.5rem',
    focusRing: 'var(--focus-ring)',
    motionCharacter: 'spring-bouncy',
  },
  silicon: {
    surface: 'var(--silicon-surface)',
    border: 'var(--silicon-border)',
    shadowIdle: 'var(--silicon-specular)',
    shadowHover:
      'inset 0 1px 0 rgba(255,255,255,0.2), inset 1px 0 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.2)',
    shadowPressed:
      'inset 0 2px 4px rgba(0,0,0,0.3), inset 1px 0 0 rgba(255,255,255,0.05)',
    radius: 'var(--silicon-radius)',
    focusRing: '0 0 0 2px rgba(200,200,210,0.6)',
    motionCharacter: 'silicon-flicker',
  },
  glass: {
    surface: 'var(--glass-bg)',
    border: 'var(--glass-border)',
    shadowIdle: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
    shadowHover: '0 12px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.25)',
    shadowPressed: '0 4px 16px rgba(0,0,0,0.08), inset 0 2px 4px rgba(0,0,0,0.1)',
    radius: '1.5rem',
    focusRing: '0 0 0 3px rgba(255,255,255,0.3)',
    motionCharacter: 'glass-shimmer',
  },
  gel: {
    surface: 'var(--gel-bulge)',
    border: '1px solid rgba(255,255,255,0.25)',
    shadowIdle: 'var(--gel-surface-tension), 0 8px 24px rgba(0,0,0,0.15)',
    shadowHover:
      'var(--gel-surface-tension), 0 12px 32px rgba(0,0,0,0.2), 0 0 20px rgba(255,255,255,0.1)',
    shadowPressed:
      'inset 0 3px 8px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.1)',
    radius: '20px',
    focusRing: '0 0 0 3px rgba(45, 212, 191, 0.5)',
    motionCharacter: 'gel-pulse',
  },
  paper: {
    surface: 'var(--paper-bg)',
    border: '1px solid rgba(0,0,0,0.06)',
    shadowIdle: 'var(--paper-inset), 0 2px 8px rgba(0,0,0,0.04)',
    shadowHover:
      'var(--paper-inset), 0 6px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
    shadowPressed: 'inset 0 2px 6px rgba(0,0,0,0.1)',
    radius: '2px',
    focusRing: '0 0 0 3px rgba(42, 37, 32, 0.3)',
    motionCharacter: 'paper-rustle',
  },
};

export function getVariantTokens(variant: MorphismVariant): VariantTokens {
  return MORPHISM_TOKENS[variant];
}

/* ───────────────────────── Material Morphism Atlas ───────────────────────── */

export const ATLAS_MATERIALS = ['glass', 'neu', 'clay', 'wood', 'washi', 'nacre'] as const;
export type AtlasMaterial = (typeof ATLAS_MATERIALS)[number];

/** Shared physical knobs every material reads (mapped to --mat-* CSS vars). */
export interface MaterialKnobs {
  lightAngle: number; // deg, 0 = light from top
  depth: number; // 0–1
  softness: number; // 0–1
  specular: number; // 0–1
}

export const DEFAULT_KNOBS: MaterialKnobs = {
  lightAngle: 135,
  depth: 0.6,
  softness: 0.5,
  specular: 0.6,
};

export interface MaterialSpec {
  id: AtlasMaterial;
  name: string;
  tagline: string;
  optimizesFor: string;
  optimizesAgainst: string;
  keeps: string;
  className: string;
  stage: string; // backdrop for the specimen
  ink: string;
}

export const MATERIAL_SPECS: Record<AtlasMaterial, MaterialSpec> = {
  glass: {
    id: 'glass',
    name: 'Glass',
    tagline: 'Real refraction over a living backdrop.',
    optimizesFor: 'Layering and context — you keep sight of what lies beneath while a surface floats above it.',
    optimizesAgainst: 'Legibility on busy content and low-power devices; backdrop-filter is a GPU cost, not a free texture.',
    keeps: 'The tension between transparency and contrast is held open: frost presets trade view for readability on purpose.',
    className: 'mat-glass',
    stage: 'radial-gradient(circle at 20% 30%, #ff6b9d 0, transparent 40%), radial-gradient(circle at 80% 70%, #60a5fa 0, transparent 45%), radial-gradient(circle at 60% 20%, #fbbf24 0, transparent 30%), #1b1640',
    ink: '#fff',
  },
  neu: {
    id: 'neu',
    name: 'Neumorphism',
    tagline: 'Extruded from the same sheet it sits on.',
    optimizesFor: 'Calm, monochrome, tactile controls where form reads through light alone.',
    optimizesAgainst: 'Contrast and accessibility — affordance lives in shadows, so state must be doubled with color or motion.',
    keeps: 'We keep the rejected critique visible: neu fails WCAG by default, so the specimen ships an accent focus ring.',
    className: 'mat-neu',
    stage: '#e4e8ee',
    ink: '#3b4252',
  },
  clay: {
    id: 'clay',
    name: 'Clay',
    tagline: 'Soft, inflated, thumb-pressed.',
    optimizesFor: 'Playfulness and approachability; big hit targets that invite pressing.',
    optimizesAgainst: 'Density and seriousness — clay spends space and reads as toy-like in dashboards.',
    keeps: 'Inherits ClayForge’s existing shadow stack rather than replacing it.',
    className: 'mat-clay',
    stage: 'linear-gradient(135deg, #fde2f3, #e9d5ff)',
    ink: '#3b0764',
  },
  wood: {
    id: 'wood',
    name: 'Wood',
    tagline: 'Grain, warmth, and a carved edge.',
    optimizesFor: 'Warmth, craft, and permanence — surfaces that feel made rather than rendered.',
    optimizesAgainst: 'Neutrality and scale; procedural grain gets noisy at small sizes and resists theming.',
    keeps: 'Grain is procedural SVG turbulence, not a bitmap — a choice for weight over photorealism.',
    className: 'mat-wood',
    stage: '#2a1d14',
    ink: '#fff4e6',
  },
  washi: {
    id: 'washi',
    name: 'Washi',
    tagline: 'Fibrous paper that lets light through.',
    optimizesFor: 'Quiet reading surfaces, translucency without glass glare, editorial calm.',
    optimizesAgainst: 'Strong hierarchy and dark themes; washi is a daylight material.',
    keeps: 'Extends the existing paper variant with fibers and backlight rather than forking it.',
    className: 'mat-washi',
    stage: 'linear-gradient(160deg, #f3ede1, #e6dccb)',
    ink: '#2a2520',
  },
  nacre: {
    id: 'nacre',
    name: 'Nacre',
    tagline: 'Iridescence that shifts with the light angle.',
    optimizesFor: 'Delight and preciousness — moments, badges, hero objects that reward attention.',
    optimizesAgainst: 'Ubiquity and stillness; iridescence everywhere becomes noise, and it leans on motion.',
    keeps: 'Hue drift is driven by --mat-light-angle, so it stays coherent with every other material.',
    className: 'mat-nacre',
    stage: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
    ink: '#1e1b4b',
  },
};

export function knobsToCssVars(k: MaterialKnobs): Record<string, string> {
  const rad = ((k.lightAngle - 90) * Math.PI) / 180;
  return {
    '--mat-light-angle': `${k.lightAngle}deg`,
    '--mat-depth': String(k.depth),
    '--mat-softness': String(k.softness),
    '--mat-specular': String(k.specular),
    // derived light vector: shadows fall opposite the light
    '--mat-lx': Math.cos(rad).toFixed(3),
    '--mat-ly': Math.sin(rad).toFixed(3),
  };
}

export function isAtlasMaterial(v: string): v is AtlasMaterial {
  return (ATLAS_MATERIALS as readonly string[]).includes(v);
}
