import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import WhyMe from "@/components/WhyMe";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import TeamPreview from "@/components/TeamPreview";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
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
