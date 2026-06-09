"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import LoginForm from "./LoginForm";

const AUTH_KEY = "ec_division_auth_v1";
const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SB_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
// Reuse the team-library shared password so there's nothing new to remember.
const EXPECTED_PW = process.env.NEXT_PUBLIC_TEAM_LIBRARY_PASSWORD ?? "";

/* ------------------------------------------------------------------ */
/* Roster                                                              */
/* ------------------------------------------------------------------ */
type Member = { slug: string; name: string; initials: string; ig: string };
const TEAM: Member[] = [
  { slug: "elfi", name: "Elfi", initials: "El", ig: "elfi.abd" },
  { slug: "jeffri", name: "Jeffri", initials: "Je", ig: "jnatawate" },
  { slug: "syai", name: "Syai", initials: "Sy", ig: "syaihariss" },
  { slug: "faathimah", name: "Faathimah", initials: "Fa", ig: "agentfaat" },
  { slug: "rizqin", name: "Rizqin", initials: "Ri", ig: "rizqinadam" },
];
const MEMBER = Object.fromEntries(TEAM.map((m) => [m.slug, m]));

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
type DivEvent = {
  id: string;
  title: string;
  event_date: string;
  starts_at: string | null;
  ends_at: string | null;
  location: string | null;
  event_type: string;
  notes: string | null;
};
type Attendance = { event_id: string; member: string; status: string; note: string | null };
type Activity = {
  member: string;
  week_start: string;
  posts_count: number;
  posts_30d: number | null;
  followers: number | null;
};
type Meeting = {
  id: string;
  title: string;
  meeting_date: string;
  meeting_type: string;
  transcript_url: string | null;
  recording_url: string | null;
  learnings: string | null;
};

const TYPE_LABEL: Record<string, string> = {
  touchbase: "Touch Base",
  showflat: "Showflat",
  workshop: "Workshop",
  training: "Training",
  viewing: "Viewing",
  other: "Event",
};

/* ------------------------------------------------------------------ */
/* Date helpers (SGT-naive; calendar uses local week)                  */
/* ------------------------------------------------------------------ */
function mondayOf(d: Date): Date {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7; // Mon=0
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x;
}
function fmtRange(monday: Date): string {
  const sun = new Date(monday);
  sun.setDate(sun.getDate() + 6);
  const m = monday.toLocaleDateString("en-SG", { day: "numeric", month: "short" });
  const s = sun.toLocaleDateString("en-SG", { day: "numeric", month: "short" });
  return `${m} – ${s}`;
}
function dayLabel(iso: string): { dow: string; dom: string } {
  const d = new Date(iso + "T00:00:00");
  return {
    dow: d.toLocaleDateString("en-SG", { weekday: "short" }).toUpperCase(),
    dom: d.toLocaleDateString("en-SG", { day: "numeric", month: "short" }),
  };
}
function timeLabel(ev: DivEvent): string {
  if (!ev.starts_at) return "All day";
  const t = (s: string) =>
    new Date(s).toLocaleTimeString("en-SG", { hour: "numeric", minute: "2-digit", hour12: true });
  return ev.ends_at ? `${t(ev.starts_at)} – ${t(ev.ends_at)}` : t(ev.starts_at);
}

/* ------------------------------------------------------------------ */
/* Supabase REST                                                       */
/* ------------------------------------------------------------------ */
function sbHeaders(extra?: Record<string, string>) {
  return { apikey: SB_ANON, Authorization: `Bearer ${SB_ANON}`, "Content-Type": "application/json", ...extra };
}
async function sbGet<T>(path: string): Promise<T> {
  const r = await fetch(`${SB_URL}/rest/v1/${path}`, { headers: sbHeaders() });
  if (!r.ok) throw new Error(`Supabase ${r.status}`);
  return r.json();
}

