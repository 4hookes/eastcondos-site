export default function Opener() {
  return (
    <section className="px-6 md:px-12 pt-12 pb-16 border-b border-charcoal bg-cream">
      <div className="max-w-broadsheet mx-auto">
        <div className="issue-line mb-6">
          The People &middot; The Practice &middot; The Principles
        </div>
        <h1
          className="font-serif text-charcoal max-w-[14ch]"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.03em",
          }}
        >
          Depth over breadth.
          <br />
          <em className="italic text-amber-deep">Trust over volume.</em>
        </h1>
      </div>
    </section>
  );
}
