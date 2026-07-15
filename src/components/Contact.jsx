import useReveal from "../hooks/useReveal";
import { useState } from "react";
import emailjs from "@emailjs/browser";

// Contact: a controlled form (name, surname, email, message) sent through
// EmailJS — no backend. React holds the single source of truth for every
// field; on submit the data is shipped to EmailJS and a status message gives
// the user feedback.
export default function Contact() {
  // Reveal hook: adds `is-visible` to the section once it scrolls into view,
  // which the SCSS uses to slide the form up into place.
  const ref = useReveal();

  // One state object holds all four fields, so a single handleChange can
  // update any of them by its `name`, and the whole form clears in one call.
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });

  // Send outcome: null before any submit, then "success" or "error".
  // Drives the feedback message below and clears itself after a few seconds.
  const [status, setStatus] = useState(null);

  function handleSubmit(e) {
    // Stop the browser's native form submit (which would reload the page);
    // we handle the send ourselves in JS.
    e.preventDefault();

    emailjs
      .send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then(() => {
        // Sent: flag success, wipe the fields (resetting state clears the
        // controlled inputs), and auto-dismiss the message after 4s.
        setStatus("success");
        setForm({ name: "", surname: "", email: "", message: "" });
        setTimeout(() => setStatus(null), 4000);
      })
      .catch((error) => {
        // Failed: flag error and keep the fields intact so the user can retry
        // without retyping. Log for diagnostics, then auto-dismiss.
        setStatus("error");
        console.error("Errore durante l'invio del messaggio:", error);
        setTimeout(() => setStatus(null), 4000);
      });
  }

  // One handler for every field: `e.target.name` picks which key to update,
  // `...prev` keeps the other three untouched.
  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <section id="contact" ref={ref} className="section contact">
      <h2> Contact</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nome" required />
        <input type="text" name="surname" value={form.surname} onChange={handleChange} placeholder="Cognome" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Scrivi qui un messaggio..." required></textarea>
        <button type="submit">Invia</button>
      </form>
      {/* Feedback line: shown only once a send resolves (status !== null),
          green on success / red on error, with matching text. */}
      {status && <p className={status === "success" ? "form-success" : "form-error"}>{status === "success" ? "Messaggio inviato con successo!" : "Errore durante l'invio. Riprova."}</p>}
    </section>
  );
}
