import { useState, useEffect, useRef } from 'react';
import { Search, Bookmark, Palette, Sliders, LayoutGrid, Radio, Pin, PinOff, X } from 'lucide-react';

export type EffectType = 'snow' | 'stars' | 'matrix' | 'network' | 'confetti' | 'sparkles' | 'fireflies' | 'fire' | 'rain' | 'lights' | 'disco' | 'balloons' | 'bricks' | 'rockets' | 'hearts' | 'ghosts' | 'music' | 'math' | 'santa' | 'turkey' | 'pirate' | 'dvd';

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

interface EffectMeta { type: EffectType; label: string; icon: string }

const EFFECTS: EffectMeta[] = [
  { type: 'snow', label: 'Snow', icon: '❄️' },
  { type: 'stars', label: 'Stars', icon: '⭐' },
  { type: 'matrix', label: 'Matrix', icon: '💚' },
  { type: 'network', label: 'Network', icon: '🕸️' },
  { type: 'confetti', label: 'Confetti', icon: '🎊' },
  { type: 'sparkles', label: 'Sparkles', icon: '✨' },
  { type: 'fireflies', label: 'Fireflies', icon: '🔆' },
  { type: 'fire', label: 'Fire', icon: '🔥' },
  { type: 'rain', label: 'Rain', icon: '🌧️' },
  { type: 'lights', label: 'Lights', icon: '🎄' },
  { type: 'disco', label: 'Disco', icon: '🪩' },
  { type: 'balloons', label: 'Balloons', icon: '🎈' },
  { type: 'bricks', label: 'Bricks', icon: '🧱' },
  { type: 'rockets', label: 'Rockets', icon: '🚀' },
  { type: 'hearts', label: 'Hearts', icon: '❤️' },
  { type: 'ghosts', label: 'Ghosts', icon: '👻' },
  { type: 'music', label: 'Music', icon: '🎵' },
  { type: 'math', label: 'Math', icon: '∑' },
  { type: 'santa', label: 'Presents', icon: '🎁' },
  { type: 'turkey', label: 'Turkey', icon: '🦃' },
  { type: 'pirate', label: 'Pirate', icon: '🏴‍☠️' },
  { type: 'dvd', label: 'DVD', icon: '📀' },
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
  const [near, setNear] = useState(false);
  const hideTimer = useRef<number | undefined>(undefined);

  // Reveal on mouse proximity to the top-left corner; hide shortly after the
  // cursor leaves. On the live stream there's no cursor, so it stays hidden.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const inZone = e.clientX < 320 && e.clientY < 720;
      if (inZone) {
        if (hideTimer.current !== undefined) { clearTimeout(hideTimer.current); hideTimer.current = undefined; }
        setNear(true);
      } else if (hideTimer.current === undefined) {
        hideTimer.current = window.setTimeout(() => { setNear(false); hideTimer.current = undefined; }, 500);
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (hideTimer.current !== undefined) clearTimeout(hideTimer.current);
    };
  }, []);

  const show = visible || near;

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
  const activeCount = selectedEffects.length;

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
    <>
      {!show && (
        <div className="fixed top-6 left-0 z-40 h-12 w-1.5 rounded-r-full bg-white/15 pointer-events-none" aria-hidden="true" />
      )}
      <div
        className={`fixed top-5 left-5 z-50 w-[264px] rounded-2xl bg-neutral-950/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden transition-all duration-200 ${
          show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between px-3.5 pt-3 pb-2.5">
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm font-semibold text-white tracking-tight">Effects</h3>
            {activeCount > 0 && <span className="text-[11px] text-neutral-500">{activeCount} active</span>}
          </div>
          <button
            onClick={onToggleVisible}
            className="h-7 w-7 grid place-items-center rounded-lg text-neutral-400 hover:bg-white/5 hover:text-neutral-200 transition-colors"
            title={visible ? 'Unpin (auto-hide)' : 'Pin open'}
            aria-label={visible ? 'Unpin menu' : 'Pin menu open'}
          >
            {visible ? <Pin className="w-4 h-4 text-sky-400" /> : <PinOff className="w-4 h-4" />}
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

        <div className="px-2 pb-1 max-h-[60vh] overflow-y-auto">
          {shown.map(row)}
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
    </>
  );
}
