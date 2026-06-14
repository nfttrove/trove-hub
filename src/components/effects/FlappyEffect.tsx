import { useEffect, useRef, useState } from 'react';

interface GameState {
  birdX: number;
  birdY: number;
  birdVelocity: number;
  horizontalVelocity: number;
  score: number;
  isPlaying: boolean;
  isGameOver: boolean;
}

interface Character {
  id: string;
  emoji?: string;
  name: string;
}

const CHARACTERS: Character[] = [
  { id: 'bird', emoji: '🐦', name: 'Bird' },
  { id: 'ghost', emoji: '👻', name: 'Ghost' },
  { id: 'rocket', emoji: '🚀', name: 'Rocket' },
  { id: 'kitty', emoji: '😻', name: 'Kitty' },
  { id: 'pirate', emoji: '🏴‍☠️', name: 'Pirate' },
  { id: 'coin', emoji: '🪙', name: 'Coin' },
];

export function FlappyEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const underlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    birdX: 100,
    birdY: 200,
    birdVelocity: 0,
    horizontalVelocity: 0,
    score: 0,
    isPlaying: false,
    isGameOver: false,
  });
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(CHARACTERS[0]);
  const [showCharacterSelect, setShowCharacterSelect] = useState(true);
  const gameStateRef = useRef(gameState);
  const animationFrameRef = useRef<number>();

  const BIRD_RADIUS = 15;
  const GRAVITY = 0.25;
  const FLAP_POWER = -10;
  const HORIZONTAL_SPEED = 50;
  const HORIZONTAL_FRICTION = 0.85;
  const SCAN_WIDTH = 3;
  const SCAN_AHEAD = 40;

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCharacterSelect(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const captureUnderlay = () => {
    // No-op: the browser cannot rasterize the live DOM (`document.body`) onto a
    // canvas — `drawImage` only accepts image/video/canvas sources, so the
    // previous implementation always threw and the underlay stayed empty. Left
    // as an explicit no-op so the collision check reads a clear canvas (no false
    // hits) without erroring every frame.
  };

  const checkCollision = (birdX: number, birdY: number): boolean => {
    const underlayCanvas = underlayCanvasRef.current;
    if (!underlayCanvas) return false;

    const ctx = underlayCanvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return false;

    try {
      const scanX = birdX + BIRD_RADIUS + SCAN_AHEAD;
      const scanY = Math.max(0, birdY - BIRD_RADIUS * 2);
      const scanHeight = BIRD_RADIUS * 4;

      const imageData = ctx.getImageData(
        scanX,
        scanY,
        SCAN_WIDTH,
        Math.min(scanHeight, window.innerHeight - scanY)
      );

      const bgThreshold = 20;
      const minAlpha = 100;

      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const a = imageData.data[i + 3];

        const brightness = (r + g + b) / 3;
        const isDark = brightness < 128;

        if (a > minAlpha && (isDark || Math.abs(r - g) > bgThreshold || Math.abs(g - b) > bgThreshold)) {
          return true;
        }
      }
    } catch (e) {
      console.warn('Collision detection error:', e);
    }

    return false;
  };

  const flap = () => {
    if (gameStateRef.current.isGameOver) {
      setGameState({
        birdX: 100,
        birdY: 200,
        birdVelocity: 0,
        horizontalVelocity: 0,
        score: 0,
        isPlaying: false,
        isGameOver: false,
      });
      setShowCharacterSelect(true);
      setTimeout(() => setShowCharacterSelect(false), 5000);
      return;
    }

    setGameState(prev => ({
      ...prev,
      birdVelocity: FLAP_POWER,
      isPlaying: true,
    }));
  };

  const moveLeft = () => {
    if (!gameStateRef.current.isPlaying) return;
    setGameState(prev => ({
      ...prev,
      horizontalVelocity: -HORIZONTAL_SPEED,
    }));
  };

  const moveRight = () => {
    if (!gameStateRef.current.isPlaying) return;
    setGameState(prev => ({
      ...prev,
      horizontalVelocity: HORIZONTAL_SPEED,
    }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const underlayCanvas = underlayCanvasRef.current;
    if (!canvas || !underlayCanvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    underlayCanvas.width = window.innerWidth;
    underlayCanvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = () => {
      const state = gameStateRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (state.isPlaying && !state.isGameOver) {
        captureUnderlay();

        const newVelocity = state.birdVelocity + GRAVITY;
        const newY = state.birdY + newVelocity;

        const newHorizontalVelocity = state.horizontalVelocity * HORIZONTAL_FRICTION;
        const newX = Math.max(BIRD_RADIUS, Math.min(canvas.width - BIRD_RADIUS, state.birdX + newHorizontalVelocity));

        if (newY < 0 || newY > window.innerHeight - BIRD_RADIUS) {
          setGameState(prev => ({ ...prev, isGameOver: true, isPlaying: false }));
        } else if (checkCollision(newX, newY)) {
          setGameState(prev => ({ ...prev, isGameOver: true, isPlaying: false }));
        } else {
          setGameState(prev => ({
            ...prev,
            birdX: newX,
            birdY: newY,
            birdVelocity: newVelocity,
            horizontalVelocity: newHorizontalVelocity,
            score: prev.score + 1.0,
          }));
        }
      }

      ctx.save();
      const verticalRotation = Math.min(Math.max(state.birdVelocity * 0.08, -0.8), 0.8);
      const horizontalTilt = Math.min(Math.max(state.horizontalVelocity * 0.015, -0.6), 0.6);
      ctx.translate(state.birdX, state.birdY);
      ctx.rotate(verticalRotation + horizontalTilt);

      ctx.font = `${BIRD_RADIUS * 2.5}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedCharacter.emoji || '🐦', 0, 0);

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        flap();
      } else if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        moveLeft();
      } else if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        moveRight();
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      underlayCanvas.width = window.innerWidth;
      underlayCanvas.height = window.innerHeight;
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedCharacter]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <canvas
        ref={underlayCanvasRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
      />

      <canvas
        ref={canvasRef}
        onClick={flap}
        tabIndex={0}
        className="absolute inset-0 pointer-events-auto cursor-pointer focus:outline-none"
      />

      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="text-white text-2xl font-bold drop-shadow-lg">
          {Math.floor(gameState.score)}
        </div>
      </div>

      {!gameState.isPlaying && showCharacterSelect && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-auto">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 shadow-xl">
            <div className="flex gap-2">
              {CHARACTERS.map((char) => (
                <button
                  key={char.id}
                  onClick={() => setSelectedCharacter(char)}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                    selectedCharacter.id === char.id
                      ? 'bg-blue-500 scale-110 shadow-lg'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  title={char.name}
                >
                  <span className="text-2xl">{char.emoji}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
