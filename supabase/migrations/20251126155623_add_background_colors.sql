/*
  # Add Background Color Configuration

  1. Changes
    - Add `bg_color_start` (text) - Starting color for gradient (hex format)
    - Add `bg_color_middle` (text) - Middle color for gradient (hex format)
    - Add `bg_color_end` (text) - Ending color for gradient (hex format)

  2. Notes
    - Default colors match the original blue gradient theme
    - Colors are stored as hex strings (e.g., '#0a1628')
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'effect_configs' AND column_name = 'bg_color_start'
  ) THEN
    ALTER TABLE effect_configs ADD COLUMN bg_color_start text DEFAULT '#0a1628';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'effect_configs' AND column_name = 'bg_color_middle'
  ) THEN
    ALTER TABLE effect_configs ADD COLUMN bg_color_middle text DEFAULT '#1a2744';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'effect_configs' AND column_name = 'bg_color_end'
  ) THEN
    ALTER TABLE effect_configs ADD COLUMN bg_color_end text DEFAULT '#2d4a6e';
  END IF;
END $$;
