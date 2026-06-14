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
    const columnArray = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: (i * 2.5) + Math.random() * 1,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
      fontSize: 10 + Math.random() * 10,
      characters: Array.from({ length: 20 }, () =>
        matrixChars[Math.floor(Math.random() * matrixChars.length)]
      ),
    }));
    setColumns(columnArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-black/20">
      {columns.map((column) => (
        <div
          key={column.id}
          className="absolute -top-full animate-matrix-fall font-mono text-green-400"
          style={{
            left: `${column.left}%`,
            animationDelay: `${column.delay}s`,
            animationDuration: `${column.duration}s`,
            textShadow: '0 0 8px rgba(0,255,0,0.8)',
          }}
        >
          {column.characters.map((char, idx) => (
            <div
              key={idx}
              className="animate-matrix-flicker"
              style={{
                opacity: 1 - (idx / column.characters.length),
                animationDelay: `${idx * 0.1}s`,
                fontSize: `${column.fontSize}px`,
                lineHeight: `${column.fontSize + 4}px`,
              }}
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
