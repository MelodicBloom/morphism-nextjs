'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { DEFAULT_KNOBS, knobsToCssVars, type MaterialKnobs } from '@/lib/morphismTokens';

const KNOBS: { key: keyof MaterialKnobs; label: string; min: number; max: number; step: number }[] = [
  { key: 'lightAngle', label: 'Light angle', min: 0, max: 360, step: 1 },
  { key: 'depth', label: 'Depth', min: 0, max: 1, step: 0.01 },
  { key: 'softness', label: 'Softness', min: 0, max: 1, step: 0.01 },
  { key: 'specular', label: 'Specular', min: 0, max: 1, step: 0.01 },
];

type GlassKnobs = { blur: number; saturation: number };
const DEFAULT_GLASS: GlassKnobs = { blur: 18, saturation: 170 };

function parseGlass(search: string): GlassKnobs {
  const params = new URLSearchParams(search);
  const read = (key: keyof GlassKnobs, max: number) => {
    const values = params.getAll(key);
    if (values.length !== 1 || !/^-?\d+(?:\.\d+)?$/.test(values[0])) return DEFAULT_GLASS[key];
    const value = Number(values[0]);
    return Number.isFinite(value) ? Math.round(Math.max(0, Math.min(max, value))) : DEFAULT_GLASS[key];
  };
  return { blur: read('blur', 40), saturation: read('saturation', 300) };
}

export function KnobProvider({ children, extra, glassControls = false }: { children: ReactNode; extra?: ReactNode; glassControls?: boolean }) {
  const [k, setK] = useState<MaterialKnobs>(DEFAULT_KNOBS);
  const [glass, setGlass] = useState<GlassKnobs>(DEFAULT_GLASS);
  useEffect(() => {
    if (!glassControls) return;
    const sync = () => setGlass(parseGlass(window.location.search));
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, [glassControls]);

  function updateGlass(next: GlassKnobs | null) {
    const url = new URL(window.location.href);
    if (next) {
      url.searchParams.set('blur', String(next.blur));
      url.searchParams.set('saturation', String(next.saturation));
    } else {
      url.searchParams.delete('blur');
      url.searchParams.delete('saturation');
    }
    window.history.replaceState(window.history.state, '', url);
    setGlass(next ?? DEFAULT_GLASS);
  }
  return (
    <div className="mat-scope" style={{ ...knobsToCssVars(k), ...(glassControls ? { '--atlas-glass-blur': `${glass.blur}px`, '--atlas-glass-saturation': `${glass.saturation}%` } : {}) } as React.CSSProperties}>
      <fieldset className="mb-8 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur md:grid-cols-5">
        <legend className="px-2 font-mono text-xs uppercase tracking-widest text-white/60">Shared tokens · --mat-*</legend>
        {KNOBS.map(({ key, label, min, max, step }) => (
          <label key={key} className="flex flex-col gap-1 text-sm text-white/80">
            <span className="flex flex-wrap justify-between gap-x-2">
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
        {glassControls && ([{ key: 'blur', label: 'Glass blur', max: 40, unit: 'px' }, { key: 'saturation', label: 'Glass saturation', max: 300, unit: '%' }] as const).map(({ key, label, max, unit }) => (
          <label key={key} className="flex flex-col gap-1 text-sm text-white/80">
            <span className="flex flex-wrap justify-between gap-x-2">{label}<code className="text-white/50">{glass[key]}{unit}</code></span>
            <input type="range" min={0} max={max} step={1} value={glass[key]} className="accent-pink-400"
              onChange={(e) => updateGlass({ ...glass, [key]: Number(e.target.value) })} />
          </label>
        ))}
        <div className="flex items-end gap-2">
          <button type="button" onClick={() => { setK(DEFAULT_KNOBS); if (glassControls) updateGlass(null); }} className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10">
            Reset
          </button>
          {extra}
        </div>
      </fieldset>
      {children}
    </div>
  );
}

