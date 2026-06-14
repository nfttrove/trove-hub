import { useEffect, useState } from 'react';

interface Ember {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export function FireEffect() {
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    const emberArray = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
      size: 8 + Math.random() * 16,
    }));
    setEmbers(emberArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {embers.map((ember) => (
        <div
          key={ember.id}
          className="absolute bottom-0 animate-float-up opacity-0"
          style={{
            left: `${ember.left}%`,
            animationDelay: `${ember.delay}s`,
            animationDuration: `${ember.duration}s`,
          }}
        >
          <div
            className="rounded-full blur-sm"
            style={{
              width: `${ember.size}px`,
              height: `${ember.size}px`,
              background: 'radial-gradient(circle, rgba(255,150,0,1) 0%, rgba(255,50,0,0.8) 50%, rgba(255,0,0,0) 100%)',
              boxShadow: '0 0 20px rgba(255,100,0,0.8)',
            }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-900/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
