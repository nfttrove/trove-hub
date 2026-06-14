import { agentBase } from './agentBase';

export type MusicAction = 'start' | 'stop' | 'playpause' | 'next' | 'prev' | 'rewind';

/**
 * Fire a music-transport command at the agent-team control endpoint.
 * Fire-and-forget: returns the server's short status line, or a friendly
 * fallback if the server is unreachable (never throws into the UI).
 */
export async function musicControl(action: MusicAction): Promise<string> {
  try {
    const res = await fetch(`${agentBase()}/control/music?action=${action}`);
    if (!res.ok) return `⚠ ${res.status}`;
    return (await res.text()).trim();
  } catch {
    return '⚠ control server unreachable';
  }
}
