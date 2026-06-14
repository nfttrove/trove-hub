/*
  # Add Custom Text Field

  1. Changes
    - Add `custom_text` (text) - Custom text for effects like DVD (default 'GameStop')

  2. Notes
    - Allows users to customize text in certain effects
    - Default value is 'GameStop' to maintain current behavior
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'effect_configs' AND column_name = 'custom_text'
  ) THEN
    ALTER TABLE effect_configs ADD COLUMN custom_text text DEFAULT 'GameStop';
  END IF;
END $$;