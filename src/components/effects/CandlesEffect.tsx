import { useEffect, useState } from 'react';

interface Candle {
  id: number;
  position: number;
  height: number;
}

export function CandlesEffect() {
  const [candles, setCandles] = useState<Candle[]>([]);

  useEffect(() => {
    const candleArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      position: (i + 1) * (100 / 9),
      height: 80 + Math.random() * 60,
    }));
    setCandles(candleArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end pb-8">
        {candles.map((candle) => (
          <div key={candle.id} className="flex flex-col items-center">
            <div className="relative">
              <div
                className="animate-flicker"
                style={{
                  width: '30px',
                  height: '40px',
                  background: 'radial-gradient(ellipse at center bottom, rgba(255,200,0,0.9) 0%, rgba(255,150,0,0.7) 30%, rgba(255,100,0,0.3) 60%, rgba(255,50,0,0) 100%)',
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  filter: 'blur(2px)',
                }}
              />
              <div
                className="absolute top-4 left-1/2 transform -translate-x-1/2 animate-flicker-glow"
                style={{
                  width: '8px',
                  height: '12px',
                  background: 'linear-gradient(to top, rgba(255,220,100,1), rgba(255,180,50,0.9))',
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  boxShadow: '0 0 20px rgba(255,200,0,0.8)',
                }}
              />
            </div>
            <div
              className="bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-sm shadow-lg"
              style={{
                width: '20px',
                height: `${candle.height}px`,
                borderRadius: '4px 4px 2px 2px',
              }}
            />
            <div
              className="bg-amber-900 rounded-sm"
              style={{
                width: '24px',
                height: '8px',
              }}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
