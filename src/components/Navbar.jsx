import { useState } from "react";

// Fixed top navigation bar. Receives the id of the section currently in view
// (activeSectionId) from App and highlights the matching link. On mobile the
// links collapse behind a hamburger button, toggled by local `isOpen` state.
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

  // Is the mobile menu open? Starts closed. Only matters on mobile, where the
  // links stay hidden until this flips to true; on desktop the CSS shows the
  // links regardless of this value.
  const [isOpen, setIsOpen] = useState(false);

  return (
    // The `open` class is added only while the mobile menu is expanded, so the
    // SCSS can reveal the links panel.
    <nav className={`navbar ${isOpen ? "open" : ""}`}>
      {/* Hamburger button: shown only on mobile (hidden via CSS on desktop).
          Clicking flips the state to its opposite. The icon swaps ☰ ↔ ✕.
          aria-* attributes expose the button's purpose and state to screen readers. */}
      <button className="navbar-toggle" onClick={() => setIsOpen((prev) => !prev)} aria-label="Apri o chiudi il menu" aria-expanded={isOpen}>
        {isOpen ? "✕" : "☰"}
      </button>

      {/* The links, wrapped so the whole group can be shown/hidden as one unit
          on mobile. On desktop this is just the usual horizontal row. */}
      <div className="navbar-links">
        {/* Build one anchor per link. key = stable unique id (required by React).
            href="#id" makes the browser jump to the matching section.
            The link whose id equals activeSectionId gets the "active" class.
            onClick closes the menu after selecting a link on mobile. */}
        {links.map((link) => (
          <a key={link.id} href={`#${link.id}`} className={activeSectionId === link.id ? "active" : ""} onClick={() => setIsOpen(false)}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
