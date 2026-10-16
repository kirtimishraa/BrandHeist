// Diwali decor for the festive hero: fairy lights and rangoli.
// All purely decorative (aria-hidden). Values are deterministic so SSR and client
// markup match; animations live in globals.css and stop under reduced motion.

// Warm white and soft gold only — a quiet string, not a party.
const BULB_COLORS = ["#fff1d6", "#ffd98a"];

type Strand = { swags: number; sag: number; perSwag: number; size: number; className?: string };

const STRANDS: Strand[] = [{ swags: 4, sag: 34, perSwag: 5, size: 4 }];

// Each swag is a quadratic curve dipping `sag` px at its midpoint.
// viewBox height = container height, so y units are px and x units are %.
const wire = ({ swags, sag }: Strand) => {
  const w = 100 / swags;
  let d = "M0 0";
  for (let k = 0; k < swags; k++) d += ` Q${(k + 0.5) * w} ${2 * sag} ${(k + 1) * w} 0`;
  return d;
};

const bulbs = ({ swags, sag, perSwag }: Strand) =>
  Array.from({ length: swags * perSwag }, (_, n) => {
    const k = Math.floor(n / perSwag);
    const i = n % perSwag;
    const t = (i + 0.5) / perSwag;
    return {
      x: (((k + t) * 100) / swags).toFixed(3),
      y: Math.round(4 * sag * t * (1 - t)),
      color: BULB_COLORS[(i + k) % BULB_COLORS.length],
      dur: (3.5 + ((i * 7 + k * 3) % 5) * 0.6).toFixed(2),
      delay: (-((i * 13 + k * 5) % 9) * 0.5).toFixed(2),
    };
  });

export function FairyLights({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`}>
      {STRANDS.map((s, si) => (
        <div key={si} className={`absolute inset-x-0 top-0 h-[90px] opacity-80 ${s.className ?? ""}`}>
          <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 90" preserveAspectRatio="none">
            <path d={wire(s)} fill="none" stroke="rgba(255,236,200,0.14)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
          {bulbs(s).map((b, i) => (
            <span
              key={i}
              className="fairy-bulb absolute -translate-x-1/2 rounded-full"
              style={{
                left: `${b.x}%`,
                top: b.y,
                width: s.size,
                height: s.size * 1.35,
                background: b.color,
                boxShadow: `0 0 ${s.size * 2.5}px ${s.size * 0.25}px ${b.color}99`,
                animationDuration: `${b.dur}s`,
                animationDelay: `${b.delay}s`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Rangoli-style mandala, line-drawn in currentColor.
export function Rangoli({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="-100 -100 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="0.55">
      <circle r="96" strokeDasharray="0.5 3.2" strokeLinecap="round" strokeWidth="1.4" />
      <circle r="88" />
      {Array.from({ length: 24 }, (_, i) => (
        <path key={`o${i}`} d="M0 -88 C7 -78 7 -70 0 -62 C-7 -70 -7 -78 0 -88Z" transform={`rotate(${i * 15})`} />
      ))}
      <circle r="60" strokeDasharray="1 2.6" strokeWidth="1" />
      {Array.from({ length: 12 }, (_, i) => (
        <path key={`m${i}`} d="M0 -58 C12 -44 12 -30 0 -20 C-12 -30 -12 -44 0 -58Z" transform={`rotate(${i * 30})`} />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={`d${i}`} cy="-67" r="1.7" fill="currentColor" transform={`rotate(${i * 30 + 15})`} />
      ))}
      <circle r="18" />
      {Array.from({ length: 8 }, (_, i) => (
        <path key={`i${i}`} d="M0 -17 C5 -11 5 -6 0 -3 C-5 -6 -5 -11 0 -17Z" transform={`rotate(${i * 45})`} />
      ))}
      <circle r="3" fill="currentColor" />
    </svg>
  );
}
