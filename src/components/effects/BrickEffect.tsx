import { useEffect, useState } from 'react';

interface BrickData {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  palette: [string, string, string]; // light, base, dark
}

interface BrickEffectProps {
  speed?: number;
}

const palettes: [string, string, string][] = [
  ['#c46b3f', '#9c4a28', '#6b2f17'],
  ['#bd5e34', '#8f4220', '#5e2913'],
  ['#cf7f4f', '#a85a32', '#76391d'],
  ['#b85a37', '#8a3f24', '#5a2613'],
  ['#c98a55', '#a86a38', '#724622'],
];

export function BrickEffect({ speed = 1.0 }: BrickEffectProps = {}) {
  const [bricks, setBricks] = useState<BrickData[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 8,
      size: 30 + Math.random() * 22,
      palette: palettes[Math.floor(Math.random() * palettes.length)],
    }));
    setBricks(items);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bricks.map((brick) => {
        const [light, base, dark] = brick.palette;
        return (
          <div
            key={brick.id}
            className="absolute animate-fall"
            style={{
              left: `${brick.left}%`,
              animationDelay: `${brick.delay}s`,
              animationDuration: `${brick.duration / speed}s`,
            }}
          >
            <div
              style={{
                width: `${brick.size}px`,
                height: `${brick.size * 0.5}px`,
                borderRadius: '2px',
                background: `linear-gradient(135deg, ${light} 0%, ${base} 42%, ${dark} 100%)`,
                border: '1px solid rgba(50,18,8,0.55)',
                boxShadow:
                  'inset 1.5px 1.5px 0 rgba(255,225,200,0.35), inset -2px -2px 3px rgba(0,0,0,0.5), 0 2px 5px rgba(0,0,0,0.35)',
                backgroundImage:
                  `linear-gradient(135deg, ${light} 0%, ${base} 42%, ${dark} 100%),` +
                  'radial-gradient(rgba(0,0,0,0.12) 1px, transparent 1px)',
                backgroundSize: '100% 100%, 5px 5px',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
