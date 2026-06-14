import { useMemo } from 'react';
import { ParticleField } from './ParticleField';
import { particleConfig } from './configs';
import type { EffectType } from '../../EffectSelector';

/** Renders a premium particle effect by type, scaling particle count by the
 *  Motion "density" control. Memoized so slider changes don't thrash the engine. */
export function ParticleEffect({ type, density }: { type: EffectType; density: number }) {
  const options = useMemo(() => {
    const base = particleConfig(type);
    if (!base) return null;
    const scale = density / 100;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = base.particles as any;
    const baseCount = p?.number?.value ?? 50;
    return {
      ...base,
      particles: { ...p, number: { ...p?.number, value: Math.max(1, Math.round(baseCount * scale)) } },
    };
  }, [type, density]);

  if (!options) return null;
  return <ParticleField id={type} options={options} />;
}
