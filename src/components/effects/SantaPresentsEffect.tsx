import { useEffect, useState } from 'react';

interface Present {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

const presentColors = ['#ff0000', '#00aa00', '#0066ff', '#ffcc00', '#ff00ff'];

interface SantaPresentsEffectProps {
  speed?: number;
  rotation?: boolean;
}

export function SantaPresentsEffect({ speed = 1.0 }: SantaPresentsEffectProps = {}) {
  const [presents, setPresents] = useState<Present[]>([]);

  useEffect(() => {
    const presentArray = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 4 + Math.random() * 4,
      size: 20 + Math.random() * 20,
      color: presentColors[Math.floor(Math.random() * presentColors.length)],
    }));
    setPresents(presentArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {presents.map((present) => (
        <div
          key={present.id}
          className="absolute -top-4 animate-fall"
          style={{
            left: `${present.left}%`,
            animationDelay: `${present.delay}s`,
            animationDuration: `${present.duration / speed}s`,
          }}
        >
          <div
            className="rounded-sm relative animate-present-spin"
            style={{
              width: `${present.size}px`,
              height: `${present.size}px`,
              backgroundColor: present.color,
              boxShadow: `inset -4px -4px 8px rgba(0,0,0,0.3), inset 4px 4px 8px rgba(255,255,255,0.3)`,
            }}
          >
            <div
              className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-300"
              style={{ transform: 'translateY(-50%)' }}
            />
            <div
              className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-300"
              style={{ transform: 'translateX(-50%)' }}
            />
            <div
              className="absolute -top-2 left-1/2 transform -translate-x-1/2"
              style={{ fontSize: `${present.size * 0.4}px` }}
            >
              🎀
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
