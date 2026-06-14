import { useState, useEffect } from 'react';
import { EffectScene } from './components/EffectScene';
import { EffectSelector } from './components/EffectSelector';
import { DeadZoneConfig } from './components/DeadZoneConfig';
import { ColorPicker } from './components/ColorPicker';
import { EffectControls } from './components/EffectControls';
import { PresetSelector } from './components/PresetSelector';
import { ReactiveEffects } from './components/ReactiveEffects';
import { ControlRoom } from './components/ControlRoom';
import { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { loadEmojiShape } from '@tsparticles/shape-emoji';
import type { Engine } from '@tsparticles/engine';
import { useEffectConfig } from './hooks/useEffectConfig';
import { useMarketDirection, gradientForDirection } from './lib/marketStatus';

const initParticles = async (engine: Engine) => {
  await loadSlim(engine);
  await loadEmojiShape(engine);
};

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showEffectControls, setShowEffectControls] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [showControlRoom, setShowControlRoom] = useState(false);
  const [menuVisible, setMenuVisible] = useState(true);
  const [celebrationConfetti, setCelebrationConfetti] = useState(false);
  const { effectTypes, deadZones, bgColors, bgImage, effectSettings, effectArea, tickerColor, loading, updateEffectTypes, updateDeadZones, updateBgColors, updateBgImage, updateEffectSettings, updateEffectArea, updateTickerColor } = useEffectConfig();

  const direction = useMarketDirection(tickerColor);
  const effectiveBgColors = tickerColor ? gradientForDirection(direction, bgColors) : bgColors;

  const handleDVDCornerHit = () => {
    setCelebrationConfetti(true);
    setTimeout(() => {
      setCelebrationConfetti(false);
    }, 20000);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key.toLowerCase() === 'h') {
        setMenuVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const activeEffects = [...effectTypes, ...(celebrationConfetti ? ['confetti' as const] : [])];

  return (
    <ParticlesProvider init={initParticles}>
      <EffectScene
        effectTypes={activeEffects}
        deadZones={deadZones}
        bgColors={effectiveBgColors}
        bgImage={bgImage}
        effectSettings={effectSettings}
        effectArea={effectArea}
        onDVDCornerHit={handleDVDCornerHit}
      />
      <ReactiveEffects />
      <EffectSelector
        selectedEffects={effectTypes}
        onEffectsChange={updateEffectTypes}
        onOpenSettings={() => setShowSettings(true)}
        onOpenColorPicker={() => setShowColorPicker(true)}
        onOpenEffectControls={() => setShowEffectControls(true)}
        onOpenPresets={() => setShowPresets(true)}
        onOpenControlRoom={() => setShowControlRoom(true)}
        visible={menuVisible}
        onToggleVisible={() => setMenuVisible(!menuVisible)}
      />
      {showSettings && (
        <DeadZoneConfig
          deadZones={deadZones}
          onDeadZonesChange={updateDeadZones}
          effectArea={effectArea}
          onEffectAreaChange={updateEffectArea}
          onClose={() => setShowSettings(false)}
        />
      )}
      {showColorPicker && (
        <ColorPicker
          colors={bgColors}
          bgImage={bgImage}
          tickerColor={tickerColor}
          onColorsChange={updateBgColors}
          onBgImageChange={updateBgImage}
          onTickerColorChange={updateTickerColor}
          onClose={() => setShowColorPicker(false)}
        />
      )}
      {showEffectControls && (
        <EffectControls
          settings={effectSettings}
          onSettingsChange={updateEffectSettings}
          onClose={() => setShowEffectControls(false)}
        />
      )}
      {showPresets && (
        <PresetSelector
          onApplyPreset={(effects, colors) => {
            updateEffectTypes(effects);
            updateBgColors(colors);
          }}
          currentEffects={effectTypes}
          currentColors={bgColors}
          onClose={() => setShowPresets(false)}
        />
      )}
      {showControlRoom && (
        <ControlRoom onClose={() => setShowControlRoom(false)} />
      )}
    </ParticlesProvider>
  );
}

export default App;
