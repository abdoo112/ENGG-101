import { useState, useEffect } from "react";
import Typewriter from "./typewriter";
import DailyQuote from "./quote";

/**
 * WelcomeBanner.jsx
 *
 * Reusable header for the Workspace main content area.
 * Renders a typed title + typed description, and optionally
 * a DailyQuote once typing is done.
 *
 * Layout note: each row reserves a fixed min-height matching its
 * text size, so the section doesn't grow/shift as characters type in.
 */
export default function WelcomeBanner({
  title,
  description,
  showQuote = false,
  speed = 40,
}) {
  const [titleDone, setTitleDone] = useState(false);
  const [descriptionDone, setDescriptionDone] = useState(false);

  useEffect(() => {
    setTitleDone(false);
    setDescriptionDone(false);
  }, [title, description]);

  // Quote should appear once title is done AND either:
  //  - the description has also finished typing, OR
  //  - there is no description at all (so we're not waiting on something that'll never fire)
  const readyForQuote = titleDone && (descriptionDone || !description);

  return (
    // min-h reserves space for title row + description row + quote row up front,
    // so nothing below the banner jumps as text fills in.
    <div className="min-h-[9.5rem] sm:min-h-[8rem]">
      {/* Title row — fixed height matching text-4xl's line box, so the row
          doesn't grow taller as characters are added */}
      <div className="min-h-[2.75rem]">
        <Typewriter
          key={`title-${title}`}
          className="text-white/60 text-4xl font-bold"
          text={title}
          speed={speed}
          onComplete={() => setTitleDone(true)}
        />
      </div>

      {/* Description row — reserved height even before it starts typing,
          so its appearance doesn't push the quote down when it kicks in */}
      {description && (
        <div className="min-h-[1.25rem] mt-2">
          {titleDone && (
            <Typewriter
              key={`desc-${description}`}
              className="block text-white/40 text-sm"
              text={description}
              speed={Math.max(speed - 15, 10)}
              onComplete={() => setDescriptionDone(true)}
            />
          )}
        </div>
      )}

      {/* Quote row */}
      {showQuote && readyForQuote && <DailyQuote />}
    </div>
  );
}