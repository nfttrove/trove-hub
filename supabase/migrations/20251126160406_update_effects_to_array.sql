/*
  # Update Effects to Support Multiple Selections

  1. Changes
    - Add `effect_types` (jsonb) - Array of selected effects
    - Keep `effect_type` for backward compatibility, but it will be deprecated

  2. Notes
    - New field stores array of effect types (e.g., ['snow', 'lights', 'santa'])
    - Default empty array means no effects
    - Allows users to layer multiple effects simultaneously
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'effect_configs' AND column_name = 'effect_types'
  ) THEN
    ALTER TABLE effect_configs ADD COLUMN effect_types jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;
