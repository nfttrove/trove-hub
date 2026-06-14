import { useState } from 'react';
import { Search, Bookmark, Palette, Sliders, LayoutGrid, Radio, ChevronLeft, ChevronRight, X } from 'lucide-react';

export type EffectType = 'snow' | 'fire' | 'confetti' | 'rockets' | 'bubbles' | 'stars' | 'rain' | 'leaves' | 'matrix' | 'fireflies' | 'lights' | 'santa' | 'petals' | 'butterflies' | 'sparkles' | 'balloons' | 'dandelion' | 'pirate' | 'turkey' | 'bricks' | 'hearts' | 'ghosts' | 'coins' | 'music' | 'math' | 'disco' | 'dvd' | 'flappy' | 'snow_pro' | 'datarain' | 'network';

interface EffectSelectorProps {
  selectedEffects: EffectType[];
  onEffectsChange: (effects: EffectType[]) => void;
  onOpenSettings: () => void;
  onOpenColorPicker: () => void;
  onOpenEffectControls: () => void;
  onOpenPresets: () => void;
  onOpenControlRoom: () => void;
  visible: boolean;
  onToggleVisible: () => void;
}

interface EffectMeta { type: EffectType; label: string; icon: string; pro?: boolean }

const EFFECTS: EffectMeta[] = [
  { type: 'snow_pro', label: 'Snow', icon: '🌨️', pro: true },
  { type: 'datarain', label: 'Data Rain', icon: '🟩', pro: true },
  { type: 'network', label: 'Network', icon: '🕸️', pro: true },
  { type: 'snow', label: 'Snow', icon: '❄️' },
  { type: 'lights', label: 'Lights', icon: '🎄' },
  { type: 'disco', label: 'Disco', icon: '🪩' },
  { type: 'dvd', label: 'DVD', icon: '📀' },
  { type: 'flappy', label: 'Flappy', icon: '🐦' },
  { type: 'santa', label: 'Presents', icon: '🎁' },
  { type: 'turkey', label: 'Turkey', icon: '🦃' },
  { type: 'hearts', label: 'Hearts', icon: '❤️' },
  { type: 'ghosts', label: 'Ghosts', icon: '👻' },
  { type: 'fire', label: 'Fire', icon: '🔥' },
  { type: 'confetti', label: 'Confetti', icon: '🎊' },
  { type: 'rockets', label: 'Rockets', icon: '🚀' },
  { type: 'bubbles', label: 'Bubbles', icon: '🫧' },
  { type: 'stars', label: 'Stars', icon: '⭐' },
  { type: 'rain', label: 'Rain', icon: '🌧️' },
  { type: 'leaves', label: 'Leaves', icon: '🍂' },
  { type: 'matrix', label: 'Matrix', icon: '💚' },
  { type: 'fireflies', label: 'Fireflies', icon: '✨' },
  { type: 'petals', label: 'Petals', icon: '🌸' },
  { type: 'butterflies', label: 'Butterflies', icon: '🦋' },
  { type: 'sparkles', label: 'Sparkles', icon: '✨' },
  { type: 'balloons', label: 'Balloons', icon: '🎈' },
  { type: 'dandelion', label: 'Dandelion', icon: '🌼' },
  { type: 'pirate', label: 'Pirate', icon: '🏴‍☠️' },
  { type: 'bricks', label: 'Bricks', icon: '🧱' },
  { type: 'coins', label: 'Coins', icon: '🪙' },
  { type: 'music', label: 'Music', icon: '🎵' },
  { type: 'math', label: 'Math', icon: '∑' },
];

const TOOLS = [
  { key: 'presets', label: 'Presets', Icon: Bookmark },
  { key: 'colors', label: 'Colors', Icon: Palette },
  { key: 'motion', label: 'Motion', Icon: Sliders },
  { key: 'layout', label: 'Layout', Icon: LayoutGrid },
  { key: 'audio', label: 'Audio', Icon: Radio },
] as const;

