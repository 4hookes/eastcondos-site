function formatLong(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function LastUpdated({
  date,
  note,
  align = "left",
  tone = "light",
}: {
  date: string;
  note?: string;
  align?: "left" | "center";
  tone?: "light" | "onDark";
}) {
  const textColor = tone === "onDark" ? "text-cream/80" : "text-charcoal";
  const accent = tone === "onDark" ? "text-amber" : "text-amber-deep";
  const alignment = align === "center" ? "justify-center" : "justify-start";

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-[12px] ${textColor} ${alignment}`}
    >
      <time
        dateTime={date}
        className={`uppercase tracking-[0.18em] font-medium ${accent}`}
      >
        Last updated {formatLong(date)}
      </time>
      {note && (
        <>
          <span className={`hidden sm:inline ${accent}`}>·</span>
          <span className="italic font-serif text-gray-600">{note}</span>
        </>
      )}
    </div>
  );
}
