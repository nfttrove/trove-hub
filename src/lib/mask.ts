import type { DeadZone } from '../components/DeadZoneConfig';

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

// The layer effects operate in:
//   'foreground' — over EVERYTHING, including the dead zones (no mask). The
//                  effects sit on top of the whole composition.
//   'frame'      — only inside the frame rect, minus dead zones. The effects
//                  sit BEHIND the widgets, in the gaps / the framed area.
export type EffectAreaMode = 'foreground' | 'frame';

export interface EffectArea {
  mode: EffectAreaMode;
  /** Only used when mode === 'frame'. Percentages (0-100). */
  frame: Rect;
}

// Default frame ≈ the central chart area of the stream layout.
export const DEFAULT_EFFECT_AREA: EffectArea = {
  mode: 'foreground',
  frame: { x: 1, y: 15.2, width: 73.1, height: 75.8 },
};

function rectSvg(r: Rect, fill: string): string {
  return `<rect x='${r.x}' y='${r.y}' width='${r.width}' height='${r.height}' rx='1' fill='${fill}'/>`;
}

/**
 * Build a CSS mask-image value (data-URI SVG) that controls where effects render,
 * or `null` when no mask is needed.
 *
 * - foreground: returns null — effects render over the whole canvas, including
 *   the dead zones (the layer sits in front of everything).
 * - frame: visible only inside the frame rect, minus dead zones (the layer sits
 *   behind the widgets, in the framed gap).
 *
 * White = visible, black = hidden. The outer rect is filled white and masked by
 * the inner <mask>, so the resulting image's alpha channel matches the mask
 * luminance — which is what `-webkit-mask-image` consumes in Chromium/OBS CEF.
 */
export function buildEffectMaskImage(area: EffectArea, deadZones: DeadZone[]): string | null {
  if (area.mode === 'foreground') return null;
  const frameRect = rectSvg(area.frame, 'white');
  const holes = deadZones.map((z) => rectSvg(z, 'black')).join('');
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'>` +
    `<mask id='m'>` +
    `<rect width='100' height='100' fill='black'/>` +
    frameRect +
    holes +
    `</mask>` +
    `<rect width='100' height='100' fill='white' mask='url(#m)'/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
