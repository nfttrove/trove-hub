import { useEffect, useState } from 'react';

interface HeartData {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

interface HeartsEffectProps {
  speed?: number;
  rotation?: boolean;
}

const heartColors = ['#ff0066', '#ff1a75', '#ff3385', '#ff4d94', '#ff66a3'];

export function HeartsEffect({ speed = 1.0 }: HeartsEffectProps = {}) {
  const [hearts, setHearts] = useState<HeartData[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 8,
      size: 25 + Math.random() * 25,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
    }));
    setHearts(items);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-fall"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration / speed}s`,
            fontSize: `${heart.size}px`,
            color: heart.color,
            filter: 'drop-shadow(0 0 3px rgba(255, 0, 102, 0.5))',
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}
