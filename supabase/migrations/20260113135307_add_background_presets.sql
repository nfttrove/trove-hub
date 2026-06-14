/*
  # Add Background Presets Table

  1. New Tables
    - `background_presets`
      - `id` (uuid, primary key)
      - `name` (text, unique) - Display name of the preset
      - `slug` (text, unique) - URL-friendly identifier
      - `color_start` (text) - Starting gradient color (hex)
      - `color_middle` (text) - Middle gradient color (hex)
      - `color_end` (text) - Ending gradient color (hex)
      - `description` (text) - Overlay/texture description
      - `sort_order` (integer) - Display order
      - `created_at` (timestamptz)

  2. Data
    - Seeds 10 premium "Trove" background presets
    - Each preset includes gradient colors and texture overlay descriptions

  3. Security
    - Enable RLS on `background_presets` table
    - Add policy for public read access (presets are universal)
*/

CREATE TABLE IF NOT EXISTS background_presets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  color_start text NOT NULL,
  color_middle text NOT NULL,
  color_end text NOT NULL,
  description text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE background_presets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view background presets"
  ON background_presets
  FOR SELECT
  TO public
  USING (true);

INSERT INTO background_presets (name, slug, color_start, color_middle, color_end, description, sort_order) VALUES
  ('Midnight Hull', 'midnight-hull', '#0B1020', '#121A2E', '#2B3A55', 'Soft vignette (6–10%), fine grain (2–3%)', 1),
  ('Deep Hold', 'deep-hold', '#071018', '#0C2230', '#1E4B5B', 'Subtle vertical highlight band at ~65% (8% opacity)', 2),
  ('Captain''s Log', 'captains-log', '#1A1714', '#2A241E', '#4A3B2B', 'Paper/grain texture (3–4%), tiny warm bloom on right edge', 3),
  ('Salt & Steel', 'salt-steel', '#0C1320', '#1D2A3A', '#8FA2B8', 'Mild vignette + very faint haze (like glass)', 4),
  ('Black Flag Lines', 'black-flag-lines', '#0A0F1A', '#101C2C', '#2A4663', 'Diagonal pinstripes (1–2px, 4–6% opacity, spacing 28px)', 5),
  ('Rope & Rigging', 'rope-rigging', '#101522', '#1A2638', '#6B86A3', 'Very faint crosshatch (two diagonal line layers, 3–4% opacity)', 6),
  ('Harbor Fog', 'harbor-fog', '#0F172A', '#1F2B3B', '#9DB4C8', 'Soft fog layer (radial blur), grain 2%', 7),
  ('Storm Signal', 'storm-signal', '#0A1020', '#1A2340', '#3B5A8C', 'Faint horizontal scanlines (2–3% opacity) + tiny noise', 8),
  ('Treasure Map Glow', 'treasure-map-glow', '#101019', '#1F1B2E', '#B38A3D', 'Warm gold bloom on far right (10% opacity), grain 3%', 9),
  ('Quiet Plunder', 'quiet-plunder', '#07121A', '#102B2F', '#3A7A6A', 'Faint speckle grain + slight edge vignette', 10)
ON CONFLICT (slug) DO NOTHING;
