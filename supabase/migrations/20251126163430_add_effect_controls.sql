/*
  # Add Effect Controls

  1. Changes
    - Add `effect_speed` (numeric) - Speed multiplier for animations (0.1 to 3.0, default 1.0)
    - Add `effect_rotation` (boolean) - Whether effects should rotate (default true)

  2. Notes
    - Users can control animation speed (slower or faster)
    - Users can toggle rotation on/off for spinning effects
    - Default values maintain current behavior
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'effect_configs' AND column_name = 'effect_speed'
  ) THEN
    ALTER TABLE effect_configs ADD COLUMN effect_speed numeric DEFAULT 1.0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'effect_configs' AND column_name = 'effect_rotation'
  ) THEN
    ALTER TABLE effect_configs ADD COLUMN effect_rotation boolean DEFAULT true;
  END IF;
END $$;
