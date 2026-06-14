import { useEffect, useState } from 'react';

interface Coin {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

interface Ship {
  id: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
}

interface Parrot {
  id: number;
  startX: number;
  startY: number;
  delay: number;
  duration: number;
  size: number;
}

export function PirateEffect() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [ships, setShips] = useState<Ship[]>([]);
  const [parrots, setParrots] = useState<Parrot[]>([]);

  useEffect(() => {
    const coinArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 3,
      size: 15 + Math.random() * 15,
      rotation: Math.random() * 360,
    }));
    setCoins(coinArray);

    const shipArray = Array.from({ length: 2 }, (_, i) => ({
      id: i,
      top: 20 + i * 40,
      delay: i * 20,
      duration: 15 + Math.random() * 5,
      size: 50 + Math.random() * 30,
    }));
    setShips(shipArray);

    const parrotArray = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: 10 + Math.random() * 60,
      delay: Math.random() * 6,
      duration: 8 + Math.random() * 6,
      size: 30 + Math.random() * 25,
    }));
    setParrots(parrotArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {coins.map((coin) => (
        <div
          key={`coin-${coin.id}`}
          className="absolute -top-4 animate-fall"
          style={{
            left: `${coin.left}%`,
            animationDelay: `${coin.delay}s`,
            animationDuration: `${coin.duration}s`,
          }}
        >
          <div
            className="animate-coin-spin"
            style={{
              width: `${coin.size}px`,
              height: `${coin.size}px`,
              transform: `rotate(${coin.rotation}deg)`,
            }}
          >
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />
              <circle cx="20" cy="20" r="14" fill="#FFA500" opacity="0.6" />
              <text
                x="20"
                y="26"
                textAnchor="middle"
                fill="#8B4513"
                fontSize="20"
                fontWeight="bold"
              >
                $
              </text>
            </svg>
          </div>
        </div>
      ))}

      {ships.map((ship) => (
        <div
          key={`ship-${ship.id}`}
          className="absolute animate-pirate-ship-sail"
          style={{
            top: `${ship.top}%`,
            left: '-200px',
            animationDelay: `${ship.delay}s`,
            animationDuration: `${ship.duration}s`,
          }}
        >
          <div className="relative flex items-center animate-pirate-ship-rock">
            <div style={{ fontSize: `${ship.size}px` }}>🏴‍☠️</div>
            <div style={{ fontSize: `${ship.size * 0.85}px`, marginLeft: `${-ship.size * 0.1}px` }}>⛵</div>
          </div>
        </div>
      ))}

      {parrots.map((parrot) => (
        <div
          key={`parrot-${parrot.id}`}
          className="absolute animate-parrot-fly"
          style={{
            left: `${parrot.startX}%`,
            top: `${parrot.startY}%`,
            animationDelay: `${parrot.delay}s`,
            animationDuration: `${parrot.duration}s`,
          }}
        >
          <div className="animate-parrot-flap" style={{ fontSize: `${parrot.size}px` }}>🦜</div>
        </div>
      ))}
    </div>
  );
}
