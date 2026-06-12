type PhotoBandProps = {
  src: string;
  label: string;
  line: React.ReactNode;
  attribution?: string;
  /** focal point for the cropped image, default center */
  position?: string;
};

/**
 * Full-bleed editorial photo band. The image is desaturated and gradient-masked
 * toward charcoal so a single line of display type reads cleanly over it.
 * Used sparingly — a human beat between data-heavy sections.
 */
export default function PhotoBand({
  src,
  label,
  line,
  attribution,
  position = "center",
}: PhotoBandProps) {
  return (
    <section className="relative bg-charcoal-deep overflow-hidden border-t hairline">
      <img
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          objectPosition: position,
          filter: "grayscale(0.3) contrast(1.04) brightness(0.82)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #0E0E1F 0%, rgba(14,14,31,0.85) 42%, rgba(14,14,31,0.4) 100%), linear-gradient(0deg, rgba(14,14,31,0.7) 0%, rgba(14,14,31,0) 55%)",
        }}
      />
      <div className="relative z-10 max-w-broadsheet mx-auto px-6 md:px-12 py-28 md:py-40 min-h-[420px] md:min-h-[520px] flex flex-col justify-end">
        <div className="mono-label mb-6">{label}</div>
        <h2 className="display-section max-w-[24ch]">{line}</h2>
        {attribution && (
          <div className="mono-label-dim mt-8">{attribution}</div>
        )}
      </div>
    </section>
  );
}
