"use client";

import { useState } from "react";
import type { Asset } from "@/lib/teamLibrary";
import { kindLabel } from "@/lib/teamLibrary";

const CHARCOAL = "#1A1A2E";
const CREAM = "#F2EBDB";
const AMBER = "#D4A843";

function Preview({ a }: { a: Asset }) {
  const isImage = a.kind === "icon" || a.kind === "spot" || a.kind === "broll";
  const isAudio = a.kind === "audio";
  const isExternal = a.kind === "avatar" || a.kind === "voice";

  if (isImage && a.file_url) {
    // Icons + spots have light variants — preview on charcoal looks better for the light variant,
    // but the dark (default) variant on cream matches the rest of the site.
    return (
      <div
        className="aspect-[4/3] w-full flex items-center justify-center border-b border-charcoal"
        style={{ background: CREAM }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={a.file_url}
          alt={a.label ?? a.name}
          loading="lazy"
          className="max-w-[78%] max-h-[78%] object-contain"
        />
      </div>
    );
  }

  if (isAudio && a.file_url) {
    return (
      <div
        className="aspect-[4/3] w-full flex flex-col items-center justify-center gap-3 border-b border-charcoal px-5"
        style={{ background: CREAM }}
      >
        <div className="text-[10px] uppercase tracking-[0.22em]" style={{ color: AMBER }}>
          Audio
        </div>
        <audio controls preload="none" src={a.file_url} className="w-full max-w-[80%]" />
      </div>
    );
  }

  if (isExternal) {
    return (
      <div
        className="aspect-[4/3] w-full flex flex-col items-center justify-center gap-3 border-b border-charcoal"
        style={{ background: CHARCOAL, color: CREAM }}
      >
        <div className="text-[10px] uppercase tracking-[0.22em]" style={{ color: AMBER }}>
          {kindLabel(a.kind)}
        </div>
        <div className="font-serif text-[22px] sm:text-[26px] text-center px-6">{a.label ?? a.name}</div>
        {a.external_id && (
          <div className="font-mono text-[11px] opacity-70 px-6 text-center break-all">
            {a.external_id}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="aspect-[4/3] w-full flex items-center justify-center border-b border-charcoal text-[10px] uppercase tracking-[0.22em] text-gray-500"
      style={{ background: CREAM }}
    >
      No preview
    </div>
  );
}

export default function AssetCard({ asset }: { asset: Asset }) {
  const [copied, setCopied] = useState(false);
  const hasUrl = !!asset.file_url;

  const copyUrl = async () => {
    if (!asset.file_url) return;
    await navigator.clipboard.writeText(asset.file_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const tags = (asset.keywords ?? []).slice(0, 4);

  return (
    <article className="border border-charcoal bg-paper flex flex-col">
      <Preview a={asset} />

      <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-1.5">
            {kindLabel(asset.kind)}
            {asset.category && ` · ${asset.category}`}
          </div>
          <div
            className="font-serif text-charcoal text-[18px] sm:text-[20px] leading-snug"
            style={{ letterSpacing: "-0.01em" }}
          >
            {asset.label ?? asset.name}
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="text-[10px] uppercase tracking-[0.14em] text-charcoal/75 border border-charcoal/30 px-2 py-0.5"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-2">
          {hasUrl ? (
            <>
              <button
                onClick={copyUrl}
                className="flex-1 text-[11px] uppercase tracking-[0.18em] font-medium border border-charcoal bg-cream text-charcoal py-2 hover:bg-amber transition-colors"
              >
                {copied ? "Copied ✓" : "Copy URL"}
              </button>
              <a
                href={asset.file_url ?? "#"}
                download
                className="flex-1 text-center text-[11px] uppercase tracking-[0.18em] font-medium bg-charcoal text-cream py-2 hover:bg-charcoal-light transition-colors"
              >
                Download
              </a>
            </>
          ) : (
            <div className="flex-1 text-[11px] uppercase tracking-[0.18em] text-gray-500 py-2 text-center">
              External — see ID above
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
