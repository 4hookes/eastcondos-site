#!/usr/bin/env python3
"""
Division team hub — data sync.

Refreshes team activity (Instagram posts/followers via ScrapeCreators) into the
div_activity table, and (with --seed) seeds this week's events + attendance +
recent meeting archive.

Reads from env:
  SB_URL          Supabase project URL (https://<ref>.supabase.co)
  SB_SERVICE_KEY  Supabase service_role key (bypasses RLS for writes)
  SC_KEY          ScrapeCreators API key (x-api-key)

Usage:
  SB_URL=... SB_SERVICE_KEY=... SC_KEY=... python3 div_sync.py          # refresh activity only
  SB_URL=... SB_SERVICE_KEY=... SC_KEY=... python3 div_sync.py --seed   # also seed events/attendance/meetings
"""
import json, os, sys, time, urllib.request, urllib.parse
from datetime import datetime, timedelta, timezone

SGT = timezone(timedelta(hours=8))

SB_URL = os.environ["SB_URL"].rstrip("/")
SB_KEY = os.environ["SB_SERVICE_KEY"]
SC_KEY = os.environ.get("SC_KEY", "")

# Division roster. slug -> (display name, IG handle)
TEAM = [
    ("elfi",      "Elfi",      "elfi.abd"),
    ("jeffri",    "Jeffri",    "jnatawate"),
    ("syai",      "Syai",      "syaihariss"),
    ("faathimah", "Faathimah", "agentfaat"),
    ("rizqin",    "Rizqin",    "rizqinadam"),
]


def week_start_sgt(d=None):
    d = d or datetime.now(SGT)
    monday = d - timedelta(days=d.weekday())
    return monday.replace(hour=0, minute=0, second=0, microsecond=0)


def sb(method, path, body=None, prefer=None):
    url = f"{SB_URL}/rest/v1/{path}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("apikey", SB_KEY)
    req.add_header("Authorization", f"Bearer {SB_KEY}")
    req.add_header("Content-Type", "application/json")
    if prefer:
        req.add_header("Prefer", prefer)
    with urllib.request.urlopen(req) as r:
        raw = r.read().decode()
        return json.loads(raw) if raw else None


def ig_profile(handle):
    url = f"https://api.scrapecreators.com/v1/instagram/profile?handle={urllib.parse.quote(handle)}"
    req = urllib.request.Request(url)
    req.add_header("x-api-key", SC_KEY)
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())


def refresh_activity():
    ws = week_start_sgt()
    week_start_ts = ws.timestamp()
    thirty_ago_ts = (datetime.now(SGT) - timedelta(days=30)).timestamp()
    rows = []
    for slug, name, handle in TEAM:
        followers = posts_week = posts_30d = None
        try:
            d = ig_profile(handle)
            u = d.get("data", {}).get("user", {}) or {}
            followers = u.get("edge_followed_by", {}).get("count")
            edges = u.get("edge_owner_to_timeline_media", {}).get("edges", []) or []
            ts = [e.get("node", {}).get("taken_at_timestamp", 0) for e in edges]
            posts_week = sum(1 for t in ts if t >= week_start_ts)
            posts_30d = sum(1 for t in ts if t >= thirty_ago_ts)
            print(f"  {name:10} @{handle:14} followers={followers} week={posts_week} 30d={posts_30d}")
        except Exception as e:
            print(f"  {name:10} @{handle:14} ERROR {e}")
        rows.append({
            "member": slug,
            "week_start": ws.date().isoformat(),
            "platform": "instagram",
            "posts_count": posts_week or 0,
            "posts_30d": posts_30d or 0,
            "followers": followers,
            "captured_at": datetime.now(timezone.utc).isoformat(),
        })
        time.sleep(0.4)
    sb("POST", "div_activity?on_conflict=member,week_start,platform", rows,
       prefer="resolution=merge-duplicates,return=minimal")
    print(f"Activity upserted for week starting {ws.date().isoformat()}.")


def seed():
    # --- This week's real events (from Elfi's Google Calendar) ---
    events = [
        {"id": "evt_touchbase_20260609", "title": "The Touchbase", "event_date": "2026-06-09",
         "starts_at": "2026-06-09T10:10:00+08:00", "ends_at": "2026-06-09T12:10:00+08:00",
         "location": "ALA Office", "event_type": "touchbase",
         "notes": "Weekly team touch base.", "source": "gcal"},
        {"id": "evt_opus_showflat_20260609", "title": "Opus Showflat — Media Day", "event_date": "2026-06-09",
         "starts_at": "2026-06-09T09:00:00+08:00", "ends_at": "2026-06-09T18:00:00+08:00",
         "location": "Opus Showflat", "event_type": "showflat",
         "notes": "ERA event. Time TBC — confirm closer to date.", "source": "gcal"},
        {"id": "evt_touchbase_20260611", "title": "The Touchbase", "event_date": "2026-06-11",
         "starts_at": "2026-06-11T10:10:00+08:00", "ends_at": "2026-06-11T12:10:00+08:00",
         "location": "ALA Office", "event_type": "touchbase",
         "notes": "Weekly team touch base.", "source": "gcal"},
        {"id": "evt_rca_workshop2_20260615", "title": "RCA Workshop 2: Appointment Discovery & Financial Positioning",
         "event_date": "2026-06-15",
         "starts_at": "2026-06-15T09:30:00+08:00", "ends_at": "2026-06-15T12:00:00+08:00",
         "location": "ALA Office — #01-119 Midview City, 22 Sin Ming Lane", "event_type": "workshop",
         "notes": "Rayne Chua Advisory Group — Consultant Workshop Series. Workshop 2 of 4.", "source": "gcal"},
    ]
    sb("POST", "div_events?on_conflict=id", events, prefer="resolution=merge-duplicates,return=minimal")
    print(f"Seeded {len(events)} events.")

    # --- Attendance for this week's events: Faathimah + Syai away (holiday), rest coming ---
    away = {"faathimah", "syai"}
    this_week_event_ids = ["evt_touchbase_20260609", "evt_opus_showflat_20260609", "evt_touchbase_20260611"]
    att = []
    for eid in this_week_event_ids:
        for slug, _, _ in TEAM:
            att.append({
                "event_id": eid,
                "member": slug,
                "status": "away" if slug in away else "coming",
                "note": "On holiday" if slug in away else None,
            })
    sb("POST", "div_attendance?on_conflict=event_id,member", att,
       prefer="resolution=merge-duplicates,return=minimal")
    print(f"Seeded {len(att)} attendance rows (Faathimah + Syai away).")

    # --- Meeting / training archive: recent touchbases (learnings to be filled in) ---
    meetings = [
        {"id": "mtg_touchbase_20260602", "title": "The Touchbase", "meeting_date": "2026-06-02",
         "meeting_type": "touchbase", "learnings": None},
        {"id": "mtg_touchbase_20260604", "title": "The Touchbase", "meeting_date": "2026-06-04",
         "meeting_type": "touchbase", "learnings": None},
    ]
    sb("POST", "div_meetings?on_conflict=id", meetings, prefer="resolution=merge-duplicates,return=minimal")
    print(f"Seeded {len(meetings)} meeting-archive rows.")


if __name__ == "__main__":
    if "--seed" in sys.argv:
        seed()
    refresh_activity()
    print("Done.")
