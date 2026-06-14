import { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export function BubblesEffect() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const bubbleArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 6,
      size: 20 + Math.random() * 60,
    }));
    setBubbles(bubbleArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute bottom-0 animate-float-up opacity-0"
          style={{
            left: `${bubble.left}%`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        >
          <div
            className="rounded-full animate-bubble-wobble"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(100,200,255,0.4) 50%, rgba(50,150,255,0.2))',
              boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5), 0 0 20px rgba(100,200,255,0.3)',
              border: '2px solid rgba(255,255,255,0.3)',
            }}
          />
        </div>
      ))}
    </div>
  );
}
