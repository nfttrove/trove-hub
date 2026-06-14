import type { BackgroundColors } from '../components/ColorPicker';

export interface BackgroundPreset {
  id: string;
  name: string;
  slug: string;
  colors: BackgroundColors;
  description: string;
  sortOrder: number;
}

// Seeded locally (was Supabase `background_presets`). Source of truth:
// supabase/migrations/20260113135307_add_background_presets.sql
const PRESETS: BackgroundPreset[] = [
  { slug: 'midnight-hull', name: 'Midnight Hull', colors: { start: '#0B1020', middle: '#121A2E', end: '#2B3A55' }, description: 'Soft vignette (6–10%), fine grain (2–3%)', sortOrder: 1 },
  { slug: 'deep-hold', name: 'Deep Hold', colors: { start: '#071018', middle: '#0C2230', end: '#1E4B5B' }, description: 'Subtle vertical highlight band at ~65% (8% opacity)', sortOrder: 2 },
  { slug: 'captains-log', name: "Captain's Log", colors: { start: '#1A1714', middle: '#2A241E', end: '#4A3B2B' }, description: 'Paper/grain texture (3–4%), tiny warm bloom on right edge', sortOrder: 3 },
  { slug: 'salt-steel', name: 'Salt & Steel', colors: { start: '#0C1320', middle: '#1D2A3A', end: '#8FA2B8' }, description: 'Mild vignette + very faint haze (like glass)', sortOrder: 4 },
  { slug: 'black-flag-lines', name: 'Black Flag Lines', colors: { start: '#0A0F1A', middle: '#101C2C', end: '#2A4663' }, description: 'Diagonal pinstripes (1–2px, 4–6% opacity, spacing 28px)', sortOrder: 5 },
  { slug: 'rope-rigging', name: 'Rope & Rigging', colors: { start: '#101522', middle: '#1A2638', end: '#6B86A3' }, description: 'Very faint crosshatch (two diagonal line layers, 3–4% opacity)', sortOrder: 6 },
  { slug: 'harbor-fog', name: 'Harbor Fog', colors: { start: '#0F172A', middle: '#1F2B3B', end: '#9DB4C8' }, description: 'Soft fog layer (radial blur), grain 2%', sortOrder: 7 },
  { slug: 'storm-signal', name: 'Storm Signal', colors: { start: '#0A1020', middle: '#1A2340', end: '#3B5A8C' }, description: 'Faint horizontal scanlines (2–3% opacity) + tiny noise', sortOrder: 8 },
  { slug: 'treasure-map-glow', name: 'Treasure Map Glow', colors: { start: '#101019', middle: '#1F1B2E', end: '#B38A3D' }, description: 'Warm gold bloom on far right (10% opacity), grain 3%', sortOrder: 9 },
  { slug: 'quiet-plunder', name: 'Quiet Plunder', colors: { start: '#07121A', middle: '#102B2F', end: '#3A7A6A' }, description: 'Faint speckle grain + slight edge vignette', sortOrder: 10 },
].map((p) => ({ ...p, id: p.slug }));

export function useBackgroundPresets() {
  // Static local data — no async load, no failure mode.
  return { presets: PRESETS, loading: false, error: null as string | null };
}
