import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  title: string;
  icon?: ReactNode;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string;
}

/** Shared modal shell — consistent header, scrollable body, optional footer.
 *  Backdrop click closes. The single source of the hub's modal look. */
export function Modal({ title, icon, onClose, children, footer, maxWidth = 'max-w-md' }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidth} max-h-[85vh] flex flex-col rounded-2xl bg-neutral-950/95 border border-white/10 shadow-2xl shadow-black/50 overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            {icon && <span className="text-neutral-400 grid place-items-center">{icon}</span>}
            <h2 className="text-[15px] font-semibold text-white tracking-tight">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 grid place-items-center rounded-lg text-neutral-400 hover:bg-white/5 hover:text-neutral-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-5 py-4 overflow-y-auto">{children}</div>
        {footer && <div className="px-5 py-3 border-t border-white/10 bg-black/20">{footer}</div>}
      </div>
    </div>
  );
}
