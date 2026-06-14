import { useEffect, useState } from 'react';
import { Snowflake } from './Snowflake';

export function ChristmasScene() {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([]);

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
    <div className="relative w-screen h-screen overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1920 1080" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#0a1628', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#1a2744', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#2d4a6e', stopOpacity: 1 }} />
          </linearGradient>
          <mask id="contentMask">
            <rect width="1920" height="1080" fill="white" />
            <rect x="1%" y="1%" width="24%" height="13%" rx="20" fill="black" />
            <rect x="26.5%" y="1%" width="48%" height="13%" rx="20" fill="black" />
            <rect x="75.5%" y="1%" width="23%" height="60%" rx="20" fill="black" />
            <rect x="1%" y="15.5%" width="73%" height="69%" rx="20" fill="black" />
            <rect x="1%" y="92%" width="73%" height="7%" rx="20" fill="black" />
            <rect x="75.5%" y="63%" width="23%" height="35%" rx="20" fill="black" />
          </mask>
        </defs>
        <rect width="1920" height="1080" fill="url(#bgGradient)" mask="url(#contentMask)" />
      </svg>

      <div className="absolute inset-0 pointer-events-none">
        {snowflakes.map((flake) => (
          <Snowflake key={flake.id} {...flake} />
        ))}
      </div>

      <div className="absolute top-[2%] left-[3%]">
        <div className="animate-pulse">
          <div className="text-3xl">⭐</div>
        </div>
      </div>

      <div className="absolute top-[3%] left-[12%] animate-bounce" style={{ animationDuration: '3s' }}>
        <div className="text-2xl">🎁</div>
      </div>

      <div className="absolute top-[3%] left-[21%] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
        <div className="text-2xl">🎄</div>
      </div>

      <div className="absolute top-[7%] left-[3%] animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
        <div className="text-2xl">🔔</div>
      </div>

      <div className="absolute top-[7%] left-[21%] animate-bounce" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>
        <div className="text-2xl">❄️</div>
      </div>

      <div className="absolute top-[85%] left-[3%] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
        <div className="text-2xl">🎄</div>
      </div>

      <div className="absolute top-[86%] left-[15%] animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
        <div className="text-2xl">🎁</div>
      </div>

      <div className="absolute top-[85%] left-[35%]">
        <div className="animate-pulse" style={{ animationDelay: '0.5s' }}>
          <div className="text-3xl">⭐</div>
        </div>
      </div>

      <div className="absolute top-[86%] left-[50%] animate-bounce" style={{ animationDuration: '3s' }}>
        <div className="text-2xl">🔔</div>
      </div>

      <div className="absolute top-[85%] left-[65%] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '2s' }}>
        <div className="text-2xl">🎄</div>
      </div>

      <div className="absolute top-[20%] right-[3%] animate-bounce" style={{ animationDuration: '3.5s' }}>
        <div className="text-2xl">🔔</div>
      </div>

      <div className="absolute top-[35%] right-[4%]">
        <ChristmasTree />
      </div>

      <div className="absolute top-[55%] right-[3%] animate-bounce" style={{ animationDuration: '4s', animationDelay: '2s' }}>
        <div className="text-2xl">🎁</div>
      </div>

      <div className="absolute top-[70%] right-[5%] animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.8s' }}>
        <div className="text-2xl">🎄</div>
      </div>

      <div className="absolute top-[85%] right-[4%] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1.2s' }}>
        <div className="text-2xl">❄️</div>
      </div>

      <div className="absolute top-[94%] right-[3%]">
        <div className="animate-pulse" style={{ animationDelay: '1.5s' }}>
          <div className="text-3xl">⭐</div>
        </div>
      </div>
    </div>
  );
}

function ChristmasTree() {
  return (
    <div className="relative">
      <div className="relative z-10">
        <div className="w-0 h-0 border-l-[60px] border-r-[60px] border-b-[100px] border-l-transparent border-r-transparent border-b-green-600 mx-auto animate-sway" />
        <div className="w-0 h-0 border-l-[70px] border-r-[70px] border-b-[110px] border-l-transparent border-r-transparent border-b-green-700 mx-auto -mt-12 animate-sway" style={{ animationDelay: '0.2s' }} />
        <div className="w-0 h-0 border-l-[80px] border-r-[80px] border-b-[120px] border-l-transparent border-r-transparent border-b-green-800 mx-auto -mt-12 animate-sway" style={{ animationDelay: '0.4s' }} />

        <div className="w-12 h-16 bg-amber-900 mx-auto -mt-4" />

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
          <div className="text-4xl animate-spin-slow">⭐</div>
        </div>

        <div className="absolute top-8 left-8 w-3 h-3 bg-red-500 rounded-full animate-twinkle" />
        <div className="absolute top-16 right-12 w-3 h-3 bg-yellow-400 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-24 left-16 w-3 h-3 bg-blue-500 rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
        <div className="absolute top-32 right-8 w-3 h-3 bg-red-500 rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-40 left-12 w-3 h-3 bg-yellow-400 rounded-full animate-twinkle" style={{ animationDelay: '2s' }} />
        <div className="absolute top-48 right-16 w-3 h-3 bg-green-400 rounded-full animate-twinkle" style={{ animationDelay: '2.5s' }} />
      </div>
    </div>
  );
}
