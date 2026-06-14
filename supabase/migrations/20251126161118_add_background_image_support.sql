/*
  # Add Background Image Support

  1. Changes
    - Add `bg_image_url` (text) - URL to background image
    - Add `bg_image_opacity` (numeric) - Opacity of background image (0-100)
    - Add `bg_use_image` (boolean) - Whether to use image instead of gradient

  2. Notes
    - Users can upload an image for custom backgrounds (like fireplace, etc)
    - Image opacity allows blending with gradient colors
    - Boolean flag to switch between gradient and image mode
    - Default to gradient mode for backward compatibility
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'effect_configs' AND column_name = 'bg_image_url'
  ) THEN
    ALTER TABLE effect_configs ADD COLUMN bg_image_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'effect_configs' AND column_name = 'bg_image_opacity'
  ) THEN
    ALTER TABLE effect_configs ADD COLUMN bg_image_opacity numeric DEFAULT 100;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'effect_configs' AND column_name = 'bg_use_image'
  ) THEN
    ALTER TABLE effect_configs ADD COLUMN bg_use_image boolean DEFAULT false;
  END IF;
END $$;
