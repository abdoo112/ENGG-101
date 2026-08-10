// Quizzes.jsx
import React from "react";
import QuizCard from "./QuizCard";

/* =====================================================================
 * MOCK_QUIZZES
 * ⚠ PLACEHOLDER DATA — delete once real quizzes come from the backend.
 *
 * Backend response should match:
 * { id, title, topic, questionCount, difficulty, status }
 *
 * difficulty is one of: "easy" | "medium" | "hard"
 * status is optional (e.g. "Not started" | "In progress" | "Completed")
 * =================================================================== */
const MOCK_QUIZZES = [
  {
    id: "1",
    title: "Thermodynamics Fundamentals",
    topic: "Thermodynamics",
    questionCount: 12,
    difficulty: "medium",
    status: "Not started",
  },
  {
    id: "2",
    title: "Statics: Force Equilibrium",
    topic: "Statics",
    questionCount: 8,
    difficulty: "easy",
    status: "Completed",
  },
  {
    id: "3",
    title: "Circuit Analysis Deep Dive",
    topic: "Circuits",
    questionCount: 15,
    difficulty: "hard",
    status: "In progress",
  },
];

/* =====================================================================
 * Quizzes
 *
 * Props:
 *  - quizzes   (array)   Quiz objects. Defaults to mock data for now.
 *  - onStartQuiz (func)  Called with quiz.id when a card's Start
 *                        button is clicked. Parent decides what
 *                        "starting" means (navigate, open modal, etc).
 * =================================================================== */
export default function Quizzes({
  quizzes = MOCK_QUIZZES,
  onStartQuiz = () => {},
}) {
  const hasQuizzes = quizzes.length > 0;

  return (
    <div className="flex-1 flex flex-col min-h-0 py-6">
      {/* ---------- Heading ---------- */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm uppercase tracking-[0.2em] text-white/60">
          <span className="text-amber-300 mr-2">&gt;</span>
          Quizzes
        </h2>
      </div>

      {/* ---------- Quiz grid / empty state ---------- */}
      {hasQuizzes ? (
        <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} onStart={onStartQuiz} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white/40 text-sm text-center max-w-sm">
            <span className="text-amber-300/60 mr-2">&gt;</span>
            No quizzes yet. Upload some documents and quizzes will be
            generated from them.
          </p>
        </div>
      )}
    </div>
  );
}