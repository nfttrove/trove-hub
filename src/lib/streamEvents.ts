import { useEffect, useRef } from 'react';

/**
 * Reactive stream events — the "AI trading floor" payoff.
 *
 * The agent-team emits events when real conditions fire (warrant-vol spike,
 * winning signal, breaker trip, bearish call); the overlay polls them and plays
 * a one-shot effect. The contract is deliberately tiny and append-only.
 */
export type StreamEventType =
  | 'warrant_siren' // warrant-vol z-spike — the siren
  | 'signal_win'    // a scored signal came good — confetti
  | 'breaker_trip'  // a circuit breaker opened — matrix rain
  | 'bearish_call'; // bearish consensus/synthesis — skull storm

export interface StreamEvent {
  /** Monotonic, unique. Overlay fires each id at most once. */
  id: number;
  type: StreamEventType;
  /** Optional caption shown with the effect (e.g. "GME.WS z=3.4"). */
  label?: string;
  /** Unix ms (informational). */
  ts?: number;
}

const POLL_MS = 4000;
const DEFAULT_URL = 'http://localhost:8765/stream/events';

function eventsUrl(): string {
  const fromEnv = (import.meta.env.VITE_STREAM_EVENTS_URL as string | undefined)?.trim();
  return fromEnv || DEFAULT_URL;
}

/**
 * Poll the events feed and invoke `onEvent` for each newly-seen event.
 *
 * - Never throws into the render tree: any fetch/parse failure is swallowed so a
 *   dead feed can't take down the stream overlay.
 * - Also installs `window.troveTrigger(type, label?)` so effects can be fired
 *   manually (testing, or a future chat command) without the feed.
 */
export function useStreamEvents(onEvent: (e: StreamEvent) => void) {
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;
  const lastIdRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), POLL_MS - 500);
        const res = await fetch(`${eventsUrl()}?since=${lastIdRef.current}`, {
          signal: controller.signal,
        });
        clearTimeout(timer);
        if (!res.ok) return;
        const body = (await res.json()) as { events?: StreamEvent[] };
        if (cancelled || !Array.isArray(body.events)) return;
        for (const e of body.events) {
          if (typeof e?.id !== 'number' || e.id <= lastIdRef.current) continue;
          lastIdRef.current = e.id;
          onEventRef.current(e);
        }
      } catch {
        // Feed down / not running yet — stay quiet, try again next tick.
      }
    };

    const interval = setInterval(poll, POLL_MS);
    poll();

    // Manual trigger for testing and future chat commands.
    const w = window as unknown as { troveTrigger?: (t: StreamEventType, label?: string) => void };
    w.troveTrigger = (type, label) => {
      lastIdRef.current += 1;
      onEventRef.current({ id: lastIdRef.current, type, label, ts: Date.now() });
    };

    return () => {
      cancelled = true;
      clearInterval(interval);
      delete w.troveTrigger;
    };
  }, []);
}
