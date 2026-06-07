#!/usr/bin/env python3
"""
Sync spot illustrations from public/spots/spot-library.json to:
  1. Supabase Storage bucket `spot-library`  — <name>.png + <name>-light.png
  2. Supabase table `cp_spots`               — one tagged row per spot (mirrors cp_icons)

Idempotent. Reads secrets via _creds (env or the gitignored reference_credentials.md).

Usage: python3 scripts/sync_spot_library.py [--no-supabase]
"""
import concurrent.futures, json, os, sys, urllib.request, urllib.error
from _creds import SB_URL, sb_service_key, sb_pat

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPOTS_DIR = os.path.join(ROOT, "public", "spots")
MANIFEST = os.path.join(SPOTS_DIR, "spot-library.json")
PROJECT_REF = "lamdtoejzynvbjxevein"
BUCKET = "spot-library"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"


def _req(url, method="GET", headers=None, data=None):
    headers = dict(headers or {})
    headers.setdefault("User-Agent", UA)
    r = urllib.request.Request(url, method=method, headers=headers, data=data)
    try:
        with urllib.request.urlopen(r, timeout=60) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read()


def ensure_bucket(svc):
    h = {"Authorization": f"Bearer {svc}", "apikey": svc, "Content-Type": "application/json"}
    body = json.dumps({"id": BUCKET, "name": BUCKET, "public": True, "file_size_limit": 52428800}).encode()
    code, resp = _req(f"{SB_URL}/storage/v1/bucket", "POST", h, body)
    if code in (200, 201):
        print(f"  bucket '{BUCKET}' created")
    elif b"already exists" in resp or code == 409:
        print(f"  bucket '{BUCKET}' exists")
    else:
        print(f"  bucket create -> {code} {resp[:120]}")


def upload(svc, local_path, dest):
    with open(local_path, "rb") as f:
        data = f.read()
    h = {"Authorization": f"Bearer {svc}", "apikey": svc,
         "Content-Type": "image/png" if dest.endswith(".png") else "application/json",
         "x-upsert": "true"}
    code, resp = _req(f"{SB_URL}/storage/v1/object/{BUCKET}/{dest}", "POST", h, data)
    return dest, code in (200, 201), resp[:100]


def ensure_table(pat):
    ddl = """
    CREATE TABLE IF NOT EXISTS public.cp_spots (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text UNIQUE NOT NULL,
      label text,
      description text,
      keywords text[] DEFAULT '{}',
      placements text[] DEFAULT '{}',
      file_url text,
      light_url text,
      asset_type text DEFAULT 'spot',
      ratio text DEFAULT '16:9',
      style text DEFAULT 'modern-luxe-hairline',
      source text DEFAULT 'gemini-3-pro-image',
      reusable boolean DEFAULT true,
      created_at timestamptz DEFAULT now()
    );
    """
    h = {"Authorization": f"Bearer {pat}", "Content-Type": "application/json"}
    code, _ = _req(f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query",
                   "POST", h, json.dumps({"query": ddl}).encode())
    print(f"  cp_spots table ensured -> {code}")


def upsert(svc, man):
    rows = []
    for s in man["spots"]:
        n = s["name"]
        rows.append({
            "name": n, "label": s["label"], "description": s["description"],
            "keywords": s["keywords"], "placements": s.get("placements", []),
            "file_url": f"{SB_URL}/storage/v1/object/public/{BUCKET}/{n}.png",
            "light_url": f"{SB_URL}/storage/v1/object/public/{BUCKET}/{n}-light.png",
            "asset_type": "spot", "ratio": "16:9", "style": "modern-luxe-hairline",
            "source": "gemini-3-pro-image", "reusable": True,
        })
    h = {"apikey": svc, "Authorization": f"Bearer {svc}", "Content-Type": "application/json",
         "Prefer": "resolution=merge-duplicates,return=minimal"}
    code, resp = _req(f"{SB_URL}/rest/v1/cp_spots?on_conflict=name", "POST", h, json.dumps(rows).encode())
    print(f"  upserted {len(rows)} cp_spots rows -> {code} {resp[:120] if code>=300 else ''}")


def main():
    with open(MANIFEST) as f:
        man = json.load(f)
    if "--no-supabase" in sys.argv:
        print("(--no-supabase set; nothing to do for spots)")
        return
    svc, pat = sb_service_key(), sb_pat()
    print("Supabase storage")
    ensure_bucket(svc)
    tasks = []
    for s in man["spots"]:
        for fn in (f"{s['name']}.png", f"{s['name']}-light.png"):
            lp = os.path.join(SPOTS_DIR, fn)
            if os.path.exists(lp):
                tasks.append((lp, fn))
    ok = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:
        for dest, good, msg in ex.map(lambda t: upload(svc, t[0], t[1]), tasks):
            ok += good
            if not good:
                print(f"   FAIL {dest}: {msg}")
    print(f"  uploaded {ok}/{len(tasks)} PNGs")
    upload(svc, MANIFEST, "spot-library.json")
    print("  uploaded spot-library.json")
    print("Supabase table cp_spots")
    ensure_table(pat)
    upsert(svc, man)
    print("Done.")


if __name__ == "__main__":
    main()
