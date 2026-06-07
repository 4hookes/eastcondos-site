"use client";

import { useEffect, useState } from "react";
import type { Asset } from "@/lib/teamLibrary";
import AssetGrid from "./AssetGrid";
import LoginForm from "./LoginForm";

const AUTH_KEY = "ec_team_library_auth_v1";
const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SB_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const EXPECTED_PW = process.env.NEXT_PUBLIC_TEAM_LIBRARY_PASSWORD ?? "";

/**
 * /team/library — Asset Library gallery.
 *
 * Client-rendered because the rest of the site uses `output: "export"` (static export).
 * The password gate is a UX gate, not a security control — the asset URLs themselves
 * are already public Supabase Storage URLs. Goal: keep the page out of random hands +
 * search engines, not lock down the assets.
 */
export default function TeamLibraryPage() {
  const [mounted, setMounted] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [assets, setAssets] = useState<Asset[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem(AUTH_KEY) === EXPECTED_PW && EXPECTED_PW) {
        setAuthed(true);
      }
    } catch {
      // localStorage blocked — leave authed=false; user logs in each session.
    }
  }, []);

  useEffect(() => {
    if (!authed) return;
    if (!SB_URL || !SB_ANON) {
      setError("Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.");
      return;
    }
    const url = new URL("/rest/v1/cp_assets_index", SB_URL);
    url.searchParams.set("select", "*");
    url.searchParams.set("order", "kind.asc,name.asc");
    url.searchParams.set("limit", "500");

    fetch(url.toString(), {
      headers: { apikey: SB_ANON, Authorization: `Bearer ${SB_ANON}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`Supabase ${r.status}`))))
      .then((data: Asset[]) => setAssets(data))
      .catch((e: Error) => setError(e.message));
  }, [authed]);

  const onLogin = (pw: string): string | null => {
    if (!EXPECTED_PW) return "Missing NEXT_PUBLIC_TEAM_LIBRARY_PASSWORD — ask Elfi.";
    if (pw.trim() !== EXPECTED_PW) return "Wrong password.";
    try {
      localStorage.setItem(AUTH_KEY, EXPECTED_PW);
    } catch {
      // localStorage blocked — auth only lives in memory this session.
    }
    setAuthed(true);
    return null;
  };

  const onLogout = () => {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {
      // ignored
    }
    setAuthed(false);
    setAssets(null);
  };

  // Don't render anything auth-dependent until we've hydrated — avoids a flash of the wrong state.
  if (!mounted) {
    return <main className="bg-cream min-h-screen" />;
  }

  if (!authed) {
    return (
      <main className="bg-cream min-h-screen pb-20">
        <section className="max-w-broadsheet mx-auto px-5 sm:px-10 pt-12 sm:pt-16 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <span className="w-6 sm:w-8 h-px bg-amber-deep" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
              EastCondos · Team
            </span>
            <span className="w-6 sm:w-8 h-px bg-amber-deep" />
          </div>
          <h1
            className="font-serif text-charcoal"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.0, letterSpacing: "-0.02em" }}
          >
            Asset Library
          </h1>
        </section>
        <LoginForm onLogin={onLogin} />
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-cream min-h-screen p-10">
        <div className="max-w-[600px] mx-auto bg-paper border border-charcoal p-8">
          <div className="text-[10px] uppercase tracking-[0.28em] text-amber-deep mb-2">Error</div>
          <h1 className="font-serif text-charcoal text-2xl mb-3">Couldn’t load the library</h1>
          <p className="text-body break-words">{error}</p>
          <button
            onClick={onLogout}
            className="mt-6 text-[11px] uppercase tracking-[0.22em] text-charcoal underline decoration-amber-deep/40 underline-offset-4"
          >
            Sign out
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-cream min-h-screen pb-20">
      {/* Hero */}
      <section className="max-w-broadsheet mx-auto px-5 sm:px-10 pt-10 sm:pt-14 pb-6 sm:pb-8 border-b border-charcoal">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-6 sm:w-8 h-px bg-amber-deep" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
                EastCondos · Team
              </span>
            </div>
            <h1
              className="font-serif text-charcoal"
              style={{ fontSize: "clamp(2rem, 5.5vw, 3.4rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}
            >
              Asset <em className="text-amber-deep italic">Library</em>
            </h1>
            <p className="font-serif italic text-charcoal text-[15px] sm:text-[18px] text-gray-500 mt-2">
              Every reusable visual + audio asset, searchable by what it means.
            </p>
          </div>
          <button
            onClick={onLogout}
            type="button"
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-charcoal/60 hover:text-charcoal underline decoration-amber-deep/40 underline-offset-4 self-start sm:self-auto"
          >
            Sign out
          </button>
        </div>
      </section>

      {/* Grid */}
      {assets === null ? (
        <div className="max-w-broadsheet mx-auto px-5 sm:px-10 py-20 text-center font-serif italic text-gray-500">
          Loading library…
        </div>
      ) : (
        <AssetGrid assets={assets} />
      )}
    </main>
  );
}
