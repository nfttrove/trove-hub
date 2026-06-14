import { Bookmark } from 'lucide-react';
import type { EffectType } from './EffectSelector';
import type { BackgroundColors } from './ColorPicker';
import { Modal } from './ui/Modal';

interface Preset {
  name: string;
  effects: EffectType[];
  colors: BackgroundColors;
  icon: string;
}

interface PresetSelectorProps {
  onApplyPreset: (effects: EffectType[], colors: BackgroundColors) => void;
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
    effects: ['hearts', 'petals'],
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
    effects: ['turkey', 'leaves'],
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
    effects: ['bubbles', 'rain'],
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
    name: 'Money Rain',
    effects: ['coins'],
    colors: { start: '#365314', middle: '#84cc16', end: '#bef264' },
    icon: '💰',
  },
  {
    name: 'Garden',
    effects: ['butterflies', 'dandelion', 'petals'],
    colors: { start: '#065f46', middle: '#10b981', end: '#34d399' },
    icon: '🌷',
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

export function PresetSelector({ onApplyPreset, onClose }: PresetSelectorProps) {
  return (
    <Modal title="Scene presets" icon={<Bookmark className="w-[18px] h-[18px]" />} onClose={onClose} maxWidth="max-w-lg">
      <div className="grid grid-cols-3 gap-2.5">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => {
              onApplyPreset(preset.effects, preset.colors);
              onClose();
            }}
            className="group rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-500/50 hover:bg-white/[0.06] transition-colors p-3 flex flex-col items-center gap-1.5"
          >
            <span
              className="h-10 w-10 grid place-items-center rounded-lg text-2xl mb-0.5"
              style={{ background: `linear-gradient(135deg, ${preset.colors.start}, ${preset.colors.end})` }}
            >
              {preset.icon}
            </span>
            <span className="text-[13px] font-medium text-neutral-200 text-center leading-tight">{preset.name}</span>
            <span className="text-[11px] text-neutral-500">{preset.effects.length} effect{preset.effects.length !== 1 ? 's' : ''}</span>
          </button>
        ))}
      </div>
    </Modal>
  );
}
