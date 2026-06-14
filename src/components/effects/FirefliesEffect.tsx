import { useEffect, useState } from 'react';

interface Firefly {
  id: number;
  startX: number;
  startY: number;
  delay: number;
  duration: number;
  size: number;
}

export function FirefliesEffect() {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    const fireflyArray = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 8 + Math.random() * 6,
      size: 4 + Math.random() * 4,
    }));
    setFireflies(fireflyArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className="absolute animate-firefly-float"
          style={{
            left: `${firefly.startX}%`,
            top: `${firefly.startY}%`,
            animationDelay: `${firefly.delay}s`,
            animationDuration: `${firefly.duration}s`,
          }}
        >
          <div
            className="rounded-full animate-firefly-glow"
            style={{
              width: `${firefly.size}px`,
              height: `${firefly.size}px`,
              background: 'radial-gradient(circle, rgba(255,255,150,1) 0%, rgba(255,255,100,0.6) 50%, rgba(255,200,0,0) 100%)',
              boxShadow: '0 0 15px rgba(255,255,100,0.9), 0 0 25px rgba(255,200,0,0.5)',
            }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-900/5 pointer-events-none" />
    </div>
  );
}
