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
      className="surface-light py-24 md:py-28 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="relative max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end mb-14">
          <div className="md:col-span-2">
            <h2 className="display-section max-w-[18ch]">
              Doing this yourself takes 100 hours.
            </h2>
          </div>
          <p className="prose-dark">
            In a 7-minute Fit-Check, our team runs that filter across the East
            for your budget and family size.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
          <div data-reveal className="bg-paper p-8 md:p-10 flex flex-col justify-between">
            <div>
              <h3 className="display-block text-charcoal">
                ~100 hrs on your own
              </h3>
              <p className="prose-dark mt-5">
                For every condo on your shortlist, you need to pull:
              </p>
              <ul className="mt-4 space-y-3">
                {SOLO.map((s) => (
                  <li key={s} className="text-[16px] leading-[1.6] text-body">
                    &middot; {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div data-reveal className="md:col-span-2 p-8 md:p-10 bg-charcoal-deep flex flex-col justify-between">
            <div>
              <h3 className="display-block text-cream">
                7 minutes with our team
              </h3>
              <p className="mt-5 text-[18px] leading-[1.65] text-cream max-w-[46ch]">
                Tell us your budget and what your family needs. We tell you
                which 3 East condos pass our test, and which ones to skip.
              </p>
              <p className="mt-4 text-[16px] leading-[1.65] text-cream/85 max-w-[46ch]">
                No pitch. If none of them pass right now, we will tell you to
                wait.
              </p>
            </div>
            <div className="mt-8">
              <a href="/discovery" className="btn-square">
                Book a 7-min Fit-Check
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
