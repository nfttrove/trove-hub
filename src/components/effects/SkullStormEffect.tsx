import { useMemo } from 'react';

/**
 * Transient skull storm — fired on a bearish call. Falling 💀 across the canvas.
 * Reuses the shared `fall` keyframe; self-expires via the parent's timeout.
 */
export function SkullStormEffect() {
  const skulls = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        duration: 3 + Math.random() * 3,
        size: 20 + Math.random() * 36,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {skulls.map((s) => (
        <div
          key={s.id}
          className="absolute animate-fall"
          style={{
            left: `${s.left}%`,
            top: '-60px',
            fontSize: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        >
          💀
        </div>
      ))}
    </div>
  );
}
