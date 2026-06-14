import type { ISourceOptions } from '@tsparticles/engine';
import type { EffectType } from '../../EffectSelector';

// All effects are now canvas particle systems (tsParticles). Abstract shapes
// (circle/square/triangle/star) render identically on every device — the whole
// point of moving off emoji. The few character effects use the emoji shape:
// animated/physics/glowing, a real motion upgrade over static DOM emoji.
//
// Counts are kept modest (this runs alongside OBS encoding); tune via Motion.

const BASE = { fullScreen: { enable: false }, fpsLimit: 60, detectRetina: true } as const;

const glow = (color: string, blur = 6) => ({ enable: true, color, blur });
const twinkle = (speed = 1) => ({ enable: true, speed, sync: false, startValue: 'random' as const });

const emoji = (value: string[], opts: Partial<ISourceOptions['particles']> = {}, dir: 'bottom' | 'top' | 'none' = 'bottom'): ISourceOptions => ({
  ...BASE,
  particles: {
    number: { value: 26, density: { enable: true } },
    shape: { type: 'emoji', options: { emoji: { value } } },
    size: { value: { min: 16, max: 34 } },
    opacity: { value: { min: 0.7, max: 1 } },
    move: { enable: true, direction: dir, speed: { min: 1, max: 3 }, straight: false, outModes: { default: 'out' } },
    rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: 6 } },
    ...opts,
  },
});

