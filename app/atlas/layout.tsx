import Link from 'next/link';
import type { ReactNode } from 'react';
import { AtlasFilters } from '@/components/atlas/AtlasFilters';
import { ATLAS_MATERIALS, MATERIAL_SPECS } from '@/lib/morphismTokens';

export default function AtlasLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen px-6 py-10 text-white md:px-12">
      <AtlasFilters />
      <nav className="mb-10 flex flex-wrap items-center gap-3 text-sm" aria-label="Atlas">
        <Link href="/" className="text-white/60 hover:text-white">← Playground</Link>
        <Link href="/atlas" className="font-semibold">Material Morphism Atlas</Link>
        <span className="text-white/30">/</span>
        {ATLAS_MATERIALS.map((m) => (
          <Link key={m} href={`/atlas/${m}`} className="rounded-full border border-white/15 px-3 py-1 text-white/70 hover:bg-white/10 hover:text-white">
            {MATERIAL_SPECS[m].name}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
