# Changelog

All notable changes to trove-hub (the OBS stream control room). Newest first.

## 2026-07-02 — Particle effects retirement: 21 ambient → 2 (disco + searchlights)

The operator confirmed only two ambient effects are wanted (`searchlights` + `disco`); the other 21 were accumulated thematic filler (snow, santa, turkey, pirate, etc.) that wasn't being used. Retired them and the dependencies they pulled in. Reactive (event-triggered) effects are unchanged — confetti on signal-win and matrix-rain on breaker-trip still fire, kept alive for the reactive path only.

### Removed
- **21 ambient effect components** (`src/components/effects/`): Snow, Stars, Matrix, Network (ParticleField), Sparkles, Fireflies, Fire, Rain, Lights, Balloons, Bricks, Rockets, Hearts, Ghosts, MusicNotes, Math, SantaPresents, Turkey, Pirate, DVD. Plus `Snowflake.tsx` (orphaned helper) and the entire `particles/` subdirectory.
- **`PresetSelector.tsx` + `lib/customPresets.ts`** — every preset referenced retired effects. The whole presets UI is gone (the TOOLS grid drops from 5 → 4: Colors, Motion, Layout, Audio).
- **`@tsparticles/*` dependencies** (engine, react, slim, shape-emoji) — orphaned by the ParticleField/network removal. ~145KB off the bundle (335KB → 190KB JS).
- **DVD celebration hook** in App.tsx — `celebrationConfetti` state + `handleDVDCornerHit` + the `activeEffects` confetti append. DVD is gone, so the whole corner-hit → confetti mechanism is dead.

### Changed
- **`EffectType` union** shrunk 23 → 2 (`'disco' | 'searchlights'`). The `EFFECTS` picker array matches.
- **`EffectScene` switch** pruned to the 2 keepers; `case 'searchlights':` restored (it was in the live `dist/` bundle but had regressed out of source — selecting it rendered nothing). Both keepers now actually render.
- **Default effect** in `useEffectConfig`: `['snow']` → `['disco']`. Existing users with stored `['snow']` get filtered against the surviving union and fall back to the new default (localStorage migration).
- **`index.css`** pruned from 640 → ~110 lines. Only the reactive-effect keyframes survive (siren, confetti, matrix, fall for SkullStorm). Disco + searchlights define their keyframes inline in their components.

### Not changed (deliberately)
- **Reactive effects** (`ReactiveEffects.tsx`) untouched — confetti (signal_win), matrix (breaker_trip), siren (warrant_siren), skull-storm (bearish_call) all still fire on stream events. `ConfettiEffect.tsx` and `MatrixEffect.tsx` survive as reactive-only, not ambient-selectable.
- **`customText` in `EffectSettings`** is now unused (only DVD consumed it) but stays in the type + EffectControls UI — harmless, deferred cleanup.

### Verification
- `npm run typecheck` — clean.
- `npm run build` — succeeded (190KB JS, 20KB CSS, down from 335KB JS / 35KB CSS).
- Operator visual smoke-check on `:4173` pending (the running `vite preview` serves the OLD bundle until restarted off-stream).

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
