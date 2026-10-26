'use client';

import { useState } from 'react';
import { KnobProvider } from './KnobProvider';
import { Specimen, type GlassPreset } from './Specimen';
import type { AtlasMaterial } from '@/lib/morphismTokens';

const PRESETS: GlassPreset[] = ['ripple', 'lens', 'frost', 'none'];

export function MaterialDetail({ material }: { material: AtlasMaterial }) {
  const [preset, setPreset] = useState<GlassPreset>('ripple');
  return (
    <KnobProvider
      extra={
        material === 'glass' ? (
          <select
            aria-label="Refraction preset"
            value={preset}
            onChange={(e) => setPreset(e.target.value as GlassPreset)}
            className="rounded-lg border border-white/20 bg-black/40 px-2 py-1.5 text-sm text-white"
          >
            {PRESETS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        ) : null
      }
    >
      <Specimen material={material} glassPreset={preset} />
    </KnobProvider>
  );
}
