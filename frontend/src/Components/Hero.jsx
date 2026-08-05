/**
 * Hero.jsx — ENGG-101 Landing Page Hero Section
 *
 * Reusable: all copy, labels, and links are passed as props with sane defaults.
 * Swap props in App.jsx or any parent — the component owns zero hardcoded content.
 */
import { FaGithub } from "react-icons/fa";
const Hero = ({
  systemLabel  = "ENGG-101 // OS v0.1.0",
  headline     = "ENGG-101",
  description  = "A study workspace for engineering students.",
  primaryCta   = { label: "INITIALIZE SYSTEM", href: "#modules" },
}) => {
  return (
    /*
     * OUTER WRAPPER
     * relative          — establishes stacking context for absolutely-placed glows
     * min-h-screen      — always fills the full viewport height
     * w-full            — stretches to container width
     * bg-[#000]         — black background #000
     * flex flex-col     — column stack: top bar → center content → bottom bar
     * items-center      — center children horizontally
     * overflow-hidden   — clips the decorative radial glows at the edges
     * font-mono         — JetBrains Mono / system monospace for everything in the hero
     */
    <section className="relative min-h-screen w-full bg-[#000] flex flex-col items-center overflow-hidden font-mono">

      {/* ── TOP SYSTEM BAR ────────────────────────────────────────────────
          Mimics an OS title bar / HUD header strip.
          w-full              — full width
          border-b            — 1px bottom rule
          border-green-400/40      — visible green separator (40% opacity)
          px-6 md:px-12       — responsive side padding
          py-3                — vertical padding (slim bar)
          flex items-center justify-between — label on left, dots on right   */}
      <div className="w-full border-b border-green-400/40 px-6 md:px-12 py-3 flex items-center justify-between">

        {/* System label — left side */}
        <span
          /*
           * text-xs         — 12px; small utility text
           * tracking-[0.2em] — wide letter-spacing to feel like a system readout
            * text-green-400/60 — muted green; not as bright as the top bar border
           */
          className="text-xs tracking-[0.2em] text-green-400/60"
        >
          {systemLabel}
        </span>
      </div>

      {/* ── MAIN CONTENT BLOCK ────────────────────────────────────────────
          flex-1             — grows to fill remaining vertical space between the two bars
          flex flex-col      — vertical stack
          items-center       — horizontal center
          justify-center     — vertical center
          text-center        — center-align all inline text
          px-6 md:px-12      — breathing room on small screens             */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12">

        {/* ── HEADLINE ────────────────────────────────────────────────── */}
        <h1
          /*
           * text-[clamp(4rem,14vw,10rem)]
           *   — fluid type: never smaller than 4rem, never larger than 10rem,
           *     scales with viewport width between those bounds.
           *     This is the signature move: a title that owns the full viewport.
           * font-black        — heaviest weight (900); maximum presence
           * leading-none      — line-height 1; headline is a single tight block
           * tracking-[-0.03em]— very slight negative tracking on display type
           *                     prevents wide-spaced uppercase from feeling loose
           * mb-3              — 12px gap before the subheadline
           *
           * Gradient treatment:
           * bg-gradient-to-br — diagonal gradient (top-left → bottom-right)
           * from-white        — starts pure white
           * via-cyan-100/90   — passes through near-white cyan in the middle
           * to-cyan-400/70    — ends at a muted cyan (the terminal-screen accent)
           * bg-clip-text      — clips the background to the text shape
           * text-transparent  — makes the text fill transparent so gradient shows
           */
          className="text-[clamp(4rem,14vw,10rem)] font-black tracking-[0.3em] leading-none mb-10 text-green-500"
        >
          {headline}
        </h1>

        {/* ── HORIZONTAL RULE ─────────────────────────────────────────── */}
        <div
          /*
           * w-px              — 1px wide (vertical line, will be rotated by flex)
           *   → actually: w-24 h-px is a horizontal rule
           * w-24              — 96px wide
           * h-px              — 1px tall
           * bg-gradient-to-r  — fades left to right
           * from-transparent via-green-500 to-transparent
           *   — a "glow line" that fades in and out at the edges; avoids hard stops
           * mb-10             — 40px gap after the rule
           */
          className="w-24 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent mb-10 animate-pulse"
        />

        {/* ── DESCRIPTION ─────────────────────────────────────────────── */}
        <p
          /*
           * max-w-lg          — caps line length at ~512px; improves readability
           * text-sm           — 14px body
           * leading-relaxed   — line-height 1.625; comfortable for multi-line prose
           * text-white/40     — low-opacity white; clearly tertiary information
           * mb-12             — 48px gap before CTAs
           */
          className="max-w-lg text-sm leading-relaxed text-white/40 mb-12"
        >
          {description}
        </p>

        {/* ── CTA BUTTONS ─────────────────────────────────────────────── */}
        <div
          /*
           * flex              — row by default, column on very small screens
           * flex-col sm:flex-row — stacks vertically on mobile, side-by-side on sm+
           * items-center      — center the column stack on mobile
           * gap-4             — 16px between buttons
           * mb-16             — 64px gap before the status bar below
           */
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          {/* PRIMARY CTA */}
          <a
            href={primaryCta.href}
            /*
             * group            — registers this element as a hover group;
             *                    lets children use group-hover: variants
             * relative         — stacking context for the inner shimmer span
             * inline-flex items-center gap-2
             *                  — inline row, vertically centered content + gap
             * px-7 py-3        — 28px / 12px padding
             * text-xs          — keeps the button text small and tight
             * tracking-[0.2em] — wide caps feel
             * font-semibold    — slightly heavier than default
             * text-[#000]   — matches page background; text "cut out" of button
             * bg-cyan-400      — solid cyan fill; the only saturated element on the page
             * border border-cyan-400
             *                  — border matches fill; creates a contained block
             * hover:bg-cyan-300 hover:border-cyan-300
             *                  — slightly lighter on hover; crisp, not flashy
             * transition-colors duration-200
             *                  — smooth 200ms colour swap
             * overflow-hidden  — clips the shimmer span that slides across
             */
            className="group relative inline-flex items-center gap-2 px-7 py-3 text-xs tracking-[0.2em] font-semibold text-[#000] bg-green-500 border border-green-500 hover:bg-green-500 hover:border-green-500 transition-colors duration-200 overflow-hidden"
          >
            {/*
             * Shimmer overlay:
             * absolute inset-0         — stretches to fill the button
             * -translate-x-full        — starts fully off-screen left
             * group-hover:translate-x-full — slides right across on hover
             * bg-gradient-to-r from-transparent via-black/20 to-transparent
             *                          — a thin bright band
             * transition-transform duration-500
             *                          — slower than the colour; reads as a sweep
             * pointer-events-none      — never blocks clicks
             */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-black/20 to-transparent transition-transform duration-500 pointer-events-none" />
            {primaryCta.label}
          </a>
          
        </div>

      </div>

      {/* ── BOTTOM SYSTEM BAR ─────────────────────────────────────────────
          Mirrors the top bar. Anchors the section visually.                 */}
      <div className="w-full border-t border-green-400/40 px-6 md:px-12 py-3 flex justify-start items-center gap-4">
  <a
    href="https://github.com/abdoo112/ENGG-101"
    target="_blank"
    rel="noopener noreferrer"
    className="
      text-green-500/70
      hover:text-green-300
      transition-all
      duration-300
      hover:scale-110
    "
    aria-label="GitHub Repository"
  >
    <FaGithub size={22} />
  </a>
</div>
    </section>
  );
};

export default Hero;