import React, { useState, useEffect } from "react";

/**
 * Typewriter.jsx
 *
 * A reusable "typing animation" component. It reveals the given `text`
 * one character at a time, then leaves a blinking terminal-style cursor
 * behind once it's done.
 *
 * Props:
 *  - text      (string)  The full string to type out.
 *  - speed     (number)  Milliseconds between each character. Default: 40.
 *  - className (string)  Optional extra Tailwind/CSS classes for the text.
 */
export default function Typewriter({ text = "", speed = 40, className = "", onComplete = () => {}, }) {
  // ---------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------
  const [finished, setFinished] = useState(false);
  // `displayedText` holds the portion of `text` we've "typed" so far.
  // It starts empty and grows one character at a time.
  const [displayedText, setDisplayedText] = useState("");

  // `currentIndex` tracks how many characters we've revealed.
  // We use this instead of just checking displayedText.length so the
  // logic below stays simple and explicit.
  const [currentIndex, setCurrentIndex] = useState(0);

  // ---------------------------------------------------------------
  // EFFECT: type one character at a time
  // ---------------------------------------------------------------
  // This effect re-runs whenever `currentIndex`, `text`, or `speed`
  // change. Each time it runs, it checks whether there are still
  // characters left to type. If so, it schedules a timeout that adds
  // the next character after `speed` milliseconds.
  useEffect(() => {
    // If we've already typed the whole string, stop here.
    // (This is what makes the animation "stop once fully typed".)
    if (currentIndex >= text.length) {
      if (!finished) {
        setFinished(true);
        onComplete();
      }
      return;
    }

    // setTimeout schedules the next character to be typed after
    // `speed` ms. We store the timeout ID so we can cancel it in the
    // cleanup function below if the component re-renders or unmounts
    // before it fires.
    const timeoutId = setTimeout(() => {
      // Add the next character from `text` onto what we've already typed.
      setDisplayedText((prev) => prev + text[currentIndex]);

      // Move the index forward by one so the effect knows to type the
      // next character on its next run.
      setCurrentIndex((prev) => prev + 1);
    }, speed);

    // Cleanup: if this effect runs again (or the component unmounts)
    // before the timeout fires, cancel the pending timeout. This
    // prevents duplicate/overlapping character updates.
    return () => clearTimeout(timeoutId);
  }, [currentIndex, text, speed]);

  // ---------------------------------------------------------------
  // EFFECT: reset animation if the `text` prop changes
  // ---------------------------------------------------------------
  // Without this, if a parent component swaps in a new `text` string,
  // the old typed characters would still be showing and typing would
  // resume from the wrong index. This effect watches `text` and
  // restarts the animation whenever it changes.
  useEffect(() => {
  setDisplayedText("");
  setCurrentIndex(0);
  setFinished(false);
  }, [text]);

  // ---------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------
  return (
    <span className={className}>
      {/* The text typed so far */}
      {displayedText}
    </span>
  );
}