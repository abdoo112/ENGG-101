// Notes.jsx
import React, { useState } from "react";
import NoteList from "./NoteList";
import NoteViewer from "./NoteViewer";

/* =====================================================================
 * MOCK_NOTES
 * ⚠ PLACEHOLDER DATA — delete once real notes come from the backend.
 *
 * Backend response should match:
 * { id, title, topic, updatedAt, content }
 * =================================================================== */
const MOCK_NOTES = [
  {
    id: "1",
    title: "Thermodynamics — First Law Summary",
    topic: "Thermodynamics",
    updatedAt: "Aug 9, 2026",
    content:
      "The first law of thermodynamics states that energy cannot be created or destroyed, only transferred or converted from one form to another...",
  },
  {
    id: "2",
    title: "Statics — Equilibrium Conditions",
    topic: "Statics",
    updatedAt: "Aug 7, 2026",
    content:
      "A rigid body is in equilibrium when the sum of all forces and the sum of all moments acting on it are both zero...",
  },
];

/* =====================================================================
 * Notes
 *
 * Props:
 *  - notes  (array)  Note objects. Defaults to mock data for now.
 * =================================================================== */
export default function Notes({ notes = MOCK_NOTES }) {
  // Selection is local UI state — which note is being viewed right
  // now. This isn't "data" in the same sense as the notes array
  // itself, so it's fine for this component to own it directly
  // rather than lifting it to Workspace.jsx.
  const [selectedId, setSelectedId] = useState(notes[0]?.id ?? null);

  const hasNotes = notes.length > 0;
  const selectedNote = notes.find((n) => n.id === selectedId) || null;

  return (
    <div className="flex-1 flex flex-col min-h-0 py-6">
      {/* ---------- Heading ---------- */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm uppercase tracking-[0.2em] text-white/60">
          <span className="text-amber-300 mr-2">&gt;</span>
          Notes
        </h2>
      </div>

      {hasNotes ? (
        // Two-column layout: list on the left, content on the right.
        // min-h-0 on the row lets both columns scroll independently.
        <div className="flex-1 flex min-h-0 gap-6">
          <div className="w-64 shrink-0 border-r border-white/10 pr-4 flex flex-col min-h-0">
            <NoteList
              notes={notes}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
          <NoteViewer note={selectedNote} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white/40 text-sm text-center max-w-sm">
            <span className="text-amber-300/60 mr-2">&gt;</span>
            No notes yet. Upload some documents and notes will be
            generated from them.
          </p>
        </div>
      )}
    </div>
  );
}