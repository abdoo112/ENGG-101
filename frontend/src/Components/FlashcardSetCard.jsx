// FlashcardSetCard.jsx
import React from "react";

/* =====================================================================
 * FlashcardSetCard
 * Purely presentational. One flashcard set object in, one card out.
 *
 * Props:
 *  - set       (object)   { id, title, topic, cardCount, progress }
 *                          progress is optional: a number 0–100, or
 *                          undefined if progress tracking isn't
 *                          available yet for this set.
 *  - onStudy   (func)     Called with set.id when "Study" is clicked.
 *                          No study-session logic lives here.
 * =================================================================== */
export default function FlashcardSetCard({ set, onStudy = () => {} }) {
  const { id, title, topic, cardCount, progress } = set;

  // Only render a progress bar if progress is an actual number.
  // Avoids showing a fake "0%" bar for sets that have no progress
  // concept yet (e.g. never studied, or backend doesn't track it).
  const hasProgress = typeof progress === "number";

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 flex flex-col gap-3 hover:border-amber-300/30 transition-colors">
      {/* Title */}
      <h3 className="text-sm text-white/80">{title}</h3>

      {/* Metadata row */}
      <div className="text-xs text-white/40 uppercase tracking-widest">
        {topic} <span className="mx-2 text-white/20">|</span>{" "}
        {cardCount} cards
      </div>

      {/* Progress bar — conditional, see hasProgress note above */}
      {hasProgress && (
        <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-amber-300"
            // inline style because the width is a dynamic percentage —
            // Tailwind can't generate arbitrary values like this at runtime
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Study button */}
      <button
        type="button"
        onClick={() => onStudy(id)}
        className="self-start mt-1 px-4 py-2 rounded-md text-xs font-semibold tracking-[0.15em] uppercase bg-amber-300 text-black hover:bg-amber-200 transition-colors"
      >
        Study
      </button>
    </div>
  );
}