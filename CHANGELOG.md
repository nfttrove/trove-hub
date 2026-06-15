# Changelog

All notable changes to trove-hub (the OBS stream control room). Newest first.

## 2026-06-15 — Market-tint: brighter + near-real-time

### Changed
- **Day-direction background** is now vivid green (up) / red (down), matching the
  house "Tropical"/"Fire Red" presets. The old gradients were so dark that up and
  down looked nearly identical behind the widgets — the tint read as dull and a
  profit↔loss flip was invisible.
- **Poll interval 30s → 5s** so a flip switches near-real-time (the price source
  itself ticks ~5s during market hours; the status feed is a cheap local read).
  Both in `src/lib/marketStatus.ts`.

## 2026-06-14 — Stream control room overhaul

Took the bolt.new scaffold to a real, self-contained control room: de-branded,
fully local, with a modern UI, market-reactive ambience, live reactive effects,
and hand-crafted visual effects.

### Added
- **Effect layer model** — `Overlay` (effects over everything) vs `Frame`
  (effects only inside a rect, behind the widgets). Effects now actually respect
  the mask (previously the mask only applied to the background).
- **Reactive effects** — the overlay polls the agent-team `/stream/events` feed
  and plays one-shot effects: warrant siren, signal-win confetti, breaker-trip
  matrix rain, bearish-call skull storm. `window.troveTrigger(type)` fires them
  manually.
- **Control room** (Radio menu) — start/stop the jukebox (launchctl) and
  play-pause/next/prev/rewind (mpv) via the agent-team `/control/music` endpoint.
- **Market-driven ambient background** — auto-tints the whole background green on
  an up day / red on a down day, from `/market/status.json`.
- **Save custom presets** — "Save current setup" → My presets (apply/delete),
  persisted to localStorage.
- **Config export/import** to `trove-config.json` (backup against a localStorage
  wipe); "Load stream layout" restores the 7-zone GME mask.
- **Menu auto-hide** — the Effects menu hides by default and reveals on mouse
  proximity to the top-left; pin to lock it open. Clean on the live output.

### Changed
- **De-bolted** — removed all bolt.new branding (OG images, README badge,
  `.bolt/`, package name).
- **Fully local** — replaced Supabase with localStorage; no backend, no network
  dependency.
- **Modernized the whole control UI** — shared `Modal`/`Switch` system, a
  searchable single-list effects menu with a labelled tool bar, consistent
  inputs/spacing across all panels.
- **Effects** — trimmed the roster (removed flappy/petals/butterflies/dandelion/
  leaves/bubbles/coins) and hand-upgraded several: rockets (rotated + flame
  behind + crossing trajectories), matrix (bright leading head, trail fades up),
  lights (bulbs on a sagging wire), balloons (3D shading + string), bricks
  (brick bevel + mortar), math (italic-serif equations), pirate (SVG galleon).
  Added `network` (a constellation particle effect via tsParticles).
- Static serve for streaming: `npm run build && npm run preview`.

### Notes
- A brief experiment converting every effect to tsParticles was reverted — the
  generic particle fields lost the character of the hand-built effects.
