import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrendingUp, Clock, Home, Quote } from "lucide-react";
import indexData from "@/content/case-studies/index.json";
import youngCoupleTampines from "@/content/case-studies/young-couple-tampines.json";

type CaseStudy = typeof youngCoupleTampines;

const caseStudyMap: Record<string, CaseStudy> = {
  "young-couple-tampines": youngCoupleTampines,
};

export async function generateStaticParams() {
  return indexData.slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyMap[slug];

  if (!study) {
    return { title: "Not Found – eastcondos.sg" };
  }

  return {
    title: `${study.title} – eastcondos.sg`,
    description: study.description,
    openGraph: {
      title: `${study.title} – eastcondos.sg`,
      description: study.description,
      type: "article",
      url: `https://eastcondos.sg/case-studies/${slug}`,
      images: study.ogImage ? [{ url: study.ogImage }] : [],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudyMap[slug];

  if (!study) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.description,
    url: `https://eastcondos.sg/case-studies/${study.slug}`,
    author: {
      "@type": "Person",
      name: "Elfi",
      url: "https://eastcondos.sg/team",
    },
    publisher: {
      "@type": "Organization",
      name: "EastCondos.sg",
      url: "https://eastcondos.sg",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero */}
      <section className="bg-sage-dark py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <a
            href="/case-studies"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-8 transition-colors duration-200"
          >
            ← Back to Success Stories
          </a>

          <span className="inline-block px-3 py-1 bg-sage/30 text-white text-xs font-semibold rounded-full mb-4">
            {study.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3 leading-tight">
            {study.title}
          </h1>

          <p className="text-2xl md:text-3xl font-serif font-bold text-gold">
            {study.headline}
          </p>
        </div>
      </section>

      {/* 2. Stats bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-0 md:divide-x md:divide-gray-200">
            <div className="flex items-center gap-3 md:pr-8">
              <div className="w-10 h-10 bg-sage-light rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-sage" />
              </div>
              <div>
                <p className="text-xs text-sage font-semibold uppercase tracking-wide">
                  Total Savings
                </p>
                <p className="text-xl font-bold text-navy">{study.stats.savings}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:px-8">
              <div className="w-10 h-10 bg-sage-light rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-sage" />
              </div>
              <div>
                <p className="text-xs text-sage font-semibold uppercase tracking-wide">
                  Timeline
                </p>
                <p className="text-xl font-bold text-navy">{study.stats.timeline}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:pl-8">
              <div className="w-10 h-10 bg-sage-light rounded-full flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5 text-sage" />
              </div>
              <div>
                <p className="text-xs text-sage font-semibold uppercase tracking-wide">
                  Upgrade
                </p>
                <p className="text-lg font-bold text-navy leading-tight">
                  {study.stats.propertyType}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Story content */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Client avatar */}
          <div className="flex items-center gap-3 mb-10">
            {study.client.photo ? (
              <img
                src={study.client.photo}
                alt={study.client.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {study.client.initials}
              </div>
            )}
            <div>
              <p className="font-bold text-navy">{study.client.name}</p>
              <p className="text-sm text-body">{study.client.profile}</p>
            </div>
          </div>

          <div className="space-y-10">
            {/* Challenge */}
            <div>
              <h2 className="text-xl font-serif font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-sage rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  1
                </span>
                The Challenge
              </h2>
              <p className="text-body leading-relaxed pl-9">
                {study.sections.challenge}
              </p>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-xl font-serif font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-sage rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  2
                </span>
                The Solution
              </h2>
              <p className="text-body leading-relaxed pl-9">
                {study.sections.solution}
              </p>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-xl font-serif font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-gold rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  3
                </span>
                The Results
              </h2>
              <p className="text-body leading-relaxed pl-9">
                {study.sections.results}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Before/After */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-serif font-bold text-navy mb-8 text-center">
            Before &amp; After
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="bg-sage-light rounded-xl p-6 border border-sage/20">
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-3">
                Before
              </p>
              <h3 className="text-xl font-bold text-navy mb-4">
                {study.beforeAfter.before.property}
              </h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-body">Value</dt>
                  <dd className="text-sm font-semibold text-navy">
                    {study.beforeAfter.before.value}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-sage/20 pt-3">
                  <dt className="text-sm text-body">Monthly Payment</dt>
                  <dd className="text-sm font-semibold text-navy">
                    {study.beforeAfter.before.monthlyPayment}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-sage/20 pt-3">
                  <dt className="text-sm text-body">Size</dt>
                  <dd className="text-sm font-semibold text-navy">
                    {study.beforeAfter.before.size}
                  </dd>
                </div>
              </dl>
            </div>

            {/* After */}
            <div className="bg-navy rounded-xl p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-3">
                After
              </p>
              <h3 className="text-xl font-bold text-white mb-4">
                {study.beforeAfter.after.property}
              </h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-white/70">Value</dt>
                  <dd className="text-sm font-semibold text-gold">
                    {study.beforeAfter.after.value}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3">
                  <dt className="text-sm text-white/70">Monthly Payment</dt>
                  <dd className="text-sm font-semibold text-white">
                    {study.beforeAfter.after.monthlyPayment}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3">
                  <dt className="text-sm text-white/70">Size</dt>
                  <dd className="text-sm font-semibold text-white">
                    {study.beforeAfter.after.size}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonial */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <blockquote className="border-l-4 border-gold pl-6">
            <div className="flex items-start gap-3 mb-4">
              <Quote className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
              <p className="text-xl md:text-2xl font-serif italic text-navy leading-relaxed">
                &ldquo;{study.testimonial.quote}&rdquo;
              </p>
            </div>
            <footer className="pl-11">
              <cite className="not-italic text-sm font-semibold text-sage">
                — {study.testimonial.attribution}
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="bg-sage-light py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">
            Could this be your story?
          </h2>
          <p className="text-body text-lg mb-8 leading-relaxed">
            Find out if you qualify for a zero-cash-outlay upgrade. Get a free
            personalised strategy from Elfi today.
          </p>
          <a href="/calculator" className="btn-primary">
            Get Your Free Strategy
          </a>
        </div>
      </section>
    </>
  );
}
