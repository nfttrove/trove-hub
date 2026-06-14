import { useEffect, useRef, useState } from 'react';
import { agentBase } from './agentBase';
import type { BackgroundColors } from '../components/ColorPicker';

export type Direction = 'up' | 'down' | 'flat';

const POLL_MS = 30000;

// Dark gradients tuned to the existing palette — readable behind the widgets.
const UP_GRADIENT: BackgroundColors = { start: '#06140d', middle: '#0c2a1a', end: '#1f5a39' };
const DOWN_GRADIENT: BackgroundColors = { start: '#160a0a', middle: '#2a0f12', end: '#5a1f28' };

/** The background gradient for a given day direction, falling back to the
 *  operator's manual colours when flat/unknown. */
export function gradientForDirection(
  direction: Direction | null,
  fallback: BackgroundColors,
): BackgroundColors {
  if (direction === 'up') return UP_GRADIENT;
  if (direction === 'down') return DOWN_GRADIENT;
  return fallback;
}

/**
 * Poll the day-status feed and return the current direction (or null until
 * known / on a dead feed). Only polls while `enabled`. Fails silently.
 */
export function useMarketDirection(enabled: boolean): Direction | null {
  const [direction, setDirection] = useState<Direction | null>(null);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  useEffect(() => {
    if (!enabled) {
      setDirection(null);
      return;
    }
    let cancelled = false;

    const poll = async () => {
      try {
        const res = await fetch(`${agentBase()}/market/status.json`);
        if (!res.ok) return;
        const body = (await res.json()) as { direction?: Direction };
        if (!cancelled && body?.direction) setDirection(body.direction);
      } catch {
        // Feed down — keep the last known direction, try again next tick.
      }
    };

    const interval = setInterval(poll, POLL_MS);
    poll();
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [enabled]);

  return direction;
}
