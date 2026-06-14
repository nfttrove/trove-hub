import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export function PetalsEffect() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const petalArray = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 8 + Math.random() * 8,
      size: 10 + Math.random() * 15,
      rotation: Math.random() * 360,
    }));
    setPetals(petalArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute -top-4 animate-petal-fall"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        >
          <div
            className="animate-petal-spin"
            style={{
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              transform: `rotate(${petal.rotation}deg)`,
            }}
          >
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="10" cy="6" rx="6" ry="8" fill="rgba(255, 182, 193, 0.7)" />
              <ellipse cx="6" cy="10" rx="8" ry="6" fill="rgba(255, 192, 203, 0.7)" />
              <ellipse cx="14" cy="10" rx="8" ry="6" fill="rgba(255, 192, 203, 0.7)" />
              <ellipse cx="10" cy="14" rx="6" ry="8" fill="rgba(255, 182, 193, 0.7)" />
              <circle cx="10" cy="10" r="3" fill="rgba(255, 218, 185, 0.8)" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
