import { useEffect, useState } from 'react';

interface Raindrop {
  id: number;
  left: number;
  delay: number;
  duration: number;
  length: number;
}

export function RainEffect() {
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);

  useEffect(() => {
    const dropArray = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 0.5 + Math.random() * 0.5,
      length: 20 + Math.random() * 30,
    }));
    setRaindrops(dropArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute -top-10 animate-rain-fall"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
          }}
        >
          <div
            className="bg-gradient-to-b from-blue-300/60 to-blue-400/20"
            style={{
              width: '2px',
              height: `${drop.length}px`,
              borderRadius: '1px',
              boxShadow: '0 0 2px rgba(100,150,255,0.5)',
            }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
