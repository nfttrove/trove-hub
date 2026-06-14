import { useEffect, useState } from 'react';

interface MathItem {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  text: string;
  rotation: number;
  opacity: number;
}

interface MathEffectProps {
  speed?: number;
  rotation?: boolean;
}

const symbols = ['∑', '∫', '∂', '∆', '∇', '∞', '√', 'π', 'θ', 'λ', 'φ', 'Ω', '≈', '≠', '≤', '±'];
const equations = [
  'E=mc²', 'a²+b²=c²', 'πr²', '∫f(x)dx', 'F=ma', 'eⁱᵖ+1=0',
  'sin²θ+cos²θ=1', '∂y/∂x', '½mv²', '∑1/n²', '∇·E', 'lim→∞',
];

export function MathEffect({ speed = 1.0, rotation = true }: MathEffectProps = {}) {
  const [items, setItems] = useState<MathItem[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: 26 }, (_, i) => {
      // Mostly single symbols, with the occasional full equation for character.
      const eq = Math.random() < 0.35;
      const pool = eq ? equations : symbols;
      const depth = Math.random(); // 0 far .. 1 near
      return {
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 9 + Math.random() * 9,
        size: (eq ? 16 : 22) + depth * (eq ? 18 : 30),
        text: pool[Math.floor(Math.random() * pool.length)],
        rotation: (Math.random() * 24 - 12),
        opacity: 0.3 + depth * 0.55,
      };
    });
    setItems(arr);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((m) => (
        <div
          key={m.id}
          className="absolute animate-fall"
          style={{
            left: `${m.left}%`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration / speed}s`,
            fontSize: `${m.size}px`,
            opacity: m.opacity,
            transform: rotation ? `rotate(${m.rotation}deg)` : 'none',
            color: '#e6f4ff',
            fontFamily: "'Cambria Math', 'STIX Two Math', Georgia, serif",
            fontStyle: 'italic',
            textShadow: '0 0 10px rgba(130,200,255,0.5), 0 0 2px rgba(255,255,255,0.6)',
            whiteSpace: 'nowrap',
          }}
        >
          {m.text}
        </div>
      ))}
    </div>
  );
}
