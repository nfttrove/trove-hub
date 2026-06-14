/*
  # Effect Configuration Storage

  1. New Tables
    - `effect_configs`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (text) - Identifier for user's session
      - `effect_type` (text) - Current effect selection (snow, fire, confetti, candles, none)
      - `dead_zones` (jsonb) - Array of dead zone configurations
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `effect_configs` table
    - Add policy for public read/write access (no auth required for this use case)
*/

CREATE TABLE IF NOT EXISTS effect_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  effect_type text NOT NULL DEFAULT 'snow',
  dead_zones jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE effect_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read effect configs"
  ON effect_configs
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert effect configs"
  ON effect_configs
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can update their effect configs"
  ON effect_configs
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_effect_configs_user_id ON effect_configs(user_id);
