export function PageHero({ title, description }: { title: string; description?: string }) {
  return (
    <div className="bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-brand-dark sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-slate-600">{description}</p>}
      </div>
    </div>
  );
}
