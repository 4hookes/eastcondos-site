"use client";

import { useEffect, useMemo, useState } from "react";

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SB_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * /challenge — The Elfi Division's live weekly challenge scoreboard.
 *
 * Fully public by design: scoreboard for the team, shop window for everyone
 * else. Data is Maria's live ledger, mirrored to Supabase (`challenge_board`)
 * by challenge-sync on the VPS; legacy stats live in `challenge_meta`.
 * Client-rendered because the site is a static export.
 *
 * `?bare=1` strips the site chrome (navbar/footer) via the existing
 * `division-bare` class so Maria's WhatsApp snapshots come out clean.
 *
 * House rules baked in: no client names ever; the steak fund reads as
 * culture, never as a shaming wall.
 */

interface Board {
  week_label: string;
  updated_at: string;
  data: {
    goal: Record<string, number>;
    agents: Record<string, Record<string, number>>;
  };
}

interface MetaRow {
  key: string;
  value: Record<string, unknown>;
}

const GOAL_ORDER = ["ad_creative", "new_launch_video", "home_tour", "messages", "appointment"];
const GOAL_LABELS: Record<string, string> = {
  ad_creative: "Ad Creative",
  new_launch_video: "New Launch Video",
  home_tour: "Home Tour",
  messages: "Reach-outs",
  appointment: "Appointment",
};

