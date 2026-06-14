import { useEffect, useRef, useState } from 'react';

interface DVDLogoProps {
  speed?: number;
  customText?: string;
  onCornerHit?: () => void;
}

export function DVDEffect({ speed = 1.0, customText = 'GameStop', onCornerHit }: DVDLogoProps = {}) {
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const [color, setColor] = useState('#ff0090');
  const positionRef = useRef({ x: 50, y: 50 });
  const velocityRef = useRef({ x: 3 * speed, y: 3 * speed });
  const animationFrameRef = useRef<number>();

  const colors = [
    '#ff0090',
    '#00ffff',
    '#ff00ff',
    '#ffff00',
    '#00ff88',
    '#ff3366',
    '#9d00ff',
    '#00d4ff',
    '#ff6b35',
    '#4ecdc4',
    '#ff1744',
    '#00e676',
  ];

  useEffect(() => {
    const logo = logoRef.current;
    const text = textRef.current;
    if (!logo || !text) return;

    const bbox = text.getBBox();
    const logoWidth = bbox.width;
    const logoHeight = bbox.height;

    const animate = () => {
      const maxX = window.innerWidth - logoWidth;
      const maxY = window.innerHeight - logoHeight;
      const cornerTolerance = 20;

      positionRef.current.x += velocityRef.current.x;
      positionRef.current.y += velocityRef.current.y;

      let hitEdgeX = false;
      let hitEdgeY = false;

      if (positionRef.current.x <= 0 || positionRef.current.x >= maxX) {
        velocityRef.current.x *= -1;
        positionRef.current.x = Math.max(0, Math.min(maxX, positionRef.current.x));
        hitEdgeX = true;
      }

      if (positionRef.current.y <= 0 || positionRef.current.y >= maxY) {
        velocityRef.current.y *= -1;
        positionRef.current.y = Math.max(0, Math.min(maxY, positionRef.current.y));
        hitEdgeY = true;
      }

      const isNearCorner =
        (positionRef.current.x <= cornerTolerance || positionRef.current.x >= maxX - cornerTolerance) &&
        (positionRef.current.y <= cornerTolerance || positionRef.current.y >= maxY - cornerTolerance);

      if ((hitEdgeX || hitEdgeY) && isNearCorner) {
        onCornerHit?.();
      }

      if (hitEdgeX || hitEdgeY) {
        setColor(colors[Math.floor(Math.random() * colors.length)]);
      }

      logo.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const centerX = window.innerWidth / 2 - logoWidth / 2;
    const centerY = window.innerHeight / 2 - logoHeight / 2;
    positionRef.current = { x: centerX, y: centerY };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [speed, customText]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        ref={logoRef}
        className="absolute transition-colors duration-200"
      >
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
          style={{ overflow: 'visible' }}
        >
          <text
            ref={textRef}
            x="0"
            y="45"
            fontFamily="Impact, 'Arial Black', sans-serif"
            fontSize="48"
            fontWeight="900"
            fill={color}
            style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.7)' }}
          >
            {customText}
          </text>
        </svg>
      </div>
    </div>
  );
}
