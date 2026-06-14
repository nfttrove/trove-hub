import type { EffectType } from '../components/EffectSelector';
import type { BackgroundColors } from '../components/ColorPicker';

export interface CustomPreset {
  id: string;
  name: string;
  effects: EffectType[];
  colors: BackgroundColors;
}

const KEY = 'trove_custom_presets';

export function getCustomPresets(): CustomPreset[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CustomPreset[]) : [];
  } catch {
    return [];
  }
}

export function saveCustomPreset(name: string, effects: EffectType[], colors: BackgroundColors): CustomPreset[] {
  const preset: CustomPreset = { id: Math.random().toString(36).slice(2, 9), name, effects, colors };
  const next = [...getCustomPresets(), preset];
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function deleteCustomPreset(id: string): CustomPreset[] {
  const next = getCustomPresets().filter((p) => p.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
