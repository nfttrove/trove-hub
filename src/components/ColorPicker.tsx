import { Palette, Upload, Trash2, Anchor } from 'lucide-react';
import { useState } from 'react';
import { useBackgroundPresets } from '../hooks/useBackgroundPresets';
import { Modal } from './ui/Modal';
import { Switch } from './ui/Switch';
import { ui } from './ui/styles';

export interface BackgroundColors {
  start: string;
  middle: string;
  end: string;
}

export interface BackgroundImage {
  url: string;
  opacity: number;
  useImage: boolean;
}

interface ColorPickerProps {
  colors: BackgroundColors;
  bgImage: BackgroundImage;
  tickerColor: boolean;
  onColorsChange: (colors: BackgroundColors) => void;
  onBgImageChange: (bgImage: BackgroundImage) => void;
  onTickerColorChange: (v: boolean) => void;
  onClose: () => void;
}

const presets: { name: string; colors: BackgroundColors }[] = [
  { name: 'Deep Blue', colors: { start: '#0a1628', middle: '#1a2744', end: '#2d4a6e' } },
  { name: 'Ocean Deep', colors: { start: '#0a1e2e', middle: '#1b3a4e', end: '#2d556e' } },
  { name: 'Sky Blue', colors: { start: '#1e3a8a', middle: '#3b82f6', end: '#60a5fa' } },
  { name: 'Tropical', colors: { start: '#065f46', middle: '#10b981', end: '#34d399' } },
  { name: 'Forest Night', colors: { start: '#0a2e1a', middle: '#1b4e2d', end: '#2d6e4a' } },
  { name: 'Emerald Dream', colors: { start: '#0a2e1e', middle: '#1b4e3a', end: '#2d6e55' } },
  { name: 'Purple Haze', colors: { start: '#1a0a2e', middle: '#2d1b4e', end: '#4a2d6e' } },
  { name: 'Royal Purple', colors: { start: '#581c87', middle: '#a855f7', end: '#c084fc' } },
  { name: 'Rose Quartz', colors: { start: '#2e0a1a', middle: '#4e1b2d', end: '#6e2d4a' } },
  { name: 'Pink Sunset', colors: { start: '#9f1239', middle: '#f43f5e', end: '#fb7185' } },
  { name: 'Crimson Dusk', colors: { start: '#2e0a0a', middle: '#4e1b1b', end: '#6e2d2d' } },
  { name: 'Fire Red', colors: { start: '#7f1d1d', middle: '#dc2626', end: '#ef4444' } },
  { name: 'Sunset Glow', colors: { start: '#2e1a0a', middle: '#4e2d1b', end: '#6e4a2d' } },
  { name: 'Orange Blaze', colors: { start: '#9a3412', middle: '#f97316', end: '#fb923c' } },
  { name: 'Golden Hour', colors: { start: '#78350f', middle: '#f59e0b', end: '#fbbf24' } },
  { name: 'Lemon Lime', colors: { start: '#365314', middle: '#84cc16', end: '#bef264' } },
  { name: 'Cotton Candy', colors: { start: '#ec4899', middle: '#f9a8d4', end: '#fce7f3' } },
  { name: 'Mint Fresh', colors: { start: '#6ee7b7', middle: '#a7f3d0', end: '#d1fae5' } },
  { name: 'Lavender', colors: { start: '#c084fc', middle: '#d8b4fe', end: '#e9d5ff' } },
  { name: 'Peach', colors: { start: '#fb923c', middle: '#fdba74', end: '#fed7aa' } },
  { name: 'Midnight', colors: { start: '#0a0a1a', middle: '#1a1a2d', end: '#2d2d4a' } },
  { name: 'Steel Gray', colors: { start: '#1a1a1a', middle: '#2d2d2d', end: '#4a4a4a' } },
  { name: 'Silver', colors: { start: '#475569', middle: '#94a3b8', end: '#cbd5e1' } },
  { name: 'Pure Black', colors: { start: '#000000', middle: '#0a0a0a', end: '#1a1a1a' } },
  { name: 'Pure White', colors: { start: '#ffffff', middle: '#f0f0f0', end: '#e0e0e0' } },
];

