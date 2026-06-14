import { useEffect, useState } from 'react';

interface GhostData {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

interface GhostsEffectProps {
  speed?: number;
  rotation?: boolean;
}

export function GhostsEffect({ speed = 1.0 }: GhostsEffectProps = {}) {
  const [ghosts, setGhosts] = useState<GhostData[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 10,
      size: 30 + Math.random() * 30,
    }));
    setGhosts(items);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {ghosts.map((ghost) => (
        <div
          key={ghost.id}
          className="absolute animate-fall"
          style={{
            left: `${ghost.left}%`,
            animationDelay: `${ghost.delay}s`,
            animationDuration: `${ghost.duration / speed}s`,
            fontSize: `${ghost.size}px`,
            opacity: 0.8,
          }}
        >
          👻
        </div>
      ))}
    </div>
  );
}