export function EffectSelector({
  selectedEffects, onEffectsChange, onOpenSettings, onOpenColorPicker,
  onOpenEffectControls, onOpenPresets, onOpenControlRoom, visible, onToggleVisible,
}: EffectSelectorProps) {
  const [query, setQuery] = useState('');

  const toggleEffect = (t: EffectType) =>
    onEffectsChange(selectedEffects.includes(t) ? selectedEffects.filter(e => e !== t) : [...selectedEffects, t]);

  const openTool = (key: typeof TOOLS[number]['key']) => {
    if (key === 'presets') onOpenPresets();
    else if (key === 'colors') onOpenColorPicker();
    else if (key === 'motion') onOpenEffectControls();
    else if (key === 'layout') onOpenSettings();
    else if (key === 'audio') onOpenControlRoom();
  };

  const q = query.trim().toLowerCase();
  const shown = q ? EFFECTS.filter(e => e.label.toLowerCase().includes(q)) : EFFECTS;
  const pro = shown.filter(e => e.pro);
  const rest = shown.filter(e => !e.pro);
  const activeCount = selectedEffects.length;

  if (!visible) {
    return (
      <button
        onClick={onToggleVisible}
        className="fixed top-5 left-5 z-50 h-10 w-10 grid place-items-center rounded-xl bg-neutral-900/60 backdrop-blur-md border border-white/10 text-neutral-300 hover:bg-neutral-800/80 transition-colors"
        title="Show menu"
        aria-label="Show menu"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    );
  }

  const row = (e: EffectMeta) => {
    const on = selectedEffects.includes(e.type);
    return (
      <button
        key={e.type}
        onClick={() => toggleEffect(e.type)}
        className={`group flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-lg text-[13px] transition-colors ${
          on ? 'bg-sky-500/15 text-white' : 'text-neutral-300 hover:bg-white/5'
        }`}
      >
        <span className="text-base leading-none w-5 text-center">{e.icon}</span>
        <span className="flex-1 text-left truncate">{e.label}</span>
        <span className={`h-1.5 w-1.5 rounded-full transition-opacity ${on ? 'bg-sky-400 opacity-100' : 'opacity-0'}`} />
      </button>
    );
  };

  return (
    <div className="fixed top-5 left-5 z-50 w-[264px] rounded-2xl bg-neutral-950/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
      <div className="flex items-center justify-between px-3.5 pt-3 pb-2.5">
        <div className="flex items-baseline gap-2">
          <h3 className="text-sm font-semibold text-white tracking-tight">Effects</h3>
          {activeCount > 0 && <span className="text-[11px] text-neutral-500">{activeCount} active</span>}
        </div>
        <button
          onClick={onToggleVisible}
          className="h-7 w-7 grid place-items-center rounded-lg text-neutral-400 hover:bg-white/5 hover:text-neutral-200 transition-colors"
          title="Hide menu"
          aria-label="Hide menu"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search effects"
            className="w-full h-8 pl-8 pr-7 rounded-lg bg-white/5 border border-white/10 text-[13px] text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.07] transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="px-2 pb-1 max-h-[58vh] overflow-y-auto">
        {pro.length > 0 && (
          <>
            <p className="px-2.5 pt-1 pb-1 text-[10px] font-medium uppercase tracking-wider text-neutral-500">Premium</p>
            {pro.map(row)}
          </>
        )}
        {rest.length > 0 && (
          <>
            <p className="px-2.5 pt-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-neutral-500">All effects</p>
            {rest.map(row)}
          </>
        )}
        {shown.length === 0 && (
          <p className="px-2.5 py-6 text-center text-[13px] text-neutral-500">No effects match “{query}”.</p>
        )}
      </div>

      <div className="grid grid-cols-5 gap-0.5 p-1.5 border-t border-white/10 bg-black/20">
        {TOOLS.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => openTool(key)}
            className="flex flex-col items-center gap-1 py-2 rounded-lg text-neutral-400 hover:bg-white/5 hover:text-neutral-200 transition-colors"
            title={label}
          >
            <Icon className="w-[18px] h-[18px]" />
            <span className="text-[10px] leading-none">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
