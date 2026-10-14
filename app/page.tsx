import HomeHero from "@/components/home/HomeHero";
import FlawMethod from "@/components/home/FlawMethod";
import DeepDives from "@/components/home/DeepDives";
import FitCheckOffer from "@/components/home/FitCheckOffer";
import EastOnly from "@/components/home/EastOnly";
import StoryFeature from "@/components/home/StoryFeature";
import HomeFAQ from "@/components/home/HomeFAQ";
import FinalCTA from "@/components/home/FinalCTA";
import StickyCTA from "@/components/editorial/StickyCTA";
import faqData from "@/content/home-faq.json";

// Homepage = the North Star funnel in page form (re-locked 2026-09-27):
// free secret (flaw-finding) -> catch (condo deep-dives) -> door (7-min
// Fit-Check) -> filter (East condos only) -> proof -> close.
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.items.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
      <HomeHero />
      <FlawMethod />
      <DeepDives />
      <FitCheckOffer />
      <EastOnly />
      <StoryFeature />
      <HomeFAQ />
      <FinalCTA />
      <StickyCTA />
    </>
  );
}
