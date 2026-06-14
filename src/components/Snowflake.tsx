interface SnowflakeProps {
  left: number;
  delay: number;
  duration: number;
  size: number;
  speed?: number;
  rotation?: boolean;
}

export function Snowflake({ left, delay, duration, size, speed = 1.0, rotation = true }: SnowflakeProps) {
  const adjustedDuration = duration / speed;

  return (
    <div
      className="absolute text-white opacity-80 animate-fall"
      style={{
        left: `${left}%`,
        top: '-20px',
        fontSize: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${adjustedDuration}s`,
        animationName: rotation ? 'fall' : 'fall-no-rotate',
      }}
    >
      ❄
    </div>
  );
}
