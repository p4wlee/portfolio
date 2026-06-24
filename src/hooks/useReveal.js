import { useEffect, useRef } from "react";

// Custom hook: reveals an element with a CSS animation the first time
// it scrolls into view. Reusable across any section (About, Skills, etc.).
export default function useReveal() {
  // Create the "post-it" that will point to the real DOM element.
  // Starts as null; React fills .current once the component attaches it.
  const ref = useRef(null);

  useEffect(() => {
    // Grab the real DOM element the ref is now pointing to.
    const el = ref.current;
    // Safety guard: if the element doesn't exist yet, bail out
    // instead of crashing on a null reference.
    if (!el) return;

    // Create the "watchman": it fires the callback when the element
    // crosses the visibility threshold inside the viewport.
    const observer = new IntersectionObserver(
      // The callback receives an array of entries; we watch a single
      // element, so we destructure the first (and only) one.
      ([entry]) => {
        // isIntersecting is true the moment the element enters the viewport.
        if (entry.isIntersecting) {
          // Add the class that triggers the CSS animation.
          el.classList.add("is-visible");
          // Stop watching THIS element so the animation runs only once.
          observer.unobserve(el);
        }
      },
      // Trigger when at least 40% of the element is visible.
      { threshold: 0.4 },
    );

    // Start watching the element.
    observer.observe(el);

    // Cleanup: shut the watchman down entirely when the component unmounts,
    // to avoid memory leaks.
    return () => {
      observer.disconnect();
    };
  }, []); // Empty deps → run this setup only once, after the first render.

  // Return the ref so the component can attach it to the element to animate.
  return ref;
}
