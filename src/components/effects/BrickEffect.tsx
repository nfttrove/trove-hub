import { useEffect, useState } from 'react';

interface BrickData {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  color: string;
}

interface BrickEffectProps {
  speed?: number;
  rotation?: boolean;
}

const brickColors = ['#8B4513', '#A0522D', '#CD853F', '#D2691E', '#B87333'];

export function BrickEffect({ speed = 1.0, rotation = true }: BrickEffectProps = {}) {
  const [bricks, setBricks] = useState<BrickData[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 8,
      size: 30 + Math.random() * 20,
      rotation: Math.random() * 360,
      color: brickColors[Math.floor(Math.random() * brickColors.length)],
    }));
    setBricks(items);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bricks.map((brick) => (
        <div
          key={brick.id}
          className="absolute animate-fall"
          style={{
            left: `${brick.left}%`,
            animationDelay: `${brick.delay}s`,
            animationDuration: `${brick.duration / speed}s`,
            width: `${brick.size}px`,
            height: `${brick.size * 0.5}px`,
            transform: rotation ? `rotate(${brick.rotation}deg)` : 'none',
          }}
        >
          <div
            className="w-full h-full rounded-sm relative"
            style={{
              backgroundColor: brick.color,
              boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.2)',
              border: '1px solid rgba(0,0,0,0.2)',
            }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 3px)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