export function ColorPicker({ colors, bgImage, tickerColor, onColorsChange, onBgImageChange, onTickerColorChange, onClose }: ColorPickerProps) {
  const [imageUrlInput, setImageUrlInput] = useState(bgImage.url || '');
  const { presets: trovePresets, loading: troveLoading } = useBackgroundPresets();

  const updateColor = (key: keyof BackgroundColors, value: string) => {
    onColorsChange({ ...colors, [key]: value });
  };

  const applyPreset = (preset: BackgroundColors) => {
    onColorsChange(preset);
  };

  const colorRow = (key: keyof BackgroundColors, label: string) => (
    <div className="flex items-center gap-2.5">
      <input
        type="color"
        value={colors[key]}
        onChange={(e) => updateColor(key, e.target.value)}
        className="h-9 w-10 shrink-0 rounded-lg bg-transparent border border-white/10 cursor-pointer"
        title={label}
      />
      <input
        type="text" value={colors[key]} onChange={(e) => updateColor(key, e.target.value)}
        className={`${ui.field} font-mono`} placeholder="#0a1628"
      />
    </div>
  );

  return (
    <Modal title="Background" icon={<Palette className="w-[18px] h-[18px]" />} onClose={onClose} maxWidth="max-w-lg">
      <div className="space-y-6">
        <div className={`${ui.card} p-4`}>
          <p className="text-[13px] font-medium text-neutral-200 mb-0.5">Ambient (market-driven)</p>
          <p className="text-[12px] text-neutral-500 mb-3">Auto-tints the whole background with the day — overrides the gradient.</p>
          <Switch
            checked={tickerColor}
            onChange={onTickerColorChange}
            label={<span><span className="text-emerald-400">Green</span> up · <span className="text-red-400">red</span> down</span>}
          />
        </div>

        <div>
          <p className={`${ui.sectionLabel} mb-2.5`}>Gradient</p>
          <div className="space-y-2">
            {colorRow('start', 'Start')}
            {colorRow('middle', 'Middle')}
            {colorRow('end', 'End')}
          </div>
          <div className="h-14 rounded-xl mt-3 border border-white/10" style={{ background: `linear-gradient(135deg, ${colors.start} 0%, ${colors.middle} 50%, ${colors.end} 100%)` }} />
        </div>

        <div>
          <p className={`${ui.sectionLabel} mb-2.5`}>Background image</p>
          <div className="mb-2.5"><Switch checked={bgImage.useImage} onChange={(v) => onBgImageChange({ ...bgImage, useImage: v })} label="Use background image" /></div>
          <div className="flex gap-2">
            <input
              type="text" value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg" className={ui.field}
            />
            <button onClick={() => onBgImageChange({ ...bgImage, url: imageUrlInput })} className={`${ui.btn} ${ui.btnSecondary} shrink-0`}>
              <Upload className="w-4 h-4" /> Set
            </button>
          </div>
          {bgImage.url && (
            <>
              <div className="flex items-center justify-between mt-3 mb-1.5">
                <span className="text-[12px] text-neutral-500">Opacity</span>
                <span className="text-[12px] text-neutral-400 tabular-nums">{bgImage.opacity}%</span>
              </div>
              <input type="range" min="0" max="100" value={bgImage.opacity} onChange={(e) => onBgImageChange({ ...bgImage, opacity: parseInt(e.target.value) })} className="w-full accent-sky-500" />
              <div className="flex gap-2 mt-2.5">
                <div className="flex-1 h-24 rounded-xl bg-cover bg-center border border-white/10" style={{ backgroundImage: `url(${bgImage.url})`, opacity: bgImage.opacity / 100 }} />
                <button onClick={() => { setImageUrlInput(''); onBgImageChange({ ...bgImage, url: '', useImage: false }); }} className={`${ui.btn} ${ui.btnDanger} shrink-0`} title="Remove image"><Trash2 className="w-4 h-4" /></button>
              </div>
            </>
          )}
        </div>

        {!troveLoading && trovePresets.length > 0 && (
          <div>
            <p className={`${ui.sectionLabel} mb-2.5 flex items-center gap-1.5`}><Anchor className="w-3.5 h-3.5" /> Trove premium</p>
            <div className="grid grid-cols-2 gap-2">
              {trovePresets.map((preset) => (
                <button key={preset.id} onClick={() => applyPreset(preset.colors)} className="rounded-xl border border-white/10 hover:border-sky-500/50 transition-colors p-2.5 text-left" title={preset.description}>
                  <div className="h-10 rounded-lg mb-1.5" style={{ background: `linear-gradient(90deg, ${preset.colors.start}, ${preset.colors.middle}, ${preset.colors.end})` }} />
                  <span className="text-[12px] font-medium text-neutral-200 block truncate">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className={`${ui.sectionLabel} mb-2.5`}>Standard</p>
          <div className="grid grid-cols-3 gap-2">
            {presets.map((preset) => (
              <button key={preset.name} onClick={() => applyPreset(preset.colors)} className="rounded-xl border border-white/10 hover:border-sky-500/50 transition-colors p-2 text-left">
                <div className="h-8 rounded-lg mb-1.5" style={{ background: `linear-gradient(135deg, ${preset.colors.start}, ${preset.colors.middle}, ${preset.colors.end})` }} />
                <span className="text-[11px] text-neutral-300 block truncate">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
