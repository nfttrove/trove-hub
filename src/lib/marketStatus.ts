import { useEffect, useRef, useState } from 'react';
import { agentBase } from './agentBase';
import type { BackgroundColors } from '../components/ColorPicker';

export type Direction = 'up' | 'down' | 'flat';

// Poll fast enough that a profit<->loss flip reads as near-real-time. The
// feed is a cheap local DB read and the price source itself ticks every ~5s
// during market hours, so there's nothing to gain from polling faster.
const POLL_MS = 5000;

// Vivid green/red so the day's direction is unmistakable at a glance — and so a
// flip is obvious. Matches the house "Tropical" (up) / "Fire Red" (down)
// presets; the old near-black gradients were so dark up and down looked
// identical behind the widgets.
const UP_GRADIENT: BackgroundColors = { start: '#065f46', middle: '#10b981', end: '#34d399' };
const DOWN_GRADIENT: BackgroundColors = { start: '#7f1d1d', middle: '#dc2626', end: '#ef4444' };

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
