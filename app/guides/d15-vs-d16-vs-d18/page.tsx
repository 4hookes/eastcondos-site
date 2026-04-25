import type { Metadata } from "next";
import Link from "next/link";
import LastUpdated from "@/components/editorial/LastUpdated";

const PUBLISH_DATE = "2026-04-25";
const LAST_UPDATED = "2026-04-25";
const CANONICAL = "https://eastcondos.sg/guides/d15-vs-d16-vs-d18";

const faqs: Array<{ question: string; answer: string }> = [
  {
    question: "Should I buy a condo in Bedok or Tampines?",
    answer:
      "Bedok and Tampines look similar on a map but they serve different upgraders. Bedok (D16) condo supply that suits an HDB upgrader is concentrated in the Tanah Merah cluster around the EW4 station — outside that cluster the choice thins quickly. Tampines (D18) has substantially more upgrader-grade resale inventory; Treasure at Tampines alone has had over 1,900 resale transactions, giving you transparent pricing and high liquidity. Tampines also pulls a deeper buyer pool: local BTO upgraders plus Punggol HDB families moving closer to East Singapore parents. Bedok condos outside Tanah Merah work for buyers with a specific reason to be there. For a generic upgrader prioritising future exit liquidity, Tampines is the more obvious starting point.",
  },
  {
    question:
      "What are the best condos in District 15 Singapore for HDB upgraders?",
    answer:
      "D15's strongest upgrader-relevant resale clusters split into four. The Tanjong Rhu / Katong Park corridor is the newly TEL-connected premium zone at roughly $2,100–$2,400 PSF. The Marine Parade / Amber Road belt is the established mid-market at $1,900–$2,100 PSF, anchored by projects like The Shore Residences. The Joo Chiat / Ceylon Lane micro-market is the freehold luxury pocket at $2,500–$3,200+ PSF, with Ivory as a benchmark example. The Siglap / Mandarin Gardens cluster is the mass-market value play, trading $1,114–$1,851 PSF. The right pick depends on whether you're optimising for new-MRT premium, established mid-market liquidity, freehold lifestyle, or maximum sqft per dollar inside D15. All four clusters benefit from D15's island-wide buyer pool on exit.",
  },
  {
    question:
      "What HDB upgrade options exist in Marine Parade or Katong?",
    answer:
      "Marine Parade and Katong sit inside D15 and have benefited materially from the Thomson-East Coast Line Stage 4, which opened on 23 June 2024 with stations at Marine Parade, Katong Park, Tanjong Rhu, Tanjong Katong, Marine Terrace, and Siglap. The realistic upgrader options divide into established mid-market resale at $1,800–$2,100 PSF (projects like The Shore Residences on Amber Road or older Marine Parade leasehold inventory), MRT-proximate premium resale at $2,100–$2,400 PSF in the Tanjong Rhu / Katong Park corridor, and freehold luxury micro-precincts in Joo Chiat (Ivory, Straits at Joo Chiat) at $2,000–$3,200 PSF. The structural appeal for an upgrader is D15's island-wide exit audience — buyers come from across Singapore for the Katong food and East Coast lifestyle, not just from neighbouring districts.",
  },
  {
    question:
      "Is D15's price premium over D16 or D18 worth it for an upgrader?",
    answer:
      "The honest question isn't whether the premium is worth it today — it's whether the premium holds on exit. D15 trades at roughly $2,000 PSF mainstream versus around $1,900 PSF in D16 mainstream Bedok (with established projects like Bedokville actually transacting closer to $1,346 PSF) and $1,435 PSF at Treasure at Tampines in D18. The premium covers two things D16 and D18 don't share: an island-wide buyer pool that doesn't depend on local HDB upgrader supply, and a near-complete TEL infrastructure that's still being priced into resale comparables. If you can absorb the smaller floor plate ($2M buys roughly 1,000 sqft in D15 versus 1,395 sqft in D18), the premium is paying for exit optionality. If your priority is family space — a true 3-bedroom or 4-bedroom — D18 typically wins on the math.",
  },
  {
    question:
      "How does the Thomson-East Coast Line change the maths for D15 and D18?",
    answer:
      "TEL Stage 4 opened on 23 June 2024 with eight new East Coast stations. Six of them sit inside D15 — Tanjong Rhu, Katong Park, Tanjong Katong, Marine Parade, Marine Terrace, and Siglap — and one of them anchors D16's emerging Bayshore precinct. For D15 this is the most significant transit infrastructure addition in decades; historically D15 was lifestyle-rich but transit-poor relative to its prestige, and the line solves that gap. Resale valuations in TEL-proximate D15 projects are still pricing it in over a 3–7 year horizon. D18 doesn't get a TEL station, but it does get the Cross Island Line at Pasir Ris around 2030, which will tighten the Punggol-to-East linkage materially. The TEL effect is a near-term D15 catalyst. The CRL effect is a 2030 D18 catalyst.",
  },
  {
    question:
      "Which East Singapore district faces the most new-launch competition over the next 5 years?",
    answer:
      "D18, by a wide margin. 2026 alone has already seen two major EC launches in the Tampines / Pasir Ris area (Coastal Cabana with 748 units and Rivelle Tampines with 572 units, both nearly sold out at launch), with more than half of the planned 18+ 2026 OCR launches landing on this side of the island. D16's launch supply is concentrated in the emerging Bayshore precinct — roughly 3,000 private units across the full Bayshore buildout from 2028 to 2032 — but that supply is hitting the Bayshore market specifically, not the Tanah Merah upgrader cluster. D15 is the most insulated, with only Tanjong Rhu Residences (525 units, TOP 2029–2030) and Tembusu Grand (638 units, TOP 2027–2028) as material new supply through 2027.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL("https://eastcondos.sg"),
  title:
    "D15 vs D16 vs D18 — comparing East Singapore districts for HDB upgraders",
  description:
    "A 2026 comparative guide for HDB upgraders weighing D15 (Marine Parade / Katong / Joo Chiat), D16 (Bedok / Tanah Merah / Bayshore), and D18 (Tampines / Pasir Ris). Resale PSF, the TEL effect, supply pipelines, and the exit audience that decides which district wins for your situation.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title:
      "D15 vs D16 vs D18 — comparing East Singapore districts for HDB upgraders",
    description:
      "Three districts. Three different exit audiences. A 2026 comparative guide for East Singapore HDB upgraders — entry pricing, MRT, supply pipeline, and who actually buys it from you in 7–10 years.",
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

export default function D15VsD16VsD18GuidePage() {
  const articleSchema = {
    "@type": "Article",
    headline:
      "D15 vs D16 vs D18 — comparing East Singapore districts for HDB upgraders",
    description:
      "A 2026 comparative guide for HDB upgraders weighing District 15, District 16, and District 18 in East Singapore.",
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
      { "@type": "Place", name: "District 15 Singapore (Marine Parade, Katong, Joo Chiat, Amber Road)" },
      { "@type": "Place", name: "District 16 Singapore (Bedok, Upper East Coast, Tanah Merah, Bayshore)" },
      { "@type": "Place", name: "District 18 Singapore (Tampines, Pasir Ris)" },
      { "@type": "Thing", name: "HDB to condo upgrade in East Singapore" },
      { "@type": "Thing", name: "Thomson-East Coast Line property impact" },
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
        name: "D15 vs D16 vs D18 — East Singapore Districts Compared",
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
            The Guide · Districts Compared · 2026
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
          D15, D16, or <em className="italic text-amber-deep">D18</em>?
        </h1>

        <p
          className="font-serif italic text-charcoal text-[18px] sm:text-[22px] leading-snug mb-8 sm:mb-10"
          style={{ maxWidth: "54ch" }}
        >
          Three East Singapore districts. Three different exit audiences. Why the
          right pick depends less on where you want to stay — and more on who you
          plan to sell it to in seven to ten years.
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
                  <span className="font-serif text-charcoal font-medium">
                    D15 is the dream district.
                  </span>{" "}
                  Buyers come for it from the West and the North, not just the
                  East. Premium entry, premium exit. The moat is lifestyle.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-deep flex-shrink-0 pt-1">◆</span>
                <span>
                  <span className="font-serif text-charcoal font-medium">
                    D16 is cluster-dependent.
                  </span>{" "}
                  Outside the Tanah Merah cluster, the upgrader-grade condo
                  supply is thinner than people assume. Bayshore is in D16 but
                  is a different market entirely — not for HDB upgraders.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-deep flex-shrink-0 pt-1">◆</span>
                <span>
                  <span className="font-serif text-charcoal font-medium">
                    D18 is the working upgrader&rsquo;s district.
                  </span>{" "}
                  Tampines BTO families plus Punggol HDB owners moving closer to
                  ageing parents are the natural buyer pool. Biggest space per
                  dollar; biggest supply pipeline.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-deep flex-shrink-0 pt-1">◆</span>
                <span>
                  The right district isn&rsquo;t a preference. It&rsquo;s a
                  function of your entry budget, your timeline, and the buyer
                  who replaces you.
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
            Why D15, D16, and D18 attract three different kinds of upgrader
          </h2>
          <Prose>
            Three districts that look adjacent on a map are, in practice, three
            different markets. Each one pulls a different buyer.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">D15</strong> — Marine
            Parade, Katong, Joo Chiat, Amber Road, Tanjong Katong — is the
            East&rsquo;s lifestyle district. The Thomson-East Coast Line Stage 4
            opened in June 2024 and added eight new East Coast stations to the
            city in one go. East Coast Park, the Joo Chiat heritage shophouses,
            the Katong food scene, the F&amp;B density along East Coast Road —
            the result is a district that pulls buyers island-wide. Families
            from the West and the North move{" "}
            <em className="italic">to</em> D15 for what&rsquo;s there.
            That&rsquo;s the moat.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">D16</strong> — Bedok,
            Upper East Coast, Siglap, Tanah Merah, Bayshore — is more uneven.
            The condo supply that an HDB upgrader would seriously consider is
            concentrated in one cluster: Tanah Merah, around the EW4 station.
            Outside that cluster, the choice thins fast. The local HDB upgrader
            pool is also narrower than the heartland reputation suggests — the
            natural feeder estates are Bedok South and Fengshan Greenview, not
            the broad Bedok footprint. Bayshore is in D16 but isn&rsquo;t a
            heartland upgrader play — it&rsquo;s a waterfront lifestyle market
            attracting a different buyer entirely.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">D18</strong> —
            Tampines and Pasir Ris — is the working upgrader&rsquo;s district.
            The natural buyer pool is local: Tampines BTO families crossing into
            private for the first time, and Punggol HDB owners moving to the
            East to be near ageing parents. Biggest supply pipeline, biggest
            space per dollar, but the exit audience is price-sensitive.
          </Prose>
          <Prose>
            You can pick the wrong district by getting this part wrong. A unit
            that suits <em className="italic">your</em> family today
            doesn&rsquo;t necessarily match the buyer who&rsquo;ll take it off
            your hands in 2034.
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
            What $1.5M, $2M, and $2.5M actually buys you in each district today
          </h2>
          <Prose>
            Median resale PSF tells the headline story. Q1 2026:
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">D15:</strong>{" "}
            roughly $2,000 PSF mainstream, $2,500–$3,200 PSF for the Joo Chiat /
            Ceylon Lane freehold pocket. <strong className="font-medium text-charcoal">
              D16:
            </strong>{" "}
            around $1,900 PSF on PropertyGuru&rsquo;s consolidated median, with
            established Bedok projects like Bedokville actually transacting
            closer to $1,346 PSF over 27 recent deals.{" "}
            <strong className="font-medium text-charcoal">D18:</strong>{" "}
            $1,435 PSF median at Treasure at Tampines, drawn from over 1,900
            resale transactions — the most reliable single read on the district.
          </Prose>

          <h3
            className="font-serif text-charcoal mt-8 sm:mt-10 mb-3"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
          >
            At $1.5 million.
          </h3>
          <Prose>
            In D15, $1.5M buys a compact 2-bedroom of 550–700 sqft in mainstream
            resale, or a larger 2-bedroom in older buildings with shorter
            remaining lease. You aren&rsquo;t buying a comfortable family home
            here; you&rsquo;re buying a foothold.
          </Prose>
          <Prose>
            In D16, the same $1.5M buys 750–850 sqft of mainstream Bedok
            inventory, or a full 2-bedroom (900–1,000 sqft) in well-maintained
            older blocks like Bedokville. A two-bedroom upgrade for a young
            family becomes realistic.
          </Prose>
          <Prose>
            In D18, $1.5M buys 900–1,050 sqft. A genuine 3-bedroom in a
            high-liquidity project comes into range — 3-bedroom units at
            Treasure at Tampines have transacted around $1.69M for 915 sqft.
            For a family that needs a third bedroom, this is the bracket where
            D18 starts to look obvious.
          </Prose>

          <h3
            className="font-serif text-charcoal mt-8 sm:mt-10 mb-3"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
          >
            At $2 million.
          </h3>
          <Prose>
            All three districts open up — but the unit sizes diverge sharply.
          </Prose>
          <Prose>
            D15 at $2,000 PSF buys roughly 1,000 sqft. A comfortable 2-bedroom
            or a tight 3-bedroom in mainstream East Coast. The Shore Residences
            on Amber Road has had 2-bedroom units (1,000–1,100 sqft) at
            $1.9M–$2.1M.
          </Prose>
          <Prose>
            D16 at the median $1,900 PSF buys around 1,050 sqft, but established
            Bedok projects below median PSF give you 1,200–1,400 sqft — a
            genuine 3-bedroom in established estates. At Bedokville&rsquo;s
            $1,346 PSF, $2M buys roughly 1,486 sqft.
          </Prose>
          <Prose>
            D18 at $1,435 PSF buys around 1,395 sqft. A spacious 3-bedroom or
            a small 4-bedroom. This is the bracket where D18&rsquo;s space
            advantage becomes hard to ignore.
          </Prose>
          <Prose>
            This $2M bracket is where roughly 45% of all private resale
            transactions in 2026 have landed. It is the modal upgrader spend.
            The trade-off you make at this price point — location prestige in
            D15 versus 200–400 sqft of extra space in D18 — is the trade-off
            most upgraders are actually wrestling with.
          </Prose>

          <h3
            className="font-serif text-charcoal mt-8 sm:mt-10 mb-3"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
          >
            At $2.5 million.
          </h3>
          <Prose>
            The question stops being &ldquo;can I afford it&rdquo; and starts
            being &ldquo;what am I optimising for.&rdquo;
          </Prose>
          <Prose>
            D15 at $2.5M buys a 1,150–1,250 sqft premium 3-bedroom in mainstream
            East Coast, or a compact 4-bedroom in older buildings. The premium
            freehold pocket — Ivory at $2,500–$3,200 PSF, Straits at Joo Chiat
            at $2,065–$2,158 PSF — is mostly still out of comfortable reach for
            a family-sized unit.
          </Prose>
          <Prose>
            D16 at $1,900 PSF buys around 1,315 sqft. In established Bedok at
            $1,346–$1,600 PSF, $2.5M buys 1,560–1,857 sqft — full 4-bedroom
            territory in projects like Eastern Garden or Bedokville. Bayshore
            (Vela Bay, opposite Bayshore MRT) puts a 3-bedroom waterfront unit
            in range at $1,800–$2,100 PSF — but you&rsquo;re paying new launch
            pricing for a 2030 TOP.
          </Prose>
          <Prose>
            D18 at $1,435 PSF buys 1,740 sqft. A comfortable 4-bedroom with
            proper room for a growing family, in a project with high liquidity.
            Nearly double the D15 floor plate at the same outlay.
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
            Who buys this from you in 7–10 years — the exit audience by district
          </h2>
          <Prose>
            This is where most upgraders get the call wrong. They pick the
            district that suits <em className="italic">their</em> family today.
            They don&rsquo;t pick the district where the natural buyer in 2034
            wants what they&rsquo;re selling.
          </Prose>
          <Prose>
            Entry pricing and exit audience together are roughly 80% of the
            long-term outcome. Today&rsquo;s purchase price gets a lot of
            attention because it shows up on the bank statement. The exit
            audience gets almost none — and yet it&rsquo;s the variable that
            decides whether your $2M becomes $2.7M or $1.85M when you sell.
          </Prose>

          <h3
            className="font-serif text-charcoal mt-8 sm:mt-10 mb-3"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
          >
            D15 — island-wide buyer pool.
          </h3>
          <Prose>
            This is the dream district angle. D15 doesn&rsquo;t sell to
            &ldquo;East Singapore upgraders.&rdquo; It sells to HNW locals from
            the Bukit Timah belt or Holland Village who want sea proximity. To
            families from the West and the North who&rsquo;ve decided their
            kids deserve the East Coast lifestyle. To downsizers from landed
            homes who want Katong walkability without the upkeep. To expat
            tenant demand that underwrites long-term yield support.
          </Prose>
          <Prose>
            The structural feature here is that D15&rsquo;s buyer pool is{" "}
            <em className="italic">not</em> constrained by geography. When you
            sell, you&rsquo;re not waiting for a Bedok HDB family to upgrade —
            you&rsquo;re fishing in a pond that includes the entire Singapore
            HNW base. That&rsquo;s why D15 carries the premium it does. The exit
            audience is the largest of the three districts.
          </Prose>

          <h3
            className="font-serif text-charcoal mt-8 sm:mt-10 mb-3"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
          >
            D16 — narrower than people assume.
          </h3>
          <Prose>
            The lazy read is &ldquo;D16 is the East Singapore heartland, so the
            upgrader pool is huge.&rdquo; It isn&rsquo;t. The natural feeder HDB
            estates for D16 condos are specifically Bedok South and Fengshan
            Greenview — not the broad Bedok footprint, which has limited recent
            BTO supply. The condo cluster that absorbs this demand is Tanah
            Merah, around the EW4 station. That&rsquo;s where the upgrader-grade
            resale concentration sits.
          </Prose>
          <Prose>
            If you buy a D16 condo outside the Tanah Merah cluster,
            you&rsquo;re not buying into a deep upgrader pool. You&rsquo;re
            buying into a thinner sub-market with longer marketing time on
            exit.
          </Prose>
          <Prose>
            The exception inside D16 is Bayshore. Bayshore is in D16 but
            it&rsquo;s not for HDB upgraders. It&rsquo;s a waterfront lifestyle
            precinct attracting downsizers, professional couples, and
            lifestyle-driven buyers who want the new MRT, the new mall, and the
            low-maintenance high-rise format. If you&rsquo;re an HDB upgrader,
            Bayshore probably isn&rsquo;t your play — you&rsquo;re paying new
            launch prices for a market whose buyers don&rsquo;t look like you.
          </Prose>

          <h3
            className="font-serif text-charcoal mt-8 sm:mt-10 mb-3"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
          >
            D18 — local upgrader pool, plus the Punggol exodus.
          </h3>
          <Prose>
            D18&rsquo;s natural exit audience is the working East Singapore
            upgrader: Tampines BTO families crossing into private for the first
            time, plus Punggol HDB owners who want to be near ageing parents in
            the East. The Punggol piece is structural — Punggol is a 40+ minute
            drive to the East, but Pasir Ris is right next door. The Cross
            Island Line (target 2030) will tighten this further. For Punggol
            families with parents in Bedok or Tampines, D18 is the sensible
            compromise.
          </Prose>
          <Prose>
            The pool is deep but price-sensitive. Pasir Ris transactions
            concentrate hard at the $1.0M–$1.5M bracket (223 deals in this
            range), then taper to $1.6M–$2.0M (147 deals), then $2.1M–$2.5M
            (only 36 deals). Above $2.5M in D18, the buyer pool is genuinely
            thin. Buy at the wrong end of the price ladder and you&rsquo;ll
            struggle to exit at a profit.
          </Prose>
          <Prose>
            Your enemy is not the district. It&rsquo;s the gap between the unit
            you bought and the buyer who has to absorb it from you in 2034.
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
            Transport, MRT, and the Thomson-East Coast Line effect
          </h2>
          <Prose>
            TEL Stage 4 opened on 23 June 2024 with eight new East Coast
            stations: Founders&rsquo; Memorial, Tanjong Rhu, Katong Park,
            Tanjong Katong, Marine Parade, Marine Terrace, Siglap, and
            Bayshore.
          </Prose>
          <Prose>
            This is a structural rerating event for D15 and parts of D16. Six of
            those eight stations sit inside or at the edge of D15 — Tanjong
            Rhu, Katong Park, Tanjong Katong, Marine Parade, Marine Terrace,
            and Siglap. The seventh, Bayshore, anchors D16&rsquo;s emerging
            waterfront precinct.
          </Prose>
          <Prose>
            What the TEL adds is direct rail access to the city centre that
            D15 didn&rsquo;t previously have. For decades, D15 was rich in
            lifestyle but transport-poor relative to its prestige — the East
            Coast Parkway moved cars, not commuters. That gap is now closed.
            Tanjong Rhu Residences, the first major GLS launch on the new line
            (525 units), is being priced as a benchmark anchor that will feed
            into surrounding D15 resale comparables for years.
          </Prose>
          <Prose>
            For the established D15 mid-market — projects on Amber Road, Marine
            Parade, Joo Chiat — the TEL effect is a slow upward pull on resale
            valuations rather than an overnight repricing. Buyers price MRT
            proximity into offers; sellers hold firm on lower-floor units they
            would previously have discounted. Over a 5–7 year horizon, the TEL
            will have done more for D15 valuations than any single policy
            change in the last decade.
          </Prose>
          <Prose>
            D16&rsquo;s TEL benefit is concentrated at one station: Bayshore.
            Bayshore MRT (TE24, opened June 2024) sits at the gateway to the
            planned 1,280-unit Bayshore Drive mixed-use development. It is the
            structural reason Bayshore commands a $1,800–$2,100+ PSF band —
            roughly 300–500 PSF above established Bedok. But to repeat the
            earlier point, that market doesn&rsquo;t include the HDB upgrader
            cohort. The Tanah Merah cluster, where the upgrader-relevant D16
            resale supply actually sits, is on the EW4 East-West Line.
            Different line, different network effect, no fresh repricing event.
          </Prose>
          <Prose>
            D18&rsquo;s MRT story is more about future connectivity than
            current rerating. Pasir Ris is at the eastern terminus of the
            East-West Line and will become an interchange when the Cross
            Island Line opens (target 2030). When that happens, Pasir Ris
            becomes a 35-minute commute to Jurong instead of 60 — and the
            Punggol-to-Pasir Ris linkage gets significantly tighter. None of
            that is priced in yet. It&rsquo;s a 2028–2030 catalyst, not a today
            catalyst.
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
            The supply pipeline — and the contrarian read on D18
          </h2>
          <Prose>
            The supply pipeline tells a clear story across the three districts.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">D15: light.</strong>{" "}
            The two anchors are Tanjong Rhu Residences (525 units, GLS, TOP
            2029–2030) and Tembusu Grand (638 units, 4 towers, TOP 2027–2028).
            That&rsquo;s it for material new supply through 2027. D15 resale
            inventory is structurally protected from new launch competition —
            the existing 3,300+ resale units don&rsquo;t have a flood of new
            alternatives undercutting them.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">
              D16: bifurcated.
            </strong>{" "}
            The established Bedok cluster faces moderate supply competition
            from EC launches at the district boundaries, but the bigger story
            is Bayshore. The full Bayshore precinct buildout — roughly 3,000
            private units across Bayshore Drive and adjacent parcels — will
            land between 2028 and 2032. By 2030, D16 will effectively be two
            districts in one: legacy Bedok resale at stable valuations, and
            &ldquo;new Bayshore&rdquo; trading at a 300–800 PSF premium. The
            supply hits the <em className="italic">Bayshore</em> market — not
            the Tanah Merah cluster, which is the upgrader-grade segment.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">D18: heavy.</strong>{" "}
            This is where the supply pipeline noise is loudest. 2026 alone has
            seen Coastal Cabana (748 units, EC, January 2026, $1,734 PSF, 67%
            sold day one) and Rivelle Tampines (572 units, EC, March 2026, the
            first EC ever in Tampines West, 92.5% sold at launch). More than
            half of the planned 18+ 2026 OCR launches will land on this side
            of the island.
          </Prose>
          <Prose>
            The standard read: D18 is at most risk of oversaturation. Resale
            appreciation will be modest. New supply will compete with existing
            inventory.
          </Prose>
          <Prose>
            The contrarian read — and this is the move most upgraders miss —
            is that the same launches creating the supply{" "}
            <em className="italic">also create the future buyer pool.</em>{" "}
            Every EC and new launch in Tampines and Pasir Ris is putting
            another HDB family on the upgrader path five to seven years from
            now. By 2030–2032, when those 2026 EC buyers want to step up to
            private, the natural upgrade target is the older private resale
            inventory in D18 itself. Today&rsquo;s supply problem is
            tomorrow&rsquo;s exit audience.
          </Prose>
          <Prose>
            That doesn&rsquo;t mean D18 is a free pass. It means D18 needs the{" "}
            <em className="italic">right</em> unit — one that differentiates
            from the new launches. A 3-bedroom in a well-managed older project
            with no nearby new supply competing on amenities is fundamentally
            different from a generic 2-bedroom in the middle of a launch
            corridor.
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
            If you&rsquo;re upgrading from an East Singapore HDB, which district
            keeps the most options open?
          </h2>
          <Prose>
            Here&rsquo;s the honest read.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">
              D15 if your budget supports it.
            </strong>{" "}
            D15 has the largest exit audience of the three districts because it
            isn&rsquo;t bound by geography. Buyers come from the West, the
            North, and from outside Singapore. The TEL has solved its
            historical transport gap. Supply pipeline is light through 2027. If
            you can absorb the $2,000+ PSF entry and accept that you&rsquo;re
            buying a smaller unit, D15 keeps the most options open on exit.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">
              D18 for the value play, but only with the right unit.
            </strong>{" "}
            The Punggol-exodus angle is real and structural. The Tampines BTO
            upgrader pool is genuine. CRL connectivity in 2030 is a tailwind.
            But you have to pick the unit carefully — something that holds its
            differentiation against the new-launch flood. A generic 2-bedroom
            in a saturated corridor is a mistake. A well-positioned 3-bedroom
            in a high-liquidity project (Treasure at Tampines is the obvious
            example, but not the only one) lets you participate in the
            upgrader pool without being undercut by every new launch.
          </Prose>
          <Prose>
            <strong className="font-medium text-charcoal">
              D16 only for specific clusters.
            </strong>{" "}
            Tanah Merah for upgraders. Bayshore only if you&rsquo;re buying
            for waterfront lifestyle, not as an HDB upgrader move. Outside
            those two specific situations, D16&rsquo;s supply is thin and the
            buyer pool is narrower than the heartland reputation suggests. The
            &ldquo;default Bedok&rdquo; assumption is wrong here.
          </Prose>
          <Prose>
            The honest verdict isn&rsquo;t a single best district. It&rsquo;s
            that each district matches a specific kind of upgrader. D15 for
            buyers prioritising exit liquidity and willing to pay for it. D18
            for buyers prioritising space and willing to pick the unit
            carefully. D16 for buyers who specifically want a Tanah Merah unit,
            full stop.
          </Prose>
          <Prose>
            The mistake is picking the district based on where you currently
            stay. The right move is picking it based on who buys it from you in
            2034.
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
              Common questions on D15, D16, and D18
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

          {/* ========== Sources ========== */}
          <section className="mt-12 sm:mt-16 text-[12px] sm:text-[13px] text-gray-600 leading-relaxed">
            <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">
              Sources
            </div>
            <p>
              URA Q1 2026 quarterly statistics; PropertyGuru consolidated
              listings (D15 / D16 / D18, accessed Apr 2026); SRX Property
              transaction database; Homejourney transaction analytics
              (Bedokville, Treasure at Tampines, Mandarin Gardens, The Shore
              Residences); EdgeProp launch reports for Vela Bay, Coastal
              Cabana, Rivelle Tampines, Tanjong Rhu Residences, and Tembusu
              Grand; LTA Thomson-East Coast Line Stage 4 opening (June 2024).
              All figures reflect resale transaction or live listing data — no
              new launch pricing has been substituted for resale comparables.
            </p>
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
                href="/guides/east-singapore-hdb-upgrader"
                className="block border border-charcoal bg-paper p-5 sm:p-6 hover:bg-amber/10 transition-colors"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">
                  Step 1 · Context
                </div>
                <div className="font-serif text-charcoal text-[17px] sm:text-[19px] leading-snug mb-2">
                  East Singapore upgrader guide
                </div>
                <div className="text-[13px] sm:text-[14px] text-body leading-relaxed">
                  Market context, financing structures, and timing for D14–18.
                </div>
              </Link>
              <Link
                href="/guides/buy-or-sell-first"
                className="block border border-charcoal bg-paper p-5 sm:p-6 hover:bg-amber/10 transition-colors"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">
                  Step 2 · Sequencing
                </div>
                <div className="font-serif text-charcoal text-[17px] sm:text-[19px] leading-snug mb-2">
                  Buy or sell first?
                </div>
                <div className="text-[13px] sm:text-[14px] text-body leading-relaxed">
                  ABSD, OTP exercise, and the structure that saves five-figure
                  sums.
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
                  10 minutes. Your district, your numbers, your exit audience —
                  mapped.
                </div>
              </Link>
            </div>
          </section>

          {/* ========== Back ========== */}
          <div className="mt-16 sm:mt-20 pt-10 border-t border-charcoal text-center">
            <Link
              href="/guides"
              className="text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-amber-deep hover:text-charcoal transition-colors"
            >
              ← All guides
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
