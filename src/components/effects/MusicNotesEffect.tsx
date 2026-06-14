import { useEffect, useState } from 'react';

interface NoteData {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  note: string;
  rotation: number;
}

interface MusicNotesEffectProps {
  speed?: number;
  rotation?: boolean;
}

const musicNotes = ['🎵', '🎶', '🎼'];

export function MusicNotesEffect({ speed = 1.0, rotation = true }: MusicNotesEffectProps = {}) {
  const [notes, setNotes] = useState<NoteData[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 8,
      size: 25 + Math.random() * 20,
      note: musicNotes[Math.floor(Math.random() * musicNotes.length)],
      rotation: Math.random() * 360,
    }));
    setNotes(items);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {notes.map((note) => (
        <div
          key={note.id}
          className="absolute animate-fall"
          style={{
            left: `${note.left}%`,
            animationDelay: `${note.delay}s`,
            animationDuration: `${note.duration / speed}s`,
            fontSize: `${note.size}px`,
            transform: rotation ? `rotate(${note.rotation}deg)` : 'none',
          }}
        >
          {note.note}
        </div>
      ))}
    </div>
  );
}
