import HeroCover from "@/components/editorial/HeroCover";
import IndexRibbon from "@/components/editorial/IndexRibbon";
import NumbersStory from "@/components/editorial/NumbersStory";
import ChapterArticle from "@/components/editorial/ChapterArticle";
import MethodGrid from "@/components/editorial/MethodGrid";
import PhotoBand from "@/components/editorial/PhotoBand";
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
      <NumbersStory />
      <ChapterArticle />
      <MethodGrid />
      <PhotoBand
        src="/broll/family-window.jpg"
        position="center 30%"
        label="The point of all of it"
        line={
          <>
            A home you can hold through anything &mdash; <em>not</em> a
            payment that owns you.
          </>
        }
        attribution="Why the model comes before the property"
      />
      <StoriesShelf />
      <ByTheNumbers />
      <QuizBand />
      <EditorialFAQ />
    </>
  );
}
