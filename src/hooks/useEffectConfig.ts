import { useEffect, useState } from 'react';
import type { EffectType } from '../components/EffectSelector';
import type { DeadZone } from '../components/DeadZoneConfig';
import type { BackgroundColors, BackgroundImage } from '../components/ColorPicker';
import type { EffectSettings } from '../components/EffectControls';
import { DEFAULT_EFFECT_AREA, type EffectArea } from '../lib/mask';

export const STORAGE_KEY = 'trove_effect_config';

interface StoredConfig {
  effectTypes: EffectType[];
  deadZones: DeadZone[];
  bgColors: BackgroundColors;
  bgImage: BackgroundImage;
  effectSettings: EffectSettings;
  effectArea: EffectArea;
  tickerColor: boolean;
}

const DEFAULTS: StoredConfig = {
  effectTypes: ['disco'],
  deadZones: [],
  bgColors: { start: '#0a1628', middle: '#1a2744', end: '#2d4a6e' },
  bgImage: { url: '', opacity: 100, useImage: false },
  effectSettings: { speed: 1.0, rotation: true, particleCount: 100, customText: 'GameStop' },
  effectArea: DEFAULT_EFFECT_AREA,
  tickerColor: false,
};

// The surviving ambient effects after the 2026-07-02 retirement (21 retired,
// 2 kept). Stored localStorage values from before the cut will contain retired
// names — filter them out so users don't silently render nothing.
const VALID_EFFECT_TYPES: ReadonlySet<EffectType> = new Set(['disco', 'searchlights']);

function loadStored(): StoredConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    // Merge over defaults so a missing/renamed field never crashes the overlay.
    const storedEffects = Array.isArray(parsed.effectTypes)
      ? parsed.effectTypes.filter((t: unknown): t is EffectType =>
          typeof t === 'string' && VALID_EFFECT_TYPES.has(t as EffectType))
      : [];
    return {
      effectTypes: storedEffects.length > 0 ? storedEffects : DEFAULTS.effectTypes,
      deadZones: Array.isArray(parsed.deadZones) ? parsed.deadZones : DEFAULTS.deadZones,
      bgColors: { ...DEFAULTS.bgColors, ...(parsed.bgColors || {}) },
      bgImage: { ...DEFAULTS.bgImage, ...(parsed.bgImage || {}) },
      effectSettings: { ...DEFAULTS.effectSettings, ...(parsed.effectSettings || {}) },
      effectArea: {
        mode: parsed.effectArea?.mode === 'frame' ? 'frame' : 'foreground',
        frame: { ...DEFAULTS.effectArea.frame, ...(parsed.effectArea?.frame || {}) },
      },
      tickerColor: typeof parsed.tickerColor === 'boolean' ? parsed.tickerColor : DEFAULTS.tickerColor,
    };
  } catch (error) {
    console.error('Error reading stored config:', error);
    return DEFAULTS;
  }
}

function persist(config: StoredConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Error saving config:', error);
  }
}

/** Full-config backup: the raw stored JSON (or defaults if nothing saved yet). */
export function exportConfigJson(): string {
  return JSON.stringify(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? JSON.stringify(DEFAULTS)), null, 2);
}

/** Restore a backup. Throws if the JSON is malformed. Caller should reload after. */
export function importConfigJson(json: string): void {
  const parsed = JSON.parse(json);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
}

export function useEffectConfig() {
  const [effectTypes, setEffectTypes] = useState<EffectType[]>(DEFAULTS.effectTypes);
  const [deadZones, setDeadZones] = useState<DeadZone[]>(DEFAULTS.deadZones);
  const [bgColors, setBgColors] = useState<BackgroundColors>(DEFAULTS.bgColors);
  const [bgImage, setBgImage] = useState<BackgroundImage>(DEFAULTS.bgImage);
  const [effectSettings, setEffectSettings] = useState<EffectSettings>(DEFAULTS.effectSettings);
  const [effectArea, setEffectArea] = useState<EffectArea>(DEFAULTS.effectArea);
  const [tickerColor, setTickerColor] = useState<boolean>(DEFAULTS.tickerColor);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = loadStored();
    setEffectTypes(stored.effectTypes);
    setDeadZones(stored.deadZones);
    setBgColors(stored.bgColors);
    setBgImage(stored.bgImage);
    setEffectSettings(stored.effectSettings);
    setEffectArea(stored.effectArea);
    setTickerColor(stored.tickerColor);
    setLoading(false);
  }, []);

  // Each updater writes the full next config explicitly to avoid stale-closure drift.
  const current = (): StoredConfig => ({ effectTypes, deadZones, bgColors, bgImage, effectSettings, effectArea, tickerColor });

  const updateEffectTypes = (v: EffectType[]) => {
    setEffectTypes(v);
    persist({ ...current(), effectTypes: v });
  };

  const updateDeadZones = (v: DeadZone[]) => {
    setDeadZones(v);
    persist({ ...current(), deadZones: v });
  };

  const updateBgColors = (v: BackgroundColors) => {
    setBgColors(v);
    persist({ ...current(), bgColors: v });
  };

  const updateBgImage = (v: BackgroundImage) => {
    setBgImage(v);
    persist({ ...current(), bgImage: v });
  };

  const updateEffectSettings = (v: EffectSettings) => {
    setEffectSettings(v);
    persist({ ...current(), effectSettings: v });
  };

  const updateEffectArea = (v: EffectArea) => {
    setEffectArea(v);
    persist({ ...current(), effectArea: v });
  };

  const updateTickerColor = (v: boolean) => {
    setTickerColor(v);
    persist({ ...current(), tickerColor: v });
  };

  return {
    effectTypes,
    deadZones,
    bgColors,
    bgImage,
    effectSettings,
    effectArea,
    tickerColor,
    loading,
    updateEffectTypes,
    updateDeadZones,
    updateBgColors,
    updateBgImage,
    updateEffectSettings,
    updateEffectArea,
    updateTickerColor,
  };
}
