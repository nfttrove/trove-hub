import { useRef } from 'react';
import { LayoutGrid, Plus, Trash2, Download, Upload } from 'lucide-react';
import type { EffectArea, Rect } from '../lib/mask';
import { exportConfigJson, importConfigJson } from '../hooks/useEffectConfig';
import { Modal } from './ui/Modal';
import { ui } from './ui/styles';

export interface DeadZone {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DeadZoneConfigProps {
  deadZones: DeadZone[];
  onDeadZonesChange: (zones: DeadZone[]) => void;
  effectArea: EffectArea;
  onEffectAreaChange: (area: EffectArea) => void;
  onClose: () => void;
}

// The real 7-zone stream layout, exact values from the operator's stream
// screenshots. Lives in source so a localStorage wipe is a one-click recovery
// via "Load stream layout".
const STREAM_TEMPLATE: DeadZone[] = [
  { id: 'gme', x: 1, y: 1, width: 24.6, height: 13.1 },
  { id: 'peers', x: 26.1, y: 1, width: 48, height: 13.1 },
  { id: 'data', x: 74.7, y: 1, width: 24.4, height: 36.6 },
  { id: 'chart', x: 1, y: 15.2, width: 73.1, height: 75.8 },
  { id: 'tape', x: 1, y: 92, width: 73, height: 6.8 },
  { id: 'intel', x: 74.7, y: 39.4, width: 24.4, height: 51.6 },
  { id: 'music', x: 74.8, y: 92, width: 24.4, height: 6.8 },
];

export function DeadZoneConfig({ deadZones, onDeadZonesChange, effectArea, onEffectAreaChange, onClose }: DeadZoneConfigProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addDeadZone = () =>
    onDeadZonesChange([...deadZones, { id: Math.random().toString(36).substr(2, 9), x: 10, y: 10, width: 20, height: 15 }]);
  const removeDeadZone = (id: string) => onDeadZonesChange(deadZones.filter(z => z.id !== id));
  const updateDeadZone = (id: string, updates: Partial<DeadZone>) =>
    onDeadZonesChange(deadZones.map(z => (z.id === id ? { ...z, ...updates } : z)));
  const loadTemplate = () => onDeadZonesChange(STREAM_TEMPLATE.map(z => ({ ...z })));

  const setMode = (mode: EffectArea['mode']) => onEffectAreaChange({ ...effectArea, mode });
  const updateFrame = (updates: Partial<Rect>) => onEffectAreaChange({ ...effectArea, frame: { ...effectArea.frame, ...updates } });

  const handleExport = () => {
    const blob = new Blob([exportConfigJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'trove-config.json'; a.click();
    URL.revokeObjectURL(url);
  };
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try { importConfigJson(String(reader.result)); window.location.reload(); }
      catch { alert('That file is not a valid trove-config.json'); }
    };
    reader.readAsText(file);
  };

  const rectField = (label: string, value: number, onChange: (v: number) => void) => (
    <div>
      <label className="text-[11px] text-neutral-500 block mb-1">{label}</label>
      <input
        type="number" value={value} min="0" max="100" step="0.1"
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className={`${ui.field} font-mono`}
      />
    </div>
  );

  const seg = (mode: EffectArea['mode'], label: string) => (
    <button
      onClick={() => setMode(mode)}
      className={`flex-1 h-8 rounded-md text-[13px] font-medium transition-colors ${
        effectArea.mode === mode ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-neutral-200'
      }`}
    >
      {label}
    </button>
  );

  const footer = (
    <div className="flex items-center gap-2">
      <button onClick={handleExport} className={`${ui.btn} ${ui.btnSecondary}`}><Download className="w-4 h-4" /> Export</button>
      <button onClick={() => fileInputRef.current?.click()} className={`${ui.btn} ${ui.btnSecondary}`}><Upload className="w-4 h-4" /> Import</button>
      <input ref={fileInputRef} type="file" accept="application/json,.json" onChange={handleImportFile} className="hidden" />
      <span className="ml-auto text-[12px] text-neutral-500">{deadZones.length} zone{deadZones.length !== 1 ? 's' : ''}</span>
    </div>
  );

  return (
    <Modal title="Layout" icon={<LayoutGrid className="w-[18px] h-[18px]" />} onClose={onClose} maxWidth="max-w-lg" footer={footer}>
      <div className={`${ui.card} p-4 mb-5`}>
        <p className="text-[13px] font-medium text-neutral-200 mb-2.5">Effect layer</p>
        <div className="flex gap-0.5 p-0.5 rounded-lg bg-white/5 border border-white/10 mb-2.5">
          {seg('foreground', 'Overlay')}
          {seg('frame', 'Frame (behind)')}
        </div>
        <p className="text-[12px] text-neutral-500 mb-3">
          {effectArea.mode === 'foreground'
            ? 'Over everything, including the dead zones.'
            : 'Only inside the frame, minus dead zones — behind the widgets.'}
        </p>
        {effectArea.mode === 'frame' && (
          <>
            <div className="grid grid-cols-2 gap-2.5">
              {rectField('X %', effectArea.frame.x, (v) => updateFrame({ x: v }))}
              {rectField('Y %', effectArea.frame.y, (v) => updateFrame({ y: v }))}
              {rectField('Width %', effectArea.frame.width, (v) => updateFrame({ width: v }))}
              {rectField('Height %', effectArea.frame.height, (v) => updateFrame({ height: v }))}
            </div>
            <button
              onClick={() => onEffectAreaChange({ ...effectArea, frame: { x: 0, y: 0, width: 100, height: 100 } })}
              className={`${ui.btn} ${ui.btnSecondary} mt-2.5 h-8`}
            >
              Full canvas
            </button>
          </>
        )}
      </div>

      <div className="flex items-center justify-between mb-2.5">
        <p className={ui.sectionLabel}>Dead zones</p>
        <div className="flex gap-1.5">
          <button onClick={loadTemplate} className={`${ui.btn} ${ui.btnSecondary} h-8 px-2.5`}>Load stream layout</button>
          <button onClick={addDeadZone} className={`${ui.btn} ${ui.btnSecondary} h-8 px-2.5`}><Plus className="w-3.5 h-3.5" /> Add</button>
        </div>
      </div>
      <p className="text-[12px] text-neutral-500 mb-3">Areas where effects never render — your widgets. Percentages of the canvas.</p>

      <div className="space-y-2.5">
        {deadZones.length === 0 && (
          <p className="text-center text-[13px] text-neutral-500 py-6">No dead zones yet.</p>
        )}
        {deadZones.map((zone, i) => (
          <div key={zone.id} className={`${ui.card} p-3`}>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[13px] font-medium text-neutral-200">Zone {i + 1}</span>
              <button onClick={() => removeDeadZone(zone.id)} className="text-neutral-500 hover:text-red-400 transition-colors" aria-label="Remove zone">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {rectField('X', zone.x, (v) => updateDeadZone(zone.id, { x: v }))}
              {rectField('Y', zone.y, (v) => updateDeadZone(zone.id, { y: v }))}
              {rectField('W', zone.width, (v) => updateDeadZone(zone.id, { width: v }))}
              {rectField('H', zone.height, (v) => updateDeadZone(zone.id, { height: v }))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
