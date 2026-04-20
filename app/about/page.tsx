import type { Metadata } from "next";
import Opener from "@/components/editorial/about/Opener";
import FeatureSpread from "@/components/editorial/about/FeatureSpread";
import StatsRibbon from "@/components/editorial/about/StatsRibbon";
import ManifestoGrid from "@/components/editorial/about/ManifestoGrid";
import FounderQuote from "@/components/editorial/FounderQuote";
import TeamGridEditorial from "@/components/editorial/about/TeamGridEditorial";
import CenterCTA from "@/components/editorial/about/CenterCTA";

export const metadata: Metadata = {
  title: "About Elfi Abdullah | EastCondos.sg",
  description:
    "Depth over breadth. Trust over volume. Meet Elfi Abdullah and the team behind EastCondos.sg — Singapore's data-first condo investment advisory specialising in Districts 14–18.",
};

export default function AboutPage() {
  return (
    <>
      <Opener />
      <FeatureSpread />
      <StatsRibbon />
      <ManifestoGrid />
      <FounderQuote
        quote="The eleven-factor model exists because two early clients in 2014 made decisions I could have prevented. I have not made that mistake since."
        cite="— Elfi Abdullah, Founder · The Elfi Division, ERA Singapore"
      />
      <TeamGridEditorial />
      <CenterCTA />
    </>
  );
}
