import type { ISourceOptions } from '@tsparticles/engine';

// Network is the one genuinely-new particle look (no DOM equivalent): a live
// constellation of linked nodes. The rest of the effects are the hand-crafted
// DOM components — they read better than generic particle fields.
export const networkConfig: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  detectRetina: true,
  particles: {
    number: { value: 70, density: { enable: true } },
    color: { value: '#7fd4ff' },
    links: { enable: true, color: '#3a6ea5', distance: 140, opacity: 0.4, width: 1 },
    shape: { type: 'circle' },
    opacity: { value: 0.7 },
    size: { value: { min: 1, max: 3 } },
    move: { enable: true, speed: 0.8, direction: 'none', outModes: { default: 'bounce' } },
  },
};
