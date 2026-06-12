import type { Metadata } from "next";
import Opener from "@/components/editorial/about/Opener";
import FeatureSpread from "@/components/editorial/about/FeatureSpread";
import StatsRibbon from "@/components/editorial/about/StatsRibbon";
import ManifestoGrid from "@/components/editorial/about/ManifestoGrid";
import FounderQuote from "@/components/editorial/FounderQuote";
import PhotoBand from "@/components/editorial/PhotoBand";
import TeamGridEditorial from "@/components/editorial/about/TeamGridEditorial";
import CenterCTA from "@/components/editorial/about/CenterCTA";
import LastUpdated from "@/components/editorial/LastUpdated";

const LAST_UPDATED = "2026-04-25";

export const metadata: Metadata = {
  title: "About Elfi Abdullah | EastCondos.sg",
  description:
    "Depth over breadth. Trust over volume. Meet Elfi Abdullah and the team behind EastCondos.sg — Singapore's data-first condo investment advisory specialising in Districts 14–18.",
  other: {
    "article:modified_time": LAST_UPDATED,
  },
};

export default function AboutPage() {
  return (
    <>
      <Opener />
      <div className="max-w-broadsheet mx-auto px-5 sm:px-10 py-5 sm:py-6 border-b border-dotted border-[#c9bfa3]">
        <LastUpdated date={LAST_UPDATED} align="center" />
      </div>
      <FeatureSpread />
      <StatsRibbon />
      <ManifestoGrid />
      <PhotoBand
        src="/broll/district-aerial.jpg"
        position="center 55%"
        label="Principle 02, from the air"
        line={
          <>
            Five districts, known street by street &mdash; <em>not</em> the
            whole island in passing.
          </>
        }
        attribution="Districts 14–18 · East Singapore"
      />
      <FounderQuote
        quote="The eleven-factor model exists because two early clients in 2014 made decisions I could have prevented. I have not made that mistake since."
        cite="— Elfi Abdullah, Founder · The Elfi Division, ERA Singapore"
      />
      <TeamGridEditorial />
      <CenterCTA />
    </>
  );
}
