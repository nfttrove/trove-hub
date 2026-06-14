import { useEffect, useState } from 'react';

interface DiscoBeam {
  id: number;
  angle: number;
  color: string;
  length: number;
  speed: number;
}

interface SpotLight {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  pulseDelay: number;
  duration: number;
  keyframes: string;
}

const discoColors = ['#ff0090', '#00ffff', '#ff00ff', '#ffff00', '#00ff88', '#ff3366', '#9d00ff', '#00d4ff'];

export function DiscoEffect() {
  const [beams, setBeams] = useState<DiscoBeam[]>([]);
  const [spotlights, setSpotlights] = useState<SpotLight[]>([]);

  useEffect(() => {
    const beamArray = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i * 30),
      color: discoColors[i % discoColors.length],
      length: 60 + Math.random() * 40,
      speed: 20 + Math.random() * 30,
    }));
    setBeams(beamArray);

    const spotlightArray = Array.from({ length: 8 }, (_, i) => {
      const positions = Array.from({ length: 4 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));

      const keyframes = `
        @keyframes spotlight-move-${i} {
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
        color: discoColors[Math.floor(Math.random() * discoColors.length)],
        size: 150 + Math.random() * 100,
        pulseDelay: Math.random() * 3,
        duration: 8 + Math.random() * 8,
        keyframes,
      };
    });
    setSpotlights(spotlightArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-gradient-to-b from-black/20 to-purple-900/20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {beams.map((beam) => (
          <div
            key={beam.id}
            className="absolute origin-left animate-disco-rotate"
            style={{
              width: `${beam.length}vmax`,
              height: '8px',
              background: `linear-gradient(to right, ${beam.color}cc, ${beam.color}00)`,
              boxShadow: `0 0 20px ${beam.color}, 0 0 40px ${beam.color}`,
              transform: `rotate(${beam.angle}deg)`,
              animation: `disco-rotate ${beam.speed}s linear infinite`,
              animationDelay: `${beam.id * -2}s`,
              filter: 'blur(2px)',
            }}
          />
        ))}
      </div>

      {spotlights.map((spotlight) => (
        <div
          key={spotlight.id}
          className="absolute rounded-full"
          style={{
            width: `${spotlight.size}px`,
            height: `${spotlight.size}px`,
            background: `radial-gradient(circle, ${spotlight.color}66 0%, ${spotlight.color}33 30%, transparent 70%)`,
            boxShadow: `0 0 60px ${spotlight.color}, 0 0 100px ${spotlight.color}`,
            animation: `spotlight-move-${spotlight.id} ${spotlight.duration}s ease-in-out infinite, disco-opacity-pulse 2s ease-in-out infinite ${spotlight.pulseDelay}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes disco-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes disco-pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.8); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
        }

        @keyframes disco-opacity-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        .animate-disco-rotate {
          animation: disco-rotate 20s linear infinite;
        }

        ${spotlights.map(s => s.keyframes).join('\n')}
      `}</style>
    </div>
  );
}
