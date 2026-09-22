import { Star } from "lucide-react";

export function StarRating({
  rating,
  reviewsCount,
}: {
  rating: number;
  reviewsCount: number;
}) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-1" aria-label={`Calificación ${rating} de 5, ${reviewsCount} reseñas`}>
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rounded ? "fill-brand-yellow text-brand-yellow" : "fill-slate-200 text-slate-200"}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">({reviewsCount})</span>
    </div>
  );
}
