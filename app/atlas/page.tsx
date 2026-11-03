import Link from 'next/link';
import type { Metadata } from 'next';
import { KnobProvider } from '@/components/atlas/KnobProvider';
import { Specimen } from '@/components/atlas/Specimen';
import { ATLAS_MATERIALS, MATERIAL_SPECS } from '@/lib/morphismTokens';

export const metadata: Metadata = {
  title: 'Material Morphism Atlas — ClayForge',
  description: 'Glass, neu, clay, wood, washi and nacre on one shared light model.',
};

export default function AtlasIndex() {
  return (
    <main id="main-content">
      <header className="mb-8 max-w-2xl">
        <h1 className="text-4xl font-bold md:text-5xl">Material Morphism Atlas</h1>
        <p className="mt-3 text-white/70">
          Six materials, one light. Every specimen reads the same <code>--mat-light-angle</code>, <code>--mat-depth</code>,{' '}
          <code>--mat-softness</code> and <code>--mat-specular</code> — move a knob and the whole atlas re-lights together.
        </p>
      </header>
      <KnobProvider>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {ATLAS_MATERIALS.map((m) => {
            const s = MATERIAL_SPECS[m];
            return (
              <article key={m} className="rounded-3xl border border-white/10 bg-white/[0.03] p-3">
                <Specimen material={m} size="sm" />
                <div className="p-3">
                  <h2 className="text-lg font-semibold">
                    <Link href={`/atlas/${m}`} className="hover:underline">{s.name} →</Link>
                  </h2>
                  <p className="text-sm text-white/60">{s.tagline}</p>
                </div>
              </article>
            );
          })}
        </div>
      </KnobProvider>
    </main>
  );
}
