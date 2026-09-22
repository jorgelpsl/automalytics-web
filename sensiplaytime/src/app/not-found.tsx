import Link from "next/link";
import { SensiMascot } from "@/components/SensiMascot";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <SensiMascot className="h-28 w-28" />
      <h1 className="font-heading text-2xl font-bold text-brand-dark">Sensi no encontró esta página</h1>
      <p className="text-slate-600">Puede que el enlace esté roto o la página se haya movido.</p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
