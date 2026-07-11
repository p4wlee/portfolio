import useReveal from "../hooks/useReveal";
import { useState, useEffect } from "react";

// Repos to hide from the portfolio: this site's own repo and the old one.
// Filtered out by name before the data ever reaches state.
const EXCLUDE = ["portfolio", "portfolio-personale"];

// Projects section: fetches the public repos from the GitHub API on mount,
// filters out the excluded ones, and renders each as a card in a responsive
// grid. Handles the three async states (loading / error / data) with guards.
export default function Projects() {
  // Reveal hook: adds `is-visible` to the section once it scrolls into view,
  // which the SCSS uses to slide the cards up into place.
  const ref = useReveal();

  // Three pieces of state, one per async phase.
  const [data, setData] = useState(null); // the repos once they arrive
  const [loading, setLoading] = useState(true); // true until the fetch settles
  const [error, setError] = useState(null); // holds the error message, if any

  useEffect(() => {
    // Guard flag: prevents state updates if the component unmounts mid-fetch
    // (avoids the "update on an unmounted component" warning).
    let active = true;

    async function loadData() {
      try {
        const res = await fetch("https://api.github.com/users/p4wlee/repos");
        // fetch only throws on network errors; HTTP errors (404, 500...) must
        // be checked manually via res.ok and thrown by hand.
        if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
        const data = await res.json();
        // Drop the excluded repos before they reach state.
        const visible = data.filter((repo) => !EXCLUDE.includes(repo.name));
        if (active) {
          setData(visible);
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          console.log(err);
          setError(err.message);
          setLoading(false);
        }
      }
    }

    loadData();

    // Cleanup: flip the flag off so a late response can't update a gone component.
    return () => {
      active = false;
    };
  }, []); // Empty deps → fetch once, on mount.

  // Loading guard: return early with the section (keeps id + ref present so the
  // navbar's observer and the reveal still track it while data is on its way).
  if (loading)
    return (
      <section id="projects" ref={ref} className="section projects loading">
        Loading projects...
      </section>
    );

  // Error guard: same section shell, showing the readable error message.
  if (error)
    return (
      <section id="projects" ref={ref} className="section projects error">
        Error: {error}
      </section>
    );

  // Data ready: past both guards, `data` is guaranteed to hold the repos.
  return (
    <section id="projects" ref={ref} className="section projects">
      <h2> Projects </h2>
      <div className="row g-4">
        {data.map((repo) => (
          // 3/2/1 columns per row (desktop/tablet/mobile); key is the repo's
          // stable GitHub id, never the array index.
          <div className="col-lg-4 col-md-6 col-12" key={repo.id}>
            <div className="card">
              <h3>{repo.name}</h3>
              {/* Fall back to a placeholder when the repo has no description. */}
              <p>{repo.description || "No description available"}</p>
              <div className="card-links">
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                {/* Demo link only when the repo has a homepage set on GitHub. */}
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noreferrer">
                    Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
