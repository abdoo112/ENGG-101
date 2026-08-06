import React, { useState } from "react";

/**
 * Workspace.jsx
 * ENGG-101 — Workspace page
 *
 * Retro terminal-inspired layout: black background, amber accents,
 * monospaced type. No fake data, no backend logic — layout only.
 */

const NAV_ITEMS = [
  { id: "chat", label: "AI Chat" },
  { id: "documents", label: "Uploaded Documents" },
  { id: "quizzes", label: "Quizzes" },
  { id: "flashcards", label: "Flashcards" },
  { id: "notes", label: "Notes" },
  { id: "settings", label: "Settings" },
];

export default function Workspace() {
  const [activeTool, setActiveTool] = useState(null);

  return (
    <div className="min-h-screen bg-black text-amber-400 font-mono flex flex-col">
      {/* ============================== */}
      {/* TOP NAVIGATION BAR              */}
      {/* ============================== */}
      <header className="fixed top-0 left-0 right-0 z-20 h-14 border-b border-amber-500/30 bg-black/95 backdrop-blur-sm">
        <div className="h-full flex items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-bold tracking-widest text-sm sm:text-base">
              ENGG-101
            </span>
            <span className="hidden sm:inline text-amber-600">/</span>
            {/* Current workspace label */}
            <span className="hidden sm:inline text-amber-500/70 text-sm">
              workspace
            </span>
          </div>

          {/* Settings icon placeholder */}
          <button
            type="button"
            aria-label="Settings"
            className="w-8 h-8 flex items-center justify-center border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4 h-4"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </header>

      {/* ============================== */}
      {/* PAGE BODY (below fixed header)  */}
      {/* ============================== */}
      <div className="flex flex-1 pt-14">
        {/* ============================== */}
        {/* LEFT SIDEBAR — NAVIGATION       */}
        {/* ============================== */}
        <aside className="w-56 shrink-0 border-r border-amber-500/30 bg-black flex flex-col">
          <nav className="flex flex-col p-3 gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTool === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTool(item.id)}
                  className={[
                    "text-left px-3 py-2 text-sm border transition-colors",
                    isActive
                      ? "border-amber-400 bg-amber-500/10 text-amber-300"
                      : "border-transparent text-amber-500/70 hover:border-amber-500/40 hover:bg-amber-500/5 hover:text-amber-400",
                  ].join(" ")}
                >
                  <span className="text-amber-600 mr-2">&gt;</span>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ============================== */}
        {/* MAIN CONTENT AREA               */}
        {/* ============================== */}
        <main className="flex-1 flex flex-col">
          {/* ---------- Welcome area ---------- */}
          <section className="border-b border-amber-500/30 px-6 sm:px-10 py-8">
            {/* Typing animation placeholder */}
            <h1 className="text-lg sm:text-xl text-amber-300 tracking-tight">
              <span className="text-amber-600">$</span>{" "}
              {/* TODO: implement typing animation here */}
              <span>Welcome back.</span>
              <span className="ml-1 inline-block w-2 h-5 align-middle bg-amber-400 animate-pulse" />
            </h1>

            {/* Motivational quote placeholder */}
            <p className="mt-3 text-sm text-amber-500/60 italic">
              {/* TODO: rotate quotes here */}
              "Quote placeholder — insert motivational engineering quote."
            </p>
          </section>

          {/* ---------- Empty state ---------- */}
          <section className="flex-1 flex items-center justify-center px-6">
            {activeTool === null ? (
              <div className="text-center border border-amber-500/20 px-8 py-10 max-w-md">
                <p className="text-amber-500/80 text-sm">
                  <span className="text-amber-600">&gt;</span> Select a tool
                  from the sidebar to begin.
                </p>
              </div>
            ) : (
              <div className="text-center border border-amber-500/20 px-8 py-10 max-w-md">
                <p className="text-amber-500/80 text-sm">
                  <span className="text-amber-600">&gt;</span>{" "}
                  {NAV_ITEMS.find((n) => n.id === activeTool)?.label}{" "}
                  selected.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}