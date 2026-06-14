# trove-hub

Stream control room — animated background effects for the OBS browser source.
Vite + React + TypeScript + Tailwind. Config persists locally (browser
`localStorage`); no backend, no network dependency.

## Run

Live editing (dev server, hot-reload):

```bash
npm install
npm run dev          # http://localhost:5173
```

For the stream, serve a static build instead — lighter on RAM than the dev
server during long streams, and survives reboots:

```bash
npm run build
npm run preview      # http://localhost:4173
```

Point an OBS Browser Source at the URL. Press `H` over the source to toggle the
control menu.

## Effect area & dead zones

Open the gear menu → **Effect Area & Dead Zones**:

- **Fullscreen** — effects render across the whole canvas, minus dead zones.
- **Frame only** — effects render only inside a defined frame rect, minus dead zones.
- **Dead zones** — rectangles (your widgets) where effects never render. Both
  modes subtract them.
- **Load Stream Layout** — restores the 7-zone GME stream mask (seams sealed).
- **Export / Import** — back up or restore the full config as `trove-config.json`.
  Since config lives in `localStorage`, Export is your only backup against a
  browser cache-clear — keep one.
