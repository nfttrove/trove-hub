import { useEffect, useState } from 'react';

interface CoinData {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

interface CoinsEffectProps {
  speed?: number;
  rotation?: boolean;
}

export function CoinsEffect({ speed = 1.0, rotation = true }: CoinsEffectProps = {}) {
  const [coins, setCoins] = useState<CoinData[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
      size: 25 + Math.random() * 20,
      rotation: Math.random() * 360,
    }));
    setCoins(items);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute animate-fall"
          style={{
            left: `${coin.left}%`,
            animationDelay: `${coin.delay}s`,
            animationDuration: `${coin.duration / speed}s`,
            fontSize: `${coin.size}px`,
            transform: rotation ? `rotate(${coin.rotation}deg)` : 'none',
          }}
        >
          🪙
        </div>
      ))}
    </div>
  );
}
