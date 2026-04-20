import HeroCover from "@/components/editorial/HeroCover";
import IndexRibbon from "@/components/editorial/IndexRibbon";
import ChapterArticle from "@/components/editorial/ChapterArticle";
import MethodGrid from "@/components/editorial/MethodGrid";
import FounderQuote from "@/components/editorial/FounderQuote";
import StoriesShelf from "@/components/editorial/StoriesShelf";
import ByTheNumbers from "@/components/editorial/ByTheNumbers";
import QuizBand from "@/components/editorial/QuizBand";
import EditorialFAQ from "@/components/editorial/EditorialFAQ";
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
      <HeroCover />
      <IndexRibbon />
      <ChapterArticle />
      <MethodGrid />
      <FounderQuote
        quote="I would rather lose a sale today than have a family lose ten years to a building they should never have bought. The model exists so that decision is not even close."
        cite="— Elfi Abdullah, Founder · The Elfi Division, ERA Singapore"
      />
      <StoriesShelf />
      <ByTheNumbers />
      <QuizBand />
      <EditorialFAQ />
    </>
  );
}
