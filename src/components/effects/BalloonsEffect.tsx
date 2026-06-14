import { useEffect, useState } from 'react';

interface Balloon {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  shade: string;
}

const balloonColors: [string, string][] = [
  ['#ff6b6b', '#c0392b'], ['#4ecdc4', '#1a8c84'], ['#45b7d1', '#1f6f8b'],
  ['#f9ca24', '#c79100'], ['#6c5ce7', '#3f34a8'], ['#fd79a8', '#c44b78'],
  ['#fdcb6e', '#c9942f'], ['#a29bfe', '#5f57cc'],
];

export function BalloonsEffect() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: 18 }, (_, i) => {
      const [color, shade] = balloonColors[Math.floor(Math.random() * balloonColors.length)];
      return {
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 11 + Math.random() * 9,
        size: 28 + Math.random() * 28,
        color,
        shade,
      };
    });
    setBalloons(arr);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute bottom-0 animate-balloon-rise"
          style={{ left: `${b.left}%`, animationDelay: `${b.delay}s`, animationDuration: `${b.duration}s` }}
        >
          <div className="animate-balloon-sway">
            <svg width={b.size} height={b.size * 1.7} viewBox="0 0 100 170">
              <defs>
                <radialGradient id={`bg-${b.id}`} cx="38%" cy="30%" r="72%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="24%" stopColor={b.color} />
                  <stop offset="100%" stopColor={b.shade} />
                </radialGradient>
              </defs>
              <ellipse cx="50" cy="50" rx="43" ry="53" fill={`url(#bg-${b.id})`} />
              <ellipse cx="34" cy="32" rx="11" ry="16" fill="#ffffff" opacity="0.5" transform="rotate(-22 34 32)" />
              <path d="M 44,101 L 56,101 L 50,111 Z" fill={b.shade} />
              <path
                d="M 50,111 q 10,14 -3,26 q -11,11 4,22"
                stroke="rgba(220,225,235,0.5)"
                strokeWidth="1.3"
                fill="none"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
