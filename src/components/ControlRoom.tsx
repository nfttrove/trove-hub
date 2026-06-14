import { useState } from 'react';
import { Radio, Play, SkipBack, SkipForward, Rewind, Power, PowerOff } from 'lucide-react';
import { musicControl, type MusicAction } from '../lib/control';
import { Modal } from './ui/Modal';
import { ui } from './ui/styles';

interface ControlRoomProps {
  onClose: () => void;
}

export function ControlRoom({ onClose }: ControlRoomProps) {
  const [status, setStatus] = useState('');

  const fire = async (action: MusicAction) => {
    setStatus('…');
    setStatus(await musicControl(action));
  };

  return (
    <Modal title="Control room" icon={<Radio className="w-[18px] h-[18px]" />} onClose={onClose}>
      <p className={ui.sectionLabel}>Jukebox</p>
      <div className="grid grid-cols-2 gap-2 mt-2.5 mb-2">
        <button onClick={() => fire('start')} className={`${ui.btn} ${ui.btnGood}`}>
          <Power className="w-4 h-4" /> Start
        </button>
        <button onClick={() => fire('stop')} className={`${ui.btn} ${ui.btnDanger}`}>
          <PowerOff className="w-4 h-4" /> Stop
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button onClick={() => fire('prev')} className={`${ui.btn} ${ui.btnSecondary}`} title="Previous"><SkipBack className="w-4 h-4" /></button>
        <button onClick={() => fire('rewind')} className={`${ui.btn} ${ui.btnSecondary}`} title="Rewind 10s"><Rewind className="w-4 h-4" /></button>
        <button onClick={() => fire('playpause')} className={`${ui.btn} ${ui.btnSecondary}`} title="Play / pause"><Play className="w-4 h-4" /></button>
        <button onClick={() => fire('next')} className={`${ui.btn} ${ui.btnSecondary}`} title="Next"><SkipForward className="w-4 h-4" /></button>
      </div>
      <p className="h-4 mt-3 text-[12px] text-neutral-500">{status}</p>
    </Modal>
  );
}
