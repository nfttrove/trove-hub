import { useEffect, useState } from 'react';

interface Leaf {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  rotation: number;
}

const leafColors = ['#d97706', '#ea580c', '#dc2626', '#c2410c', '#92400e', '#b45309'];

export function LeavesEffect() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const leafArray = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 8,
      size: 15 + Math.random() * 20,
      color: leafColors[Math.floor(Math.random() * leafColors.length)],
      rotation: Math.random() * 360,
    }));
    setLeaves(leafArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute -top-4 animate-leaf-fall"
          style={{
            left: `${leaf.left}%`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
          }}
        >
          <div
            className="animate-leaf-spin"
            style={{
              width: `${leaf.size}px`,
              height: `${leaf.size * 1.2}px`,
              backgroundColor: leaf.color,
              transform: `rotate(${leaf.rotation}deg)`,
              borderRadius: '0 100% 0 100%',
              boxShadow: `inset -2px -2px 4px rgba(0,0,0,0.2)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
