import { useEffect, useState } from 'react';

interface Balloon {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

const balloonColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8', '#fdcb6e', '#a29bfe'];

export function BalloonsEffect() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const balloonArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 12 + Math.random() * 8,
      size: 30 + Math.random() * 25,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
    }));
    setBalloons(balloonArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute bottom-0 animate-balloon-rise"
          style={{
            left: `${balloon.left}%`,
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${balloon.duration}s`,
          }}
        >
          <div className="relative flex flex-col items-center animate-balloon-sway">
            <svg
              width={balloon.size}
              height={balloon.size * 1.2}
              viewBox="0 0 100 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="50" cy="50" rx="45" ry="55" fill={balloon.color} opacity="0.85" />
              <ellipse cx="35" cy="40" rx="15" ry="20" fill="rgba(255, 255, 255, 0.4)" />
              <path
                d="M 50 105 Q 45 108 50 115 Q 55 108 50 105"
                fill={balloon.color}
                opacity="0.7"
              />
            </svg>
            <svg width={balloon.size * 0.1} height={balloon.size * 0.8} viewBox="0 0 2 80">
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="80"
                stroke="rgba(150, 150, 150, 0.4)"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
