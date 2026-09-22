import type { IllustrationVariant } from "@/types";

// Flat, hand-drawn stand-ins for real product photography — every product,
// category and Instagram tile points at one of these instead of a stock
// photo or an invented image URL. Swapping in real photos later just means
// changing the tile's `kind` and adding a `src`.
function Tablero() {
  const dots = [
    ["#A8E6CF", "#FFD84D", "#A8E6CF"],
    ["#FFD84D", "#B9A7F5", "#FFD84D"],
    ["#A8E6CF", "#FFD84D", "#A8E6CF"],
  ];
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <rect x="30" y="30" width="140" height="140" rx="22" fill="#FF6B7A" />
      {dots.map((row, ri) =>
        row.map((color, ci) => (
          <circle key={`${ri}-${ci}`} cx={65 + ci * 35} cy={65 + ri * 35} r="13" fill={color} />
        )),
      )}
    </svg>
  );
}

function Gear({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const teeth = 8;
  const points: string[] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const angle = (Math.PI * i) / teeth;
    const radius = i % 2 === 0 ? r : r * 0.78;
    points.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`);
  }
  return (
    <g>
      <polygon points={points.join(" ")} fill={fill} />
      <circle cx={cx} cy={cy} r={r * 0.36} fill="#FFF9EF" />
    </g>
  );
}

function Engranajes() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <Gear cx={75} cy={80} r={42} fill="#B9A7F5" />
      <Gear cx={135} cy={120} r={34} fill="#45C7C0" />
      <Gear cx={90} cy={150} r={24} fill="#FFD84D" />
    </svg>
  );
}

function Cadena() {
  const links = [
    [60, 60],
    [110, 50],
    [150, 90],
    [140, 140],
    [90, 155],
    [55, 115],
  ];
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      {links.map(([cx, cy], i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx="26"
          ry="18"
          fill="none"
          stroke={i % 2 === 0 ? "#45C7C0" : "#A8E6CF"}
          strokeWidth="12"
          transform={`rotate(${i * 35}, ${cx}, ${cy})`}
        />
      ))}
    </svg>
  );
}

function Cubo() {
  const cells: string[] = [];
  for (let i = 0; i < 9; i++) cells.push(i % 2 === 0 ? "#173F5F" : "#45C7C0");
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <rect x="35" y="35" width="130" height="130" rx="18" fill="#FFF9EF" />
      {cells.map((fill, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        return (
          <rect
            key={i}
            x={45 + col * 40}
            y={45 + row * 40}
            width="32"
            height="32"
            rx="6"
            fill={fill}
          />
        );
      })}
    </svg>
  );
}

function Blob() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <path
        d="M100 40 C140 40 165 65 168 100 C171 135 145 165 105 168 C65 171 35 145 33 108 C31 71 60 40 100 40 Z"
        fill="#FFD84D"
      />
      <circle cx="80" cy="95" r="7" fill="#173F5F" />
      <circle cx="118" cy="93" r="7" fill="#173F5F" />
      <path d="M82 118 Q100 132 116 116" stroke="#173F5F" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Llavero() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <circle cx="100" cy="34" r="20" fill="none" stroke="#173F5F" strokeWidth="10" />
      <rect x="38" y="58" width="124" height="128" rx="28" fill="#B9A7F5" />
      <rect x="60" y="108" width="80" height="16" rx="8" fill="#FFF9EF" />
      <path
        d="M132 148 C132 140 139 136 145 136 C150 136 155 140 155 146 C155 154 145 163 132 172 C119 163 109 154 109 146 C109 140 114 136 119 136 C125 136 132 140 132 148 Z"
        fill="#FF6B7A"
      />
    </svg>
  );
}

function Estrella() {
  function starPoints(cx: number, cy: number, outerR: number, innerR: number) {
    const points: string[] = [];
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI / 5) * i - Math.PI / 2;
      const r = i % 2 === 0 ? outerR : innerR;
      points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    }
    return points.join(" ");
  }
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <polygon points={starPoints(100, 105, 72, 32)} fill="none" stroke="#45C7C0" strokeWidth="8" strokeLinejoin="round" />
      <polygon points={starPoints(100, 105, 52, 22)} fill="#FFD84D" />
    </svg>
  );
}

function Corazon() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <path
        d="M100 158 C60 128 34 104 34 74 C34 52 51 38 70 38 C84 38 95 46 100 58 C105 46 116 38 130 38 C149 38 166 52 166 74 C166 104 140 128 100 158 Z"
        fill="#FF6B7A"
      />
      <circle cx="150" cy="55" r="6" fill="#FFD84D" />
      <circle cx="45" cy="90" r="4" fill="#A8E6CF" />
    </svg>
  );
}

const VARIANTS: Record<IllustrationVariant, () => React.JSX.Element> = {
  tablero: Tablero,
  engranajes: Engranajes,
  cadena: Cadena,
  cubo: Cubo,
  blob: Blob,
  llavero: Llavero,
  estrella: Estrella,
  corazon: Corazon,
};

export function ToyIllustration({
  variant,
  className = "",
}: {
  variant: IllustrationVariant;
  className?: string;
}) {
  const Illustration = VARIANTS[variant];
  return (
    <div className={className}>
      <Illustration />
    </div>
  );
}
