import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MaterialDetail } from '@/components/atlas/MaterialDetail';
import { ATLAS_MATERIALS, MATERIAL_SPECS, isAtlasMaterial } from '@/lib/morphismTokens';

export function generateStaticParams() {
  return ATLAS_MATERIALS.map((material) => ({ material }));
}

export function generateMetadata({ params }: { params: { material: string } }): Metadata {
  if (!isAtlasMaterial(params.material)) return {};
  const s = MATERIAL_SPECS[params.material];
  return { title: `${s.name} — Material Morphism Atlas`, description: s.tagline };
}

export default function MaterialPage({ params }: { params: { material: string } }) {
  if (!isAtlasMaterial(params.material)) notFound();
  const s = MATERIAL_SPECS[params.material];
  return (
    <main className="grid gap-10 lg:grid-cols-[1fr_22rem]">
      <section>
        <h1 className="mb-2 text-4xl font-bold">{s.name}</h1>
        <p className="mb-6 text-white/70">{s.tagline}</p>
        <MaterialDetail material={s.id} />
      </section>
      <aside className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-sm leading-relaxed">
        <div><h2 className="mb-1 font-mono text-xs uppercase tracking-widest text-emerald-300">Optimizes for</h2><p className="text-white/80">{s.optimizesFor}</p></div>
        <div><h2 className="mb-1 font-mono text-xs uppercase tracking-widest text-rose-300">Optimizes against</h2><p className="text-white/80">{s.optimizesAgainst}</p></div>
        <div><h2 className="mb-1 font-mono text-xs uppercase tracking-widest text-sky-300">Kept tension</h2><p className="text-white/80">{s.keeps}</p></div>
      </aside>
    </main>
  );
}
