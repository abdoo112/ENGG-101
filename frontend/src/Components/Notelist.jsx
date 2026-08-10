// NoteList.jsx
import React from "react";

/* =====================================================================
 * NoteList
 * Sidebar list of notes. Purely presentational — highlights whichever
 * note matches selectedId, calls onSelect when a different one is
 * clicked. Doesn't own selection state itself.
 *
 * Props:
 *  - notes       (array)  { id, title, topic, updatedAt, content }
 *  - selectedId  (string) id of the currently viewed note
 *  - onSelect    (func)   called with note.id when a list item is clicked
 * =================================================================== */
export default function NoteList({ notes, selectedId, onSelect }) {
  return (
    <nav className="flex flex-col gap-1 overflow-y-auto">
      {notes.map((note) => {
        const isActive = note.id === selectedId;
        return (
          <button
            key={note.id}
            type="button"
            onClick={() => onSelect(note.id)}
            className={[
              "text-left px-3 py-2 rounded-md border transition-colors",
              isActive
                ? "border-amber-300/40 bg-amber-300/5"
                : "border-transparent hover:border-white/10 hover:bg-white/5",
            ].join(" ")}
          >
            <p
              className={[
                "text-sm truncate",
                isActive ? "text-amber-300" : "text-white/70",
              ].join(" ")}
            >
              {note.title}
            </p>
            <p className="mt-0.5 text-[10px] uppercase tracking-widest text-white/30">
              {note.topic} <span className="mx-1.5">|</span> {note.updatedAt}
            </p>
          </button>
        );
      })}
    </nav>
  );
}