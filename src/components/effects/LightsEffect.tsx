import { useEffect, useState } from 'react';

interface Light {
  id: number;
  position: number;
  color: string;
  delay: number;
}

const lightColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#ffffff'];

export function LightsEffect() {
  const [lights, setLights] = useState<Light[]>([]);

  useEffect(() => {
    const lightArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      position: (i + 1) * (100 / 31),
      color: lightColors[i % lightColors.length],
      delay: Math.random() * 2,
    }));
    setLights(lightArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute top-0 w-full h-32" viewBox="0 0 1920 200" preserveAspectRatio="none">
        <path
          d="M 0,50 Q 240,80 480,50 T 960,50 T 1440,50 T 1920,50"
          stroke="rgba(50,50,50,0.6)"
          strokeWidth="3"
          fill="none"
        />
      </svg>

      {lights.map((light, index) => {
        const x = (index + 1) * (100 / 31);
        const y = 50 + (index % 2 === 0 ? 15 : -15) * Math.sin((index * Math.PI) / 4);

        return (
          <div
            key={light.id}
            className="absolute animate-christmas-light"
            style={{
              left: `${x}%`,
              top: `${y}px`,
              animationDelay: `${light.delay}s`,
            }}
          >
            <div
              className="w-4 h-6 rounded-full"
              style={{
                backgroundColor: light.color,
                boxShadow: `0 0 15px ${light.color}, 0 0 30px ${light.color}`,
                filter: 'brightness(1.2)',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
