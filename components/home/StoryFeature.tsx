import Image from "next/image";
import story from "@/content/case-studies/the-scarcity-tax.json";

/**
 * One real East-condo story as proof the method works in practice.
 * Reads the published case study, so the homepage never drifts from it.
 */
export default function StoryFeature() {
  const stats = story.headlineStats.slice(0, 3);

  return (
    <section className="surface-light gridlines-light py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
      <div aria-hidden className="meganum absolute right-6 md:right-12 -top-2 md:top-2">
        05
      </div>
      <div className="relative max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-20 items-end border-b hairline pb-8 mb-14">
          <div className="mono-label">05 / A real one</div>
          <h2 className="display-section max-w-[18ch]">
            Sometimes the best advice is <em>wait</em>.
          </h2>
        </div>

        <a
          href={`/case-studies/${story.slug}`}
          className="group grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center"
        >
          <div data-clip-reveal className="relative aspect-[4/3] overflow-hidden bg-charcoal-light">
            <Image
              src={story.coverImage}
              alt={story.clients.portraitCaption}
              fill
              sizes="(min-width: 768px) 50vw, 90vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">
              {story.clients.names} &middot; Tampines
            </div>
            <h3 className="display-block mt-4 max-w-[22ch] group-hover:text-amber-deep transition-colors">
              {story.title}
            </h3>
            <p className="prose-dark mt-5 max-w-[46ch]">{story.subtitle}</p>
            <div className="mt-8 grid grid-cols-3 border-l border-t hairline">
              {stats.map((s) => (
                <div key={s.label} className="px-4 py-4 border-r border-b hairline">
                  <div className="font-display font-light text-[22px] leading-none tracking-[-0.02em] text-charcoal">
                    {s.value}
                  </div>
                  <div className="mt-2 text-[12px] leading-[1.4] text-gray-600">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <span className="mt-8 inline-block font-mono text-[12px] uppercase tracking-[0.2em] text-charcoal border-b border-amber pb-1.5">
              Read their story &rarr;
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
