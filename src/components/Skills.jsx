import useReveal from "../hooks/useReveal";

// Technology logos, imported as assets so Vite tracks and fingerprints them
// at build time (a hardcoded string path would break in production).
import nodeLogo from "../assets/logos/nodejs.svg";
import expressLogo from "../assets/logos/expressjs.svg";
import javascriptLogo from "../assets/logos/javascript.svg";
import typescriptLogo from "../assets/logos/typescript.svg";
import mysqlLogo from "../assets/logos/mysql.svg";
import htmlLogo from "../assets/logos/html.svg";
import cssLogo from "../assets/logos/css.svg";
import gitLogo from "../assets/logos/git.svg";
import githubLogo from "../assets/logos/github.svg";
import postmanLogo from "../assets/logos/postman.svg";

// Lookup table mapping each skill's `logo` string to its imported asset.
// Keeps the SKILLS array as pure data while the actual image references
// live here — the string is the bridge between the two.
const LOGOS = {
  nodejs: nodeLogo,
  expressjs: expressLogo,
  javascript: javascriptLogo,
  typescript: typescriptLogo,
  mysql: mysqlLogo,
  html: htmlLogo,
  css: cssLogo,
  git: gitLogo,
  github: githubLogo,
  postman: postmanLogo,
};

// Skills data: name shown to the user + logo key into the LOGOS table.
// `invert: true` flags monochrome (black) logos that need color inversion
// to stay visible on the dark background.
const SKILLS = [
  { name: "Node.js", logo: "nodejs" },
  { name: "Express.js", logo: "expressjs", invert: true },
  { name: "JavaScript", logo: "javascript" },
  { name: "TypeScript", logo: "typescript" },
  { name: "MySQL", logo: "mysql" },
  { name: "HTML", logo: "html" },
  { name: "CSS", logo: "css" },
  { name: "Git", logo: "git" },
  { name: "GitHub", logo: "github", invert: true },
  { name: "Postman", logo: "postman" },
];

// Skills section: a responsive Bootstrap grid of technology badges that
// reveal in a staggered "wave" on first scroll into view.
export default function Skills() {
  // Reveal hook: adds `is-visible` to the section once it enters the viewport,
  // which the SCSS uses to trigger the badges' entrance animation.
  const ref = useReveal();
  return (
    <section id="skills" ref={ref} className="section skills">
      <h2> Skills </h2>
      <div className="row g-4">
        {SKILLS.map((skill, index) => (
          // Each badge: 4/3/1 columns per row (desktop/tablet/mobile).
          // `skill--invert` is added only for monochrome logos.
          // The per-index transitionDelay staggers the reveal into a wave.
          <div key={skill.name} className={`skill col-lg-3 col-md-4 col-12 ${skill.invert ? "skill--invert" : ""}`} style={{ transitionDelay: `${index * 300}ms` }}>
            <img src={LOGOS[skill.logo]} alt={skill.name} />
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