function goalLabel(key: string): string {
  return GOAL_LABELS[key] ?? key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Days left in the challenge week (Mon–Sun), Singapore time, counting today. */
function daysLeftSGT(): number {
  const sgNow = new Date(Date.now() + 8 * 3600_000);
  const isoDay = (sgNow.getUTCDay() + 6) % 7; // Mon=0 … Sun=6
  return 7 - isoDay;
}

function completion(agent: Record<string, number>, goal: Record<string, number>): number {
  const keys = Object.keys(goal);
  if (!keys.length) return 0;
  const sum = keys.reduce((acc, k) => acc + Math.min((agent[k] ?? 0) / (goal[k] || 1), 1), 0);
  return sum / keys.length;
}

export default function ChallengePage() {
  const [board, setBoard] = useState<Board | null>(null);
  const [meta, setMeta] = useState<Record<string, Record<string, unknown>>>({});
  const [error, setError] = useState<string | null>(null);

  // ?bare=1 → strip chrome for clean snapshots (reuses the division CSS hook).
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("bare") !== "1") return;
    const root = document.documentElement;
    root.classList.add("division-bare");
    return () => root.classList.remove("division-bare");
  }, []);

  useEffect(() => {
    if (!SB_URL || !SB_ANON) {
      setError("Configuration missing.");
      return;
    }
    const headers = { apikey: SB_ANON, Authorization: `Bearer ${SB_ANON}` };
    const load = () => {
      fetch(`${SB_URL}/rest/v1/challenge_board?id=eq.current&select=week_label,updated_at,data`, { headers })
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`load ${r.status}`))))
        .then((rows: Board[]) => rows[0] && setBoard(rows[0]))
        .catch((e: Error) => setError(e.message));
      fetch(`${SB_URL}/rest/v1/challenge_meta?select=key,value`, { headers })
        .then((r) => (r.ok ? r.json() : []))
        .then((rows: MetaRow[]) =>
          setMeta(Object.fromEntries(rows.map((m) => [m.key, m.value]))),
        )
        .catch(() => {});
    };
    load();
    const t = setInterval(load, 60_000); // stays fresh while open / being snapshotted
    return () => clearInterval(t);
  }, []);

  const ranked = useMemo(() => {
    if (!board) return [];
    const { goal, agents } = board.data;
    return Object.entries(agents)
      .map(([name, counts]) => ({ name, counts, pct: completion(counts, goal) }))
      .sort((a, b) => b.pct - a.pct);
  }, [board]);

  const goalKeys = useMemo(() => {
    if (!board) return [];
    const present = Object.keys(board.data.goal);
    return [...GOAL_ORDER.filter((k) => present.includes(k)), ...present.filter((k) => !GOAL_ORDER.includes(k))];
  }, [board]);

  const days = daysLeftSGT();
  const leader = ranked[0];
  const tagline = (meta.tagline?.text as string) ?? "Inputs drive outcomes.";

  return (
    <main className="bg-cream min-h-screen">
      {/* ====== Masthead ====== */}
      <section className="max-w-broadsheet mx-auto px-5 sm:px-10 pt-12 sm:pt-16 pb-8">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
            The Elfi Division · Weekly Challenge
          </span>
        </div>
        <h1 className="font-serif text-charcoal" style={{ fontSize: "clamp(2.4rem, 4.4vw, 4rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}>
          The work, <em className="text-amber-deep not-italic font-serif italic">in public.</em>
        </h1>
        <p className="font-serif italic text-charcoal/80 mt-4 max-w-xl" style={{ fontSize: "1.25rem", lineHeight: 1.5 }}>
          {tagline}
        </p>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-2 border-t border-charcoal pt-4">
          <div className="text-charcoal font-medium">{board?.week_label ?? "—"}</div>
          <div className="text-sm text-gray-600">
            {days === 1 ? "Final day" : `${days} days left`} · closes Sunday
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="inline-block w-2 h-2 rounded-full bg-amber animate-pulse" />
            Live — updates as the team submits
          </div>
        </div>
      </section>

      {/* ====== The Board ====== */}
      <section className="max-w-broadsheet mx-auto px-5 sm:px-10 pb-14">
        {error && (
          <div className="border border-charcoal bg-paper p-6 text-body">
            The scoreboard is catching its breath — try again in a minute.
          </div>
        )}
        {!board && !error && <div className="text-gray-600 py-10">Loading the board…</div>}

        {board && (
          <div className="border border-charcoal bg-cream overflow-x-auto">
            {/* header row */}
            <div
              className="grid items-end border-b border-charcoal min-w-[640px]"
              style={{ gridTemplateColumns: `minmax(120px,1.4fr) repeat(${goalKeys.length}, minmax(86px,1fr))` }}
            >
              <div className="p-3 sm:p-4 text-[10px] uppercase tracking-[0.22em] text-gray-600">Agent</div>
              {goalKeys.map((k) => (
                <div key={k} className="p-3 sm:p-4 text-[10px] uppercase tracking-[0.18em] text-gray-600 border-l border-charcoal/20">
                  {goalLabel(k)}
                  <span className="block text-amber-deep mt-0.5 normal-case tracking-normal">
                    target {board.data.goal[k]}
                  </span>
                </div>
              ))}
            </div>

            {ranked.map(({ name, counts, pct }, i) => {
              const done = pct >= 1;
              return (
                <div
                  key={name}
                  className={`grid items-center min-w-[640px] ${i < ranked.length - 1 ? "border-b border-charcoal/20" : ""} ${done ? "bg-paper" : ""}`}
                  style={{ gridTemplateColumns: `minmax(120px,1.4fr) repeat(${goalKeys.length}, minmax(86px,1fr))` }}
                >
                  <div className="p-3 sm:p-4">
                    <div className="font-serif text-charcoal text-xl sm:text-2xl leading-none">
                      {name}
                      {i === 0 && pct > 0 && (
                        <span className="ml-2 align-middle text-[9px] uppercase tracking-[0.22em] text-amber-deep border border-amber-deep px-1.5 py-0.5">
                          leading
                        </span>
                      )}
                    </div>
                    <div className="mt-2 h-px w-full bg-charcoal/15 relative">
                      <span className="absolute left-0 top-0 h-px bg-amber-deep" style={{ width: `${Math.round(pct * 100)}%` }} />
                    </div>
                    <div className="text-[10px] text-gray-600 mt-1">{Math.round(pct * 100)}% of the week</div>
                  </div>

                  {goalKeys.map((k) => {
                    const c = counts[k] ?? 0;
                    const t = board.data.goal[k] || 1;
                    const hit = c >= t;
                    return (
                      <div key={k} className="p-3 sm:p-4 border-l border-charcoal/10">
                        {t === 1 ? (
                          <span className={`inline-block w-4 h-4 border ${hit ? "bg-amber-deep border-amber-deep" : "border-charcoal/40"}`} />
                        ) : (
                          <div>
                            <span className={`font-medium ${hit ? "text-amber-deep" : "text-charcoal"}`}>{c}</span>
                            <span className="text-gray-600">/{t}</span>
                            <div className="mt-1.5 h-1 bg-charcoal/10">
                              <div className="h-1 bg-amber-deep" style={{ width: `${Math.min((c / t) * 100, 100)}%` }} />
                            </div>
                          </div>
                        )}
                        {t === 1 && c > t && <span className="ml-2 text-[11px] text-amber-deep align-top">×{c}</span>}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {board && leader && (
          <p className="mt-4 text-sm text-gray-600">
            Updated{" "}
            {new Date(board.updated_at).toLocaleString("en-SG", {
              timeZone: "Asia/Singapore",
              weekday: "short",
              hour: "numeric",
              minute: "2-digit",
            })}{" "}
            SGT.
          </p>
        )}
      </section>

      {/* ====== The Record (legacy) ====== */}
      <section className="bg-charcoal grain text-cream">
        <div className="max-w-broadsheet mx-auto px-5 sm:px-10 py-14 sm:py-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-amber" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber">The record so far</span>
          </div>
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 3.6vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Running since {(meta.started_on?.label as string) ?? "March 2026"}.
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 mt-10 border border-cream/25">
            <div className="p-5 sm:p-7 border-b lg:border-b-0 border-r border-cream/25">
              <div className="font-serif text-amber" style={{ fontSize: "clamp(2.2rem,4vw,3.4rem)", lineHeight: 1 }}>
                {(meta.phase1?.completion as string) ?? "100%"}
              </div>
              <div className="text-sm text-cream/70 mt-2">
                completion, first {(meta.phase1?.weeks as number) ?? 8} weeks — {(meta.phase1?.note as string) ?? "every person, every week"}
              </div>
            </div>
            <div className="p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-cream/25">
              <div className="font-serif text-amber" style={{ fontSize: "clamp(2.2rem,4vw,3.4rem)", lineHeight: 1 }}>
                {(meta.videos_shipped?.count as string) ?? "120+"}
              </div>
              <div className="text-sm text-cream/70 mt-2">{(meta.videos_shipped?.label as string) ?? "videos shipped"}</div>
            </div>
            <div className="p-5 sm:p-7 border-r border-cream/25">
              <div className="font-serif text-amber" style={{ fontSize: "clamp(2.2rem,4vw,3.4rem)", lineHeight: 1 }}>
                3<span className="text-cream/60 text-2xl align-top">/5</span>
              </div>
              <div className="text-sm text-cream/70 mt-2">{(meta.era_top10?.label as string) ?? "in ERA's Top 10 Achievers, April 2026"}</div>
            </div>
            <div className="p-5 sm:p-7">
              <div className="font-serif text-amber" style={{ fontSize: "clamp(2.2rem,4vw,3.4rem)", lineHeight: 1 }}>
                ${String((meta.steak_fund?.total_paid as number) ?? 0)}
              </div>
              <div className="text-sm text-cream/70 mt-2">
                in the steak fund — {(meta.steak_fund?.label as string) ?? "nobody has paid in yet"}
              </div>
            </div>
          </div>

          <p className="mt-8 text-cream/60 text-sm max-w-2xl">
            The deal: finish the week or feed the steak fund. The reward is a steak dinner — and a pipeline that
            doesn&apos;t go quiet.
          </p>
        </div>
      </section>

      {/* ====== Footer line ====== */}
      <section className="max-w-broadsheet mx-auto px-5 sm:px-10 py-10">
        <p className="text-sm text-gray-600">
          The Elfi Division is the team behind{" "}
          <a href="/" className="text-charcoal underline decoration-amber-deep/40 underline-offset-4">
            EastCondos.sg
          </a>
          . Scoreboard maintained live by Maria, the division&apos;s coordinator.
        </p>
      </section>
    </main>
  );
}
