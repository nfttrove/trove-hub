import type { EffectType } from './EffectSelector';
import type { DeadZone } from './DeadZoneConfig';
import type { BackgroundColors, BackgroundImage } from './ColorPicker';
import type { EffectSettings } from './EffectControls';
import { buildEffectMaskImage, DEFAULT_EFFECT_AREA, type EffectArea } from '../lib/mask';
import { ParticleField } from './effects/particles/ParticleField';
import { snowProConfig, dataRainConfig, networkConfig } from './effects/particles/configs';
import { SnowEffect } from './effects/SnowEffect';
import { FireEffect } from './effects/FireEffect';
import { ConfettiEffect } from './effects/ConfettiEffect';
import { RocketsEffect } from './effects/RocketsEffect';
import { BubblesEffect } from './effects/BubblesEffect';
import { StarsEffect } from './effects/StarsEffect';
import { RainEffect } from './effects/RainEffect';
import { LeavesEffect } from './effects/LeavesEffect';
import { MatrixEffect } from './effects/MatrixEffect';
import { FirefliesEffect } from './effects/FirefliesEffect';
import { LightsEffect } from './effects/LightsEffect';
import { SantaPresentsEffect } from './effects/SantaPresentsEffect';
import { PetalsEffect } from './effects/PetalsEffect';
import { ButterfliesEffect } from './effects/ButterfliesEffect';
import { SparklesEffect } from './effects/SparklesEffect';
import { BalloonsEffect } from './effects/BalloonsEffect';
import { DandelionEffect } from './effects/DandelionEffect';
import { PirateEffect } from './effects/PirateEffect';
import { TurkeyEffect } from './effects/TurkeyEffect';
import { BrickEffect } from './effects/BrickEffect';
import { HeartsEffect } from './effects/HeartsEffect';
import { GhostsEffect } from './effects/GhostsEffect';
import { CoinsEffect } from './effects/CoinsEffect';
import { MusicNotesEffect } from './effects/MusicNotesEffect';
import { MathEffect } from './effects/MathEffect';
import { DiscoEffect } from './effects/DiscoEffect';
import { DVDEffect } from './effects/DVDEffect';
import { FlappyEffect } from './effects/FlappyEffect';

interface EffectSceneProps {
  effectTypes: EffectType[];
  deadZones: DeadZone[];
  bgColors: BackgroundColors;
  bgImage: BackgroundImage;
  effectSettings: EffectSettings;
  effectArea?: EffectArea;
  onDVDCornerHit?: () => void;
}

export function EffectScene({ effectTypes, deadZones, bgColors, bgImage, effectSettings, effectArea = DEFAULT_EFFECT_AREA, onDVDCornerHit }: EffectSceneProps) {
  const renderEffect = (effectType: EffectType) => {
    const props = { speed: effectSettings.speed, rotation: effectSettings.rotation };
    switch (effectType) {
      case 'snow':
        return <SnowEffect key="snow" {...props} />;
      case 'fire':
        return <FireEffect key="fire" {...props} />;
      case 'confetti':
        return <ConfettiEffect key="confetti" {...props} />;
      case 'rockets':
        return <RocketsEffect key="rockets" {...props} />;
      case 'bubbles':
        return <BubblesEffect key="bubbles" {...props} />;
      case 'stars':
        return <StarsEffect key="stars" {...props} />;
      case 'rain':
        return <RainEffect key="rain" {...props} />;
      case 'leaves':
        return <LeavesEffect key="leaves" {...props} />;
      case 'matrix':
        return <MatrixEffect key="matrix" {...props} />;
      case 'fireflies':
        return <FirefliesEffect key="fireflies" {...props} />;
      case 'lights':
        return <LightsEffect key="lights" {...props} />;
      case 'disco':
        return <DiscoEffect key="disco" {...props} />;
      case 'santa':
        return <SantaPresentsEffect key="santa" {...props} />;
      case 'petals':
        return <PetalsEffect key="petals" {...props} />;
      case 'butterflies':
        return <ButterfliesEffect key="butterflies" {...props} />;
      case 'sparkles':
        return <SparklesEffect key="sparkles" {...props} />;
      case 'balloons':
        return <BalloonsEffect key="balloons" {...props} />;
      case 'dandelion':
        return <DandelionEffect key="dandelion" {...props} />;
      case 'pirate':
        return <PirateEffect key="pirate" {...props} />;
      case 'turkey':
        return <TurkeyEffect key="turkey" {...props} />;
      case 'bricks':
        return <BrickEffect key="bricks" {...props} />;
      case 'hearts':
        return <HeartsEffect key="hearts" {...props} />;
      case 'ghosts':
        return <GhostsEffect key="ghosts" {...props} />;
      case 'coins':
        return <CoinsEffect key="coins" {...props} />;
      case 'music':
        return <MusicNotesEffect key="music" {...props} />;
      case 'math':
        return <MathEffect key="math" {...props} />;
      case 'dvd':
        return <DVDEffect key="dvd" {...props} customText={effectSettings.customText} onCornerHit={onDVDCornerHit} />;
      case 'flappy':
        return <FlappyEffect key="flappy" />;
      case 'snow_pro':
        return <ParticleField key="snow_pro" id="snow_pro" options={snowProConfig} />;
      case 'datarain':
        return <ParticleField key="datarain" id="datarain" options={dataRainConfig} />;
      case 'network':
        return <ParticleField key="network" id="network" options={networkConfig} />;
      default:
        return null;
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
