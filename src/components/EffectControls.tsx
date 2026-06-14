import { Sliders } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Switch } from './ui/Switch';
import { ui } from './ui/styles';

export interface EffectSettings {
  speed: number;
  rotation: boolean;
  particleCount: number;
  customText: string;
}

interface EffectControlsProps {
  settings: EffectSettings;
  onSettingsChange: (settings: EffectSettings) => void;
  onClose: () => void;
}

export function EffectControls({ settings, onSettingsChange, onClose }: EffectControlsProps) {
  const set = (patch: Partial<EffectSettings>) => onSettingsChange({ ...settings, ...patch });

  return (
    <Modal title="Motion" icon={<Sliders className="w-[18px] h-[18px]" />} onClose={onClose}>
      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] text-neutral-200">Speed</span>
            <span className="text-[13px] text-neutral-400 tabular-nums">{settings.speed.toFixed(1)}×</span>
          </div>
          <input
            type="range" min="0.1" max="3.0" step="0.1" value={settings.speed}
            onChange={(e) => set({ speed: parseFloat(e.target.value) })}
            className="w-full accent-sky-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] text-neutral-200">Density</span>
            <span className="text-[13px] text-neutral-400 tabular-nums">{settings.particleCount}%</span>
          </div>
          <input
            type="range" min="25" max="200" step="25" value={settings.particleCount}
            onChange={(e) => set({ particleCount: parseInt(e.target.value) })}
            className="w-full accent-sky-500"
          />
        </div>

        <div className="pt-1">
          <Switch
            checked={settings.rotation}
            onChange={(v) => set({ rotation: v })}
            label="Rotation"
            hint="Spin rotating effects"
          />
        </div>

        <div>
          <label className={`${ui.sectionLabel} block mb-2`}>DVD text</label>
          <input
            type="text" value={settings.customText}
            onChange={(e) => set({ customText: e.target.value })}
            placeholder="GameStop" className={ui.field}
          />
        </div>
      </div>
    </Modal>
  );
}
