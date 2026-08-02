"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The signature scroll piece: a worked example of "we run your numbers"
 * happening live. Desktop (html.motion + md): the section pins and the
 * budget assembles as you scroll — income, the bank's ceiling, the 4% test,
 * the verdict. Mobile / no-JS / reduced motion: the same four beats render
 * as a stacked ledger (.ns-stack), fully readable with zero JS.
 */
const BEATS = [
  {
    step: "01",
    label: "What you earn",
    value: 11000,
    sub: "$11,000 a month, combined. The only number most agents ever ask for. We start here — we don't stop here.",
  },
  {
    step: "02",
    label: "What the bank counts",
    value: 4750,
    sub: "The bank caps all your loan payments at 55% of income. Minus the $1,300 car loan, $4,750 a month is what's truly free for the mortgage.",
  },
  {
    step: "03",
    label: "The 4% test",
    value: 995000,
    sub: "Approved at today's rate, tested at 4%. $995,000 is the loan that still survives if rates jump.",
  },
  {
    step: "04",
    label: "The verdict",
    value: 1600000,
    sub: "Loan, plus your HDB sale money, plus CPF and cash: a $1.6M budget. Decided before any property is shown.",
  },
];

const fmt = (v: number) =>
  v >= 1e6
    ? `$${(v / 1e6).toFixed(1)}M`
    : `$${Math.round(v).toLocaleString("en-US")}`;

export default function NumbersStory() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!document.documentElement.classList.contains("motion")) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const q = gsap.utils.selector(root);
      const numEl = q(".ns-num")[0] as HTMLElement;
      const beats = q(".ns-beat") as HTMLElement[];
      const railSteps = q(".ns-rail-step") as HTMLElement[];
      const bar = q(".ns-progress")[0] as HTMLElement;
      if (!numEl || beats.length === 0) return;

      const proxy = { v: BEATS[0].value };
      numEl.textContent = fmt(proxy.v);
      gsap.set(beats, { autoAlpha: 0, y: 24 });
      gsap.set(beats[0], { autoAlpha: 1, y: 0 });

      const setActive = (i: number) =>
        railSteps.forEach((s, j) => s.classList.toggle("is-active", j === i));
      setActive(0);

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=2600",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: (st) => {
            if (bar) gsap.set(bar, { scaleY: st.progress });
            // Active rail step follows scroll in both directions
            setActive(Math.min(BEATS.length - 1, Math.floor(st.progress * BEATS.length)));
          },
        },
      });

      BEATS.forEach((b, i) => {
        if (i === 0) return;
        const at = `b${i}`;
        tl.addLabel(at)
          .to(beats[i - 1], { autoAlpha: 0, y: -22, duration: 0.45 }, at)
          .to(
            proxy,
            {
              v: b.value,
              duration: 1,
              onUpdate: () => {
                numEl.textContent = fmt(proxy.v);
              },
            },
            `${at}+=0.15`
          )
          .to(beats[i], { autoAlpha: 1, y: 0, duration: 0.55 }, `${at}+=0.5`)
          .to({}, { duration: 0.45 }); // hold before the next beat
        if (i === BEATS.length - 1) {
          // The verdict earns the accent
          tl.to(numEl, { color: "#D4A843", duration: 0.5 }, `${at}+=0.3`);
        }
      });
    });

    return () => mm.revert();
  }, []);

  const header = (
    <>
      <div className="mono-label mb-6">The Mechanic / A Worked Example</div>
      <h2
        className="font-display font-extralight text-cream tracking-[-0.035em]"
        style={{ fontSize: "clamp(2rem, 3.6vw, 3.3rem)", lineHeight: 1.04 }}
      >
        Watch a budget get built.
      </h2>
    </>
  );

  return (
    <section
      ref={root}
      className="relative bg-charcoal-deep border-t hairline overflow-hidden"
    >
      {/* ===== Desktop, motion: pinned scroll story ===== */}
      <div className="ns-pin relative min-h-screen flex-col justify-center gridlines px-6 md:px-12 py-16">
        <div className="max-w-broadsheet mx-auto w-full grid md:grid-cols-[240px_1fr] gap-16 items-center">
          {/* Rail */}
          <aside className="relative pl-7 self-center">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-cream/12" />
            <div className="ns-progress absolute left-0 top-0 bottom-0 w-px bg-amber origin-top scale-y-0" />
            <ol className="m-0 p-0 list-none flex flex-col gap-7">
              {BEATS.map((b) => (
                <li
                  key={b.step}
                  className="ns-rail-step font-mono text-[11px] uppercase tracking-[0.24em] text-cream/35 transition-colors duration-300 [&.is-active]:text-amber"
                >
                  <span className="mr-3">{b.step}</span>
                  {b.label}
                </li>
              ))}
            </ol>
          </aside>

          {/* Stage */}
          <div>
            {header}
            <div
              className="ns-num font-display font-extralight text-cream my-9"
              style={{
                fontSize: "clamp(96px, 11vw, 176px)",
                lineHeight: 0.95,
                letterSpacing: "-0.05em",
              }}
            >
              $11,000
            </div>
            <div className="relative h-[120px]">
              {BEATS.map((b) => (
                <div key={b.step} className="ns-beat absolute inset-0">
                  <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber mb-3">
                    {b.step} · {b.label}
                  </div>
                  <p className="prose-dark text-[15.5px] max-w-[54ch]">{b.sub}</p>
                </div>
              ))}
            </div>
            <div className="mono-label-dim mt-10 pt-5 border-t hairline">
              A worked example, rounded &middot; Your file is built live, with
              your numbers
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mobile / no-JS / reduced motion: stacked ledger ===== */}
      <div className="ns-stack gridlines px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-broadsheet mx-auto">
          {header}
          <div className="mt-12">
            {BEATS.map((b) => (
              <div
                key={b.step}
                data-reveal
                className="grid grid-cols-[56px_1fr] gap-5 border-t hairline py-8"
              >
                <div className="font-mono text-[12px] tracking-[0.2em] text-amber pt-2">
                  {b.step}
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-cream/55 mb-2">
                    {b.label}
                  </div>
                  <div
                    className="font-display font-extralight text-cream"
                    style={{
                      fontSize: "clamp(44px, 10vw, 64px)",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {fmt(b.value)}
                  </div>
                  <p className="prose-dark text-[14.5px] mt-3 max-w-[48ch]">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mono-label-dim mt-10 pt-5 border-t hairline">
            A worked example, rounded &middot; Your file is built live, with
            your numbers
          </div>
        </div>
      </div>
    </section>
  );
}
