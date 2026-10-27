'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { AtlasMaterial } from '@/lib/morphismTokens';
import { MATERIAL_SPECS } from '@/lib/morphismTokens';
import { cn } from '@/lib/utils';

export type GlassPreset = 'none' | 'ripple' | 'lens' | 'frost';

const GLASS_FILTER: Record<GlassPreset, string | undefined> = {
  none: undefined,
  ripple: 'url(#atlas-refract-ripple)',
  lens: 'url(#atlas-refract-lens)',
  frost: 'url(#atlas-frost)',
};

const SCENE_CLIP: Record<'sm' | 'lg', string> = {
  // Matches the specimen dims (lg: h-56 w-72, sm: h-28 w-40) centred in the stage,
  // and the .mat-glass radius, so the refraction only shows *through* the glass.
  lg: 'inset(calc(50% - 7rem) calc(50% - 9rem) round 1.75rem)',
  sm: 'inset(calc(50% - 3.5rem) calc(50% - 5rem) round 1.75rem)',
};

function SceneShapes() {
  return (
    <>
      <div className="absolute left-[12%] top-[18%] h-40 w-40 rounded-full bg-pink-400" />
      <div className="absolute right-[14%] bottom-[14%] h-48 w-48 rounded-full bg-sky-400" />
      <div className="absolute left-[46%] top-[8%] h-24 w-24 rotate-12 rounded-2xl bg-amber-300" />
      <div className="absolute inset-x-0 top-1/2 font-mono text-[10px] leading-3 text-white/60 break-all">
        {'MATERIAL·MORPHISM·ATLAS·'.repeat(40)}
      </div>
    </>
  );
}

/** Backdrop scene the glass refracts — real content, so backdrop-filter has something to bend.
 *  The scene itself stays unfiltered; a filtered copy is clipped to the glass surface so the
 *  refraction preset never bleeds into the surrounding stage. */
function GlassScene({ preset, size }: { preset: GlassPreset; size: 'sm' | 'lg' }) {
  const filter = GLASS_FILTER[preset];
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <SceneShapes />
      {filter && (
        <div className="absolute inset-0" style={{ filter, clipPath: SCENE_CLIP[size] }}>
          <SceneShapes />
        </div>
      )}
    </div>
  );
}

export function Specimen({
  material,
  size = 'lg',
  glassPreset = 'ripple',
}: {
  material: AtlasMaterial;
  size?: 'sm' | 'lg';
  glassPreset?: GlassPreset;
}) {
  const spec = MATERIAL_SPECS[material];
  const reduce = useReducedMotion();
  const dims = size === 'lg' ? 'h-56 w-72' : 'h-28 w-40';

  return (
    <div
      className={cn('relative flex items-center justify-center overflow-hidden rounded-3xl', size === 'lg' ? 'h-[22rem]' : 'h-48')}
      style={{ background: spec.stage }}
    >
      {material === 'glass' && <GlassScene preset={glassPreset} size={size} />}
      <motion.button
        type="button"
        aria-label={`${spec.name} specimen`}
        className={cn('mat-specimen flex flex-col items-start justify-end p-5 text-left', spec.className, dims)}
        style={{ color: material === 'nacre' ? '#1e1b4b' : spec.ink }}
        whileHover={reduce ? undefined : { y: -6, scale: 1.02 }}
        whileTap={reduce ? undefined : { y: 2, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
      >
        {(material === 'wood' || material === 'washi') && <span className="mat-grain" aria-hidden />}
        {material === 'nacre' && <span className="mat-sheen" aria-hidden />}
        <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">{spec.id}</span>
        <span className="relative z-10 text-lg font-semibold">{spec.name}</span>
      </motion.button>
    </div>
  );
}
