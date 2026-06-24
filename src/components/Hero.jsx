import { useState, useEffect } from "react";

// The role text, typed out one character at a time below. Kept outside the
// component because it never changes — no need to recreate it on every render.
const ROLE = "Back-End Developer";

// Hero section: static name plus a typewriter effect that reveals the role
// character by character, followed by a blinking cursor that disappears once
// typing is complete.
export default function Hero() {
  const [text, setText] = useState(""); // visible portion of ROLE, grows over time

  // Derived value, not state: the cursor shows while there's still text left to
  // type. Recomputed on every render, so it always stays in sync with `text`.
  const showCursor = text.length < ROLE.length;

  useEffect(() => {
    if (text.length === ROLE.length) return; // done typing: don't start a new timer

    // Every 80ms, reveal one more character by slicing ROLE one char longer.
    const timer = setInterval(() => {
      setText((prev) => ROLE.slice(0, prev.length + 1));
    }, 80);

    return () => clearInterval(timer); // clear the timer before the effect re-runs
  }, [text]); // re-run whenever `text` changes, driving the animation forward

  return (
    <section id="hero" className="hero">
      <h1>Davide Paulicelli</h1>
      <p>
        {text}
        {/* Cursor shown only while typing (see showCursor above) */}
        {showCursor && <span className="cursor">|</span>}
      </p>
    </section>
  );
}
