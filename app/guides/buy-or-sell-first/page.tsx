import type { Metadata } from "next";
import Link from "next/link";
import LastUpdated from "@/components/editorial/LastUpdated";

const PUBLISH_DATE = "2026-04-25";
const LAST_UPDATED = "2026-04-25";
const CANONICAL = "https://eastcondos.sg/guides/buy-or-sell-first";

const faqs: Array<{ question: string; answer: string }> = [
  {
    question:
      "Do I need to sell my HDB before I buy a condo in Singapore?",
    answer:
      "Not necessarily — but for most Singapore Citizen upgraders, sell-first is the cleaner sequence. The pivot is not the HDB sale completion, it's the moment your HDB buyer exercises the OTP. Once that happens (typically 14–21 days after you issue the option), IRAS no longer counts you as an HDB owner for ABSD purposes. You can then OTP a private condo immediately and pay 0% ABSD as a Singapore Citizen buying your first additional property. Buy-first is a fallback structure, used only when a specific private unit can't wait.",
  },
  {
    question:
      "What is 'OTP exercise' and why does it matter for ABSD timing?",
    answer:
      "An Option to Purchase (OTP) goes through two stages. Stage one: you issue the OTP and your buyer pays a 1% option fee — at this point the buyer can still walk away and forfeit the 1%. Stage two: the buyer exercises the OTP, paying another 4% (5% total for private) or a small fee for HDB, which creates a legally binding sale contract. IRAS treats your HDB as effectively disposed at the exercise moment, not at completion. This is the trigger that stops the ABSD clock — and it's the reason the old advice 'wait until HDB completion' is outdated.",
  },
  {
    question:
      "How long does an HDB resale actually take from OTP to completion?",
    answer:
      "Roughly 16 weeks total. The buyer has 21 days from OTP issue to exercise (commonly done within 2–3 weeks). After exercise, the resale is submitted to HDB via the OneRoad Portal. HDB takes ~4 weeks to accept and inspect, then ~8 more weeks to a completion appointment. The important point for upgraders: ABSD treatment changes at week ~3 (exercise), but cash and CPF are only released at completion (~week 16). That mismatch is why bridging finance often still matters even when sequencing is correct.",
  },
  {
    question:
      "What is the ABSD 6-month remission rule and when do I actually use it?",
    answer:
      "If you buy a private condo before securing an HDB buyer, you pay Additional Buyer's Stamp Duty (ABSD) up front — currently 20% for a Singapore Citizen's second property. You can claim that ABSD back if your HDB sells within 6 months of the private purchase (or, for new launches, within 6 months of TOP, subject to conditions). This is a real mechanism but it's a fallback, not a default. The right time to use it is when the specific private unit you want is genuinely unrepeatable and your HDB sale process hasn't started. For most upgraders, the sell-first sequence avoids the cash flow shock entirely.",
  },
  {
    question:
      "Do I still need a bridging loan if I sell my HDB first?",
    answer:
      "Often, yes. Even though sell-first removes the ABSD cash burden, your CPF and HDB sale proceeds only release at HDB legal completion — typically around week 16 from OTP. Your private condo's downpayment is due much earlier (5% on OTP exercise, 15% within 8 weeks). A bridging loan covers that gap, secured against your expected HDB proceeds. Banks usually require evidence of an exercised HDB OTP before approving the bridge — which is another reason to wait for exercise (not just OTP issuance) before signing your private condo's S&P.",
  },
  {
    question:
      "What happens if my HDB buyer walks away after issuing the OTP?",
    answer:
      "Before exercise, the buyer can simply forfeit the 1% option fee and disappear — the contract is not binding yet. After exercise, the contract is binding and the buyer is legally on the hook for the full purchase. This is exactly why the safe practitioner posture is: wait for the exercised OTP before signing your next property's S&P. The exercised OTP is your legal certainty. The unexercised OTP is just a soft handshake.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL("https://eastcondos.sg"),
  title:
    "Buy first or sell first? The HDB-to-condo sequencing guide for Singapore upgraders",
  description:
    "The definitive 2026 guide to ABSD timing for Singapore HDB upgraders. Why 'OTP exercised' — not 'completion' — is the trigger that matters, when sell-first is right, and when to use the 6-month ABSD remission fallback.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title:
      "Buy first or sell first? The HDB-to-condo sequencing guide for Singapore upgraders",
    description:
      "The 2026 playbook for Singapore HDB upgraders deciding whether to buy or sell first. ABSD timing, OTP exercise mechanics, bridging, and when each sequence is actually right.",
    type: "article",
    url: CANONICAL,
    publishedTime: PUBLISH_DATE,
    modifiedTime: LAST_UPDATED,
    authors: ["Elfi Abdullah"],
  },
  other: {
    "article:modified_time": LAST_UPDATED,
  },
};

