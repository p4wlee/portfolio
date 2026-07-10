import { useState, useEffect } from "react";

const EXCLUDE = ["portfolio", "portfolio-personale"];

export default function Projects() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function loadData() {
      try {
        const res = await fetch("https://api.github.com/users/p4wlee/repos");
        if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
        const data = await res.json();
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
    return () => {
      active = false;
    };
  }, []);

  if (loading)
    return (
      <section id="projects" className="section projects loading">
        Loading projects...
      </section>
    );

  if (error)
    return (
      <section id="projects" className="section projects error">
        Error: {error}
      </section>
    );

  return (
    <section id="projects" className="section projects">
      <h2> Projects </h2>
      <div className="row g-4">
        {data.map((repo) => (
          <div className="col-lg-4 col-md-6 col-12" key={repo.id}>
            <div className="card">
              <h3>{repo.name}</h3>
              <p>{repo.description || "No description available"}</p>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                GitHub
              </a>
              {repo.homepage && (
                <a href={repo.homepage} target="_blank" rel="noreferrer">
                  Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
