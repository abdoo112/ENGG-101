// NoteViewer.jsx
import React from "react";

/* =====================================================================
 * NoteViewer
 * Renders the currently selected note's content. Purely presentational.
 *
 * Props:
 *  - note   (object | null)  { id, title, topic, updatedAt, content }
 *                             null when nothing is selected (e.g. the
 *                             note list is empty).
 * =================================================================== */
export default function NoteViewer({ note }) {
  // No note selected — real empty state, not a fake placeholder note.
  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-white/40 text-sm">
          <span className="text-amber-300/60 mr-2">&gt;</span>
          Select a note to view it.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      {/* Note header */}
      <div className="mb-4 pb-4 border-b border-white/10">
        <h3 className="text-lg text-white/80">{note.title}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest text-white/40">
          {note.topic} <span className="mx-2 text-white/20">|</span>{" "}
          Updated {note.updatedAt}
        </p>
      </div>

      {/* Note content — whitespace-pre-wrap preserves line breaks
          exactly as the backend/AI sends them, same trick used in
          ChatMessage for chat bubbles. */}
      <p className="text-sm leading-relaxed text-white/70 whitespace-pre-wrap">
        {note.content}
      </p>
    </div>
  );
}