export default function BuyOrSellFirstGuidePage() {
  const articleSchema = {
    "@type": "Article",
    headline:
      "Buy first or sell first? The HDB-to-condo sequencing guide for Singapore upgraders",
    description:
      "The definitive 2026 guide to ABSD timing for Singapore HDB upgraders deciding the buy-first vs sell-first sequence.",
    url: CANONICAL,
    datePublished: PUBLISH_DATE,
    dateModified: LAST_UPDATED,
    author: {
      "@type": "Person",
      name: "Elfi Abdullah",
      url: "https://eastcondos.sg/about",
    },
    publisher: {
      "@type": "Organization",
      name: "EastCondos.sg",
      url: "https://eastcondos.sg",
    },
    mainEntityOfPage: CANONICAL,
    about: [
      { "@type": "Thing", name: "HDB to condo upgrade sequencing" },
      { "@type": "Thing", name: "Additional Buyer's Stamp Duty (ABSD) timing" },
      { "@type": "Thing", name: "Singapore property OTP mechanics" },
    ],
  };

  const faqSchema = {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://eastcondos.sg" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://eastcondos.sg/guides" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Buy First or Sell First — HDB to Condo Sequencing",
        item: CANONICAL,
      },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [articleSchema, faqSchema, breadcrumbSchema],
  };

  return (
    <div className="bg-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ========== MASTHEAD ========== */}
      <section className="border-b border-charcoal max-w-broadsheet mx-auto px-5 sm:px-10 py-12 sm:py-20">
        <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
          <span className="w-5 sm:w-8 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep font-medium">
            The Guide · Sequencing · 2026
          </span>
        </div>

        <h1
          className="font-serif text-charcoal mb-5 sm:mb-7"
          style={{
            fontSize: "clamp(2.1rem, 5.2vw, 4rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.028em",
            maxWidth: "22ch",
          }}
        >
          Buy first or <em className="italic text-amber-deep">sell</em> first?
        </h1>

        <p
          className="font-serif italic text-charcoal text-[18px] sm:text-[22px] leading-snug mb-8 sm:mb-10"
          style={{ maxWidth: "52ch" }}
        >
          A practitioner&rsquo;s walkthrough of the single most expensive timing decision
          in any HDB-to-condo upgrade. Why the trigger isn&rsquo;t completion — and why
          the wrong sequence costs five-figure sums.
        </p>

        <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-2 pt-5 border-t border-dotted border-[#c9bfa3] text-[12px] sm:text-[13px] text-gray-600">
          <span className="font-serif text-charcoal">
            By <span className="font-medium">Elfi Abdullah</span>
          </span>
          <span className="hidden sm:inline text-amber-deep">·</span>
          <span className="italic font-serif">
            Founder · Division Director, ERA Singapore
          </span>
          <span className="hidden sm:inline text-amber-deep">·</span>
          <LastUpdated date={LAST_UPDATED} />
        </div>
      </section>

      <main className="max-w-broadsheet mx-auto px-5 sm:px-10 py-12 sm:py-20">
        <article className="max-w-[72ch] mx-auto">
          {/* ========== TL;DR ========== */}
          <aside className="mb-12 sm:mb-16 border-l-[3px] border-amber bg-paper p-6 sm:p-8">
            <div className="text-[10px] uppercase tracking-[0.28em] text-amber-deep font-medium mb-3">
              The short version
            </div>
            <ul className="space-y-3 text-body text-[16px] sm:text-[17px] leading-relaxed">
              <li className="flex gap-3">
                <span className="text-amber-deep flex-shrink-0 pt-1">◆</span>
                <span>
                  For most Singapore Citizen HDB upgraders,{" "}
                  <span className="font-serif text-charcoal font-medium">
                    sell-first is the default
                  </span>
                  . It avoids paying 20% ABSD up front and removes the cash flow shock
                  entirely.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-deep flex-shrink-0 pt-1">◆</span>
                <span>
                  The trigger that matters is the moment your HDB buyer{" "}
                  <em className="italic">exercises</em> the OTP — not when they issue
                  it, and not at HDB completion. The old &ldquo;wait until completion&rdquo;
                  advice is outdated.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-deep flex-shrink-0 pt-1">◆</span>
                <span>
                  Once the HDB OTP is exercised, you can OTP a private condo immediately
                  and pay <span className="font-serif text-charcoal font-medium">0%
                  ABSD</span> as a Singapore Citizen buying your first additional
                  property.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-deep flex-shrink-0 pt-1">◆</span>
                <span>
                  Buy-first is a real fallback — but it&rsquo;s only the right call when
                  a specific unit can&rsquo;t wait. For most upgraders, it adds risk
                  without adding upside.
                </span>
              </li>
            </ul>
          </aside>

          {/* ========== Q1 ========== */}
          <h2
            className="font-serif text-charcoal mt-14 sm:mt-20 mb-5 sm:mb-6"
            style={{
              fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.022em",
            }}
          >
            What is the actual decision?
          </h2>
          <Prose>
            Strip away the noise and the question is binary: do you sell your HDB
            first, or do you buy your condo first? Every other tactical question — ABSD,
            bridging finance, interim accommodation, CPF refunds — flows from this one
            sequencing call.
          </Prose>
          <Prose>
            The reason it matters so much is that Singapore&rsquo;s tax system treats
            the two paths very differently. Sell-first, done correctly, costs you{" "}
            <span className="font-serif text-charcoal font-medium">0% ABSD</span>.
            Buy-first costs you 20% ABSD up front, which you may or may not get back.
            On a $1.8M condo, that&rsquo;s a $360,000 cash outlay sitting in escrow
            for months — so the answer to &ldquo;which sequence?&rdquo; isn&rsquo;t a
            preference, it&rsquo;s a structural decision with hard dollar consequences.
          </Prose>

          {/* ========== Q2 ========== */}
          <h2
            className="font-serif text-charcoal mt-14 sm:mt-20 mb-5 sm:mb-6"
            style={{
              fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.022em",
            }}
          >
            Why &ldquo;OTP exercised&rdquo; is the trigger that matters
          </h2>
          <Prose>
            Most upgraders — and frankly, most agents — frame the sell-first sequence
            as &ldquo;wait until your HDB sale completes, then buy private.&rdquo; That
            framing is wrong by about four months.
          </Prose>
          <Prose>
            The Inland Revenue Authority of Singapore (IRAS) stops counting you as an
            HDB owner for ABSD purposes the moment your buyer{" "}
            <em className="italic">exercises</em> the Option to Purchase (OTP) — not at
            HDB completion. An exercised OTP is a legally binding sale contract. From
            IRAS&rsquo;s point of view, you&rsquo;ve already disposed of the property,
            even though the title hasn&rsquo;t formally transferred yet.
          </Prose>

          <h3
            className="font-serif text-charcoal mt-8 sm:mt-10 mb-3"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
          >
            The two stages of an OTP.
          </h3>
          <Prose>
            <strong className="font-medium text-charcoal">Stage one — issued:</strong>{" "}
            you grant the OTP to your buyer; they pay a 1% option fee (for HDB, a
            small nominal amount). At this point the buyer can still walk away and
            forfeit that fee. The contract is not binding. You are still an HDB owner
            in IRAS&rsquo;s eyes.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">Stage two — exercised:</strong>{" "}
            within the validity window (21 days for HDB), the buyer signs the exercise
            and pays the next tranche of the option fee. Now the contract is legally
            binding. IRAS treats the property as effectively disposed. Your ABSD clock
            stops at this moment.
          </Prose>
          <Prose>
            For an upgrader, this single distinction can save weeks of waiting and tens
            of thousands in ABSD exposure. Once the HDB OTP is exercised, you can OTP a
            private condo as early as the next day with zero ABSD. You don&rsquo;t need
            to wait for HDB inspection, HDB acceptance, or the legal completion
            appointment.
          </Prose>

          {/* ========== Q3 ========== */}
          <h2
            className="font-serif text-charcoal mt-14 sm:mt-20 mb-5 sm:mb-6"
            style={{
              fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.022em",
            }}
          >
            When sell-first is the right sequence
          </h2>
          <Prose>
            Sell-first is the default. It&rsquo;s the right call when any of the
            following apply, which covers roughly 80% of the upgraders we see:
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">You don&rsquo;t have a buyer yet.</strong>{" "}
            If your HDB isn&rsquo;t even listed, the sequence is forced — list, market,
            secure a buyer, get the OTP exercised, then OTP private. Trying to compress
            this by buying private first only makes sense if a specific unit is genuinely
            unrepeatable.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">You&rsquo;re cash-flow conscious.</strong>{" "}
            ABSD on a $1.8M condo is $360,000. Even with the 6-month remission, that
            money is locked up in escrow during a stretch when you also need cash for
            stamp duty, legal fees, and a downpayment. Sell-first removes the entire
            line item.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">You&rsquo;re buying a resale condo.</strong>{" "}
            Resale condos can usually be matched to your timeline — you can ask for a
            longer completion period, or simply wait until the right unit comes up after
            your HDB OTP is exercised. The market is liquid enough that the
            &ldquo;perfect unit&rdquo; argument is rarely as urgent as it feels in the
            moment.
          </Prose>

          {/* ========== Q4 ========== */}
          <h2
            className="font-serif text-charcoal mt-14 sm:mt-20 mb-5 sm:mb-6"
            style={{
              fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.022em",
            }}
          >
            When buy-first is genuinely the right call
          </h2>
          <Prose>
            Buy-first is a real and legitimate structure — it&rsquo;s just a fallback,
            not a default. The narrow situations where it makes sense:
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">
              A new launch unit you can&rsquo;t replicate.
            </strong>{" "}
            A specific stack, floor, and orientation in a launch with strong demand may
            simply not be available again. If your HDB sale process is months from
            generating an exercised OTP, the sequencing might force you into a
            buy-first decision. The 6-month ABSD remission window then becomes the
            mechanism that makes the structure work.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">
              You have the cash to absorb 20% ABSD without strain.
            </strong>{" "}
            For households with substantial liquidity outside CPF, the temporary
            outlay of $300k–$400k in ABSD that&rsquo;s refunded within 6 months is a
            tolerable cost of certainty. For most families, it isn&rsquo;t.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">
              Your HDB will sell quickly with high confidence.
            </strong>{" "}
            If your block has cleared multiple recent transactions at the price you
            need, and your unit has no defects that slow a sale, the 6-month window is
            comfortable. The risk profile of buy-first is much higher when the HDB sale
            is uncertain.
          </Prose>
          <Prose>
            Outside these cases, the &ldquo;I&rsquo;ll just pay ABSD and claim it back&rdquo;
            shortcut tends to mask the real risk: that the HDB doesn&rsquo;t sell
            within six months, the ABSD becomes permanent, and the upgrade math turns
            negative.
          </Prose>

          {/* ========== Q5 ========== */}
          <h2
            className="font-serif text-charcoal mt-14 sm:mt-20 mb-5 sm:mb-6"
            style={{
              fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.022em",
            }}
          >
            What does each sequence look like in cash flow terms?
          </h2>
          <Prose>
            Three things change between the two paths: when you pay ABSD (or whether
            you do), when CPF and sale proceeds release, and how much bridging finance
            you need.
          </Prose>

          <h3
            className="font-serif text-charcoal mt-8 sm:mt-10 mb-3"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
          >
            Sell-first cash flow.
          </h3>
          <Prose>
            Week 0: list HDB. Week 2–3: receive offer, issue OTP. Week 4–5: buyer
            exercises OTP — ABSD clock stops. Week 5+: OTP a private condo at 0% ABSD,
            pay 5% on exercise. Week 13: 15% second tranche due on private — usually
            covered by bridging loan against expected HDB proceeds. Week ~16: HDB
            completes, CPF and sale proceeds released, bridging loan repaid, condo
            balance funded toward completion.
          </Prose>

          <h3
            className="font-serif text-charcoal mt-8 sm:mt-10 mb-3"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
          >
            Buy-first cash flow.
          </h3>
          <Prose>
            Week 0: OTP private condo. Pay 5% on exercise plus 20% ABSD up front in
            cash. Week 0–8: market HDB, secure buyer, OTP, exercise. Week ~24: HDB
            completes. Within 6 months of the private purchase: file ABSD remission and
            wait for refund. Net effect: a much larger temporary cash position locked
            in escrow, plus an absolute deadline (6 months) on selling the HDB. Miss
            it and the 20% becomes permanent.
          </Prose>

          {/* ========== Q6 ========== */}
          <h2
            className="font-serif text-charcoal mt-14 sm:mt-20 mb-5 sm:mb-6"
            style={{
              fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.022em",
            }}
          >
            What can go wrong?
          </h2>
          <Prose>
            <strong className="font-medium text-charcoal">
              Signing the private S&amp;P before the HDB OTP is exercised.
            </strong>{" "}
            The unexercised OTP is just a soft handshake — your buyer can forfeit and
            walk. If you&rsquo;ve already committed on the private side based on an
            unexercised OTP, you may suddenly find yourself owning two properties and
            owing ABSD. Wait for the exercise.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">
              Underestimating the bridging requirement.
            </strong>{" "}
            Even with sell-first done correctly, you may need bridging finance to cover
            the private downpayment because CPF stays locked until HDB legal completion.
            Banks usually require evidence of an exercised HDB OTP before approving the
            bridge — another reason exercise matters more than issuance.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">
              Missing the 6-month ABSD remission window in a buy-first structure.
            </strong>{" "}
            If you go buy-first and your HDB doesn&rsquo;t sell within 6 months of the
            private purchase, the 20% ABSD becomes permanent. On a $1.8M condo
            that&rsquo;s a $360,000 mistake. The remission window is a hard deadline,
            not a guideline.
          </Prose>

          {/* ========== FAQs ========== */}
          <section
            className="mt-16 sm:mt-20 border-t border-b border-charcoal py-10 sm:py-14"
            aria-label="Frequently asked questions"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <span className="w-5 sm:w-7 h-px bg-amber-deep" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep font-medium">
                Quick answers
              </span>
            </div>
            <h2
              className="font-serif text-charcoal mb-8 sm:mb-10"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Common questions on sequencing and ABSD
            </h2>
            <dl className="space-y-7 sm:space-y-9">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="pb-6 sm:pb-8 border-b border-dotted border-[#c9bfa3] last:border-b-0 last:pb-0"
                >
                  <dt
                    className="font-serif text-charcoal mb-3"
                    style={{
                      fontSize: "clamp(1.15rem, 1.9vw, 1.4rem)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {f.question}
                  </dt>
                  <dd
                    className="text-body leading-[1.75]"
                    style={{ fontSize: "clamp(15px, 1.5vw, 17px)" }}
                  >
                    {f.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ========== Next steps ========== */}
          <section className="mt-14 sm:mt-20">
            <h2
              className="font-serif text-charcoal mb-5 sm:mb-6"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Where to go next
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              <Link
                href="/safety-meter"
                className="block border border-charcoal bg-paper p-5 sm:p-6 hover:bg-amber/10 transition-colors"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">
                  Step 1 · Sustainability
                </div>
                <div className="font-serif text-charcoal text-[17px] sm:text-[19px] leading-snug mb-2">
                  Take the Safety Meter
                </div>
                <div className="text-[13px] sm:text-[14px] text-body leading-relaxed">
                  Test whether the upgrade math actually survives the monthly.
                </div>
              </Link>
              <Link
                href="/guides/east-singapore-hdb-upgrader"
                className="block border border-charcoal bg-paper p-5 sm:p-6 hover:bg-amber/10 transition-colors"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">
                  Step 2 · Context
                </div>
                <div className="font-serif text-charcoal text-[17px] sm:text-[19px] leading-snug mb-2">
                  Read the East Singapore guide
                </div>
                <div className="text-[13px] sm:text-[14px] text-body leading-relaxed">
                  Market context for D14–18 upgraders in 2026.
                </div>
              </Link>
              <Link
                href="/strategy-session"
                className="block border border-charcoal bg-charcoal text-cream p-5 sm:p-6 hover:bg-amber hover:text-charcoal transition-colors"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-amber mb-2">
                  Step 3 · Plan
                </div>
                <div className="font-serif text-[17px] sm:text-[19px] leading-snug mb-2">
                  Request a Clarity Call
                </div>
                <div className="text-[13px] sm:text-[14px] leading-relaxed opacity-80">
                  10 minutes. Your sequence, mapped.
                </div>
              </Link>
            </div>
          </section>

          {/* ========== Back ========== */}
          <div className="mt-16 sm:mt-20 pt-10 border-t border-charcoal text-center">
            <Link
              href="/guides/east-singapore-hdb-upgrader"
              className="text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-amber-deep hover:text-charcoal transition-colors"
            >
              ← The East Singapore upgrader guide
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-body leading-[1.75] mb-5 sm:mb-6"
      style={{ fontSize: "clamp(16px, 1.6vw, 18px)" }}
    >
      {children}
    </p>
  );
}
