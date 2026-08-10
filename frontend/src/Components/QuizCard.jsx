// QuizCard.jsx
import React from "react";

/* =====================================================================
 * DIFFICULTY_STYLES
 * Same pattern as STATUS_STYLES in DocumentCard — a static lookup
 * table at module scope, mapping a difficulty string to a color.
 * Add new difficulty levels here without touching the component.
 * =================================================================== */
const DIFFICULTY_STYLES = {
  easy: "text-emerald-300/80 border-emerald-400/30",
  medium: "text-amber-300/80 border-amber-300/30",
  hard: "text-red-300/80 border-red-400/30",
};

/* =====================================================================
 * QuizCard
 * Purely presentational. One quiz object in, one card out.
 *
 * Props:
 *  - quiz        (object)   { id, title, topic, questionCount, difficulty, status }
 *  - onStart     (func)     Called with quiz.id when "Start Quiz" is clicked.
 *                           No quiz-taking logic lives here — parent decides
 *                           what "starting" a quiz actually does later.
 * =================================================================== */
export default function QuizCard({ quiz, onStart = () => {} }) {
  const { id, title, topic, questionCount, difficulty, status } = quiz;

  const difficultyStyle =
    DIFFICULTY_STYLES[difficulty] || "text-white/50 border-white/20";

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 flex flex-col gap-3 hover:border-amber-300/30 transition-colors">
      {/* Top row: title + difficulty badge */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm text-white/80">{title}</h3>
        <span
          className={`shrink-0 text-[10px] uppercase tracking-[0.15em] border rounded px-2 py-0.5 ${difficultyStyle}`}
        >
          {difficulty}
        </span>
      </div>

      {/* Metadata row */}
      <div className="text-xs text-white/40 uppercase tracking-widest">
        {topic} <span className="mx-2 text-white/20">|</span>{" "}
        {questionCount} questions
        {/* Only show status if the quiz has one (e.g. "in progress") —
            not every quiz needs this, so it's optional metadata. */}
        {status && (
          <>
            <span className="mx-2 text-white/20">|</span>
            {status}
          </>
        )}
      </div>

      {/* Start button */}
      <button
        type="button"
        onClick={() => onStart(id)}
        className="self-start mt-1 px-4 py-2 rounded-md text-xs font-semibold tracking-[0.15em] uppercase bg-amber-300 text-black hover:bg-amber-200 transition-colors"
      >
        Start Quiz
      </button>
    </div>
  );
}