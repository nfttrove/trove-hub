/*
  # Add particle count control to effect configs

  1. Changes
    - Add `effect_particle_count` column to `effect_configs` table
      - Type: integer
      - Default: 100
      - Range: 25-200 (representing percentage)

  2. Purpose
    - Allows users to adjust particle density for performance optimization
    - 100 = normal, 25 = low (better performance), 200 = high (more particles)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'effect_configs' AND column_name = 'effect_particle_count'
  ) THEN
    ALTER TABLE effect_configs ADD COLUMN effect_particle_count integer DEFAULT 100;
  END IF;
END $$;
