import { useEffect, useState } from 'react';
import { Snowflake } from '../Snowflake';

interface SnowflakeData {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

interface SnowEffectProps {
  speed?: number;
  rotation?: boolean;
}

export function SnowEffect({ speed = 1.0, rotation = true }: SnowEffectProps = {}) {
  const [snowflakes, setSnowflakes] = useState<SnowflakeData[]>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      size: 10 + Math.random() * 20,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {snowflakes.map((flake) => (
        <Snowflake key={flake.id} {...flake} speed={speed} rotation={rotation} />
      ))}
    </div>
  );
}