const CONFIGS: Partial<Record<EffectType, ISourceOptions>> = {
  snow: {
    ...BASE,
    particles: {
      number: { value: 110, density: { enable: true } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: { min: 0.3, max: 0.9 }, animation: twinkle(0.5) },
      size: { value: { min: 1, max: 4 } },
      move: { enable: true, direction: 'bottom', speed: { min: 0.4, max: 1.6 }, straight: false, drift: { min: -0.4, max: 0.4 } },
      wobble: { enable: true, distance: 8, speed: { min: -4, max: 4 } },
      shadow: glow('#bcd6ff'),
    },
  },
  stars: {
    ...BASE,
    particles: {
      number: { value: 90, density: { enable: true } },
      color: { value: ['#ffffff', '#ffe9a8'] },
      shape: { type: 'star', options: { star: { sides: 5 } } },
      opacity: { value: { min: 0.2, max: 1 }, animation: twinkle(1.2) },
      size: { value: { min: 1, max: 3 } },
      move: { enable: true, speed: 0.15, direction: 'none', outModes: { default: 'out' } },
      shadow: glow('#fff3c4', 4),
    },
  },
  sparkles: {
    ...BASE,
    particles: {
      number: { value: 70, density: { enable: true } },
      color: { value: ['#fff7d6', '#9fe1ff'] },
      shape: { type: 'star', options: { star: { sides: 4 } } },
      opacity: { value: { min: 0, max: 1 }, animation: twinkle(2.2) },
      size: { value: { min: 1, max: 3 }, animation: { enable: true, speed: 3, sync: false } },
      move: { enable: true, speed: 0.3, direction: 'none', outModes: { default: 'out' } },
      shadow: glow('#fff7d6', 6),
    },
  },
  matrix: {
    ...BASE,
    particles: {
      number: { value: 150, density: { enable: true } },
      color: { value: ['#22ff88', '#00cc66', '#aaffcc'] },
      shape: { type: 'circle' },
      opacity: { value: { min: 0.2, max: 0.8 } },
      size: { value: { min: 1, max: 3 } },
      move: { enable: true, direction: 'bottom', speed: { min: 4, max: 10 }, straight: true },
      shadow: glow('#22ff88', 8),
    },
  },
  network: {
    ...BASE,
    particles: {
      number: { value: 70, density: { enable: true } },
      color: { value: '#7fd4ff' },
      links: { enable: true, color: '#3a6ea5', distance: 140, opacity: 0.4, width: 1 },
      shape: { type: 'circle' },
      opacity: { value: 0.7 },
      size: { value: { min: 1, max: 3 } },
      move: { enable: true, speed: 0.8, direction: 'none', outModes: { default: 'bounce' } },
    },
  },
  confetti: {
    ...BASE,
    particles: {
      number: { value: 90, density: { enable: true } },
      color: { value: ['#ff5d77', '#39e0ff', '#ffcc44', '#2bff9b', '#c084fc'] },
      shape: { type: ['square', 'triangle'] },
      opacity: { value: { min: 0.6, max: 1 } },
      size: { value: { min: 3, max: 6 } },
      move: { enable: true, direction: 'bottom', speed: { min: 2, max: 5 }, straight: false, drift: { min: -1, max: 1 } },
      rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: 25 } },
      wobble: { enable: true, distance: 18, speed: { min: -8, max: 8 } },
    },
  },
  rain: {
    ...BASE,
    particles: {
      number: { value: 160, density: { enable: true } },
      color: { value: '#9fc7ff' },
      shape: { type: 'line' },
      opacity: { value: { min: 0.3, max: 0.7 } },
      size: { value: { min: 6, max: 14 } },
      move: { enable: true, direction: 'bottom', speed: { min: 12, max: 20 }, straight: true },
    },
  },
  fire: {
    ...BASE,
    particles: {
      number: { value: 90, density: { enable: true } },
      color: { value: ['#ff3b1d', '#ff8a00', '#ffcc44'] },
      shape: { type: 'circle' },
      opacity: { value: { min: 0.2, max: 0.8 }, animation: { enable: true, speed: 2, startValue: 'max', destroy: 'min' } },
      size: { value: { min: 2, max: 7 }, animation: { enable: true, speed: 6, startValue: 'max', destroy: 'min' } },
      move: { enable: true, direction: 'top', speed: { min: 2, max: 5 }, straight: false, drift: { min: -0.6, max: 0.6 }, outModes: { default: 'out' } },
      shadow: glow('#ff8a00', 10),
    },
  },
  fireflies: {
    ...BASE,
    particles: {
      number: { value: 50, density: { enable: true } },
      color: { value: ['#d7ff6b', '#aaff88'] },
      shape: { type: 'circle' },
      opacity: { value: { min: 0.1, max: 1 }, animation: twinkle(1.5) },
      size: { value: { min: 1.5, max: 3 } },
      move: { enable: true, speed: 0.7, direction: 'none', random: true, straight: false, outModes: { default: 'bounce' } },
      shadow: glow('#d7ff6b', 10),
    },
  },
  balloons: {
    ...BASE,
    particles: {
      number: { value: 26, density: { enable: true } },
      color: { value: ['#ff5d77', '#39e0ff', '#ffcc44', '#c084fc', '#2bff9b'] },
      shape: { type: 'circle' },
      opacity: { value: 0.85 },
      size: { value: { min: 8, max: 16 } },
      move: { enable: true, direction: 'top', speed: { min: 1, max: 2.4 }, straight: false, outModes: { default: 'out' } },
      wobble: { enable: true, distance: 14, speed: { min: -3, max: 3 } },
    },
  },
  bricks: {
    ...BASE,
    particles: {
      number: { value: 60, density: { enable: true } },
      color: { value: ['#b5532b', '#8a3d1f', '#cf6a3a'] },
      shape: { type: 'square' },
      opacity: { value: 0.9 },
      size: { value: { min: 4, max: 8 } },
      move: { enable: true, direction: 'bottom', speed: { min: 2, max: 5 }, straight: false },
      rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: 8 } },
    },
  },
  lights: {
    ...BASE,
    particles: {
      number: { value: 80, density: { enable: true } },
      color: { value: ['#ff3b5c', '#2bff9b', '#ffcc44', '#39e0ff', '#ff7ad9'] },
      shape: { type: 'circle' },
      opacity: { value: { min: 0.2, max: 1 }, animation: twinkle(2) },
      size: { value: { min: 2, max: 4 } },
      move: { enable: true, speed: 0.1, direction: 'none', outModes: { default: 'out' } },
      shadow: glow('#ffffff', 8),
    },
  },
  disco: {
    ...BASE,
    particles: {
      number: { value: 80, density: { enable: true } },
      color: { value: ['#ff3b5c', '#39e0ff', '#ffcc44', '#c084fc', '#2bff9b'] },
      shape: { type: 'circle' },
      opacity: { value: 0.85 },
      size: { value: { min: 2, max: 5 } },
      move: { enable: true, speed: 3, direction: 'none', random: true, outModes: { default: 'bounce' } },
      shadow: glow('#ffffff', 10),
    },
  },
  rockets: emoji(['🚀'], { number: { value: 14 }, size: { value: { min: 18, max: 30 } } }, 'top'),
  hearts: emoji(['❤️', '💖', '💗'], { number: { value: 24 } }, 'top'),
  ghosts: emoji(['👻'], { number: { value: 18 }, opacity: { value: { min: 0.5, max: 0.9 } } }, 'none'),
  turkey: emoji(['🦃'], { number: { value: 16 } }),
  santa: emoji(['🎁', '🎅', '⛄'], { number: { value: 20 } }),
  pirate: emoji(['🏴‍☠️', '⚓', '💰'], { number: { value: 16 } }, 'none'),
  music: emoji(['🎵', '🎶', '🎼'], { number: { value: 20 } }, 'top'),
  math: emoji(['➗', '✖️', '➕', '➖', '🟰'], { number: { value: 20 } }),
};

export function particleConfig(type: EffectType): ISourceOptions | null {
  return CONFIGS[type] ?? null;
}
