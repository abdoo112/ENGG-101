// AIChat.jsx
import React, { useState, useRef, useEffect } from "react";

/* =====================================================================
 * ChatMessage
 * A single message bubble. Purely presentational — takes a role and
 * content, decides its own alignment/color based on role.
 * =================================================================== */
function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    // justify-end pushes user messages to the right, assistant to the left.
    // This is the classic chat-UI alignment convention.
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[75%] rounded-lg border px-4 py-3 text-sm leading-relaxed",
          // Terminal-style role coloring:
          // user bubbles: amber border, subtle amber-tinted bg
          // assistant bubbles: muted white border, near-black bg
          isUser
            ? "bg-amber-300/10 border-amber-300/40 text-amber-100"
            : "bg-white/5 border-white/10 text-white/80",
        ].join(" ")}
      >
        {/* Small role label above the text, terminal-prompt style */}
        <div
          className={[
            "mb-1 text-[10px] tracking-[0.2em] uppercase",
            isUser ? "text-amber-300/60" : "text-white/40",
          ].join(" ")}
        >
          {isUser ? "> you" : "> assistant"}
        </div>
        {/* whitespace-pre-wrap preserves line breaks the user/assistant typed */}
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}

/* =====================================================================
 * TypingIndicator
 * Shown while isAssistantTyping is true. No fake text — just a
 * minimal pulse to indicate "waiting on a response".
 * =================================================================== */
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300/60 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300/60 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300/60 animate-bounce" />
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
 * ChatMessageList
 * Scrollable conversation area. Auto-scrolls to the newest message
 * whenever `messages` or `isAssistantTyping` changes.
 * =================================================================== */
function ChatMessageList({ messages, isAssistantTyping }) {
  // A ref on an empty div placed at the very bottom of the list.
  // Scrolling this into view is the standard "scroll to bottom" trick —
  // simpler and more reliable than manually setting scrollTop.
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAssistantTyping]);

  // Real empty state — no fake placeholder conversation.
  if (messages.length === 0 && !isAssistantTyping) {
    return (
      <div className="flex-1 flex items-center justify-center px-6">
        <p className="text-white/40 text-sm">
          <span className="text-amber-300/60 mr-2">&gt;</span>
          No messages yet. Start the conversation below.
        </p>
      </div>
    );
  }

  return (
    // overflow-y-auto + flex-1 is what makes this region independently
    // scrollable while the input bar below stays fixed in place.
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
      ))}
      {isAssistantTyping && <TypingIndicator />}
      {/* Scroll anchor — always the last element */}
      <div ref={bottomRef} />
    </div>
  );
}

/* =====================================================================
 * ChatInputBar
 * Multiline textarea + upload + send. Local state here is just the
 * in-progress draft text — NOT the conversation itself.
 * =================================================================== */
function ChatInputBar({ onSendMessage, onUploadClick }) {
  const [draft, setDraft] = useState("");
  const textareaRef = useRef(null);

  // Auto-grow the textarea height as the user types, capped by max-h
  // set in the className below (so it doesn't grow forever).
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [draft]);

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) return; // guard against sending empty/whitespace-only messages
    onSendMessage(trimmed);
    setDraft("");
  };

  // Enter sends, Shift+Enter inserts a newline — standard chat-input behavior.
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-amber-300/40 bg-black px-4 sm:px-6 py-4">
      <div className="flex items-end gap-3 rounded-lg border border-white/10 bg-white/5 p-2">
        {/* Upload button — UI only, no file-handling logic here.
            Parent decides what "upload" actually does. */}
        <button
          type="button"
          onClick={onUploadClick}
          aria-label="Upload file"
          className="shrink-0 w-9 h-9 flex items-center justify-center rounded-md text-white/50 hover:text-amber-300 hover:bg-white/5 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-5 h-5"
          >
            <path d="M12 3v12" />
            <path d="M7 8l5-5 5 5" />
            <path d="M5 21h14" />
          </svg>
        </button>

        {/* Multiline textarea. rows={1} + auto-grow effect above keeps it
            compact for short messages, expanding as needed. */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something..."
          className="flex-1 resize-none bg-transparent text-sm text-white/80 placeholder-white/30 outline-none py-2 max-h-40 font-mono"
        />

        {/* Send button — disabled when there's nothing to send */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!draft.trim()}
          className="shrink-0 px-4 py-2 rounded-md text-xs font-semibold tracking-[0.15em] uppercase bg-amber-300 text-black disabled:bg-white/10 disabled:text-white/30 hover:bg-amber-200 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}

/* =====================================================================
 * AIChat — main export
 * Composes list + input bar. Owns NO conversation state and NO API
 * logic — it's a pure controlled component driven entirely by props.
 * =================================================================== */
export default function AIChat({
  messages = [],
  onSendMessage,
  onUploadClick = () => {},
  isAssistantTyping = false,
}) {
  return (
    // h-full assumes the parent gives this a bounded height (the main
    // content area in Workspace.jsx already does, via flex-1).
    <div className="flex flex-col h-full min-h-0 bg-black">
      <ChatMessageList messages={messages} isAssistantTyping={isAssistantTyping} />
      <ChatInputBar onSendMessage={onSendMessage} onUploadClick={onUploadClick} />
    </div>
  );
}