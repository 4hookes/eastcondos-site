import Image from "next/image";
import PlannerForm from "./PlannerForm";

export default function HdbToCondoPlannerPage() {
  return (
    <div className="bg-charcoal-deep text-cream selection:bg-amber selection:text-charcoal-deep flex flex-col min-h-[100dvh] lg:grid lg:grid-cols-2">
      <div className="relative order-first lg:order-last h-[24dvh] min-h-[130px] lg:h-auto lg:min-h-[100dvh] overflow-hidden bg-charcoal">
        <Image
          src="/images/planner/family-planner.jpg"
          alt="A family at home, looking at the planner on a laptop together"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[50%_27%] lg:object-[50%_40%]"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 sm:px-12 xl:px-16 pt-4 lg:pt-10">
        <p className="font-serif text-[20px] lg:text-[24px] tracking-[-0.02em]">EastCondos</p>

        <div className="my-auto py-4 lg:py-8">
          <h1 className="font-sans font-extralight text-[36px] sm:text-[56px] xl:text-[64px] 2xl:text-[76px] leading-[1.04] tracking-[-0.035em] [text-wrap:balance]">
            A condo for $500 cash a month?
          </h1>
          <p className="mt-3 lg:mt-5 lg:max-w-[560px] text-[16px] sm:text-[20px] leading-[1.45]">
            See if it works for your family, with our free Google Sheet. We send your own copy on WhatsApp.
          </p>
          <div className="mt-4 lg:mt-8 lg:max-w-[600px]">
            <PlannerForm id="planner" />
          </div>
        </div>

        <p className="pb-4 lg:pb-8 text-[14px] leading-[1.4] text-[#CBC8C0]">
          Elfi Abdullah, CEA R040487C. ERA Singapore, L3002382K.{" "}
          <a href="/privacy" className="underline underline-offset-2 text-cream">
            Privacy policy
          </a>
        </p>
      </div>
    </div>
  );
}
