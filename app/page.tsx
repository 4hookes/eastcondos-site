import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import WhyMe from "@/components/WhyMe";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import TeamPreview from "@/components/TeamPreview";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
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
            "mainEntity": faqData.items.map((item) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
              },
            })),
          }),
        }}
      />
      <Hero />
      <PainPoints />
      <WhyMe />
      <HowItWorks />
      <Testimonials />
      <TeamPreview />
      <About />
      <FAQ />
      <CTA />
    </>
  );
}
