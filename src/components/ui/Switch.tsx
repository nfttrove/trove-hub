import type { ReactNode } from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: ReactNode;
  hint?: ReactNode;
}

/** iOS-style toggle — replaces the old square checkboxes across the hub. */
export function Switch({ checked, onChange, label, hint }: SwitchProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${checked ? 'bg-sky-500' : 'bg-white/15'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : ''}`}
        />
      </button>
      {(label || hint) && (
        <button type="button" onClick={() => onChange(!checked)} className="min-w-0 text-left">
          {label && <span className="block text-[13px] text-neutral-200">{label}</span>}
          {hint && <span className="block text-[12px] text-neutral-500 mt-0.5">{hint}</span>}
        </button>
      )}
    </div>
  );
}
