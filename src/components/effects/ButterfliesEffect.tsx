import { useEffect, useState } from 'react';

interface Butterfly {
  id: number;
  startX: number;
  startY: number;
  delay: number;
  duration: number;
  size: number;
  hue: number;
}

export function ButterfliesEffect() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);

  useEffect(() => {
    const butterflyArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 8,
      size: 20 + Math.random() * 15,
      hue: Math.random() * 360,
    }));
    setButterflies(butterflyArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {butterflies.map((butterfly) => (
        <div
          key={butterfly.id}
          className="absolute animate-butterfly-float"
          style={{
            left: `${butterfly.startX}%`,
            top: `${butterfly.startY}%`,
            animationDelay: `${butterfly.delay}s`,
            animationDuration: `${butterfly.duration}s`,
          }}
        >
          <div
            className="animate-butterfly-flap"
            style={{
              width: `${butterfly.size}px`,
              height: `${butterfly.size}px`,
            }}
          >
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="15" cy="20" rx="10" ry="15" fill={`hsla(${butterfly.hue}, 70%, 65%, 0.7)`} />
              <ellipse cx="15" cy="15" rx="8" ry="10" fill={`hsla(${butterfly.hue + 20}, 70%, 75%, 0.6)`} />
              <ellipse cx="25" cy="20" rx="10" ry="15" fill={`hsla(${butterfly.hue}, 70%, 65%, 0.7)`} />
              <ellipse cx="25" cy="15" rx="8" ry="10" fill={`hsla(${butterfly.hue + 20}, 70%, 75%, 0.6)`} />
              <rect x="19" y="10" width="2" height="20" rx="1" fill="rgba(60, 40, 30, 0.8)" />
              <circle cx="20" cy="12" r="2" fill="rgba(60, 40, 30, 0.9)" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
