// ─────────────────────────────────────────────────────────────────────────
// JOURNAL REGISTRY — the SINGLE place every journal article is registered.
//
// Next static export cannot import JSON by a runtime slug variable, so each
// article must be statically imported once. This file is that one place.
// BOTH the index page (app/journal/page.tsx) AND the detail page
// (app/journal/[slug]/page.tsx) import `articleMap` from here — so they can
// never drift out of sync again (the old bug: the index had its own hardcoded
// list of 3 and silently omitted the rest).
//
// TO ADD A NEW ARTICLE (the ONLY 3 steps):
//   1. content/journal/<slug>.json          — the article
//   2. content/journal/index.json           — add <slug> to slugs[] (order + featuredSlug)
//   3. HERE                                  — add the import + one articleMap line
// That's it. The index page, the detail page, the sitemap, and the ordering
// all read from these two files automatically. Miss step 3 → the card silently
// won't render (filtered out), so keep this list in step with index.json.
// ─────────────────────────────────────────────────────────────────────────
import indexData from "./index.json";
import canAHdbFlatBecome5Million from "./can-a-hdb-flat-become-5-million.json";
import isLentorOversupplied from "./is-lentor-oversupplied.json";
import the69MillionQuestion from "./the-69-million-question.json";
import theMarketGotPicky from "./the-market-got-picky.json";
import buyTheBlueprint from "./buy-the-blueprint.json";
import theWaitingTrap from "./the-waiting-trap.json";
import yesterdaysLaunchPriceEarlierPhasePlay from "./yesterdays-launch-price-earlier-phase-play.json";
import yourHdbLooksYoungInsideItsOld from "./your-hdb-looks-young-inside-its-old.json";

// Typed as `unknown` so each consumer casts to its own view (JournalArticle /
// JournalSummary) — the registry stays decoupled from the renderer's types.
export const articleMap: Record<string, unknown> = {
  "can-a-hdb-flat-become-5-million": canAHdbFlatBecome5Million,
  "is-lentor-oversupplied": isLentorOversupplied,
  "the-69-million-question": the69MillionQuestion,
  "the-market-got-picky": theMarketGotPicky,
  "buy-the-blueprint": buyTheBlueprint,
  "the-waiting-trap": theWaitingTrap,
  "yesterdays-launch-price-earlier-phase-play": yesterdaysLaunchPriceEarlierPhasePlay,
  "your-hdb-looks-young-inside-its-old": yourHdbLooksYoungInsideItsOld,
};

// Ordered list of registered slugs, driven by index.json (any slug in
// index.json that isn't imported above is skipped rather than 404-ing).
export const journalSlugs: string[] = (indexData.slugs as string[]).filter(
  (slug) => articleMap[slug],
);

// The cover-story slug, honouring index.json's featuredSlug (falls back to the
// first registered slug if unset or unregistered).
const declaredFeatured = (indexData as { featuredSlug?: string }).featuredSlug;
export const featuredSlug: string =
  declaredFeatured && articleMap[declaredFeatured]
    ? declaredFeatured
    : journalSlugs[0];
