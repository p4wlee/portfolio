import { useEffect, useState } from "react";

// Custom hook: tracks which section is currently in view and returns its id.
// The Navbar uses it to highlight the matching link. Like useReveal it uses
// an Intersection Observer, but it watches many elements, remembers the
// result via state, and never unobserves (it must track for the whole page).
export default function useActiveSection() {
  // The "scoreboard": remembers the active section's id. Starts at "hero"
  // since that's on screen at load, so the Navbar lights up the right link
  // immediately with no empty flash.
  const [activeSectionId, setActiveSectionId] = useState("hero");

  useEffect(() => {
    // Grab all sections that have an id, once on mount (not on every scroll).
    const sections = document.querySelectorAll("section[id]");

    // The "watchman": fires the callback when a section crosses the threshold.
    const observer = new IntersectionObserver(
      // entries = only the sections crossing right now, not the whole list.
      (entries) => {
        entries.forEach((entry) => {
          // Act only on a section that is ENTERING view; ignore the leaving ones.
          if (entry.isIntersecting) {
            // entry.target is the DOM <section>; .id is its id ("about"...).
            // Writing to state re-renders and propagates the value to Navbar.
            setActiveSectionId(entry.target.id);
          }
        });
      },
      // Fire only when at least 50% of a section is visible (vs 0.15 in
      // useReveal), so the active one truly dominates the screen.
      { threshold: 0.5 },
    );

    // observe() takes one element at a time, so watch each section in turn.
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Cleanup on unmount: shut the watchman down to avoid a "ghost guard".
    return () => {
      observer.disconnect();
    };
  }, []); // Empty deps → set up the observer only once, after the first render.

  // Return the active id so App can read it and pass it down to Navbar.
  return activeSectionId;
}
