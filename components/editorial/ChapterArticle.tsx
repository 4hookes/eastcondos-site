export default function ChapterArticle() {
  return (
    <section className="surface-light gridlines-light py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
      <div
        aria-hidden
        className="meganum absolute right-6 md:right-12 -top-4 md:top-0"
      >
        02
      </div>
      <div className="relative max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-end mb-16">
          <div>
            <div className="mono-label">02 / The Approach</div>
          </div>
          <h2 className="display-section max-w-[20ch]">
            You&rsquo;ve been researching for months. You&rsquo;re{" "}
            <b>more confused</b> than when you started.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
          <aside className="md:sticky md:top-28 border-t border-charcoal pt-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.26em] text-amber-deep mb-3">
              In this chapter
            </div>
            <ul className="marginalia-list">
              <li><span>The TDSR question</span><b>01</b></li>
              <li><span>Reading your CPF</span><b>02</b></li>
              <li><span>The 4% stress test</span><b>03</b></li>
              <li><span>Two-mortgage scenarios</span><b>04</b></li>
              <li><span>When the answer is &ldquo;wait&rdquo;</span><b>05</b></li>
            </ul>
          </aside>

          <article className="prose-editorial dropcap">
            <p>
              Most families come to us already deep into a forum thread, three
              property agents, and a spreadsheet that has stopped making sense.
              They have read everything except the one document that matters:
              their own financial model, run honestly, with their actual
              numbers.
            </p>
            <p>
              So that is where we begin. Before any unit is shown. Before any
              developer is mentioned. Before &ldquo;now is a good time&rdquo; is
              allowed to enter the conversation. We pull your CPF balances,
              your TDSR, your existing loan, your timeline, and your appetite
              for risk into a single working file.
            </p>
            <p>
              Then we test it against the eleven factors that determine whether
              an upgrade actually moves a family forward, or quietly costs them
              a decade. The factors are not secret. The discipline of running
              all eleven, every time, before any conversation about a building,
              is the part most families never receive.
            </p>
            <p>
              Most do not pass the test on the first model. That is the point.
              The model is not a sales tool. It is the condition for us being
              useful to you at all.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
