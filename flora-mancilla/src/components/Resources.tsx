import Image from "next/image";
import { RESOURCE_POSTS } from "@/data/resources";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function Resources() {
  return (
    <section id="recursos" className="bg-cream-alt">
      <div className="mx-auto max-w-6xl px-4 py-20 lg:px-8">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-wine">
            Recursos
          </span>
          <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
            Ideas para pensar antes de tu primera hora
          </h2>
          <p className="mt-4 text-ink/70">Publicaciones que comparto para desmitificar la terapia.</p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 sm:place-items-center">
          {RESOURCE_POSTS.map((post, index) => (
            <RevealOnScroll key={post.title} delayMs={index * 100}>
              <div
                className={`w-64 overflow-hidden rounded-card border border-white bg-white shadow-soft-lg transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 sm:w-72 ${
                  index % 2 === 0 ? "-rotate-2" : "rotate-2"
                }`}
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  width={469}
                  height={494}
                  className="h-auto w-full"
                />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
