/** Inline SVG filter defs (inspired by MelodicBloom/svg-filter-lab presets). No runtime fetch. */
export function AtlasFilters() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
      <defs>
        <filter id="atlas-refract-ripple" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="38" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="atlas-refract-lens" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="turbulence" baseFrequency="0.004" numOctaves="1" seed="8" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="70" xChannelSelector="R" yChannelSelector="B" />
        </filter>
        <filter id="atlas-frost" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="14" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="2" />
        </filter>
        <filter id="atlas-wood-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.18" numOctaves="4" seed="11" />
          <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.2  0 0 0 0 0.08  0 0 0 1.6 -0.3" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="atlas-washi-fiber">
          <feTurbulence type="fractalNoise" baseFrequency="0.6 0.05" numOctaves="3" seed="2" />
          <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.48  0 0 0 0 0.38  0 0 0 1.4 -0.5" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
