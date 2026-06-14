import { useState } from 'react';
import { Bookmark, Plus, Trash2, Check, X } from 'lucide-react';
import type { EffectType } from './EffectSelector';
import type { BackgroundColors } from './ColorPicker';
import { Modal } from './ui/Modal';
import { ui } from './ui/styles';
import { getCustomPresets, saveCustomPreset, deleteCustomPreset, type CustomPreset } from '../lib/customPresets';

interface Preset {
  name: string;
  effects: EffectType[];
  colors: BackgroundColors;
  icon: string;
}

interface PresetSelectorProps {
  onApplyPreset: (effects: EffectType[], colors: BackgroundColors) => void;
  currentEffects: EffectType[];
  currentColors: BackgroundColors;
  onClose: () => void;
}

const presets: Preset[] = [
  {
    name: 'Christmas',
    effects: ['snow', 'lights', 'santa'],
    colors: { start: '#0a1628', middle: '#1a2744', end: '#2d4a6e' },
    icon: '🎄',
  },
  {
    name: 'Halloween',
    effects: ['ghosts', 'sparkles'],
    colors: { start: '#2e0a0a', middle: '#4e1b1b', end: '#6e2d2d' },
    icon: '🎃',
  },
  {
    name: 'Valentine\'s Day',
    effects: ['hearts', 'sparkles'],
    colors: { start: '#9f1239', middle: '#f43f5e', end: '#fb7185' },
    icon: '💕',
  },
  {
    name: 'Birthday',
    effects: ['confetti', 'balloons', 'sparkles'],
    colors: { start: '#ec4899', middle: '#f9a8d4', end: '#fce7f3' },
    icon: '🎂',
  },
  {
    name: 'Thanksgiving',
    effects: ['turkey'],
    colors: { start: '#78350f', middle: '#f59e0b', end: '#fbbf24' },
    icon: '🦃',
  },
  {
    name: 'Space',
    effects: ['stars', 'rockets'],
    colors: { start: '#000000', middle: '#0a0a0a', end: '#1a1a1a' },
    icon: '🚀',
  },
  {
    name: 'Ocean',
    effects: ['rain', 'network'],
    colors: { start: '#0a1e2e', middle: '#1b3a4e', end: '#2d556e' },
    icon: '🌊',
  },
  {
    name: 'Party',
    effects: ['confetti', 'music', 'sparkles'],
    colors: { start: '#581c87', middle: '#a855f7', end: '#c084fc' },
    icon: '🎉',
  },
  {
    name: 'Matrix',
    effects: ['matrix'],
    colors: { start: '#000000', middle: '#0a0a0a', end: '#1a1a1a' },
    icon: '💚',
  },
  {
    name: 'Pirate',
    effects: ['pirate'],
    colors: { start: '#0a1628', middle: '#1a2744', end: '#2d4a6e' },
    icon: '🏴‍☠️',
  },
  {
    name: 'Math Class',
    effects: ['math'],
    colors: { start: '#0f1419', middle: '#1a2632', end: '#243447' },
    icon: '∑',
  },
];

export function PresetSelector({ onApplyPreset, currentEffects, currentColors, onClose }: PresetSelectorProps) {
  const [custom, setCustom] = useState<CustomPreset[]>(() => getCustomPresets());
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');

  const apply = (effects: EffectType[], colors: BackgroundColors) => {
    onApplyPreset(effects, colors);
    onClose();
  };

  const commitSave = () => {
    const n = name.trim();
    if (!n) return;
    setCustom(saveCustomPreset(n, currentEffects, currentColors));
    setName('');
    setSaving(false);
  };

  const card = (key: string, icon: string, colors: BackgroundColors, label: string, count: number, onClick: () => void, onDelete?: () => void) => (
    <div key={key} className="relative group">
      <button onClick={onClick} className="w-full rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-500/50 hover:bg-white/[0.06] transition-colors p-3 flex flex-col items-center gap-1.5">
        <span className="h-10 w-10 grid place-items-center rounded-lg text-2xl mb-0.5" style={{ background: `linear-gradient(135deg, ${colors.start}, ${colors.end})` }}>{icon}</span>
        <span className="text-[13px] font-medium text-neutral-200 text-center leading-tight">{label}</span>
        <span className="text-[11px] text-neutral-500">{count} effect{count !== 1 ? 's' : ''}</span>
      </button>
      {onDelete && (
        <button onClick={onDelete} className="absolute top-1.5 right-1.5 h-6 w-6 grid place-items-center rounded-lg bg-black/40 text-neutral-400 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all" aria-label="Delete preset">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );

  return (
    <Modal title="Scene presets" icon={<Bookmark className="w-[18px] h-[18px]" />} onClose={onClose} maxWidth="max-w-lg">
      <div className="mb-5">
        {saving ? (
          <div className="flex gap-2">
            <input
              autoFocus value={name} onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') commitSave(); if (e.key === 'Escape') setSaving(false); }}
              placeholder="Preset name" className={ui.field}
            />
            <button onClick={commitSave} className={`${ui.btn} ${ui.btnPrimary} shrink-0`}><Check className="w-4 h-4" /> Save</button>
            <button onClick={() => { setSaving(false); setName(''); }} className={`${ui.btn} ${ui.btnSecondary} shrink-0`}><X className="w-4 h-4" /></button>
          </div>
        ) : (
          <button onClick={() => setSaving(true)} className={`${ui.btn} ${ui.btnSecondary} w-full`}>
            <Plus className="w-4 h-4" /> Save current setup as preset
          </button>
        )}
      </div>

      {custom.length > 0 && (
        <div className="mb-5">
          <p className={`${ui.sectionLabel} mb-2.5`}>My presets</p>
          <div className="grid grid-cols-3 gap-2.5">
            {custom.map((p) => card(
              p.id, '★', p.colors, p.name, p.effects.length,
              () => apply(p.effects, p.colors),
              () => setCustom(deleteCustomPreset(p.id)),
            ))}
          </div>
        </div>
      )}

      <p className={`${ui.sectionLabel} mb-2.5`}>Built-in</p>
      <div className="grid grid-cols-3 gap-2.5">
        {presets.map((p) => card(p.name, p.icon, p.colors, p.name, p.effects.length, () => apply(p.effects, p.colors)))}
      </div>
    </Modal>
  );
}
