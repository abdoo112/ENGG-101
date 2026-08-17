import { useState, useEffect } from "react";
import Typewriter from "./typewriter";

// -----------------------------------------------------------------------
// QUOTES DATA
// -----------------------------------------------------------------------
// This lives OUTSIDE the component function. That's important:
// if it were declared inside DailyQuote(), a brand new array would be
// created every single render, which is wasteful (and can cause bugs
// with useEffect dependencies). Since it never changes, it belongs
// at module scope.
//
// Add/replace quotes here later — just keep the { quote, author } shape.
const QUOTES = [
  {
    quote: "lock in",
    author: "you",
  },
];

// -----------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------
function DailyQuote() {
  const [showAuthor, setShowAuthor] = useState(false);
  // We store the CHOSEN quote object in state (not the whole array).
  // Initial value is `null` so we can handle the "not picked yet" case
  // cleanly on the very first render, before useEffect has run.
  const [selectedQuote, setSelectedQuote] = useState(null);

  // useEffect with an EMPTY dependency array `[]` runs exactly ONCE —
  // right after the component mounts for the first time.
  // It will NOT run again on re-renders, which is exactly the
  // "pick once, keep it stable" behavior we want.
  useEffect(() => {
    // Math.random() gives a float in [0, 1).
    // Multiplying by QUOTES.length and flooring it gives us a valid
    // random index: 0 to (QUOTES.length - 1).
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    setSelectedQuote(QUOTES[randomIndex]);
  }, []); // <-- empty array = "run once on mount"

  // GUARD CLAUSE: on the very first render, useEffect hasn't fired yet,
  // so selectedQuote is still `null`. We render nothing (or you could
  // render a skeleton/placeholder) until the quote is picked.
  // In practice this happens so fast it's not visible, but it avoids
  // trying to read `.quote` / `.author` off of `null`.
  if (!selectedQuote) {
    return null;
  }

    return (
        <div className="mt-4">
            <Typewriter
              text={`"${selectedQuote.quote}"`}
              speed={20}
              className="italic text-white/60"
              onComplete={() => setShowAuthor(true)}
            />

          {showAuthor && (
            <Typewriter
            text={` — ${selectedQuote.author}`}
            speed={15}
            className="mt-3 text-sm uppercase tracking-widest text-amber-300/60"
          />
          )}
        </div>
    );
}

export default DailyQuote;