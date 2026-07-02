import { useEffect, useState } from 'react';

interface SearchBeam {
  id: number;
  angle: number;
  length: number;
  speed: number;
}

interface SearchSpot {
  id: number;
  x: number;
  y: number;
  size: number;
  pulseDelay: number;
  duration: number;
  keyframes: string;
}

// All-white palette — the "shooting" feel comes from the rotating beams and
// drifting spots, not colour variation. Length/speed variance keeps the beams
// from collapsing into a single bright burst.
const WHITE = '#ffffff';

export function SearchlightsEffect() {
  const [beams, setBeams] = useState<SearchBeam[]>([]);
  const [spots, setSpots] = useState<SearchSpot[]>([]);

  useEffect(() => {
    const beamArray = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: i * 30,
      length: 60 + Math.random() * 40,
      speed: 20 + Math.random() * 30,
    }));
    setBeams(beamArray);

    const spotArray = Array.from({ length: 8 }, (_, i) => {
      const positions = Array.from({ length: 4 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));

      const keyframes = `
        @keyframes searchlight-move-${i} {
          0% { left: ${positions[0].x}%; top: ${positions[0].y}%; transform: translate(-50%, -50%) scale(0); }
          5% { transform: translate(-50%, -50%) scale(1); }
          33% { left: ${positions[1].x}%; top: ${positions[1].y}%; transform: translate(-50%, -50%) scale(1); }
          66% { left: ${positions[2].x}%; top: ${positions[2].y}%; transform: translate(-50%, -50%) scale(1); }
          95% { left: ${positions[3].x}%; top: ${positions[3].y}%; transform: translate(-50%, -50%) scale(1); }
          100% { left: ${positions[3].x}%; top: ${positions[3].y}%; transform: translate(-50%, -50%) scale(0); }
        }
      `;

      return {
        id: i,
        x: positions[0].x,
        y: positions[0].y,
        size: 150 + Math.random() * 100,
        pulseDelay: Math.random() * 3,
        duration: 8 + Math.random() * 8,
        keyframes,
      };
    });
    setSpots(spotArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-gradient-to-b from-black/20 to-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {beams.map((beam) => (
          <div
            key={beam.id}
            className="absolute origin-left animate-search-rotate"
            style={{
              width: `${beam.length}vmax`,
              height: '8px',
              background: `linear-gradient(to right, ${WHITE}cc, ${WHITE}00)`,
              boxShadow: `0 0 20px ${WHITE}, 0 0 40px ${WHITE}`,
              transform: `rotate(${beam.angle}deg)`,
              animation: `search-rotate ${beam.speed}s linear infinite`,
              animationDelay: `${beam.id * -2}s`,
              filter: 'blur(2px)',
            }}
          />
        ))}
      </div>

      {spots.map((spot) => (
        <div
          key={spot.id}
          className="absolute rounded-full"
          style={{
            width: `${spot.size}px`,
            height: `${spot.size}px`,
            background: `radial-gradient(circle, ${WHITE}66 0%, ${WHITE}33 30%, transparent 70%)`,
            boxShadow: `0 0 60px ${WHITE}, 0 0 100px ${WHITE}`,
            animation: `searchlight-move-${spot.id} ${spot.duration}s ease-in-out infinite, search-opacity-pulse 2s ease-in-out infinite ${spot.pulseDelay}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes search-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes search-opacity-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        .animate-search-rotate {
          animation: search-rotate 20s linear infinite;
        }

        ${spots.map(s => s.keyframes).join('\n')}
      `}</style>
    </div>
  );
}
