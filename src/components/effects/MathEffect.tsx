import { useEffect, useState } from 'react';

interface MathSymbol {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  symbol: string;
  rotation: number;
}

interface MathEffectProps {
  speed?: number;
  rotation?: boolean;
}

const mathSymbols = [
  '∑', '∫', '∂', '∆', '∇', '∞', '√',
  '≈', '≠', '≤', '≥', '±', '×', '÷',
  'π', 'θ', 'α', 'β', 'γ', 'λ', 'μ', 'σ',
  '∈', '∉', '⊂', '⊃', '∪', '∩', '∅',
  '∀', '∃', '¬', '∧', '∨', '⇒', '⇔',
  '²', '³', 'ⁿ', '₁', '₂', '₃',
  '∏', '∠', '°', '∴', '∵', '⊥', '||',
  'dx', 'dy', 'f(x)', 'lim', 'sin', 'cos', 'tan',
];

export function MathEffect({ speed = 1.0, rotation = true }: MathEffectProps = {}) {
  const [symbols, setSymbols] = useState<MathSymbol[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 10,
      size: 20 + Math.random() * 35,
      symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
      rotation: Math.random() * 360,
    }));
    setSymbols(items);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {symbols.map((symbol) => (
        <div
          key={symbol.id}
          className="absolute animate-fall"
          style={{
            left: `${symbol.left}%`,
            animationDelay: `${symbol.delay}s`,
            animationDuration: `${symbol.duration / speed}s`,
            fontSize: `${symbol.size}px`,
            transform: rotation ? `rotate(${symbol.rotation}deg)` : 'none',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            textShadow: '0 0 5px rgba(0, 255, 0, 0.5)',
          }}
        >
          {symbol.symbol}
        </div>
      ))}
    </div>
  );
}
