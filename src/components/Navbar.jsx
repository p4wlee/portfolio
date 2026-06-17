// Fixed top navigation bar. Receives the id of the section currently in view
// (activeSectionId) from App and highlights the matching link.
export default function Navbar({ activeSectionId }) {
  // Link data, kept separate from the markup: each entry pairs the section's
  // id (the anchor target + active-state key) with its visible label.
  // Adding or renaming a link means editing this array, not the JSX.
  const links = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Progetti" },
    { id: "contact", label: "Contatti" },
  ];
  return (
    <nav className="navbar">
      {/* Build one anchor per link. key = stable unique id (required by React).
        href="#id" makes the browser jump to the matching section.
        The link whose id equals activeSectionId gets the "active" class. */}
      {links.map((link) => (
        <a key={link.id} href={`#${link.id}`} className={activeSectionId === link.id ? "active" : ""}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}
