import { useRef, useState } from 'react';
import { useStreamEvents, type StreamEvent, type StreamEventType } from '../lib/streamEvents';
import { ConfettiEffect } from './effects/ConfettiEffect';
import { MatrixEffect } from './effects/MatrixEffect';
import { SirenEffect } from './effects/SirenEffect';
import { SkullStormEffect } from './effects/SkullStormEffect';

interface Burst {
  key: number;
  type: StreamEventType;
  label?: string;
}

interface EffectSpec {
  durationMs: number;
  caption: string;
  accent: string; // tailwind text/border color
}

const SPEC: Record<StreamEventType, EffectSpec> = {
  warrant_siren: { durationMs: 6000, caption: '⚠ WARRANT SIREN', accent: 'border-red-500 text-red-300' },
  signal_win:    { durationMs: 5000, caption: '🎉 SIGNAL WIN', accent: 'border-emerald-500 text-emerald-300' },
  breaker_trip:  { durationMs: 5000, caption: '⚡ CIRCUIT BREAKER', accent: 'border-cyan-500 text-cyan-300' },
  bearish_call:  { durationMs: 6000, caption: '💀 BEARISH CALL', accent: 'border-rose-500 text-rose-300' },
};

function renderBurst(type: StreamEventType) {
  switch (type) {
    case 'warrant_siren':
      return <SirenEffect />;
    case 'signal_win':
      return <ConfettiEffect />;
    case 'breaker_trip':
      return <MatrixEffect />;
    case 'bearish_call':
      return <SkullStormEffect />;
    default:
      return null;
  }
}

/**
 * Reactive overlay — listens to stream events and plays one-shot effects on top
 * of the ambient layer. Each burst self-expires. Fullscreen and unmasked: these
 * are the "moment", deliberately allowed across the whole canvas (kept partly
 * transparent so the data underneath stays legible).
 */
export function ReactiveEffects() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const keyRef = useRef(0);

  useStreamEvents((e: StreamEvent) => {
    const spec = SPEC[e.type];
    if (!spec) return;
    const key = ++keyRef.current;
    setBursts((prev) => [...prev, { key, type: e.type, label: e.label }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.key !== key));
    }, spec.durationMs);
  });

  if (bursts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {bursts.map((b) => (
        <div key={b.key} className="absolute inset-0">
          {renderBurst(b.type)}
        </div>
      ))}
      {/* Captions, stacked top-center */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        {bursts.map((b) => {
          const spec = SPEC[b.type];
          return (
            <div
              key={b.key}
              className={`px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-sm border text-sm font-semibold tracking-wide ${spec.accent}`}
            >
              {spec.caption}
              {b.label ? <span className="text-gray-300 font-normal"> · {b.label}</span> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
