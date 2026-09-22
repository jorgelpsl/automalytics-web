import { INSTAGRAM_POSTS } from "@/data/instagram";
import { SITE } from "@/data/site";
import { ToyIllustration } from "@/components/ToyIllustration";
import { InstagramIcon } from "@/components/SocialIcons";

export function InstagramFeed() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:py-16 lg:px-8">
      <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-brand-dark sm:text-3xl">
        <InstagramIcon className="h-[22px] w-[22px] text-brand-coral" />
        Síguenos en Instagram
      </h2>
      <a
        href={SITE.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-block text-sm font-semibold text-brand-turquoise hover:underline"
      >
        @sensiplaytime
      </a>

      <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
        {INSTAGRAM_POSTS.map((post) => {
          const content = (
            <div className={`${post.bgClass} flex h-full w-full items-center justify-center p-4`}>
              <ToyIllustration variant={post.illustrationVariant} className="h-full w-full" />
            </div>
          );
          return (
            <div key={post.id} className="aspect-square w-32 shrink-0 overflow-hidden rounded-2xl shadow-soft sm:w-36">
              {post.url ? (
                <a href={post.url} target="_blank" rel="noopener noreferrer" aria-label={post.caption} className="block h-full w-full">
                  {content}
                </a>
              ) : (
                <div role="img" aria-label={post.caption} className="h-full w-full">
                  {content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
