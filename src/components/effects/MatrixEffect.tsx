import { useEffect, useState } from 'react';

interface MatrixColumn {
  id: number;
  left: number;
  delay: number;
  duration: number;
  characters: string[];
  fontSize: number;
}

const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

export function MatrixEffect() {
  const [columns, setColumns] = useState<MatrixColumn[]>([]);

  useEffect(() => {
    const columnArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: (i * 2) + Math.random() * 1.2,
      delay: Math.random() * 3,
      duration: 2.6 + Math.random() * 4,
      fontSize: 12 + Math.random() * 10,
      characters: Array.from({ length: 16 + Math.floor(Math.random() * 10) }, () =>
        matrixChars[Math.floor(Math.random() * matrixChars.length)]
      ),
    }));
    setColumns(columnArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {columns.map((column) => {
        const len = column.characters.length;
        return (
          <div
            key={column.id}
            className="absolute -top-full animate-matrix-fall font-mono text-green-400"
            style={{
              left: `${column.left}%`,
              animationDelay: `${column.delay}s`,
              animationDuration: `${column.duration}s`,
              textShadow: '0 0 6px rgba(0,255,90,0.65)',
            }}
          >
            {column.characters.map((char, idx) => {
              // The last char is the leading head (the column falls downward):
              // bright white-green with a glow; the trail fades up behind it.
              const isHead = idx === len - 1;
              const t = len > 1 ? idx / (len - 1) : 1;
              return (
                <div
                  key={idx}
                  className="animate-matrix-flicker"
                  style={{
                    opacity: isHead ? 1 : 0.1 + 0.72 * t,
                    color: isHead ? '#e6fff0' : undefined,
                    animationDelay: `${idx * 0.1}s`,
                    fontSize: `${column.fontSize}px`,
                    lineHeight: `${column.fontSize + 4}px`,
                    textShadow: isHead
                      ? '0 0 10px rgba(200,255,220,0.95), 0 0 20px rgba(0,255,120,0.75)'
                      : undefined,
                  }}
                >
                  {char}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
