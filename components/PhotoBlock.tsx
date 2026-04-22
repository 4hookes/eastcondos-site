/**
 * Editorial photo block with placeholder state.
 * When `src` is empty, renders a bordered cream frame with a subtle camera glyph
 * and a "Photograph forthcoming" label. When `src` is set, renders the image
 * with editorial caption beneath.
 *
 * Tailwind arbitrary aspect ratios can't be interpolated; we use inline style.
 */

type PhotoBlockProps = {
  src?: string;
  alt: string;
  caption?: string;
  label?: string; // e.g. "Hero", "Move 01", "Clients"
  aspect?: string; // CSS aspect-ratio value e.g. "4 / 3"
  className?: string;
  /** A subtle visual tag shown at top-left in the placeholder state */
  tag?: string;
};

export default function PhotoBlock({
  src,
  alt,
  caption,
  label,
  aspect = "4 / 3",
  className = "",
  tag = "Photograph forthcoming",
}: PhotoBlockProps) {
  const hasImage = Boolean(src && src.trim());

  return (
    <figure className={`border border-charcoal bg-paper overflow-hidden ${className}`}>
      <div
        className="relative w-full"
        style={{ aspectRatio: aspect }}
      >
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-paper">
            {/* top-left tag (label) */}
            {label && (
              <div className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.22em] text-amber-deep">
                {label}
              </div>
            )}
            {/* center glyph */}
            <div className="flex flex-col items-center justify-center gap-3 opacity-60 text-charcoal">
              <svg
                width="36"
                height="36"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 11 H11 L14 8 H26 L29 11 H35 V32 H5 Z" />
                <circle cx="20" cy="21" r="6" />
                <path d="M31 14 H32" />
              </svg>
              <span className="text-[10px] uppercase tracking-[0.22em] text-charcoal/60">
                {tag}
              </span>
            </div>
            {/* soft diagonal corner rule */}
            <svg
              className="absolute bottom-3 right-3 text-amber-deep/50"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
            >
              <path d="M2 22 L22 2" />
              <path d="M14 2 L22 2 L22 10" />
            </svg>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="px-4 sm:px-5 py-3 text-[12px] sm:text-[13px] italic font-serif text-gray-600 border-t border-dotted border-[#c9bfa3] leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
