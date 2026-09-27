import React, { useState } from "react";
import Typewriter from "./typewriter";
import DailyQuote from "./quote";
import WelcomeBanner from "./banner";
import AIChat from "./AIChat";
import Documents from "./documents";
import Quizzes from "./quizzes";
import Notes from "./notes";
import Settings from "./settings";
import { useEffect } from "react";
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
  { id: "notes", label: "Notes" },
  { id: "settings", label: "Settings" },
];

const TOOL_CONTENT = {
  chat: {
    title: "AI Assistant",
    description: "Ask anything about your engineering modules.",
  },
  documents: {
    title: "Uploaded Documents",
    description: "Manage lecture slides, notes and PDFs.",
  },
  quizzes: {
    title: "Quiz Workspace",
    description: "Test your understanding.",
  },
  notes: {
    title: "Notes",
    description: "Capture important ideas.",
  },
  settings: {
    title: "Settings",
    description: "Configure your workspace.",
  },
};

export default function Workspace() {
  const [activeTool, setActiveTool] = useState(null);
  const [showQuote, setShowQuote] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const [documents, setDocuments] = useState([]);

  // Fetch the real document list from the backend whenever the
  // Documents tool is opened.
  useEffect(() => {
    if (activeTool !== "documents") return;

    const fetchDocuments = async () => {
      try {
        const response = await fetch("http://localhost:8000/documents");
        if (!response.ok) throw new Error(`Backend responded with ${response.status}`);
        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      }
    };

    fetchDocuments();
  }, [activeTool]);

  // Uploads a real file to the backend, then refreshes the document list
  // so the newly uploaded file shows up immediately.
  const handleUploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/documents", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error(`Backend responded with ${response.status}`);
      const newDoc = await response.json();
      setDocuments((prev) => [...prev, newDoc]);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

    // Sends the user's message, then calls the backend for a real
    // assistant reply. isAssistantTyping drives the TypingIndicator
    // inside AIChat while we wait.
    const handleSendMessage = async (text) => {
      // 1. Append the user's own message immediately — no need to wait
      //    on the network to show what they just typed.
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "user", content: text },
      ]);

      // 2. Show the typing indicator while we wait on the backend.
      setIsAssistantTyping(true);

      try {
        const response = await fetch("http://localhost:8000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });

        if (!response.ok) {
          throw new Error(`Backend responded with ${response.status}`);
        }

        const data = await response.json();

        // 3. Append the assistant's real reply.
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "assistant", content: data.reply },
        ]);
      } catch (err) {
        // Honest failure state — no fake/placeholder assistant reply.
        console.error("Chat request failed:", err);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Sorry, I couldn't reach the server. Please try again.",
          },
        ]);
      } finally {
        // 4. Hide the typing indicator whether it succeeded or failed.
        setIsAssistantTyping(false);
      }
    };

  return (
      <div className="h-screen bg-black text-white/60 font-mono flex flex-col overflow-hidden">
      {/* ============================== */}
      {/* TOP NAVIGATION BAR              */}
      {/* ============================== */}
      <header className="fixed top-0 left-0 right-0 z-20 h-14 border-b border-amber-300/40 bg-black/95 backdrop-blur-sm">
        <div className="h-full flex items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-amber-300 font-bold tracking-widest text-sm sm:text-base">
              ENGG-101
            </span>
            <span className="hidden sm:inline text-white/60">/</span>
            {/* Current workspace label */}
            <span className="hidden sm:inline text-white/60 text-sm">
              workspace
            </span>
          </div>

          {/* Settings icon placeholder */}
          <button
            type="button"
            aria-label="Settings"
            onClick={() => setActiveTool("settings")}
            className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-amber-400 transition-colors"
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
      <div className="flex flex-1 pt-14 min-h-0">
        {/* ============================== */}
        {/* LEFT SIDEBAR — NAVIGATION       */}
        {/* ============================== */}
        <aside className="w-56 shrink-0 border-r border-amber-300/40 bg-black flex flex-col">
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
                      ? "border-amber-300/40 text-amber-300"
                      : "border-transparent text-white/60 hover:border-amber-300/40 hover:text-amber-300",
                  ].join(" ")}
                >
                  <span className="text-amber-300 mr-2">&gt;</span>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ============================== */}
        {/* MAIN CONTENT AREA               */}
        {/* ============================== */}
        <main className="flex-1 flex flex-col min-h-0">
          {/* ---------- Welcome area ---------- */}
          <section className="border-b border-amber-300/40 px-6 sm:px-10 py-8">
            <WelcomeBanner
              title={activeTool ? TOOL_CONTENT[activeTool].title : "Welcome back, Mohammed."}
              description={activeTool ? TOOL_CONTENT[activeTool].description : undefined}
              showQuote={activeTool === null}
            />
          </section>
          {/* ---------- Empty state ---------- */}
          
          {/* ---------- Main content: chat / empty state / other tools ---------- */}
          <section className="flex-1 flex flex-col min-h-0 px-6">
            {activeTool === "chat" ? (
            <AIChat
              messages={messages}
              onSendMessage={handleSendMessage}
              onUploadClick={() => {/* wire to file input later */}}
              isAssistantTyping={isAssistantTyping}
            />
            ) :activeTool === "documents" ? (
            <Documents
              documents={documents}
              onUploadClick={handleUploadDocument}
            />
            ) : activeTool === "quizzes" ? (
            <Quizzes
            // quizzes={realQuizzesFromState}   // ← swap in later
              onStartQuiz={(quizId) => {/* wire up later */}}
            />
            ) : activeTool === "notes" ? (
            <Notes
            // notes={realNotesFromState}   // ← swap in later
            />
            ) : activeTool === "settings" ? (
            <Settings />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center px-8 py-10 max-w-md">
                  <p className="text-white/60 text-sm">
                    <span className="text-white/60">&gt;</span>{" "}
                      Select a tool from the sidebar to begin.
                  </p>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}