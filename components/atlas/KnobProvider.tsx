'use client';

import { useState, type ReactNode } from 'react';
import { DEFAULT_KNOBS, knobsToCssVars, type MaterialKnobs } from '@/lib/morphismTokens';

const KNOBS: { key: keyof MaterialKnobs; label: string; min: number; max: number; step: number }[] = [
  { key: 'lightAngle', label: 'Light angle', min: 0, max: 360, step: 1 },
  { key: 'depth', label: 'Depth', min: 0, max: 1, step: 0.01 },
  { key: 'softness', label: 'Softness', min: 0, max: 1, step: 0.01 },
  { key: 'specular', label: 'Specular', min: 0, max: 1, step: 0.01 },
];

export function KnobProvider({ children, extra }: { children: ReactNode; extra?: ReactNode }) {
  const [k, setK] = useState<MaterialKnobs>(DEFAULT_KNOBS);
  return (
    <div style={knobsToCssVars(k) as React.CSSProperties}>
      <fieldset className="mb-8 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur md:grid-cols-5">
        <legend className="px-2 font-mono text-xs uppercase tracking-widest text-white/60">Shared tokens · --mat-*</legend>
        {KNOBS.map(({ key, label, min, max, step }) => (
          <label key={key} className="flex flex-col gap-1 text-sm text-white/80">
            <span className="flex justify-between">
              {label}
              <code className="text-white/50">{key === 'lightAngle' ? `${k[key]}°` : k[key].toFixed(2)}</code>
            </span>
            <input
              type="range" min={min} max={max} step={step} value={k[key]}
              onChange={(e) => setK((p) => ({ ...p, [key]: Number(e.target.value) }))}
              className="accent-pink-400"
            />
          </label>
        ))}
        <div className="flex items-end gap-2">
          <button type="button" onClick={() => setK(DEFAULT_KNOBS)} className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10">
            Reset
          </button>
          {extra}
        </div>
      </fieldset>
      {children}
    </div>
  );
}
