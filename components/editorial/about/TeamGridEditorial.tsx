import Image from "next/image";
import teamData from "@/content/team.json";

export default function TeamGridEditorial() {
  return (
    <section className="bg-cream py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-end mb-16 border-b-2 border-charcoal pb-6">
          <div className="chapter-marker">
            The People<b>The Practice</b>
          </div>
          <h2 className="headline-block max-w-[18ch]">
            A small, deliberate team. Specialists, not generalists.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {teamData.members.map((m) => (
            <div
              key={m.name}
              className="grid grid-cols-1 sm:grid-cols-[1fr_1.6fr] gap-6 sm:gap-8 pt-6 border-t border-charcoal"
            >
              <div className="aspect-[4/5] bg-charcoal-light overflow-hidden">
                <Image
                  src={m.photo}
                  alt={m.name}
                  width={400}
                  height={500}
                  unoptimized
                  className="w-full h-full object-cover"
                  style={{ filter: "contrast(1.04) saturate(0.92)" }}
                />
              </div>
              <div>
                <div className="text-[12px] uppercase tracking-[0.22em] text-amber-deep font-medium mb-2.5">
                  {("tag" in m ? m.tag : "") || m.role}
                </div>
                <h4 className="font-serif text-[28px] leading-tight tracking-[-0.01em] text-charcoal">
                  {m.name}
                  <small className="block font-sans text-[12px] tracking-[0.06em] text-[#6B6B6B] mt-1.5 font-normal">
                    {m.role}
                  </small>
                </h4>
                <p className="mt-3.5 text-[15px] leading-[1.7] text-body max-w-[36ch]">
                  {m.oneLiner}
                </p>
                {("phone" in m && m.phone) && (
                  <div className="mt-4 text-[13px] uppercase tracking-[0.2em] text-amber-deep font-medium">
                    {m.phone}
                  </div>
                )}
                {("email" in m && m.email) && (
                  <div className="mt-4 text-[13px] uppercase tracking-[0.2em] text-amber-deep font-medium">
                    {m.email}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
