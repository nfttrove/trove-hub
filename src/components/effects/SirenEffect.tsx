/**
 * Transient warrant siren — fired on a warrant-vol spike. A pulsing red wash
 * plus a sweeping beacon band. The lore moment the audience learns to watch for.
 */
export function SirenEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Pulsing red wash, brightest at the edges so the data stays readable */}
      <div
        className="absolute inset-0 animate-siren-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(220,38,38,0) 45%, rgba(220,38,38,0.85) 100%)',
        }}
      />
      {/* Sweeping beacon */}
      <div
        className="absolute inset-y-0 w-1/4 animate-siren-sweep"
        style={{
          background:
            'linear-gradient(90deg, rgba(248,113,113,0) 0%, rgba(248,113,113,0.35) 50%, rgba(248,113,113,0) 100%)',
        }}
      />
    </div>
  );
}
