import EcIcon, { type EcIconName } from "@/components/EcIcon";

const CHAPTERS: {
  no: string;
  tag: string;
  icon: EcIconName;
  title: string;
  body: string;
  href: string;
}[] = [
  {
    no: "02",
    tag: "Method",
    icon: "chart-up",
    title: "The financial model, before everything.",
    body: "Your loan limits, your CPF, your stress test — worked out honestly, before any property is shown.",
    href: "/process",
  },
  {
    no: "03",
    tag: "Report",
    icon: "magnifier",
    title: "The seven-key property report.",
    body: "Every place on your shortlist checked against ten-plus recent sales nearby.",
    href: "/process#method",
  },
  {
    no: "04",
    tag: "X-Ray",
    icon: "balance-scale",
    title: "The eleven-factor x-ray.",
    body: "What you pay to get in, and who can afford to buy it from you next, carry most of the weight.",
    href: "/about",
  },
  {
    no: "05",
    tag: "Stories",
    icon: "handshake",
    title: "Stories from 500 families.",
    body: "Names changed, numbers real. Including the times the maths said wait — and we waited.",
    href: "/case-studies",
  },
];

export default function IndexRibbon() {
  return (
    <section className="bg-charcoal-deep gridlines border-t hairline">
      <div className="max-w-broadsheet mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {CHAPTERS.map((c, i) => (
            <a
              key={c.no}
              href={c.href}
              className={`group block py-12 md:py-14 md:pr-10 ${
                i > 0 ? "md:pl-10 md:border-l hairline border-t md:border-t-0" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-mono text-[11px] uppercase tracking-[0.26em] text-amber">
                  {c.no} / {c.tag}
                </div>
                <EcIcon
                  name={c.icon}
                  variant="light"
                  size={34}
                  className="opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="display-block mt-5 group-hover:text-amber transition-colors duration-200">
                {c.title}
              </div>
              <p className="prose-dark text-[14.5px] mt-4 max-w-[30ch]">
                {c.body}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
