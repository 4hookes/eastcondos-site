/**
 * The door (North Star §1): you now know how hard flaw-finding is.
 * Don't spend 100 hours on it. In 7 minutes, Elfi names the 3 East
 * condos that pass his test for your budget.
 */
const SOLO = [
  "Floor plans for every unit type",
  "Site plans, to see which way each stack faces",
  "Every past sale, stack by stack",
  "What is for sale right now, and at what price",
];

export default function FitCheckOffer() {
  return (
    <section
      id="fit-check"
      className="surface-light gridlines-light py-24 md:py-32 px-6 md:px-12 relative overflow-hidden"
    >
      <div aria-hidden className="meganum absolute right-6 md:right-12 -top-2 md:top-2">
        03
      </div>
      <div className="relative max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-20 items-end border-b hairline pb-8 mb-14">
          <div className="mono-label">03 / The Fit-Check</div>
          <h2 className="display-section max-w-[17ch]">
            Doing this yourself takes about <em>100 hours</em>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-l border-t hairline">
          <div data-reveal className="p-8 md:p-12 border-r border-b hairline">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-gray-600">
              On your own
            </div>
            <div className="mt-4 font-display font-extralight text-[64px] md:text-[80px] leading-none tracking-[-0.05em] text-charcoal/40">
              ~100 hrs
            </div>
            <p className="prose-dark mt-6 max-w-[38ch]">
              For every condo on your list, you need:
            </p>
            <ul className="mt-4 space-y-3">
              {SOLO.map((s) => (
                <li key={s} className="flex gap-3 text-[15.5px] leading-[1.6] text-body">
                  <span aria-hidden className="mt-[0.7em] w-3 h-px bg-charcoal/40 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="p-8 md:p-12 border-r border-b hairline bg-charcoal-deep">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">
              With me
            </div>
            <div className="mt-4 font-display font-extralight text-[64px] md:text-[80px] leading-none tracking-[-0.05em] text-cream">
              7 min
            </div>
            <p className="mt-6 text-[17px] leading-[1.7] text-cream/80 max-w-[38ch]">
              Tell me your budget and what your family needs. I tell you which{" "}
              <b className="font-serif italic font-normal text-amber text-[19px]">
                3 East condos
              </b>{" "}
              pass my test, and which ones to skip.
            </p>
            <p className="mt-4 text-[15px] leading-[1.7] text-cream/60 max-w-[38ch]">
              No pitch. If none of them pass, I&rsquo;ll tell you to wait.
            </p>
            <a href="/discovery" className="btn-square mt-9">
              Book my 7-min Fit-Check
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
