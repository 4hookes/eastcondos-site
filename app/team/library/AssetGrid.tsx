"use client";

import { useMemo, useState } from "react";
import type { Asset } from "@/lib/teamLibrary";
import { kindLabel } from "@/lib/teamLibrary";
import AssetCard from "./AssetCard";

const KIND_FILTERS: Array<{ value: "all" | string; label: string }> = [
  { value: "all", label: "All" },
  { value: "icon", label: "Icons" },
  { value: "spot", label: "Illustrations" },
  { value: "broll", label: "B-roll" },
  { value: "audio", label: "Audio" },
  { value: "avatar", label: "Avatar" },
  { value: "voice", label: "Voice" },
];

export default function AssetGrid({ assets }: { assets: Asset[] }) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<string>("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return assets.filter((a) => {
      if (kind !== "all" && a.kind !== kind) return false;
      if (!needle) return true;
      const haystack = [
        a.name,
        a.label ?? "",
        a.category ?? "",
        a.description ?? "",
        ...(a.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [assets, q, kind]);

  // Count by kind for the filter pills (showing only kinds that exist in the set).
  const counts = useMemo(() => {
    const m: Record<string, number> = { all: assets.length };
    for (const a of assets) m[a.kind] = (m[a.kind] ?? 0) + 1;
    return m;
  }, [assets]);

  return (
    <>
      {/* Controls */}
      <div className="bg-cream/95 backdrop-blur border-b border-charcoal sticky top-0 z-10 py-4 sm:py-5">
        <div className="max-w-broadsheet mx-auto px-4 sm:px-10 flex flex-col gap-3">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search — try ‘safety’, ‘East Coast’, ‘TDSR’, ‘consultation’…"
            className="w-full border border-charcoal bg-paper px-4 py-2.5 text-[15px] sm:text-[16px] text-charcoal placeholder:text-gray-500 focus:outline-none focus:border-amber-deep"
            aria-label="Search assets"
          />
          <div className="flex flex-wrap gap-2">
            {KIND_FILTERS.filter((f) => f.value === "all" || (counts[f.value] ?? 0) > 0).map((f) => {
              const active = kind === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setKind(f.value)}
                  className={`text-[11px] uppercase tracking-[0.18em] font-medium border px-3 py-1.5 transition-colors ${
                    active
                      ? "bg-charcoal text-cream border-charcoal"
                      : "bg-paper text-charcoal border-charcoal/40 hover:border-charcoal"
                  }`}
                >
                  {f.label} <span className="opacity-60">({counts[f.value] ?? 0})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-broadsheet mx-auto px-4 sm:px-10 py-8 sm:py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-serif italic">
            Nothing matches “{q}” in {kind === "all" ? "the library" : kindLabel(kind)}.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((a) => (
              <AssetCard key={`${a.kind}:${a.name}`} asset={a} />
            ))}
          </div>
        )}
        <div className="text-[11px] uppercase tracking-[0.18em] text-gray-500 mt-8 text-center">
          {filtered.length} of {assets.length} assets
        </div>
      </div>
    </>
  );
}
