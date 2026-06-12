export default function CenterCTA() {
  return (
    <section className="bg-charcoal-deep gridlines text-cream py-32 md:py-36 px-6 md:px-12 border-t hairline text-center">
      <div className="mono-label mb-7 justify-center flex">Ready when you are</div>
      <h3 className="display-section max-w-[22ch] mx-auto">
        The first conversation is always free, always honest,{" "}
        <b>always private.</b>
      </h3>
      <p className="mt-7 text-[17px] leading-[1.75] text-cream/65 max-w-[48ch] mx-auto">
        Book a 7-minute discovery call. We review your numbers and tell you
        exactly where you stand &mdash; no obligations, no pressure.
      </p>
      <div className="mt-12 flex flex-wrap gap-6 justify-center items-center">
        <a href="/discovery" className="btn-square">
          Book a 7-Min Discovery Call
        </a>
        <a href="/safety-meter" className="btn-square-ghost">
          Run the Safety Meter first
        </a>
      </div>
    </section>
  );
}
