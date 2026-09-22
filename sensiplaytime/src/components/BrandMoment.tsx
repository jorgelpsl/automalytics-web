import { ToyIllustration } from "@/components/ToyIllustration";

export function BrandMoment() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-brand bg-brand-coral/10 p-8 text-center">
      <ToyIllustration variant="corazon" className="h-14 w-14" />
      <p className="font-heading text-2xl font-bold leading-tight text-brand-dark">
        Pequeños juguetes.
        <br />
        Grandes momentos.
      </p>
      <ToyIllustration variant="estrella" className="absolute -bottom-4 -left-4 h-16 w-16 opacity-70" />
      <ToyIllustration variant="blob" className="absolute -right-6 -top-6 h-20 w-20 opacity-60" />
    </div>
  );
}
