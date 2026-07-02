import type { EffectType } from './EffectSelector';
import type { DeadZone } from './DeadZoneConfig';
import type { BackgroundColors, BackgroundImage } from './ColorPicker';
import type { EffectSettings } from './EffectControls';
import { DiscoEffect } from './effects/DiscoEffect';
import { SearchlightsEffect } from './effects/SearchlightsEffect';
import { buildEffectMaskImage, DEFAULT_EFFECT_AREA, type EffectArea } from '../lib/mask';

interface EffectSceneProps {
  effectTypes: EffectType[];
  deadZones: DeadZone[];
  bgColors: BackgroundColors;
  bgImage: BackgroundImage;
  effectSettings: EffectSettings;
  effectArea?: EffectArea;
}

export function EffectScene({ effectTypes, deadZones, bgColors, bgImage, effectSettings, effectArea = DEFAULT_EFFECT_AREA }: EffectSceneProps) {
  const renderEffect = (effectType: EffectType) => {
    const props = { speed: effectSettings.speed, rotation: effectSettings.rotation };
    switch (effectType) {
      case 'disco': return <DiscoEffect key="disco" {...props} />;
      case 'searchlights': return <SearchlightsEffect key="searchlights" {...props} />;
      default: return null;
    }
  };

  const effectMaskImage = buildEffectMaskImage(effectArea, deadZones);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: bgColors.start, stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: bgColors.middle, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: bgColors.end, stopOpacity: 1 }} />
          </linearGradient>
          <pattern id="bgImagePattern" x="0" y="0" width="1920" height="1080" patternUnits="userSpaceOnUse">
            <image
              href={bgImage.url}
              x="0"
              y="0"
              width="1920"
              height="1080"
              preserveAspectRatio="xMidYMid slice"
              opacity={bgImage.opacity / 100}
            />
          </pattern>
          <mask id="contentMask">
            <rect width="1920" height="1080" fill="white" />
            {deadZones.map((zone) => (
              <rect
                key={zone.id}
                x={`${zone.x}%`}
                y={`${zone.y}%`}
                width={`${zone.width}%`}
                height={`${zone.height}%`}
                rx="20"
                fill="black"
              />
            ))}
          </mask>
        </defs>
        <rect
          width="1920"
          height="1080"
          fill={bgImage.useImage && bgImage.url ? "url(#bgImagePattern)" : "url(#bgGradient)"}
          mask="url(#contentMask)"
        />
      </svg>

      <div
        className="absolute inset-0 pointer-events-none"
        style={effectMaskImage ? {
          WebkitMaskImage: effectMaskImage,
          maskImage: effectMaskImage,
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        } : undefined}
      >
        {effectTypes.map(effectType => renderEffect(effectType))}
      </div>
    </div>
  );
}
