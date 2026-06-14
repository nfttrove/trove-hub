import { useEffect, useState } from 'react';

interface Coin { id: number; left: number; delay: number; duration: number; size: number; rotation: number; }
interface Ship { id: number; top: number; delay: number; duration: number; size: number; }
interface Parrot { id: number; startX: number; startY: number; delay: number; duration: number; size: number; }

export function PirateEffect() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [ships, setShips] = useState<Ship[]>([]);
  const [parrots, setParrots] = useState<Parrot[]>([]);

  useEffect(() => {
    setCoins(Array.from({ length: 20 }, (_, i) => ({
      id: i, left: Math.random() * 100, delay: Math.random() * 5,
      duration: 3 + Math.random() * 3, size: 15 + Math.random() * 15, rotation: Math.random() * 360,
    })));
    setShips(Array.from({ length: 2 }, (_, i) => ({
      id: i, top: 22 + i * 38, delay: i * 18, duration: 16 + Math.random() * 6, size: 60 + Math.random() * 26,
    })));
    setParrots(Array.from({ length: 3 }, (_, i) => ({
      id: i, startX: Math.random() * 100, startY: 10 + Math.random() * 60,
      delay: Math.random() * 6, duration: 8 + Math.random() * 6, size: 28 + Math.random() * 22,
    })));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {coins.map((coin) => (
        <div key={`coin-${coin.id}`} className="absolute -top-4 animate-fall"
          style={{ left: `${coin.left}%`, animationDelay: `${coin.delay}s`, animationDuration: `${coin.duration}s` }}>
          <div className="animate-coin-spin" style={{ width: coin.size, height: coin.size, transform: `rotate(${coin.rotation}deg)` }}>
            <svg viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />
              <circle cx="20" cy="20" r="14" fill="#FFA500" opacity="0.6" />
              <text x="20" y="27" textAnchor="middle" fill="#8B4513" fontSize="20" fontWeight="bold">$</text>
            </svg>
          </div>
        </div>
      ))}

      {ships.map((ship) => (
        <div key={`ship-${ship.id}`} className="absolute animate-pirate-ship-sail"
          style={{ top: `${ship.top}%`, left: '-220px', animationDelay: `${ship.delay}s`, animationDuration: `${ship.duration}s` }}>
          <div className="animate-pirate-ship-rock">
            <svg width={ship.size * 2.2} height={ship.size * 1.7} viewBox="0 0 140 110">
              <line x1="70" y1="70" x2="70" y2="8" stroke="#3a2414" strokeWidth="3" />
              <path d="M70,18 C98,24 98,40 70,46 Z" fill="#efe9d8" stroke="#cfc6ad" strokeWidth="1" />
              <path d="M70,50 C103,57 103,76 70,80 Z" fill="#e6dec9" stroke="#cfc6ad" strokeWidth="1" />
              <rect x="70" y="6" width="22" height="13" fill="#15110d" />
              <circle cx="80" cy="11.5" r="3" fill="#f5f3ec" />
              <rect x="76.5" y="14" width="7" height="1.6" fill="#f5f3ec" />
              <line x1="126" y1="72" x2="140" y2="63" stroke="#3a2414" strokeWidth="2" />
              <path d="M12,72 L128,72 Q121,99 95,101 L45,101 Q19,99 12,72 Z" fill="#5a3a22" stroke="#321f12" strokeWidth="1.5" />
              <rect x="14" y="68" width="112" height="6" rx="1" fill="#7a5535" />
            </svg>
          </div>
        </div>
      ))}

      {parrots.map((parrot) => (
        <div key={`parrot-${parrot.id}`} className="absolute animate-parrot-fly"
          style={{ left: `${parrot.startX}%`, top: `${parrot.startY}%`, animationDelay: `${parrot.delay}s`, animationDuration: `${parrot.duration}s` }}>
          <div className="animate-parrot-flap" style={{ fontSize: `${parrot.size}px` }}>🦜</div>
        </div>
      ))}
    </div>
  );
}
