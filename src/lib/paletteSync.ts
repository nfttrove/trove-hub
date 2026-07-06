import { useEffect, useRef } from 'react';
import { agentBase } from './agentBase';
import type { Direction } from './marketStatus';
import type { BackgroundColors } from '../components/ColorPicker';

// The SOURCE side of the TroveHub -> OBS palette cascade. TroveHub resolves a
// scheme (bull / bear / custom accent) and POSTs it to the agent server; the OBS
// overlays poll /palette/scheme.json and flip <html data-scheme> so theme.css
// swaps --t-accent in lockstep. One source (here) -> many readers (overlays).
//
// This lived only in the built dist/ before (never committed) and was silently
// dropped when App.tsx was refactored + rebuilt on 2026-07-02 — freezing every
// overlay on the last-pushed scheme. It is committed now so a rebuild can't drop
// it again. Server contract + resolution rule: gme_trading_system/logger_daemon.py
// (POST /palette/scheme) and the 2026-06-20 CHANGELOG entry.

export type Scheme = 'default' | 'bull' | 'bear';

export interface ResolvedScheme {
  scheme: Scheme;
  accent: string | null;
  accent_channels: string | null;
}

/** '#rrggbb' -> 'r g b' (space-separated channels for Tailwind's alpha-modifier
 *  form, which is what the overlay side sets as --t-accent-channels). Returns
 *  null on a malformed hex so the caller can omit it. */
export function hexToChannels(hex: string): string | null {
  const m = /^#?([0-9a-fA-F]{6})$/.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

/** The resolution rule (mirrors the server contract + the 2026-06-20 changelog):
 *  Ambient ON + market up -> bull, + down -> bear; Ambient OFF or flat -> default
 *  with accent = the first hex of the picked gradient. */
export function resolveScheme(
  ambient: boolean,
  direction: Direction | null,
  bgColors: BackgroundColors,
): ResolvedScheme {
  if (ambient && direction === 'up') return { scheme: 'bull', accent: null, accent_channels: null };
  if (ambient && direction === 'down') return { scheme: 'bear', accent: null, accent_channels: null };
  const accent = bgColors.start;
  return { scheme: 'default', accent, accent_channels: hexToChannels(accent) };
}

/**
 * Push the resolved scheme to the agent server whenever it changes, so every OBS
 * overlay cascades to it. Fires on mount (sets the overlays on load) and on any
 * change to ambient / direction / the picked accent. Deduped so an unchanged
 * scheme isn't re-POSTed each render. Fire-and-forget: a down server never throws
 * into the UI, and resets the dedupe so the next change retries.
 */
export function usePaletteSync(
  ambient: boolean,
  direction: Direction | null,
  bgColors: BackgroundColors,
): void {
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    // Ambient on but the first market read hasn't landed yet: hold, so we don't
    // flash the manual 'default' accent for a beat before bull/bear resolves.
    if (ambient && direction === null) return;

    const body = JSON.stringify(resolveScheme(ambient, direction, bgColors));
    if (body === lastSent.current) return;
    lastSent.current = body;

    fetch(`${agentBase()}/palette/scheme`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {
      lastSent.current = null; // server unreachable — retry on the next change
    });
  }, [ambient, direction, bgColors.start]);
}
