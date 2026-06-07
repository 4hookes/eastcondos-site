"""
Secret loader — reads keys from the GITIGNORED east-condos/memory/reference_credentials.md
(or env vars) at runtime, so no secret is ever hard-coded in a committed script.

This file contains NO secrets — only the logic to locate + parse the local creds file.
Env vars always win: GEMINI_API_KEY, SB_SERVICE_KEY, SB_PAT.
"""
import functools, os, re

SB_URL = "https://lamdtoejzynvbjxevein.supabase.co"  # public project URL (not secret)


def _credfile():
    d = os.path.abspath(os.path.dirname(__file__))
    for _ in range(8):
        cand = os.path.join(d, "east-condos", "memory", "reference_credentials.md")
        if os.path.exists(cand):
            return cand
        nd = os.path.dirname(d)
        if nd == d:
            break
        d = nd
    cand = os.path.join(os.getcwd(), "east-condos", "memory", "reference_credentials.md")
    return cand if os.path.exists(cand) else None


@functools.lru_cache(None)
def _text():
    f = _credfile()
    if not f:
        return ""
    with open(f) as fh:
        return fh.read()


def gemini_key():
    k = os.environ.get("GEMINI_API_KEY")
    if k:
        return k
    m = re.search(r"AQ\.[A-Za-z0-9_\-]{20,}", _text())
    if not m:
        raise RuntimeError("Gemini key not found (set GEMINI_API_KEY or check reference_credentials.md)")
    return m.group(0)


def sb_service_key():
    k = os.environ.get("SB_SERVICE_KEY")
    if k:
        return k
    t = _text()
    i = t.find("service_role (SECRET")
    m = re.search(r"eyJ[A-Za-z0-9_\-\.]{60,}", t[i:]) if i >= 0 else None
    if not m:
        raise RuntimeError("Supabase service_role key not found (set SB_SERVICE_KEY)")
    return m.group(0)


def sb_pat():
    k = os.environ.get("SB_PAT")
    if k:
        return k
    m = re.search(r"sbp_[A-Za-z0-9]{20,}", _text())
    if not m:
        raise RuntimeError("Supabase PAT not found (set SB_PAT)")
    return m.group(0)
