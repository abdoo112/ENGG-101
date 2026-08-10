// Flashcards.jsx
import React from "react";
import FlashcardSetCard from "./FlashcardSetCard";

/* =====================================================================
 * MOCK_FLASHCARD_SETS
 * ⚠ PLACEHOLDER DATA — delete once real sets come from the backend.
 *
 * Backend response should match:
 * { id, title, topic, cardCount, progress }
 *
 * progress is optional — omit it entirely if a set has no progress
 * tracking yet, rather than sending 0.
 * =================================================================== */
const MOCK_FLASHCARD_SETS = [
  {
    id: "1",
    title: "Thermodynamics Key Terms",
    topic: "Thermodynamics",
    cardCount: 24,
    progress: 60,
  },
  {
    id: "2",
    title: "Statics Formulas",
    topic: "Statics",
    cardCount: 18,
    progress: 0,
  },
  {
    id: "3",
    title: "Circuit Components",
    topic: "Circuits",
    cardCount: 30,
    // no progress key — never studied, nothing to show
  },
];

/* =====================================================================
 * Flashcards
 *
 * Props:
 *  - sets      (array)   Flashcard set objects. Defaults to mock data.
 *  - onStudy   (func)    Called with set.id when a card's Study
 *                        button is clicked. Parent decides what
 *                        "studying" means later (open a study view,
 *                        navigate, etc).
 * =================================================================== */
export default function Flashcards({
  sets = MOCK_FLASHCARD_SETS,
  onStudy = () => {},
}) {
  const hasSets = sets.length > 0;

  return (
    <div className="flex-1 flex flex-col min-h-0 py-6">

      {/* ---------- Set grid / empty state ---------- */}
      {hasSets ? (
        <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sets.map((set) => (
            <FlashcardSetCard key={set.id} set={set} onStudy={onStudy} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white/40 text-sm text-center max-w-sm">
            <span className="text-amber-300/60 mr-2">&gt;</span>
            No flashcard sets yet. Upload some documents and sets will
            be generated from them.
          </p>
        </div>
      )}
    </div>
  );
}