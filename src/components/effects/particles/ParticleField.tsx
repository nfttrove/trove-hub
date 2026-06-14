import Particles, { useParticlesProvider } from '@tsparticles/react';
import type { ISourceOptions } from '@tsparticles/engine';

/**
 * A canvas particle layer driven by a tsParticles config. Engine init is handled
 * once by the <ParticlesProvider> in App. Fills its parent (fullScreen disabled
 * in the configs) so it composes with the effect-area mask like the DOM effects.
 */
export function ParticleField({ id, options }: { id: string; options: ISourceOptions }) {
  const { loaded } = useParticlesProvider();
  if (!loaded) return null;
  return <Particles id={id} options={options} className="absolute inset-0" />;
}
