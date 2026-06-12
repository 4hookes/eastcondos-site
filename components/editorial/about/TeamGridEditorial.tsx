import Image from "next/image";
import teamData from "@/content/team.json";

export default function TeamGridEditorial() {
  return (
    <section className="surface-light gridlines-light py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-end mb-16 border-b-2 border-charcoal pb-6">
          <div className="mono-label">The People / The Practice</div>
          <h2 className="display-section max-w-[20ch]">
            A small, deliberate team. <b>Specialists</b>, not generalists.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {teamData.members.map((m) => (
            <div
              key={m.name}
              className="grid grid-cols-1 sm:grid-cols-[1fr_1.6fr] gap-6 sm:gap-8 pt-6 border-t border-charcoal"
            >
              <div className="aspect-[4/5] bg-charcoal-light overflow-hidden">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name}
                    width={400}
                    height={500}
                    unoptimized
                    className="w-full h-full object-cover"
                    style={{ filter: "contrast(1.04) saturate(0.92)" }}
                  />
                ) : (
                  <div className="grain w-full h-full flex flex-col justify-between p-5">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-amber/80">
                      The Practice
                    </span>
                    <span className="font-serif text-[96px] leading-none text-cream/90">
                      {m.name.charAt(0)}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-cream/50">
                      {m.name} · EastCondos
                    </span>
                  </div>
                )}
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-deep mb-3">
                  {("tag" in m ? m.tag : "") || m.role}
                </div>
                <h4 className="font-display font-light text-[28px] leading-tight tracking-[-0.02em] text-charcoal">
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
