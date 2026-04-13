import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import PainPoints from "@/components/PainPoints";
import TheDifference from "@/components/TheDifference";
import HowItWorks from "@/components/HowItWorks";
import Results from "@/components/Results";
import PBDMethod from "@/components/PBDMethod";
import QuizBanner from "@/components/QuizBanner";
import FAQWithCTA from "@/components/FAQWithCTA";
import faqData from "@/content/faq.json";

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
      <Hero />
      <TrustBar />
      <PainPoints />
      <TheDifference />
      <HowItWorks />
      <Results />
      <PBDMethod />
      <QuizBanner />
      <FAQWithCTA />
    </>
  );
}
