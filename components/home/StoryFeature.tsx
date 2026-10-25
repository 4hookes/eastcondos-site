import Image from "next/image";
import story from "@/content/case-studies/the-scarcity-tax.json";

export default function StoryFeature() {
  const stats = story.headlineStats.slice(0, 3);

  return (
    <section className="surface-light py-24 md:py-28 px-6 md:px-12 relative overflow-hidden">
      <div className="relative max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end mb-14">
          <div className="md:col-span-2">
            <h2 className="display-section max-w-[18ch]">
              Sometimes the best advice is to wait.
            </h2>
          </div>
          <p className="prose-dark">
            Case study: {story.clients.names} in Tampines.
          </p>
        </div>

        <a
          href={`/case-studies/${story.slug}`}
          className="group grid grid-cols-1 md:grid-cols-3 gap-10 items-center"
        >
          <div data-clip-reveal className="relative aspect-[4/3] overflow-hidden bg-paper">
            <Image
              src={story.coverImage}
              alt={story.clients.portraitCaption}
              fill
              sizes="(min-width: 768px) 33vw, 90vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <div className="md:col-span-2">
            <p className="font-serif text-[24px] leading-[1.25] tracking-[-0.015em] text-charcoal group-hover:text-amber-deep transition-colors max-w-[36ch]">
              {story.title}
            </p>
            <p className="prose-dark mt-4 max-w-[54ch]">{story.subtitle}</p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-[24px] leading-tight tracking-[-0.015em] text-charcoal">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-[14px] leading-[1.45] text-body">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <span className="mt-8 inline-block font-sans text-[16px] font-medium text-charcoal group-hover:text-amber-deep transition-colors">
              Read their story &rarr;
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
