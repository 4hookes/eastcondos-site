import type { Metadata } from "next";
import Link from "next/link";
import LastUpdated from "@/components/editorial/LastUpdated";

const PUBLISH_DATE = "2026-04-25";
const LAST_UPDATED = "2026-04-25";
const CANONICAL = "https://eastcondos.sg/guides/east-singapore-hdb-upgrader";

const faqs: Array<{ question: string; answer: string }> = [
  {
    question: "Is now a bad time to sell my HDB in East Singapore?",
    answer:
      "Q1 2026 was the first quarter since Q2 2019 where HDB's Resale Price Index turned negative (-0.1% QoQ). The 4-room segment — 45% of resale volume — fell 0.7% in the same quarter. For most East Singapore HDB owners, the market isn't collapsing, but the unambiguous seven-year uptrend is over. Whether that makes it a 'bad' time depends on your window: if you're upgrading and can still lock in a 30-year loan tenor, waiting usually costs more than moving. If you're simply cashing out, you're selling into a softer market than 2024–2025.",
  },
  {
    question: "What's the right age to upgrade from an HDB to a condo?",
    answer:
      "There's no single right age, but bank loan tenors in Singapore cap at age 65 or 30 years, whichever is shorter. Up to age 45, you can still structure a 30-year loan (often via The Younger-Borrower Play, where a younger spouse applies as sole borrower). Past 45, the math tightens quickly — at 50, solo applicants are typically looking at 15-year tenors, which nearly doubles the monthly installment versus a 30-year structure. The window is a function of age, not market timing.",
  },
  {
    question: "How much cash do I actually need on top of my HDB sale proceeds?",
    answer:
      "For most East Singapore upgraders buying a $1.5M–$2M condo, the real cash-on-hand requirement depends on four inputs: remaining CPF balance, outstanding HDB loan, target purchase price, and Buyer's Stamp Duty (BSD). As a rough guide — and this is what our Safety Meter calculates — expect to have liquid cash covering BSD plus legal fees (roughly 3–4% of the purchase price) on top of your HDB net sale proceeds, before considering renovation or reserve funds. The exact number varies case by case.",
  },
  {
    question: "Do I need to sell my HDB before I buy a condo?",
    answer:
      "For most Singapore Citizen upgraders, sell-first is the default — and the trigger that matters is the moment your HDB buyer exercises the OTP, not when the sale completes. Once that's done, you can OTP a private condo immediately and pay 0% ABSD as a Singapore Citizen buying your first additional property. Buy-first is a real fallback structure (with a 6-month ABSD remission window) but it's only the right call when a specific unit can't wait. Full mechanics in our buy-or-sell-first guide.",
  },
  {
    question: "Which East Singapore districts should I target if I'm upgrading?",
    answer:
      "East Singapore covers District 14 (Geylang, Eunos, Paya Lebar), District 15 (Katong, Joo Chiat, Marine Parade), District 16 (Bedok, Upper East Coast, Siglap), District 17 (Changi, Loyang, Pasir Ris), and District 18 (Tampines, Pasir Ris). The right district depends on your exit audience — who you plan to sell to in 7–10 years — not just where you want to live now. A condo in D15 near Katong sells to a different buyer than one in D18 near Tampines MRT. Matching the entry price, future exit audience, and your own family's needs is what Property by Design (PBD™) is designed to do.",
  },
  {
    question: "What's the difference between upgrading to a new launch versus a resale condo?",
    answer:
      "New launches sit on a progressive-payment schedule (you pay as the building is constructed), typically TOP in 3–4 years, and often come with developer incentives. Resale condos are immediately available, let you inspect the actual unit, and usually price at a 10–20% discount to new launches in the same area — but they come with no runway for capital appreciation from the TOP-to-ready phase. Neither is universally better. For East Singapore upgraders, the right choice depends on your timeline, risk appetite, and whether you have an HDB to sell in parallel.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL("https://eastcondos.sg"),
  title:
    "HDB Upgrader's Guide to East Singapore Condos — 2026 Market Reality",
  description:
    "A 2026 guide for HDB owners in Districts 14–18 considering a condo upgrade. Covers the first HDB price drop in 7 years, the Younger-Borrower Play, ABSD timing, and when the upgrade math actually works — from a specialist with 13 years in East Singapore.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "HDB Upgrader's Guide to East Singapore Condos — 2026 Market Reality",
    description:
      "The 2026 playbook for HDB owners in D14–18 considering a condo upgrade. Market data, financing structures, timing calls, and the frameworks we use in consultations.",
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

export default function EastSingaporeHdbUpgraderGuidePage() {
  const articleSchema = {
    "@type": "Article",
    headline:
      "HDB Upgrader's Guide to East Singapore Condos — 2026 Market Reality",
    description:
      "A 2026 guide for HDB owners in Districts 14–18 considering a condo upgrade.",
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
      { "@type": "Thing", name: "HDB to condo upgrade" },
      { "@type": "Thing", name: "Singapore property investment" },
      { "@type": "Place", name: "East Singapore (Districts 14–18)" },
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
        name: "East Singapore HDB Upgrader Guide",
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
            The Guide · East Singapore · 2026
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
          The HDB upgrader&rsquo;s guide to{" "}
          <em className="italic text-amber-deep">East Singapore</em> condos.
        </h1>

        <p
          className="font-serif italic text-charcoal text-[18px] sm:text-[22px] leading-snug mb-8 sm:mb-10"
          style={{ maxWidth: "48ch" }}
        >
          A practitioner&rsquo;s walkthrough for HDB owners in Districts 14–18 weighing a
          condo upgrade in the 2026 market. What the numbers say. What the structures
          allow. When the window closes.
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
                  The HDB Resale Price Index fell{" "}
                  <span className="font-serif text-charcoal font-medium">
                    0.1% in Q1 2026
                  </span>{" "}
                  — the first quarterly drop in seven years. The 4-room segment, which
                  is 45% of resale volume, fell 0.7%.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-deep flex-shrink-0 pt-1">◆</span>
                <span>
                  48,000 MOP flats will hit the East and island-wide resale market
                  across 2026–2028. Supply is rising into a softening demand curve.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-deep flex-shrink-0 pt-1">◆</span>
                <span>
                  Bank loan tenors cap at age 65. If you&rsquo;re under 45, a 30-year
                  tenor is still available via a younger-spouse loan structure.
                  Past 45, the math changes materially every year.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-deep flex-shrink-0 pt-1">◆</span>
                <span>
                  The upgrade question isn&rsquo;t <em className="italic">whether</em>{" "}
                  — it&rsquo;s whether the entry price, exit audience, and financing
                  runway all line up for <em className="italic">your</em> household.
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
            Who is this guide for?
          </h2>
          <Prose>
            This guide is written for a specific reader: an HDB owner in East Singapore
            — Bedok, Tampines, Pasir Ris, Katong, Eunos, Marine Parade — who has been
            in the flat for at least ten years, is somewhere between their mid-30s and
            mid-50s, and is quietly running the numbers on a condo upgrade.
          </Prose>
          <Prose>
            You&rsquo;re probably not in a rush. You&rsquo;ve watched your HDB&rsquo;s
            valuation climb during COVID and plateau since. You&rsquo;ve heard about a
            friend or cousin who made the move and is now &ldquo;sitting pretty.&rdquo;
            You&rsquo;ve also heard stories of upgraders who got squeezed on monthly
            installments and regretted it. You want the honest version.
          </Prose>
          <Prose>
            Everything below is written with that reader in mind. Not first-time
            buyers. Not investors with multiple properties. Not tenants. HDB upgraders,
            in East Singapore, in 2026.
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
            What is actually happening in the East Singapore HDB market right now?
          </h2>
          <Prose>
            Three things, all at once.
          </Prose>

          <h3
            className="font-serif text-charcoal mt-8 sm:mt-10 mb-3"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
          >
            The index turned negative for the first time in seven years.
          </h3>
          <Prose>
            In Q1 2026, HDB&rsquo;s Resale Price Index dropped 0.1% quarter-on-quarter.
            That&rsquo;s small in absolute terms, but it&rsquo;s the first decline
            since Q2 2019. Seven years of continuous climb, now paused. Dig one level
            deeper and the 4-room segment — roughly 45% of all resale volume, and where
            most East Singapore upgraders sit — fell 0.7% in the same quarter. The
            headline is soft; the segment that matters for most of you is softer.
          </Prose>

          <h3
            className="font-serif text-charcoal mt-8 sm:mt-10 mb-3"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
          >
            The million-dollar flats are masking the average picture.
          </h3>
          <Prose>
            The headlines you see about record-breaking million-dollar HDB resales are
            real — but they&rsquo;re concentrated. Roughly 90% of million-dollar flats
            sold in recent months were in Toa Payoh, Bukit Merah, and Queenstown. Not
            in Bedok, Tampines, Pasir Ris, or Eunos. If you&rsquo;re reading the
            national RPI as a proxy for your own block, you&rsquo;re reading the wrong
            number. East Singapore is its own sub-market.
          </Prose>

          <h3
            className="font-serif text-charcoal mt-8 sm:mt-10 mb-3"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
          >
            Supply is ramping into 2028.
          </h3>
          <Prose>
            Across 2026–2028, approximately 48,000 BTO flats will clear their Minimum
            Occupation Period and hit the resale market. Many of those are in East
            Singapore. When your neighbour&rsquo;s newer BTO becomes your competitor
            (if you&rsquo;re selling) or your buyer&rsquo;s alternative (if
            you&rsquo;re sitting tight), the pressure moves downward.
          </Prose>
          <Prose>
            None of this means a crash. It means the easy ride is over, and the
            upgraders who come out ahead will be the ones who make a clear decision
            inside their own window rather than waiting for another Black Swan.
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
            How does the upgrade math actually work?
          </h2>
          <Prose>
            The upgrade math has three layers, and most upgraders only ever look at
            the first one.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">Layer one — the bank:</strong>{" "}
            how much can you borrow? This is the calculator answer. TDSR caps private
            loans at 55% of gross income; MSR caps HDB bank loans at 30%; LTV caps the
            loan at 75% of property value for most private purchases. Stress-test rate
            is 4%. You can run this exact number on our{" "}
            <Link href="/calculator" className="text-amber-deep underline underline-offset-2 hover:text-charcoal">
              Singapore loan eligibility calculator
            </Link>
            .
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">Layer two — the cash flow:</strong>{" "}
            can you <em className="italic">survive</em> the monthly? Bank approval and
            household sustainability are two different questions. A 45-year-old buying
            a $1.8M condo on a 20-year tenor is looking at a monthly installment in
            the $7,000+ range — even if the bank approves, the question is whether
            that number crowds out retirement savings, children&rsquo;s education, or
            the ability to absorb a market correction. Our{" "}
            <Link href="/safety-meter" className="text-amber-deep underline underline-offset-2 hover:text-charcoal">
              HDB-to-Condo Safety Meter
            </Link>{" "}
            is built to answer exactly that layer.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">Layer three — the exit:</strong>{" "}
            who buys this condo from you in 7–10 years? This is the layer most
            upgraders skip and most regret not running. A condo that suits your family
            today may not suit your future buyer. Entry pricing and exit audience are
            the two factors we weight most heavily in every consultation — together
            they&rsquo;re roughly 80% of the long-term outcome.
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
            What financing structures should an East Singapore upgrader know?
          </h2>
          <Prose>
            Bank loan mechanics in Singapore create a narrow band of structural choices
            that, correctly applied, can change your monthly installment by several
            thousand dollars. Two matter most for upgraders.
          </Prose>

          <h3
            className="font-serif text-charcoal mt-8 sm:mt-10 mb-3"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
          >
            The Younger-Borrower Play.
          </h3>
          <Prose>
            A joint home-loan application in Singapore caps the maximum tenor at the
            older borrower&rsquo;s age: the loan must end by 65, capped at 30 years
            absolute. If your spouse is materially younger than you and applies as
            sole borrower, the tenor is calculated against her age alone. You still
            co-own the condo via CPF and the title deed — but the loan structure
            belongs to one person. For an upgrader in their mid-40s with a spouse in
            their mid-30s, this can be the difference between a 20-year and a 30-year
            tenor.
          </Prose>
          <Prose>
            We covered the full mechanics in{" "}
            <Link
              href="/journal/your-hdb-looks-young-inside-its-old"
              className="text-amber-deep underline underline-offset-2 hover:text-charcoal"
            >
              Your HDB Looks Young. Inside, It&rsquo;s Old.
            </Link>
            {" "}— including why the window effectively closes around age 45.
          </Prose>

          <h3
            className="font-serif text-charcoal mt-8 sm:mt-10 mb-3"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
          >
            The sell-then-buy vs buy-then-sell decision.
          </h3>
          <Prose>
            For most Singapore Citizen upgraders, sell-first is the default — once your
            HDB buyer exercises the OTP, you can OTP a private condo immediately at 0%
            ABSD. Buy-first is a real fallback (with a 6-month ABSD remission window)
            but it&rsquo;s the right call only in narrow situations where a specific
            unit can&rsquo;t wait. Each path has a distinct timeline, tax exposure, and
            financing profile — full mechanics, including why the &ldquo;OTP
            exercised&rdquo; trigger matters more than &ldquo;completion,&rdquo; in our{" "}
            <Link
              href="/guides/buy-or-sell-first"
              className="text-amber-deep underline underline-offset-2 hover:text-charcoal"
            >
              buy-or-sell-first sequencing guide
            </Link>
            .
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
            When is the right time to upgrade?
          </h2>
          <Prose>
            The honest answer: the right time is when four things line up at once —
            your age still supports a 25- or 30-year loan, your HDB has enough of its
            COVID-era premium intact to fund the move, the target condo is entered at
            a price that has a clean exit audience, and your household cash flow can
            absorb the monthly without crowding out non-property priorities.
          </Prose>
          <Prose>
            In thirteen years of consultations with over 500 East Singapore families,
            one pattern has held. The families who came out ahead weren&rsquo;t the
            ones who timed the market perfectly. They were the ones who moved while
            the market was still warm, inside their own window of age, financing, and
            premium — rather than waiting for &ldquo;the right time.&rdquo; The
            families who regret the most are the ones who kept waiting until their age
            crossed a threshold the bank cared about.
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
            The three most expensive mistakes we see in East Singapore HDB upgrades
            are all structural, not emotional.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">
              Buying a condo with no clean exit audience.
            </strong>{" "}
            The unit ticks every box for your family today, but in 7–10 years the
            natural buyer pool is either too narrow or too price-sensitive to pay what
            you need. Appreciation stalls. This is the mistake that&rsquo;s hardest to
            undo.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">
              Approving the monthly without stress-testing the household.
            </strong>{" "}
            The bank says yes at a stress-test rate of 4%. The household budget barely
            survives at 1.5%. One rate cycle later, there&rsquo;s no reserve. The
            Safety Meter is designed to catch this before contracts are signed.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">
              Sequencing the sell and buy in the wrong order.
            </strong>{" "}
            ABSD refund windows, BSD, SSD timing, and CPF refund mechanics all interact
            in ways that reward careful sequencing and punish improvisation. This is
            the single most under-appreciated part of the upgrade.
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
              Common questions from East Singapore upgraders
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
                href="/calculator"
                className="block border border-charcoal bg-paper p-5 sm:p-6 hover:bg-amber/10 transition-colors"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">
                  Step 1 · Numbers
                </div>
                <div className="font-serif text-charcoal text-[17px] sm:text-[19px] leading-snug mb-2">
                  Run the loan calculator
                </div>
                <div className="text-[13px] sm:text-[14px] text-body leading-relaxed">
                  Private, HDB-HDB, and HDB-bank loans in one view.
                </div>
              </Link>
              <Link
                href="/safety-meter"
                className="block border border-charcoal bg-paper p-5 sm:p-6 hover:bg-amber/10 transition-colors"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">
                  Step 2 · Sustainability
                </div>
                <div className="font-serif text-charcoal text-[17px] sm:text-[19px] leading-snug mb-2">
                  Take the Safety Meter
                </div>
                <div className="text-[13px] sm:text-[14px] text-body leading-relaxed">
                  Your 7-tier upgrader archetype in 3 steps.
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
                  10 minutes. Your numbers, applied.
                </div>
              </Link>
            </div>
          </section>

          {/* ========== Back ========== */}
          <div className="mt-16 sm:mt-20 pt-10 border-t border-charcoal text-center">
            <Link
              href="/journal/your-hdb-looks-young-inside-its-old"
              className="text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-amber-deep hover:text-charcoal transition-colors"
            >
              Read the related Journal cover story →
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
