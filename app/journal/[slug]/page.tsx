import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import indexData from "@/content/journal/index.json";
import hdbBotox from "@/content/journal/your-hdb-looks-young-inside-its-old.json";
import JournalArticleRenderer, {
  type JournalBlock,
} from "@/components/editorial/JournalArticleRenderer";

type JournalArticle = {
  slug: string;
  title: string;
  titleHtml: string;
  standfirst: string;
  kicker: string;
  publishDate: string;
  dateModified?: string;
  readingTimeMinutes: number;
  ogImage: string;
  coverImage?: string;
  coverImageAlt?: string;
  coverImageCaption?: string;
  excerpt: string;
  author: { name: string; role: string; portrait?: string };
  topicCluster: string;
  framework?: { name: string; id: string };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl: string;
  };
  body: JournalBlock[];
  relatedSlugs?: string[];
};

const articleMap: Record<string, JournalArticle> = {
  "your-hdb-looks-young-inside-its-old": hdbBotox as JournalArticle,
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
  const article = articleMap[slug];
  if (!article) return { title: "Not Found — EastCondos.sg" };

  return {
    title: article.seo.metaTitle,
    description: article.seo.metaDescription,
    keywords: article.seo.keywords,
    alternates: { canonical: article.seo.canonicalUrl },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: article.seo.canonicalUrl,
      publishedTime: article.publishDate,
      authors: [article.author.name],
      images: article.ogImage ? [{ url: article.ogImage }] : [],
    },
  };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleMap[slug];
  if (!article) notFound();

  const dateModified = article.dateModified || article.publishDate;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: article.seo.canonicalUrl,
    datePublished: article.publishDate,
    dateModified,
    author: {
      "@type": "Person",
      name: article.author.name,
      url: "https://eastcondos.sg/about",
    },
    publisher: {
      "@type": "Organization",
      name: "EastCondos.sg",
      url: "https://eastcondos.sg",
    },
    image: article.ogImage,
    mainEntityOfPage: article.seo.canonicalUrl,
  };

  // Auto-derive TOC from level-2 headings
  const toc = article.body
    .filter((b): b is Extract<JournalBlock, { type: "heading" }> => b.type === "heading" && b.level === 2)
    .map((h) => ({ number: h.number, text: h.text }));

  // Collect FAQ items across any faq blocks → emit a single FAQPage graph node
  const faqItems = article.body.flatMap((b) =>
    b.type === "faq" ? b.items : []
  );

  const jsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@graph": [
            articleSchema,
            {
              "@type": "FAQPage",
              mainEntity: faqItems.map((it) => ({
                "@type": "Question",
                name: it.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: it.answer,
                },
              })),
            },
          ],
        }
      : articleSchema;

  const wasUpdated = dateModified !== article.publishDate;

  return (
    <div className="bg-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============ MASTHEAD ============ */}
      <section className="border-b border-charcoal max-w-broadsheet mx-auto px-5 sm:px-10 py-12 sm:py-20">
        <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
          <span className="w-5 sm:w-8 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep font-medium">
            {article.kicker}
          </span>
        </div>

        <h1
          className="font-serif text-charcoal mb-5 sm:mb-7"
          style={{
            fontSize: "clamp(2.1rem, 5.4vw, 4.2rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.028em",
            maxWidth: "22ch",
          }}
          dangerouslySetInnerHTML={{
            __html: article.titleHtml.replace(
              /<em>/g,
              '<em class="italic text-amber-deep">'
            ),
          }}
        />

        <p
          className="font-serif italic text-charcoal text-[18px] sm:text-[22px] leading-snug mb-8 sm:mb-10"
          style={{ maxWidth: "46ch" }}
        >
          {article.standfirst}
        </p>

        <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-2 pt-5 border-t border-dotted border-[#c9bfa3] text-[12px] sm:text-[13px] text-gray-600">
          <span className="font-serif text-charcoal">
            By <span className="font-medium">{article.author.name}</span>
          </span>
          <span className="hidden sm:inline text-amber-deep">·</span>
          <span className="italic font-serif">{article.author.role}</span>
          <span className="hidden sm:inline text-amber-deep">·</span>
          <span className="uppercase tracking-[0.18em] text-amber-deep">
            {formatDate(article.publishDate)}
          </span>
          <span className="hidden sm:inline text-amber-deep">·</span>
          <span className="uppercase tracking-[0.18em] text-amber-deep">
            {article.readingTimeMinutes} min read
          </span>
          {wasUpdated && (
            <>
              <span className="hidden sm:inline text-amber-deep">·</span>
              <span
                className="uppercase tracking-[0.18em] text-charcoal"
                title={`Last updated ${formatDate(dateModified)}`}
              >
                Updated {formatDate(dateModified)}
              </span>
            </>
          )}
        </div>
      </section>

      {/* ============ HERO COVER IMAGE ============ */}
      {article.coverImage && (
        <figure className="max-w-broadsheet mx-auto px-5 sm:px-10 pt-10 sm:pt-16">
          <div
            className="relative w-full border border-charcoal overflow-hidden bg-paper"
            style={{ aspectRatio: "16 / 9" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverImage}
              alt={article.coverImageAlt || article.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          {article.coverImageCaption && (
            <figcaption className="mt-3 sm:mt-4 pt-3 border-t border-dotted border-[#c9bfa3] flex items-start justify-between gap-4 sm:gap-6">
              <span className="flex-1 text-[12px] sm:text-[13px] italic font-serif text-gray-600 leading-snug">
                {article.coverImageCaption}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-amber-deep font-medium flex-shrink-0 pt-0.5">
                The Journal · Cover
              </span>
            </figcaption>
          )}
        </figure>
      )}

      {/* ============ ARTICLE BODY (with marginalia TOC on wide screens) ============ */}
      <main className="max-w-broadsheet mx-auto px-5 sm:px-10 py-12 sm:py-20">
        <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-16">
          {/* Marginalia TOC — hidden on mobile */}
          <aside className="hidden md:block">
            <div className="sticky top-24">
              <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-4 font-medium">
                In this issue
              </div>
              <ol className="list-none space-y-2.5">
                {toc.map((t) => (
                  <li
                    key={t.text}
                    className="pb-2.5 border-b border-dotted border-[#c9bfa3] text-[13px] leading-snug"
                  >
                    {t.number && (
                      <span className="font-serif text-amber-deep mr-2.5">
                        {t.number}.
                      </span>
                    )}
                    <span className="text-body">{t.text}</span>
                  </li>
                ))}
              </ol>
              {article.framework && (
                <div className="mt-10 pt-6 border-t border-charcoal">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2 font-medium">
                    PBD™ Framework
                  </div>
                  <div
                    className="font-serif text-charcoal text-[17px] leading-snug"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {article.framework.name}
                  </div>
                </div>
              )}
            </div>
          </aside>

          <article>
            <JournalArticleRenderer body={article.body} />
          </article>
        </div>

        {/* ============ Back to journal ============ */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-charcoal text-center">
          <Link
            href="/journal"
            className="text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-amber-deep hover:text-charcoal transition-colors"
          >
            ← Back to The Journal
          </Link>
        </div>
      </main>
    </div>
  );
}
