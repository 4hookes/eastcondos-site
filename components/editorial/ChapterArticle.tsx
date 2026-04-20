export default function ChapterArticle() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-cream">
      <div className="max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-end mb-16">
          <div className="chapter-marker">
            Chapter 01<b>The Approach</b>
          </div>
          <h2 className="headline-section max-w-[18ch]">
            You&rsquo;ve been researching for months. You&rsquo;re more confused
            than when you started.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
          <aside className="md:sticky md:top-24 border-t border-charcoal pt-4">
            <div className="marginalia">In this chapter</div>
            <ul className="marginalia-list">
              <li><span>The TDSR question</span><b>P. 16</b></li>
              <li><span>Reading your CPF</span><b>P. 18</b></li>
              <li><span>The 4% stress test</span><b>P. 21</b></li>
              <li><span>Two-mortgage scenarios</span><b>P. 23</b></li>
              <li><span>When the answer is &ldquo;wait&rdquo;</span><b>P. 25</b></li>
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
