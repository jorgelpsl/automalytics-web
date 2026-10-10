import { REVIEWS } from "@/data/reviews";

// Opinions as plain quotes. No star rating and no review structured data: a
// handful of quotes isn't an aggregate score and shouldn't be presented as one.
export function Reviews() {
  if (REVIEWS.length === 0) return null;

  return (
    <section id="opiniones" aria-labelledby="opiniones-titulo" className="section grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-4">
        <h2 id="opiniones-titulo" className="font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
          Lo que dicen quienes ya pidieron su traducción.
        </h2>
      </div>
      <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:col-span-8">
        {REVIEWS.map((review) => (
          <figure key={review.name} className="flex flex-col gap-4 border-t-2 border-ink pt-5">
            <blockquote className="font-display text-xl leading-snug text-ink">“{review.text}”</blockquote>
            <figcaption className="text-[15px] text-ink-muted">
              <span className="font-medium text-ink">{review.name}</span>
              {review.document ? ` · ${review.document}` : ""}
              {review.disclosure && <span className="mt-1 block">{review.disclosure}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
