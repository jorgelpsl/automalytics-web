import { REVIEWS, type Review } from "@/data/reviews";

// "Rebeca C." → "RC": the avatar only carries the initials the customer chose to show.
function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <li className="flex w-[84%] shrink-0 snap-center md:w-auto">
      <figure className="flex w-full flex-col rounded-card border border-line bg-paper-sheet p-6">
        <span
          aria-hidden="true"
          className="block h-7 font-display text-6xl leading-[0.9] text-marker"
        >
          “
        </span>
        <blockquote className="mt-2 flex-1 text-[17px] leading-relaxed text-ink-soft">
          {review.text}
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-marker-soft text-sm font-medium text-ink"
          >
            {initials(review.name)}
          </span>
          <span className="text-[15px] leading-snug">
            <span className="block font-medium text-ink">{review.name}</span>
            <span className="block text-ink-muted">
              Cliente de Certa{review.document ? ` · ${review.document}` : ""}
            </span>
            {review.disclosure && (
              <span className="block text-ink-muted">{review.disclosure}</span>
            )}
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

// Opinions as plain quotes. No star rating and no review structured data: a
// handful of quotes isn't an aggregate score and shouldn't be presented as one.
// On phones the cards slide sideways, so four of them don't stack into a wall.
export function Reviews() {
  if (REVIEWS.length === 0) return null;

  return (
    <section
      id="opiniones"
      aria-labelledby="opiniones-titulo"
      className="border-t border-line"
    >
      <div className="section grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-3 lg:col-span-4">
          <h2
            id="opiniones-titulo"
            className="font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl"
          >
            Lo que dicen quienes ya pidieron su traducción.
          </h2>
          <p className="text-sm text-ink-muted md:hidden" aria-hidden="true">
            Desliza para ver más →
          </p>
        </div>
        <div className="-mx-4 min-w-0 sm:-mx-6 md:mx-0 lg:col-span-8">
          <ul
            role="list"
            tabIndex={0}
            aria-label="Opiniones de clientes"
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0"
          >
            {REVIEWS.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
