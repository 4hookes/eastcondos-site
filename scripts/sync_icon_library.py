#!/usr/bin/env python3
"""
Sync the icon library from public/icons/icon-library.json to:
  1. components/ecIcons.ts        — typed manifest the website imports (EcIconName etc.)
  2. Supabase Storage bucket      — icon-library/<category>/<name>.png (+ -light.png)
  3. Supabase table cp_icons      — one tagged row per icon (mirrors cp_broll), so the
                                    content pipeline / any AI picks icons by keyword, not by
                                    opening the PNG.

Idempotent: re-run any time after editing the manifest or regenerating icons.
Reads secrets via _creds (env or the gitignored reference_credentials.md).

Usage: python3 scripts/sync_icon_library.py [--no-supabase]
"""
import concurrent.futures, json, os, sys, urllib.request, urllib.error
from _creds import SB_URL, sb_service_key, sb_pat

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ICONS_DIR = os.path.join(ROOT, "public", "icons")
MANIFEST = os.path.join(ICONS_DIR, "icon-library.json")
TS_OUT = os.path.join(ROOT, "components", "ecIcons.ts")
PROJECT_REF = "lamdtoejzynvbjxevein"
BUCKET = "icon-library"


def load():
    with open(MANIFEST) as f:
        return json.load(f)


# ---------- 1. TS manifest ----------
def emit_ts(man):
    icons = man["icons"]
    names = [i["name"] for i in icons]
    cats = sorted({i["category"] for i in icons})
    q = lambda s: json.dumps(s)
    lines = [
        "// AUTO-GENERATED from public/icons/icon-library.json by scripts/sync_icon_library.py.",
        "// Do not edit by hand — edit the JSON and re-run the sync script.",
        "",
        "export type EcIconName =",
        *[f"  | {q(n)}" for n in names],
        "  ;",
        "",
        "export type EcIconCategory =",
        *[f"  | {q(c)}" for c in cats],
        "  ;",
        "",
        "export interface EcIconMeta {",
        "  name: EcIconName;",
        "  category: EcIconCategory;",
        "  label: string;",
        "  description: string;",
        "  keywords: string[];",
        "  wave: number;",
        "}",
        "",
        "export const EC_ICONS: EcIconMeta[] = [",
    ]
    for i in icons:
        lines.append(
            "  { name: %s, category: %s, label: %s, description: %s, keywords: %s, wave: %d },"
            % (q(i["name"]), q(i["category"]), q(i["label"]), q(i["description"]),
               json.dumps(i["keywords"]), i.get("wave", 2))
        )
    lines += [
        "];",
        "",
        "export const EC_ICON_NAMES: EcIconName[] = EC_ICONS.map((i) => i.name);",
        "",
        "/** Group icon names by category — handy for pickers / contact sheets. */",
        "export const EC_ICONS_BY_CATEGORY: Record<EcIconCategory, EcIconName[]> =",
        "  EC_ICONS.reduce((acc, i) => {",
        "    (acc[i.category] ||= []).push(i.name);",
        "    return acc;",
        "  }, {} as Record<EcIconCategory, EcIconName[]>);",
        "",
    ]
    with open(TS_OUT, "w") as f:
        f.write("\n".join(lines))
    print(f"  wrote {os.path.relpath(TS_OUT, ROOT)} ({len(names)} icons, {len(cats)} categories)")


# ---------- supabase helpers ----------
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"


def _req(url, method="GET", headers=None, data=None):
    headers = dict(headers or {})
    headers.setdefault("User-Agent", UA)  # api.supabase.com WAF blocks default urllib UA (CF 1010)
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
        print(f"  bucket '{BUCKET}' already exists")
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
    CREATE TABLE IF NOT EXISTS public.cp_icons (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text UNIQUE NOT NULL,
      category text NOT NULL,
      label text,
      description text,
      keywords text[] DEFAULT '{}',
      file_url text,
      light_url text,
      asset_type text DEFAULT 'icon',
      ratio text DEFAULT '1:1',
      style text DEFAULT 'modern-luxe-hairline',
      source text,
      wave int,
      reusable boolean DEFAULT true,
      created_at timestamptz DEFAULT now()
    );
    """
    h = {"Authorization": f"Bearer {pat}", "Content-Type": "application/json"}
    code, resp = _req(f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query",
                      "POST", h, json.dumps({"query": ddl}).encode())
    print(f"  cp_icons table ensured -> {code}")
    if code >= 300:
        print("   ", resp[:200])


def public_url(category, fname):
    return f"{SB_URL}/storage/v1/object/public/{BUCKET}/{category}/{fname}"


def upsert_rows(svc, man):
    rows = []
    for i in man["icons"]:
        cat, name = i["category"], i["name"]
        rows.append({
            "name": name, "category": cat, "label": i["label"], "description": i["description"],
            "keywords": i["keywords"], "file_url": public_url(cat, f"{name}.png"),
            "light_url": public_url(cat, f"{name}-light.png"), "asset_type": "icon", "ratio": "1:1",
            "style": "modern-luxe-hairline",
            "source": "gemini-3-pro-image" if i.get("wave") == 2 else "gemini",
            "wave": i.get("wave", 2), "reusable": True,
        })
    h = {"apikey": svc, "Authorization": f"Bearer {svc}", "Content-Type": "application/json",
         "Prefer": "resolution=merge-duplicates,return=minimal"}
    code, resp = _req(f"{SB_URL}/rest/v1/cp_icons?on_conflict=name", "POST", h, json.dumps(rows).encode())
    print(f"  upserted {len(rows)} cp_icons rows -> {code} {resp[:120] if code>=300 else ''}")


def main():
    man = load()
    print("1. TS manifest")
    emit_ts(man)
    if "--no-supabase" in sys.argv:
        print("(skipping Supabase)")
        return
    svc, pat = sb_service_key(), sb_pat()
    print("2. Supabase storage")
    ensure_bucket(svc)
    tasks = []
    for i in man["icons"]:
        cat, name = i["category"], i["name"]
        for fn in (f"{name}.png", f"{name}-light.png"):
            lp = os.path.join(ICONS_DIR, fn)
            if os.path.exists(lp):
                tasks.append((lp, f"{cat}/{fn}"))
    ok = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
        for dest, good, msg in ex.map(lambda t: upload(svc, t[0], t[1]), tasks):
            ok += good
            if not good:
                print(f"   FAIL {dest}: {msg}")
    print(f"  uploaded {ok}/{len(tasks)} PNGs")
    upload(svc, MANIFEST, "icon-library.json")
    print("  uploaded icon-library.json")
    print("3. Supabase table cp_icons")
    ensure_table(pat)
    upsert_rows(svc, man)
    print("Done.")


if __name__ == "__main__":
    main()
