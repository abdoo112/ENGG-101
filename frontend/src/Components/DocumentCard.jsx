// DocumentCard.jsx
import React from "react";

/* =====================================================================
 * STATUS_STYLES
 * Maps a document's status string to a badge color/label.
 * Lives outside the component (module scope) for the same reason
 * QUOTES lives outside DailyQuote — it's static, no need to recreate
 * it every render.
 *
 * Add new statuses here later (e.g. "queued") without touching the
 * component logic below.
 * =================================================================== */
const STATUS_STYLES = {
  ready: {
    label: "Ready",
    dot: "bg-emerald-400",
    text: "text-emerald-300/80",
  },
  processing: {
    label: "Processing",
    dot: "bg-amber-300 animate-pulse",
    text: "text-amber-300/80",
  },
  error: {
    label: "Error",
    dot: "bg-red-400",
    text: "text-red-300/80",
  },
};

/* =====================================================================
 * DocumentCard
 * Purely presentational. Takes one document object, renders it.
 * Knows nothing about where the data came from (mock array today,
 * fetch response later — identical props either way).
 * =================================================================== */
export default function DocumentCard({ document }) {
  const { name, type, uploadedAt, status } = document;

  // Fallback so an unexpected/unknown status string doesn't crash
  // the render — it just shows as plain text with no color coding.
  const statusStyle = STATUS_STYLES[status] || {
    label: status,
    dot: "bg-white/30",
    text: "text-white/50",
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3 hover:border-amber-300/30 transition-colors">
      {/* Left side: filename + metadata */}
      <div className="min-w-0">
        {/* truncate keeps very long filenames from breaking the layout */}
        <p className="text-sm text-white/80 truncate">{name}</p>
        <p className="mt-1 text-xs text-white/40 uppercase tracking-widest">
          {type} <span className="mx-2 text-white/20">|</span> {uploadedAt}
        </p>
      </div>

      {/* Right side: status badge */}
      <div className="shrink-0 flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
        <span
          className={`text-[10px] uppercase tracking-[0.15em] ${statusStyle.text}`}
        >
          {statusStyle.label}
        </span>
      </div>
    </div>
  );
}