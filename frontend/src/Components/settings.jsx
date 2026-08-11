// Settings.jsx
import React, { useState } from "react";

/* =====================================================================
 * SettingsRow
 * Small local helper component — a label + description on the left,
 * a control (toggle/select/etc) on the right. Kept in this file since
 * it's only used here and isn't meaningful on its own elsewhere.
 * =================================================================== */
function SettingsRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-6 py-4 border-b border-white/10 last:border-b-0">
      <div>
        <p className="text-sm text-white/80">{label}</p>
        {description && (
          <p className="mt-1 text-xs text-white/40">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}


/* =====================================================================
 * Settings
 *
 * All state here is LOCAL and does NOT persist anywhere yet — no
 * backend call, no localStorage. It exists purely to demonstrate the
 * UI interactions (toggling, selecting) as required.
 *
 * When persistence is added later, this is the component where you'd
 * add a fetch-on-mount (to load saved settings) and a save call
 * (on change or via a "Save" button) — the controls themselves
 * wouldn't need to change.
 * =================================================================== */
export default function Settings() {
  // ---- Appearance ----
  const [theme, setTheme] = useState("terminal"); // "terminal" | "light" (future)
  
  // ---- Account ----
  // Placeholder — real account data (name/email) would come from
  // the backend once auth exists. Not building auth per instructions.
  const accountName = "Mohammed";
  const accountEmail = "mohammed@example.com";

  return (
    <div className="flex-1 flex flex-col min-h-0 py-6 overflow-y-auto max-w-2xl">
      <h2 className="text-sm uppercase tracking-[0.2em] text-white/60 mb-6">
        <span className="text-amber-300 mr-2">&gt;</span>
        Settings
      </h2>

      {/* ---------- Appearance ---------- */}
      <section className="mb-8">
        <h3 className="text-xs uppercase tracking-[0.15em] text-amber-300/70 mb-2">
          Appearance
        </h3>
        <div className="rounded-lg border border-white/10 bg-white/5 px-4">
          <SettingsRow
            label="Theme"
            description="Visual style of the workspace."
          >
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-black border border-white/10 rounded-md text-xs text-white/70 px-3 py-1.5 outline-none focus:border-amber-300/50"
            >
              <option value="terminal">Terminal (default)</option>
              <option value="light">Light (coming soon)</option>
            </select>
          </SettingsRow>
        </div>
      </section>
      {/* ---------- Account ---------- */}
      <section className="mb-8">
        <h3 className="text-xs uppercase tracking-[0.15em] text-amber-300/70 mb-2">
          Account
        </h3>
        <div className="rounded-lg border border-white/10 bg-white/5 px-4">
          <SettingsRow label="Name">
            <span className="text-xs text-white/50">{accountName}</span>
          </SettingsRow>
          <SettingsRow label="Email">
            <span className="text-xs text-white/50">{accountEmail}</span>
          </SettingsRow>
        </div>
      </section>
    </div>
  );
}