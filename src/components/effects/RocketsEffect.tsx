import { useEffect, useState, type CSSProperties } from 'react';

interface Rocket {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  angle: number; // degrees from vertical; + leans right
  drift: number; // horizontal travel (vh) matching the angle
}

export function RocketsEffect() {
  const [rockets, setRockets] = useState<Rocket[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: 14 }, (_, i) => {
      const angle = Math.random() * 44 - 22; // -22..22°
      // Drift matches the lean so each rocket travels along its nose direction.
      const drift = Math.tan((angle * Math.PI) / 180) * 120;
      return {
        id: i,
        left: 4 + Math.random() * 92,
        delay: Math.random() * 5,
        duration: 2.2 + Math.random() * 1.8,
        size: 28 + Math.random() * 22,
        angle,
        drift,
      };
    });
    setRockets(arr);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {rockets.map((r) => (
        <div
          key={r.id}
          className="absolute bottom-0"
          style={{
            left: `${r.left}%`,
            '--drift': `${r.drift}vh`,
            animation: `rocket-fly ${r.duration}s linear ${r.delay}s infinite`,
          } as CSSProperties}
        >
          {/* The rocket + flame are one rigid unit, tilted to the trajectory. */}
          <div className="relative flex flex-col items-center" style={{ transform: `rotate(${r.angle}deg)` }}>
            {/* Rocket, rotated -45° so its nose points up the unit (i.e. along travel). */}
            <div
              className="relative z-10"
              style={{
                fontSize: `${r.size}px`,
                transform: 'rotate(-45deg)',
                filter: 'drop-shadow(0 0 6px rgba(255,160,40,0.55))',
              }}
            >
              🚀
            </div>
            {/* Flame — trails directly behind the tail, tucked under the rocket. */}
            <div
              className="relative animate-rocket-flame"
              style={{
                marginTop: `-${r.size * 0.42}px`,
                zIndex: 0,
                width: `${r.size * 0.5}px`,
                height: `${r.size * 1.5}px`,
                transformOrigin: 'top center',
                background:
                  'radial-gradient(50% 60% at 50% 22%, rgba(255,244,190,0.95) 0%, rgba(255,150,0,0.85) 42%, rgba(255,45,0,0.4) 74%, transparent 100%)',
                borderRadius: '45% 45% 50% 50% / 28% 28% 80% 80%',
                filter: 'blur(2px)',
              }}
            />
            {/* Smoke puff trailing the flame. */}
            <div
              className="animate-rocket-smoke"
              style={{
                marginTop: `-${r.size * 0.45}px`,
                width: `${r.size * 0.7}px`,
                height: `${r.size}px`,
                background: 'radial-gradient(circle, rgba(210,210,210,0.32) 0%, rgba(150,150,150,0.14) 50%, transparent 100%)',
                borderRadius: '50%',
                filter: 'blur(8px)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
