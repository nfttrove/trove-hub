import type { ISourceOptions } from '@tsparticles/engine';

// Flagship tsParticles configs — canvas-rendered, device-independent, far
// crisper than emoji. Counts are kept modest (this runs alongside OBS encoding
// on the stream box); bump only after watching OBS frame stats.

/** Premium snow — soft glowing flakes, varied drift + twinkle. */
export const snowProConfig: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: { value: 110, density: { enable: true } },
    color: { value: '#ffffff' },
    shape: { type: 'circle' },
    opacity: { value: { min: 0.3, max: 0.9 }, animation: { enable: true, speed: 0.5, sync: false } },
    size: { value: { min: 1, max: 4 } },
    move: { enable: true, direction: 'bottom', speed: { min: 0.4, max: 1.6 }, straight: false, drift: { min: -0.4, max: 0.4 } },
    wobble: { enable: true, distance: 8, speed: { min: -4, max: 4 } },
    shadow: { enable: true, color: '#bcd6ff', blur: 6 },
  },
  detectRetina: true,
};

/** Data rain — fast green streams, the matrix/data-floor vibe. */
export const dataRainConfig: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: { value: 150, density: { enable: true } },
    color: { value: ['#22ff88', '#00cc66', '#aaffcc'] },
    shape: { type: 'circle' },
    opacity: { value: { min: 0.2, max: 0.8 } },
    size: { value: { min: 1, max: 3 } },
    move: { enable: true, direction: 'bottom', speed: { min: 4, max: 10 }, straight: true },
    shadow: { enable: true, color: '#22ff88', blur: 8 },
  },
  detectRetina: true,
};

/** Network — linked nodes drifting + connecting, a live trading-floor lattice. */
export const networkConfig: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: { value: 70, density: { enable: true } },
    color: { value: '#7fd4ff' },
    links: { enable: true, color: '#3a6ea5', distance: 140, opacity: 0.4, width: 1 },
    shape: { type: 'circle' },
    opacity: { value: 0.7 },
    size: { value: { min: 1, max: 3 } },
    move: { enable: true, speed: 0.8, direction: 'none', outModes: { default: 'bounce' } },
  },
  detectRetina: true,
};
