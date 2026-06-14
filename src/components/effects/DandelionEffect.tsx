import { useEffect, useState } from 'react';

interface Seed {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export function DandelionEffect() {
  const [seeds, setSeeds] = useState<Seed[]>([]);

  useEffect(() => {
    const seedArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 10 + Math.random() * 10,
      size: 15 + Math.random() * 15,
    }));
    setSeeds(seedArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {seeds.map((seed) => (
        <div
          key={seed.id}
          className="absolute -top-4 animate-dandelion-drift"
          style={{
            left: `${seed.left}%`,
            animationDelay: `${seed.delay}s`,
            animationDuration: `${seed.duration}s`,
          }}
        >
          <div
            className="animate-dandelion-spin"
            style={{
              width: `${seed.size}px`,
              height: `${seed.size}px`,
            }}
          >
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.8">
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 20;
                  const y1 = 20;
                  const x2 = 20 + Math.cos(angle) * 15;
                  const y2 = 20 + Math.sin(angle) * 15;
                  return (
                    <g key={i}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="rgba(220, 220, 220, 0.6)"
                        strokeWidth="0.5"
                      />
                      <circle cx={x2} cy={y2} r="1.5" fill="rgba(240, 240, 240, 0.7)" />
                    </g>
                  );
                })}
                <line x1="20" y1="20" x2="20" y2="30" stroke="rgba(180, 180, 150, 0.5)" strokeWidth="1" />
                <circle cx="20" cy="20" r="1" fill="rgba(200, 200, 180, 0.8)" />
              </g>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
