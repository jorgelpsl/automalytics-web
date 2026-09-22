// Sensi, the brand's turtle mascot — a single hand-drawn SVG reused at every
// size the brand needs her (nav logo, footer, hero illustration, the "why
// us" speech-bubble scene) instead of separate raster assets per spot.
export function SensiMascot({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 190"
      className={className}
      role="img"
      aria-label="Sensi, la tortuga mascota de SensiPlayTime"
    >
      {/* tail */}
      <ellipse cx="172" cy="140" rx="10" ry="7" fill="#A8E6CF" />
      {/* back legs */}
      <ellipse cx="55" cy="165" rx="16" ry="12" fill="#A8E6CF" />
      <ellipse cx="150" cy="165" rx="16" ry="12" fill="#A8E6CF" />
      {/* shell */}
      <path
        d="M40 130 C40 70 70 35 115 35 C160 35 185 70 180 118 C177 148 150 160 112 160 C75 160 40 158 40 130 Z"
        fill="#45C7C0"
      />
      <g stroke="#173F5F" strokeOpacity="0.22" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M75 60 L60 95" />
        <path d="M115 45 L112 88" />
        <path d="M150 62 L160 96" />
        <path d="M60 95 L82 128" />
        <path d="M112 88 L112 132" />
        <path d="M160 96 L138 128" />
        <path d="M82 128 L145 128" />
      </g>
      <ellipse cx="80" cy="58" rx="26" ry="14" fill="#ffffff" opacity="0.12" />
      {/* front legs */}
      <ellipse cx="48" cy="150" rx="17" ry="13" fill="#A8E6CF" />
      <ellipse cx="158" cy="150" rx="17" ry="13" fill="#A8E6CF" />
      {/* head */}
      <circle cx="52" cy="90" r="34" fill="#A8E6CF" />
      {/* cheeks */}
      <circle cx="36" cy="102" r="6" fill="#FF6B7A" opacity="0.35" />
      <circle cx="60" cy="106" r="6" fill="#FF6B7A" opacity="0.35" />
      {/* eyes */}
      <circle cx="40" cy="84" r="8" fill="#173F5F" />
      <circle cx="62" cy="82" r="9" fill="#173F5F" />
      <circle cx="42.5" cy="81" r="2.4" fill="#ffffff" />
      <circle cx="64.5" cy="79" r="2.6" fill="#ffffff" />
      {/* smile */}
      <path d="M44 100 Q52 108 62 99" stroke="#173F5F" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
