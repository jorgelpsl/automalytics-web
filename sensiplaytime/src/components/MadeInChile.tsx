import { ChileFlag } from "@/components/ChileFlag";
import { SensiMascot } from "@/components/SensiMascot";

function Printer3D() {
  return (
    <svg viewBox="0 0 200 170" className="h-full w-full" role="img" aria-label="Impresora 3D imprimiendo una pieza">
      <rect x="20" y="20" width="160" height="12" rx="6" fill="#173F5F" />
      <rect x="30" y="140" width="140" height="14" rx="6" fill="#173F5F" />
      <rect x="30" y="20" width="10" height="130" fill="#173F5F" />
      <rect x="160" y="20" width="10" height="130" fill="#173F5F" />
      <rect x="55" y="115" width="90" height="14" rx="4" fill="#45C7C0" />
      <rect x="90" y="35" width="10" height="70" fill="#A8E6CF" />
      <rect x="75" y="30" width="40" height="10" rx="4" fill="#FFD84D" />
      <g transform="translate(78, 90) scale(0.5)">
        <ellipse cx="55" cy="55" rx="45" ry="34" fill="#A8E6CF" />
        <path d="M18 44 C18 20 34 8 55 8 C76 8 92 20 90 42 C88 58 74 64 55 64 C36 64 18 58 18 44 Z" fill="#45C7C0" />
      </g>
    </svg>
  );
}

export function MadeInChile() {
  return (
    <div className="flex flex-col justify-between gap-5 rounded-brand bg-sky-100 p-6 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-2xl font-bold text-brand-dark">Hecho en Maipú, Chile</h3>
          <p className="mt-1 max-w-[30ch] text-sm text-brand-dark/70">
            Diseñamos, imprimimos y preparamos cada producto con dedicación.
          </p>
        </div>
        <ChileFlag className="h-6 w-9 shrink-0 rounded-sm shadow-soft" />
      </div>

      <div className="flex items-center gap-4">
        <Printer3D />
        <span className="hidden shrink-0 rounded-full bg-white px-3 py-2 text-xs font-semibold text-brand-dark shadow-soft sm:inline-flex sm:items-center sm:gap-1.5">
          <SensiMascot className="h-5 w-5" />
          Apoya emprendimientos locales
        </span>
      </div>
    </div>
  );
}
