import { useEffect, useState } from 'react';

interface Rocket {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export function RocketsEffect() {
  const [rockets, setRockets] = useState<Rocket[]>([]);

  useEffect(() => {
    const rocketArray = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 2,
      size: 30 + Math.random() * 20,
    }));
    setRockets(rocketArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {rockets.map((rocket) => (
        <div
          key={rocket.id}
          className="absolute bottom-0 animate-rocket-launch opacity-0"
          style={{
            left: `${rocket.left}%`,
            animationDelay: `${rocket.delay}s`,
            animationDuration: `${rocket.duration}s`,
          }}
        >
          <div className="relative flex flex-col items-center">
            <div
              className="relative"
              style={{
                fontSize: `${rocket.size}px`,
              }}
            >
              🚀
            </div>
            <div
              className="animate-rocket-flame"
              style={{
                width: `${rocket.size * 0.4}px`,
                height: `${rocket.size * 1.2}px`,
                background: 'linear-gradient(to bottom, rgba(255,150,0,0.9) 0%, rgba(255,80,0,0.7) 40%, rgba(255,0,0,0.3) 70%, transparent 100%)',
                borderRadius: '50%',
                filter: 'blur(4px)',
                marginTop: '-10px',
              }}
            />
            <div
              className="animate-rocket-smoke"
              style={{
                width: `${rocket.size * 0.6}px`,
                height: `${rocket.size * 0.8}px`,
                background: 'radial-gradient(circle, rgba(200,200,200,0.4) 0%, rgba(150,150,150,0.2) 50%, transparent 100%)',
                borderRadius: '50%',
                filter: 'blur(8px)',
                marginTop: '-5px',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
