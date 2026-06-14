import { useMemo } from 'react';

const colors = ['#ff3b3b', '#37e06a', '#3b82f6', '#ffd23b', '#ff5ce0', '#36e0ff', '#ff8a3b', '#ffffff'];
const COUNT = 26;

// Gentle sagging wire across the top; bulbs hang from it.
function wireY(f: number) {
  return 42 + 16 * Math.sin(f * Math.PI * 5);
}

export function LightsEffect() {
  const bulbs = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const f = (i + 0.5) / COUNT;
        return { id: i, x: f * 100, y: wireY(f), color: colors[i % colors.length], delay: (i % 6) * 0.22 };
      }),
    [],
  );

  const wirePath = useMemo(() => {
    const pts = Array.from({ length: 121 }, (_, k) => {
      const f = k / 120;
      return `${(f * 1920).toFixed(1)},${wireY(f).toFixed(1)}`;
    });
    return 'M ' + pts.join(' L ');
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute top-0 left-0 w-full" height="110" viewBox="0 0 1920 110" preserveAspectRatio="none">
        <path d={wirePath} stroke="rgba(38,42,50,0.85)" strokeWidth="2.5" fill="none" />
      </svg>

      {bulbs.map((b) => (
        <div key={b.id} className="absolute" style={{ left: `${b.x}%`, top: `${b.y}px`, transform: 'translateX(-50%)' }}>
          <div style={{ width: 4, height: 5, margin: '0 auto', background: '#3a3f47', borderRadius: '1px 1px 0 0' }} />
          <div
            className="animate-christmas-light"
            style={{
              width: 11,
              height: 16,
              borderRadius: '50% 50% 50% 50% / 38% 38% 62% 62%',
              background: `radial-gradient(42% 36% at 40% 30%, #ffffff 0%, ${b.color} 46%, ${b.color} 100%)`,
              boxShadow: `0 0 8px ${b.color}, 0 0 16px ${b.color}88`,
              animationDelay: `${b.delay}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
