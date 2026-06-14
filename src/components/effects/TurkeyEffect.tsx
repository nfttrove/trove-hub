import { useEffect, useState } from 'react';

interface TurkeyData {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

interface TurkeyEffectProps {
  speed?: number;
  rotation?: boolean;
}

export function TurkeyEffect({ speed = 1.0, rotation = true }: TurkeyEffectProps = {}) {
  const [turkeys, setTurkeys] = useState<TurkeyData[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      size: 40 + Math.random() * 40,
      rotation: Math.random() * 360,
    }));
    setTurkeys(items);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {turkeys.map((turkey) => (
        <div
          key={turkey.id}
          className="absolute animate-fall"
          style={{
            left: `${turkey.left}%`,
            animationDelay: `${turkey.delay}s`,
            animationDuration: `${turkey.duration / speed}s`,
            fontSize: `${turkey.size}px`,
            transform: rotation ? `rotate(${turkey.rotation}deg)` : 'none',
          }}
        >
          🦃
        </div>
      ))}
    </div>
  );
}