/* ================================================================== */
export default function DivisionPage() {
  const [mounted, setMounted] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [events, setEvents] = useState<DivEvent[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const [weekMonday, setWeekMonday] = useState<Date>(() => mondayOf(new Date()));
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (EXPECTED_PW && localStorage.getItem(AUTH_KEY) === EXPECTED_PW) setAuthed(true);
    } catch {}
  }, []);

  const load = useCallback(async () => {
    if (!SB_URL || !SB_ANON) {
      setError("Missing Supabase env vars.");
      return;
    }
    try {
      const [ev, at, ac, mt] = await Promise.all([
        sbGet<DivEvent[]>("div_events?select=*&order=starts_at.asc&limit=200"),
        sbGet<Attendance[]>("div_attendance?select=*&limit=2000"),
        sbGet<Activity[]>("div_activity?select=*&order=week_start.desc&limit=200"),
        sbGet<Meeting[]>("div_meetings?select=*&order=meeting_date.desc&limit=200"),
      ]);
      setEvents(ev);
      setAttendance(at);
      setActivity(ac);
      setMeetings(mt);
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);

  useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  // Strip the marketing nav/footer/WhatsApp button while in the hub (clean WhatsApp screenshots).
  useEffect(() => {
    const root = document.documentElement;
    if (authed) root.classList.add("division-bare");
    else root.classList.remove("division-bare");
    return () => root.classList.remove("division-bare");
  }, [authed]);

  const onLogin = (pw: string): string | null => {
    if (!EXPECTED_PW) return "Missing password env — ask Elfi.";
    if (pw.trim() !== EXPECTED_PW) return "Wrong password.";
    try {
      localStorage.setItem(AUTH_KEY, EXPECTED_PW);
    } catch {}
    setAuthed(true);
    return null;
  };
  const onLogout = () => {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {}
    setAuthed(false);
  };

  /* ---- derived: this week's events ---- */
  const weekEvents = useMemo(() => {
    const start = weekMonday.getTime();
    const end = start + 7 * 86400000;
    return events
      .filter((e) => {
        const t = new Date(e.event_date + "T00:00:00").getTime();
        return t >= start && t < end;
      })
      .sort((a, b) => (a.starts_at ?? a.event_date).localeCompare(b.starts_at ?? b.event_date));
  }, [events, weekMonday]);

  const attMap = useMemo(() => {
    const m: Record<string, Record<string, string>> = {};
    for (const a of attendance) {
      (m[a.event_id] ??= {})[a.member] = a.status;
    }
    return m;
  }, [attendance]);

  const currentActivity = useMemo(() => {
    // latest week_start row per member
    const m: Record<string, Activity> = {};
    for (const a of activity) if (!m[a.member]) m[a.member] = a;
    return m;
  }, [activity]);

  /* ---- attendance toggle (writes to Supabase) ---- */
  const cycleAttendance = async (eventId: string, member: string) => {
    if (!editing) return;
    const cur = attMap[eventId]?.[member] ?? "coming";
    const next = cur === "coming" ? "away" : cur === "away" ? "unknown" : "coming";
    // optimistic
    setAttendance((prev) => {
      const i = prev.findIndex((a) => a.event_id === eventId && a.member === member);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], status: next };
        return copy;
      }
      return [...prev, { event_id: eventId, member, status: next, note: null }];
    });
    try {
      await fetch(`${SB_URL}/rest/v1/div_attendance?on_conflict=event_id,member`, {
        method: "POST",
        headers: sbHeaders({ Prefer: "resolution=merge-duplicates,return=minimal" }),
        body: JSON.stringify([{ event_id: eventId, member, status: next }]),
      });
    } catch {
      load(); // revert to server truth on failure
    }
  };

  const saveLearnings = async (id: string, learnings: string) => {
    setMeetings((prev) => prev.map((m) => (m.id === id ? { ...m, learnings } : m)));
    await fetch(`${SB_URL}/rest/v1/div_meetings?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: sbHeaders({ Prefer: "return=minimal" }),
      body: JSON.stringify({ learnings }),
    });
  };

  /* ---------------------------------------------------------------- */
  if (!mounted) return <main className="bg-cream min-h-screen" />;

  if (!authed) {
    return (
      <main className="bg-cream min-h-screen pb-20">
        <section className="max-w-broadsheet mx-auto px-5 sm:px-10 pt-12 sm:pt-16 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <span className="w-6 sm:w-8 h-px bg-amber-deep" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
              The Elfi Division
            </span>
            <span className="w-6 sm:w-8 h-px bg-amber-deep" />
          </div>
          <h1 className="font-serif text-charcoal" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1, letterSpacing: "-0.02em" }}>
            Team Calendar
          </h1>
        </section>
        <LoginForm onLogin={onLogin} />
      </main>
    );
  }

  const isThisWeek = weekMonday.getTime() === mondayOf(new Date()).getTime();

  return (
    <main className="bg-cream min-h-screen pb-24">
      {/* Hero */}
      <section className="max-w-broadsheet mx-auto px-5 sm:px-10 pt-8 sm:pt-12 pb-5 border-b border-charcoal">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-3 mb-2.5">
              <span className="w-6 sm:w-8 h-px bg-amber-deep" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
                The Elfi Division
              </span>
            </div>
            <h1 className="font-serif text-charcoal" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}>
              Team <em className="text-amber-deep italic">Calendar</em>
            </h1>
            <p className="font-serif italic text-gray-500 text-[14px] sm:text-[17px] mt-1.5">
              What we ran, who showed up, what we shipped.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <button
              onClick={() => setEditing((e) => !e)}
              className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border transition-colors ${
                editing ? "bg-charcoal text-cream border-charcoal" : "text-charcoal border-charcoal/40 hover:border-charcoal"
              }`}
            >
              {editing ? "Done" : "Edit"}
            </button>
            <button onClick={onLogout} className="text-[10px] uppercase tracking-[0.2em] text-charcoal/50 hover:text-charcoal underline decoration-amber-deep/40 underline-offset-4">
              Sign out
            </button>
          </div>
        </div>
      </section>

      {error && (
        <div className="max-w-broadsheet mx-auto px-5 sm:px-10 mt-6 text-[13px] text-red-700">{error}</div>
      )}

      {/* Week nav */}
      <section className="max-w-broadsheet mx-auto px-5 sm:px-10 mt-6 flex items-center justify-between">
        <button
          onClick={() => setWeekMonday((d) => new Date(d.getTime() - 7 * 86400000))}
          className="text-[11px] uppercase tracking-[0.18em] text-charcoal/70 hover:text-charcoal"
        >
          ‹ Prev
        </button>
        <div className="text-center">
          <div className="font-serif text-charcoal text-[18px] sm:text-[22px]">{fmtRange(weekMonday)}</div>
          {!isThisWeek && (
            <button onClick={() => setWeekMonday(mondayOf(new Date()))} className="text-[10px] uppercase tracking-[0.18em] text-amber-deep mt-0.5">
              Jump to this week
            </button>
          )}
          {isThisWeek && <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mt-0.5">This week</div>}
        </div>
        <button
          onClick={() => setWeekMonday((d) => new Date(d.getTime() + 7 * 86400000))}
          className="text-[11px] uppercase tracking-[0.18em] text-charcoal/70 hover:text-charcoal"
        >
          Next ›
        </button>
      </section>

      {/* Legend */}
      <section className="max-w-broadsheet mx-auto px-5 sm:px-10 mt-4 flex items-center gap-4 text-[11px] text-charcoal/70">
        <span className="inline-flex items-center gap-1.5"><Dot status="coming" /> Coming</span>
        <span className="inline-flex items-center gap-1.5"><Dot status="away" /> Away</span>
        {editing && <span className="text-amber-deep italic font-serif">Tap a name to change</span>}
      </section>

      {/* Events */}
      <section className="max-w-broadsheet mx-auto px-5 sm:px-10 mt-5 space-y-4">
        {weekEvents.length === 0 ? (
          <div className="border border-charcoal/30 bg-paper p-8 text-center font-serif italic text-gray-500">
            No events logged this week.
          </div>
        ) : (
          weekEvents.map((ev) => {
            const d = dayLabel(ev.event_date);
            return (
              <article key={ev.id} className="border border-charcoal bg-paper">
                <div className="flex">
                  {/* date rail */}
                  <div className="w-[78px] sm:w-[92px] shrink-0 bg-charcoal text-cream flex flex-col items-center justify-center py-4">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-amber">{d.dow}</div>
                    <div className="font-serif text-[15px] sm:text-[17px] mt-0.5 text-center leading-tight px-1">{d.dom}</div>
                  </div>
                  {/* body */}
                  <div className="flex-1 p-4 sm:p-5 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] uppercase tracking-[0.18em] text-amber-deep border border-amber-deep/50 px-1.5 py-0.5">
                        {TYPE_LABEL[ev.event_type] ?? "Event"}
                      </span>
                      <span className="text-[12px] text-charcoal/60">{timeLabel(ev)}</span>
                    </div>
                    <h3 className="font-serif text-charcoal text-[17px] sm:text-[20px] leading-snug">{ev.title}</h3>
                    {ev.location && <div className="text-[12px] text-charcoal/55 mt-0.5">{ev.location}</div>}

                    {/* attendance */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {TEAM.map((m) => {
                        const status = attMap[ev.id]?.[m.slug] ?? "unknown";
                        return (
                          <button
                            key={m.slug}
                            onClick={() => cycleAttendance(ev.id, m.slug)}
                            disabled={!editing}
                            className={`inline-flex items-center gap-1.5 pl-1 pr-2.5 py-1 border text-[12px] transition-colors ${
                              status === "coming"
                                ? "border-charcoal bg-charcoal text-cream"
                                : status === "away"
                                ? "border-charcoal/30 bg-cream text-charcoal/40 line-through"
                                : "border-charcoal/20 bg-cream text-charcoal/40"
                            } ${editing ? "cursor-pointer" : "cursor-default"}`}
                          >
                            <span
                              className={`grid place-items-center w-5 h-5 rounded-full text-[9px] font-medium ${
                                status === "coming" ? "bg-amber text-charcoal" : "bg-charcoal/10 text-charcoal/50"
                              }`}
                            >
                              {m.initials}
                            </span>
                            {m.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* Activity */}
      <section className="max-w-broadsheet mx-auto px-5 sm:px-10 mt-12">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-[10px] uppercase tracking-[0.28em] text-amber-deep">Team Activity</span>
          <span className="flex-1 h-px bg-charcoal/15" />
        </div>
        <h2 className="font-serif text-charcoal text-[22px] sm:text-[28px] mb-4">Posts published</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[...TEAM]
            .map((m) => ({ m, a: currentActivity[m.slug] }))
            .sort((x, y) => (y.a?.posts_30d ?? 0) - (x.a?.posts_30d ?? 0))
            .map(({ m, a }) => (
              <a
                key={m.slug}
                href={`https://instagram.com/${m.ig}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 border border-charcoal bg-paper p-3.5 hover:border-amber-deep transition-colors"
              >
                <span className="grid place-items-center w-10 h-10 rounded-full bg-charcoal text-cream text-[13px] font-medium shrink-0">
                  {m.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-charcoal text-[16px] leading-tight">{m.name}</div>
                  <div className="text-[11px] text-charcoal/50">@{m.ig}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-serif text-charcoal text-[20px] leading-none">
                    {a?.posts_count ?? 0}
                    <span className="text-[11px] text-charcoal/50 font-sans"> wk</span>
                  </div>
                  <div className="text-[11px] text-charcoal/50 mt-1">
                    {a?.posts_30d ?? 0} in 30d · {a?.followers?.toLocaleString() ?? "–"} followers
                  </div>
                </div>
              </a>
            ))}
        </div>
        <p className="text-[11px] text-charcoal/40 mt-2">Instagram, auto-counted. Updated when the sync runs.</p>
      </section>

      {/* Archive */}
      <section className="max-w-broadsheet mx-auto px-5 sm:px-10 mt-12">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-[10px] uppercase tracking-[0.28em] text-amber-deep">Archive</span>
          <span className="flex-1 h-px bg-charcoal/15" />
        </div>
        <h2 className="font-serif text-charcoal text-[22px] sm:text-[28px] mb-1">Meetings &amp; trainings</h2>
        <p className="font-serif italic text-gray-500 text-[14px] mb-4">Look back, reuse a session for training.</p>
        <div className="space-y-3">
          {meetings.length === 0 ? (
            <div className="border border-charcoal/30 bg-paper p-6 text-center font-serif italic text-gray-500">
              Nothing archived yet.
            </div>
          ) : (
            meetings.map((m) => <MeetingCard key={m.id} m={m} editing={editing} onSave={saveLearnings} />)
          )}
        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ */
function Dot({ status }: { status: string }) {
  return (
    <span
      className={`inline-block w-2.5 h-2.5 rounded-full ${status === "coming" ? "bg-amber" : "bg-charcoal/20"}`}
    />
  );
}

function MeetingCard({
  m,
  editing,
  onSave,
}: {
  m: Meeting;
  editing: boolean;
  onSave: (id: string, learnings: string) => void;
}) {
  const [draft, setDraft] = useState(m.learnings ?? "");
  const date = new Date(m.meeting_date + "T00:00:00").toLocaleDateString("en-SG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <article className="border border-charcoal bg-paper p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-serif text-charcoal text-[17px] sm:text-[19px] leading-snug">{m.title}</h3>
          <div className="text-[12px] text-charcoal/55 mt-0.5">{date}</div>
        </div>
        <div className="flex gap-3 shrink-0">
          {m.recording_url && (
            <a href={m.recording_url} target="_blank" rel="noreferrer" className="text-[11px] uppercase tracking-[0.16em] text-charcoal underline decoration-amber-deep/50 underline-offset-4">
              Recording
            </a>
          )}
          {m.transcript_url && (
            <a href={m.transcript_url} target="_blank" rel="noreferrer" className="text-[11px] uppercase tracking-[0.16em] text-charcoal underline decoration-amber-deep/50 underline-offset-4">
              Transcript
            </a>
          )}
        </div>
      </div>

      {editing ? (
        <div className="mt-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="What did we learn? Key takeaways, decisions, who to follow up…"
            className="w-full border border-charcoal bg-cream px-3 py-2 text-[14px] text-charcoal min-h-[90px] focus:outline-none focus:border-amber-deep"
          />
          <button
            onClick={() => onSave(m.id, draft)}
            className="mt-2 bg-charcoal text-cream px-4 py-2 text-[10px] uppercase tracking-[0.2em] hover:bg-charcoal-light"
          >
            Save notes
          </button>
        </div>
      ) : m.learnings ? (
        <p className="mt-3 text-[14px] leading-relaxed text-charcoal/80 whitespace-pre-wrap">{m.learnings}</p>
      ) : (
        <p className="mt-3 text-[13px] italic text-charcoal/40">No notes yet.</p>
      )}
    </article>
  );
}
